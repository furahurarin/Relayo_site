import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { inngest } from "@/lib/inngest";
import { applyRatelimit } from "@/lib/ratelimit";
import { verifyTurnstile } from "@/lib/turnstile";

const MAX_BODY_BYTES = 32 * 1024;
const MIN_SUBMISSION_TIME_MS = 5_000;
const MIN_PLAUSIBLE_STARTED_AT = Date.UTC(2020, 0, 1);
const EC_APPLICATION_TYPE = "ec_inventory_design_partner";
const EC_APPLICATION_TYPE_ALIAS = "ec_inventory_partner";

const SalesChannel = z.enum([
  "自社EC",
  "Amazon",
  "楽天市場",
  "Yahoo!ショッピング",
  "BASE",
  "STORES",
  "メルカリShops",
  "その他",
]);
const SkuRange = z.enum(["1〜49", "50〜100", "101〜300", "301以上", "不明"]);
const CsvAvailability = z.enum(["可能", "難しい", "不明"]);
const Issue = z.enum([
  "本当の利益が見えない",
  "手数料・送料を含めて判断できない",
  "滞留在庫が把握できない",
  "値下げや再出品の優先順位が決められない",
  "追加仕入を止める基準がない",
  "その他",
]);
const CaseStudyConsent = z.enum([
  "匿名であれば協力可能",
  "内容を確認して判断したい",
  "協力は難しい",
]);

const optionalTrimmedString = (max: number) =>
  z.preprocess(
    (value) => (value === null || value === "" ? undefined : value),
    z.string().trim().max(max).optional()
  );

function normalizeStringArray(value: unknown): unknown {
  if (value === null || value === undefined || value === "") return undefined;
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return value;

  return value.includes(",")
    ? value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [value.trim()].filter(Boolean);
}

const ContactSchema = z
  .object({
    name: z.string().trim().min(1).max(80),
    email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
    company: optionalTrimmedString(120),
    tel: optionalTrimmedString(50),
    phone: optionalTrimmedString(50),
    detail: optionalTrimmedString(2_000),
    message: optionalTrimmedString(2_000),

    type: optionalTrimmedString(80),
    category: optionalTrimmedString(80),
    plan: z.enum(["starter_lp", "essential", "standard", "growth"]).optional(),
    budget: z.enum(["starter_lp", "essential", "standard", "growth"]).optional(),
    timeline: z
      .enum(["lp_5_10", "ess_2_3w", "std_3_4w", "gro_4_6w", "undecided"])
      .optional(),
    priority: z.enum(["speed", "cost", "scope"]).optional(),
    assets: z.preprocess(
      normalizeStringArray,
      z
        .array(z.enum(["texts", "photos", "logo", "existing_site", "none"]))
        .max(5)
        .optional()
    ),
    decision: z.enum(["now_1w", "by_2w", "over_1m"]).optional(),
    features: z.preprocess(
      normalizeStringArray,
      z.array(z.string().trim().min(1).max(100)).max(20).optional()
    ),
    website: optionalTrimmedString(2_048),

    salesChannels: z.preprocess(
      normalizeStringArray,
      z.array(SalesChannel).min(1).max(2).optional()
    ),
    skuRange: SkuRange.optional(),
    csvAvailability: CsvAvailability.optional(),
    issues: z.preprocess(
      normalizeStringArray,
      z.array(Issue).min(1).max(6).optional()
    ),
    caseStudyConsent: CaseStudyConsent.optional(),

    hp: optionalTrimmedString(256),
    startedAt: z.preprocess(
      (value) => {
        if (value === null || value === undefined || value === "") return undefined;
        if (typeof value === "string" && /^\d+$/.test(value)) return Number(value);
        return value;
      },
      z.number().int().nonnegative().optional()
    ),
    turnstileToken: optionalTrimmedString(4_096),
    "cf-turnstile-response": optionalTrimmedString(4_096),
    token: optionalTrimmedString(4_096),

    pathname: optionalTrimmedString(1_024),
    referer: optionalTrimmedString(2_048),
    referrer: optionalTrimmedString(2_048),
    utm_source: optionalTrimmedString(200),
    utm_medium: optionalTrimmedString(200),
    utm_campaign: optionalTrimmedString(200),
    utm_content: optionalTrimmedString(200),
    utm_term: optionalTrimmedString(200),
    utmSource: optionalTrimmedString(200),
    utmMedium: optionalTrimmedString(200),
    utmCampaign: optionalTrimmedString(200),
    utmContent: optionalTrimmedString(200),
    utmTerm: optionalTrimmedString(200),
  })
  .superRefine((data, ctx) => {
    const isEcApplication =
      data.type === EC_APPLICATION_TYPE || data.type === EC_APPLICATION_TYPE_ALIAS;

    if (!isEcApplication && !data.detail && !data.message) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["detail"],
        message: "detail or message is required",
      });
    }

    if (!isEcApplication) return;

    const requiredFields: Array<keyof typeof data> = [
      "salesChannels",
      "skuRange",
      "csvAvailability",
      "issues",
      "caseStudyConsent",
      "startedAt",
    ];
    for (const field of requiredFields) {
      if (data[field] === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [field],
          message: `${field} is required`,
        });
      }
    }

    if (
      data.salesChannels &&
      new Set(data.salesChannels).size !== data.salesChannels.length
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["salesChannels"],
        message: "duplicate sales channels are not allowed",
      });
    }
    if (data.issues && new Set(data.issues).size !== data.issues.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["issues"],
        message: "duplicate issues are not allowed",
      });
    }
  });

type ErrorCode =
  | "TOO_MANY_REQUESTS"
  | "PAYLOAD_TOO_LARGE"
  | "UNSUPPORTED_MEDIA_TYPE"
  | "INVALID_REQUEST"
  | "VALIDATION_ERROR"
  | "SUBMISSION_TOO_FAST"
  | "TURNSTILE_NOT_CONFIGURED"
  | "TURNSTILE_TOKEN_MISSING"
  | "TURNSTILE_FAILED"
  | "SUBMISSION_FAILED";

function errorResponse(
  status: number,
  error: ErrorCode,
  message: string
): NextResponse {
  return NextResponse.json({ ok: false, error, message }, { status });
}

type ParsedBody =
  | { ok: true; data: Record<string, unknown> }
  | { ok: false; response: NextResponse };

function formDataToObject(formData: FormData): Record<string, unknown> | null {
  const result: Record<string, unknown> = {};

  for (const [key, value] of formData.entries()) {
    // 応募時点ではファイルを一切受け付けない。
    if (typeof value !== "string") return null;

    const current = result[key];
    if (current === undefined) {
      result[key] = value;
    } else if (Array.isArray(current)) {
      current.push(value);
    } else {
      result[key] = [current, value];
    }
  }

  return result;
}

function searchParamsToObject(params: URLSearchParams): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of params.entries()) {
    const current = result[key];
    if (current === undefined) {
      result[key] = value;
    } else if (Array.isArray(current)) {
      current.push(value);
    } else {
      result[key] = [current, value];
    }
  }

  return result;
}

async function parseBody(req: NextRequest): Promise<ParsedBody> {
  const declaredLength = Number(req.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return {
      ok: false,
      response: errorResponse(
        413,
        "PAYLOAD_TOO_LARGE",
        "送信内容が大きすぎます。入力内容を短くして、もう一度お試しください。"
      ),
    };
  }

  let rawBody: ArrayBuffer;
  try {
    rawBody = await req.arrayBuffer();
  } catch {
    return {
      ok: false,
      response: errorResponse(
        400,
        "INVALID_REQUEST",
        "送信内容を読み取れませんでした。ページを再読み込みして、もう一度お試しください。"
      ),
    };
  }

  if (rawBody.byteLength > MAX_BODY_BYTES) {
    return {
      ok: false,
      response: errorResponse(
        413,
        "PAYLOAD_TOO_LARGE",
        "送信内容が大きすぎます。入力内容を短くして、もう一度お試しください。"
      ),
    };
  }

  const contentType = req.headers.get("content-type") ?? "";
  const normalizedContentType = contentType.toLowerCase();
  const text = new TextDecoder().decode(rawBody);

  try {
    if (normalizedContentType.includes("application/json")) {
      const parsed: unknown = JSON.parse(text);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("JSON body must be an object");
      }
      return { ok: true, data: parsed as Record<string, unknown> };
    }

    if (normalizedContentType.includes("application/x-www-form-urlencoded")) {
      return {
        ok: true,
        data: searchParamsToObject(new URLSearchParams(text)),
      };
    }

    if (normalizedContentType.includes("multipart/form-data")) {
      const formRequest = new Request(req.url, {
        method: "POST",
        headers: { "content-type": contentType },
        body: rawBody,
      });
      const parsed = formDataToObject(await formRequest.formData());
      if (!parsed) {
        return {
          ok: false,
          response: errorResponse(
            400,
            "INVALID_REQUEST",
            "ファイルは送信できません。入力項目のみで、もう一度お試しください。"
          ),
        };
      }
      return { ok: true, data: parsed };
    }
  } catch {
    return {
      ok: false,
      response: errorResponse(
        400,
        "INVALID_REQUEST",
        "送信内容を読み取れませんでした。入力内容を確認して、もう一度お試しください。"
      ),
    };
  }

  return {
    ok: false,
    response: errorResponse(
      415,
      "UNSUPPORTED_MEDIA_TYPE",
      "この形式では送信できません。ページを再読み込みして、もう一度お試しください。"
    ),
  };
}

function hasUnsafeContent(body: Record<string, unknown>): boolean {
  const htmlPattern = /<\s*\/?\s*[a-z][^>]*>/i;
  const dataUrlPattern = /^data:[^;,\s]+;base64,/i;
  const base64Pattern = /^[A-Za-z0-9+/\r\n]+={0,2}$/;
  const fileKeyPattern = /^(?:file|files|attachment|attachments)$/i;
  const tokenKeys = new Set(["turnstileToken", "cf-turnstile-response", "token"]);

  const inspect = (value: unknown, key: string): boolean => {
    if (typeof value === "string") {
      if (fileKeyPattern.test(key) && value.trim()) return true;
      if (htmlPattern.test(value) || dataUrlPattern.test(value.trim())) return true;
      if (
        !tokenKeys.has(key) &&
        value.length >= 512 &&
        base64Pattern.test(value.replace(/\s/g, ""))
      ) {
        return true;
      }
      return false;
    }

    if (Array.isArray(value)) {
      return value.some((item) => inspect(item, key));
    }

    // フォームはフラットなプリミティブ値だけを受け付ける。
    return value !== null && typeof value === "object";
  };

  return Object.entries(body).some(([key, value]) => inspect(value, key));
}

function getClientIp(req: NextRequest): string {
  for (const header of ["x-forwarded-for", "cf-connecting-ip", "x-real-ip"]) {
    const raw = req.headers.get(header);
    const ip = raw?.split(",")[0]?.trim();
    if (ip) return ip;
  }
  return "unknown";
}

function maySkipTurnstile(): boolean {
  const isDevelopmentOrTest =
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
  return (
    isDevelopmentOrTest && process.env.TURNSTILE_SKIP_VERIFICATION === "true"
  );
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  try {
    const rateLimit = await applyRatelimit(ip, "/api/contact");
    if (!rateLimit.success) {
      return errorResponse(
        429,
        "TOO_MANY_REQUESTS",
        "短時間に複数回送信されています。少し時間をおいて再度お試しください。"
      );
    }
  } catch (error) {
    console.error("[contact] rate limit failed", error);
    return errorResponse(
      503,
      "SUBMISSION_FAILED",
      "現在送信を受け付けられません。少し時間をおいて再度お試しください。"
    );
  }

  const parsedBody = await parseBody(req);
  if (!parsedBody.ok) return parsedBody.response;

  // Honeypot は Bot に判定結果を知らせず、処理だけ停止する。
  if (typeof parsedBody.data.hp === "string" && parsedBody.data.hp.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (hasUnsafeContent(parsedBody.data)) {
    return errorResponse(
      400,
      "VALIDATION_ERROR",
      "送信内容に利用できない形式が含まれています。HTMLやファイルを除いて、もう一度お試しください。"
    );
  }

  const result = ContactSchema.safeParse(parsedBody.data);
  if (!result.success) {
    return errorResponse(
      400,
      "VALIDATION_ERROR",
      "入力内容を確認してください。必須項目、文字数、選択数に誤りがあります。"
    );
  }

  const data = result.data;
  const isEcApplication =
    data.type === EC_APPLICATION_TYPE || data.type === EC_APPLICATION_TYPE_ALIAS;

  if (data.startedAt !== undefined) {
    const now = Date.now();
    if (data.startedAt < MIN_PLAUSIBLE_STARTED_AT || data.startedAt > now) {
      return errorResponse(
        400,
        "VALIDATION_ERROR",
        "送信情報を確認できませんでした。ページを再読み込みして、もう一度お試しください。"
      );
    }

    const elapsed = now - data.startedAt;
    if (elapsed < MIN_SUBMISSION_TIME_MS) {
      return errorResponse(
        400,
        "SUBMISSION_TOO_FAST",
        "送信が早すぎます。恐れ入りますが数秒おいてから再度お試しください。"
      );
    }
  }

  const skipTurnstile = maySkipTurnstile();
  if (!process.env.TURNSTILE_SECRET_KEY && !skipTurnstile) {
    console.error("[contact] TURNSTILE_SECRET_KEY is not configured");
    return errorResponse(
      503,
      "TURNSTILE_NOT_CONFIGURED",
      "現在確認機能を利用できません。時間をおいて再度お試しください。"
    );
  }

  const turnstileToken =
    data.turnstileToken ?? data["cf-turnstile-response"] ?? data.token;

  if (skipTurnstile && !process.env.TURNSTILE_SECRET_KEY) {
    console.warn(
      "[contact] Turnstile verification explicitly skipped outside production"
    );
  } else {
    if (!turnstileToken) {
      return errorResponse(
        400,
        "TURNSTILE_TOKEN_MISSING",
        "確認に失敗しました。ページを再読み込みして、もう一度お試しください。"
      );
    }

    let isHuman = false;
    try {
      isHuman = await verifyTurnstile(turnstileToken, ip);
    } catch (error) {
      console.error("[contact] Turnstile verification failed", error);
    }
    if (!isHuman) {
      return errorResponse(
        400,
        "TURNSTILE_FAILED",
        "確認に失敗しました。ページを再読み込みして、もう一度お試しください。"
      );
    }
  }

  const detail = data.detail ?? data.message ?? "";
  const referrer =
    data.referrer ?? data.referer ?? req.headers.get("referer") ?? null;
  const pathname = data.pathname ?? req.nextUrl.pathname ?? null;
  const utmSource = data.utm_source ?? data.utmSource;
  const utmMedium = data.utm_medium ?? data.utmMedium;
  const utmCampaign = data.utm_campaign ?? data.utmCampaign;
  const utmContent = data.utm_content ?? data.utmContent;
  const utmTerm = data.utm_term ?? data.utmTerm;

  try {
    await inngest.send({
      name: "application/received",
      data: {
        submittedAt: new Date().toISOString(),
        type: isEcApplication ? EC_APPLICATION_TYPE : data.type,
        salesChannels: data.salesChannels,
        skuRange: data.skuRange,
        csvAvailability: data.csvAvailability,
        issues: data.issues,
        caseStudyConsent: data.caseStudyConsent,
        detail,
        message: detail,
        name: data.name,
        email: data.email,
        company: data.company,
        tel: data.tel,
        phone: data.phone,

        category: data.category,
        plan: data.plan,
        timeline: data.timeline,
        priority: data.priority,
        assets: data.assets,
        decision: data.decision,
        features: data.features,

        pathname,
        referrer,
        referer: referrer,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
        utm_term: utmTerm,
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent,
        utmTerm,
      },
    });
  } catch (error) {
    console.error("[contact] failed to enqueue application", error);
    return errorResponse(
      503,
      "SUBMISSION_FAILED",
      "送信を完了できませんでした。時間をおいて、もう一度お試しください。"
    );
  }

  return NextResponse.json({ ok: true });
}

import "server-only";

import { BRAND } from "@/lib/constants";
import { inngest } from "@/lib/inngest";
import { getEMAIL_FROM, getEMAIL_TO, makeResend } from "@/lib/resend";

type ApplicationPayload = {
  submittedAt?: string;
  type?: string;
  name: string;
  email: string;
  company?: string;
  tel?: string;
  phone?: string;
  message?: string;
  detail?: string;
  salesChannels?: string[];
  skuRange?: string;
  csvAvailability?: string;
  issues?: string[];
  caseStudyConsent?: string;
  pathname?: string | null;
  referer?: string | null;
  referrer?: string | null;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
};

type NormalizedApplication = {
  type?: string;
  name: string;
  email: string;
  company?: string;
  tel?: string;
  detail: string;
  salesChannels: string[];
  skuRange?: string;
  csvAvailability?: string;
  issues: string[];
  caseStudyConsent?: string;
  referrer?: string;
  pathname?: string;
  submittedAt: string;
  utm: Array<[string, string]>;
};

function formatJst(value?: string): string {
  const candidate = value ? new Date(value) : new Date();
  const date = Number.isNaN(candidate.getTime()) ? new Date() : candidate;

  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function normalizePayload(raw: ApplicationPayload): NormalizedApplication {
  const utmEntries: Array<[string, string | undefined]> = [
    ["utm_source", raw.utm_source ?? raw.utmSource],
    ["utm_medium", raw.utm_medium ?? raw.utmMedium],
    ["utm_campaign", raw.utm_campaign ?? raw.utmCampaign],
    ["utm_content", raw.utm_content ?? raw.utmContent],
    ["utm_term", raw.utm_term ?? raw.utmTerm],
  ];

  return {
    type: raw.type?.trim() || undefined,
    name: raw.name?.trim(),
    email: raw.email?.trim(),
    company: raw.company?.trim() || undefined,
    tel: (raw.tel ?? raw.phone)?.trim() || undefined,
    detail: (raw.detail ?? raw.message ?? "").toString().trim(),
    salesChannels: Array.isArray(raw.salesChannels)
      ? raw.salesChannels.map((value) => value.trim()).filter(Boolean)
      : [],
    skuRange: raw.skuRange?.trim() || undefined,
    csvAvailability: raw.csvAvailability?.trim() || undefined,
    issues: Array.isArray(raw.issues)
      ? raw.issues.map((value) => value.trim()).filter(Boolean)
      : [],
    caseStudyConsent: raw.caseStudyConsent?.trim() || undefined,
    referrer: (raw.referrer ?? raw.referer)?.trim() || undefined,
    pathname: raw.pathname?.trim() || undefined,
    submittedAt: formatJst(raw.submittedAt),
    utm: utmEntries.flatMap(([key, value]) => {
      const normalized = value?.trim();
      return normalized ? [[key, normalized] as [string, string]] : [];
    }),
  };
}

function buildLegacySummary(application: NormalizedApplication): string {
  return [
    `受付日時: ${application.submittedAt}`,
    `お名前: ${application.name}`,
    `会社名: ${application.company || "-"}`,
    `メール: ${application.email}`,
    `電話番号: ${application.tel || "-"}`,
    application.referrer ? `参照元: ${application.referrer}` : "",
    "",
    "お問い合わせ内容:",
    application.detail || "-",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildApplicationDetails(application: NormalizedApplication): string {
  return [
    `氏名: ${application.name}`,
    `メール: ${application.email}`,
    `店舗・屋号: ${application.company || "-"}`,
    `販路: ${application.salesChannels.join("、") || "-"}`,
    `SKU規模: ${application.skuRange || "-"}`,
    `CSV出力可否: ${application.csvAvailability || "-"}`,
    `課題: ${application.issues.join("、") || "-"}`,
    `匿名事例協力可否: ${application.caseStudyConsent || "-"}`,
    "補足:",
    application.detail || "-",
  ].join("\n");
}

function buildAdminSummary(application: NormalizedApplication): string {
  const utmLines = application.utm.length
    ? application.utm.map(([key, value]) => `  ${key}: ${value}`)
    : ["  -"];

  return [
    `応募日時: ${application.submittedAt}`,
    buildApplicationDetails(application),
    `参照元: ${application.referrer || "-"}`,
    `送信ページ: ${application.pathname || "-"}`,
    "UTM:",
    ...utmLines,
  ].join("\n");
}

export const sendEmails = inngest.createFunction(
  { id: "send-emails-on-application" },
  { event: "application/received" },
  async ({ event, step }) => {
    const raw = event.data as ApplicationPayload | undefined;
    if (!raw) throw new Error("No event data");

    const application = normalizePayload(raw);
    if (!application.name || !application.email) {
      throw new Error("Missing required fields: name, email");
    }

    const isEcApplication =
      application.type === "ec_inventory_design_partner";
    if (!isEcApplication && !application.detail) {
      throw new Error("Missing required field: message/detail");
    }

    // 実行時にだけ設定を確認し、import 時や build 時には失敗させない。
    const resendApiKey = process.env.RESEND_API_KEY ?? "";
    const emailFrom = getEMAIL_FROM();
    const emailTo = getEMAIL_TO();
    if (!resendApiKey || !emailFrom || !emailTo) {
      console.warn(
        "[send-emails] Missing one of RESEND_API_KEY / EMAIL_FROM / EMAIL_TO. Skip sending."
      );
      return { ok: false, skipped: true };
    }

    const resend = makeResend(resendApiKey);
    const adminSummary = isEcApplication
      ? buildAdminSummary(application)
      : buildLegacySummary(application);
    const applicantSummary = isEcApplication
      ? buildApplicationDetails(application)
      : adminSummary;

    await step.run("notify-admin", async () => {
      await resend.emails.send({
        from: emailFrom,
        to: [emailTo],
        replyTo: [application.email],
        subject: isEcApplication
          ? `【Relayo EC在庫・粗利診断】共同検証応募: ${application.name} 様`
          : `【${BRAND.name}】新規お問い合わせ: ${application.name} 様`,
        text: [
          isEcApplication
            ? "共同検証への応募を受け付けました。"
            : "新しいお問い合わせを受信しました。",
          "",
          adminSummary,
          "",
          `このメールには返信できます（返信先: ${application.email}）。`,
        ].join("\n"),
      });
    });

    await step.run("auto-reply", async () => {
      const lines = isEcApplication
        ? [
            `${application.name} 様`,
            "",
            "Relayo EC在庫・粗利診断の共同検証へご応募いただき、ありがとうございます。",
            "ご応募を受け付けました。内容を確認のうえ、原則1営業日以内にメールでご連絡します。",
            "",
            "応募時点では、契約または有料サービスのお申し込みは成立しません。",
            "買主情報（氏名、住所、電話番号、メールアドレス、注文番号）や、ログイン情報（ID、パスワード、APIキー）は送らないでください。",
            "在庫・販売等の実データは、Relayoから提出方法をご案内するまで送らないでください。",
            "",
            "—— 応募内容の控え ——",
            applicantSummary,
            "",
            "—",
            "Relayo EC在庫・粗利診断",
            BRAND.siteUrl,
            BRAND.email,
          ]
        : [
            `${application.name} 様`,
            "",
            `${BRAND.name}です。お問い合わせありがとうございます。`,
            "お送りいただいた内容を確認のうえ、通常1営業日以内にメールでご連絡いたします。",
            "",
            "追加で共有いただける情報（ご予算・公開時期・参考サイトなど）がありましたら、",
            "このメールにそのままご返信ください。",
            "",
            "—— お問い合わせ内容の控え ——",
            applicantSummary,
            "",
            "—",
            BRAND.name,
            BRAND.siteUrl,
            BRAND.email,
          ];

      await resend.emails.send({
        from: emailFrom,
        to: [application.email],
        bcc: [emailTo],
        subject: isEcApplication
          ? "【Relayo EC在庫・粗利診断】共同検証へのご応募ありがとうございます"
          : `【${BRAND.name}】お問い合わせありがとうございます`,
        text: lines.join("\n"),
      });
    });

    // 既存の管理者向け24時間フォローを維持する。
    await step.sleep("wait-24h", "PT24H");
    await step.run("follow-up", async () => {
      await resend.emails.send({
        from: emailFrom,
        to: [emailTo],
        subject: isEcApplication
          ? "【Relayo EC在庫・粗利診断】24時間フォロー（共同検証応募の対応確認）"
          : `【${BRAND.name}】24時間フォロー（お問い合わせ対応のご確認）`,
        text: [
          isEcApplication
            ? "24時間前に受信した共同検証応募への対応状況をご確認ください。"
            : "24時間前に受信したお問い合わせへの対応状況をご確認ください。",
          "",
          isEcApplication
            ? "▼ 該当する応募の概要"
            : "▼ 該当のお問い合わせ概要",
          adminSummary,
        ].join("\n"),
      });
    });

    return { ok: true };
  }
);

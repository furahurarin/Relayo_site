"use client";

import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  ClipboardCheck,
  ShieldCheck,
} from "lucide-react";
import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import TurnstileWidget, {
  type TurnstileWidgetHandle,
} from "@/components/forms/TurnstileWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { track } from "@/lib/track";

const SALES_CHANNELS = [
  "自社EC",
  "Amazon",
  "楽天市場",
  "Yahoo!ショッピング",
  "BASE",
  "STORES",
  "メルカリShops",
  "その他",
] as const;

const SKU_RANGES = ["1〜49", "50〜100", "101〜300", "301以上", "不明"] as const;
const CSV_AVAILABILITIES = ["可能", "難しい", "不明"] as const;
const ISSUES = [
  "本当の利益が見えない",
  "手数料・送料を含めて判断できない",
  "滞留在庫が把握できない",
  "値下げや再出品の優先順位が決められない",
  "追加仕入を止める基準がない",
  "その他",
] as const;
const CASE_STUDY_CONSENTS = [
  "匿名であれば協力可能",
  "内容を確認して判断したい",
  "協力は難しい",
] as const;

type SalesChannel = (typeof SALES_CHANNELS)[number];
type SkuRange = (typeof SKU_RANGES)[number];
type CsvAvailability = (typeof CSV_AVAILABILITIES)[number];
type Issue = (typeof ISSUES)[number];
type CaseStudyConsent = (typeof CASE_STUDY_CONSENTS)[number];

type FormValues = {
  name: string;
  email: string;
  company: string;
  salesChannels: SalesChannel[];
  skuRange: SkuRange | "";
  csvAvailability: CsvAvailability | "";
  issues: Issue[];
  detail: string;
  caseStudyConsent: CaseStudyConsent | "";
};

type FieldName =
  | "name"
  | "email"
  | "company"
  | "salesChannels"
  | "skuRange"
  | "csvAvailability"
  | "issues"
  | "detail"
  | "caseStudyConsent"
  | "privacy"
  | "turnstile";

type FieldErrors = Partial<Record<FieldName, string>>;

type TrackingContext = {
  pathname: string;
  referrer: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INPUT_CLASS_NAME =
  "w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200";

const createInitialValues = (): FormValues => ({
  name: "",
  email: "",
  company: "",
  salesChannels: [],
  skuRange: "",
  csvAvailability: "",
  issues: [],
  detail: "",
  caseStudyConsent: "",
});

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="text-sm text-destructive" role="alert">
      {message}
    </p>
  );
}

function messageFromResponse(data: unknown, fallback: string) {
  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof data.message === "string" &&
    data.message.trim()
  ) {
    return data.message;
  }

  return fallback;
}

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>(() => createInitialValues());
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [trackingContext, setTrackingContext] = useState<TrackingContext>({
    pathname: "",
    referrer: "",
  });
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [pageError, setPageError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const turnstileRef = useRef<TurnstileWidgetHandle | null>(null);
  const turnstileSectionRef = useRef<HTMLDivElement | null>(null);
  const errorRef = useRef<HTMLDivElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const context: TrackingContext = {
      pathname: window.location.pathname,
      referrer: document.referrer,
    };

    ([
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
    ] as const).forEach((key) => {
      const value = params.get(key);
      if (value) context[key] = value;
    });

    setTrackingContext(context);
  }, []);

  useEffect(() => {
    if (done) successRef.current?.focus();
  }, [done]);

  const clearFieldError = (field: FieldName) => {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const setTextValue = (field: "name" | "email" | "company" | "detail", value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    clearFieldError(field);
  };

  const toggleSalesChannel = (channel: SalesChannel) => {
    if (values.salesChannels.includes(channel)) {
      setValues((current) => ({
        ...current,
        salesChannels: current.salesChannels.filter((item) => item !== channel),
      }));
      clearFieldError("salesChannels");
      return;
    }

    if (values.salesChannels.length >= 2) {
      setFieldErrors((errors) => ({
        ...errors,
        salesChannels: "販路は最大2つまで選択できます。",
      }));
      return;
    }

    setValues((current) => ({
      ...current,
      salesChannels: [...current.salesChannels, channel],
    }));
    clearFieldError("salesChannels");
  };

  const toggleIssue = (issue: Issue) => {
    setValues((current) => ({
      ...current,
      issues: current.issues.includes(issue)
        ? current.issues.filter((item) => item !== issue)
        : [...current.issues, issue],
    }));
    clearFieldError("issues");
  };

  const validate = () => {
    const errors: FieldErrors = {};
    const name = values.name.trim();
    const email = values.email.trim();
    const company = values.company.trim();

    if (!name) errors.name = "お名前を入力してください。";
    else if (name.length > 80) errors.name = "お名前は80文字以内で入力してください。";

    if (!email) errors.email = "メールアドレスを入力してください。";
    else if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
      errors.email = "有効なメールアドレスを254文字以内で入力してください。";
    }

    if (company.length > 120) {
      errors.company = "会社名・店舗名・屋号は120文字以内で入力してください。";
    }
    if (values.salesChannels.length < 1 || values.salesChannels.length > 2) {
      errors.salesChannels = "販路を1つ以上、最大2つまで選択してください。";
    }
    if (!values.skuRange) errors.skuRange = "SKU規模を選択してください。";
    if (!values.csvAvailability) {
      errors.csvAvailability = "CSVまたはExcelの出力可否を選択してください。";
    }
    if (values.issues.length < 1) {
      errors.issues = "現在の課題を1つ以上選択してください。";
    }
    if (values.detail.length > 2_000) {
      errors.detail = "補足は2,000文字以内で入力してください。";
    }
    if (!values.caseStudyConsent) {
      errors.caseStudyConsent = "匿名事例への協力可否を選択してください。";
    }
    if (!privacyConsent) {
      errors.privacy = "プライバシーポリシーへの同意が必要です。";
    }
    if (!turnstileToken) {
      errors.turnstile = "本人確認を完了してください。";
    }

    setFieldErrors(errors);
    return errors;
  };

  const focusFirstError = (errors: FieldErrors) => {
    const order: Array<[FieldName, string]> = [
      ["name", "name"],
      ["email", "email"],
      ["company", "company"],
      ["salesChannels", "sales-channel-0"],
      ["skuRange", "sku-range-0"],
      ["csvAvailability", "csv-availability-0"],
      ["issues", "issue-0"],
      ["detail", "detail"],
      ["caseStudyConsent", "case-study-consent-0"],
      ["privacy", "privacy-consent"],
    ];
    const target = order.find(([field]) => errors[field]);

    window.requestAnimationFrame(() => {
      if (target) document.getElementById(target[1])?.focus();
      else if (errors.turnstile) turnstileSectionRef.current?.focus();
    });
  };

  const resetTurnstileAfterAttempt = () => {
    setTurnstileToken("");
    setTurnstileError("本人確認をもう一度完了してから再送信してください。");
    turnstileRef.current?.reset();
  };

  const showRequestError = (message: string) => {
    setPageError(message);
    window.requestAnimationFrame(() => errorRef.current?.focus());
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    setPageError(null);
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setPageError("入力内容をご確認ください。各項目のエラーを修正してください。");
      focusFirstError(errors);
      return;
    }

    if (Date.now() - startedAt < 5_000) {
      showRequestError(
        "送信が早すぎます。恐れ入りますが、数秒待ってからもう一度お試しください。",
      );
      return;
    }

    const tokenForAttempt = turnstileToken;
    setSending(true);
    track("ec_design_partner_submit_started", { form: "ec_inventory" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "ec_inventory_design_partner",
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim() || undefined,
          salesChannels: values.salesChannels,
          skuRange: values.skuRange,
          csvAvailability: values.csvAvailability,
          issues: values.issues,
          caseStudyConsent: values.caseStudyConsent,
          detail: values.detail.trim(),
          turnstileToken: tokenForAttempt,
          hp,
          startedAt,
          ...trackingContext,
        }),
      });

      const data: unknown = await response.json().catch(() => null);
      const explicitlyFailed =
        typeof data === "object" &&
        data !== null &&
        "ok" in data &&
        data.ok === false;

      if (!response.ok || explicitlyFailed) {
        resetTurnstileAfterAttempt();
        showRequestError(
          messageFromResponse(
            data,
            "送信できませんでした。時間をおいてからもう一度お試しください。",
          ),
        );
        track("ec_design_partner_submit_failed", {
          form: "ec_inventory",
          status: response.status,
        });
        return;
      }

      turnstileRef.current?.reset();
      setTurnstileToken("");
      setTurnstileError(null);
      setValues(createInitialValues());
      setPrivacyConsent(false);
      setHp("");
      setStartedAt(Date.now());
      setFieldErrors({});
      setDone(true);
      track("ec_design_partner_submit_succeeded", { form: "ec_inventory" });
    } catch {
      resetTurnstileAfterAttempt();
      showRequestError(
        "通信エラーが発生しました。通信環境をご確認のうえ、もう一度お試しください。",
      );
      track("ec_design_partner_submit_failed", {
        form: "ec_inventory",
        status: "network_error",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-slate-50 py-10 sm:py-14">
      <div className="container mx-auto max-w-3xl px-4">
        <Card className="overflow-hidden border-slate-200 shadow-lg">
          <CardHeader className="space-y-4 border-b border-slate-100 bg-white p-5 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <ClipboardCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-blue-700">
                Relayo EC在庫・粗利診断
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                共同検証パートナー応募フォーム
              </h1>
              <p className="text-sm leading-7 text-slate-600">
                対象販路やSKU規模などを確認し、原則1営業日以内にメールでご連絡します。応募時点で契約や有料サービスの購入は成立しません。
              </p>
            </div>
          </CardHeader>

          <CardContent className="bg-white p-5 sm:p-8">
            {done ? (
              <div
                ref={successRef}
                tabIndex={-1}
                className="space-y-5 rounded-xl border border-emerald-200 bg-emerald-50 p-5 outline-none focus:ring-2 focus:ring-emerald-600 sm:p-6"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700"
                    aria-hidden="true"
                  />
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-emerald-950">
                      応募を受け付けました
                    </h2>
                    <p className="text-sm leading-7 text-emerald-950/80">
                      原則1営業日以内にメールで返信します。自動返信メールもご確認ください。Relayoからご案内するまでは、実データ、買主情報、ログイン情報を送らないでください。
                    </p>
                  </div>
                </div>
                <Button asChild variant="outline">
                  <Link href="/">サービスページへ戻る</Link>
                </Button>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit} noValidate>
                {pageError && (
                  <div
                    ref={errorRef}
                    tabIndex={-1}
                    className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4 outline-none focus:ring-2 focus:ring-destructive"
                    role="alert"
                    aria-live="assertive"
                  >
                    <AlertCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-destructive"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-destructive">送信できませんでした</p>
                      <p className="mt-1 text-sm text-slate-700">{pageError}</p>
                    </div>
                  </div>
                )}

                <section className="space-y-5" aria-labelledby="contact-details-heading">
                  <div>
                    <h2
                      id="contact-details-heading"
                      className="text-lg font-semibold text-slate-950"
                    >
                      ご連絡先
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      「必須」と記載した項目は入力が必要です。
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-900">
                      お名前（必須）
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      maxLength={80}
                      required
                      value={values.name}
                      onChange={(event) => setTextValue("name", event.target.value)}
                      className={INPUT_CLASS_NAME}
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? "name-error" : undefined}
                    />
                    <FieldError id="name-error" message={fieldErrors.name} />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-900">
                      メールアドレス（必須）
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      maxLength={254}
                      required
                      value={values.email}
                      onChange={(event) => setTextValue("email", event.target.value)}
                      className={INPUT_CLASS_NAME}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                    />
                    <FieldError id="email-error" message={fieldErrors.email} />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-medium text-slate-900">
                      会社名・店舗名・屋号（任意）
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      maxLength={120}
                      value={values.company}
                      onChange={(event) => setTextValue("company", event.target.value)}
                      className={INPUT_CLASS_NAME}
                      aria-invalid={Boolean(fieldErrors.company)}
                      aria-describedby={fieldErrors.company ? "company-error" : undefined}
                    />
                    <FieldError id="company-error" message={fieldErrors.company} />
                  </div>
                </section>

                <section className="space-y-7" aria-labelledby="store-details-heading">
                  <div>
                    <h2
                      id="store-details-heading"
                      className="text-lg font-semibold text-slate-950"
                    >
                      販売・在庫の状況
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      応募時点でCSVやExcelファイルを送る必要はありません。
                    </p>
                  </div>

                  <fieldset
                    className="space-y-3"
                    aria-invalid={Boolean(fieldErrors.salesChannels)}
                    aria-describedby={
                      fieldErrors.salesChannels
                        ? "sales-channels-help sales-channels-error"
                        : "sales-channels-help"
                    }
                  >
                    <legend className="text-sm font-medium text-slate-900">
                      販路（必須・最大2つ）
                    </legend>
                    <p id="sales-channels-help" className="text-xs text-slate-500">
                      現在利用している販路を選択してください。
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {SALES_CHANNELS.map((channel, index) => (
                        <label
                          key={channel}
                          htmlFor={`sales-channel-${index}`}
                          className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-3 text-sm text-slate-800 transition hover:bg-slate-50"
                        >
                          <input
                            id={`sales-channel-${index}`}
                            name="salesChannels"
                            type="checkbox"
                            value={channel}
                            checked={values.salesChannels.includes(channel)}
                            onChange={() => toggleSalesChannel(channel)}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-blue-700"
                          />
                          <span>{channel}</span>
                        </label>
                      ))}
                    </div>
                    <FieldError
                      id="sales-channels-error"
                      message={fieldErrors.salesChannels}
                    />
                  </fieldset>

                  <fieldset
                    className="space-y-3"
                    aria-invalid={Boolean(fieldErrors.skuRange)}
                    aria-describedby={fieldErrors.skuRange ? "sku-range-error" : undefined}
                  >
                    <legend className="text-sm font-medium text-slate-900">
                      SKU規模（必須）
                    </legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {SKU_RANGES.map((range, index) => (
                        <label
                          key={range}
                          htmlFor={`sku-range-${index}`}
                          className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm text-slate-800 transition hover:bg-slate-50"
                        >
                          <input
                            id={`sku-range-${index}`}
                            name="skuRange"
                            type="radio"
                            value={range}
                            checked={values.skuRange === range}
                            onChange={() => {
                              setValues((current) => ({ ...current, skuRange: range }));
                              clearFieldError("skuRange");
                            }}
                            className="h-4 w-4 shrink-0 accent-blue-700"
                          />
                          <span>{range}</span>
                        </label>
                      ))}
                    </div>
                    <FieldError id="sku-range-error" message={fieldErrors.skuRange} />
                  </fieldset>

                  <fieldset
                    className="space-y-3"
                    aria-invalid={Boolean(fieldErrors.csvAvailability)}
                    aria-describedby={
                      fieldErrors.csvAvailability ? "csv-availability-error" : undefined
                    }
                  >
                    <legend className="text-sm font-medium text-slate-900">
                      CSVまたはExcelを出力できるか（必須）
                    </legend>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {CSV_AVAILABILITIES.map((availability, index) => (
                        <label
                          key={availability}
                          htmlFor={`csv-availability-${index}`}
                          className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm text-slate-800 transition hover:bg-slate-50"
                        >
                          <input
                            id={`csv-availability-${index}`}
                            name="csvAvailability"
                            type="radio"
                            value={availability}
                            checked={values.csvAvailability === availability}
                            onChange={() => {
                              setValues((current) => ({
                                ...current,
                                csvAvailability: availability,
                              }));
                              clearFieldError("csvAvailability");
                            }}
                            className="h-4 w-4 shrink-0 accent-blue-700"
                          />
                          <span>{availability}</span>
                        </label>
                      ))}
                    </div>
                    <FieldError
                      id="csv-availability-error"
                      message={fieldErrors.csvAvailability}
                    />
                  </fieldset>

                  <fieldset
                    className="space-y-3"
                    aria-invalid={Boolean(fieldErrors.issues)}
                    aria-describedby={fieldErrors.issues ? "issues-error" : undefined}
                  >
                    <legend className="text-sm font-medium text-slate-900">
                      現在の課題（必須・1つ以上）
                    </legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {ISSUES.map((issue, index) => (
                        <label
                          key={issue}
                          htmlFor={`issue-${index}`}
                          className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-3 text-sm leading-6 text-slate-800 transition hover:bg-slate-50"
                        >
                          <input
                            id={`issue-${index}`}
                            name="issues"
                            type="checkbox"
                            value={issue}
                            checked={values.issues.includes(issue)}
                            onChange={() => toggleIssue(issue)}
                            className="mt-1 h-4 w-4 shrink-0 accent-blue-700"
                          />
                          <span>{issue}</span>
                        </label>
                      ))}
                    </div>
                    <FieldError id="issues-error" message={fieldErrors.issues} />
                  </fieldset>

                  <div className="space-y-2">
                    <label htmlFor="detail" className="block text-sm font-medium text-slate-900">
                      補足（任意）
                    </label>
                    <textarea
                      id="detail"
                      name="detail"
                      rows={5}
                      maxLength={2_000}
                      value={values.detail}
                      onChange={(event) => setTextValue("detail", event.target.value)}
                      placeholder="利用中の販売管理方法や、特に確認したいことがあればご記入ください。買主情報やログイン情報は記載しないでください。"
                      className={INPUT_CLASS_NAME}
                      aria-invalid={Boolean(fieldErrors.detail)}
                      aria-describedby="detail-count detail-error"
                    />
                    <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
                      <span>個人情報や認証情報は入力しないでください。</span>
                      <span id="detail-count" className="shrink-0">
                        {values.detail.length}/2,000
                      </span>
                    </div>
                    <FieldError id="detail-error" message={fieldErrors.detail} />
                  </div>
                </section>

                <section className="space-y-6" aria-labelledby="consent-heading">
                  <h2 id="consent-heading" className="text-lg font-semibold text-slate-950">
                    ご協力可否と同意
                  </h2>

                  <fieldset
                    className="space-y-3"
                    aria-invalid={Boolean(fieldErrors.caseStudyConsent)}
                    aria-describedby={
                      fieldErrors.caseStudyConsent
                        ? "case-study-help case-study-error"
                        : "case-study-help"
                    }
                  >
                    <legend className="text-sm font-medium text-slate-900">
                      匿名事例への協力可否（必須）
                    </legend>
                    <p id="case-study-help" className="text-xs leading-5 text-slate-500">
                      選択だけで公開が確定することはありません。掲載内容は別途確認します。
                    </p>
                    <div className="space-y-2">
                      {CASE_STUDY_CONSENTS.map((consent, index) => (
                        <label
                          key={consent}
                          htmlFor={`case-study-consent-${index}`}
                          className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-3 text-sm text-slate-800 transition hover:bg-slate-50"
                        >
                          <input
                            id={`case-study-consent-${index}`}
                            name="caseStudyConsent"
                            type="radio"
                            value={consent}
                            checked={values.caseStudyConsent === consent}
                            onChange={() => {
                              setValues((current) => ({
                                ...current,
                                caseStudyConsent: consent,
                              }));
                              clearFieldError("caseStudyConsent");
                            }}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-blue-700"
                          />
                          <span>{consent}</span>
                        </label>
                      ))}
                    </div>
                    <FieldError
                      id="case-study-error"
                      message={fieldErrors.caseStudyConsent}
                    />
                  </fieldset>

                  <div className="space-y-2">
                    <label
                      htmlFor="privacy-consent"
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-4 text-sm leading-6 text-slate-800"
                    >
                      <input
                        id="privacy-consent"
                        name="privacyConsent"
                        type="checkbox"
                        required
                        checked={privacyConsent}
                        onChange={(event) => {
                          setPrivacyConsent(event.target.checked);
                          clearFieldError("privacy");
                        }}
                        className="mt-1 h-4 w-4 shrink-0 accent-blue-700"
                        aria-invalid={Boolean(fieldErrors.privacy)}
                        aria-describedby={fieldErrors.privacy ? "privacy-error" : undefined}
                      />
                      <span>
                        <Link
                          href="/legal/privacy"
                          className="font-medium text-blue-700 underline underline-offset-2"
                        >
                          プライバシーポリシー
                        </Link>
                        を確認し、応募情報の取り扱いに同意します（必須）。
                      </span>
                    </label>
                    <FieldError id="privacy-error" message={fieldErrors.privacy} />
                  </div>
                </section>

                <section className="space-y-3" aria-labelledby="verification-heading">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-blue-700" aria-hidden="true" />
                    <h2
                      id="verification-heading"
                      className="text-sm font-medium text-slate-900"
                    >
                      本人確認（必須）
                    </h2>
                  </div>
                  <div
                    ref={turnstileSectionRef}
                    tabIndex={-1}
                    className="rounded-lg border border-slate-200 p-3 outline-none focus:ring-2 focus:ring-blue-600"
                    aria-describedby={
                      turnstileError || fieldErrors.turnstile
                        ? "turnstile-status turnstile-error"
                        : "turnstile-status"
                    }
                  >
                    <TurnstileWidget
                      ref={turnstileRef}
                      siteKey={TURNSTILE_SITE_KEY}
                      onVerify={(token) => {
                        setTurnstileToken(token);
                        setTurnstileError(null);
                        clearFieldError("turnstile");
                      }}
                      onError={() => {
                        setTurnstileToken("");
                        setTurnstileError(
                          "本人確認に失敗しました。表示された確認をもう一度お試しください。",
                        );
                      }}
                      onExpire={() => {
                        setTurnstileToken("");
                        setTurnstileError(
                          "本人確認の有効期限が切れました。もう一度確認してください。",
                        );
                      }}
                      onTimeout={() => {
                        setTurnstileToken("");
                        setTurnstileError(
                          "本人確認がタイムアウトしました。もう一度確認してください。",
                        );
                      }}
                    />
                    <p id="turnstile-status" className="mt-2 text-xs text-slate-500" aria-live="polite">
                      {turnstileToken
                        ? "本人確認が完了しました。"
                        : "本人確認が完了すると送信できます。"}
                    </p>
                    {(turnstileError || fieldErrors.turnstile) && (
                      <p id="turnstile-error" className="mt-2 text-sm text-destructive" role="alert">
                        {turnstileError || fieldErrors.turnstile}
                      </p>
                    )}
                  </div>
                </section>

                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="hp">この項目は空欄のままにしてください</label>
                  <input
                    id="hp"
                    name="hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={hp}
                    onChange={(event) => setHp(event.target.value)}
                  />
                </div>

                <div className="space-y-4 border-t border-slate-100 pt-6">
                  <div className="rounded-lg bg-blue-50 p-4 text-sm leading-6 text-blue-950">
                    <p className="font-medium">送信前にご確認ください</p>
                    <p className="mt-1">
                      応募時点ではCSV・Excel、買主情報、ログインID、パスワード、APIキーを送らないでください。
                    </p>
                  </div>
                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p id="submit-help" className="text-xs leading-5 text-slate-500">
                      送信中はボタンが無効になり、二重送信を防ぎます。
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto"
                      disabled={sending || !turnstileToken}
                      aria-describedby="submit-help"
                    >
                      {sending ? "送信中..." : "共同検証に応募する"}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

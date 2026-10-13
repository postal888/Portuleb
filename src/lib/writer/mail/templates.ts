import { SITE } from "@/lib/site";
import { escapeHtml } from "@/lib/essay/renderer";
import type { Locale } from "@/i18n/locales";
import type { MailMessage } from "./provider";

export type ReportEmailData = {
  locale: Locale;
  reportUrl: string;
  taskTitle: string;
  levelLabel: string | null;
  corrections: number;
  words: number;
  expiresDays: number;
  resent?: boolean;
};

type Copy = {
  subject: string;
  subjectResent: string;
  greeting: string;
  intro: string;
  introResent: string;
  level: string;
  words: string;
  corrections: string;
  cta: string;
  expiry: string;
  openHint: string;
  footer: string;
  noReply: string;
};

const COPY: Record<Locale, Copy> = {
  "pt-br": {
    subject: "Sua avaliação de escrita está pronta",
    subjectResent: "Reenvio: sua avaliação de escrita",
    greeting: "Olá!",
    intro: "A avaliação do seu texto já apareceu na tela do site. Guardamos aqui o link para voltar a ela.",
    introResent:
      "A avaliação continua na tela do site. Por segurança o reenvio traz um link novo — o anterior deixou de funcionar.",
    level: "Nível estimado",
    words: "Palavras",
    corrections: "Trechos marcados",
    cta: "Abrir a avaliação",
    expiry: "O link funciona por {days} dias e abre só esta avaliação.",
    openHint: "A avaliação aparece imediatamente no site; este e-mail é apenas a cópia do link.",
    footer: "Celpe-Dê Pé é independente do Inep/MEC: preparamos para o exame, mas inscrição e certificado são só pelos canais oficiais.",
    noReply: "Não responda a este e-mail — a caixa não é monitorada.",
  },
  en: {
    subject: "Your writing assessment is ready",
    subjectResent: "Resent: your writing assessment",
    greeting: "Hello!",
    intro: "Your text was assessed on the site and the result appeared right away. This link is your copy, for coming back to it.",
    introResent:
      "The result is still on your screen. For safety, this resend carries a new link — the previous one no longer works.",
    level: "Estimated level",
    words: "Words",
    corrections: "Marked passages",
    cta: "Open the assessment",
    expiry: "The link works for {days} days and opens this assessment only.",
    openHint: "The result shows up in the browser straight away; this email is just the link.",
    footer: "Celpe-Dê Pé is independent of Inep/MEC: we prepare you for the exam, but registration and the certificate go through official channels only.",
    noReply: "Please do not reply to this email — the inbox is not monitored.",
  },
  ru: {
    subject: "Проверка вашего текста готова",
    subjectResent: "Повторно: проверка вашего текста",
    greeting: "Здравствуйте!",
    intro: "Результат появился сразу на сайте, а эта ссылка — копия, чтобы вернуться к проверке.",
    introResent:
      "Результат по-прежнему на экране. Для безопасности повторное письмо присылает новую ссылку, а прежняя уже не открывается.",
    level: "Ориентировочный уровень",
    words: "Слов",
    corrections: "Отмеченных мест",
    cta: "Открыть проверку",
    expiry: "Ссылка работает {days} дней и открывает только эту проверку.",
    openHint: "Результат показывается сразу в браузере; это письмо — только ссылка.",
    footer: "Celpe-Dê Pé не связан с Inep/MEC: мы готовим к экзамену, но регистрация и сертификат — только через официальные каналы.",
    noReply: "Не отвечайте на это письмо — ящик не просматривается.",
  },
};

function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
}

export function renderReportEmail(data: ReportEmailData): MailMessage {
  const copy = COPY[data.locale] ?? COPY["pt-br"];
  const subject = data.resent ? copy.subjectResent : copy.subject;
  const intro = data.resent ? copy.introResent : copy.intro;

  const rows = [
    { label: copy.level, value: data.levelLabel },
    { label: copy.words, value: String(data.words) },
    { label: copy.corrections, value: String(data.corrections) },
  ].filter((row) => row.value);

  const text = [
    copy.greeting,
    "",
    intro,
    "",
    data.taskTitle,
    ...rows.map((row) => `${row.label}: ${row.value}`),
    "",
    `${copy.cta}: ${data.reportUrl}`,
    "",
    fill(copy.expiry, { days: data.expiresDays }),
    copy.openHint,
    "",
    copy.noReply,
    copy.footer,
  ].join("\n");

  const html = `<!doctype html>
<html lang="${escapeHtml(data.locale === "pt-br" ? "pt-BR" : data.locale)}">
  <body style="margin:0;padding:24px;background:#f6f4ef;font-family:Georgia,'Times New Roman',serif;color:#1c1a17">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2ddd2;border-radius:12px;padding:28px">
      <p style="margin:0 0 8px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8a8070">${escapeHtml(SITE.name)}</p>
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3">${escapeHtml(subject)}</h1>
      <p style="margin:0 0 12px">${escapeHtml(copy.greeting)}</p>
      <p style="margin:0 0 20px">${escapeHtml(intro)}</p>
      <p style="margin:0 0 12px;font-weight:bold">${escapeHtml(data.taskTitle)}</p>
      <table role="presentation" style="width:100%;border-collapse:collapse;margin:0 0 24px">
        ${rows
          .map(
            (row) =>
              `<tr><td style="padding:6px 0;color:#8a8070;font-size:14px">${escapeHtml(row.label)}</td><td style="padding:6px 0;text-align:right">${escapeHtml(row.value ?? "")}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:0 0 20px">
        <a href="${escapeHtml(data.reportUrl)}" style="display:inline-block;background:#1c1a17;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:8px">${escapeHtml(copy.cta)}</a>
      </p>
      <p style="margin:0 0 8px;font-size:13px;color:#8a8070">${escapeHtml(data.reportUrl)}</p>
      <p style="margin:0 0 8px;font-size:13px;color:#8a8070">${escapeHtml(fill(copy.expiry, { days: data.expiresDays }))}</p>
      <p style="margin:0 0 8px;font-size:13px;color:#8a8070">${escapeHtml(copy.openHint)}</p>
      <hr style="border:none;border-top:1px solid #e2ddd2;margin:20px 0">
      <p style="margin:0 0 6px;font-size:12px;color:#8a8070">${escapeHtml(copy.noReply)}</p>
      <p style="margin:0;font-size:12px;color:#8a8070">${escapeHtml(copy.footer)}</p>
    </div>
  </body>
</html>`;

  return { to: "", subject, html, text };
}

export function reportEmailCopy(locale: Locale): Copy {
  return COPY[locale] ?? COPY["pt-br"];
}

export type CabinetEmailData = {
  locale: Locale;
  enterUrl: string;
  minutes: number;
  kind?: "login" | "verify" | "reset";
};

type CabinetCopy = {
  subject: string;
  greeting: string;
  intro: string;
  cta: string;
  expiry: string;
  noReply: string;
  footer: string;
};

const CABINET_COPY: Record<"login" | "verify" | "reset", Record<Locale, CabinetCopy>> = {
  login: {
    "pt-br": {
      subject: "Link para os seus textos",
      greeting: "Olá!",
      intro: "Este link abre os textos que você já enviou com este e-mail, com as correções.",
      cta: "Abrir meus textos",
      expiry: "O link vale {minutes} minutos e funciona uma vez.",
      noReply: "Não responda a este e-mail — a caixa não é monitorada.",
      footer: COPY["pt-br"].footer,
    },
    en: {
      subject: "Link to your texts",
      greeting: "Hello!",
      intro: "This link opens the texts you already sent with this email, corrections included.",
      cta: "Open my texts",
      expiry: "The link lasts {minutes} minutes and works once.",
      noReply: "Please do not reply to this email — the inbox is not monitored.",
      footer: COPY.en.footer,
    },
    ru: {
      subject: "Ссылка на ваши тексты",
      greeting: "Здравствуйте!",
      intro: "Эта ссылка открывает тексты, которые вы уже отправляли с этой почты, вместе с правками.",
      cta: "Открыть мои тексты",
      expiry: "Ссылка действует {minutes} минут и открывается один раз.",
      noReply: "Не отвечайте на это письмо — ящик не просматривается.",
      footer: COPY.ru.footer,
    },
  },
  verify: {
    "pt-br": {
      subject: "Confirme sua conta",
      greeting: "Olá!",
      intro: "Confirme o e-mail para entrar na conta e ver seus textos com as correções.",
      cta: "Confirmar e-mail",
      expiry: "O link vale {minutes} minutos e funciona uma vez.",
      noReply: "Não responda a este e-mail — a caixa não é monitorada.",
      footer: COPY["pt-br"].footer,
    },
    en: {
      subject: "Confirm your account",
      greeting: "Hello!",
      intro: "Confirm this email to open the account and see your texts with the corrections.",
      cta: "Confirm email",
      expiry: "The link lasts {minutes} minutes and works once.",
      noReply: "Please do not reply to this email — the inbox is not monitored.",
      footer: COPY.en.footer,
    },
    ru: {
      subject: "Подтвердите кабинет",
      greeting: "Здравствуйте!",
      intro: "Подтвердите почту, чтобы войти в кабинет и увидеть тексты с правками.",
      cta: "Подтвердить почту",
      expiry: "Ссылка действует {minutes} минут и открывается один раз.",
      noReply: "Не отвечайте на это письмо — ящик не просматривается.",
      footer: COPY.ru.footer,
    },
  },
  reset: {
    "pt-br": {
      subject: "Nova senha da conta",
      greeting: "Olá!",
      intro: "Recebemos um pedido para criar uma senha nova. Se não foi você, ignore este e-mail.",
      cta: "Criar senha nova",
      expiry: "O link vale {minutes} minutos e funciona uma vez.",
      noReply: "Não responda a este e-mail — a caixa não é monitorada.",
      footer: COPY["pt-br"].footer,
    },
    en: {
      subject: "A new password for your account",
      greeting: "Hello!",
      intro: "We received a request to set a new password. If this was not you, ignore this email.",
      cta: "Set a new password",
      expiry: "The link lasts {minutes} minutes and works once.",
      noReply: "Please do not reply to this email — the inbox is not monitored.",
      footer: COPY.en.footer,
    },
    ru: {
      subject: "Новый пароль кабинета",
      greeting: "Здравствуйте!",
      intro: "Мы получили просьбу задать новый пароль. Если это были не вы, просто не открывайте ссылку.",
      cta: "Задать новый пароль",
      expiry: "Ссылка действует {minutes} минут и открывается один раз.",
      noReply: "Не отвечайте на это письмо — ящик не просматривается.",
      footer: COPY.ru.footer,
    },
  },
};

/** Account letter. It never carries the essay, the corrections, or the password. */
export function renderCabinetEmail(data: CabinetEmailData): MailMessage {
  const kind = data.kind ?? "login";
  const copy = CABINET_COPY[kind][data.locale] ?? CABINET_COPY[kind]["pt-br"];
  const expiry = fill(copy.expiry, { minutes: data.minutes });
  const text = [copy.greeting, "", copy.intro, "", `${copy.cta}: ${data.enterUrl}`, "", expiry, "", copy.noReply, copy.footer].join(
    "\n",
  );
  const html = `<!doctype html>
<html lang="${escapeHtml(data.locale === "pt-br" ? "pt-BR" : data.locale)}">
  <body style="margin:0;padding:24px;background:#f6f4ef;font-family:Georgia,'Times New Roman',serif;color:#1c1a17">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2ddd2;border-radius:12px;padding:28px">
      <p style="margin:0 0 8px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8a8070">${escapeHtml(SITE.name)}</p>
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3">${escapeHtml(copy.subject)}</h1>
      <p style="margin:0 0 12px">${escapeHtml(copy.greeting)}</p>
      <p style="margin:0 0 20px">${escapeHtml(copy.intro)}</p>
      <p style="margin:0 0 20px">
        <a href="${escapeHtml(data.enterUrl)}" style="display:inline-block;background:#1c1a17;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:8px">${escapeHtml(copy.cta)}</a>
      </p>
      <p style="margin:0 0 8px;font-size:13px;color:#8a8070">${escapeHtml(data.enterUrl)}</p>
      <p style="margin:0 0 8px;font-size:13px;color:#8a8070">${escapeHtml(expiry)}</p>
      <hr style="border:none;border-top:1px solid #e2ddd2;margin:20px 0">
      <p style="margin:0 0 6px;font-size:12px;color:#8a8070">${escapeHtml(copy.noReply)}</p>
      <p style="margin:0;font-size:12px;color:#8a8070">${escapeHtml(copy.footer)}</p>
    </div>
  </body>
</html>`;
  return { to: "", subject: copy.subject, html, text };
}

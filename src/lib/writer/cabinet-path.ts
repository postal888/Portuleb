import { isLocale } from "@/i18n/locales";

/** Cabinet lives beside the report link and stays out of the sitemap. */
export function cabinetPath(locale: string): string {
  const safe = isLocale(locale) ? locale : "pt-br";
  return `/${safe}/writing/conta`;
}

export function cabinetEnterPath(locale: string, token: string): string {
  return `${cabinetPath(locale)}/entrar/${token}`;
}

export function cabinetEssayPath(locale: string, id: string): string {
  return `${cabinetPath(locale)}/${id}`;
}

export function cabinetResetPath(locale: string, token: string): string {
  return `${cabinetPath(locale)}/senha/${token}`;
}

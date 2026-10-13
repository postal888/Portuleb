import { NextResponse } from "next/server";
import { isLocale, type Locale } from "@/i18n/locales";
import { publicOrigin } from "@/lib/site";
import { cabinetPath } from "./cabinet-path";
import {
  CABINET_COOKIE,
  CABINET_SESSION_SECONDS,
  cabinetCookieOptions,
  consumeLoginLink,
  createCabinetSession,
  readLoginLink,
  destroyCabinetSession,
  eraseCabinet,
  markAccountVerified,
  sessionFromToken,
} from "./cabinet";

export function tokenFrom(request: Request): string | null {
  const header = request.headers.get("cookie");
  if (!header) return null;
  const match = header.match(/(?:^|;)\s*celpe_cabinet=([^;]*)/);
  if (!match?.[1]) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

function localeOf(value: FormDataEntryValue | null): Locale {
  return typeof value === "string" && isLocale(value) ? value : "pt-br";
}

/** Next sees its own bind address behind the proxy, so redirects use the public origin. */
function cabinetHome(locale: Locale): URL {
  return new URL(cabinetPath(locale), publicOrigin());
}

export function enterCabinet(locale: Locale, token: string): NextResponse {
  const home = cabinetHome(locale);
  const peeked = readLoginLink(token);
  if (!peeked || peeked.purpose === "reset") {
    home.searchParams.set("status", "invalid");
    return NextResponse.redirect(home);
  }
  const link = consumeLoginLink(token);
  if (!link) {
    home.searchParams.set("status", "invalid");
    return NextResponse.redirect(home);
  }
  if (link.purpose === "verify") markAccountVerified(link.email);
  const session = createCabinetSession(link.email);
  const response = NextResponse.redirect(home);
  response.cookies.set(CABINET_COOKIE, session.token, cabinetCookieOptions(CABINET_SESSION_SECONDS));
  return response;
}

export async function logoutCabinet(request: Request): Promise<NextResponse> {
  const form = await request.formData();
  const locale = localeOf(form.get("locale"));
  destroyCabinetSession(tokenFrom(request));
  const response = NextResponse.redirect(cabinetHome(locale), 303);
  response.cookies.set(CABINET_COOKIE, "", cabinetCookieOptions(0));
  return response;
}

export async function eraseCabinetRequest(request: Request): Promise<NextResponse> {
  const form = await request.formData();
  const locale = localeOf(form.get("locale"));
  const email = sessionFromToken(tokenFrom(request));
  if (email) eraseCabinet(email);
  const home = cabinetHome(locale);
  home.searchParams.set("status", "erased");
  const response = NextResponse.redirect(home, 303);
  response.cookies.set(CABINET_COOKIE, "", cabinetCookieOptions(0));
  return response;
}

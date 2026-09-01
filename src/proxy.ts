import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { htmlLang, localeFromPathname } from "@/i18n/locales";
import { COOKIE_NAME, verifyAdminToken } from "@/lib/admin/auth-edge";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!(await verifyAdminToken(token))) {
      const login = new URL("/admin/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  const response = NextResponse.next();
  const locale = localeFromPathname(pathname);
  response.headers.set("x-site-locale", locale ? htmlLang(locale) : "pt-BR");
  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/en/:path*",
    "/ru/:path*",
    "/pt-br/:path*",
  ],
};

import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { NextRequest, NextResponse } from "next/server";
import {
  isAuthenticated,
  isRouteGuest,
  isRouteProtected,
} from "./app/[locale]/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const excludedPaths = ["/auth/google/callback"];

  if (excludedPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const authenticated = isAuthenticated(request);

  if (isRouteGuest(pathname) && authenticated) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (isRouteProtected(pathname) && !authenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};

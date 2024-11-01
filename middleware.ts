import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./app/[locale]/lib/auth";

const guestRoutes = ["login", "sign-up"];
const protectedRoutes = ["profile", "verification"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/^\/[a-z]{2}(\/|$)/, "");
  const authenticated = isAuthenticated(request);

  // console.log("Authenticated >>>>", authenticated);
  // console.log("pathname >>>>", pathname); // got /my/login
  // console.log(pathname);

  if (
    guestRoutes.some((route) => pathname.startsWith(route)) &&
    authenticated
  ) {
    // console.log("Redirect to profile");
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !authenticated
  ) {
    // console.log("Redirect to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

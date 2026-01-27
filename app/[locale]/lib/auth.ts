import { NextRequest } from "next/server";
import { TOKEN_NAME } from "../utils/constants";
import { fetchApi } from "../utils/helpers";
import Cookies from "js-cookie";
import apiPaths from "../utils/api-paths";

export const guestRoutes = ["login", "sign-up"];
export const protectedRoutes = ["profile", "verification"];

export const isAuthenticated = (request: NextRequest): boolean => {
  const token = request.cookies.get(TOKEN_NAME)?.value;

  return token != null && token !== "";
};

const getRelativePath = (pathname: string): string => {
  return pathname.replace(/^\/[a-z]{2}(\/|$)/, "");
};

export const isRouteProtected = (pathname: string): boolean => {
  const relativePath = getRelativePath(pathname).replace(/^\/+/, "");
  return protectedRoutes.some((route) => relativePath.startsWith(route));
};

export const isRouteGuest = (pathname: string): boolean => {
  const relativePath = getRelativePath(pathname);
  return guestRoutes.some((route) => relativePath.startsWith(route));
};

export const logout = async () => {
  const { status, message } = await fetchApi({
    method: "POST",
    path: apiPaths.LOGOUT,
    requireAuth: true,
  });

  if (status == 200) {
    Cookies.remove(TOKEN_NAME);
  } else {
    console.log(message);
  }
};

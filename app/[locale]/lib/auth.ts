import type { NextRequest } from "next/server";
import { TOKEN_NAME } from "../utils/constants";
import { fetchApi } from "../utils/helpers";
import apiPaths from "../utils/api-paths";
import { removeToken } from "./actions";

export const guestRoutes = ["login", "signup"];
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
  const relativePath = getRelativePath(pathname).replace(/^\/+/, "");
  return guestRoutes.some((route) => relativePath.startsWith(route));
};

export const logout = async (language: string): Promise<boolean> => {
  const res = await fetchApi({
    method: "POST",
    path: apiPaths.LOGOUT,
    body: {
      language,
    },
    requireAuth: true,
  });

  if (res?.status == 200) {
    removeToken();
    return true;
  }

  console.log(res?.message);
  return false;
};

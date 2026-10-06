"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { TOKEN_NAME } from "../../utils/constants";
import {
  isRouteProtected,
  isRouteVerification,
  logout as logoutRequest,
} from "../../lib/auth";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { fetchApi } from "../../utils/helpers";
import { User } from "../../lib";
import apiPaths from "../../utils/api-paths";
import i18nConfig from "@/i18nConfig";

interface AuthContextType {
  isLoggedIn: boolean;
  logout: () => void;
  user: User | undefined;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ locale?: string }>();
  const language = params.locale ?? i18nConfig.defaultLocale;

  const logout = async () => {
    if (await logoutRequest(language)) {
      setIsLoggedIn(false);
      setUser(undefined);
      if (isRouteProtected(pathname)) {
        router.push("/login");
      }
    }
  };

  // The provider lives in the layout and survives client navigations, so
  // re-sync with the cookie on every route change (e.g. after login pushes
  // to /profile).
  useEffect(() => {
    const token = Cookies.get(TOKEN_NAME);
    const hasToken = token != null && token !== "";
    setIsLoggedIn(hasToken);

    if (!hasToken) {
      setUser(undefined);
      return;
    }

    // An unverified account gets a 409 from the profile endpoint, which
    // redirects to /verification and would loop there.
    if (user || isRouteVerification(pathname)) {
      return;
    }

    let cancelled = false;
    fetchApi({
      method: "GET",
      path: apiPaths.PROFILE,
      body: {
        language,
      },
      requireAuth: true,
    }).then((res) => {
      if (!cancelled && res?.data?.user) setUser(res.data.user);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

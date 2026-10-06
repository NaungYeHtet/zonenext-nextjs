import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { TOKEN_NAME } from "../../utils/constants";
import { isRouteProtected } from "../../lib/auth";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { fetchApi } from "../../utils/helpers";
import { User } from "../../lib";
import apiPaths from "../../utils/api-paths";
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();

  const logout = async () => {
    const { status } = await fetchApi({
      method: "POST",
      path: apiPaths.LOGOUT,
      body: {
        language: i18n.language,
      },
      requireAuth: true,
    });

    if (status == 200) {
      Cookies.remove(TOKEN_NAME);
      setIsLoggedIn(false);
      if (isRouteProtected(pathname)) {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    const token = Cookies.get(TOKEN_NAME);
    setIsLoggedIn(token != null && token !== "");
  }, []);

  useEffect(() => {
    async function fetchUser() {
      if (!user) {
        const { data } = await fetchApi({
          method: "GET",
          path: apiPaths.PROFILE,
          body: {
            language: i18n.language,
          },
          requireAuth: true,
        });
        setUser(data.user);
      }
    }
    const token = Cookies.get(TOKEN_NAME);
    if (token) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

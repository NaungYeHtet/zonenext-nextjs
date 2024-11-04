import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { TOKEN_NAME } from "../../utils/constants";
import { isEmpty } from "lodash";
import { isRouteProtected } from "../../lib/auth";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { fetchApi } from "../../utils/helpers";
import { User } from "../../lib";
import apiPaths from "../../utils/api-paths";

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

  const logout = async () => {
    const { status, message } = await fetchApi({
      method: "POST",
      path: apiPaths.LOGIN,
      requireAuth: true,
    });

    if (status == 200) {
      Cookies.remove(TOKEN_NAME);
      setIsLoggedIn(false);
      console.log(pathname, isRouteProtected(pathname));
      isRouteProtected(pathname) && router.push("/login");
    } else {
      console.log(message);
    }
  };

  useEffect(() => {
    const token = Cookies.get(TOKEN_NAME);
    setIsLoggedIn(!isEmpty(token));
  }, []);

  useEffect(() => {
    async function fetchUser() {
      if (!user) {
        const { data } = await fetchApi({
          method: "GET",
          path: apiPaths.PROFILE,
          body: {
            language: "en",
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

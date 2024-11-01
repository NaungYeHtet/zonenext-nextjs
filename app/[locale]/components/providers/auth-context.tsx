import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { TOKEN_NAME } from "../../utils/constants";
import { isEmpty } from "lodash";
import { fetchPost } from "../../utils/helpers";
import { API_PATH_LOGOUT } from "../../utils/api-paths";
import { isRouteProtected } from "../../lib/auth";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    const response = await fetchPost(API_PATH_LOGOUT);

    if (response.status == 200) {
      Cookies.remove(TOKEN_NAME);
      setIsLoggedIn(false);
      console.log(pathname, isRouteProtected(pathname));
      isRouteProtected(pathname) && router.push("/login");
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    const token = Cookies.get(TOKEN_NAME);
    setIsLoggedIn(!isEmpty(token));
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

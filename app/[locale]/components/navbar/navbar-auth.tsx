import Link from "next/link";
import LanguageSwitch from "../language-switch";
import Logo from "../logo";
import TranslateText from "../translate-text";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/auth-context";

export default function NavbarAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      "useContext(AuthContext) must be used within an AuthProvider"
    );
  }

  const { isLoggedIn, logout } = authContext;

  return (
    <div className="compact-container py-2 inline-flex justify-between w-full">
      <Logo className="w-20 md:w-36" />
      <div className="inline-flex items-center gap-2 md:gap-7 p-1 h-full text-gray-800 text-sm md:text-xl">
        <LanguageSwitch />
        {!isLoggedIn ? (
          <>
            <Link
              className="focus:ring-2 font-medium rounded-lg focus:outline-none dark:focus:ring-blue-800 focus:ring-purple-300 focus:ring-offset-2"
              href={"/login"}
              aria-label={"Login"}
            >
              <TranslateText>general:login</TranslateText>
            </Link>
            <Link
              className="focus:ring-2 font-medium rounded-lg focus:outline-none dark:focus:ring-blue-800 focus:ring-purple-300 focus:ring-offset-2"
              href={"/sign-up"}
              aria-label={"Sign up"}
            >
              <TranslateText>general:sign_up</TranslateText>
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              className="focus:ring-2 font-medium rounded-lg focus:outline-none dark:focus:ring-blue-800 focus:ring-purple-300 focus:ring-offset-2"
              aria-label="Logout"
              onClick={() => logout()}
            >
              <TranslateText>general:logout</TranslateText>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

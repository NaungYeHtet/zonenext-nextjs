import Link from "next/link";
import LanguageSwitch from "../language-switch";
import Logo from "../logo";
import TranslateText from "../translate-text";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/auth-context";
import Dropdown from "../dropdown";
import { LuLogOut, LuUser } from "react-icons/lu";

export default function NavbarAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      "useContext(AuthContext) must be used within an AuthProvider",
    );
  }

  const { isLoggedIn, logout, user } = authContext;

  return (
    <div className="compact-container flex w-full justify-between py-2">
      <Logo className="w-20 md:w-36" />
      <div className="flex h-full items-center justify-center gap-2 text-sm text-gray-800 md:gap-7 md:text-base">
        <LanguageSwitch />
        {!isLoggedIn ? (
          <>
            <Link
              className="rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 dark:focus:ring-blue-800"
              href={"/login"}
              aria-label={"Login"}
            >
              <TranslateText>general:login</TranslateText>
            </Link>
            <Link
              className="rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 dark:focus:ring-blue-800"
              href={"/signup"}
              aria-label={"Sign up"}
            >
              <TranslateText>general:sign_up</TranslateText>
            </Link>
          </>
        ) : (
          <Dropdown>
            <Dropdown.Button className="gap-2 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 dark:focus:ring-blue-800">
              <LuUser className="size-8 fill-primary-500" />
              {/* <Image src={userAvatar} alt="avatar" width={32} height={32} /> */}
            </Dropdown.Button>
            <Dropdown.Items>
              <Dropdown.Item>
                <Link
                  href={"/profile"}
                  className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-gray-600 transition-colors duration-150 data-[focus]:bg-primary-100"
                >
                  <LuUser className="size-4 fill-gray-600" />
                  <TranslateText>general:profile</TranslateText>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <button
                  type="button"
                  className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 font-medium text-gray-600 transition-colors duration-150 data-[focus]:bg-primary-100"
                  aria-label="Logout"
                  onClick={() => logout()}
                >
                  <LuLogOut className="size-4 fill-gray-600" />
                  <TranslateText>general:logout</TranslateText>
                </button>
              </Dropdown.Item>
            </Dropdown.Items>
          </Dropdown>
        )}
      </div>
    </div>
  );
}

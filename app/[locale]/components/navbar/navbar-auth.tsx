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
      "useContext(AuthContext) must be used within an AuthProvider"
    );
  }

  const { isLoggedIn, logout, user } = authContext;

  return (
    <div className="compact-container py-2 flex justify-between w-full">
      <Logo className="w-20 md:w-36" />
      <div className="flex justify-center items-center gap-2 md:gap-7 h-full text-gray-800 text-sm md:text-base">
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
              href={"/signup"}
              aria-label={"Sign up"}
            >
              <TranslateText>general:sign_up</TranslateText>
            </Link>
          </>
        ) : (
          <Dropdown>
            <Dropdown.Button className="rounded-full focus:outline-none dark:focus:ring-blue-800 focus:ring-purple-300 focus:ring-offset-2 focus:ring-2 gap-2 bg-white border border-gray-300">
              <LuUser className="size-8 fill-primary-500" />
              {/* <Image src={userAvatar} alt="avatar" width={32} height={32} /> */}
            </Dropdown.Button>
            <Dropdown.Items>
              <Dropdown.Item>
                <Link
                  href={"/profile"}
                  className="group flex w-full items-center gap-2 rounded-lg text-gray-600 py-1.5 px-3 data-[focus]:bg-primary-100 transition-colors duration-150"
                >
                  <LuUser className="size-4 fill-gray-600" />
                  <TranslateText>general:profile</TranslateText>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <button
                  type="button"
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 text-gray-600 px-3 font-medium data-[focus]:bg-primary-100 transition-colors duration-150"
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

"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo/logo-no-background.png";
import { CiMenuBurger, CiMinimize1 } from "react-icons/ci";
import { useEffect, useState } from "react";
import { cn } from "../utils/helpers";
import { TfiClose } from "react-icons/tfi";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "./language-switch";

type NavbarItemProps = {
  text: string;
  href: string;
};

const NavbarItem = ({ text, href }: NavbarItemProps) => (
  <li className="px-3">
    <Link
      className="focus:ring-purple-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
      href={href}
      title={text}
      aria-label={text}
    >
      {text}
    </Link>
  </li>
);

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (showNavbar) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showNavbar]);

  return (
    <nav className="">
      <section className="p-1 py-2 flex md:p-3 fixed bg-white w-full z-50 md:shadow-none shadow-sm border-b border-b-primary-50">
        <button
          className="block md:hidden ml-1 mr-3"
          onClick={() => setShowNavbar(true)}
        >
          <CiMenuBurger />
        </button>
        <div className="compact-container py-2 inline-flex justify-between w-full">
          <Image
            className="w-20 md:w-36"
            src={logo}
            alt="Zone Next Logo"
            priority
          />
          <div className="inline-flex items-center gap-2 md:gap-7 p-1 h-full text-gray-800 text-sm md:text-xl">
            <LanguageSwitch />
            <Link
              className="focus:ring-2 font-medium rounded-lg focus:outline-none dark:focus:ring-blue-800 focus:ring-purple-300 focus:ring-offset-2"
              href={"/login"}
              aria-label={"Login"}
            >
              {t("general:login")}
            </Link>
            <Link
              className="focus:ring-2 font-medium rounded-lg focus:outline-none dark:focus:ring-blue-800 focus:ring-purple-300 focus:ring-offset-2"
              href={"/sign-up"}
              aria-label={"Sign up"}
            >
              {t("general:sign_up")}
            </Link>
          </div>
        </div>
      </section>
      <div
        className={cn(
          true &&
            "compact-container py-4 md:pt-28 hidden md:block bg-primary-100 w-full text-lg text-gray-900 hover:text-gray-600 transition-colors md:justify-between",
          {
            "flex inset-0 w-full h-screen top-0 left-0 justify-around z-50 fixed":
              showNavbar,
          }
        )}
      >
        <button
          className="absolute md:hidden right-5"
          onClick={() => setShowNavbar(false)}
        >
          <TfiClose />
        </button>
        <ul
          className={cn(
            true &&
              "flex flex-col font-serif md:flex-row w-full md:justify-between",
            {
              "justify-around h-full": showNavbar,
            }
          )}
        >
          <NavbarItem text={t("general:for_sale")} href="/for-sale" />
          <NavbarItem text={t("general:for_rent")} href="/for-rent" />
          <NavbarItem
            text={t("general:house_searching")}
            href="/search-house"
          />
          <NavbarItem text={t("general:agents")} href="/agents" />
          <NavbarItem text={t("general:faq")} href="/faq" />
        </ul>
      </div>
    </nav>
  );
}

"use client";

import { CiMenuBurger } from "react-icons/ci";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cn } from "../../utils/helpers";
import { TfiClose } from "react-icons/tfi";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import NavbarItem from "./navbar-item";
import NavbarAuth from "./navbar-auth";
import AuthProviderClient from "../providers/provider-client";

const navbarItems = [
  {
    text: "general:home_nav",
    path: "/",
  },
  {
    text: "general:for_rent",
    path: "/search/for-rent",
  },
  {
    text: "general:for_sale",
    path: "/search/for-sale",
  },
  {
    text: "general:agents",
    path: "/agents",
  },
  {
    text: "general:faq",
    path: "/faqs",
  },
];

type ShowNavbarButtonProps = {
  setShowNavbar: Dispatch<SetStateAction<boolean>>;
};
const ShowNavbarButton = ({ setShowNavbar }: ShowNavbarButtonProps) => {
  return (
    <button
      className="ml-1 mr-3 block md:hidden"
      onClick={() => setShowNavbar(true)}
    >
      <CiMenuBurger />
    </button>
  );
};

export default function Navbar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    if (showNavbar) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showNavbar]);

  return (
    <nav className="">
      <section className="flex w-full border-b border-b-primary-50 bg-white p-1 py-2 shadow-sm md:p-3 md:shadow-none">
        <ShowNavbarButton setShowNavbar={setShowNavbar} />
        <AuthProviderClient>
          <NavbarAuth />
        </AuthProviderClient>
      </section>
      <div
        className={cn(
          "compact-container hidden w-full bg-primary-900 py-4 text-lg text-gray-100 transition-colors md:block md:justify-between md:pt-3",
          {
            "fixed inset-0 left-0 top-0 z-50 flex h-screen w-full justify-around":
              showNavbar,
          },
        )}
      >
        <button
          className="absolute right-5 md:hidden"
          onClick={() => setShowNavbar(false)}
        >
          <TfiClose />
        </button>
        <ul
          className={cn(
            true &&
              "flex w-full flex-col font-serif md:flex-row md:justify-between",
            {
              "h-full justify-around": showNavbar,
            },
          )}
        >
          {navbarItems.map(({ path, text }) => (
            <NavbarItem
              key={path}
              text={t(text)}
              path={path}
              active={pathname.replace("my", "").endsWith(path)}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}

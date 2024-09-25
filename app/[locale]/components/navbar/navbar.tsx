"use client";

import { CiMenuBurger, CiMinimize1 } from "react-icons/ci";
import { useEffect, useState } from "react";
import { cn } from "../../utils/helpers";
import { TfiClose } from "react-icons/tfi";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import NavbarItem from "./navbar-item";
import NavbarAuth from "./navbar-auth";

const navbarItems = [
  {
    text: "general:home_nav",
    path: "/",
  },
  {
    text: "general:for_rent",
    path: "/for-rent",
  },
  {
    text: "general:for_sale",
    path: "/for-sale",
  },
  {
    text: "general:house_searching",
    path: "/house-searching",
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
  setShowNavbar: (val: boolean) => {};
};
const ShowNavbarButton = ({ setShowNavbar }: ShowNavbarButtonProps) => {
  return (
    <button
      className="block md:hidden ml-1 mr-3"
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
      <section className="p-1 py-2 flex md:p-3 bg-white w-full md:shadow-none shadow-sm border-b border-b-primary-50">
        <ShowNavbarButton setShowNavbar={() => setShowNavbar} />
        <NavbarAuth />
      </section>
      <div
        className={cn(
          "compact-container py-4 md:pt-3 hidden md:block bg-primary-100 w-full text-lg text-gray-900 hover:text-gray-600 transition-colors md:justify-between",
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

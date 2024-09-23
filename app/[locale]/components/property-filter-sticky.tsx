"use client";

import { useEffect, useState } from "react";
import PropertyFilter, { PropertyFilterValues } from "./property-filter";
import { cn } from "../utils/helpers";
import { CiSearch } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";

export default function PropertyFilterSticky({
  filters,
}: {
  filters: PropertyFilterValues;
}) {
  const [isSticky, setIsSticky] = useState(false);
  const [scrollReached, isScrollReached] = useState(false);
  const [activedByButton, setActivedByButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sticky = window.scrollY > 500;
      isScrollReached(sticky);

      if (sticky !== isSticky && window.innerWidth > 500) {
        setIsSticky(sticky);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky]);

  useEffect(() => {
    if (activedByButton) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [activedByButton]);

  return (
    <>
      <div
        className={cn(
          "transition-all duration-500 ease-in-out sticky top-0 z-50 bg-white shadow-md",
          {
            "opacity-0 translate-y-[-100%] h-0": !isSticky,
            "opacity-100 translate-y-0": isSticky,
          }
        )}
        style={{ visibility: isSticky ? "visible" : "hidden" }} // Control visibility without removing from flow
      >
        <PropertyFilter filters={filters} />
      </div>
      <div
        className={cn(
          "fixed w-12 z-50 bg-primary-200 font-bold shadow-sm items-center -right-2 bottom-5 rounded-l-full justify-center sm:hidden text-2xl pl-2 pt-2",
          {
            hidden: !scrollReached,
          }
        )}
      >
        <button
          onClick={() => {
            setIsSticky((prevVal) => !prevVal);
            setActivedByButton((preVal) => !preVal);
          }}
        >
          {isSticky ? <TfiClose /> : <CiSearch />}
        </button>
      </div>
    </>
  );
}

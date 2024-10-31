"use client";

import { useEffect, useRef, useState } from "react";
import Filter, { PropertyFilterProps } from "./filter";
import { cn } from "@/app/[locale]/utils/helpers";

export default function FilterWrapper({
  filters,
  filterParams,
}: PropertyFilterProps) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [endingPosition, setEndingPosition] = useState<number | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [activedByButton, setActivedByButton] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      // setIsSticky(window.scrollY > (endingPosition || 500));

      window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky, endingPosition]);

  useEffect(() => {
    if (activedByButton) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [activedByButton]);

  useEffect(() => {
    // This will ensure that the code only runs on the client side
    if (typeof window !== "undefined" && divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      setEndingPosition(rect.top); // Get the ending position (bottom) of the div
    }
  }, []);

  return (
    <>
      <div
        ref={divRef}
        className={cn(
          "flex justify-center w-full h-full bg-transparent md:align-middle transition-all duration-300 ease-in z-50 bg-white",
          {
            "compact-container py-10": !isSticky,
            "sticky top-0 px-3 py-3 opacity-100 translate-y-0 shadow-md":
              isSticky,
          }
        )}
      >
        <div className={cn("w-full")}>
          <Filter filters={filters} filterParams={filterParams} />
        </div>
      </div>
    </>
  );
}

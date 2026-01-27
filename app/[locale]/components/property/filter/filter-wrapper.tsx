"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { PropertyFilterProps } from "./filter";
import { cn } from "@/app/[locale]/utils/helpers";
import FilterSkeleton from "./filter-skeleton";
import dynamic from "next/dynamic";

const Filter = dynamic(() => import("./filter"), {
  ssr: false,
  loading: () => <FilterSkeleton />,
});

export default function FilterWrapper({
  filters,
  filterParams,
}: PropertyFilterProps) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [endingPosition, setEndingPosition] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () =>
      // setIsSticky(window.scrollY > (endingPosition || 500));

      window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [endingPosition]);

  // useEffect(() => {
  //   if (activedByButton) {
  //     document.body.classList.add("no-scroll");
  //   } else {
  //     document.body.classList.remove("no-scroll");
  //   }
  // }, [activedByButton]);

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
          "z-40 flex h-full w-full justify-center bg-transparent bg-white transition-all duration-300 ease-in md:align-middle",
          {
            "compact-container py-10": true,
            "sticky top-0 translate-y-0 px-3 py-3 opacity-100 shadow-md":
              false,
          },
        )}
      >
        <div className={cn("w-full")}>
          <Suspense fallback={<FilterSkeleton />}>
            <Filter filters={filters} filterParams={filterParams} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

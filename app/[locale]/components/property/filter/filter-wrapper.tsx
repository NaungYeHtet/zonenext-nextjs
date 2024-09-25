"use client";

import { useEffect, useRef, useState } from "react";
import Filter, { PropertyFilterValues } from "./filter";
import FilterSticky from "./filter-sticky";

type FilterWrapperProps = {
  filters: PropertyFilterValues;
};

export default function FilterWrapper({ filters }: FilterWrapperProps) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [endingPosition, setEndingPosition] = useState<number | null>(null);

  useEffect(() => {
    // This will ensure that the code only runs on the client side
    if (typeof window !== "undefined" && divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      setEndingPosition(rect.bottom); // Get the ending position (bottom) of the div
    }
  }, []);

  return (
    <>
      <div
        ref={divRef}
        className="flex justify-center w-full h-full bg-transparent compact-container md:align-middle"
      >
        <div className="w-full mx-3 my-10">
          <Filter filters={filters} />
        </div>
      </div>
      <FilterSticky filters={filters} startingPosition={endingPosition} />
    </>
  );
}

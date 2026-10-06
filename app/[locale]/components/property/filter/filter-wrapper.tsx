import { HTMLAttributes } from "react";
import Filter, { PropertyFilterProps } from "./filter";
import { cn } from "@/app/[locale]/utils/helpers";

// Shared with FilterSectionSkeleton so the Suspense swap doesn't shift layout.
export function FilterContainer({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "compact-container z-40 flex h-full w-full justify-center bg-white py-10",
        className,
      )}
      {...props}
    >
      <div className="w-full">{children}</div>
    </div>
  );
}

export default function FilterWrapper({
  filters,
  filterParams,
}: PropertyFilterProps) {
  return (
    <FilterContainer className="transition-all duration-300 ease-in md:align-middle">
      <Filter filters={filters} filterParams={filterParams} />
    </FilterContainer>
  );
}

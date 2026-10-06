import Filter, { PropertyFilterProps } from "./filter";

export default function FilterWrapper({
  filters,
  filterParams,
}: PropertyFilterProps) {
  return (
    <div className="compact-container z-40 flex h-full w-full justify-center bg-white py-10 transition-all duration-300 ease-in md:align-middle">
      <div className="w-full">
        <Filter filters={filters} filterParams={filterParams} />
      </div>
    </div>
  );
}

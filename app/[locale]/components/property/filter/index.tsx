import { API_PATH_PROPERTY_FILTER } from "@/app/[locale]/utils/api-paths";
import { fetchGet } from "@/app/[locale]/utils/helpers";
import FilterWrapper from "./filter-wrapper";
import { PropertyFilterParams } from "@/app/[locale]/lib";

type PropertyFilterProps = {
  filterParams: PropertyFilterParams;
};

export default async function PropertyFilter({
  filterParams,
}: PropertyFilterProps) {
  const filters = await fetchGet(
    API_PATH_PROPERTY_FILTER,
    { language: filterParams.locale },
    { next: { revalidate: 0 } }
  );

  return <FilterWrapper filters={filters} filterParams={filterParams} />;
}

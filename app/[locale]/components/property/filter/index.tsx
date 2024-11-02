import { API_PATH_PROPERTY_FILTER } from "@/app/[locale]/utils/api-paths";
import { fetchApi } from "@/app/[locale]/utils/helpers";
import FilterWrapper from "./filter-wrapper";
import { PropertyFilterParams } from "@/app/[locale]/lib";

type PropertyFilterProps = {
  filterParams: PropertyFilterParams;
};

export default async function PropertyFilter({
  filterParams,
}: PropertyFilterProps) {
  const { data } = await fetchApi({
    method: "GET",
    path: API_PATH_PROPERTY_FILTER,
    body: { language: filterParams.locale },
    options: { cache: "no-store" },
  });

  return <FilterWrapper filters={data} filterParams={filterParams} />;
}

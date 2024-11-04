import { fetchApi } from "@/app/[locale]/utils/helpers";
import FilterWrapper from "./filter-wrapper";
import { PropertyFilterParams } from "@/app/[locale]/lib";
import apiPaths from "@/app/[locale]/utils/api-paths";

type PropertyFilterProps = {
  filterParams: PropertyFilterParams;
};

export default async function PropertyFilter({
  filterParams,
}: PropertyFilterProps) {
  const { data } = await fetchApi({
    method: "GET",
    path: apiPaths.PROPERTY_FILTER,
    body: { language: filterParams.locale },
    options: { next: { revalidate: 60 * 60 * 24 } },
  });

  return <FilterWrapper filters={data} filterParams={filterParams} />;
}

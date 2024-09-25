import { API_PATH_PROPERTY_FILTER } from "@/app/[locale]/utils/api-paths";
import { fetchGet } from "@/app/[locale]/utils/helpers";
import FilterWrapper from "./filter-wrapper";

type PropertyFilterProps = {
  locale: string;
};

export default async function PropertyFilter({ locale }: PropertyFilterProps) {
  const filters = await fetchGet(
    API_PATH_PROPERTY_FILTER,
    { language: locale },
    { next: { revalidate: 0 } }
  );

  return <FilterWrapper filters={filters} />;
}

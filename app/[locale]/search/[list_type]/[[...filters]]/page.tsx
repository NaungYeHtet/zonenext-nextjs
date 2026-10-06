import {
  PROPERTY_LIST_TYPE,
  PropertyFilterParams,
  PropertyFilterQueryParams,
} from "@/app/[locale]/lib";
import Wrapper from "@/app/[locale]/wrapper";
import PropertyList from "@/app/[locale]/components/property/property-list";
import { parseSearchFilters } from "./parse-filters";

type SearchPageProps = {
  params: { locale: string; list_type: PROPERTY_LIST_TYPE; filters?: string[] };
  searchParams: PropertyFilterQueryParams;
};

export default async function Search({
  params,
  searchParams,
}: SearchPageProps) {
  const { filters, locale, list_type } = params;
  const filterParams: PropertyFilterParams = {
    locale,
    list_type,
    ...parseSearchFilters(filters),
    ...searchParams,
  };

  return (
    <Wrapper params={filterParams}>
      <PropertyList params={filterParams} />
    </Wrapper>
  );
}

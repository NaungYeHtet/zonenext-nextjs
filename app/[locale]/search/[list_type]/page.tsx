import {
  PropertyFilterQueryParams,
  PropertyFilterRouteParams,
} from "../../lib";
import Wrapper from "@/app/[locale]/wrapper";
import PropertyList from "@/app/[locale]/components/property/property-list";

export type PropertyListPageProps = {
  params: PropertyFilterRouteParams;
  searchParams: PropertyFilterQueryParams;
};

export default async function ListType({
  params,
  searchParams,
}: PropertyListPageProps) {
  return (
    <Wrapper params={{ ...params, ...searchParams }}>
      <PropertyList params={{ ...params, ...searchParams }} />
    </Wrapper>
  );
}

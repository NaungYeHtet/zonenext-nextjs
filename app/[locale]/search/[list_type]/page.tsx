import { PropertyFilterParams } from "../../lib";
import Wrapper from "@/app/[locale]/wrapper";
import PropertyList from "@/app/[locale]/components/property/property-list";

export type PropertyListPageProps = {
  params: PropertyFilterParams;
};

export default async function ListType({ params }: PropertyListPageProps) {
  return (
    <Wrapper params={params}>
      <PropertyList filterParams={params} />
    </Wrapper>
  );
}

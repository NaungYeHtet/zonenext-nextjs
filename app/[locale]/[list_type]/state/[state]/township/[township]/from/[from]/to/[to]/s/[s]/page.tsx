import { PropertyListPageProps } from "@/app/[locale]/[list_type]/page";
import Wrapper from "@/app/[locale]/[list_type]/wrapper";
import PropertyList from "@/app/[locale]/components/property/property-list";

export default async function ListType({ params }: PropertyListPageProps) {
  return (
    <Wrapper params={params}>
      <PropertyList filterParams={params} />
    </Wrapper>
  );
}

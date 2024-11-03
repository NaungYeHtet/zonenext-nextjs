import { Property } from "../../lib";
import PropertyCardLong from "./property-card-long";
import PropertyCard from "./property-card";

type PropertyListViewProps = {
  properties: Property[];
  pathname: string;
};

export function PropertyListView({
  properties,
  pathname,
}: PropertyListViewProps) {
  return (
    <>
      <div className="hidden flex-col gap-7 lg:flex">
        {properties.map((property) => (
          <PropertyCardLong key={property.slug} property={property} />
        ))}
      </div>
      <div className="grid grid-cols-1 items-center md:grid-cols-2 lg:hidden">
        {properties.map((property) => (
          <PropertyCard key={property.slug} property={property} />
        ))}
      </div>
    </>
  );
}

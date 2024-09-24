import { Property } from "../../lib";
import PropertyCard from "./property-card";
import PropertyCardLong from "./property-card-long";

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
      <div className="flex-col hidden lg:flex gap-7">
        {properties.map((property) => (
          <PropertyCardLong
            key={property.slug}
            property={property}
            pathname={pathname}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center lg:hidden gap-7">
        {properties.map((property) => (
          <PropertyCard
            key={property.slug}
            property={property}
            pathname={pathname}
          />
        ))}
      </div>
    </>
  );
}

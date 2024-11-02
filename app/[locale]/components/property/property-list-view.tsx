import dynamic from "next/dynamic";
import { Property } from "../../lib";
import { LoadingSkeleton } from "./property-list";

const PropertyCardLong = dynamic(() => import("./property-card-long"), {
  loading: () => <LoadingSkeleton />,
});
const PropertyCard = dynamic(() => import("./property-card"), {
  loading: () => <LoadingSkeleton />,
});

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
          <PropertyCardLong key={property.slug} property={property} />
        ))}
      </div>
      <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:hidden gap-7">
        {properties.map((property) => (
          <PropertyCard key={property.slug} property={property} />
        ))}
      </div>
    </>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { CollectionData, Property } from "../utils";
import PropertyCard from "./property-card";
import PropertyCardLong from "./property-card-long";

type PropertyListProps = {
  propertyList: CollectionData<Property>;
};

export default async function PropertyList({
  propertyList,
}: PropertyListProps) {
  const pathname = usePathname();

  return (
    <div className="relative flex-grow">
      <div className="flex justify-between mb-3">
        <span className="text-sm text-gray-500">
          {propertyList.meta.total} Properties
        </span>
        <span className="text-sm text-gray-500">Order here</span>
      </div>
      <div className="flex-col hidden lg:flex gap-7">
        {propertyList.properties.map((property) => (
          <PropertyCardLong
            key={property.slug}
            property={property}
            pathname={pathname}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-7">
        {propertyList.properties.map((property) => (
          <PropertyCard
            key={property.slug}
            property={property}
            pathname={pathname}
          />
        ))}
      </div>
    </div>
  );
}

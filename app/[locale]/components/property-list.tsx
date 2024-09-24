"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { CollectionData, Property } from "../lib";
import PropertyCard from "./property-card";
import PropertyCardLong from "./property-card-long";
import Pagination from "./pagination";
import { useEffect, useState } from "react";
import { API_PATH_PROPERTY } from "../utils/api-paths";
import { useTranslation } from "react-i18next";
import { fetchGet } from "../utils/helpers";
import { PropertyCardLongSkeleton, PropertyCardSkeleton } from "./skeletons";

type PropertyHeaderProps = {
  total: number;
};

function PropertyHeader({ total }: PropertyHeaderProps) {
  return (
    <div className="flex justify-between mb-3">
      <span className="text-sm text-gray-500">{total} Properties</span>
      <span className="text-sm text-gray-500">Order here</span>
    </div>
  );
}

type PropertyListViewProps = {
  properties: Property[];
  pathname: string;
};

function PropertyListView({ properties, pathname }: PropertyListViewProps) {
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

type PaginationSectionProps = {
  links: any[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

function PaginationSection({
  links,
  currentPage,
  setCurrentPage,
}: PaginationSectionProps) {
  return (
    <div className="py-5 flex justify-center">
      <Pagination links={links} currentPageNumber={currentPage} />
    </div>
  );
}

const LoadingSkeleton = () => (
  <>
    <div className="flex-col hidden lg:flex gap-7">
      {[...Array(6)].map((_, index) => (
        <PropertyCardLongSkeleton key={index} />
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 items-center lg:hidden gap-7">
      {[...Array(6)].map((_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}
    </div>
  </>
);

function PropertyList() {
  const pathname = usePathname();
  const [properties, setProperties] = useState<CollectionData<Property>>();
  const { i18n } = useTranslation();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchProperties() {
      let responseData = await fetchGet(API_PATH_PROPERTY, {
        language: i18n.language,
        list_type: "for_sale",
        page: currentPage,
        ...Object.fromEntries(searchParams.entries()),
      });

      setProperties(responseData.properties);
    }
    fetchProperties();
  }, [currentPage, i18n.language, searchParams]);

  if (!properties) {
    return (
      <div className="relative flex-grow z-0">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="relative flex-grow z-0">
      <PropertyHeader total={properties.total} />
      <PropertyListView properties={properties.data} pathname={pathname} />
      <PaginationSection
        links={properties.links}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default PropertyList;

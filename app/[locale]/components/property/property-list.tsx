"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { CollectionData, Property, PropertyFilterParams } from "../../lib";
import Pagination from "../pagination";
import { useEffect, useState } from "react";
import { API_PATH_PROPERTY } from "../../utils/api-paths";
import { useTranslation } from "react-i18next";
import { fetchGet } from "../../utils/helpers";
import { PropertyCardLongSkeleton, PropertyCardSkeleton } from "../skeletons";
import { PropertyListView } from "./property-list-view";

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

type PropertyListProps = {
  filterParams: PropertyFilterParams;
};

function PropertyList({
  filterParams: { list_type, state, township, type, from, to, s },
}: PropertyListProps) {
  const pathname = usePathname();
  const [properties, setProperties] = useState<CollectionData<Property>>();
  const { i18n } = useTranslation();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log(state, township, type, list_type, from, to);
    async function fetchProperties() {
      let responseData = await fetchGet(API_PATH_PROPERTY, {
        language: i18n.language,
        page: currentPage,
        state,
        township,
        type: type && decodeURI(type),
        list_type,
        price_from: from,
        price_to: to,
        search: s,
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

  if (properties.total == 0) {
    return (
      <div className="relative flex-grow z-0">
        <div className="flex justify-center items-center h-full">
          <span className="text-sm text-gray-500">No properties found</span>
        </div>
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

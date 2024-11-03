"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { CollectionData, Property, PropertyFilterParams } from "../../lib";
import Pagination from "../pagination";
import { Suspense, useEffect, useState } from "react";
import { API_PATH_PROPERTY } from "../../utils/api-paths";
import { useTranslation } from "react-i18next";
import { fetchApi } from "../../utils/helpers";
import { PropertyCardLongSkeleton, PropertyCardSkeleton } from "../skeletons";
import { PropertyListView } from "./property-list-view";
import PropertyNotFound from "./property-not-found";

type PropertyHeaderProps = {
  total: number;
};

function PropertyHeader({ total }: PropertyHeaderProps) {
  return (
    <div className="m-3 flex justify-between">
      <span className="text-sm text-gray-500">{total} Properties</span>
      <span className="text-sm text-gray-500">Order here</span>
    </div>
  );
}

type PaginationSectionProps = {
  links: any[];
};

function PaginationSection({ links }: PaginationSectionProps) {
  return (
    <div className="flex justify-center py-5">
      <Pagination links={links} />
    </div>
  );
}

export const LoadingSkeleton = () => (
  <>
    <div className="hidden flex-col gap-7 lg:flex">
      {[...Array(6)].map((_, index) => (
        <PropertyCardLongSkeleton key={index} />
      ))}
    </div>
    <div className="grid grid-cols-1 items-center gap-7 md:grid-cols-2 lg:hidden">
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
  filterParams: { list_type, state, township, type },
}: PropertyListProps) {
  const pathname = usePathname();
  const [properties, setProperties] = useState<CollectionData<Property>>();
  const { i18n } = useTranslation();
  const searchParams = useSearchParams();
  const [currentPage] = useState(1);

  useEffect(() => {
    async function fetchProperties() {
      const {
        data: { properties },
      } = await fetchApi({
        method: "GET",
        path: API_PATH_PROPERTY,
        body: {
          language: i18n.language,
          page: currentPage,
          state,
          township,
          type: type && decodeURI(type),
          list_type,
          ...Object.fromEntries(searchParams.entries()),
        },
      });

      setProperties(properties);
    }
    fetchProperties();
  }, [
    list_type,
    state,
    township,
    type,
    currentPage,
    i18n.language,
    searchParams,
  ]);

  if (!properties) {
    return (
      <div className="relative z-0 flex-grow">
        <LoadingSkeleton />
      </div>
    );
  }

  if (properties.total == 0) {
    return <PropertyNotFound />;
  }

  return (
    <section className="relative z-0 flex-grow">
      <PropertyHeader total={properties.total} />
      <PropertyListView properties={properties.data} pathname={pathname} />
      <PaginationSection links={properties.links} />
    </section>
  );
}

export default PropertyList;

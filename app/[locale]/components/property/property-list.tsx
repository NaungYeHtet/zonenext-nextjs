import { PropertyFilterParams } from "../../lib";
import Pagination from "../pagination";
import { use } from "react";
import { fetchApi } from "../../utils/helpers";
import { PropertyCardLongSkeleton, PropertyCardSkeleton } from "../skeletons";
import { PropertyListView } from "./property-list-view";
import PropertyNotFound from "./property-not-found";
import apiPaths from "../../utils/api-paths";

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

async function fetchProperties({
  list_type,
  state,
  township,
  page,
  type,
  locale,
  keyword,
  price_from,
  price_to,
}: PropertyFilterParams) {
  const body = {
    language: locale,
    page,
    state,
    township,
    type: type && decodeURI(type),
    list_type,
    search: keyword,
    price_from,
    price_to,
  };

  console.log(body);

  const {
    data: { properties },
  } = await fetchApi({
    method: "GET",
    path: apiPaths.PROPERTY,
    body,
    options: { next: { revalidate: 0 } },
    // options: { next: { revalidate: 60 * 60 * 24 } },
  });

  return properties;
}

type PropertyListProps = {
  params: PropertyFilterParams;
};

function PropertyList({ params }: PropertyListProps) {
  const properties = use(fetchProperties(params));

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
      <PropertyListView properties={properties.data} />
      <PaginationSection links={properties.links} />
    </section>
  );
}

export default PropertyList;

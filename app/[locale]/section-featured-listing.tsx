import PropertyCard from "./components/property/property-card";
import { GroupData, Property, ResponseData } from "./lib";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { API_PATH_GROUP } from "./utils/api-paths";
import { fetchApi } from "./utils/helpers";
import dynamic from "next/dynamic";
import PropertyCardSkeleton from "./components/property/skeletons/property-card-skeleton";

const CarouselSlider = dynamic(() => import("./components/carousel-slider"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-between gap-10">
      <PropertyCardSkeleton className="hidden lg:flex" />
      <PropertyCardSkeleton className="hidden md:flex" />
      <PropertyCardSkeleton />
    </div>
  ),
});

export default async function SectionFeaturedListing({
  locale,
}: {
  locale: string;
}) {
  const {
    data: { group },
  }: ResponseData<GroupData<Property>> = await fetchApi({
    method: "GET",
    path: API_PATH_GROUP,
    body: {
      language: locale,
      type: "FeaturedListings",
    },
    options: {
      next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 43200 },
    },
  });

  return (
    <section
      className="h-full bg-gray-50 px-4 py-24 text-center md:px-4"
      aria-label="Fetured Listing"
    >
      <h2 className="mb-3 text-xl md:text-2xl">{group.name}</h2>
      <p className="md:text-md text-sm text-gray-500">{group.description}</p>
      <div className="compact-container mx-auto mt-8 h-full">
        <CarouselSlider
          centeredSlides={false}
          centerInsufficientSlides={true}
          spaceBetween={50}
          autoplay={{ delay: 5000 }}
          loop
          pagination={{
            clickable: true,
            el: ".swiper-custom-pagination",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            1200: {
              slidesPerView: 2,
            },
            1400: {
              slidesPerView: 3,
            },
          }}
        >
          {group.items.map((property: Property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </CarouselSlider>
      </div>
    </section>
  );
}

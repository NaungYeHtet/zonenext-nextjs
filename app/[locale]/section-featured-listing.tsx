import PropertyCard from "./components/property/property-card";
import { GroupData, Property, ResponseData } from "./lib";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import apiPaths from "./utils/api-paths";
import { fetchApi } from "./utils/helpers";
import CarouselSlider from "./components/carousel-slider";
import { HOME_CAROUSEL_PROPS } from "./components/carousel-presets";

export default async function SectionFeaturedListing({
  locale,
}: {
  locale: string;
}) {
  const {
    data: { group },
  }: ResponseData<GroupData<Property>> = await fetchApi({
    method: "GET",
    path: apiPaths.GROUP,
    body: {
      language: locale,
      type: "FeaturedListings",
    },
    options: {
      next: { revalidate: 60 * 60 * 24 },
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
          {...HOME_CAROUSEL_PROPS}
          autoplay={{
            disableOnInteraction: false, // Optional, but recommended
            delay: 5000,
            pauseOnMouseEnter: true,
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

import CarouselSlider from "./components/carousel-slider";
import PropertyCard from "./components/property/property-card";
import { GroupData, Property, ResponseData } from "./lib";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { API_PATH_GROUP } from "./utils/api-paths";
import { fetchApi } from "./utils/helpers";

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
      className="h-full px-4 py-24 text-center bg-gray-50 md:px-4"
      aria-label="Fetured Listing"
    >
      <h2 className="mb-3 text-xl md:text-2xl">{group.name}</h2>
      <p className="text-sm text-gray-500 md:text-md">{group.description}</p>
      <div className="h-full mx-auto mt-8 compact-container">
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
            <PropertyCard
              key={property.slug}
              property={property}
              pathname={`property/${property.slug}`}
            />
          ))}
        </CarouselSlider>
      </div>
    </section>
  );
}

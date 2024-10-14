import CarouselSlider from "./components/carousel-slider";
import PropertyCard from "./components/property/property-card";
import { GroupData, Property } from "./lib";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { fetchGet } from "./utils/helpers";
import { API_PATH_GROUP } from "./utils/api-paths";

export default async function SectionFeaturedListing({
  locale,
}: {
  locale: string;
}) {
  const { group }: GroupData<Property> = await fetchGet(
    API_PATH_GROUP,
    {
      language: locale,
      type: "FeaturedListings",
    },
    {
      next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 43200 },
    }
  );

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
            865: {
              slidesPerView: 2,
            },
            1000: {
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

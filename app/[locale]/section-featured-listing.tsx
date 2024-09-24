import CarouselSlider from "./components/carousel-slider";
import PropertyCard from "./components/property-card";
import { GroupData, Property, ResponseData } from "./lib";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default async function SectionFeaturedListing({
  locale,
}: {
  locale: string;
}) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/groups?language=${locale}&type=FeaturedListings`,
    {
      next: { revalidate: 0 },
    }
  );

  let {
    data: { group },
  }: ResponseData<GroupData<Property>> = await data.json();

  return (
    <section
      className="bg-gray-50 px-4 h-full md:px-4 py-24 text-center"
      aria-label="Fetured Listing"
    >
      <h2 className="text-xl md:text-2xl mb-3">{group.name}</h2>
      <p className="text-sm md:text-md text-gray-500">{group.description}</p>
      <div className="compact-container h-full mx-auto mt-8">
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
              property={property}
              pathname={`property/${property.slug}`}
            />
          ))}
        </CarouselSlider>
      </div>
    </section>
  );
}

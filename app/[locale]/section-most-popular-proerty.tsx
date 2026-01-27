import { GroupData, Property, ResponseData } from "./lib";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import apiPaths from "./utils/api-paths";
import { fetchApi } from "./utils/helpers";
import dynamic from "next/dynamic";
import PropertyCard from "./components/property/property-card";
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

export default async function SectionMostPopularProperty({
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
      type: "MostPopularProperties",
    },
    options: {
      next: { revalidate: 60 * 60 * 24 },
    },
  });

  return (
    <section
      className="h-full bg-gray-50 px-4 py-24 text-center md:px-4"
      aria-label="Top ten projects"
    >
      <h2 className="mb-3 text-xl md:text-2xl">{group.name}</h2>
      <p className="md:text-md text-sm text-gray-500">{group.description}</p>
      <div className="compact-container mx-auto mt-8 h-full">
        <CarouselSlider
          id="TopTenProjects"
          centeredSlides={false}
          centerInsufficientSlides={true}
          spaceBetween={50}
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
          autoplay={{
            disableOnInteraction: false, // Optional, but recommended
            delay: 3000,
            pauseOnMouseEnter: true,
          }}
        >
          {group.items.map((property: Property, i) => (
            <PropertyCard key={i} property={property} />
          ))}
        </CarouselSlider>
      </div>
    </section>
  );
}

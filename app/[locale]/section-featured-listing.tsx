import CarouselSlider from "./components/carousel-slider";
import PropertyCard from "./components/property-card";
import { GroupData, Property, ResponseData } from "./utils";

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
      className="compact-container bg-gray-50 px-4 md:px-4 py-20 text-center"
      aria-label="Fetured Listing"
    >
      <h2 className="text-xl md:text-2xl mb-3">{group.name}</h2>
      <p className="text-sm md:text-md text-gray-500">{group.description}</p>
      <div className="compact-container container mx-auto mt-8">
        <CarouselSlider>
          {group.items.map((property: Property) => (
            <PropertyCard property={property} />
          ))}
        </CarouselSlider>
      </div>
    </section>
  );
}

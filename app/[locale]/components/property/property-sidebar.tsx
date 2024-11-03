import dynamic from "next/dynamic";
import { Group, Property } from "../../lib";
import SidebarSection from "../sidebar-section";
import { PropertyCardCompact } from "./property-card";
import PropertyCardCompactSkeleton from "./skeletons/property-card-compact-skeleton";

const CarouselSlider = dynamic(() => import("../carousel-slider"), {
  ssr: false,
  loading: () => <PropertyCardCompactSkeleton />,
});

type PropertySidebarProps = {
  group: Group<Property>;
};

export function PropertySidebar({
  group: { name, items },
}: PropertySidebarProps) {
  return (
    <div className="w-[350px]">
      <SidebarSection>
        <SidebarSection.Item title={name}>
          <CarouselSlider
            spaceBetween={0}
            pagination={false}
            slidesPerView={1}
            navigation={{}}
          >
            {items.map((property: Property) => (
              <PropertyCardCompact property={property} key={property.slug} />
            ))}
          </CarouselSlider>
        </SidebarSection.Item>
      </SidebarSection>
    </div>
  );
}

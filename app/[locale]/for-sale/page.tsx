import Breadcrumb from "../components/breadcumb/breadcrumb";
import Navbar from "../components/navbar/navbar";
import { PropertyCardMin } from "../components/property/property-card";
import PropertyFilter from "../components/property/property-filter";
import PropertyFilterSticky from "../components/property/property-filter-sticky";
import PropertyList from "../components/property/property-list";
import TranslationsProvider from "../components/translation-provider";
import initTranslations from "../utils/i18n";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { fetchGet } from "../utils/helpers";
import { API_PATH_GROUP, API_PATH_PROPERTY_FILTER } from "../utils/api-paths";
import { Group, Property } from "../lib";
import CarouselSlider from "../components/carousel-slider";
import SidebarSection from "../components/sidebar-section";

const i18nNamespaces = ["general", "default"];

type PropertyListPageProps = {
  params: {
    locale: string;
    search: string;
    page: string;
  };
};

export default async function ForSale({
  params: { locale },
}: PropertyListPageProps) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const filters = await fetchGet(
    API_PATH_PROPERTY_FILTER,
    { language: locale },
    { next: { revalidate: 0 } }
  );

  const { group } = await fetchGet(
    API_PATH_GROUP,
    { language: locale, type: "FeaturedListings" },
    {
      next: { revalidate: 0 },
    }
  );

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <div className="flex flex-col">
        <div className="">
          <Navbar />
        </div>
        <main>
          <div className="flex justify-center w-full h-full bg-transparent compact-container md:align-middle">
            <div className="w-full m-3">
              <PropertyFilter filters={filters} />
            </div>
          </div>

          <PropertyFilterSticky filters={filters} />

          <div className="flex flex-col justify-between w-full gap-10 mt-3 compact-container xl:flex-row">
            <section aria-label="Property list section">
              <Breadcrumb
                items={[
                  { label: "home_nav", path: "/" },
                  { label: "for_sale", path: "/for-sale" },
                ]}
              />
              <PropertyList />
            </section>
            <section aria-label="Sidebar section" className="z-0">
              <ForSaleSidebar group={group} />
            </section>
          </div>
        </main>
      </div>
    </TranslationsProvider>
  );
}

type ForSaleSidebarProps = {
  group: Group<Property>;
};

function ForSaleSidebar({ group: { name, items } }: ForSaleSidebarProps) {
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
              <PropertyCardMin
                property={property}
                key={property.slug}
                pathname="/for-sale"
              />
            ))}
          </CarouselSlider>
        </SidebarSection.Item>
      </SidebarSection>
    </div>
  );
}

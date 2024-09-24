import Breadcrumb from "../components/breadcumb";
import Navbar from "../components/navbar";
import PropertyFilter from "../components/property-filter";
import PropertyFilterSticky from "../components/property-filter-sticky";
import PropertyList from "../components/property-list";
import TranslationsProvider from "../components/translation-provider";
import initTranslations from "../utils/i18n";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

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

  const filterData = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/property-filters?language=${locale}`,
    {
      next: { revalidate: 0 },
    }
  );
  let filters = await filterData.json();

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
              <PropertyFilter filters={filters.data} />
            </div>
          </div>

          <PropertyFilterSticky filters={filters.data} />

          <section
            aria-label="Property list section"
            className="compact-container"
          >
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "For Sale", path: "/for-sale" },
              ]}
            />

            <div className="flex flex-col justify-between w-full gap-10 mt-3 xl:flex-row">
              <div className="flex-grow">
                <PropertyList />
              </div>
              <div className="w-72">Sidebar</div>
            </div>
          </section>
        </main>
      </div>
    </TranslationsProvider>
  );
}

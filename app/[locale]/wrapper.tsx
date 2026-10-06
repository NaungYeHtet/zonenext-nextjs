import { ReactNode, Suspense } from "react";
import Navbar from "./components/navbar/navbar";
import TranslationsProvider from "./components/translation-provider";
import initTranslations from "./utils/i18n";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import PropertyFilter from "./components/property/filter";
import { PropertySidebar } from "./components/property/property-sidebar";
import { fetchApi } from "./utils/helpers";
import Breadcrumb from "./components/breadcumb/breadcrumb";
import { PropertyFilterParams } from "./lib";
import apiPaths from "./utils/api-paths";
import BaseFooter from "./components/footer";
import { FilterSectionSkeleton } from "./section-skeletons";

const i18nNamespaces = ["general"];

type LayoutProps = {
  children: ReactNode;
  params: PropertyFilterParams;
};

export default async function Wrapper({ children, params }: LayoutProps) {
  const [
    { resources },
    {
      data: { group },
    },
  ] = await Promise.all([
    initTranslations(params.locale, i18nNamespaces),
    fetchApi({
      method: "GET",
      path: apiPaths.GROUP,
      body: { language: params.locale, type: "FeaturedListings" },
      options: { next: { revalidate: 60 * 60 * 24 } },
    }),
  ]);

  return (
    <TranslationsProvider
      resources={resources}
      locale={params.locale}
      namespaces={i18nNamespaces}
    >
      <div className="flex flex-col">
        <div>
          <Navbar />
        </div>
        <main>
          <Suspense fallback={<FilterSectionSkeleton />}>
            <PropertyFilter filterParams={params} />
          </Suspense>
          <div className="md:compact-container mt-3 flex w-full flex-col justify-between gap-10 xl:flex-row">
            <section aria-label="Property list section">
              <Breadcrumb
                items={[
                  { label: "home_nav", path: "/" },
                  {
                    label: params.list_type.replace("-", "_"),
                    path: params.list_type,
                  },
                ]}
              />
              {children}
            </section>

            <section aria-label="Sidebar section" className="z-0">
              <PropertySidebar group={group} />
            </section>
          </div>
        </main>
        <div>
          <BaseFooter />
        </div>
      </div>
    </TranslationsProvider>
  );
}

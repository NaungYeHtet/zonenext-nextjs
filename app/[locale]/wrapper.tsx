import { ReactNode } from "react";
import Navbar from "./components/navbar/navbar";
import TranslationsProvider from "./components/translation-provider";
import initTranslations from "./utils/i18n";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import PropertyFilter from "./components/property/filter";
import { PropertySidebar } from "./components/property/property-sidebar";
import { fetchGet } from "./utils/helpers";
import { API_PATH_GROUP } from "./utils/api-paths";
import Breadcrumb from "./components/breadcumb/breadcrumb";
import { PropertyFilterParams } from "./lib";

const i18nNamespaces = ["general", "default"];

type LayoutProps = {
  children: ReactNode;
  params: PropertyFilterParams;
};

export default async function Wrapper({ children, params }: LayoutProps) {
  const { resources } = await initTranslations(params.locale, i18nNamespaces);

  const { group } = await fetchGet(
    API_PATH_GROUP,
    { language: params.locale, type: "FeaturedListings" },
    {
      next: { revalidate: 0 },
    }
  );

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
          <PropertyFilter filterParams={params} />
          <div className="flex flex-col justify-between w-full gap-10 mt-3 compact-container xl:flex-row">
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
      </div>
    </TranslationsProvider>
  );
}

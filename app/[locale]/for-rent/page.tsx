import Navbar from "../components/navbar";
import PropertyFilter from "../components/property-filter";
import TranslationsProvider from "../components/translation-provider";
import initTranslations from "../utils/i18n";

const i18nNamespaces = ["general"];

type HomePageProps = {
  params: {
    locale: string;
  };
};

export default async function ForRent({ params: { locale } }: HomePageProps) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  let data = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/property-filters?language=${locale}`,
    {
      next: { revalidate: 0 },
    }
  );
  let filters = await data.json();

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
          <div className="compact-container flex justify-center md:align-middle h-full w-full bg-transparent">
            <div className="m-12 mb-28 w-full">
              <PropertyFilter filters={filters.data} />
            </div>
          </div>
        </main>
      </div>
    </TranslationsProvider>
  );
}

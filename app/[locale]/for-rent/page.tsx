import { useSearchParams } from "next/navigation";
import Navbar from "../components/navbar/navbar";
import TranslationsProvider from "../components/translation-provider";
import initTranslations from "../utils/i18n";
import PropertyFilter from "../components/property/filter";

const i18nNamespaces = ["general"];

type HomePageProps = {
  params: {
    locale: string;
  };
};

export default async function ForRent({ params: { locale } }: HomePageProps) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

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
            <div className="w-full m-12 mb-28">
              <PropertyFilter locale={locale} />
            </div>
          </div>
        </main>
      </div>
    </TranslationsProvider>
  );
}

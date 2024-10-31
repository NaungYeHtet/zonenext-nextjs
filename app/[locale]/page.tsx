import Navbar from "./components/navbar/navbar";
import TranslationsProvider from "./components/translation-provider";
import initTranslations from "./utils/i18n";
import SectionFeaturedListing from "./section-featured-listing";
import SectionWelcome from "./section-welcome";
import PropertyFilter from "./components/property/filter";
import SectionInquiry from "./section-inquiry";
import BaseFooter from "./components/footer";
import { useTranslation } from "react-i18next";

const i18nNamespaces = ["general", "default", "validation"];

type HomePageProps = {
  params: {
    locale: string;
  };
};

export default async function Home({ params: { locale } }: HomePageProps) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const { t } = useTranslation();

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
        <div
          className="pt-24 md:pt-20 h-full md:h-[330px] bg-no-repeat bg-cover bg-center
		bg-[url('../../public/images/home-banner.jpg')]"
        ></div>
        <PropertyFilter
          filterParams={{ locale: locale, list_type: "for-sale" }}
        />

        <SectionWelcome />

        <SectionFeaturedListing locale={locale} />

        <SectionInquiry locale={locale} />
        <div>
          <BaseFooter />
        </div>
      </div>
    </TranslationsProvider>
  );
}

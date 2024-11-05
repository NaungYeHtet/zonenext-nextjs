import Navbar from "./components/navbar/navbar";
import TranslationsProvider from "./components/translation-provider";
import initTranslations from "./utils/i18n";
import SectionFeaturedListing from "./section-featured-listing";
import SectionWelcome from "./section-welcome";
import PropertyFilter from "./components/property/filter";
import SectionInquiry from "./section-inquiry";
import BaseFooter from "./components/footer";
import SectionTopTenProject from "./section-top-ten-project";
import SectionMostPopularProperty from "./section-most-popular-proerty";

const i18nNamespaces = ["general", "default", "validation"];

type HomePageProps = {
  params: {
    locale: string;
  };
};

export default async function Home({ params: { locale } }: HomePageProps) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

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
        <div className="h-full bg-[url('../../public/images/home-banner.jpg')] bg-cover bg-center bg-no-repeat pt-24 md:h-[330px] md:pt-20"></div>
        <PropertyFilter
          filterParams={{ locale: locale, list_type: "for-sale" }}
        />

        <SectionWelcome />

        <SectionFeaturedListing locale={locale} />

        <SectionInquiry locale={locale} />

        <SectionTopTenProject locale={locale} />

        <SectionMostPopularProperty locale={locale} />
        <div>
          <BaseFooter />
        </div>
      </div>
    </TranslationsProvider>
  );
}

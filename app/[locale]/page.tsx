import TranslationsProvider from "./components/translation-provider";
import AuthProviderClient from "./components/providers/provider-client";
import initTranslations from "./utils/i18n";
import SectionFeaturedListing from "./section-featured-listing";
import SectionWelcome from "./section-welcome";
import PropertyFilter from "./components/property/filter";
import SectionInquiry from "./section-inquiry";
import SectionTopTenProject from "./section-top-ten-project";
import SectionMostPopularProperty from "./section-most-popular-proerty";
import dynamic from "next/dynamic";
import Image from "next/image";
import homeBannerImg from "@/public/images/home-banner.jpg";
import { Suspense } from "react";
import {
  CarouselSectionSkeleton,
  FilterSectionSkeleton,
  InquirySectionSkeleton,
} from "./section-skeletons";

const Navbar = dynamic(() => import("./components/navbar/navbar"), {
  ssr: true,
});

const BaseFooter = dynamic(() => import("./components/footer"), {
  ssr: true,
});

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
      <AuthProviderClient>
        <div className="flex flex-col">
          <div className="">
            <Navbar />
          </div>
          <div className="relative h-full pt-24 md:h-[330px] md:pt-20">
            <Image
              src={homeBannerImg}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <Suspense fallback={<FilterSectionSkeleton />}>
            <PropertyFilter
              filterParams={{ locale: locale, list_type: "for-sale" }}
            />
          </Suspense>

          <SectionWelcome />

          <Suspense fallback={<CarouselSectionSkeleton card="property" />}>
            <SectionFeaturedListing locale={locale} />
          </Suspense>

          <Suspense fallback={<InquirySectionSkeleton />}>
            <SectionInquiry locale={locale} />
          </Suspense>

          <Suspense fallback={<CarouselSectionSkeleton card="compact" />}>
            <SectionTopTenProject locale={locale} />
          </Suspense>

          <Suspense fallback={<CarouselSectionSkeleton card="property" />}>
            <SectionMostPopularProperty locale={locale} />
          </Suspense>
          <div>
            <BaseFooter />
          </div>
        </div>
      </AuthProviderClient>
    </TranslationsProvider>
  );
}

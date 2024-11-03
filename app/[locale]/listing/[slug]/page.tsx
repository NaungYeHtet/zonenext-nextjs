import { LuBedSingle } from "react-icons/lu";
import BaseFooter from "../../components/footer";
import Navbar from "../../components/navbar/navbar";
import { IconDetail } from "../../components/property/property-card";
import TranslationsProvider from "../../components/translation-provider";
import { Property as PropertyType } from "../../lib";
import { API_PATH_INQUIRY, API_PATH_PROPERTY } from "../../utils/api-paths";
import { cn, fetchApi } from "../../utils/helpers";
import initTranslations from "../../utils/i18n";
import Gallery from "./gallery";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { PiShower } from "react-icons/pi";
import { TfiRulerAlt2 } from "react-icons/tfi";
import InquiryForm from "./inquiry-form";
import TranslateText from "../../components/translate-text";
import AuthProviderClient from "../../components/providers/provider-client";
import RatingForm from "./rating-form";

const i18nNamespaces = ["general", "validation", "default", "rating"];

const TitleSection = ({
  property: { title, address, price },
  className,
}: {
  property: PropertyType;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-3 px-7 lg:flex-row",
        className,
      )}
    >
      <div>
        <h3 className="text-wrap font-serif text-xl font-semibold text-gray-700 lg:text-2xl">
          {title}
        </h3>
        <span className="text-wrap text-sm text-gray-500 lg:text-base">
          {address}
        </span>
      </div>
      <span className="text-nowrap text-lg font-bold lg:text-xl">{price}</span>
    </div>
  );
};

type PageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

export default async function Property({
  params: { locale, slug },
}: PageProps) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const inquiryData = await fetchApi({
    method: "GET",
    path: API_PATH_INQUIRY,
    body: {
      language: locale,
    },
    options: {
      next: {
        revalidate: 0,
      },
    },
  });

  const { data } = await fetchApi({
    method: "GET",
    path: `${API_PATH_PROPERTY}/${slug}`,
    body: {
      language: locale,
    },
    options: { next: { revalidate: 0 } },
  });
  const {
    gallery,
    type,
    title,
    bedrooms_count,
    bathrooms_count,
    square_feet,
    code,
    description,
    amenities,
    views_count,
  }: PropertyType = data.property;

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
        <main className="min-h-screen bg-gray-100">
          <div className="md:compact-container flex h-full flex-col gap-10 pt-0 md:flex-row md:py-7">
            <div className="flex h-full w-full flex-col md:w-4/6">
              {/* Content section */}
              <div className="rounded-md bg-white pb-4 md:pt-8">
                <TitleSection
                  property={data.property}
                  className="hidden md:flex"
                />
                <div className="md:mt-7">
                  <Gallery
                    gallery={gallery}
                    viewsCount={views_count}
                    slug={slug}
                  />
                </div>
                <TitleSection
                  property={data.property}
                  className="flex md:hidden"
                />
              </div>

              <section className="mt-7 w-full bg-white p-7">
                <div className="inline-flex w-full justify-between">
                  <h3 className="text-2xl font-semibold">Overview</h3>

                  <span className="md:text-xl">
                    <span>
                      <TranslateText>id</TranslateText> : {code}
                    </span>
                  </span>
                </div>
                <div className="mt-3 grid w-full grid-cols-2 flex-row justify-between gap-5 p-1 text-gray-600 md:grid-cols-4">
                  <p className="inline-flex w-full items-center justify-center text-center text-lg">
                    {type}
                  </p>
                  <IconDetail text="general:bedroom" value={bedrooms_count}>
                    <LuBedSingle className="text-2xl" />
                  </IconDetail>
                  <IconDetail text="general:bathroom" value={bathrooms_count}>
                    <PiShower className="text-2xl" />
                  </IconDetail>
                  <IconDetail text="general:sqft" value={square_feet}>
                    <TfiRulerAlt2 className="text-2xl" />
                  </IconDetail>
                </div>
              </section>

              <section className="mt-7 w-full bg-white p-7">
                <div className="mb-10 inline-flex w-full">
                  <h3 className="text-2xl font-semibold">Description</h3>
                </div>
                <span>{description}</span>
              </section>

              <section className="mt-7 w-full bg-white p-7">
                <div className="mb-10 inline-flex w-full">
                  <h3 className="text-2xl font-semibold">Amenities</h3>
                </div>
                <div className="inline-flex gap-2">
                  {amenities.map((amenity, i) => (
                    <span
                      className="text-nowrap rounded-md bg-primary-800 px-2 py-1 text-lg text-white"
                      key={i}
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </section>
              <section className="mt-7 w-full bg-white p-7">
                <div className="mb-5 inline-flex w-full">
                  <h3 className="text-2xl font-semibold">
                    <TranslateText>general:review</TranslateText>
                  </h3>
                </div>
                <div className="">
                  <AuthProviderClient>
                    <RatingForm propertyCode={code} />
                  </AuthProviderClient>
                </div>
              </section>
            </div>

            {/* Inquiry Form section */}
            <section className="sticky top-10 h-full w-full rounded-md bg-white p-3 shadow-lg md:w-2/6">
              <AuthProviderClient>
                <InquiryForm
                  options={inquiryData.data}
                  propertyCode={code}
                  propertyTitle={title}
                />
              </AuthProviderClient>
            </section>
          </div>
        </main>

        <BaseFooter />
      </div>
    </TranslationsProvider>
  );
}

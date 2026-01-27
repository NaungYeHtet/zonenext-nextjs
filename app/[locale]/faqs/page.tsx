import Navbar from "../components/navbar/navbar";
import TranslationsProvider from "../components/translation-provider";
import initTranslations from "../utils/i18n";
import BaseFooter from "../components/footer";
import { Faq, ResponseData } from "../lib";
import { fetchApi } from "../utils/helpers";
import apiPaths from "../utils/api-paths";
import Breadcrumb from "../components/breadcumb/breadcrumb";
import Disclosure from "../components/disclosure";
import TranslateText from "../components/translate-text";

const i18nNamespaces = ["general"];

type PageProps = {
  params: {
    locale: string;
  };
};

type FaqData = {
  faqs: Faq[];
};

export default async function Faqs({ params: { locale } }: PageProps) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const {
    data: { faqs },
  }: ResponseData<FaqData> = await fetchApi({
    method: "GET",
    path: apiPaths.FAQ,
    body: {
      language: locale,
    },
    options: {
      next: { revalidate: 60 * 60 * 24 },
    },
  });

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
          <div className="md:compact-container mt-5 flex">
            <Breadcrumb
              items={[
                { label: "home_nav", path: "/" },
                {
                  label: "general:faq",
                  path: "#",
                },
              ]}
            />
          </div>

          <section className="compact-container w-full md:flex-row md:pb-7">
            <h1 className="font-serif text-3xl font-semibold">
              <TranslateText>general:faq</TranslateText>
            </h1>
            <div className="mt-4 flex max-w-[700px] flex-col xl:max-w-[1200px]">
              {faqs.map(({ question, answer }) => (
                <Disclosure key={question}>
                  <Disclosure.Button text={question} />
                  <Disclosure.Panel>{answer}</Disclosure.Panel>
                </Disclosure>
              ))}
            </div>
          </section>
        </main>
        <div>
          <BaseFooter />
        </div>
      </div>
    </TranslationsProvider>
  );
}

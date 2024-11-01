import Navbar from "../components/navbar/navbar";
import TranslationsProvider from "../components/translation-provider";
import initTranslations from "../utils/i18n";
import BaseFooter from "../components/footer";
import VerficationForm from "./verification-from";
import TranslateText from "../components/translate-text";

const i18nNamespaces = ["general", "verification"];

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function Verification({ params: { locale } }: PageProps) {
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
        <main className="flex flex-col items-center py-10">
          <h1 className="text-xl font-bold font-serif">
            <TranslateText>verification:email_verification</TranslateText>
          </h1>
          <VerficationForm />
        </main>
        <div>
          <BaseFooter />
        </div>
      </div>
    </TranslationsProvider>
  );
}

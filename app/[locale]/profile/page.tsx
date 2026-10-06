import Navbar from "../components/navbar/navbar";
import TranslationsProvider from "../components/translation-provider";
import initTranslations from "../utils/i18n";
import BaseFooter from "../components/footer";
import ProfileCard from "./profile-card";
import TranslateText from "../components/translate-text";

const i18nNamespaces = ["general"];

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function Profile({ params: { locale } }: PageProps) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <div className="flex h-screen flex-col">
        <div className="">
          <Navbar />
        </div>
        <main className="flex h-full flex-col items-center justify-center py-10">
          <h1 className="font-serif text-xl">
            <TranslateText>general:profile</TranslateText>
          </h1>
          <ProfileCard />
        </main>
        <div>
          <BaseFooter />
        </div>
      </div>
    </TranslationsProvider>
  );
}

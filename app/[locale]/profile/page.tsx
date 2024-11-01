import Navbar from "../components/navbar/navbar";
import TranslationsProvider from "../components/translation-provider";
import initTranslations from "../utils/i18n";
import BaseFooter from "../components/footer";
import ProfileCard from "./profile-card";

const i18nNamespaces = ["general", "login"];

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
      <div className="flex flex-col">
        <div className="">
          <Navbar />
        </div>
        <main className="flex flex-col justify-center items-center py-10">
          <h1 className="text-xl font-serif">Profile</h1>
          <ProfileCard />
        </main>
        <div>
          <BaseFooter />
        </div>
      </div>
    </TranslationsProvider>
  );
}

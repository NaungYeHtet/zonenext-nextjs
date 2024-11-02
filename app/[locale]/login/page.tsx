import Navbar from "../components/navbar/navbar";
import TranslationsProvider from "../components/translation-provider";
import initTranslations from "../utils/i18n";
import BaseFooter from "../components/footer";
import ProviderClient from "../components/providers/provider-client";
import LoginForm from "./login-form";

const i18nNamespaces = ["general", "login"];

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function Login({ params: { locale } }: PageProps) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <div className="flex flex-col h-screen">
        <div className="">
          <Navbar />
        </div>
        <main className="flex flex-col h-full justify-center items-center">
          <ProviderClient>
            <LoginForm />
          </ProviderClient>
        </main>
        <div>
          <BaseFooter />
        </div>
      </div>
    </TranslationsProvider>
  );
}

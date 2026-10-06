import Navbar from "../components/navbar/navbar";
import TranslationsProvider from "../components/translation-provider";
import initTranslations from "../utils/i18n";
import BaseFooter from "../components/footer";
import AuthProviderClient from "../components/providers/provider-client";
import SignupForm from "./signup-form";

const i18nNamespaces = ["general"];

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function Signup({ params: { locale } }: PageProps) {
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
        <main className="compact-container flex h-full flex-col items-center justify-center py-7">
          <AuthProviderClient>
            <SignupForm />
          </AuthProviderClient>
        </main>
        <div>
          <BaseFooter />
        </div>
      </div>
    </TranslationsProvider>
  );
}

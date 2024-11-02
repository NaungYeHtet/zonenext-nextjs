import Navbar from "../components/navbar/navbar";
import TranslationsProvider from "../components/translation-provider";
import initTranslations from "../utils/i18n";
import BaseFooter from "../components/footer";
import VerficationForm from "./verification-from";
import TranslateText from "../components/translate-text";
import Logo from "../components/logo";
import { LuLogOut } from "react-icons/lu";
import LogoutButton from "../components/logout-button";

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
      <div className="flex flex-col h-screen">
        <section className="p-1 py-2 flex md:p-3 bg-white w-full md:shadow-none shadow-sm border-b border-b-primary-50">
          <div className="compact-container py-2 flex justify-between w-full">
            <Logo className="w-20 md:w-36" />
            <LogoutButton className="rounded-lg py-1.5 text-gray-600 px-3 font-medium data-[focus]:bg-primary-100 transition-colors duration-150">
              <LuLogOut className="size-4 fill-gray-600" aria-label="Logout" />
            </LogoutButton>
          </div>
        </section>
        <main className="flex flex-col h-full justify-center items-center py-10">
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

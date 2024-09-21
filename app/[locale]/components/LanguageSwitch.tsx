import Image from "next/image";
import englishUkIcon from "@/public/icons/flags/english.svg";
import myanmarIcon from "@/public/icons/flags/myanmar.svg";
import i18nConfig from "@/i18nConfig";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function LanguageSwitch() {
  const router = useRouter();
  const currentPathname = usePathname();
  const { i18n } = useTranslation();

  const updateLanguage = () => {
    const currentLocale = i18n.language;
    const newLocale = i18n.language == "en" ? "my" : "en";

    console.log(newLocale);

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <button onClick={updateLanguage}>
      <Image
        className="w-10"
        src={i18n.language == "my" ? englishUkIcon : myanmarIcon}
        alt="Language"
      />
    </button>
  );
}

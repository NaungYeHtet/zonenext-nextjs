import Link from "next/link";
import LanguageSwitch from "../language-switch";
import Logo from "../logo";
import TranslateText from "../translate-text";

export default function NavbarAuth() {
  return (
    <div className="compact-container py-2 inline-flex justify-between w-full">
      <Logo className="w-20 md:w-36" />
      <div className="inline-flex items-center gap-2 md:gap-7 p-1 h-full text-gray-800 text-sm md:text-xl">
        <LanguageSwitch />
        <Link
          className="focus:ring-2 font-medium rounded-lg focus:outline-none dark:focus:ring-blue-800 focus:ring-purple-300 focus:ring-offset-2"
          href={"/login"}
          aria-label={"Login"}
        >
          <TranslateText>general:login</TranslateText>
        </Link>
        <Link
          className="focus:ring-2 font-medium rounded-lg focus:outline-none dark:focus:ring-blue-800 focus:ring-purple-300 focus:ring-offset-2"
          href={"/sign-up"}
          aria-label={"Sign up"}
        >
          <TranslateText>general:sign_up</TranslateText>
        </Link>
      </div>
    </div>
  );
}

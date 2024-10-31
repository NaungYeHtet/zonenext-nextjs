"use client";

import { TOptions } from "i18next";
import { useTranslation } from "react-i18next";

type TranslateTextProps = {
  children: string;
  options?: TOptions;
};

export default function TranslateText({
  children,
  options,
}: TranslateTextProps) {
  const { t } = useTranslation();
  return <>{t(children, options)}</>;
}

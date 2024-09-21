"use client";

import { I18nextProvider } from "react-i18next";
import { createInstance, Resource } from "i18next";
import initTranslations from "../utils/i18n";
import { ReactNode } from "react";

interface TranslationsProviderProps {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources: Resource; // `Resource` is a built-in i18next type for the resources object
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationsProviderProps) {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

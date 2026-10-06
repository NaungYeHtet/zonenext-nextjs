"use client";

import { I18nextProvider } from "react-i18next";
import { createInstance, Resource } from "i18next";
import initTranslations from "../utils/i18n";
import { ReactNode, useState } from "react";

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
  // Build the instance once per mount. The props are fresh objects on every
  // RSC payload, but a locale's resources never change for a given page, and
  // switching locale remounts the tree via the [locale] segment.
  const [i18n] = useState(() => {
    const instance = createInstance();
    initTranslations(locale, namespaces, instance, resources);
    return instance;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

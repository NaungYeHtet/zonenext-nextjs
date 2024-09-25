"use client";

import { useTranslation } from "react-i18next";

export default function TranslateText({ children }: { children: string }) {
  const { t } = useTranslation();
  return <>{t(children)}</>;
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchGet } from "../utils/helpers";
import { API_PATH_PROFILE } from "../utils/api-paths";
import { useTranslation } from "react-i18next";
import { User } from "../lib";
import Cookie from "js-cookie";
import { TOKEN_NAME } from "../utils/constants";

type LanguageType = "en" | "my";

export default function ProfileCard() {
  const [user, setUser] = useState<User>();
  const { i18n } = useTranslation();

  const fetchData = useCallback(async () => {
    const data = await fetchGet(API_PATH_PROFILE, {
      language: i18n.language,
    });
    setUser(data.user);
  }, []);

  useEffect(() => {
    // Cookie.remove(TOKEN_NAME);
    fetchData();
  }, [fetchData]);

  if (!user) {
    return <p>Loading .....</p>;
  }

  return <div>{user.name}</div>;
}

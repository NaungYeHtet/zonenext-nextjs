import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_PATH_TYPE } from "../lib";
import _, { remove } from "lodash";
import { NextResponse } from "next/server";
import { removeToken } from "../lib/actions";
import Cookies from "js-cookie";
import { TOKEN_NAME } from "./constants";

export function sanitizeObject(obj?: object) {
  if (obj === undefined) {
    return {};
  }

  return _.omitBy(
    obj,
    (v) => v === null || v === undefined || v === ""
  ) as Record<string, string>;
}

export function transformParamsToQueryString(params?: object): string {
  if (!params) {
    return "";
  }
  const queryString = new URLSearchParams(sanitizeObject(params)).toString();

  return queryString;
}

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

type HeaderType = {
  method?: string;
  Accept: string;
  "Content-Type": string;
  Authorization?: string;
};

function redirectToRoute(route: string) {
  if (typeof window !== "undefined") {
    window.location.href = route;
  }

  return NextResponse.redirect(
    new URL(route, process.env.NEXT_PUBLIC_SITE_URL)
  );
}

type FetchMethod = "GET" | "POST";

type FetchAPIParams = {
  method: FetchMethod;
  path: API_PATH_TYPE;
  body?: object;
  options?: object;
  requireAuth?: boolean;
};

export async function fetchApi({
  method,
  path,
  body,
  options,
  requireAuth,
}: FetchAPIParams) {
  const headers: HeaderType = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (requireAuth) {
    const token = Cookies.get(TOKEN_NAME);

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const requestInit: RequestInit = {
    method,
    ...options,
    headers,
  };

  let url = `${process.env.NEXT_PUBLIC_API_PATH}${path}`;

  if (method == "GET") {
    const searchQuery = transformParamsToQueryString(body);

    if (searchQuery) {
      url = `${url}?${searchQuery}`;
    }
  } else {
    requestInit.body = JSON.stringify(
      sanitizeObject(body) as unknown as BodyInit
    );
  }

  console.log(requestInit, url);

  const response = await fetch(url, requestInit);

  const responseData = await response.json();
  responseData.status = response.status;

  if (response.ok) {
    return responseData;
  } else {
    if (response.status == 401) {
      removeToken();
      redirectToRoute("/login");
    }
    if (response.status == 409) {
      redirectToRoute("/verification");
    }
  }

  console.log("ERROR >>> ", responseData, response.status);
  return responseData;
}

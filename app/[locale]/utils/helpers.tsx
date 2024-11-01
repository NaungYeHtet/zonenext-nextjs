import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_PATH_TYPE } from "../lib";
import _, { remove } from "lodash";
import { NextResponse } from "next/server";
import { removeToken } from "../lib/actions";
import Cookie from "js-cookie";
import { TOKEN_NAME } from "./constants";

export function sanitizeObject(obj: object) {
  return _.omitBy(
    obj,
    (v) => v === null || v === undefined || v === ""
  ) as Record<string, string>;
}

export function transformParamsToQueryString(params: object): string {
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

export async function fetchGet(
  path: API_PATH_TYPE,
  params: object,
  options?: object
) {
  const searchQuery = transformParamsToQueryString(params);
  let url = `${process.env.NEXT_PUBLIC_API_PATH}${path}`;

  if (searchQuery) {
    url = `${url}?${searchQuery}`;
  }

  const headers: HeaderType = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const token = Cookie.get(TOKEN_NAME);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    headers,
    ...options,
  });

  const responseData = await response.json();

  if (response.ok) {
    return responseData.data;
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
}

export async function fetchPost(
  path: API_PATH_TYPE,
  body?: BodyInit | null,
  options?: object
) {
  let url = `${process.env.NEXT_PUBLIC_API_PATH}${path}`;

  const headers: HeaderType = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const token = Cookie.get(TOKEN_NAME);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    ...options,
    body: body,
  });

  const responseData = await response.json();

  if (!response.ok) {
    if (response.status == 401) {
      removeToken();
      redirectToRoute("/login");
    }
    if (response.status == 409) {
      redirectToRoute("/verification");
    }

    console.log("ERROR >>> ", responseData, response.status);
  }

  return responseData;
}

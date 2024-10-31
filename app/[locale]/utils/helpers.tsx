import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_PATH_TYPE } from "../lib";
import _ from "lodash";

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

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const responseData = await response.json();

  if (response.ok) {
    return responseData.data;
  }
}

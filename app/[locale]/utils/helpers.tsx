import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_PATH_TYPE } from "../lib";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

function sanitizeObject(obj: object) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(
        ([value]) => value !== null && value !== undefined && value !== ""
      )
      .map(([key, value]) => [key, String(value)]) // Convert values to strings
  );
}

export function transformParamsToQueryString(params: object): string {
  const queryString = new URLSearchParams(sanitizeObject(params)).toString();

  return queryString;
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

  const error = await response.json();

  if (response.ok) {
    return error.data;
  }
}

import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_PATH_TYPE } from "../lib";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

function sanitizeObject(obj: Object) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(
        ([_, value]) => value !== null && value !== undefined && value !== ""
      )
      .map(([key, value]) => [key, String(value)]) // Convert values to strings
  );
}

function clean(obj: any) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ""
    ) {
      delete obj[propName];
    }
  }
  return obj;
}

export function transformParamsToQueryString(params: Object): string {
  return new URLSearchParams(sanitizeObject(params)).toString();
}

export async function fetchGet(path: API_PATH_TYPE, params: {}, options?: {}) {
  params = {
    ...params,
  };

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

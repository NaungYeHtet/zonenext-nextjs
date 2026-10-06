import { notFound } from "next/navigation";
import { PropertyFilterRouteParams } from "@/app/[locale]/lib";

// Canonical URL order: /state/{s}/township/{t}/type/{y}
export const SEARCH_FILTER_KEYS = ["state", "township", "type"] as const;

export type SearchFilters = Pick<
  PropertyFilterRouteParams,
  "state" | "township" | "type"
>;

export function parseSearchFilters(
  segments: string[] | undefined,
): SearchFilters {
  const filters: SearchFilters = {};

  if (!segments || segments.length === 0) {
    return filters;
  }

  if (segments.length % 2 !== 0) {
    notFound();
  }

  let previousIndex = -1;

  for (let i = 0; i < segments.length; i += 2) {
    const key = segments[i];
    const value = segments[i + 1];
    const index = SEARCH_FILTER_KEYS.findIndex(
      (filterKey) => filterKey === key,
    );

    if (index === -1 || index <= previousIndex) {
      notFound();
    }

    filters[SEARCH_FILTER_KEYS[index]] = value;
    previousIndex = index;
  }

  return filters;
}

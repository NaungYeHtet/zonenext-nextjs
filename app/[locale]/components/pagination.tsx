"use client";
import { useRouter } from "next/navigation";
import { MetaLink } from "../lib";
import { cn } from "../utils/helpers";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

type PaginationProps = {
  links: MetaLink[];
};

export default function Pagination({ links }: PaginationProps) {
  const router = useRouter();

  const handlePaginate = (path: string | null) => {
    if (path) {
      // Get the page number from the URL
      const pageMatch = path.match(/page=(\d+)/);
      if (pageMatch) {
        // const newPage = parseInt(pageMatch[1], 10);
        // Update the URL with the new page
        router.push(path);
      }
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex h-10 -space-x-px text-base">
        {links.map(({ label, url, active }, index) => {
          const isPreviousPageUrl = label.startsWith("Previous");
          const isNextPageUrl = label.startsWith("Next");

          return (
            <li key={index}>
              <button
                onClick={() => handlePaginate(url)}
                className={cn(
                  "flex h-10 items-center justify-center border border-gray-300 px-4 leading-tight dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                  {
                    "ms-0 rounded-s-lg border-e-0": isPreviousPageUrl,
                    "rounded-e-lg": isNextPageUrl,
                    "bg-primary-400 text-gray-100 hover:bg-primary-600": active,
                    "bg-white text-gray-500 hover:bg-gray-100": !active,
                    "pointer-events-none text-gray-200 hover:bg-white hover:text-gray-200":
                      !url,
                  },
                )}
                aria-disabled={!url}
              >
                {label === "&laquo; Previous" ? <BiLeftArrow /> : ""}
                {label === "Next &raquo;" ? <BiRightArrow /> : ""}
                {label === "&laquo; Previous" || label === "Next &raquo;"
                  ? ""
                  : label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

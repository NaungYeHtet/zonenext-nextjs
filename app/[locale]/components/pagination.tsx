"use client";
import { useRouter } from "next/navigation";
import { MetaLink } from "../lib";
import { cn } from "../utils/helpers";

type PaginationProps = {
  links: MetaLink[];
  currentPageNumber: number;
};

export default function Pagination({
  links,
  currentPageNumber,
}: PaginationProps) {
  const router = useRouter();

  const handlePaginate = (path: string | null) => {
    if (path) {
      // Get the page number from the URL
      const pageMatch = path.match(/page=(\d+)/);
      if (pageMatch) {
        const newPage = parseInt(pageMatch[1], 10);
        // Update the URL with the new page
        router.push(path);
      }
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-base h-10">
        {links.map(({ label, url, active }, index) => {
          let pageNumber;
          const isPreviousPageUrl = label.startsWith("Previous");
          const isNextPageUrl = label.startsWith("Next");

          if (isPreviousPageUrl) {
            pageNumber = currentPageNumber - 1;
          } else if (isNextPageUrl) {
            pageNumber = currentPageNumber + 1;
          } else {
            pageNumber = label;
          }

          return (
            <li key={index}>
              <button
                onClick={(e) => handlePaginate(url)}
                className={cn(
                  "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                  {
                    "ms-0 border-e-0 rounded-s-lg": isPreviousPageUrl,
                    "rounded-e-lg": isNextPageUrl,
                    "bg-gray-400 text-gray-100": active,
                    "text-gray-200 hover:text-gray-200 hover:bg-white pointer-events-none":
                      !url,
                  }
                )}
                aria-disabled={!url}
              >
                <div dangerouslySetInnerHTML={{ __html: label }}></div>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

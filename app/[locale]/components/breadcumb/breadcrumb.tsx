import Link from "next/link";
import { BiHomeAlt } from "react-icons/bi";
import TranslateText from "../translate-text";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 w-full px-5">
      <ol className="flex space-x-2 text-sm font-extralight">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index < items.length - 1 ? (
              <span className="inline-flex gap-2">
                {item.path == "/" ? (
                  <BiHomeAlt className="-mt-1 text-xl" />
                ) : (
                  ""
                )}
                <Link className="text-nowrap text-blue-400" href={item.path}>
                  <TranslateText>{item.label}</TranslateText>
                </Link>
              </span>
            ) : (
              <span className="max-w-[150px] truncate text-ellipsis text-nowrap text-gray-700 md:max-w-full">
                {<TranslateText>{item.label}</TranslateText>}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="mx-1 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

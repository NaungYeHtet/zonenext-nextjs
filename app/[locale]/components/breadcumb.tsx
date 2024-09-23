import Link from "next/link";
import { BiHomeAlt } from "react-icons/bi";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex space-x-2 text-sm font-extralight">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index < items.length - 1 ? (
              <span className="inline-flex gap-2">
                {item.path == "/" ? (
                  <BiHomeAlt className="text-xl -mt-1" />
                ) : (
                  ""
                )}
                <Link className="text-blue-400" href={item.path}>
                  {item.label}
                </Link>
              </span>
            ) : (
              <span className="text-gray-700">{item.label}</span>
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

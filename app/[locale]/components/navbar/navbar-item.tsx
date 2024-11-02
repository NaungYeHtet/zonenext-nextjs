import Link from "next/link";
import { cn } from "../../utils/helpers";

type NavbarItemProps = {
  text: string;
  path: string;
  active: boolean;
};

const NavbarItem = ({ text, path, active }: NavbarItemProps) => (
  <li className="px-3">
    <Link
      className={cn(
        "focus:ring-purple-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          "bg-primary-500 border-b border-secondary-600": active,
        }
      )}
      href={path}
      title={text}
      aria-label={text}
    >
      {text}
    </Link>
  </li>
);

export default NavbarItem;

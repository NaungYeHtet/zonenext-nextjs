"use client";

import { ReactNode } from "react";
import { isRouteProtected, logout } from "../lib/auth";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

type LogoutButtonProps = {
  children: ReactNode;
  className?: string;
};

export default function LogoutButton({
  children,
  className,
}: LogoutButtonProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    if (isRouteProtected(pathname)) {
      router.push("/login");
    }
  };

  return (
    <button
      type="button"
      className={className}
      aria-label="Logout"
      onClick={() => handleLogout()}
      title="Logout"
    >
      {children}
    </button>
  );
}

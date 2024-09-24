import { ReactNode } from "react";

function SidebarItem({ children }: { children: ReactNode }) {
  return <div className="bg-white p-5">{children}</div>;
}

function SidebarSection({ children }: { children: ReactNode }) {
  return <div className="bg-gray-50">{children}</div>;
}

SidebarSection.Item = SidebarItem;

export default SidebarSection;

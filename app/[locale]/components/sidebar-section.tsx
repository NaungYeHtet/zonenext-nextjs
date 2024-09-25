import { ReactNode } from "react";

type SidebarItemProps = {
  children: ReactNode;
  title: string;
};

function SidebarItem({ children, title }: SidebarItemProps) {
  return (
    <div className="p-5 bg-white">
      <h3 className="py-5 text-xl font-light font-poppins">{title}</h3>
      {children}
    </div>
  );
}

function SidebarSection({ children }: { children: ReactNode }) {
  return <div className=" bg-gray-50">{children}</div>;
}

SidebarSection.Item = SidebarItem;

export default SidebarSection;

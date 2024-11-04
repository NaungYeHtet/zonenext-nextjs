import {
  Disclosure as HeadlessDisclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ReactNode } from "react";
import { BiChevronDown } from "react-icons/bi";

const Button = ({ text }: { text: string }) => (
  <DisclosureButton className="group flex w-full items-center justify-between">
    <span className="text-base font-medium text-gray-500 group-data-[hover]:text-gray-700">
      {text}
    </span>
    <BiChevronDown className="size-5 fill-gray-500/60 group-data-[open]:rotate-180 group-data-[hover]:fill-gray-500/50" />
  </DisclosureButton>
);

const Panel = ({ children }: { children: ReactNode }) => (
  <DisclosurePanel className="mt-2 text-sm/5 text-gray-800">
    {children}
  </DisclosurePanel>
);

const Disclosure = ({
  children,
  defaultOpen,
}: {
  children: ReactNode;
  defaultOpen?: boolean;
}) => {
  return (
    <HeadlessDisclosure as="div" className="p-6" defaultOpen={defaultOpen}>
      {children}
    </HeadlessDisclosure>
  );
};

Disclosure.Button = Button;
Disclosure.Panel = Panel;

export default Disclosure;

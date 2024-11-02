import { ReactNode } from "react";

type CardType = {
  children: ReactNode;
};

export default function FormCard({ children }: CardType) {
  return (
    <div className="w-full md:w-[390px] rounded-md bg-white shadow border p-4 md:p-9">
      {children}
    </div>
  );
}

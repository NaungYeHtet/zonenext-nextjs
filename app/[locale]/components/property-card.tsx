"use client";

import Image from "next/image";
import { Property } from "../utils";
import { LuBedSingle } from "react-icons/lu";
import { PiShower } from "react-icons/pi";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

type PropertyCardProps = {
  property: Property;
};

type IconDetailType = {
  value: any;
  text: string;
  children: ReactNode;
};

const IconDetail = ({ value, text, children }: IconDetailType) => {
  const { t } = useTranslation();
  return (
    <span className="flex flex-col justify-center gap-2 pr-3 items-center">
      <span className="inline-flex gap-3">
        <span className="text-lg md:text-xl text-gray-900">{value}</span>
        {children}
      </span>
      <span className="text-xs">{t(text)}</span>
    </span>
  );
};

export default function PropertyCard({
  property: {
    title,
    slug,
    coverImage,
    price,
    address,
    bedroomsCount,
    bathroomsCount,
    squareFeet,
  },
}: PropertyCardProps) {
  return (
    <div className="w-[302px] flex flex-col shadow-lg bg-white rounded-md gap-3 h-[480px]">
      <div className="relative group">
        <Image
          className="rounded-t-md"
          src={coverImage}
          width={360}
          height={200}
          alt="title"
        />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-0 rounded-b-md"></div>
        <div className="absolute bottom-0 left-0 w-full text-white p-4 rounded-b-md">
          {/* Gradient shadow that smoothly spreads to the middle */}

          {/* Price Text */}
          <span className="relative z-10 inline-flex justify-between w-full">
            <span className="inline-flex flex-col text-sm text-left font-bold">
              <b>{price.rent}</b>
              <b>{price.sell}</b>
            </span>

            {/* <span>After</span> */}
          </span>
        </div>
      </div>

      <div className="px-4 py-4 text-left flex space-y-4 flex-col justify-between h-full">
        <div className="inline-flex flex-col space-y-3">
          <p className="truncate">{title}</p>
          <p className="text-xs text-gray-600">{address}</p>
        </div>
        <div className="flex flex-row gap-5 p-1 text-gray-600">
          <IconDetail text="general:bedroom" value={bedroomsCount}>
            <LuBedSingle className="text-2xl" />
          </IconDetail>
          <IconDetail text="general:bathroom" value={bathroomsCount}>
            <PiShower className="text-2xl" />
          </IconDetail>
          <IconDetail text="general:sqft" value={squareFeet}>
            <TfiRulerAlt2 className="text-2xl" />
          </IconDetail>
        </div>
      </div>
    </div>
  );
}

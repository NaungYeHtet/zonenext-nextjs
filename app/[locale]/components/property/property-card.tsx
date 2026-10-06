import Image from "next/image";
import { Property } from "../../lib";
import { LuBedSingle } from "react-icons/lu";
import {
  PiEyeLight,
  PiMailboxLight,
  PiPhoneLight,
  PiShower,
} from "react-icons/pi";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { ReactNode } from "react";
import TranslateText from "../translate-text";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Link from "next/link";

const CarouselSlider = dynamic(() => import("../carousel-slider"), {
  ssr: false,
  loading: () => <div></div>,
});

export type PropertyCardProps = {
  property: Property;
};

type IconDetailType = {
  value: any;
  text: string;
  children: ReactNode;
};

type PropertyCardImageProps = {
  images: string[];
  width?: number;
  height?: number;
  className?: string;
};

export const PropertyCardImage = ({
  images,
  className,
}: PropertyCardImageProps) => {
  return (
    <CarouselSlider
      spaceBetween={0}
      pagination={false}
      slidesPerView={1}
      navigation={{}}
    >
      {images.map((url, index) => (
        <div className="relative h-[250px] w-full" key={index}>
          <Image
            className={clsx(className, "aspec")}
            key={index}
            src={url}
            alt="Gallery"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 200px, (max-width: 1200px) 300px, 500px"
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // style={{ width: "auto", height: "280px" }} // Maintain aspect ratio
          />
        </div>
      ))}
    </CarouselSlider>
  );
};

export const IconDetail = ({ value, text, children }: IconDetailType) => {
  return (
    <span className="flex flex-col items-center justify-center gap-2 pr-3">
      <span className="inline-flex gap-3">
        <span className="text-lg text-gray-900 md:text-xl">{value}</span>
        {children}
      </span>
      <span className="text-xs">
        <TranslateText>{text}</TranslateText>
      </span>
    </span>
  );
};

export default function PropertyCard({
  property: {
    title,
    cover_image,
    price,
    address,
    bedrooms_count,
    bathrooms_count,
    square_feet,
    gallery,
    slug,
    agent_phone,
    agent_email,
    acquisition_type,
    type,
  },
}: PropertyCardProps) {
  return (
    <div className="flex h-full w-full flex-col gap-1 rounded-md bg-white shadow-lg">
      <div className="group relative">
        <PropertyCardImage images={[cover_image, ...gallery]} />
        <div className="absolute bottom-0 left-0 z-10 h-1/2 w-full rounded-b-md bg-gradient-to-t from-black via-black/30 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-0"></div>
        <div className="absolute bottom-0 left-0 w-full rounded-b-md p-4 text-white">
          {/* Gradient shadow that smoothly spreads to the middle */}

          {/* Price Text */}
          <span className="relative z-10 inline-flex w-full justify-between">
            <span className="inline-flex flex-col text-left text-sm">
              <b>{price}</b>
            </span>

            {/* <span>After</span> */}
          </span>
        </div>
      </div>

      <div className="flex h-full flex-col justify-around px-4 pt-2 text-left">
        <div className="inline-flex flex-col space-y-3">
          <h4 className="truncate pr-5 text-lg font-semibold transition-colors duration-200 hover:text-blue-700">
            <Link href={`/listing/${slug}`}>{title}</Link>
          </h4>
          <p className="text-xs text-gray-600">{address}</p>
        </div>
        <div className="inline-flex space-x-1">
          <span className="my-3 rounded-md bg-gray-700 px-1.5 py-1 text-sm text-white">
            {acquisition_type.label}
          </span>
          <span className="my-3 rounded-md bg-gray-700 px-1.5 py-1 text-sm text-white">
            {type.label}
          </span>
        </div>
        <div className="mt-3 flex flex-row justify-between p-1 text-gray-600">
          <IconDetail text="general:bedroom" value={bedrooms_count}>
            <LuBedSingle className="text-2xl" />
          </IconDetail>
          <IconDetail text="general:bathroom" value={bathrooms_count}>
            <PiShower className="text-2xl" />
          </IconDetail>
          <IconDetail text="general:sqft" value={square_feet}>
            <TfiRulerAlt2 className="text-2xl" />
          </IconDetail>
        </div>
      </div>

      <div className="my-3 flex w-full flex-row justify-between gap-5 p-1">
        <a
          href={`tel:${agent_phone}`}
          type="button"
          className="mb-2 inline-flex h-full w-full items-center justify-center gap-3 rounded-md border border-gray-50 bg-gray-50 py-1.5 text-lg font-medium text-primary-800 transition-colors duration-300 ease-in-out hover:bg-gray-200 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          <PiPhoneLight size={30} />
        </a>
        <a
          href={`mailto:${agent_email}`}
          className="mb-2 inline-flex h-full w-full items-center justify-center gap-3 rounded-md border border-gray-50 bg-gray-50 py-1.5 text-lg font-medium text-primary-800 transition-colors duration-300 ease-in-out hover:bg-gray-200 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          <PiMailboxLight size={30} />
        </a>
        <Link
          href={`/listing/${slug}`}
          type="button"
          className="mb-2 inline-flex h-full w-full items-center justify-center gap-3 rounded-md border border-gray-50 bg-gray-50 py-1.5 text-lg font-medium text-primary-800 transition-colors duration-300 ease-in-out hover:bg-gray-200 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          <PiEyeLight size={30} />
        </Link>
      </div>
    </div>
  );
}

export function PropertyCardCompact({
  property: { cover_image, price, address, title, slug },
}: PropertyCardProps) {
  return (
    <div className="group relative h-[230px] w-full">
      <Image
        className="aspec rounded-md"
        src={cover_image}
        alt="Gallery"
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 200px, (max-width: 1200px) 300px, 500px"
      />
      <div className="absolute bottom-0 left-0 z-10 h-1/2 w-full rounded-b-md bg-gradient-to-t from-black via-black/30 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-0"></div>
      <div className="absolute bottom-0 left-0 w-full rounded-b-md p-4 text-white">
        {/* Gradient shadow that smoothly spreads to the middle */}

        {/* Price Text */}
        <span className="relative z-10 inline-flex w-full justify-between">
          <span className="inline-flex w-[240px] flex-col gap-1 text-left text-sm font-bold">
            <b>{price}</b>
            <span className="truncate text-xs">{address}</span>
            <Link
              href={`/listing/${slug}`}
              type="button"
              className="truncate transition-colors duration-200 hover:text-primary-300"
            >
              {title}
            </Link>
          </span>
        </span>
      </div>
    </div>
  );
}

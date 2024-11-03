import Image from "next/image";
import { Property } from "../../lib";
import { LuBedSingle } from "react-icons/lu";
import { PiShower } from "react-icons/pi";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { ReactNode } from "react";
import TranslateText from "../translate-text";
import clsx from "clsx";
import dynamic from "next/dynamic";

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
            priority
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
  },
}: PropertyCardProps) {
  return (
    <div className="flex h-[460px] w-full flex-col gap-1 rounded-md bg-white shadow-lg">
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

      <div className="flex h-full flex-col justify-around px-4 pb-7 pt-2 text-left">
        <div className="inline-flex flex-col space-y-3">
          <p className="truncate font-semibold">{title}</p>
          <p className="text-xs text-gray-600">{address}</p>
        </div>
        <div className="flex flex-row justify-between p-1 text-gray-600">
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
    </div>
  );
}

export function PropertyCardCompact({
  property: { cover_image, price, address },
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
        priority
      />
      <div className="absolute bottom-0 left-0 z-10 h-1/2 w-full rounded-b-md bg-gradient-to-t from-black via-black/30 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-0"></div>
      <div className="absolute bottom-0 left-0 w-full rounded-b-md p-4 text-white">
        {/* Gradient shadow that smoothly spreads to the middle */}

        {/* Price Text */}
        <span className="relative z-10 inline-flex w-full justify-between">
          <span className="inline-flex flex-col gap-1 text-left text-sm font-bold">
            <b>{price}</b>
            <span className="w-[240px] truncate text-xs">{address}</span>
          </span>
        </span>
      </div>
    </div>
  );
}

import Image from "next/image";
import { Property } from "../../lib";
import { LuBedSingle } from "react-icons/lu";
import { PiShower } from "react-icons/pi";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { ReactNode } from "react";
import CarouselSlider from "../carousel-slider";
import TranslateText from "../translate-text";
import clsx from "clsx";

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
        <div
          className="relative"
          key={index}
          style={{ width: "auto", maxWidth: "640px", height: "240px" }}
        >
          <Image
            className={clsx(className, "aspec")}
            key={index}
            src={url}
            alt="Gallery"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
    <div className="w-[330px] md:w-[350px] flex flex-col shadow-lg bg-white my-4 rounded-md gap-3 h-[460px]">
      <div className="relative group">
        <PropertyCardImage
          images={[cover_image, ...gallery]}
          className="rounded-t-md"
        />
        <div className="absolute bottom-0 left-0 w-full z-10 transition-opacity duration-300 h-1/2 bg-gradient-to-t from-black via-black/30 to-transparent opacity-70 group-hover:opacity-0 rounded-b-md"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 text-white rounded-b-md">
          {/* Gradient shadow that smoothly spreads to the middle */}

          {/* Price Text */}
          <span className="relative z-10 inline-flex justify-between w-full">
            <span className="inline-flex flex-col text-sm text-left">
              <b>{price}</b>
            </span>

            {/* <span>After</span> */}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between h-full px-4 py-4 space-y-4 text-left">
        <div className="inline-flex flex-col space-y-3">
          <p className="truncate">{title}</p>
          <p className="text-xs text-gray-600">{address}</p>
        </div>
        <div className="flex flex-row gap-5 p-1 text-gray-600">
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
    <div className="relative group">
      <Image
        className="rounded-md"
        src={cover_image}
        alt="Gallery"
        width={640} // Explicit width
        height={280} // Explicit height
        style={{ width: "100%", height: "280px" }} // Maintain aspect ratio
        priority
      />
      <div className="absolute bottom-0 left-0 w-full z-10 transition-opacity duration-300 h-1/2 bg-gradient-to-t from-black via-black/30 to-transparent opacity-70 group-hover:opacity-0 rounded-b-md"></div>
      <div className="absolute bottom-0 left-0 w-full p-4 text-white rounded-b-md">
        {/* Gradient shadow that smoothly spreads to the middle */}

        {/* Price Text */}
        <span className="relative z-10 inline-flex justify-between w-full">
          <span className="inline-flex flex-col text-sm gap-1 font-bold text-left">
            <b>{price}</b>
            <span className="truncate w-[240px] text-xs">{address}</span>
          </span>
        </span>
      </div>
    </div>
  );
}

import { LuBedSingle, LuEye } from "react-icons/lu";
import {
  IconDetail,
  PropertyCardImage,
  PropertyCardProps,
} from "./property-card";
import { PiShower } from "react-icons/pi";
import { TfiRulerAlt2 } from "react-icons/tfi";
import Link from "next/link";

export default function PropertyCardLong({
  property: {
    title,
    slug,
    cover_image,
    price,
    address,
    bedrooms_count,
    bathrooms_count,
    square_feet,
    gallery,
    views_count,
  },
}: PropertyCardProps) {
  return (
    <div className="w-[900px] bg-white">
      <div className="flex flex-row">
        <div className="relative w-[300px]">
          <PropertyCardImage images={[cover_image, ...gallery]} width={300} />
        </div>
        <div className="flex w-full flex-col justify-between px-5 pb-7 pt-4">
          <span className="col-span-2">
            <h4 className="mb-3 text-wrap pr-5 text-lg font-semibold transition-colors duration-200 hover:text-blue-700">
              <Link href={`/listing/${slug}`}>{title}</Link>
            </h4>
            <p className="text-sm text-gray-500">{address}</p>
          </span>

          <span className="inline-flex w-full flex-row gap-3">
            <b>{price}</b>
          </span>

          <span className="inline-flex w-full flex-row gap-3">
            <IconDetail text="general:bedroom" value={bedrooms_count}>
              <LuBedSingle className="text-2xl" />
            </IconDetail>
            <IconDetail text="general:bathroom" value={bathrooms_count}>
              <PiShower className="text-2xl" />
            </IconDetail>
            <IconDetail text="general:sqft" value={square_feet}>
              <TfiRulerAlt2 className="text-2xl" />
            </IconDetail>
            <span className="inline-flex items-center gap-3 self-end text-sm text-secondary-600">
              <LuEye className="inline" /> {views_count}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

import { LuBedSingle } from "react-icons/lu";
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
  },
  pathname,
}: PropertyCardProps) {
  return (
    <div className="bg-white w-[900px]">
      <div className="flex flex-row">
        <div className="relative w-[300px]">
          <PropertyCardImage images={[cover_image, ...gallery]} width={300} />
        </div>
        <div className="flex flex-col justify-between w-full px-5 pt-4 pb-7">
          <span className="col-span-2">
            <h4 className="pr-5 mb-3 text-wrap">
              <Link href={`${pathname}/${slug}`}>{title}</Link>
            </h4>
            <p className="text-sm text-gray-500">{address}</p>
          </span>

          <span className="inline-flex flex-row w-full gap-3">
            <b>{price.rent}</b>
            <b>{price.sell}</b>
          </span>

          <span className="inline-flex flex-row w-full gap-3">
            <IconDetail text="general:bedroom" value={bedrooms_count}>
              <LuBedSingle className="text-2xl" />
            </IconDetail>
            <IconDetail text="general:bathroom" value={bathrooms_count}>
              <PiShower className="text-2xl" />
            </IconDetail>
            <IconDetail text="general:sqft" value={square_feet}>
              <TfiRulerAlt2 className="text-2xl" />
            </IconDetail>
          </span>
        </div>
      </div>
    </div>
  );
}

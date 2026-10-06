import { LuBedSingle, LuEye } from "react-icons/lu";
import { IconDetail, PropertyCardProps } from "./property-card";
import { PropertyCardImage } from "./property-card-image";
import {
  PiEyeLight,
  PiMailboxLight,
  PiPhoneLight,
  PiShower,
} from "react-icons/pi";
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
    agent_phone,
    acquisition_type,
    type,
    agent_email,
  },
  priority,
}: PropertyCardProps) {
  return (
    <div className="max-w-full bg-white">
      <div className="flex flex-row">
        <div className="relative w-[300px]">
          <PropertyCardImage
            images={[cover_image, ...gallery]}
            priority={priority}
          />
        </div>
        <div className="flex w-full flex-col justify-between px-5 pb-7 pt-4">
          <div className="flex flex-col">
            <h4 className="text-wrap pr-5 text-lg font-semibold transition-colors duration-200 hover:text-blue-700">
              <Link href={`/listing/${slug}`}>{title}</Link>
            </h4>
            <div className="inline-flex space-x-1">
              <span className="my-3 rounded-md bg-gray-700 px-1.5 py-1 text-sm text-white">
                {acquisition_type.label}
              </span>
              <span className="my-3 rounded-md bg-gray-700 px-1.5 py-1 text-sm text-white">
                {type.label}
              </span>
            </div>
            <p className="text-sm text-gray-500">{address}</p>
          </div>

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
        <div className="flex w-36 flex-col justify-between gap-1 p-1">
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
    </div>
  );
}

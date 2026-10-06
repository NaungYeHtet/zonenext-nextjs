"use client";

import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";
import CarouselSlider from "../carousel-slider";

type PropertyCardImageProps = {
  images: string[];
  className?: string;
  priority?: boolean;
};

const IMAGE_SIZES =
  "(max-width: 768px) 200px, (max-width: 1200px) 300px, 500px";

export const PropertyCardImage = ({
  images,
  className,
  priority = false,
}: PropertyCardImageProps) => {
  const [isCarouselMounted, setIsCarouselMounted] = useState(false);

  if (images.length === 0) return null;

  if (!isCarouselMounted) {
    return (
      <div
        className="relative h-[250px] w-full"
        onPointerEnter={() => {
          if (images.length > 1) setIsCarouselMounted(true);
        }}
      >
        <Image
          className={clsx(className, "aspec")}
          src={images[0]}
          alt="Gallery"
          fill
          style={{ objectFit: "cover" }}
          sizes={IMAGE_SIZES}
          priority={priority}
        />
      </div>
    );
  }

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
            src={url}
            alt="Gallery"
            fill
            style={{ objectFit: "cover" }}
            sizes={IMAGE_SIZES}
            priority={priority && index === 0}
          />
        </div>
      ))}
    </CarouselSlider>
  );
};

"use client";

import { ReactNode } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";

interface CarouselProps extends SwiperProps {
  children: ReactNode[]; // Accepts any ReactNode as slides
  otherSwiperProps?: SwiperOptions;
}

export default function CarouselSlider({
  children,
  ...otherSwiperProps
}: CarouselProps) {
  return (
    <Swiper modules={[Navigation, Pagination, Autoplay]} {...otherSwiperProps}>
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
      <div className="swiper-custom-pagination" />
    </Swiper>
  );
}

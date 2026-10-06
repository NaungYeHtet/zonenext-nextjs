"use client";

import { ReactNode, useEffect, useState } from "react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperProps, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";

interface CarouselProps extends SwiperProps {
  children: ReactNode[]; // Accepts any ReactNode as slides
  otherSwiperProps?: SwiperOptions;
}

export default function CarouselSlider({
  children,
  onSwiper,
  ...otherSwiperProps
}: CarouselProps) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  // Stop autoplay while the carousel is off-screen so it doesn't keep
  // sliding (and loading slide images) where nobody can see it.
  useEffect(() => {
    // swiper/react destroys and re-creates the instance on remount (React
    // strict mode), calling onSwiper again with the new one.
    if (!swiper || swiper.destroyed) return;

    const { autoplay } = swiper.params;
    if (
      !autoplay ||
      // The Autoplay module merges `enabled: false` into params by default.
      (typeof autoplay === "object" &&
        "enabled" in autoplay &&
        autoplay.enabled === false)
    ) {
      return;
    }

    // Only restart autoplay this observer stopped, never one stopped by user
    // interaction or by the caller.
    let pausedByVisibility = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (swiper.destroyed) return;
        if (!entry.isIntersecting && swiper.autoplay.running) {
          swiper.autoplay.stop();
          pausedByVisibility = true;
        } else if (entry.isIntersecting && pausedByVisibility) {
          pausedByVisibility = false;
          swiper.autoplay.start();
        }
      },
      { threshold: 0 },
    );
    observer.observe(swiper.el);

    return () => observer.disconnect();
  }, [swiper]);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, A11y]}
      onSwiper={(instance) => {
        setSwiper(instance);
        onSwiper?.(instance);
      }}
      {...otherSwiperProps}
    >
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
      <div className="swiper-custom-pagination" />
    </Swiper>
  );
}

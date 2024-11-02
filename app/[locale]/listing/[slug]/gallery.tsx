"use client";

import Image from "next/image";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Custom icons

import "swiper/css";

type GalleryProps = {
  gallery: string[];
};

export default function Gallery({ gallery }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const prevIndexRef = useRef(activeIndex);

  const handleSlideChange = (swiper: SwiperClass) => {
    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (activeIndex !== prevIndexRef.current) {
      prevIndexRef.current = activeIndex;
    }
  }, [activeIndex]);

  const handleThumbnailClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <div className="relative w-full mb-9 md:mb-0 h-[300px] md:h-[600px]">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Autoplay]}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop
        style={{ height: "90%" }}
      >
        {gallery.map((image: string, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 z-10 bg-primary-500/40 hover:bg-primary-500  transition-colors duration-200 text-white rounded-full p-1 md:p-2 lg:p-3 text-sm md:text-base lg:text-lg"
      >
        <FaChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 z-10 bg-primary-500/40 hover:bg-primary-500 transition-colors duration-200 text-white rounded-full p-1 md:p-2 lg:p-3 text-sm md:text-base lg:text-lg"
      >
        <FaChevronRight className="w-4 h-4 md:w-6 md:h-6" />
      </button>

      <div className="flex gap-1 md:gap-2 mt-2 justify-center">
        {gallery.map((thumbnail: string, index) => (
          <div
            key={index}
            className={`cursor-pointer border-2 ${
              activeIndex === index ? "border-blue-500" : "border-transparent"
            } rounded`}
            onClick={() => handleThumbnailClick(index)}
          >
            <Image
              src={thumbnail}
              alt={`Thumbnail ${index + 1}`}
              width={70}
              height={70}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

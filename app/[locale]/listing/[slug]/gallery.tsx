"use client";

import Image from "next/image";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Custom icons

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { LuEye } from "react-icons/lu";
import { fetchApi } from "../../utils/helpers";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { VIEWER_KEY } from "../../utils/constants";
import { v4 as uuidv4 } from "uuid";
import apiPaths from "../../utils/api-paths";

type GalleryProps = {
  gallery: string[];
  viewsCount: number;
  slug: string;
};

export default function Gallery({ gallery, viewsCount, slug }: GalleryProps) {
  const { i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const prevIndexRef = useRef(activeIndex);

  const handleSlideChange = (swiper: SwiperClass) => {
    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    async function updateViewCount() {
      let viewerId = Cookies.get("viewer_id");

      if (!viewerId) {
        viewerId = uuidv4();

        Cookies.set(VIEWER_KEY, viewerId, {
          path: "/",
          expires: 60,
        });
      }

      fetchApi({
        method: "GET",
        path: `${apiPaths.VIEW_PROPERTY}/${slug}`,
        body: {
          language: i18n.language,
          viewer_id: viewerId,
        },
        options: { next: { revalidate: 60 * 60 * 24 } },
      });
    }

    updateViewCount();
  }, []);

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
    <div className="relative mb-9 h-[300px] w-full md:mb-0 md:h-[600px]">
      <div className="absolute right-2 top-[10%] z-10 -translate-y-1/2 transform rounded-sm bg-white/80 p-1 text-sm text-white md:right-4 md:p-2 md:text-base">
        <span className="inline-flex items-center gap-1 text-primary-900">
          <LuEye className="inline text-xl" />{" "}
          <span className="text-sm"> {viewsCount}</span>
        </span>
      </div>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Autoplay]}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop={gallery.length > 1 ? true : false}
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
            <div className="relative h-full w-full">
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 300px, (max-width: 1200px) 400px, 600px"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-primary-500/40 p-1 text-sm text-white transition-colors duration-200 hover:bg-primary-500 md:left-4 md:p-2 md:text-base lg:p-3 lg:text-lg"
      >
        <FaChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-primary-500/40 p-1 text-sm text-white transition-colors duration-200 hover:bg-primary-500 md:right-4 md:p-2 md:text-base lg:p-3 lg:text-lg"
      >
        <FaChevronRight className="h-4 w-4 md:h-6 md:w-6" />
      </button>

      <div className="mt-2 flex justify-center gap-1 md:gap-2">
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
              width={50}
              height={50}
              className="thumbnail-image object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

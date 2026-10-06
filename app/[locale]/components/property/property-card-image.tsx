"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CarouselSlider from "../carousel-slider";
import { cn } from "../../utils/helpers";

type PropertyCardImageProps = {
  images: string[];
  className?: string;
  priority?: boolean;
};

type Direction = "prev" | "next";

const IMAGE_SIZES =
  "(max-width: 768px) 200px, (max-width: 1200px) 300px, 500px";

type CardSlideProps = {
  url: string;
  className?: string;
  priority: boolean;
};

const CardSlide = ({ url, className, priority }: CardSlideProps) => (
  <div className="relative h-[250px] w-full">
    <Image
      className={cn(className)}
      src={url}
      alt="Gallery"
      fill
      style={{ objectFit: "cover" }}
      sizes={IMAGE_SIZES}
      priority={priority}
    />
  </div>
);

export const PropertyCardImage = ({
  images,
  className,
  priority = false,
}: PropertyCardImageProps) => {
  // Slide the carousel opens on; null until it is mounted.
  const [initialSlide, setInitialSlide] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Nav button to focus once the carousel replaces the static cover.
  const pendingFocus = useRef<Direction | null>(null);
  const hasGallery = images.length > 1;
  const isCarouselMounted = initialSlide !== null;

  // Touch devices have no hover, so mount as the card nears the viewport and
  // the carousel is already live for the first swipe.
  useEffect(() => {
    if (!hasGallery || isCarouselMounted || !containerRef.current) return;
    if (!window.matchMedia("(hover: none)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInitialSlide(0);
      },
      { rootMargin: "200px" },
    );
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [hasGallery, isCarouselMounted]);

  useEffect(() => {
    if (!isCarouselMounted || !pendingFocus.current) return;
    containerRef.current
      ?.querySelector<HTMLElement>(`.swiper-button-${pendingFocus.current}`)
      ?.focus();
    pendingFocus.current = null;
  }, [isCarouselMounted]);

  if (images.length === 0) return null;

  const openAt = (direction: Direction) => {
    pendingFocus.current = direction;
    setInitialSlide(direction === "next" ? 1 : images.length - 1);
  };

  return (
    <div ref={containerRef}>
      {isCarouselMounted ? (
        <CarouselSlider
          spaceBetween={0}
          pagination={false}
          slidesPerView={1}
          navigation={{}}
          initialSlide={initialSlide}
        >
          {images.map((url, index) => (
            <CardSlide
              key={index}
              url={url}
              className={className}
              priority={priority && index === 0}
            />
          ))}
        </CarouselSlider>
      ) : (
        <div
          className="relative"
          onPointerEnter={(e) => {
            if (hasGallery && e.pointerType === "mouse") setInitialSlide(0);
          }}
        >
          <CardSlide
            url={images[0]}
            className={className}
            priority={priority}
          />
          {hasGallery && (
            <>
              <button
                type="button"
                className="swiper-button-prev"
                aria-label="Previous slide"
                onClick={() => openAt("prev")}
              />
              <button
                type="button"
                className="swiper-button-next"
                aria-label="Next slide"
                onClick={() => openAt("next")}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

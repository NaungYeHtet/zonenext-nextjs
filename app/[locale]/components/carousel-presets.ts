import { SwiperProps } from "swiper/react";

// Shared by the home page carousels. The `home-carousel` class sizes slides
// with the same breakpoints in globals.css until Swiper initializes, so the
// server-rendered layout matches the hydrated one. Keep the two in sync.
export const HOME_CAROUSEL_PROPS = {
  className: "home-carousel",
  centeredSlides: false,
  centerInsufficientSlides: true,
  spaceBetween: 50,
  loop: true,
  pagination: {
    clickable: true,
    el: ".swiper-custom-pagination",
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    1200: { slidesPerView: 2 },
    1400: { slidesPerView: 3 },
  },
} satisfies SwiperProps;

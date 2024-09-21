"use client";

import { useState, useEffect, ReactNode } from "react";

interface CarouselProps {
  children: ReactNode[]; // Accepts any ReactNode as slides
  interval?: number; // Optional interval for auto-slide in ms (default: 2000ms)
}

export default function CarouselSlider({
  children,
  interval = 5000,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = children.length;

  const visibleSlides = 3; // Show 3 slides at once

  // Calculate the number of groups of slides
  const totalDots = Math.ceil(totalSlides / visibleSlides);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalDots - 1 ? 0 : prev + 1));
  };

  // Auto-slide effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(slideInterval);
  }, [currentSlide, interval]);

  // Handle clicking a dot
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${(currentSlide * 300) / visibleSlides}%)`,
        }}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full mx-3">
            {" "}
            {/* Each child takes 1/3rd of container */}
            {child}
          </div>
        ))}
      </div>

      {/* Circle Dots for navigation */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalDots }).map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              currentSlide === index ? "bg-blue-500" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

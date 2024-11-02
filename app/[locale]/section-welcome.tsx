"use client";

import Image, { StaticImageData } from "next/image";
import homeSellImg from "@/public/images/home-sell.jpg";
import homeBuyImg from "@/public/images/home-buy.jpg";
import homeRentImg from "@/public/images/home-rent.jpg";
import { useTranslation } from "react-i18next";
import TranslateText from "./components/translate-text";
import dynamic from "next/dynamic";

type CardImageType = {
  url: StaticImageData;
  alt: string;
};

type CardType = {
  image: CardImageType;
  title: string;
  text: string;
};

const LazyCard = dynamic(() => import("./components/cards/welcome-card"), {
  ssr: true,
});

export default function SectionWelcome() {
  const { t } = useTranslation();
  return (
    <section
      className="compact-container bg-gray-50 px-4 md:px-4 py-20 text-center"
      aria-label="Types"
    >
      <h2 className="text-xl md:text-2xl mb-3">
        <TranslateText>default:welcome</TranslateText>
      </h2>
      <p className="text-sm md:text-md text-gray-500">
        <TranslateText>default:welcome_paragraph</TranslateText>
      </p>
      <div className="flex flex-col md:flex-row gap-3 md:gap-7 lg:gap-10 mt-5 justify-center items-center">
        <LazyCard
          image={{ url: homeSellImg, alt: "Selling" }}
          title="Selling"
          text=" Sell properties by contacting company agents and posting in a day"
        />
        <LazyCard
          image={{ url: homeBuyImg, alt: "Buying" }}
          title="Buying"
          text=" Sell properties by contacting company agents and posting in a day"
        />
        <LazyCard
          image={{ url: homeRentImg, alt: "Renting" }}
          title="Renting"
          text=" Rent properties by contacting company agents and posting in a day"
        />
      </div>
    </section>
  );
}

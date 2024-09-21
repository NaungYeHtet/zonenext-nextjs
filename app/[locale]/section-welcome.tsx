"use client";

import Image, { StaticImageData } from "next/image";
import homeSellImg from "@/public/images/home-sell.jpg";
import homeBuyImg from "@/public/images/home-buy.jpg";
import homeRentImg from "@/public/images/home-rent.jpg";
import { useTranslation } from "react-i18next";

type CardImageType = {
  url: StaticImageData;
  alt: string;
};

type CardType = {
  image: CardImageType;
  title: string;
  text: string;
};

const Card = ({ image, title, text }: CardType) => {
  return (
    <div className="w-72 md:w-[350px] bg-white p-6 shadow-xl shadow-primary-200 border">
      <Image
        className="bg-cover bg-no-repeat"
        src={image.url}
        alt={image.alt}
      />
      <p className="text-2xl my-5">{title}</p>
      <p className="text-sm font-extralight text-gray-500">{text}</p>
    </div>
  );
};

export default function SectionWelcome() {
  const { t } = useTranslation();
  return (
    <section
      className="compact-container bg-gray-50 px-4 md:px-4 py-20 text-center"
      aria-label="Types"
    >
      <h2 className="text-xl md:text-2xl mb-3">{t("welcome")}</h2>
      <p className="text-sm md:text-md text-gray-500">
        Search and browse your properties by one click
      </p>
      <div className="flex flex-col md:flex-row gap-3 md:gap-7 lg:gap-10 mt-5 justify-center items-center">
        <Card
          image={{ url: homeSellImg, alt: "Selling" }}
          title="Selling"
          text=" Sell properties by contacting company agents and posting in a day"
        />
        <Card
          image={{ url: homeBuyImg, alt: "Buying" }}
          title="Buying"
          text=" Sell properties by contacting company agents and posting in a day"
        />
        <Card
          image={{ url: homeRentImg, alt: "Renting" }}
          title="Renting"
          text=" Rent properties by contacting company agents and posting in a day"
        />
      </div>
    </section>
  );
}

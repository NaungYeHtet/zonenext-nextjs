// Card.tsx
import Image, { StaticImageData } from "next/image";
import TranslateText from "../translate-text";

type CardImageType = {
  url: StaticImageData;
  alt: string;
};

type CardType = {
  image: CardImageType;
  title: string;
  text: string;
};

export default function Card({ image, title, text }: CardType) {
  return (
    <div className="w-72 border bg-white p-6 shadow md:w-[350px]">
      <Image
        className="bg-cover bg-no-repeat"
        src={image.url}
        alt={image.alt}
        sizes="(max-width: 768px) 288px, 350px"
      />
      <p className="my-5 text-2xl">
        <TranslateText>{title}</TranslateText>
      </p>
      <p className="text-sm font-extralight text-gray-500">
        <TranslateText>{text}</TranslateText>
      </p>
    </div>
  );
}

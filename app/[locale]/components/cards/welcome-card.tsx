// Card.tsx
import Image, { StaticImageData } from "next/image";

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
    <div className="w-72 md:w-[350px] bg-white shadow border p-6">
      <Image
        className="bg-cover bg-no-repeat"
        src={image.url}
        alt={image.alt}
        loading="lazy" // Lazy load each image
      />
      <p className="text-2xl my-5">{title}</p>
      <p className="text-sm font-extralight text-gray-500">{text}</p>
    </div>
  );
}

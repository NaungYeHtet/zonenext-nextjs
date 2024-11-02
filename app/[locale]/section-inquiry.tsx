import Image, { StaticImageData } from "next/image";
import TranslateText from "./components/translate-text";
import InquiryForm from "./components/inquiry/inquiry-form";
import { fetchApi } from "./utils/helpers";
import { API_PATH_INQUIRY } from "./utils/api-paths";

type CardImageType = {
  url: StaticImageData;
  alt: string;
};

type SectionInquiryProps = {
  locale: string;
};

export default async function SectionInquiry({ locale }: SectionInquiryProps) {
  const { data } = await fetchApi({
    method: "GET",
    path: API_PATH_INQUIRY,
    body: {
      language: locale,
    },
    options: {
      next: {
        revalidate: 0,
      },
    },
  });

  return (
    <section
      className="bg-fixed backdrop-grayscale bg-no-repeat bg-cover bg-center
		bg-[url('../../public/images/inquiry-bg.jpg')]"
      aria-label="Types"
    >
      <div className="bg-secondary-900/80 backdrop-grayscale-1 backdrop-blur-sm w-full h-full px-4 md:px-4 py-20 text-white  text-center">
        <h2 className="text-xl md:text-2xl mb-3">
          <TranslateText>default:inquiry</TranslateText>
        </h2>
        <p className="text-sm md:text-md">
          What are you looking for? Let us assist you in more efficient way.
        </p>
        <div className="flex flex-col w-full md:px-32 py-3 text-left">
          <InquiryForm options={data} />
        </div>
      </div>
    </section>
  );
}

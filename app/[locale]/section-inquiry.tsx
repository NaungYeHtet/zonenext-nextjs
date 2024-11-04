import { StaticImageData } from "next/image";
import TranslateText from "./components/translate-text";
import { fetchApi } from "./utils/helpers";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import InquiryFormSkeletion from "./components/inquiry/inquiry-form-skeleton";
import apiPaths from "./utils/api-paths";

const InquiryForm = dynamic(() => import("./components/inquiry/inquiry-form"), {
  ssr: false, // Only load on the client side
  loading: () => <InquiryFormSkeletion />,
});

type SectionInquiryProps = {
  locale: string;
};

export default async function SectionInquiry({ locale }: SectionInquiryProps) {
  const { data } = await fetchApi({
    method: "GET",
    path: apiPaths.INQUIRY,
    body: {
      language: locale,
    },
    options: {
      next: {
        revalidate: 60 * 60 * 24,
      },
    },
  });

  return (
    <section
      className="bg-[url('../../public/images/inquiry-bg.jpg')] bg-cover bg-fixed bg-center bg-no-repeat backdrop-grayscale"
      aria-label="Types"
    >
      <div className="backdrop-grayscale-1 h-full w-full bg-secondary-900/80 px-4 py-20 text-center text-white backdrop-blur-sm md:px-4">
        <h2 className="mb-3 text-xl md:text-2xl">
          <TranslateText>default:inquiry</TranslateText>
        </h2>
        <p className="md:text-md text-sm">
          What are you looking for? Let us assist you in more efficient way.
        </p>
        <div className="flex w-full flex-col py-3 text-left md:px-32">
          <Suspense fallback={<InquiryFormSkeletion />}>
            <InquiryForm options={data} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

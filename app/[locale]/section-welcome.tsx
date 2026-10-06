import homeSellImg from "@/public/images/home-sell.jpg";
import homeBuyImg from "@/public/images/home-buy.jpg";
import homeRentImg from "@/public/images/home-rent.jpg";
import TranslateText from "./components/translate-text";
import WelcomeCard from "./components/cards/welcome-card";

export default function SectionWelcome() {
  return (
    <section
      className="compact-container bg-gray-50 px-4 py-20 text-center md:px-4"
      aria-label="Types"
    >
      <h2 className="mb-3 text-xl md:text-2xl">
        <TranslateText>default:welcome</TranslateText>
      </h2>
      <p className="md:text-md text-sm text-gray-500">
        <TranslateText>default:welcome_paragraph</TranslateText>
      </p>
      <div className="mt-5 flex flex-col items-center justify-center gap-3 md:flex-row md:gap-7 lg:gap-10">
        <WelcomeCard
          image={{ url: homeSellImg, alt: "Selling" }}
          title="Selling"
          text=" Sell properties by contacting company agents and posting in a day"
        />
        <WelcomeCard
          image={{ url: homeBuyImg, alt: "Buying" }}
          title="Buying"
          text=" Sell properties by contacting company agents and posting in a day"
        />
        <WelcomeCard
          image={{ url: homeRentImg, alt: "Renting" }}
          title="Renting"
          text=" Rent properties by contacting company agents and posting in a day"
        />
      </div>
    </section>
  );
}

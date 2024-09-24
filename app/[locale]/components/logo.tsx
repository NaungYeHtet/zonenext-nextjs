import Image from "next/image";
import logo from "../../../public/logo/logo-no-background.png";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Image className={className} src={logo} alt="Zone Next Logo" priority />
  );
}

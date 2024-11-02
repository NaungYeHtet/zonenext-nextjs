import Image from "next/image";
import logo from "../../../public/logo/logo-no-background.png";
import Link from "next/link";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Link href={"/"}>
      <Image className={className} src={logo} alt="Zone Next Logo" priority />
    </Link>
  );
}

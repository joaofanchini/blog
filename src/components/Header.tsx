import Link from "next/link";
import BurgerButton from "./BurgerButton";
import Logo from "@images/logo.svg";
import Image from "next/image";
import InlineMenu from "./InlineMenu";

interface NavLink {
  label: string;
  href: string;
}

export function Header() {
  const navLinks: NavLink[] = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Sobre mim",
      href: "/about",
    },
  ];
  return (
    <header className="w-auto h-24 bg-gray-800 flex justify-between items-center shadow-sm px-2 lg:px-18">
      <div className="flex gap-12">
        <Link href="/">
          <div className="flex justify-center items-center gap-1">
            <Image
              src={Logo.src}
              alt="Logo"
              width={40}
              height={40}
              style={{ display: "inline-block" }}
            />
            <span className="text-xl font  bg-clip-text text-cyan-600">
              Echoes from the{" "}
              <span className="text-2xl font-bold  bg-clip-text text-cyan-600 ">
                Journey
              </span>
            </span>
          </div>
        </Link>
      </div>
      <InlineMenu navLinks={navLinks} />
      <BurgerButton navLinks={navLinks} />
    </header>
  );
}

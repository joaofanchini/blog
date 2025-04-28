"use client";

import Link from "next/link";
import { useState } from "react";

interface BurgerButtonProps {
  navLinks?: Array<{ label: string; href: string }> | null;
}

interface Button {
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
}

function Button(props: Button) {
  const { toggled, setToggled } = props;
  return (
    <div
      onClick={() => setToggled(!toggled)}
      className="flex flex-col gap-1 z-100 cursor-pointer relative"
    >
      <span
        className={`w-[24px] h-[2px] bg-amber-50 transition-all duration-100 ${
          toggled ? "rotate-45 translate-y-1.5" : ""
        }`}
      />
      <span
        className={`w-[24px] h-[2px] bg-amber-50 transition-all duration-100 ${
          toggled ? "opacity-0" : ""
        }`}
      />
      <span
        className={`w-[24px] h-[2px] bg-amber-50 transition-all duration-100 ${
          toggled ? "-rotate-45 -translate-y-1.5" : ""
        }`}
      />
    </div>
  );
}

export default function BurgerButton(props: BurgerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden">
      <Button toggled={isOpen} setToggled={setIsOpen} />
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-900 opacity-95 gap-4 z-10 overscroll-none">
          <nav>
            <ul>
              {props.navLinks?.map((link, index) => (
                <li
                  key={index}
                  className="border-b-2 border-gray-200 last:border-b-0"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(!isOpen)}
                    className="block text-white text-lg font-semibold hover:bg-[#374151] hover:text-[#F9FAFB] p-4  text-center cursor-pointer transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

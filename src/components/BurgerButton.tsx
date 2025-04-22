"use client";

import { useState } from "react";

export default function BurgerButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div onClick={() => setIsOpen(!isOpen)} className="flex flex-col gap-1">
      <span
        className={`w-[24px] h-[2px] bg-amber-50 transition-all duration-100 ${
          isOpen ? "rotate-45 translate-y-1.5" : ""
        }`}
      ></span>
      <span
        className={`w-[24px] h-[2px] bg-amber-50 transition-all duration-100 ${
          isOpen ? "opacity-0" : ""
        }`}
      ></span>
      <span
        className={`w-[24px] h-[2px] bg-amber-50 transition-all duration-100 ${
          isOpen ? "-rotate-45 -translate-y-1.5" : ""
        }`}
      ></span>
    </div>
  );
}

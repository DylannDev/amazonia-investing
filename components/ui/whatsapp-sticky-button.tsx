"use client";

import Link from "next/link";
import { RiWhatsappFill } from "react-icons/ri";
import { Typography } from "./typography";

export function WhatsappStickyButton() {
  return (
    <Link
      href="https://wa.me/+594694252185"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactez-nous sur WhatsApp"
      className="fixed z-50 bottom-4 right-4 md:bottom-8 md:right-6 group flex flex-col items-end"
    >
      <div className="relative">
        <div
          className="absolute right-18 bottom-1 z-[-1] block py-3 px-4 bg-black border-2 border-white rounded-xl shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto transition-all duration-150 ease-in-out"
          style={{ minWidth: "180px" }}
        >
          <Typography
            as="span"
            variant="base"
            weight="medium"
            className="text-white text-center whitespace-nowrap"
          >
            Discuter de votre investissement
          </Typography>
        </div>
        <span className="border-2 border-white bg-green-300 hover:bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 transition-all duration-200">
          <RiWhatsappFill className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
        </span>
      </div>
    </Link>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { Logo } from "../ui/logo";
import { CallButton } from "../ui/call-button";
import { navLinks } from "@/data";
import { Container } from "../ui/container";
import { PiList, PiX } from "react-icons/pi";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      // Préserver l'espace de la scrollbar pour éviter le décalage
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    // Nettoyer lors du démontage
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    const isScrollingDown = currentScrollY > lastScrollY;
    const isScrollingUp = currentScrollY < lastScrollY;
    const isMinimalScroll = currentScrollY < 10;

    if (isScrollingDown && !isMinimalScroll) {
      setIsVisible(false);
    } else if (isScrollingUp || isMinimalScroll) {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  });

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed left-0 right-0 top-0 z-100 border-b bg-white/95 backdrop-blur-sm h-[80px] sm:h-[100px] flex items-center"
      >
        <Container className="w-full">
          <nav className="flex h-full items-center justify-between w-full">
            {/* Logo */}
            <Logo />

            {/* Desktop Menu */}
            <div className="hidden items-center lg:flex text-lg font-medium">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-black transition-all duration-150 ease-in-out hover:bg-blue-50 hover:text-blue-300 px-3 py-1 rounded-md"
                >
                  {item.label}
                </Link>
              ))}
              <CallButton className="ml-4" />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="rounded-md bg-blue-100 p-2 lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <PiX className="text-2xl text-blue-300" />
              ) : (
                <PiList className="text-2xl text-blue-300" />
              )}
            </button>
          </nav>
        </Container>
      </motion.header>

      {/* Voile foncé */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -400 }}
            animate={{ y: 0 }}
            exit={{ y: -400 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed top-[80px] sm:top-[100px] left-0 right-0 z-90 bg-white/95 backdrop-blur-sm border-b shadow-lg lg:hidden"
          >
            <Container className="py-6">
              <div className="space-y-6">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-lg font-medium text-black transition-colors hover:text-blue-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <CallButton className="w-full" />
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

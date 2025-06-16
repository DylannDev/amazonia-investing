"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Logo } from "../ui/logo";
import { CallButton } from "../ui/call-button";

const menuItems = [
  { label: "Comment ça marche", href: "#how-it-works" },
  { label: "Simulateur", href: "#simulator" },
  { label: "Témoignages", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();

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
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 right-0 top-0 z-50 border-b bg-white/80 backdrop-blur-sm h-[100px] flex items-center"
    >
      <nav className="container mx-auto flex h-full items-center justify-between px-4">
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden items-center md:flex gap-1 text-lg font-medium">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-black transition-all duration-300 ease-in-out hover:bg-blue-50 hover:text-blue-300 px-3 py-1 rounded-md"
            >
              {item.label}
            </Link>
          ))}
          <CallButton className="ml-4" />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b bg-background md:hidden"
          >
            <div className="container mx-auto space-y-1 px-4 py-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <CallButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

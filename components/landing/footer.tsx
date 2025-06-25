import Link from "next/link";
import { navLinks } from "@/data";
import {
  RiFacebookFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiWhatsappFill,
} from "react-icons/ri";
import { LuMail } from "react-icons/lu";
import { Typography } from "../ui/typography";
import { Logo } from "../ui/logo";
import { Shadow } from "../ui/shadow";
import FadeInText from "../ui/animations";

const footerLinks = {
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "CGU", href: "/cgu" },
  ],
  contact: [
    {
      icon: <LuMail />,
      label: "contact@amazonia-investing.com",
      href: "mailto:contact@amazonia-investing.com",
    },
  ],
  social: [
    {
      icon: <RiWhatsappFill />,
      label: "Whatsapp",
      href: "https://wa.me/+594694252185",
    },
    {
      icon: <RiFacebookFill />,
      label: "Facebook",
      href: "https://facebook.com/amazoniaacademy",
    },
    {
      icon: <RiInstagramFill />,
      label: "Instagram",
      href: "https://instagram.com/amazoniainvesting",
    },
    {
      icon: <RiLinkedinFill />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/amazoniacapital/",
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black text-white pb-12 pt-20 md:pt-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row lg:flex-wrap justify-between gap-8">
          {/* Company Info */}
          <FadeInText delay={0.1}>
            <div className="flex flex-col items-center md:items-start mb-8 md:mb-0 xl:col-span-2">
              <Logo variant="white" isFooter />
              <Typography as="p" variant="lg" weight="normal" className="mt-2">
                Rendre l'investissement accessible à tous.
              </Typography>
            </div>
          </FadeInText>

          {/* Navigation */}
          <FadeInText delay={0.2}>
            <div>
              <Typography
                as="h3"
                variant="2xl"
                weight="semibold"
                className="text-center md:text-left"
              >
                Navigation
              </Typography>
              <ul className="space-y-2 text-center md:text-left">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-lg text-gray-300 transition-colors hover:text-blue-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInText>

          {/* Legal */}
          <FadeInText delay={0.3}>
            <div>
              <Typography
                as="h3"
                variant="2xl"
                weight="semibold"
                className="text-center md:text-left"
              >
                Légal
              </Typography>
              <ul className="space-y-2 text-center md:text-left">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-lg text-gray-300 transition-colors hover:text-blue-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInText>

          {/* Contact */}
          <FadeInText delay={0.4}>
            <div>
              <Typography
                as="h3"
                variant="2xl"
                weight="semibold"
                className="text-center md:text-left"
              >
                Contact
              </Typography>
              <ul className="space-y-2">
                {footerLinks.contact.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex justify-center md:justify-start items-center gap-2 text-lg text-gray-300 transition-colors hover:text-blue-300"
                    >
                      <span className="text-xl">{link.icon}</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-center md:justify-start gap-4">
                {footerLinks.social.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 bg-blue-300 text-white hover:-translate-y-1 transition-all duration-150"
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <span className="sr-only">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </FadeInText>
        </div>

        {/* Bottom Bar */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-20 border-t-2 border-gray-700 pt-10 text-center text-lg text-gray-300">
          <Typography as="p" variant="lg" weight="normal">
            © {new Date().getFullYear()} Amazonia Investing. Tous droits
            réservés.
          </Typography>
          <Typography as="p" variant="lg" weight="normal">
            Développé par{" "}
            <a
              href="https://vizionweb.fr/"
              target="blank"
              className="hover:underline underline-offset-8 text-blue-300 font-medium"
            >
              Vizion Web
            </a>{" "}
            💫
          </Typography>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Shadow
          className="-bottom-10 -left-30 opacity-30"
          color="blue"
          size="sm"
          zIndex="z-0"
        />
      </div>
    </footer>
  );
}

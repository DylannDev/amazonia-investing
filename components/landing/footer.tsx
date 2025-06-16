import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const footerLinks = {
  navigation: [
    { label: "Comment ça marche", href: "#how-it-works" },
    { label: "Simulateur", href: "#simulator" },
    { label: "Témoignages", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
    { label: "CGU", href: "/cgu" },
  ],
  contact: [
    { icon: Phone, label: "+33 1 23 45 67 89", href: "tel:+33123456789" },
    {
      icon: Mail,
      label: "contact@amazonia-investing.com",
      href: "mailto:contact@amazonia-investing.com",
    },
  ],
  social: [
    { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 pb-12 pt-72">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Amazonia Investing</h3>
            <p className="text-sm text-gray-300">
              Investissez une seule fois et percevez des revenus mensuels à vie.
              Gestion 100% déléguée par un trader professionnel.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-blue-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Légal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-blue-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-2">
              {footerLinks.contact.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-blue-300"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-4">
              {footerLinks.social.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 bg-blue-300 text-white transition-colors hover:bg-blue-600"
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-300">
          <p>
            © {new Date().getFullYear()} Amazonia Investing. Tous droits
            réservés.
          </p>
          <p className="mt-2">
            Les performances passées ne garantissent pas les performances
            futures. Ce produit n'est pas réglementé par l'AMF.
          </p>
        </div>
      </div>
    </footer>
  );
}

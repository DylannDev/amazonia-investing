import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Typography } from "@/components/ui/typography";
import { PiProhibitInsetDuotone } from "react-icons/pi";
import { ArrowButton } from "@/components/ui/arrow-button";

export default function NotFound() {
  return (
    <Container className="min-h-screen flex items-center justify-center py-16">
      <div className="text-center space-y-6 max-w-md mx-auto">
        {/* 404 Number */}
        <div className="flex flex-col items-center justify-center gap-2">
          <PiProhibitInsetDuotone className="text-red-300/70 text-[60px]" />
          <Typography
            variant="4xl"
            as="h1"
            className="font-bold text-red-300/70 mb-0"
          >
            Error 404
          </Typography>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <Typography variant="3xl" as="h2" className="font-semibold">
            Page introuvable
          </Typography>
          <Typography variant="xl" as="p" className="text-gray-500">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </Typography>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
          <ArrowButton
            variant="green"
            size="lg"
            label="Voir nos articles"
            href="/blog"
          >
            <Link href="/blog">Voir nos articles</Link>
          </ArrowButton>
        </div>

        {/* Decorative Elements */}
        <div className="relative">
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-primary/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-secondary/10 rounded-full blur-xl"></div>
        </div>
      </div>
    </Container>
  );
}

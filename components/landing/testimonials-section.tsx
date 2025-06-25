import { SectionHeader } from "../ui/section-header";
import { TestimonialCard } from "./testimonial-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { CallButton } from "../ui/call-button";
import FadeInText from "../ui/animations";

const testimonials = [
  {
    name: "Sophie D.",
    age: 32,
    role: "Professeure",
    content:
      "J’ai commencé petit, 500€ il y a presque un an. Chaque mois, 50€ tombent sur mon compte sans que j’aie quoi que ce soit à gérer, je les mets de côté pour un futur voyage avec ma classe.",
    investment: 500,
    monthlyReturn: 50,
    stars: 5,
  },
  {
    name: "Thomas X.",
    age: 45,
    role: "Entrepreneur",
    content:
      "Depuis que j’ai placé 1000€, Amazonia Investing verse 100€ tous les mois. C’est régulier, clair, et ça complète parfaitement mes revenus d’entreprise qui, eux, sont plus variables.",
    investment: 1000,
    monthlyReturn: 100,
    stars: 5,
  },
  {
    name: "Marie D.",
    age: 28,
    role: "Infirmière",
    content:
      "Avec mes horaires décalés, je n’ai ni le temps ni l’énergie pour gérer un placement complexe. Les 150€ mensuels que je touche sur mes 1500€ investis paient mes trajets et une partie de mon loyer.",
    investment: 1500,
    monthlyReturn: 150,
    stars: 5,
  },
  {
    name: "Pierre Z.",
    age: 52,
    role: "Retraité",
    content:
      "Je voulais un complément régulier pour la retraite, mes 2000€ me rapportent 200€ tous les mois depuis plus d'un an. Simple et sans paperasse, ça change la donne.",
    investment: 2000,
    monthlyReturn: 200,
    stars: 5,
  },
  {
    name: "Emma L.",
    age: 35,
    role: "Architecte",
    content:
      "Je suis à mon compte et mes rentrées d’argent sont irrégulières. Les 250€ mensuels sur mes 2500€ investis couvrent mon loyer de bureau quand un client tarde à payer.",
    investment: 2500,
    monthlyReturn: 250,
    stars: 5,
  },
  {
    name: "Lucas J.",
    age: 41,
    role: "Ingénieur",
    content:
      "Je cherchais un placement qui ne me demande pas de passer mes soirées à analyser des graphiques. Je reçois 300€ chaque mois sur 3000€ placés. C’est net, automatique, et ça finance les activités sportives de mes enfants.",
    investment: 3000,
    monthlyReturn: 300,
    stars: 5,
  },
  {
    name: "Nadia K.",
    age: 29,
    role: "Community manager",
    content:
      "800€ investis, 80€ qui tombent tous les mois, sans que je n'ai quoi que ce soit à gérer, et aucun stress.",
    investment: 800,
    monthlyReturn: 80,
    stars: 5,
  },
  {
    name: "Antoine R.",
    age: 50,
    role: "Médecin",
    content:
      "Avec 4000€ placés, je touche 400€ mensuels. Je garde le capital « immobilisé », mais cette rente finance mes prochaines vacances sans toucher à mon épargne retraite.",
    investment: 4000,
    monthlyReturn: 400,
    stars: 5,
  },
  {
    name: "Hugo M.",
    age: 37,
    role: "Chef de projet",
    content:
      "J’ai divisé mon budget investissement : une partie en bourse et 1200€ chez Amazonia. Les 120€ mensuels arrivent comme un salaire bonus, sans la volatilité qui m’angoissait sur les marchés.",
    investment: 1200,
    monthlyReturn: 120,
    stars: 5,
  },
  {
    name: "Claire B.",
    age: 39,
    role: "Chargée de recrutement",
    content:
      "Je n’y connaissais rien en finance, mais Amazonia m’a tout expliqué simplement. J’ai placé 1 800 € et je reçois 180 € chaque mois. C’est devenu mon petit budget loisirs mensuel, sans prise de tête.",
    investment: 1800,
    monthlyReturn: 180,
    stars: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="pt-20 pb-10 md:pt-32 md:pb-16">
      <div className="container mx-auto px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12">
            <SectionHeader
              badge="Témoignages clients"
              title="Nos investisseurs témoignent"
              description="Découvrez les témoignages de ceux qui perçoivent déjà des revenus mensuels grâce à Amazonia Investing."
              textAlign="left"
            />
            <div className="hidden lg:flex items-center justify-center gap-4 mt-12">
              <CarouselPrevious className="static text-black border-2 border-black hover:bg-blue-300 hover:text-white cursor-pointer hover:border-blue-300 active:bg-blue-300 active:border-blue-300 active:text-white active:scale-95 transition-colors duration-150" />
              <CarouselNext className="static text-black border-2 border-black hover:bg-blue-300 hover:text-white cursor-pointer hover:border-blue-300 active:bg-blue-300 active:border-blue-300 active:text-white active:scale-95 transition-colors duration-150" />
            </div>
          </div>

          <CarouselContent className="mb-6 lg:mb-12">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 flex justify-center w-full"
              >
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                  index={index}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex flex-col-reverse min-[500px]:flex-row items-center gap-6 justify-center min-[500px]:justify-between lg:justify-center">
            <FadeInText delay={0.4} className="flex justify-center">
              <CallButton className="w-fit" />
            </FadeInText>
            <div className="flex lg:hidden justify-center items-center gap-4">
              <CarouselPrevious className="static text-black border-2 border-black hover:bg-blue-300 hover:text-white cursor-pointer hover:border-blue-300 active:bg-blue-300 active:border-blue-300 active:text-white active:scale-95 transition-colors duration-150" />
              <CarouselNext className="static text-black border-2 border-black hover:bg-blue-300 hover:text-white cursor-pointer hover:border-blue-300 active:bg-blue-300 active:border-blue-300 active:text-white active:scale-95 transition-colors duration-150" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}

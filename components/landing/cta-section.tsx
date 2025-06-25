import Image from "next/image";
import { CallButton } from "../ui/call-button";
import { SectionHeader } from "../ui/section-header";
import { Shadow } from "../ui/shadow";
import { FadeInImage } from "../ui/animations";

export function CtaSection() {
  return (
    <section className="pt-20 sm:pt-32 pb-0 bg-black border-y border-black">
      <div className="container mx-auto px-4">
        <FadeInImage
          direction="y"
          className="text-center bg-white border-2 border-white rounded-3xl px-6 py-12 sm:p-12 relative z-50 overflow-hidden"
        >
          <SectionHeader
            title="Recevez vos premiers revenus dès ce mois-ci"
            description="Rejoignez les investisseurs qui perçoivent déjà un revenu mensuel régulier grâce à Amazonia Investing. Notre équipe vous guide pas à pas, de l’investissement à la première rente."
          />

          <CallButton variant="blue" />
          <div className="absolute inset-0 pointer-events-none rounded-3xl">
            <Shadow
              className="-top-10 sm:-top-40 -right-10 sm:-right-20 opacity-80"
              color="blue"
              size="sm"
              zIndex="-z-2"
            />
            <Shadow
              className="-bottom-20 sm:-bottom-60 -left-30 sm:-left-50 opacity-80"
              color="blue"
              size="sm"
              zIndex="-z-2"
            />
          </div>
          <div className="absolute -top-10 sm:-top-20 -right-10 sm:-right-20 -z-1 w-[200px] sm:w-[300px] h-full rotate-6">
            <Image
              src="/shapes-small.svg"
              alt=""
              width={300}
              height={300}
              className="absolute w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] object-contain"
            />
          </div>
        </FadeInImage>
      </div>
    </section>
  );
}

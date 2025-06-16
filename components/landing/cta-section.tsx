import Image from "next/image";
import { CallButton } from "../ui/call-button";
import { SectionHeader } from "../ui/section-header";
import { Shadow } from "../ui/shadow";

export function CtaSection() {
  return (
    <section className="pt-20 sm:pt-32 -mb-48 bg-black">
      <div className="container max-w-[96rem] mx-auto px-4">
        <div className="text-center bg-white border-2 border-white rounded-3xl p-12 relative z-50 overflow-hidden">
          <SectionHeader
            title="Recevez vos premiers revenus dès ce mois-ci"
            description="Rejoignez les investisseurs qui perçoivent déjà un revenu mensuel régulier grâce à Amazonia Investing. Notre équipe vous guide pas à pas, de l’investissement à la première rente."
          />

          <CallButton variant="blue" />
          <div className="absolute inset-0 pointer-events-none rounded-3xl">
            <Shadow
              className="-top-40 -right-20 opacity-80"
              color="blue"
              size="sm"
              zIndex="-z-2"
            />
            <Shadow
              className="-bottom-60 -left-50 opacity-80"
              color="blue"
              size="sm"
              zIndex="-z-2"
            />
          </div>
          <div className="absolute -top-20 -right-20 -z-1 w-[400px] h-full rotate-6">
            <Image
              src="/shapes-small.svg"
              alt=""
              width={400}
              height={400}
              className="absolute w-[400px] h-[400px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

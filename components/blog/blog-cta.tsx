import { Typography } from "@/components/ui/typography";
import { CallButton } from "@/components/ui/call-button";
import { FadeInImage } from "../ui/animations";

export function BlogCta() {
  return (
    <FadeInImage className="mt-16 px-6 py-12 sm:p-12 bg-blue-50 rounded-3xl">
      <div className="text-center">
        <Typography as="h3" variant="4xl" weight="semibold" className="mb-4">
          Prêt à commencer votre investissement ?
        </Typography>
        <Typography
          as="p"
          variant="xl"
          weight="normal"
          className="mb-6 text-gray-600"
        >
          Rejoignez les investisseurs qui perçoivent déjà un revenu mensuel
          régulier grâce à Amazonia Investing.
        </Typography>
        <CallButton variant="blue" />
      </div>
    </FadeInImage>
  );
}

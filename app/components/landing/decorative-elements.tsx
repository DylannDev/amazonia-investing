import { Shadow } from "@/components/ui/shadow";
import Image from "next/image";

export function DecorativeElements() {
  return (
    <>
      <Shadow className="-top-30 -left-30" />
      <Shadow className="bottom-40 -right-10" color="green" size="sm" />
      <div className="absolute bottom-20 -right-20 -z-9">
        <Image
          src="/shapes-small.svg"
          alt=""
          width={400}
          height={400}
          className="w-[400px] h-[400px] object-contain"
          priority
          fetchPriority="high"
        />
      </div>
    </>
  );
}

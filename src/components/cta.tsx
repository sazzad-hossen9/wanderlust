import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 bg-black/35" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center text-white lg:py-28">
        <h2 className="font-serif text-4xl lg:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-base text-white/90">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Button className="mt-8 h-10 rounded-[4px] bg-white px-7 text-xs font-bold tracking-wider text-foreground hover:bg-white/90">
          BOOK YOUR TRIP TODAY
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
}

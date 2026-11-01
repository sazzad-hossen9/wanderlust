import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0 - $3000" },
  { label: "People", value: "5 - 10" },
] as const;

export function Banner() {
  return (
    <section className="relative flex min-h-[calc(100svh_-_3rem)] flex-col text-white">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="relative flex flex-1 items-center justify-center px-6 py-16 text-center">
        <div>
          <h1 className="font-serif text-5xl leading-[1.15] font-medium lg:text-6xl">
            Discover Your
            <br />
            Next Adventure
          </h1>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-7 text-white/90">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-10 rounded-[4px] bg-brand px-7 text-xs font-bold tracking-wider text-white hover:bg-brand/90"
            >
              EXPLORE NOW
              <ArrowRight />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="h-10 rounded-[4px] bg-white/25 px-7 text-xs font-bold tracking-wider text-white hover:bg-white/35 hover:text-white"
            >
              VIEW DESTINATION
            </Button>
          </div>
        </div>
      </div>

      <form className="relative flex h-12 w-full overflow-x-auto">
        {searchFields.map(({ label, value }, i) => (
          <div
            key={label}
            className={cn(
              "flex flex-col justify-center bg-black/30 px-4 md:px-6",
              i === searchFields.length - 1 && "flex-[0.65]",
            )}
          >
            <span className="text-sm font-semibold">{label}</span>
            <span className="text-xs whitespace-nowrap text-white/70">
              {value}
            </span>
          </div>
        ))}
        <Button
          type="submit"
          className="h-full shrink-0 rounded-none bg-brand px-8 text-base font-medium text-cyan-950 hover:bg-brand/90 md:px-12"
        >
          Search
        </Button>
      </form>
    </section>
  );
}

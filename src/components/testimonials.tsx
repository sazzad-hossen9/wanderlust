import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselDots } from "@/components/carousel-dots";

const testimonials = [
  {
    photo: "/images/person2.png",
    width: 218,
    height: 264,
    quote:
      "“The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.”",
    name: "Michael Chen",
    location: "Singapore",
  },
  {
    photo: "/images/person1.png",
    width: 218,
    height: 264,
    quote:
      "“Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!”",
    name: "Sarah Johnson",
    location: "New York, USA",
  },
  {
    photo: "/images/person3.jpg",
    width: 600,
    height: 750,
    quote:
      "“Booking Through Wanderlast Was Seamless From Start To Finish. Private Transfers, Expert Guides And Stunning Hotels Made Dubai Truly Unforgettable.”",
    name: "James Wright",
    location: "London, UK",
  },
  {
    photo: "/images/person4.jpg",
    width: 600,
    height: 750,
    quote:
      "“Kyoto Exceeded Every Expectation. Our Local Guide Revealed Hidden Temples And Tea Houses We Would Never Have Found Alone. Wonderful Memories!”",
    name: "Priya Sharma",
    location: "Mumbai, India",
  },
] as const;

export function Testimonials() {
  return (
    <section id="testimonials" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Carousel opts={{ align: "start" }}>
          <div className="flex items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-4xl lg:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CarouselPrevious className="static size-10" />
              <CarouselNext className="static size-10" />
            </div>
          </div>

          <CarouselContent className="-ml-6 mt-14">
            {testimonials.map(
              ({ photo, width, height, quote, name, location }) => (
                <CarouselItem
                  key={name}
                  className="basis-full pl-6 md:basis-1/2"
                >
                  <article className="grid h-full gap-2 rounded-xl border border-border bg-white p-6 shadow-sm md:grid-cols-[1fr_auto]">
                    <div className="flex flex-col px-4">
                      <blockquote className="font-serif text-lg leading-7 text-foreground">
                        {quote}
                      </blockquote>
                      <footer className="mt-auto pt-6">
                        <div className="flex items-center gap-2">
                          <span
                            aria-hidden
                            className="h-0.5 w-5 rounded-full bg-brand"
                          />
                          <span className="text-base text-brand">{name}</span>
                        </div>
                        <p className="mt-1 pl-7 text-xs text-muted-foreground">
                          {location}
                        </p>
                      </footer>
                    </div>
                    <Image
                      src={photo}
                      alt={`Photo of ${name}`}
                      width={width}
                      height={height}
                      className="h-full w-64 rounded-md object-cover max-md:order-first max-md:h-72 max-md:w-full"
                    />
                  </article>
                </CarouselItem>
              ),
            )}
          </CarouselContent>

          <CarouselDots className="mt-10" />
        </Carousel>
      </div>
    </section>
  );
}

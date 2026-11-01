import Image from "next/image";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    text: "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    text: "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    text: "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
] as const;

export function Features() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us"
      className="bg-brand-tint py-24 text-foreground lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="font-serif text-4xl lg:text-5xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map(({ icon, title, text }) => (
            <li key={title}>
              <article className="h-full bg-white p-10 shadow-sm">
                <Image
                  src={icon}
                  alt=""
                  width={48}
                  height={48}
                  className="size-9"
                />
                <h3 className="mt-9 font-serif text-2xl">{title}</h3>
                <p className="mt-5 text-[15px] leading-6 text-muted-foreground">
                  {text}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

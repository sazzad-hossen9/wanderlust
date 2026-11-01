import { Banner } from "@/components/banner";
import { CtaBanner } from "@/components/cta";
import { Features } from "@/components/features";


import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Banner />
      <Features />
      <Testimonials />
      <CtaBanner />
    </>
  );
}

import { Banner } from "@/components/banner";
import { CtaBanner } from "@/components/cta";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Features />
      <Testimonials />
      <CtaBanner />
      <Footer />
    </>
  );
}

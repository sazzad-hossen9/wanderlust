import { Banner } from "@/components/banner";
import { Features } from "@/components/features";
import { Navbar } from "@/components/navbar";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Features />
      <Testimonials />
    </>
  );
}

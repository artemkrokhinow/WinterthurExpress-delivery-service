import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { Integrations } from "@/components/Integrations";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CallToAction } from "@/components/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <Features />
      <Integrations />
      <Testimonials />
      <FAQ />
      <CallToAction />
    </>
  );
}

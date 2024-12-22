import Hero from "@/components/landing/hero";
import FAQ from "@/components/landing/faq";
import HowToUse from "@/components/landing/how-to-use";
import Features from "@/components/landing/features";
import { Footer } from "@/components/landing/Footer";

export default function Home() {

  return (
    <main>
      <div className="mb-10">
      <Hero />
      </div>
      <h2 className="mt-20 text-center mb-3 text-2xl font-bold mx-auto relative z-20 py-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white w-full">
        Quickstart
      </h2>
      <HowToUse />
      <Features />
      <FAQ />
      <Footer />
    </main>
  );
}

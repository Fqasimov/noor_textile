import { IntroOverlay } from "@/components/intro/IntroOverlay";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Catalog } from "@/components/catalog/Catalog";

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <Header variant="overlay" />
      <main>
        <Hero />
        <About />
        <Catalog />
      </main>
      <Footer />
    </>
  );
}

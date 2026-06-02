import { createFileRoute } from "@tanstack/react-router";
import { Loader } from "@/components/Loader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Materials, Engineering } from "@/components/Materials";
import { Configurator, Storage } from "@/components/Configurator";
import { Difference, Projects, Testimonials, Contact, Footer } from "@/components/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DC INTERIORS — Luxury Modular Kitchens" },
      { name: "description", content: "DC INTERIORS crafts ultra-premium modular kitchens in walnut, matte black and brass. Where luxury meets functionality." },
      { property: "og:title", content: "DC INTERIORS — Luxury Modular Kitchens" },
      { property: "og:description", content: "Crafted modular kitchens for modern living." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Loader />
      <SmoothScroll>
        <Nav />
        <main className="bg-background text-foreground">
          <Hero />
          <Materials />
          <Engineering />
          <Configurator />
          <Storage />
          <Difference />
          <Projects />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}

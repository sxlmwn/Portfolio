import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Education } from "@/components/portfolio/Education";
import { Skills } from "@/components/portfolio/Skills";
import { Roadmap } from "@/components/portfolio/Roadmap";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";
import { AmbientBlobs } from "@/components/portfolio/AmbientBlobs";

const Index = () => {
  return (
    <main className="relative min-h-screen">
      <AmbientBlobs />
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Roadmap />
      <Projects />
      <Contact />
    </main>
  );
};

export default Index;

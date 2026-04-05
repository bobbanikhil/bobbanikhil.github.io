import { useState, useEffect } from "react";

import ParticleField from "./components/ParticleField";
import GlowCursor from "./components/GlowCursor";
import Navigation from "./components/Navigation";
import CommandPalette from "./components/CommandPalette";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import Playground from "./components/sections/Playground";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

export default function App() {
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative min-h-screen bg-bg selection:bg-accent-soft">
      {/* Noise texture */}
      <svg className="noise" width="100%" height="100%">
        <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Interactive systems */}
      <ParticleField />
      <GlowCursor />

      {/* Layout */}
      <Navigation onCommandPalette={() => setCommandOpen(true)} />
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />

      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Playground />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

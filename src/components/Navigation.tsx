import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { DATA } from "../constants";

export default function Navigation({ onCommandPalette }: { onCommandPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["contact", "playground", "skills", "experience", "work"];
      let found = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 300) {
          found = id;
          break;
        }
      }
      setActive(found);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-bg/70 backdrop-blur-2xl border-b border-border" : ""}`}
    >
      <div className="container-main flex items-center justify-between h-14">
        <a href="#" className="font-display text-base font-semibold text-foreground interactive flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center animate-glow-pulse">
            <span className="text-white text-xs font-bold">NB</span>
          </div>
        </a>

        <div className="flex items-center gap-0.5">
          {DATA.nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`hidden md:block px-3 py-1.5 text-sm rounded-lg transition-all interactive ${
                active === item.href.slice(1)
                  ? "text-accent bg-accent-soft"
                  : "text-text-muted hover:text-foreground hover:bg-surface-2"
              }`}
            >
              {item.label}
            </a>
          ))}

          <button
            onClick={onCommandPalette}
            className="ml-2 flex items-center gap-2 px-3 py-1.5 text-xs text-text-muted bg-surface border border-border rounded-lg hover:border-accent/50 hover:text-accent transition-all interactive group"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] bg-surface-2 rounded border border-border font-mono group-hover:border-accent/30">⌘K</kbd>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

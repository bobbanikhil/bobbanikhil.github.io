import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DATA } from "../constants";
import { Search, Grid2x2, Briefcase, Zap, Mail, Github, Linkedin, Download } from "lucide-react";

const ICONS: Record<string, any> = { grid: Grid2x2, briefcase: Briefcase, zap: Zap, mail: Mail, github: Github, linkedin: Linkedin, download: Download };

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const filtered = DATA.commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cmd: typeof DATA.commands[0]) => {
    onClose();
    if (cmd.external) {
      window.open(cmd.section, "_blank");
    } else {
      document.querySelector(cmd.section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] command-backdrop"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-lg"
          >
            <div className="bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 border-b border-border">
                <Search className="w-4 h-4 text-text-muted flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 h-12 bg-transparent text-sm text-foreground placeholder:text-text-subtle outline-none"
                />
                <kbd className="px-2 py-0.5 text-[10px] text-text-subtle bg-surface-2 rounded border border-border font-mono">esc</kbd>
              </div>

              <div className="max-h-72 overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <div className="px-3 py-8 text-center text-sm text-text-subtle">No results found</div>
                )}
                {filtered.map((cmd, i) => {
                  const Icon = ICONS[cmd.icon] || Grid2x2;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(cmd)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-text-muted hover:text-foreground hover:bg-surface-2 rounded-xl transition-colors interactive group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-surface-2 group-hover:bg-accent-soft flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="flex-1 text-left">{cmd.label}</span>
                      {cmd.external && (
                        <span className="text-[10px] text-text-subtle font-mono">↗</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

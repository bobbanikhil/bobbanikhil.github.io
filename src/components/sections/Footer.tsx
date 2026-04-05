import { Github, Linkedin } from "lucide-react";
import { DATA } from "../../constants";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-main flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">N</span>
          </div>
          <span className="text-sm text-text-muted">© {new Date().getFullYear()} Nikhil Bobba</span>
          <span className="text-text-subtle">·</span>
          <span className="text-xs text-text-subtle font-mono">v2.0</span>
        </div>
        <div className="flex items-center gap-4">
          <a href={DATA.social.github} target="_blank" rel="noreferrer" className="text-text-subtle hover:text-accent transition-colors interactive"><Github className="w-4 h-4" /></a>
          <a href={DATA.social.linkedin} target="_blank" rel="noreferrer" className="text-text-subtle hover:text-accent transition-colors interactive"><Linkedin className="w-4 h-4" /></a>
        </div>
      </div>
    </footer>
  );
}

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Send } from "lucide-react";
import MagneticButton from "../MagneticButton";
import { DATA } from "../../constants";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="section">
      <div className="container-main">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} className="text-center mb-12">
            <p className="hud-label mb-3">// EXIT_PORTAL</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Let's Connect</h2>
            <p className="text-text-muted text-lg">Got a project in mind? Let's build something together.</p>
          </motion.div>

          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
            className="glass-card p-8 relative overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-px transition-all duration-500 ${focused ? 'bg-accent shadow-[0_0_10px_rgba(99,102,241,0.3)]' : 'bg-border'}`} />

            <div className="space-y-6">
              <div>
                <label className="hud-label block mb-2">NAME</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} required
                  className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-subtle outline-none focus:border-accent focus:shadow-[0_0_0_2px_rgba(99,102,241,0.1)] transition-all interactive"
                  placeholder="Your name" />
              </div>
              <div>
                <label className="hud-label block mb-2">EMAIL</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} required
                  className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-subtle outline-none focus:border-accent focus:shadow-[0_0_0_2px_rgba(99,102,241,0.1)] transition-all interactive"
                  placeholder="you@email.com" />
              </div>
              <div>
                <label className="hud-label block mb-2">MESSAGE</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} required rows={4}
                  className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-subtle outline-none focus:border-accent focus:shadow-[0_0_0_2px_rgba(99,102,241,0.1)] transition-all resize-none interactive"
                  placeholder="Tell me about your project..." />
              </div>
              <MagneticButton type="submit" disabled={status !== "idle"}
                className={`w-full py-3.5 text-sm font-medium rounded-xl flex items-center justify-center gap-2 transition-all ${status === "sent" ? "bg-green text-white" : "bg-accent text-white glow-accent hover:bg-accent/90"}`}>
                {status === "idle" && <><Send className="w-4 h-4" /> Send Message</>}
                {status === "sending" && "Sending..."}
                {status === "sent" && "✓ Message Sent!"}
              </MagneticButton>
            </div>
          </motion.form>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }} className="text-center mt-8">
            <a href={`mailto:${DATA.email}`} className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors interactive">
              <Mail className="w-4 h-4" /> {DATA.email}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

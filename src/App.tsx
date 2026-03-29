/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, useMotionValue } from 'motion/react';
import { 
  Rocket, 
  Layers, 
  Terminal, 
  Brain, 
  Cpu, 
  FlaskConical, 
  Code, 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Mail,
  Globe,
  Settings,
  ChevronRight,
  Zap
} from 'lucide-react';
import { PORTFOLIO_DATA, Project, Experience, Testimonial, Certification } from './constants';

import { NeuralCanvas } from './components/NeuralCanvas';

const ProjectModal = ({ project, onClose }: { project: Project | null, onClose: () => void }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="glass-panel max-w-2xl w-full rounded-[3rem] overflow-hidden shadow-2xl border-primary/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center text-on-surface hover:bg-primary hover:text-background transition-all"
          >
            <Settings size={20} className="rotate-45" />
          </button>
        </div>
        <div className="p-10 space-y-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span key={`${tag}-${i}`} className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-mono rounded-full border border-primary/20 uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-5xl font-black uppercase tracking-tighter glitch-text" data-text={project.title}>{project.title}</h3>
          <p className="text-on-surface-variant text-lg leading-relaxed font-light">
            {project.detailedDescription}
          </p>
          <div className="pt-6">
            <MagneticButton 
              onClick={(e) => handleExplosion(e, project.link)}
              className="bg-primary text-background px-10 py-4 rounded-2xl font-headline font-black uppercase tracking-widest text-xs flex items-center gap-3"
            >
              Launch Project <ArrowUpRight size={18} />
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 20, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 200 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<{ x: number, y: number, id: string }[]>([]);
  const trailIdCounter = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const newId = `${Date.now()}-${trailIdCounter.current++}`;
      setTrail(prev => [{ x: e.clientX, y: e.clientY, id: newId }, ...prev].slice(0, 10));

      const target = e.target as HTMLElement;
      const shouldHover = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') !== null || 
        target.closest('a') !== null;
      
      setIsHovering(prev => prev !== shouldHover ? shouldHover : prev);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full border-2 border-primary pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{ 
          width: isHovering ? 64 : 32, 
          height: isHovering ? 64 : 32,
          backgroundColor: isHovering ? 'rgba(143, 245, 255, 0.2)' : 'transparent'
        }}
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      >
        {!isHovering && <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />}
      </motion.div>
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9998] opacity-20"
          initial={{ opacity: 0.2, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          style={{ x: point.x, y: point.y, translateX: '-50%', translateY: '-50%' }}
        />
      ))}
    </>
  );
};

const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x * 0.2, y: position.y * 0.2 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

const SectionHeading = ({ title, subtitle, align = 'left' }: { title: string, subtitle?: string, align?: 'left' | 'right' | 'center' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <div ref={ref} className={`flex flex-col ${align === 'right' ? 'items-end text-right' : align === 'center' ? 'items-center text-center' : 'items-start'} gap-4`}>
      <motion.span 
        initial={{ opacity: 0, x: align === 'right' ? 20 : -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        className="font-mono text-[10px] text-primary uppercase tracking-[0.4em] font-bold"
      >
        {subtitle || '01 // PROTOCOL'}
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="font-headline font-black text-5xl md:text-8xl uppercase tracking-tighter leading-none glitch-text"
        data-text={title}
      >
        {title}
      </motion.h2>
    </div>
  );
};

import confetti from 'canvas-confetti';

const handleExplosion = (e: React.MouseEvent, targetUrl?: string) => {
  e.preventDefault();
  
  // Confetti explosion
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;

  confetti({
    particleCount: 200,
    spread: 100,
    origin: { x, y },
    colors: ['#8ff5ff', '#d575ff', '#a7ffb3', '#ffffff'],
    ticks: 200,
    gravity: 1.2,
    scalar: 1.2,
    drift: 0,
    disableForReducedMotion: true
  });

  // Screen shake
  document.body.style.transition = 'transform 0.05s ease-in-out';
  let shakes = 0;
  const interval = setInterval(() => {
    const intensity = 15;
    document.body.style.transform = `translate(${(Math.random() - 0.5) * intensity}px, ${(Math.random() - 0.5) * intensity}px) rotate(${(Math.random() - 0.5) * 3}deg)`;
    shakes++;
    if (shakes > 15) {
      clearInterval(interval);
      document.body.style.transform = 'none';
      if (targetUrl) {
        setTimeout(() => {
          window.open(targetUrl, '_blank');
        }, 400);
      }
    }
  }, 20);
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [projectFilter, setProjectFilter] = useState<'All' | 'AI' | 'Automation' | 'Data' | 'Hackathon'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const [formData, setFormData] = useState({ identity: '', encryptionKey: '', payload: '' });
  const [formErrors, setFormErrors] = useState({ identity: '', encryptionKey: '' });

  const handleCloseModal = useCallback(() => setSelectedProject(null), []);

  const validateForm = (name: string, value: string) => {
    let errors = { ...formErrors };
    if (name === 'identity') {
      errors.identity = value.length < 3 ? 'IDENTITY_TOO_SHORT' : '';
    }
    if (name === 'encryptionKey') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errors.encryptionKey = !emailRegex.test(value) ? 'INVALID_ENCRYPTION_KEY' : '';
    }
    setFormErrors(errors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateForm(name, value);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Mouse Glow Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const pathOffset = useTransform(scrollYProgress, [0, 1], [0, -500]);

  return (
    <div className="relative min-h-screen bg-background selection:bg-primary/30 selection:text-background" ref={containerRef}>
      <CustomCursor />
      <NeuralCanvas />
      {/* Interactive Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Dynamic Glow */}
        <motion.div 
          className="absolute w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"
          style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        />
        
        {/* Floating Blobs */}
        <motion.div 
          animate={{ 
            y: [0, -40, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[10%] w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-tertiary/5 rounded-full blur-[150px]" 
        />

        {/* Neural Path SVG */}
        <svg className="absolute inset-0 w-full h-[200%] opacity-10" preserveAspectRatio="none">
          <motion.path
            d="M 50% 0 Q 60% 25% 40% 50% T 50% 100% T 40% 150% T 50% 200%"
            fill="none"
            stroke="url(#grad)"
            strokeWidth="1.5"
            style={{ translateY: pathOffset }}
            className="neural-path-wave"
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8ff5ff" />
              <stop offset="50%" stopColor="#d575ff" />
              <stop offset="100%" stopColor="#a7ffb3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[110] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] bg-background/40 backdrop-blur-2xl flex justify-between items-center px-8 py-6 border-b border-outline-variant/10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-all duration-500">
            <Terminal size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter font-headline uppercase">
            {PORTFOLIO_DATA.name}<span className="text-primary">{PORTFOLIO_DATA.suffix}</span>
          </span>
        </motion.div>
        
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex gap-10 text-[10px] font-mono tracking-[0.3em] uppercase">
            {['home', 'experience', 'projects', 'skills', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`relative py-2 transition-colors hover:text-primary ${activeSection === item ? 'text-primary' : 'text-on-surface-variant'}`}
                onClick={() => setActiveSection(item)}
              >
                {item}
                {activeSection === item && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                )}
              </a>
            ))}
          </div>
          <div className="flex gap-4">
            <motion.a whileHover={{ scale: 1.1 }} href="#" className="p-2 text-on-surface-variant hover:text-primary"><Github size={18} /></motion.a>
            <motion.a whileHover={{ scale: 1.1 }} href="#" className="p-2 text-on-surface-variant hover:text-secondary"><Linkedin size={18} /></motion.a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 px-6 max-w-7xl mx-auto space-y-32 pb-40">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="space-y-12">
            <div className="relative inline-block">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "circOut" }}
                className="font-headline font-black text-8xl md:text-[14rem] tracking-tighter uppercase leading-[0.85] glitch-text"
                data-text={PORTFOLIO_DATA.name}
              >
                {PORTFOLIO_DATA.name}
                <br />
                <span className="text-primary drop-shadow-[0_0_30px_rgba(143,245,255,0.3)] swiggle-text">{PORTFOLIO_DATA.suffix}</span>
              </motion.div>
              
              {/* Floating Decorative Elements */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 -right-10 text-secondary opacity-50"
              >
                <Zap size={48} />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-8 max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-center gap-6 font-mono text-tertiary tracking-[0.5em] text-[10px] uppercase font-bold">
                <span className="px-3 py-1 border border-tertiary/20 rounded">{PORTFOLIO_DATA.role}</span>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                <span className="px-3 py-1 border border-tertiary/20 rounded">{PORTFOLIO_DATA.location}</span>
              </div>
              <p className="text-on-surface-variant text-xl md:text-2xl leading-relaxed font-light tracking-tight">
                {PORTFOLIO_DATA.tagline}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-8"
            >
              <MagneticButton 
                onClick={(e) => handleExplosion(e, '#experience')}
                className="group bg-primary text-background px-12 py-6 rounded-2xl font-headline font-black uppercase tracking-[0.2em] text-sm flex items-center gap-4 shadow-[0_20px_50px_rgba(143,245,255,0.3)] hover:shadow-primary/40 transition-shadow"
              >
                Initialize System
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <Rocket size={20} />
                </motion.div>
              </MagneticButton>
            </motion.div>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-12 flex flex-col items-center gap-4 text-on-surface-variant/40"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Scroll to Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-primary/40 to-transparent" />
          </motion.div>
        </section>

        {/* Strategic Prowess Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {PORTFOLIO_DATA.strategicProwess.map((prowess, index) => (
            <motion.div
              key={`prowess-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group p-8 rounded-3xl bg-surface/30 backdrop-blur-xl border border-on-surface/10 hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-background transition-all duration-500">
                <prowess.icon size={24} />
              </div>
              <h3 className="text-2xl font-headline font-black tracking-tighter uppercase mb-4">{prowess.title}</h3>
              <p className="text-on-surface-variant font-mono text-sm leading-relaxed">{prowess.description}</p>
            </motion.div>
          ))}
        </section>

        {/* Experience Section */}
        <section id="experience" className="space-y-32">
          <SectionHeading title="Timeline" subtitle="01 // CAREER_LOG" />

          <div className="relative space-y-48">
            {PORTFOLIO_DATA.experiences.map((exp, index) => (
              <ExperienceCard key={`exp-${index}`} exp={exp} index={index} />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-32">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <SectionHeading title="Innovation Labs" subtitle="02 // COMPETITIVE_ENGINEERING" />
            
            <div className="flex flex-wrap gap-4 font-mono text-[10px] tracking-widest uppercase">
              {['All', 'AI', 'Automation', 'Data', 'Hackathon'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat as any)}
                  className={`px-6 py-3 rounded-xl border transition-all ${projectFilter === cat ? 'bg-primary text-background border-primary shadow-[0_0_20px_rgba(143,245,255,0.3)]' : 'border-outline-variant/20 text-on-surface-variant hover:border-primary/40'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-24"
          >
            <AnimatePresence mode="popLayout">
              {PORTFOLIO_DATA.projects
                .filter(p => projectFilter === 'All' || p.category === projectFilter)
                .map((project, index) => (
                  <ProjectCard 
                    key={`project-${project.title}-${index}`} 
                    project={project} 
                    index={index} 
                    onOpenDetails={() => setSelectedProject(project)}
                  />
                ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="space-y-32">
          <SectionHeading title="Neural Core" subtitle="03 // CAPABILITIES" align="center" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8">
            {PORTFOLIO_DATA.skills.map((skill, index) => (
              <motion.div
                key={`skill-${index}`}
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ 
                  y: -10, 
                  borderColor: 'var(--color-primary)',
                  boxShadow: '0 20px 40px rgba(143,245,255,0.1)'
                }}
                transition={{ 
                  type: "spring",
                  bounce: 0.6,
                  delay: index * 0.05,
                  duration: 1
                }}
                className="aspect-square flex flex-col items-center justify-center gap-3 p-4 md:gap-6 md:p-8 rounded-2xl md:rounded-[2.5rem] glass-panel border-outline-variant/20 group cursor-default"
              >
                <motion.div 
                  whileHover={{ 
                    rotate: 360, 
                    scale: 1.1,
                    y: [0, -5, 0],
                  }}
                  transition={{ 
                    rotate: { type: "spring", stiffness: 200 },
                    y: { repeat: Infinity, duration: 0.6, ease: "easeInOut" }
                  }}
                  className={`w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-center ${skill.color} group-hover:bg-primary group-hover:text-background transition-all duration-500`}
                >
                  <skill.icon className="w-6 h-6 md:w-10 md:h-10" />
                </motion.div>
                <span className="font-mono text-[8px] md:text-[11px] text-center tracking-[0.2em] uppercase font-black opacity-60 group-hover:opacity-100 transition-opacity">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative glass-panel rounded-[2.5rem] overflow-hidden border-error-dim/20 shadow-2xl"
          >
            <div className="bg-error-dim/10 px-10 py-6 flex justify-between items-center border-b border-error-dim/20">
              <div className="flex gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-error-dim shadow-[0_0_10px_rgba(215,56,59,0.5)]" />
                <div className="w-3.5 h-3.5 rounded-full bg-tertiary/30" />
                <div className="w-3.5 h-3.5 rounded-full bg-primary/30" />
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] text-error-dim tracking-[0.4em] font-black uppercase">
                <Settings size={14} className="animate-spin-slow" />
                System_Overload.log
              </div>
            </div>
            
            <div className="p-12 space-y-12">
              <div className="font-mono text-xs space-y-3 opacity-60">
                <p className="text-tertiary">&gt; INITIALIZING_CONTACT_SEQ...</p>
                <p className="text-on-surface-variant">&gt; ENCRYPTING_CHANNEL_256BIT...</p>
                <p className="text-primary">&gt; ACCESS_GRANTED (SECURE_TUNNEL_ESTABLISHED)</p>
              </div>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] font-bold">Identity</label>
                      {formErrors.identity && <span className="text-[9px] font-mono text-error-dim animate-pulse">{formErrors.identity}</span>}
                    </div>
                    <input 
                      type="text" 
                      name="identity"
                      value={formData.identity}
                      onChange={handleInputChange}
                      placeholder="USER_NAME"
                      className={`w-full bg-surface/50 border rounded-2xl px-6 py-5 text-on-surface focus:ring-1 outline-none transition-all font-mono text-sm ${formErrors.identity ? 'border-error-dim focus:border-error-dim focus:ring-error-dim/20' : 'border-outline-variant/20 focus:border-primary focus:ring-primary/20'}`}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-mono text-secondary uppercase tracking-[0.3em] font-bold">Encryption_Key</label>
                      {formErrors.encryptionKey && <span className="text-[9px] font-mono text-error-dim animate-pulse">{formErrors.encryptionKey}</span>}
                    </div>
                    <input 
                      type="email" 
                      name="encryptionKey"
                      value={formData.encryptionKey}
                      onChange={handleInputChange}
                      placeholder="EMAIL_ADDR"
                      className={`w-full bg-surface/50 border rounded-2xl px-6 py-5 text-on-surface focus:ring-1 outline-none transition-all font-mono text-sm ${formErrors.encryptionKey ? 'border-error-dim focus:border-error-dim focus:ring-error-dim/20' : 'border-outline-variant/20 focus:border-secondary focus:ring-secondary/20'}`}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-tertiary uppercase tracking-[0.3em] font-bold">Message_Payload</label>
                  <textarea 
                    rows={6}
                    name="payload"
                    value={formData.payload}
                    onChange={handleInputChange}
                    placeholder="TRANSMISSION_DATA..."
                    className="w-full bg-surface/50 border border-outline-variant/20 rounded-2xl px-6 py-5 text-on-surface focus:border-tertiary focus:ring-1 focus:ring-tertiary/20 outline-none transition-all font-mono text-sm resize-none"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!!(formErrors.identity || formErrors.encryptionKey || !formData.identity || !formData.encryptionKey)}
                  onClick={(e) => handleExplosion(e)}
                  className="w-full bg-error-dim text-white py-6 rounded-2xl font-headline font-black uppercase tracking-[0.4em] text-sm shadow-xl shadow-error-dim/20 hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Execute Transmission
                </motion.button>
              </form>

              <div className="pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono text-on-surface-variant/40 tracking-[0.3em] uppercase">
                <p>© 2026 {PORTFOLIO_DATA.name}{PORTFOLIO_DATA.suffix} // NEURAL_LINK_STABLE</p>
                <div className="flex gap-10">
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Github size={14} /> Github</a>
                  <a href="#" className="hover:text-secondary transition-colors flex items-center gap-2"><Linkedin size={14} /> Linkedin</a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            key="project-modal"
            project={selectedProject} 
            onClose={handleCloseModal} 
          />
        )}
        <motion.nav 
          key="mobile-nav"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-sm:max-w-[320px] h-20 bg-surface/60 backdrop-blur-3xl rounded-[2rem] border border-outline-variant/20 flex items-center justify-around px-4 z-[100] md:hidden shadow-2xl"
        >
          {[
            { id: 'home', icon: Rocket, color: 'text-primary' },
            { id: 'experience', icon: Layers, color: 'text-secondary' },
            { id: 'projects', icon: Terminal, color: 'text-tertiary' },
            { id: 'skills', icon: Brain, color: 'text-on-surface' }
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`p-4 rounded-2xl transition-all ${activeSection === item.id ? `${item.color} bg-on-surface/5 scale-110` : 'text-on-surface-variant'}`}
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon size={22} />
            </a>
          ))}
        </motion.nav>
      </AnimatePresence>
    </div>
  );
}

const ExperienceCard: React.FC<{ exp: any; index: number }> = ({ exp, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? -100 : 100, 0, index % 2 === 0 ? -50 : 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? -5 : 5, 0, index % 2 === 0 ? 5 : -5]);

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity, rotate }}
      className={`relative flex flex-col md:flex-row items-center gap-16 swiggle-element ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-surface border border-outline-variant/30 flex items-center justify-center z-10 shadow-2xl">
        <exp.icon className="text-primary" size={32} />
      </div>
      
      <div className="w-full md:w-1/2 glass-panel p-10 rounded-[2rem] space-y-6 group hover:border-primary/40 transition-all duration-500">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-black">{exp.period}</span>
            <div className="h-[1px] w-8 bg-primary/30" />
            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">{exp.type}</span>
          </div>
          <h3 className="text-3xl font-black uppercase tracking-tight glitch-text" data-text={exp.role}>{exp.role}</h3>
          <p className="text-secondary font-mono text-sm tracking-widest">{exp.company}</p>
        </div>
        <p className="text-on-surface-variant leading-relaxed text-base font-light">
          {exp.description}
        </p>
        <div className="flex gap-4 pt-4">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="w-2 h-2 rounded-full bg-secondary" />
          <div className="w-2 h-2 rounded-full bg-tertiary" />
        </div>
      </div>
      <div className="hidden md:block w-1/2" />
    </motion.div>
  );
}

const ProjectCard: React.FC<{ project: any; index: number; onOpenDetails: () => void }> = ({ project, index, onOpenDetails }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const skewY = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);

  return (
    <motion.div
      ref={ref}
      layout
      style={{ y, scale, skewY }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-surface-container shadow-2xl jiggle-element"
    >
      <motion.img 
        src={project.image} 
        alt={project.title}
        className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent p-12 flex flex-col justify-end gap-8">
        <div className="flex flex-wrap gap-3">
          {project.category === 'Hackathon' && (
            <span className="px-5 py-2 bg-secondary/20 text-secondary text-[9px] font-mono rounded-full border border-secondary/30 uppercase tracking-[0.2em] font-black animate-pulse">
              HACKATHON_WINNER //
            </span>
          )}
          {project.tags.map((tag: string, i: number) => (
            <span key={`${tag}-${i}`} className="px-5 py-2 bg-primary/10 text-primary text-[9px] font-mono rounded-full border border-primary/20 uppercase tracking-[0.2em] font-black">
              {tag}
            </span>
          ))}
        </div>
        <div className="space-y-4">
          <h3 className="text-5xl font-black uppercase tracking-tighter leading-none glitch-text" data-text={project.title}>{project.title}</h3>
          <p className="text-on-surface-variant text-base max-w-sm font-light leading-relaxed">{project.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 45 }}
            onClick={(e) => handleExplosion(e, project.link || '#')}
            className="w-16 h-16 rounded-2xl bg-primary text-background flex items-center justify-center shadow-xl shadow-primary/20 cursor-pointer"
          >
            <ArrowUpRight size={32} />
          </motion.div>
          <div className="flex flex-col gap-2">
            <button 
              onClick={onOpenDetails}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-primary transition-colors font-black text-left"
            >
              View More //
            </button>
          </div>
        </div>
      </div>
      
      {/* Overlay Glow */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}

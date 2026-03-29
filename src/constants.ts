import { Rocket, Layers, Terminal, Brain, Cpu, FlaskConical, Code, ArrowUpRight, Mail, Github, Linkedin, Settings } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  detailedDescription: string;
  tags: string[];
  image: string;
  link?: string;
  category: 'AI' | 'Automation' | 'Data' | 'Hackathon';
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  type: 'Current' | 'Past';
  icon: any;
  color: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export const PORTFOLIO_DATA = {
  name: "NIKHIL",
  suffix: ".AI",
  role: "AI_FATHOM // PRAGMATIC_INNOVATOR",
  location: "MILWAUKEE, WI",
  tagline: "I build dependable software that thinks for itself. Architecting resilient pipelines, shipping reliable code, and translating technical complexity into business clarity.",
  about: "AI fathom and a recent master’s graduate from UWM. As an electrical electronics engineer and pragmatic innovator, I code everything from design to delivery of AI-driven automation and high-impact project deliverables that transform uncertainty into repeatable outcomes.",
  strategicProwess: [
    {
      title: "Workflow Orchestration",
      description: "Deep expertise in n8n. I don't just build AI; I automate and orchestrate complex workflows to transform manual tasks into autonomous systems.",
      icon: Settings
    },
    {
      title: "Data Architecture",
      description: "Focused on Snowflake and robust, scalable data pipelines. I ensure the backbone of AI deployment is built on reliable, high-performance data infrastructure.",
      icon: Layers
    },
    {
      title: "Product & Project Leadership",
      description: "Bridging the gap between heavy engineering and business delivery. Expert in Jira and end-to-end SDLC processes to ensure reliable shipping.",
      icon: Terminal
    }
  ],
  skills: [
    { name: "n8n_ORCHESTRATION", color: "text-primary", icon: Rocket },
    { name: "SNOWFLAKE_DATA", color: "text-secondary", icon: Layers },
    { name: "PYTHON_ML", color: "text-tertiary", icon: Brain },
    { name: "TENSORFLOW", color: "text-on-surface", icon: Cpu },
    { name: "JIRA_SDLC", color: "text-primary", icon: Terminal },
    { name: "SQL_WAREHOUSING", color: "text-secondary", icon: Layers },
    { name: "REST_APIS", color: "text-tertiary", icon: Code },
    { name: "ETL_PIPELINES", color: "text-on-surface", icon: ArrowUpRight },
  ],
  experiences: [
    {
      role: "AI Engineer",
      company: "I2E Consulting",
      period: "June 2025 – Present",
      description: "Architected dynamic content generators using n8n for robust workflow orchestration. Redefining daily operations by natively embedding AI into routine problem-solving.",
      type: "Current",
      icon: Brain,
      color: "bg-primary"
    },
    {
      role: "QA Tester",
      company: "Pfizer",
      period: "Oct 2025 – Present",
      description: "Collaborated with cross-functional teams to deliver high-quality results, increasing team performance by 30%. Managed data-driven projects with detailed documentation.",
      type: "Current",
      icon: FlaskConical,
      color: "bg-secondary"
    },
    {
      role: "Event Manager",
      company: "Peck School of the Arts, UWM",
      period: "May 2024 – May 2025",
      description: "Coordinated 150+ university events, ensuring smooth logistics and meaningful student experiences. Optimized ticketing system efficiency to 90%.",
      type: "Past",
      icon: Layers,
      color: "bg-tertiary"
    },
    {
      role: "Software / Data Engineer",
      company: "Capgemini Pvt Ltd",
      period: "May 2022 – Jul 2023",
      description: "Delivered high-quality full stack solutions, increasing growth by 30%. Assisted in business decision-making by generating visual reports from raw data.",
      type: "Past",
      icon: Code,
      color: "bg-primary"
    }
  ] as Experience[],
  projects: [
    {
      title: "U-NO-CODE",
      description: "Azure AI Hackathon Winner. Autonomous multimodal AI pipeline for hackathon life-cycle management.",
      detailedDescription: "Led the winning team in developing an autonomous multimodal AI pipeline that automates the entire life-cycle of hackathons. Implemented real-time data processing and machine learning models for automated decision-making, increasing efficiency by over 95%.",
      tags: ["Azure AI", "Python", "Automation", "Winner"],
      image: "https://picsum.photos/seed/unocode/800/1000",
      link: "https://github.com/nikhil/u-no-code",
      category: "Hackathon"
    },
    {
      title: "YECS",
      description: "AI-Powered Credit Scoring Platform for young entrepreneurs.",
      detailedDescription: "Engineered a full-stack AI-powered credit scoring system using React, Flask, and Gemini Pro API. Features a conversational AI assistant 'YECS Copilot' and alternative data models that increase approval rates by 41% while reducing default risk by 38%.",
      tags: ["React", "Flask", "Gemini Pro", "FinTech"],
      image: "https://picsum.photos/seed/yecs/800/1000",
      link: "https://github.com/nikhil/yecs",
      category: "AI"
    },
    {
      title: "Venvt AI",
      description: "Low-code AI testing agentic framework and analytics dashboard.",
      detailedDescription: "Developed a comprehensive AI testing framework using Python and TensorFlow. Features self-healing capabilities that stabilize locators and reduce maintenance, where 1 test agent is equivalent to 10 test engineers.",
      tags: ["Python", "TensorFlow", "QA", "Agentic AI"],
      image: "https://picsum.photos/seed/venvt/800/1000",
      link: "https://github.com/nikhil/venvt-ai",
      category: "Automation"
    },
    {
      title: "Spectrum AI Pro",
      description: "Google Chrome Built-in AI Challenge project for advanced accessibility.",
      detailedDescription: "A proactive Chrome extension that uses built-in AI models to enhance web accessibility and content summarization in real-time, optimized for low-latency performance.",
      tags: ["Chrome AI", "JavaScript", "Accessibility"],
      image: "https://picsum.photos/seed/spectrum/800/1000",
      link: "https://github.com/nikhil/spectrum-ai-pro",
      category: "AI"
    }
  ] as Project[],
  testimonials: [
    {
      name: "Sarah Jenkins",
      role: "Senior Project Manager, I2E",
      content: "Nikhil's ability to orchestrate complex workflows with n8n is unparalleled. He doesn't just build AI; he builds systems that think.",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      name: "Dr. Marcus Chen",
      role: "Director, UWM Tech Hub",
      content: "A pragmatic innovator who bridges the gap between heavy engineering and business delivery. His work on YECS was truly transformative.",
      avatar: "https://i.pravatar.cc/150?u=marcus"
    }
  ] as Testimonial[],
  certifications: [
    {
      title: "Foundations of AI and Data",
      issuer: "HERA/MKE Tech Hub Coalition",
      date: "Sept 2025"
    }
  ] as Certification[]
};

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import { toast } from "sonner";

import projectIot from "@/assets/project-iot-premium.png";
import projectTranslator from "@/assets/project-ai-premium.png";
import projectInventory from "@/assets/project-inventory-premium.png";
import projectCodeLogic from "@/assets/project-logic-premium.png";
import projectSaffron from "@/assets/project-saffron.jpg";
import projectCo2 from "@/assets/project-co2.jpg";
import projectLibrary from "@/assets/project-inventory-premium.png";

const ease = [0.2, 0, 0, 1];

const projects = [
  {
    title: "IoT Device Management",
    desc: "Created and optimized workflows for managing IoT devices like smart streetlights, enhancing real-time telemetry integration.",
    tech: ["React.js", "REST API", "IoT", "Telemetry"],
    category: "IoT",
    period: "Apr 2023",
    image: projectIot,
    github: "https://github.com/Balajijebbu/Jeyabalaji_Portfolio"
  },
  {
    title: "Multi-Language Translator",
    desc: "AI-powered translator using Ollama and Large Language Models with RESTful API integration for real-time multilingual text translation.",
    tech: ["GenAI", "Ollama", "REST API", "LLMs"],
    category: "AI",
    image: projectTranslator,
    github: "https://github.com/Balajijebbu/Multi-language-translator"
  },
  {
    title: "Inventory Management System",
    desc: "Developed a comprehensive inventory management system for dairy products to track stock levels, production flow, and product availability.",
    tech: ["React.js", "Redux", "REST API"],
    category: "React",
    image: projectInventory,
    github: "https://github.com/Balajijebbu/Inventory-Management-Ecommerce-Application-for-Ghee-Factory"
  },
  {
    title: "Code to Logic Generator",
    desc: "Hackathon project demonstrating problem-solving skills and the ability to work under pressure within a limited timeframe.",
    tech: ["React", "GenAI", "Hackathon"],
    category: "AI",
    image: projectCodeLogic,
    github: "https://github.com/Balajijebbu/Personalized-Gift-Idea-Generator"
  },
  {
    title: "Library Manager",
    desc: "A full-featured library management system to track books, members, and transactions with a clean UI.",
    tech: ["React", "Java", "Spring Boot"],
    category: "React",
    image: projectLibrary,
    github: "https://github.com/Balajijebbu/Library-Manager"
  },
  {
    title: "Saffron Cultivation (Aeroponics)",
    desc: "Developed an Aeroponics-based system for saffron cultivation, improving yield efficiency through controlled nutrient management. Won Smart India Hackathon 2024.",
    tech: ["IoT", "Aeroponics", "Research"],
    category: "IoT",
    image: projectSaffron,
    github: "https://github.com/Balajijebbu/projectnew"
  },
  {
    title: "CO₂ Emissions Prediction",
    desc: "Research on CO₂ vehicle emission prediction and optimization using Deep Q-Learning & PSO Model.",
    tech: ["Deep Learning", "Python", "Research"],
    category: "AI",
    image: projectCo2,
    github: "https://github.com/Balajijebbu/AJP_Mini-project"
  },
];

const filters = ["All", "React", "AI", "IoT"];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
      style={{
        perspective: 1200,
        transform: isHovered
          ? `perspective(1200px) rotateY(${mousePos.x * 25}deg) rotateX(${-mousePos.y * 25}deg) scale3d(1.05, 1.05, 1.05)`
          : "perspective(1200px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease-out",
        transformStyle: "preserve-3d",
      }}
      className="glass-card-hover flex flex-col justify-between group cursor-pointer overflow-hidden relative shadow-2xl rounded-2xl"
    >
      {/* Spotlight follow cursor */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, hsl(180 100% 50% / 0.2), transparent 60%)`
            : "none",
        }}
      />

      {/* Project image with depth */}
      <div className="relative overflow-hidden h-48" style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.6, ease }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Floating Category Badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-[10px] font-bold text-primary uppercase tracking-widest z-30"
          style={{ transform: "translateZ(80px)" }}
        >
          {project.category}
        </div>
      </div>

      <div className="p-6 relative z-10" style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}>
        <div className="flex items-center justify-between mb-3" style={{ transform: "translateZ(90px)", transformStyle: "preserve-3d" }}>
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 drop-shadow-xl">{project.title}</h3>
          <div className="flex gap-3">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.4, rotate: 15, z: 120 }}
              className="cursor-pointer"
            >
              <Github size={18} strokeWidth={1.5} className="text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_15px_hsl(180_100%_50%/0.8)] transition-all" />
            </motion.a>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.4, rotate: -15, z: 120 }}
              className="cursor-pointer"
            >
              <ExternalLink size={18} strokeWidth={1.5} className="text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_15px_hsl(180_100%_50%/0.8)] transition-all" />
            </motion.a>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground/90 transition-colors" style={{ transform: "translateZ(60px)" }}>
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2" style={{ transformStyle: "preserve-3d", transform: "translateZ(70px)" }}>
          {project.tech.map((t, ti) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 + ti * 0.05 + 0.4, duration: 0.3 }}
              className="text-xs font-mono px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:shadow-[0_0_20px_hsl(180_100%_50%/0.4)] transition-all duration-300"
              style={{ transform: `translateZ(${ti * 5}px)` }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("All");

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  // Section-level 3D scroll parallax
  const sectionRotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [6, 0, 0, -6]);
  const smoothRotateX = useSpring(sectionRotateX, { damping: 40, stiffness: 120 });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const filtered = (filter === "All"
    ? projects
    : projects.filter((p) =>
        p.category === filter ||
        (filter === "React" && p.tech.some(t => t.toLowerCase().includes("react")))
      )).filter(p => !p.title.includes("Saffron"));

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden snap-start min-h-screen flex items-center" ref={sectionRef} onMouseMove={handleMouseMove} style={{ perspective: "1400px" }}>
      {/* Mouse glow trail */}
      <motion.div
        className="glow-trail"
        animate={{
          x: mousePos.x - 150,
          y: mousePos.y - 150,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      />

      <motion.div style={{ rotateX: smoothRotateX }} className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Sparkles size={16} className="text-primary animate-pulse-glow" />
            <p className="font-mono-label text-primary">Projects</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Things I've{" "}
            <span className="text-primary neon-text">Built</span>
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="flex flex-wrap gap-3">
              {filters.map((f) => (
                <motion.button
                  key={f}
                  onClick={() => setFilter(f)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`font-mono-label px-4 py-2 rounded-full transition-all duration-300 ${
                    filter === f
                      ? "bg-primary/20 text-primary border border-primary/40 shadow-[0_0_15px_hsl(180_100%_50%/0.15)]"
                      : "text-muted-foreground border border-muted hover:text-foreground hover:border-foreground/30"
                  }`}
                >
                  {f}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const randomCat = filters[Math.floor(Math.random() * (filters.length - 1)) + 1];
                setFilter(randomCat);
                toast.success(`Recommended ${randomCat} projects for you!`, {
                  icon: <Sparkles className="text-primary" size={16} />,
                });
              }}
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-all group"
            >
              <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-bold">Auto Recommend</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Featured Project Spotlight */}
        <div className="mb-20">
          <p className="font-mono-label text-accent mb-4 text-center uppercase tracking-[0.3em] font-bold">Featured Spotlight</p>
          {projects.filter(p => p.title.includes("Saffron")).map((project) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              whileHover={{ rotateX: 2, rotateY: -2 }}
              style={{ transformStyle: "preserve-3d", perspective: 1200 }}
              className="relative rounded-3xl overflow-hidden glass-card border border-accent/20 h-[500px] group shadow-[0_0_50px_hsl(270_100%_66%/0.1)]"
            >
              <div className="absolute inset-0 z-0">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-20 max-w-3xl" style={{ transform: "translateZ(40px)" }}>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 w-fit"
                >
                  <Sparkles size={14} className="text-accent" />
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Smart India Hackathon 2024 Winner</span>
                </motion.div>

                <h3 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight" style={{ transform: "translateZ(60px)" }}>
                  Saffron <span className="text-accent neon-text-accent">Cultivation</span>
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed" style={{ transform: "translateZ(30px)" }}>
                  {project.desc} This groundbreaking project revolutionized crop management using advanced IoT sensors and automated nutrient delivery.
                </p>

                <div className="flex flex-wrap gap-3 mb-10" style={{ transform: "translateZ(20px)" }}>
                  {project.tech.map(t => (
                    <span key={t} className="px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-xs font-mono">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4" style={{ transform: "translateZ(50px)" }}>
                  <a href={project.github} target="_blank" className="px-8 py-3 rounded-xl bg-accent text-accent-foreground font-bold hover:shadow-[0_0_30px_hsl(270_100%_66%/0.5)] transition-all flex items-center gap-2">
                    <Github size={18} /> View Repository
                  </a>
                </div>
              </div>

              <div className="absolute top-10 right-10 flex gap-4 opacity-30">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                  <Sparkles size={100} className="text-accent" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;

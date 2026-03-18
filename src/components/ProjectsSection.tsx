import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Sparkles } from "lucide-react";

import projectIot from "@/assets/project-iot.jpg";
import projectTranslator from "@/assets/project-translator.jpg";
import projectInventory from "@/assets/project-inventory.jpg";
import projectCodeLogic from "@/assets/project-code-logic.jpg";
import projectSaffron from "@/assets/project-saffron.jpg";
import projectCo2 from "@/assets/project-co2.jpg";

const ease = [0.2, 0, 0, 1];

const projects = [
  {
    title: "IoT Device Management",
    desc: "Created and optimized workflows for managing IoT devices like smart streetlights, enhancing real-time telemetry integration.",
    tech: ["React.js", "REST API", "IoT", "Telemetry"],
    category: "IoT",
    period: "Apr 2023",
    image: projectIot,
  },
  {
    title: "Multi-Language Translator",
    desc: "AI-powered translator using Ollama and Large Language Models with RESTful API integration for real-time multilingual text translation.",
    tech: ["GenAI", "Ollama", "REST API", "LLMs"],
    category: "AI",
    image: projectTranslator,
  },
  {
    title: "Inventory Management System",
    desc: "Developed a comprehensive inventory management system for dairy products to track stock levels, production flow, and product availability.",
    tech: ["React.js", "Redux", "REST API"],
    category: "React",
    image: projectInventory,
  },
  {
    title: "Code to Logic Generator",
    desc: "Hackathon project demonstrating problem-solving skills and the ability to work under pressure within a limited timeframe.",
    tech: ["JavaScript", "Algorithm Design"],
    category: "React",
    image: projectCodeLogic,
  },
  {
    title: "Saffron Cultivation (Aeroponics)",
    desc: "Developed an Aeroponics-based system for saffron cultivation, improving yield efficiency through controlled nutrient management. Won Smart India Hackathon 2024.",
    tech: ["IoT", "Aeroponics", "Research"],
    category: "IoT",
    image: projectSaffron,
  },
  {
    title: "CO₂ Emissions Prediction",
    desc: "Research on CO₂ vehicle emission prediction and optimization using Deep Q-Learning & PSO Model.",
    tech: ["Deep Learning", "Python", "Research"],
    category: "AI",
    image: projectCo2,
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
        perspective: 1000,
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePos.x * 15}deg) rotateX(${-mousePos.y * 15}deg) scale3d(1.03, 1.03, 1.03)`
          : "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)",
        transition: "transform 0.2s ease-out",
      }}
      className="glass-card-hover flex flex-col justify-between group cursor-pointer overflow-hidden relative"
    >
      {/* Spotlight follow cursor */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, hsl(180 100% 50% / 0.12), transparent 60%)`
            : "none",
        }}
      />

      {/* Project image */}
      <div className="relative overflow-hidden h-44">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        {/* Glow line on top of image */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, hsl(180 100% 50%), hsl(270 100% 66%), transparent)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
        />
      </div>

      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">{project.title}</h3>
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.3, rotate: 15 }} className="cursor-pointer">
              <Github size={16} strokeWidth={1.5} className="text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_8px_hsl(180_100%_50%/0.6)] transition-all" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.3, rotate: -15 }} className="cursor-pointer">
              <ExternalLink size={16} strokeWidth={1.5} className="text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_8px_hsl(180_100%_50%/0.6)] transition-all" />
            </motion.div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.desc}</p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t, ti) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 + ti * 0.05 + 0.4, duration: 0.3 }}
              className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:shadow-[0_0_10px_hsl(180_100%_50%/0.2)] transition-all duration-300"
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
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const parallaxRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Parallax floating orbs */}
      <motion.div
        style={{ y: parallaxY, rotate: parallaxRotate }}
        className="absolute -top-20 -right-32 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
        style={{ y: parallaxY, background: "radial-gradient(circle, hsl(180 100% 50% / 0.08), transparent 70%)" }}
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-40, 80]) }}
        className="absolute -bottom-20 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-40, 80]), background: "radial-gradient(circle, hsl(270 100% 66% / 0.08), transparent 70%)" }}
      />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Sparkles size={16} className="text-primary animate-pulse-glow" />
            <p className="font-mono-label text-primary">Projects</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Things I've{" "}
            <span className="text-primary neon-text">Built</span>
          </h2>

          <div className="flex gap-3 mb-12 flex-wrap">
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
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;

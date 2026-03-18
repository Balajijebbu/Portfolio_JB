import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

const ease = [0.2, 0, 0, 1];

const projects = [
  {
    title: "IoT Device Management",
    desc: "Created and optimized workflows for managing IoT devices like smart streetlights, enhancing real-time telemetry integration.",
    tech: ["React.js", "REST API", "IoT", "Telemetry"],
    category: "IoT",
    period: "Apr 2023",
  },
  {
    title: "Multi-Language Translator",
    desc: "AI-powered translator using Ollama and Large Language Models with RESTful API integration for real-time multilingual text translation.",
    tech: ["GenAI", "Ollama", "REST API", "LLMs"],
    category: "AI",
  },
  {
    title: "Inventory Management System",
    desc: "Developed a comprehensive inventory management system for dairy products to track stock levels, production flow, and product availability.",
    tech: ["React.js", "Redux", "REST API"],
    category: "React",
  },
  {
    title: "Code to Logic Generator",
    desc: "Hackathon project demonstrating problem-solving skills and the ability to work under pressure within a limited timeframe.",
    tech: ["JavaScript", "Algorithm Design"],
    category: "React",
  },
  {
    title: "Saffron Cultivation (Aeroponics)",
    desc: "Developed an Aeroponics-based system for saffron cultivation, improving yield efficiency through controlled nutrient management. Won Smart India Hackathon 2024.",
    tech: ["IoT", "Aeroponics", "Research"],
    category: "IoT",
  },
  {
    title: "CO₂ Emissions Prediction",
    desc: "Research on CO₂ vehicle emission prediction and optimization using Deep Q-Learning & PSO Model.",
    tech: ["Deep Learning", "Python", "Research"],
    category: "AI",
  },
];

const filters = ["All", "React", "AI", "IoT"];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease }}
      whileHover={{ rotateX: 3, rotateY: -3, scale: 1.02 }}
      style={{ perspective: 1000 }}
      className="glass-card-hover p-6 flex flex-col justify-between group cursor-pointer"
    >
      {/* Spotlight overlay */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0))" }} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
          <div className="flex gap-2">
            <Github size={16} strokeWidth={1.5} className="text-muted-foreground hover:text-primary transition-colors" />
            <ExternalLink size={16} strokeWidth={1.5} className="text-muted-foreground hover:text-primary transition-colors" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">{project.desc}</p>
      </div>

      <div className="flex flex-wrap gap-2 relative z-10">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p className="font-mono-label text-primary mb-3">Projects</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Things I've Built</h2>

          <div className="flex gap-3 mb-12 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-mono-label px-4 py-2 rounded-full transition-all duration-300 ${
                  filter === f
                    ? "bg-primary/20 text-primary border border-primary/40"
                    : "text-muted-foreground border border-muted hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

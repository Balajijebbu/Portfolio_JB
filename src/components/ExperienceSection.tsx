import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, Zap } from "lucide-react";

const ease = [0.2, 0, 0, 1];

const experiences = [
  {
    role: "Software Engineer - UI",
    company: "CodeMagen Technologies",
    period: "Apr 2025 – Apr 2026",
    location: "Bangalore",
    points: [
      "Developed scalable React.js applications using Redux Toolkit, TypeScript, React Hooks and RESTful APIs, improving performance by 25%.",
      "Implemented reusable functional components with responsive design and cross-browser compatibility within a Microfrontend architecture.",
      "Contributed to CI/CD-based production deployments, participated in code reviews, and maintained application stability following SDLC best practices.",
    ],
    responsibilities: [
      "Developed UI features for the Hotels Booking & Extranet platform, enabling partners to manage listings, pricing, availability and policies.",
      "Built and optimized React.js components using Redux Toolkit and RTK Query for efficient state management.",
      "Integrated RESTful APIs to support hotel search, booking workflows, and cancellation policies.",
      "Developed backoffice/admin modules for hotel management.",
      "Designed reusable and modular UI components to improve maintainability and consistency.",
    ],
  },
  {
    role: "Full-Stack Development Intern",
    company: "Schnell Equipments",
    period: "Jul 2024 – Sep 2024",
    location: "Coimbatore",
    points: [
      "Contributed to the development of Lume, a browser-based wireless streetlight monitoring and controlling application.",
      "Contributed to development and enhancement deployed in a live production environment.",
      "Implemented API consumption and telemetry data handling using RESTful APIs and JSON processing for real-time monitoring.",
    ],
  },
];

const TimelineCard = ({ exp, index }: { exp: typeof experiences[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const isLeft = index % 2 === 0;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div ref={ref} className={`flex gap-6 md:gap-10 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:items-center`}>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50, rotateY: isLeft ? -15 : 15 }}
        animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
        transition={{ duration: 0.7, ease }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
        style={{
          perspective: 1000,
          transform: isHovered
            ? `perspective(1000px) rotateY(${mousePos.x * 15}deg) rotateX(${-mousePos.y * 15}deg) translateZ(20px)`
            : "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)",
          transition: "transform 0.15s ease-out",
          transformStyle: "preserve-3d",
        }}
        className="glass-card-hover p-6 flex-1 relative group"
      >
        {/* Spotlight cursor */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: isHovered
              ? `radial-gradient(350px circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, hsl(180 100% 50% / 0.1), transparent 60%)`
              : "none",
          }}
        />

        {/* Side glow */}
        <motion.div
          className={`absolute top-0 bottom-0 w-[2px] ${isLeft ? "left-0" : "right-0"}`}
          style={{ background: "linear-gradient(180deg, transparent, hsl(180 100% 50% / 0.5), hsl(270 100% 66% / 0.5), transparent)" }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        <div style={{ transform: "translateZ(30px)" }}>
          <p className="font-mono-label text-primary mb-2">{exp.period}</p>
          <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{exp.role}</h3>
          <p className="text-accent text-sm mb-1">{exp.company}</p>
          <p className="text-muted-foreground text-xs mb-4">{exp.location}</p>
        </div>

        <ul className="space-y-2" style={{ transform: "translateZ(20px)" }}>
          {exp.points.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
              className="text-sm text-muted-foreground leading-relaxed flex gap-2"
            >
              <span className="text-primary mt-1 shrink-0">▹</span>
              {point}
            </motion.li>
          ))}
        </ul>

        {exp.responsibilities && (
          <>
            <motion.button
              onClick={() => setExpanded(!expanded)}
              whileHover={{ x: 3 }}
              className="flex items-center gap-1 mt-4 font-mono-label text-primary hover:text-accent transition-colors"
            >
              Product Responsibilities
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown size={14} />
              </motion.span>
            </motion.button>
            {expanded && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 space-y-2"
              >
                {exp.responsibilities.map((r, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                  >
                    <span className="text-accent mt-1 shrink-0">▹</span>
                    {r}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </>
        )}
      </motion.div>

      {/* Timeline dot with pulse */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.4, ease }}
        className="hidden md:flex relative"
      >
        <div className="w-4 h-4 rounded-full bg-primary neon-glow shrink-0 relative z-10" />
        <motion.div
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-primary/30"
        />
      </motion.div>

      <div className="flex-1 hidden md:block" />
    </div>
  );
};

const ExperienceSection = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  // Section-level 3D scroll
  const sectionRotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [6, 0, 0, -6]);
  const smoothRotateX = useSpring(sectionRotateX, { damping: 40, stiffness: 120 });

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden snap-start min-h-screen flex items-center" ref={sectionRef} style={{ perspective: "1400px" }}>
      <motion.div style={{ rotateX: smoothRotateX }} className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Zap size={16} className="text-primary animate-pulse-glow" />
            <p className="font-mono-label text-primary">Experience</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-16">
            Where I've <span className="text-primary neon-text">Worked</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-muted/30">
            <motion.div
              style={{ height: lineHeight, background: "linear-gradient(180deg, hsl(180 100% 50% / 0.5), hsl(270 100% 66% / 0.5))" }}
              className="w-full"
            />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <TimelineCard key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;

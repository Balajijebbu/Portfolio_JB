import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

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

  return (
    <div ref={ref} className={`flex gap-6 md:gap-10 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:items-center`}>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease }}
        className="glass-card-hover p-6 flex-1"
      >
        <p className="font-mono-label text-primary mb-2">{exp.period}</p>
        <h3 className="text-xl font-bold text-foreground mb-1">{exp.role}</h3>
        <p className="text-accent text-sm mb-1">{exp.company}</p>
        <p className="text-muted-foreground text-xs mb-4">{exp.location}</p>

        <ul className="space-y-2">
          {exp.points.map((point, i) => (
            <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
              <span className="text-primary mt-1 shrink-0">▹</span>
              {point}
            </li>
          ))}
        </ul>

        {exp.responsibilities && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 mt-4 font-mono-label text-primary hover:text-accent transition-colors"
            >
              Product Responsibilities
              <ChevronDown size={14} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
            {expanded && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 space-y-2"
              >
                {exp.responsibilities.map((r, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-accent mt-1 shrink-0">▹</span>
                    {r}
                  </li>
                ))}
              </motion.ul>
            )}
          </>
        )}
      </motion.div>

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.4, ease }}
        className="hidden md:flex w-4 h-4 rounded-full bg-primary neon-glow shrink-0 relative z-10"
      />

      {/* Spacer */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
};

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p className="font-mono-label text-primary mb-3">Experience</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-16">Where I've Worked</h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: "rgba(255,255,255,0.08)" }} />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <TimelineCard key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

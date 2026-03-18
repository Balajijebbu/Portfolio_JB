import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.2, 0, 0, 1];

type SkillCategory = {
  label: string;
  skills: { name: string; level: number }[];
};

const categories: SkillCategory[] = [
  {
    label: "Frontend",
    skills: [
      { name: "React.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Redux Toolkit", level: 90 },
      { name: "JavaScript", level: 92 },
      { name: "HTML / CSS3 / SCSS", level: 88 },
    ],
  },
  {
    label: "Tools & Platforms",
    skills: [
      { name: "Docker", level: 70 },
      { name: "Jenkins", level: 65 },
      { name: "Git / GitHub / Bitbucket", level: 85 },
      { name: "Vite / Webpack", level: 82 },
      { name: "Storybook", level: 75 },
    ],
  },
  {
    label: "Architecture",
    skills: [
      { name: "Microfrontend", level: 88 },
      { name: "CI/CD Pipelines", level: 78 },
      { name: "Performance Optimization", level: 85 },
      { name: "RESTful APIs", level: 90 },
      { name: "State Management", level: 92 },
    ],
  },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-foreground">{name}</span>
        <span className="font-mono-label text-primary tabular-nums">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ delay, duration: 0.8, ease }}
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, hsl(180 100% 50%), hsl(270 100% 66%))",
          }}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p className="font-mono-label text-primary mb-3">Skills</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-16">Tech Stack</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.15, duration: 0.5, ease }}
              className="glass-card-hover p-6"
            >
              <h3 className="font-mono-label text-accent mb-6">{cat.label}</h3>
              {cat.skills.map((skill, si) => (
                <SkillBar key={skill.name} {...skill} delay={ci * 0.15 + si * 0.08} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

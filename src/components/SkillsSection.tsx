import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="mb-4 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ x: 4 }}
    >
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-foreground group-hover:text-primary transition-colors">{name}</span>
        <motion.span
          className="font-mono-label text-primary tabular-nums"
          animate={isHovered ? { scale: 1.2, textShadow: "0 0 10px hsl(180 100% 50% / 0.5)" } : { scale: 1 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ delay, duration: 0.8, ease }}
          className="h-full rounded-full relative"
          style={{
            background: "linear-gradient(90deg, hsl(180 100% 50%), hsl(270 100% 66%))",
          }}
        >
          {/* Animated shimmer */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            style={{
              background: "linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
          />
        </motion.div>
        {/* Glow effect on hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: "0 0 15px hsl(180 100% 50% / 0.4), 0 0 30px hsl(180 100% 50% / 0.2)" }}
          />
        )}
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Parallax floating accent */}
      <motion.div
        style={{ y: parallax, background: "radial-gradient(circle, hsl(180 100% 50% / 0.06), transparent 70%)" }}
        className="absolute -left-32 top-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
      />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p className="font-mono-label text-primary mb-3">Skills</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-16">
            Tech <span className="text-primary neon-text">Stack</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: ci * 0.15, duration: 0.6, ease }}
              whileHover={{ y: -8, boxShadow: "0 0 30px hsl(180 100% 50% / 0.1)" }}
              className="glass-card-hover p-6 relative group"
            >
              {/* Top glow line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                style={{ background: "linear-gradient(90deg, transparent, hsl(180 100% 50% / 0.5), hsl(270 100% 66% / 0.5), transparent)" }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: ci * 0.15 + 0.3, duration: 0.8 }}
              />
              <h3 className="font-mono-label text-accent mb-6 group-hover:text-primary transition-colors">{cat.label}</h3>
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

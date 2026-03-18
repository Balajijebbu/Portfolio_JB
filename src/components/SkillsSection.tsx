import { motion, useInView, useScroll, useTransform, useVelocity, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { LetterReveal } from "@/components/ui/LetterReveal";

const ease = [0.22, 1, 0.36, 1];

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
      className="mb-8 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ x: 6 }}
    >
      <div className="flex justify-between mb-2">
         <span className="text-sm font-semibold tracking-wide text-muted-foreground group-hover:text-primary transition-colors uppercase font-mono-label">{name}</span>
         <motion.span
          className="font-mono-label text-primary tabular-nums font-bold"
          animate={isHovered ? { scale: 1.3, textShadow: "0 0 15px hsl(180 100% 50% / 0.6)" } : { scale: 1 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-2.5 rounded-full bg-muted/40 overflow-hidden relative border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ delay, duration: 1, ease }}
          className="h-full rounded-full relative"
          style={{
            background: "linear-gradient(90deg, hsl(180 100% 50%), hsl(270 100% 66%))",
          }}
        >
          {/* Animated shimmer */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              background: "linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
          />
        </motion.div>
        
        <AnimatePresence>
           {isHovered && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 rounded-full"
               style={{ boxShadow: "0 0 20px hsl(180 100% 50% / 0.5), 0 0 40px hsl(180 100% 50% / 0.3)" }}
            />
           )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Concept 12: Speed-Based Scroll Skew
  const skew = useTransform(scrollVelocity, [-3000, 3000], [-10, 10]);
  const smoothSkew = useSpring(skew, { damping: 50, stiffness: 400 });

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden snap-start min-h-screen flex items-center" ref={sectionRef}>
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-mono-label text-primary mb-4 tracking-[0.4em] uppercase"
          >
            Technical Arsenal
          </motion.p>
          <h2 className="text-4xl md:text-7xl font-bold mb-8">
            <LetterReveal text="The Tech " />
            <span className="text-primary neon-text"><LetterReveal text="Stack" delay={0.4} /></span>
          </h2>
        </div>

        <motion.div 
          style={{ skewY: smoothSkew }}
          className="grid md:grid-cols-3 gap-8"
        >
          {categories.map((cat, ci) => {
            const [localMousePos, setLocalMousePos] = useState({ x: 0, y: 0 });
            const [localIsHovered, setLocalIsHovered] = useState(false);

            const handleLocalMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width - 0.5;
              const y = (e.clientY - rect.top) / rect.height - 0.5;
              setLocalMousePos({ x, y });
            };

            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.2, duration: 0.8 }}
                onMouseMove={handleLocalMouseMove}
                onMouseEnter={() => setLocalIsHovered(true)}
                onMouseLeave={() => { setLocalIsHovered(false); setLocalMousePos({ x: 0, y: 0 }); }}
                whileHover={{ y: -15 }}
                style={{
                  perspective: 1200,
                  transform: localIsHovered
                    ? `perspective(1200px) rotateY(${localMousePos.x * 20}deg) rotateX(${-localMousePos.y * 20}deg)`
                    : "perspective(1200px) rotateY(0deg) rotateX(0deg)",
                  transition: "transform 0.15s ease-out",
                  transformStyle: "preserve-3d",
                }}
                className="glass-card-hover p-10 relative group shadow-[0_0_40px_rgba(0,0,0,0.3)] overflow-hidden rounded-3xl"
              >
                {/* Spotlight Cursor Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    background: localIsHovered
                      ? `radial-gradient(400px circle at ${(localMousePos.x + 0.5) * 100}% ${(localMousePos.y + 0.5) * 100}%, hsl(180 100% 50% / 0.15), transparent 70%)`
                      : "none",
                  }}
                />

                <h3 className="font-mono-label text-accent mb-12 group-hover:text-primary transition-colors text-xl font-bold tracking-widest uppercase text-center" style={{ transform: "translateZ(60px)" }}>
                  {cat.label}
                </h3>
                
                <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
                  {cat.skills.map((skill, si) => (
                    <SkillBar key={skill.name} {...skill} delay={ci * 0.2 + si * 0.1} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;

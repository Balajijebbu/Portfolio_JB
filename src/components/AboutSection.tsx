import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Code2, Briefcase, Layers, GraduationCap } from "lucide-react";

const ease = [0.2, 0, 0, 1];

const Counter = ({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end]);

  return (
    <motion.div
      ref={ref}
      className="text-center glass-card p-6 group hover:border-primary/30"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-3xl md:text-4xl font-bold text-primary neon-text tabular-nums group-hover:drop-shadow-[0_0_15px_hsl(180_100%_50%/0.5)] transition-all">
        {count}{suffix}
      </p>
      <p className="font-mono-label text-muted-foreground mt-2">{label}</p>
      {/* Glowing underline */}
      <motion.div
        className="h-[2px] mt-3 mx-auto rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, hsl(180 100% 50%), transparent)" }}
        initial={{ width: 0 }}
        animate={inView ? { width: "60%" } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
    </motion.div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxOrb = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const highlights = [
    { icon: Code2, title: "React Specialist", desc: "Expert in React.js, Redux Toolkit, TypeScript & modern frontend architecture" },
    { icon: Layers, title: "Microfrontend Architect", desc: "Designing scalable, modular systems with independent deployability" },
    { icon: Briefcase, title: "Production Ready", desc: "CI/CD pipelines, Jest testing, performance optimization & SDLC best practices" },
    { icon: GraduationCap, title: "MSc Software Systems", desc: "Kongu Engineering College — CGPA 8.5/10" },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Parallax orb */}
      <motion.div
        style={{ y: parallaxOrb, background: "radial-gradient(circle, hsl(270 100% 66% / 0.06), transparent 70%)" }}
        className="absolute -right-40 top-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
      />
      />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p className="font-mono-label text-primary mb-3">About Me</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Crafting Digital <span className="text-primary neon-text">Experiences</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-16">
            Software Developer specializing in React.js, Redux Toolkit, TypeScript and modern JavaScript.
            Experienced in developing scalable, responsive web applications with a focus on performance
            optimization, clean architecture, and real-time systems.
          </p>
        </motion.div>

        {/* Counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          <Counter end={2} label="Years Exp." suffix="+" />
          <Counter end={6} label="Projects" suffix="+" />
          <Counter end={15} label="Technologies" suffix="+" />
          <Counter end={8} label="CGPA" suffix=".5" />
        </motion.div>

        {/* Highlight cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="glass-card-hover p-6 flex gap-4 group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(180_100%_50%/0.2)] transition-all duration-500"
              >
                <item.icon size={20} strokeWidth={1.5} className="text-primary" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

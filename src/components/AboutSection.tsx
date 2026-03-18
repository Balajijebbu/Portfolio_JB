import { motion, useInView } from "framer-motion";
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
    <div ref={ref} className="text-center">
      <p className="text-3xl md:text-4xl font-bold text-primary neon-text tabular-nums">
        {count}{suffix}
      </p>
      <p className="font-mono-label text-muted-foreground mt-2">{label}</p>
    </div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { icon: Code2, title: "React Specialist", desc: "Expert in React.js, Redux Toolkit, TypeScript & modern frontend architecture" },
    { icon: Layers, title: "Microfrontend Architect", desc: "Designing scalable, modular systems with independent deployability" },
    { icon: Briefcase, title: "Production Ready", desc: "CI/CD pipelines, Jest testing, performance optimization & SDLC best practices" },
    { icon: GraduationCap, title: "MSc Software Systems", desc: "Kongu Engineering College — CGPA 8.5/10" },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p className="font-mono-label text-primary mb-3">About Me</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Crafting Digital Experiences</h2>
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
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
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
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease }}
              className="glass-card-hover p-6 flex gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon size={20} strokeWidth={1.5} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
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

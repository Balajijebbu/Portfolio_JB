import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Code2, Briefcase, Layers, GraduationCap } from "lucide-react";
import { LetterReveal } from "@/components/ui/LetterReveal";

const ease = [0.22, 1, 0.36, 1];

const Counter = ({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end]);

  return (
    <motion.div
      ref={ref}
      className="text-center glass-card p-6 group hover:border-primary/30 relative overflow-hidden"
      whileHover={{ scale: 1.05, y: -8, rotateX: 5 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div style={{ transform: "translateZ(30px)" }}>
        <p className="text-3xl md:text-5xl font-extrabold text-primary neon-text tabular-nums group-hover:drop-shadow-[0_0_20px_hsl(180_100%_50%/0.6)] transition-all">
          {count}{suffix}
        </p>
        <p className="font-mono-label text-muted-foreground mt-3 tracking-widest text-[10px]">{label}</p>
      </div>
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  // Glass layer parallax
  const layer1Y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const layerRotate = useTransform(scrollYProgress, [0, 1], [10, -10]);

  // 3D depth on scroll
  const sectionRotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [8, 0, 0, -8]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const smoothRotateX = useSpring(sectionRotateX, { damping: 40, stiffness: 120 });
  const smoothScale = useSpring(sectionScale, { damping: 40, stiffness: 120 });

  // Mouse parallax for cards
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const cardShiftX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 40, stiffness: 120 });
  const cardShiftY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), { damping: 40, stiffness: 120 });

  const highlights = [
    { icon: Code2, title: "React Specialist", desc: "Expert in React.js, Redux Toolkit, TypeScript & modern frontend architecture" },
    { icon: Layers, title: "Microfrontend Architect", desc: "Designing scalable, modular systems with independent deployability" },
    { icon: Briefcase, title: "Production Ready", desc: "CI/CD pipelines, Jest testing, performance optimization & SDLC best practices" },
    { icon: GraduationCap, title: "MSc Software Systems", desc: "Kongu Engineering College — CGPA 8.5/10" },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden snap-start min-h-screen flex items-center" ref={sectionRef} style={{ perspective: "1400px" }}>
      {/* Floating Glass Layers */}
      <motion.div
        style={{ y: layer1Y, rotate: layerRotate }}
        className="absolute -left-20 top-1/4 w-96 h-96 rounded-[3rem] border border-primary/10 bg-primary/5 backdrop-blur-3xl -z-10 pointer-events-none"
      />
      <motion.div
        style={{ y: layer2Y, rotate: -layerRotate }}
        className="absolute -right-20 bottom-1/4 w-80 h-80 rounded-full border border-accent/10 bg-accent/5 backdrop-blur-2xl -z-10 pointer-events-none"
      />

      {/* Floating wireframe cross */}
      <motion.div
        style={{ y: layer1Y, x: cardShiftX }}
        className="absolute top-[10%] right-[15%] pointer-events-none opacity-20"
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <line x1="40" y1="0" x2="40" y2="80" stroke="hsl(180 100% 50%)" strokeWidth="0.5" />
          <line x1="0" y1="40" x2="80" y2="40" stroke="hsl(180 100% 50%)" strokeWidth="0.5" />
          <circle cx="40" cy="40" r="20" stroke="hsl(270 100% 66%)" strokeWidth="0.5" />
        </svg>
      </motion.div>

      <motion.div
        style={{ rotateX: smoothRotateX, scale: smoothScale }}
        className="container mx-auto px-6 relative z-10"
        ref={ref}
      >
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-[2px] w-12 bg-primary/50" />
            <p className="font-mono-label text-primary tracking-[0.4em]">The Narrative</p>
            <div className="h-[2px] w-12 bg-primary/50" />
          </motion.div>

          <h2 className="text-4xl md:text-7xl font-bold mb-10 leading-tight">
            <LetterReveal text="Crafting Digital " />
            <span className="text-primary neon-text"><LetterReveal text="Experiences" delay={0.5} /></span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1 }}
            className="text-muted-foreground text-xl md:text-2xl leading-relaxed font-light italic"
          >
            "I don't just write code; I weave interfaces that feel intuitive, performant, and premium."
          </motion.p>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <Counter end={1} label="Year Experience" suffix="+" />
          <Counter end={10} label="Impactful Projects" suffix="+" />
          <Counter end={15} label="Technologies Mastered" suffix="+" />
          <Counter end={8} label="CGPA Excellence" suffix=".5" />
        </div>

        {/* Highlight cards with mouse-driven depth */}
        <div className="grid md:grid-cols-2 gap-8">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease }}
              whileHover={{
                scale: 1.05,
                rotateY: i % 2 === 0 ? 8 : -8,
                rotateX: 4,
                z: 40,
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: 1200,
                x: cardShiftX,
                y: cardShiftY,
              }}
              className="glass-card-hover p-8 flex flex-col md:flex-row gap-6 group cursor-default shadow-2xl relative"
            >
              <div
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:shadow-[0_0_30px_hsl(180_100%_50%/0.4)] transition-all duration-500"
                style={{ transform: "translateZ(50px)" }}
              >
                <item.icon size={32} strokeWidth={1.5} className="text-primary" />
              </div>
              <div style={{ transform: "translateZ(80px)" }}>
                <h3 className="font-bold text-2xl text-foreground mb-3 group-hover:text-primary transition-colors drop-shadow-xl">{item.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed group-hover:text-foreground/90 transition-colors">{item.desc}</p>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <item.icon size={48} className="text-primary/20" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;

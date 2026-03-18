import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Trophy, Award, BookOpen, Presentation } from "lucide-react";
import { LetterReveal } from "@/components/ui/LetterReveal";

const ease = [0.22, 1, 0.36, 1];

const achievements = [
  {
    icon: Trophy,
    title: "Smart India Hackathon 2024",
    desc: "Winner for 'Revolutionizing Saffron Cultivation Using Aeroponics' — a high-impact IoT & Agri-Tech solution for real-world challenges.",
    accent: true,
  },
  {
    icon: Award,
    title: "Consultancy Project Lead",
    desc: "Led a strategic consultancy project for a major Ghee Factory, optimizing critical production and management workflows.",
  },
  {
    icon: BookOpen,
    title: "AWS Cloud Technical Essentials",
    desc: "Mastered fundamental cloud paradigms and core AWS infrastructure services.",
  },
  {
    icon: Presentation,
    title: "Research & Presentations",
    desc: "Authored and presented papers on Phishing Detection and Natural Language Processing (NLP) at various technical symposiums.",
  },
];

const certifications = [
  "AWS Cloud Technical Essentials",
  "Software Testing Foundational (Infosys Springboard)",
  "Java Programming Fundamentals",
  "GenAI Masterclass (DeepLearning.AI)",
];

const AchievementCard = ({ item, index }: { item: typeof achievements[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.8, ease }}
      whileHover={{ y: -10, rotateX: 5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={`glass-card-hover p-8 flex flex-col sm:flex-row gap-6 group relative overflow-hidden shadow-2xl ${item.accent ? "ring-2 ring-primary/20 bg-primary/5" : ""}`}
    >
      {/* Dynamic Background Pulse */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(600px circle at center, ${item.accent ? "hsl(180 100% 50%)" : "hsl(270 100% 66%)"}, transparent 70%)` }}
        />
      )}

      <motion.div
        animate={isHovered ? { rotate: 360, scale: 1.2, translateZ: 50 } : { rotate: 0, scale: 1, translateZ: 20 }}
        transition={{ duration: 0.6, type: "spring" }}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${item.accent ? "bg-primary/20 text-primary" : "bg-accent/10 text-accent"} group-hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <item.icon size={28} strokeWidth={1.5} />
      </motion.div>
      
      <div style={{ transform: "translateZ(40px)" }}>
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">{item.desc}</p>
      </div>

      {/* Decorative particle */}
      {item.accent && (
        <div className="absolute -bottom-2 -right-2 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
          <Trophy size={80} />
        </div>
      )}
    </motion.div>
  );
};

const AchievementsSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  
  // Concept 8: Sticky Section Parallax (Header moves slower)
  const headerY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="achievements" className="py-24 md:py-40 relative overflow-hidden snap-start min-h-screen flex flex-col justify-center" ref={sectionRef}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-24 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono-label text-[10px] uppercase tracking-[0.2em] mb-4"
          >
            <Trophy size={12} />
            Milestones
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-bold leading-tight">
            <LetterReveal text="Recognition & " />
            <span className="text-accent ring-glow"><LetterReveal text="Excellence" delay={0.6} /></span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-20 relative z-20">
          {achievements.map((item, i) => (
            <AchievementCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Dynamic Certification Wall */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-10 relative overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/5"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent -z-10" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold text-foreground mb-4 font-mono-label flex items-center gap-3">
                <BookOpen className="text-accent" />
                Certifications
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Constantly evolving through industry-standard certifications and specialized masterclasses.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
              {certifications.map((cert, i) => (
                <motion.span
                  key={cert}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: "hsl(270 100% 66% / 0.2)",
                    boxShadow: "0 0 25px hsl(270 100% 66% / 0.4)" 
                  }}
                  className="px-6 py-3 rounded-2xl bg-accent/10 text-accent font-semibold text-sm border border-accent/20 cursor-default transition-all duration-300"
                >
                  {cert}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;

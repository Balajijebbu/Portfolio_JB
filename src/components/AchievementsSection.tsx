import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Trophy, Award, BookOpen, Presentation } from "lucide-react";

const ease = [0.2, 0, 0, 1];

const achievements = [
  {
    icon: Trophy,
    title: "Smart India Hackathon 2024",
    desc: "Won a prize for 'Revolutionizing Saffron Cultivation Using Aeroponics' — an innovative approach to real-world agricultural challenges.",
    accent: true,
  },
  {
    icon: Award,
    title: "Consultancy Project Lead",
    desc: "Led a comprehensive consultancy project for a ghee factory, focusing on optimizing production processes and management systems.",
  },
  {
    icon: BookOpen,
    title: "AWS Cloud Technical Essentials",
    desc: "Certified in cloud computing fundamentals and AWS services.",
  },
  {
    icon: Presentation,
    title: "Paper Presentations",
    desc: "Presented Phishing Detection at SNS College and a paper on Natural Language Processing (NLP).",
  },
];

const certifications = [
  "AWS Cloud Technical Essentials",
  "Software Testing Foundational (Infosys Springboard)",
  "Java Programming Fundamentals",
];

const AchievementCard = ({ item, index }: { item: typeof achievements[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5, ease }}
      whileHover={{ scale: 1.03, y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`glass-card-hover p-6 flex gap-4 group relative overflow-hidden ${item.accent ? "border border-primary/20" : ""}`}
    >
      {/* Background glow on hover */}
      {item.accent && isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: "radial-gradient(circle at center, hsl(180 100% 50%), transparent 70%)" }}
        />
      )}

      <motion.div
        animate={isHovered ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.accent ? "bg-primary/20" : "bg-accent/10"} ${isHovered ? "shadow-[0_0_20px_hsl(180_100%_50%/0.3)]" : ""} transition-shadow`}
      >
        <item.icon size={20} strokeWidth={1.5} className={item.accent ? "text-primary" : "text-accent"} />
      </motion.div>
      <div className="relative z-10">
        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
};

const AchievementsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p className="font-mono-label text-primary mb-3">Achievements</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-16">
            Recognition & <span className="text-accent">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {achievements.map((item, i) => (
            <AchievementCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Certifications with stagger animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5, ease }}
          className="glass-card p-6 relative overflow-hidden"
        >
          {/* Top glow */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, transparent, hsl(270 100% 66% / 0.5), transparent)" }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
          <h3 className="font-mono-label text-accent mb-4">Certifications</h3>
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert, i) => (
              <motion.span
                key={cert}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px hsl(270 100% 66% / 0.3)" }}
                className="text-sm px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 cursor-default transition-all"
              >
                {cert}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;

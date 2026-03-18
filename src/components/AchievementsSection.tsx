import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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

const AchievementsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p className="font-mono-label text-primary mb-3">Achievements</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-16">Recognition & Certifications</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease }}
              className={`glass-card-hover p-6 flex gap-4 ${item.accent ? "border border-primary/20" : ""}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.accent ? "bg-primary/20" : "bg-accent/10"}`}>
                <item.icon size={20} strokeWidth={1.5} className={item.accent ? "text-primary" : "text-accent"} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5, ease }}
          className="glass-card p-6"
        >
          <h3 className="font-mono-label text-accent mb-4">Certifications</h3>
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert) => (
              <span key={cert} className="text-sm px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20">
                {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/profile.jpg";

const ease = [0.2, 0, 0, 1];

const LetterReveal = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => (
  <span className={className}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + i * 0.025, duration: 0.1 }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 3, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(180 100% 50% / 0.06), transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, -2, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(270 100% 66% / 0.06), transparent 70%)" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease }}
            className="relative"
          >
            <div className="relative animate-float">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden glass-card p-1">
                <img
                  src={profileImg}
                  alt="Jeya Balaji C K"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute -inset-1 rounded-2xl neon-glow opacity-30 -z-10" />
            </div>
          </motion.div>

          {/* Text content */}
          <div className="text-center lg:text-left max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-mono-label text-primary mb-4"
            >
              Software Developer
            </motion.p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <LetterReveal text="Hi, I'm " delay={0.5} />
              <LetterReveal text="Jeya Balaji" className="text-primary neon-text" delay={0.7} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8"
            >
              Building Scalable & High-Performance Web Applications
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6, ease }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                variant="hero"
                size="lg"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Projects
                <ArrowDown size={16} strokeWidth={1.5} />
              </Button>
              <Button variant="heroOutline" size="lg">
                <Download size={16} strokeWidth={1.5} />
                Download Resume
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/profile.jpg";
import { useRef } from "react";

const ease = [0.2, 0, 0, 1];

const LetterReveal = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => (
  <span className={className}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: delay + i * 0.03, duration: 0.4, ease }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

// Floating particle component
const FloatingParticle = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/20"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      opacity: [0.2, 0.6, 0.2],
      scale: [1, 1.5, 1],
    }}
    transition={{ duration: 4 + Math.random() * 3, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient" />
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(180 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(180 100% 50%) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Floating particles */}
      {[
        { delay: 0, x: "10%", y: "20%", size: 4 },
        { delay: 1, x: "80%", y: "30%", size: 3 },
        { delay: 2, x: "60%", y: "70%", size: 5 },
        { delay: 0.5, x: "30%", y: "80%", size: 3 },
        { delay: 1.5, x: "90%", y: "60%", size: 4 },
        { delay: 3, x: "20%", y: "50%", size: 6 },
        { delay: 2.5, x: "70%", y: "15%", size: 3 },
        { delay: 0.8, x: "50%", y: "90%", size: 4 },
      ].map((p, i) => <FloatingParticle key={i} {...p} />)}

      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(180 100% 50% / 0.08), transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -3, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(270 100% 66% / 0.08), transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(200 100% 50% / 0.04), transparent 70%)" }}
        />
      </div>

      <motion.div style={{ y: parallaxY, opacity: parallaxOpacity, scale: parallaxScale }} className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Profile image with 3D effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease }}
            className="relative"
          >
            <div className="relative animate-float">
              <motion.div
                whileHover={{ rotateY: 10, rotateX: -5, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden glass-card p-1 relative"
                style={{ perspective: 800 }}
              >
                <img
                  src={profileImg}
                  alt="Jeya Balaji C K"
                  className="w-full h-full object-cover rounded-xl"
                />
                {/* Shimmer overlay */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  style={{
                    background: "linear-gradient(110deg, transparent 30%, hsl(180 100% 50% / 0.1) 50%, transparent 70%)",
                    backgroundSize: "200% 100%",
                  }}
                />
              </motion.div>
              {/* Animated glow ring */}
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -inset-2 rounded-2xl -z-10"
                style={{ background: "linear-gradient(135deg, hsl(180 100% 50% / 0.3), hsl(270 100% 66% / 0.3))", filter: "blur(15px)" }}
              />
            </div>
          </motion.div>

          {/* Text content */}
          <div className="text-center lg:text-left max-w-2xl">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-mono-label text-primary mb-4"
            >
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ●
              </motion.span>
              {" "}Software Developer
            </motion.p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <LetterReveal text="Hi, I'm " delay={0.5} />
              <LetterReveal text="Jeya Balaji" className="text-primary neon-text" delay={0.7} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.2, duration: 0.8, ease }}
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
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="hero"
                  size="lg"
                  className="glow-button"
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                >
                  View Projects
                  <ArrowDown size={16} strokeWidth={1.5} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="heroOutline" size="lg">
                  <Download size={16} strokeWidth={1.5} />
                  Download Resume
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

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

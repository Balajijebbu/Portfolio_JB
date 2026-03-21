import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/banner.jpg";
import { useRef, useEffect } from "react";
import { LetterReveal } from "@/components/ui/LetterReveal";

const ease = [0.2, 0, 0, 1];

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
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.2]);
  const parallaxBlur = useTransform(scrollYProgress, [0, 0.4], ["blur(0px)", "blur(10px)"]);

  // Mouse-driven 3D tilt for the entire hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { damping: 30, stiffness: 150 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { damping: 30, stiffness: 150 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  // Depth layers move at different speeds
  const layer1X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { damping: 40, stiffness: 120 });
  const layer1Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), { damping: 40, stiffness: 120 });
  const layer2X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-40, 40]), { damping: 30, stiffness: 100 });
  const layer2Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 30]), { damping: 30, stiffness: 100 });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start" style={{ perspective: "1200px" }}>

      {/* Floating 3D rings that respond to mouse */}
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] right-[10%] w-40 h-40 rounded-full border border-primary/10"
          style={{ transform: "rotateX(60deg)" }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] left-[8%] w-60 h-60 rounded-full border border-accent/10"
          style={{ transform: "rotateX(70deg) rotateY(20deg)" }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] left-[65%] w-32 h-32 rounded-full border border-primary/8"
          style={{ transform: "rotateX(50deg) rotateZ(45deg)" }}
        />
      </motion.div>

      {/* Floating particles at depth */}
      <motion.div style={{ x: layer1X, y: layer1Y }} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.3}
            x={`${Math.random() * 100}%`}
            y={`${Math.random() * 100}%`}
            size={2 + Math.random() * 4}
          />
        ))}
      </motion.div>

      <motion.div
        style={{
          y: parallaxY,
          opacity: parallaxOpacity,
          scale: parallaxScale,
          filter: parallaxBlur,
          rotateX,
          rotateY,
        }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Banner image with cinematic 3D depth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease }}
            className="relative"
            style={{ perspective: "1200px" }}
          >
            <div className="relative animate-float">
              {/* Pulsing glow behind image */}
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -inset-10 rounded-[3rem] bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 blur-3xl -z-10"
              />

              {/* Outer orbiting ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 rounded-[3rem] border border-primary/20 -z-5"
                style={{ transform: "rotateX(75deg)" }}
              />
              {/* Inner orbiting ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-[3rem] border border-accent/15 -z-5"
                style={{ transform: "rotateX(65deg) rotateZ(30deg)" }}
              />

              <motion.div
                whileHover={{ rotateY: 20, rotateX: -10, scale: 1.06 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-64 h-72 md:w-80 md:h-96 rounded-[2.5rem] overflow-hidden glass-card p-1.5 relative z-10 shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Main image layer */}
                <div
                  className="w-full h-full rounded-[2rem] overflow-hidden relative"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <img
                    src={profileImg}
                    alt="Jeya Balaji C K"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>

                {/* 3D Glass reflection overlay */}
                <div
                  className="absolute inset-0 rounded-[2rem] border border-white/10 z-20 pointer-events-none"
                  style={{ transform: "translateZ(60px)" }}
                />

                {/* Floating depth highlight */}
                <motion.div
                  animate={{ opacity: [0.1, 0.3, 0.1], x: [-20, 20, -20] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-[2rem] z-20 pointer-events-none"
                  style={{
                    transform: "translateZ(80px)",
                    background: "linear-gradient(120deg, transparent 30%, hsl(var(--primary) / 0.15) 50%, transparent 70%)",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="text-center lg:text-left max-w-2xl" style={{ transformStyle: "preserve-3d" }}>
            <motion.div
              style={{ transform: "translateZ(50px)" }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-mono-label text-primary mb-6 flex items-center justify-center lg:justify-start gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="tracking-[0.3em] font-bold">Available for hire</span>
            </motion.div>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8"
              style={{ transform: "translateZ(100px)" }}
            >
              <LetterReveal text="Hi, I'm " delay={0.5} />
              <LetterReveal text="Jeya Balaji" className="text-primary neon-text" delay={0.7} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.4, duration: 1, ease }}
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
              style={{ transform: "translateZ(80px)" }}
            >
              Building next-gen <span className="text-foreground font-semibold">Web Experiences</span> &{" "}
              <span className="text-foreground font-semibold">IoT Solutions</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6, ease }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              style={{ transform: "translateZ(60px)" }}
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

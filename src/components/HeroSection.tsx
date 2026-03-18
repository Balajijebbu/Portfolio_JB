import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/profile.jpg";
import { useRef } from "react";
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

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start">
      {/* Background elements moved to global BackgroundParallax */}
      
      <motion.div 
        style={{ 
          y: parallaxY, 
          opacity: parallaxOpacity, 
          scale: parallaxScale,
          filter: parallaxBlur 
        }} 
        className="container mx-auto px-6 relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Profile image with 3D effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease }}
            className="relative perspective-1200"
          >
            <div className="relative animate-float">
               <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.7, 0.3] 
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -inset-8 rounded-[3rem] bg-gradient-to-r from-primary/40 to-accent/40 blur-3xl -z-10"
              />
              
              <motion.div
                whileHover={{ rotateY: 25, rotateX: -15, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-56 h-56 md:w-72 md:h-72 rounded-[2.5rem] overflow-hidden glass-card p-1.5 relative z-10 shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div 
                  className="w-full h-full rounded-[2rem] overflow-hidden"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <img
                    src={profileImg}
                    alt="Jeya Balaji C K"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* 3D Glass Overlay Overlay */}
                <div 
                  className="absolute inset-0 rounded-[2rem] border border-white/20 z-20 pointer-events-none" 
                  style={{ transform: "translateZ(60px)" }}
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

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8" style={{ transform: "translateZ(100px)" }}>
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
              Building next-gen <span className="text-foreground font-semibold">Web Experiences</span> & <span className="text-foreground font-semibold">IoT Solutions</span>.
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

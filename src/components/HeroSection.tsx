import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/banner.jpg";
import resumeFile from "@/assets/JEYA BALAJI C K_Resume.pdf";
import { useRef, useEffect } from "react";
import { LetterReveal } from "@/components/ui/LetterReveal";

const ease = [0.22, 1, 0.36, 1];

const FloatingParticle = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/20"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{
      y: [0, -40, 0],
      x: [0, 20, 0],
      opacity: [0.1, 0.5, 0.1],
      scale: [1, 1.8, 1],
    }}
    transition={{ duration: 5 + Math.random() * 5, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 35, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 35, stiffness: 200 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const layer1X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), { damping: 50, stiffness: 100 });
  const layer1Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 30]), { damping: 50, stiffness: 100 });
  const layer2X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-60, 60]), { damping: 40, stiffness: 80 });
  const layer2Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-60, 60]), { damping: 40, stiffness: 80 });

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumeFile;
    link.download = "Jeya_Balaji_CK_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start pt-20" style={{ perspective: "1500px" }}>
      
      {/* Dynamic Background Elements */}
      <motion.div style={{ x: layer2X, y: layer2Y }} className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
      </motion.div>

      {/* Floating 3D Ornaments */}
      <motion.div style={{ x: layer1X, y: layer1Y }} className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ rotate: 360, y: [0, 40, 0] }}
          transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" }, y: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute top-[20%] right-[15%] w-64 h-64 rounded-full border border-primary/10"
          style={{ transform: "rotateX(75deg) rotateY(15deg)" }}
        />
        <motion.div
          animate={{ rotate: -360, x: [0, -30, 0] }}
          transition={{ rotate: { duration: 50, repeat: Infinity, ease: "linear" }, x: { duration: 12, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute bottom-[25%] left-[10%] w-80 h-80 rounded-full border border-accent/10"
          style={{ transform: "rotateX(65deg) rotateY(-20deg)" }}
        />
      </motion.div>

      {/* Hero Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.2} x={`${Math.random() * 100}%`} y={`${Math.random() * 100}%`} size={1 + Math.random() * 3} />
        ))}
      </div>

      <motion.div
        style={{
          y: parallaxY,
          opacity: parallaxOpacity,
          scale: parallaxScale,
          rotateX,
          rotateY,
        }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Big 3D Parallax Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, ease }}
            className="w-full max-w-[450px] lg:max-w-[550px] order-2 lg:order-1 relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Cinematic Background Glow */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-primary/30 to-accent/30 blur-[100px] opacity-60 rounded-full animate-pulse" />
            
            <motion.div
              whileHover={{ rotateY: 15, rotateX: -10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden glass-card p-2 border border-white/10 shadow-3xl bg-black/20"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Image Layer with Depth */}
              <div 
                className="w-full h-full rounded-[2.5rem] overflow-hidden relative shadow-inner"
                style={{ transform: "translateZ(50px)" }}
              >
                <img
                  src={profileImg}
                  alt="Jeya Balaji C K"
                  className="w-full h-full object-cover object-[80%_20%] scale-105"
                />
                
                {/* Advanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 mix-blend-overlay" />
              </div>

              {/* Depth Highlights */}
              <div 
                className="absolute inset-4 border border-white/5 rounded-[2.2rem] z-20 pointer-events-none"
                style={{ transform: "translateZ(80px)" }}
              />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center lg:text-left flex-1 order-1 lg:order-2" style={{ transformStyle: "preserve-3d" }}>
            <motion.div
              style={{ transform: "translateZ(40px)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono-label text-primary tracking-widest font-bold">Front-End Developer</span>
            </motion.div>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 tracking-tighter"
              style={{ transform: "translateZ(100px)" }}
            >
              <div className="whitespace-nowrap overflow-visible">
                <LetterReveal text="Hi, I'm " delay={0.3} />
              </div>
              <div className="whitespace-nowrap overflow-visible">
                <LetterReveal text="Jeya Balaji" className="text-primary neon-text" delay={0.6} />
              </div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0"
              style={{ transform: "translateZ(60px)" }}
            >
              Architecting <span className="text-foreground font-semibold">high-performance user interfaces</span> and scalable 
              <span className="text-accent font-semibold"> Frontend architectures</span>. Turning complex logic into 
              seamless, <span className="text-foreground">responsive digital experiences</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
              style={{ transform: "translateZ(80px)" }}
            >
              <Button
                variant="hero"
                size="xl"
                className="group relative px-10 py-7"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-3 text-lg">
                  Explore Work <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
                </span>
              </Button>
              
              <Button 
                variant="heroOutline" 
                size="xl" 
                className="px-10 py-7 group"
                onClick={handleDownload}
              >
                <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                <span className="text-lg">Get Resume</span>
              </Button>
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* Scroll Down Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-mono-label text-muted-foreground uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

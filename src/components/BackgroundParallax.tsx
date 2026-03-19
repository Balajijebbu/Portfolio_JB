import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const BackgroundParallax = () => {
  const { scrollY } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Orb layers
  const orbs = [
    { size: 350, color: "hsl(180 100% 50% / 0.06)", initial: { top: "5%", left: "3%" }, speed: 0.08, mSpeed: 25 },
    { size: 500, color: "hsl(270 100% 66% / 0.05)", initial: { top: "35%", right: "5%" }, speed: 0.18, mSpeed: -35 },
    { size: 250, color: "hsl(180 100% 50% / 0.04)", initial: { bottom: "15%", left: "15%" }, speed: 0.12, mSpeed: 45 },
    { size: 600, color: "hsl(270 100% 66% / 0.03)", initial: { bottom: "25%", right: "10%" }, speed: 0.04, mSpeed: -18 },
    { size: 180, color: "hsl(200 100% 60% / 0.06)", initial: { top: "60%", left: "50%" }, speed: 0.22, mSpeed: 30 },
    { size: 400, color: "hsl(300 80% 60% / 0.03)", initial: { top: "15%", right: "30%" }, speed: 0.1, mSpeed: -25 },
  ];

  // Grid parallax
  const gridY = useTransform(scrollY, [0, 5000], [0, -400]);
  const gridSpring = useSpring(gridY, { damping: 80, stiffness: 100 });

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Perspective grid floor */}
      <motion.div
        style={{ y: gridSpring }}
        className="absolute inset-0"
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-[60vh]"
          style={{
            background: `
              linear-gradient(180deg, transparent 0%, hsl(180 100% 50% / 0.02) 100%),
              repeating-linear-gradient(90deg, hsl(180 100% 50% / 0.04) 0px, transparent 1px, transparent 80px),
              repeating-linear-gradient(0deg, hsl(180 100% 50% / 0.03) 0px, transparent 1px, transparent 80px)
            `,
            transform: "perspective(500px) rotateX(60deg)",
            transformOrigin: "bottom center",
            maskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 80%)",
          }}
        />
      </motion.div>

      {/* Floating geometric wireframes */}
      <FloatingGeometry
        scrollY={scrollY}
        mousePos={mousePos}
        style={{ top: "20%", left: "8%" }}
        size={120}
        speed={0.15}
        rotateSpeed={25}
        shape="cube"
      />
      <FloatingGeometry
        scrollY={scrollY}
        mousePos={mousePos}
        style={{ top: "55%", right: "12%" }}
        size={90}
        speed={0.1}
        rotateSpeed={35}
        shape="diamond"
      />
      <FloatingGeometry
        scrollY={scrollY}
        mousePos={mousePos}
        style={{ bottom: "30%", left: "60%" }}
        size={70}
        speed={0.2}
        rotateSpeed={20}
        shape="triangle"
      />
      <FloatingGeometry
        scrollY={scrollY}
        mousePos={mousePos}
        style={{ top: "75%", left: "25%" }}
        size={100}
        speed={0.08}
        rotateSpeed={30}
        shape="hexagon"
      />

      {/* Orbs */}
      {orbs.map((orb, i) => (
        <Orb key={i} shape={orb} scrollY={scrollY} mousePos={mousePos} />
      ))}

      {/* Horizontal scan lines */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(180 100% 50%) 2px, hsl(180 100% 50%) 3px)",
          backgroundSize: "100% 6px",
        }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
};

const Orb = ({ shape, scrollY, mousePos }: any) => {
  const y = useTransform(scrollY, [0, 5000], [0, 5000 * shape.speed]);
  const springY = useSpring(y, { damping: 50, stiffness: 200 });

  return (
    <motion.div
      style={{
        ...shape.initial,
        width: shape.size,
        height: shape.size,
        backgroundColor: shape.color,
        y: springY,
        x: mousePos.x * shape.mSpeed,
        translateY: mousePos.y * shape.mSpeed,
        filter: "blur(60px)",
      }}
      className="absolute rounded-full"
      animate={{
        scale: [1, 1.15, 1],
        rotate: [0, 90, 0],
      }}
      transition={{
        duration: 20 + Math.random() * 10,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const FloatingGeometry = ({
  scrollY,
  mousePos,
  style,
  size,
  speed,
  rotateSpeed,
  shape,
}: {
  scrollY: any;
  mousePos: { x: number; y: number };
  style: React.CSSProperties;
  size: number;
  speed: number;
  rotateSpeed: number;
  shape: "cube" | "diamond" | "triangle" | "hexagon";
}) => {
  const y = useTransform(scrollY, [0, 5000], [0, 5000 * speed]);
  const springY = useSpring(y, { damping: 60, stiffness: 150 });

  const getShape = () => {
    const strokeColor = "hsl(180 100% 50% / 0.12)";
    switch (shape) {
      case "cube":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
            <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" stroke={strokeColor} strokeWidth="0.8" />
            <line x1="50" y1="10" x2="50" y2="90" stroke={strokeColor} strokeWidth="0.5" />
            <line x1="10" y1="30" x2="90" y2="70" stroke={strokeColor} strokeWidth="0.5" />
            <line x1="90" y1="30" x2="10" y2="70" stroke={strokeColor} strokeWidth="0.5" />
          </svg>
        );
      case "diamond":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 95,50 50,95 5,50" stroke={strokeColor} strokeWidth="0.8" />
            <polygon points="50,20 80,50 50,80 20,50" stroke="hsl(270 100% 66% / 0.1)" strokeWidth="0.5" />
          </svg>
        );
      case "triangle":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 95,90 5,90" stroke={strokeColor} strokeWidth="0.8" />
            <polygon points="50,30 75,75 25,75" stroke="hsl(270 100% 66% / 0.08)" strokeWidth="0.5" />
          </svg>
        );
      case "hexagon":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" stroke={strokeColor} strokeWidth="0.8" />
            <circle cx="50" cy="50" r="25" stroke="hsl(270 100% 66% / 0.08)" strokeWidth="0.5" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      style={{
        ...style,
        position: "absolute",
        y: springY,
        x: mousePos.x * 20,
      }}
      animate={{
        rotate: [0, 360],
        scale: [1, 1.05, 1],
      }}
      transition={{
        rotate: { duration: rotateSpeed, repeat: Infinity, ease: "linear" },
        scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {getShape()}
    </motion.div>
  );
};

export default BackgroundParallax;

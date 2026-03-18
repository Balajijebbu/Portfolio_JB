import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const BackgroundParallax = () => {
  const { scrollY } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) - 0.5, 
        y: (e.clientY / window.innerHeight) - 0.5 
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Parallax layers for shapes
  const shapes = [
    { size: 300, color: "hsl(180 100% 50% / 0.05)", initial: { top: "10%", left: "5%" }, speed: 0.1, mSpeed: 20 },
    { size: 400, color: "hsl(270 100% 66% / 0.04)", initial: { top: "40%", right: "10%" }, speed: 0.2, mSpeed: -30 },
    { size: 200, color: "hsl(180 100% 50% / 0.03)", initial: { bottom: "10%", left: "20%" }, speed: 0.15, mSpeed: 40 },
    { size: 500, color: "hsl(270 100% 66% / 0.03)", initial: { bottom: "20%", right: "15%" }, speed: 0.05, mSpeed: -20 },
  ];

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <Shape 
          key={i} 
          shape={shape} 
          scrollY={scrollY} 
          mousePos={mousePos} 
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
};

const Shape = ({ shape, scrollY, mousePos }: any) => {
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
        scale: [1, 1.1, 1],
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

export default BackgroundParallax;

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const mainX = useSpring(cursorX, springConfig);
  const mainY = useSpring(cursorY, springConfig);
  
  const trailConfig = { damping: 30, stiffness: 120, mass: 0.8 };
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);

      // Optimized pointer check: avoid getComputedStyle on every move
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer";
      
      setIsPointer(!!isClickable);
    };

    const handleMouseOut = () => setIsVisible(false);
    const handleMouseOver = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Main dot */}
      <motion.div
        className="absolute top-0 left-0 w-2.5 h-2.5 bg-primary rounded-full mix-blend-difference"
        style={{ 
          x: mainX, 
          y: mainY, 
          translateX: "-50%", 
          translateY: "-50%",
        }}
        animate={{ 
          scale: isPointer ? 3 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      
      {/* Outer ring / trail */}
      <motion.div
        className="absolute top-0 left-0 w-8 h-8 border border-primary/40 rounded-full"
        style={{ 
          x: trailX, 
          y: trailY, 
          translateX: "-50%", 
          translateY: "-50%",
        }}
        animate={{ 
          scale: isPointer ? 1.8 : 1,
          opacity: isPointer ? 0.2 : 0.5,
          borderWidth: isPointer ? "1px" : "1.5px"
        }}
      />
    </div>
  );
};

export default CustomCursor;

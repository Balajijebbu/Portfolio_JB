import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const code = `import { JeyaBalaji } from 'future';`;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 15, 100));
    }, 150);

    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 600);
    }, 2200);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-8"
        >
          {/* Animated orbs */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(180 100% 50% / 0.08), transparent 70%)" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-primary/80 text-sm md:text-base tracking-wide relative z-10"
          >
            <span className="text-accent">{">"}</span> {code}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-primary ml-0.5"
            >
              |
            </motion.span>
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-muted rounded-full overflow-hidden relative z-10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(180 100% 50%), hsl(270 100% 66%))", width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

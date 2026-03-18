import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Intro = ({ onComplete }: { onComplete: () => void }) => {
  const [text, setText] = useState("");
  const fullText = "Initializing Portfolio... > Jeya_Balaji.exe";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[1000] bg-background flex flex-col items-center justify-center font-mono"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-primary text-xl md:text-2xl mb-8 flex items-center gap-2"
      >
        <span className="opacity-50">$</span>
        {text}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-2 h-6 bg-primary inline-block"
        />
      </motion.div>
      
      <div className="w-64 h-1 bg-muted rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_15px_hsl(180_100%_50%/0.5)]"
        />
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="mt-4 text-[10px] uppercase tracking-[0.4em]"
      >
        Visual Experience Engine v3.1
      </motion.p>
    </motion.div>
  );
};

export default Intro;

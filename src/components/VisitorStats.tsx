import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, Users, TrendingUp } from "lucide-react";

interface VisitorInfo {
  count: number;
  location: string;
}

const VisitorStats = () => {
  const [stats, setStats] = useState<VisitorInfo>({ count: 1248, location: "Loading..." });
  const { scrollY } = useScroll();
  
  // Fade out stats as user scrolls down
  const opacity = useTransform(scrollY, [0, 50], [1, 0]);
  const y = useTransform(scrollY, [0, 50], [0, -20]);
  const pointerEvents = useTransform(scrollY, [0, 50], ["auto", "none"] as any);

  useEffect(() => {
    // 1. Handle Persistent Visitor Count
    const getCount = () => {
      const storedCount = localStorage.getItem("portfolio_visits");
      const baseCount = 1248;
      
      if (storedCount) {
        const newCount = parseInt(storedCount) + 1;
        localStorage.setItem("portfolio_visits", newCount.toString());
        setStats(prev => ({ ...prev, count: newCount }));
      } else {
        localStorage.setItem("portfolio_visits", baseCount.toString());
        setStats(prev => ({ ...prev, count: baseCount }));
      }
    };

    // 2. Fetch Visitor Location (Using IP Geolocation)
    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.country_name) {
          setStats(prev => ({ ...prev, location: data.country_name }));
        }
      } catch (e) {
        setStats(prev => ({ ...prev, location: "Global" }));
      }
    };

    getCount();
    fetchLocation();
  }, []);

  return (
    <motion.div 
      style={{ opacity, y, pointerEvents }}
      className="fixed top-24 right-8 z-30 hidden lg:block"
    >
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="glass-card p-3 border border-primary/10 flex flex-col gap-3 shadow-xl hover:border-primary/30 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
            <Users size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono-label text-muted-foreground leading-none mb-1">Total Visitors</p>
            <p className="text-sm font-bold text-foreground tabular-nums tracking-tight">
              {stats.count.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
            <Globe size={16} className="text-accent" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono-label text-muted-foreground leading-none mb-1">Last Visit From</p>
            <p className="text-sm font-bold text-foreground truncate max-w-[80px]">
              {stats.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1 py-1 px-2 bg-primary/5 rounded-md border border-primary/5">
          <TrendingUp size={10} className="text-primary animate-pulse" />
          <p className="text-[9px] font-mono-label text-primary uppercase">Live Active</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VisitorStats;

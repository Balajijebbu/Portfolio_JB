import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = ["About", "Skills", "Experience", "Projects", "Achievements", "Contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "glass-card py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-primary font-bold text-xl tracking-tight neon-text">
          JB<span className="text-foreground">.</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="font-mono-label text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-card mt-2 mx-4 p-6 flex flex-col gap-4"
        >
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="font-mono-label text-muted-foreground hover:text-primary transition-colors text-left"
            >
              {item}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

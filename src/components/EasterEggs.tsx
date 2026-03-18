import { useEffect } from "react";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

const EasterEggs = () => {
  useEffect(() => {
    let keys = "";
    const konami = "arrowuparrowuparrowdownarrowdownarrowleftarrowrightarrowleftarrowrightba";
    
    const handleKey = (e: KeyboardEvent) => {
      keys += e.key.toLowerCase();
      if (keys.length > 50) keys = keys.slice(-50);
      
      if (keys.includes(konami)) {
        toast.success("LEVEL UP! 🎮 You found the secret mode!", {
           duration: 5000,
           icon: <Sparkles className="text-yellow-400 animate-spin" />,
           description: "Site performance and glow effects boosted by 200%. Happy exploring!"
        });
        document.body.classList.add("secret-mode");
        keys = "";
      }

      // Shortcut for quick tour
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        toast.info("Command Palette Opening...", { description: "Try asking the AI 'Take me on a tour'!" });
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return null;
};

export default EasterEggs;

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, X, Send, User, Bot, Sparkles, 
  Mic, MicOff, Play, Layout, UserCheck, Terminal, 
  Gamepad2, Volume2, ArrowRight 
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "bot";
  content: string;
}

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi! I'm Jeya's AI assistant. How can I help you today? I can also give you a guided tour! 🚀" }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [activeMode, setActiveMode] = useState<"recruiter" | "developer" | "fun">("recruiter");
  const [showChips, setShowChips] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 1. Proactive Triggers
  useEffect(() => {
    // 5s Welcome Popup
    const welcomeTimer = setTimeout(() => {
      if (!hasShownWelcome) {
        setIsOpen(true);
        setHasShownWelcome(true);
      }
    }, 5000);

    // Scroll Trigger (50%)
    const handleScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled > 0.5 && !isOpen && !hasShownWelcome) {
        setIsOpen(true);
        setMessages(prev => [...prev, { role: "bot", content: "You've seen a lot! Want to see my best projects directly? Click the 'View Projects' button below! 👇" }]);
        setHasShownWelcome(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(welcomeTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasShownWelcome, isOpen]);

  // 2. Voice Recognition Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        toast.success("Voice recognized!");
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
      toast.info("Listening...");
    }
  };

  // 3. Guided Tour Logic
  const startTour = async () => {
    setIsOpen(true);
    const steps = [
      { id: "hero", msg: "Welcome to my world! This is where it all begins. 🚀", delay: 2000 },
      { id: "about", msg: "Here's a bit about my background and what drives me. 👨‍💻", delay: 3000 },
      { id: "skills", msg: "Check out my technical arsenal. I specialize in modern web tech! 🛠️", delay: 3000 },
      { id: "projects", msg: "And these are some of the cool things I've built. Take a look! 🎁", delay: 3000 },
      { id: "contact", msg: "Ready to build something together? Let's connect! 📬", delay: 2000 },
    ];

    setMessages(prev => [{ role: "bot", content: "Starting your guided tour... sit back and enjoy! 🎬" }]);

    for (const step of steps) {
      const element = document.getElementById(step.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        await new Promise(r => setTimeout(r, 1000));
        setMessages(prev => [...prev, { role: "bot", content: step.msg }]);
        await new Promise(r => setTimeout(r, step.delay));
      }
    }
    setMessages(prev => [...prev, { role: "bot", content: "That's the end of my tour! What's your path today? Recruiter, Developer, or Fun? 👇" }]);
  };

  const knowledgeBase = [
    {
      keywords: ["codemagen", "code magen", "first job", "software engineer ui", "salary", "pay", "amount"],
      answer: "Jeya worked at CodeMagen Technologies as a Software Engineer - UI (Apr 2025 – Apr 2026). This was a full-time role with a salary of 20k per month, where he specialized in React, Redux, and Microfrontends."
    },
    {
      keywords: ["schnell", "intern", "streetlight", "lume", "stipend", "pay", "amount", "stifend"],
      answer: "Jeya was a Full-Stack Development Intern at Schnell Equipments (Jul–Sep 2024). This was a 5k per month stipend-based internship where he developed the 'Lume' IoT monitoring system."
    },
    {
      keywords: ["saffron", "hackathon", "winner", "smart india", "aeroponics"],
      answer: "One of Jeya's biggest achievements is winning the Smart India Hackathon 2024 for his 'Saffron Cultivation' project, which used Aeroponics and IoT to optimize crop yield."
    },
    {
      keywords: ["education", "college", "kongu", "msc", "cgpa", "degree"],
      answer: "Jeya holds an MSc in Software Systems from Kongu Engineering College with an impressive CGPA of 8.5/10."
    },
    {
      keywords: ["skills", "tech", "react", "typescript", "microfrontend", "redux"],
      answer: "Jeya is an expert in React.js, TypeScript, and Redux Toolkit. He also has strong experience with Microfrontend architecture, Docker, Jenkins, and IoT systems."
    },
    {
      keywords: ["projects", "built", "portfolio", "co2", "translator", "inventory", "gift", "library"],
      answer: "Jeya has built several advanced projects: an AI Gift Idea Generator, a Library Management System, a Multi-Language Translator, an Inventory System, and a CO2 Emissions Prediction model."
    },
    {
      keywords: ["contact", "email", "phone", "reach", "hire"],
      answer: "You can reach Jeya at jeyabalajichandrasekaran@gmail.com or call him at +91 9789099336. There's also a contact form at the bottom of this page!"
    },
    {
      keywords: ["resume", "cv", "download", "profile"],
      answer: "Sure! You can download my latest resume by clicking the 'Download Resume' button in the Hero section. It highlights my experience with React, Microfrontends, and IoT!"
    }
  ];

  const handleSend = (textOverride?: string) => {
    const msgText = textOverride || input;
    if (!msgText.trim()) return;

    const userMessage = msgText.toLowerCase();
    setMessages(prev => [...prev, { role: "user", content: msgText }]);
    if (!textOverride) setInput("");

    setTimeout(() => {
      let botResponse = "";
      
      // Mode-aware personalities
      const prefix = activeMode === "recruiter" ? "💼 [Recruiter Mode]: " : activeMode === "developer" ? "👨‍💻 [Dev Mode]: " : "🎮 [Fun Mode]: ";

      if (userMessage.includes("tour")) {
        startTour();
        return;
      }

      const match = knowledgeBase.find(item => 
        item.keywords.some(keyword => userMessage.includes(keyword))
      );

      if (match) {
        botResponse = prefix + match.answer;
      } else if (userMessage.includes("resume") || userMessage.includes("cv")) {
        botResponse = prefix + "I've got Jeya's resume right here! You can download it by clicking the button in the Hero section, or by asking me to email it to you. It's packed with React and IoT projects! 📄";
      } else if (userMessage.includes("hi") || userMessage.includes("hello") || userMessage.includes("hey")) {
        botResponse = prefix + (activeMode === "fun" ? "Yo! I'm Jeya's bot. Want to see some magic? Ask me anything!" : "Hello! I'm Jeya's professional AI. How can I assist your team today?");
      } else {
        botResponse = prefix + "I'm not 100% sure about that, but I can tell you about Jeya's CodeMagen experience, his SIH win, or his React skills!";
      }

      setMessages(prev => [...prev, { role: "bot", content: botResponse }]);
    }, 600);
  };

  return (
    <>

      {/* Floating Main Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setShowChips(true)}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-28 right-8 z-50 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-[0_0_25px_hsl(180_100%_50%/0.5)] group"
      >
        {isOpen ? <X className="text-primary-foreground" /> : <MessageSquare className="text-primary-foreground group-hover:rotate-12 transition-transform" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(4px)" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="fixed bottom-24 right-8 z-50 w-[340px] max-w-[calc(100vw-2rem)] h-[500px] glass-card border border-primary/20 shadow-3xl flex flex-col overflow-hidden"
          >
            {/* Improved Compact Header */}
            <div className="relative p-3 border-b border-primary/10 bg-primary/5 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
                    <Sparkles size={14} className="text-primary" />
                  </div>
                  <h3 className="text-xs font-bold text-foreground">Jeya Companion</h3>
                </div>
                {/* Close Button - More isolated */}
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all border border-transparent hover:border-primary/20"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Ultra Compact Mode Selector */}
              <div className="flex bg-muted/20 p-0.5 rounded-lg">
                {[
                  { id: "recruiter", icon: UserCheck, label: "Recruiter" },
                  { id: "developer", icon: Terminal, label: "Dev" },
                  { id: "fun", icon: Gamepad2, label: "Fun" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id as any)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1 rounded-md text-[9px] font-mono-label transition-all ${
                      activeMode === mode.id 
                        ? "bg-primary text-primary-foreground shadow-lg" 
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <mode.icon size={10} />
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Area - Compact padding */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3.5 mesh-gradient custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`group relative max-w-[88%] p-3 rounded-xl text-[13px] leading-relaxed shadow-sm ${
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground ml-auto rounded-tr-none" 
                      : "glass-card border border-primary/10 rounded-tl-none bg-black/40"
                  }`}>
                    {msg.content}
                    {(msg.content.toLowerCase().includes("resume") || msg.content.toLowerCase().includes("cv")) && msg.role === "bot" && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2.5 p-2 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                           <Layout size={14} className="text-primary shrink-0" />
                           <span className="text-[9px] font-bold uppercase tracking-wider truncate">Resume.pdf</span>
                        </div>
                        <button 
                          onClick={() => {
                            document.querySelector<HTMLButtonElement>("button[variant='heroOutline']")?.click();
                            toast.success("Downloading...");
                          }}
                          className="px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-[9px] font-bold shrink-0"
                        >
                           Download
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Compact Quick Action Footer */}
            <div className="px-3 py-1.5 border-t border-primary/5 bg-background/40 flex gap-1.5 overflow-x-auto no-scrollbar">
               {[
                 { label: "Start Tour", icon: Play, action: startTour, color: "accent" },
                 { label: "Stack", icon: Layout, action: () => handleSend("Tech stack?"), color: "primary" },
                 { label: "Hire Me", icon: ArrowRight, action: () => handleSend("Hire me"), color: "primary" },
               ].map((action) => (
                 <button 
                   key={action.label}
                   onClick={action.action} 
                   className={`shrink-0 flex items-center gap-1 px-2 py-1 rounded-md bg-${action.color}/10 border border-${action.color}/20 text-${action.color} text-[9px] font-bold hover:bg-${action.color}/20`}
                 >
                    <action.icon size={10} /> {action.label}
                 </button>
               ))}
            </div>

            {/* Input Area - Tighter padding */}
            <div className="p-3 bg-background/95 backdrop-blur-md border-t border-primary/10">
              <div className="flex gap-1.5">
                <button
                  onClick={toggleListening}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                    isListening ? "bg-red-500 text-white animate-pulse" : "bg-muted/30 text-muted-foreground"
                  }`}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-muted/20 border border-primary/5 rounded-lg px-3 py-1.5 text-[13px] focus:outline-none focus:border-primary/40 placeholder:text-muted-foreground/40"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-30 shadow-lg shadow-primary/10"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;

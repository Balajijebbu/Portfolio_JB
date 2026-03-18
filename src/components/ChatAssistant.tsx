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
      {/* Floating Suggestions (Suggestion Chips) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-44 right-8 z-50 flex flex-col items-end gap-2"
          >
            {[
              { label: "🚀 Start Tour", action: () => { startTour(); } },
              { label: "📄 Resume", action: () => { handleSend("Can I see your resume?"); setIsOpen(true); } },
              { label: "💻 Projects", action: () => { document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); } },
            ].map((chip) => (
              <motion.button
                key={chip.label}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={chip.action}
                className="px-4 py-2 rounded-full glass-card border border-primary/20 text-xs font-mono-label text-primary shadow-xl backdrop-blur-md"
              >
                {chip.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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
            initial={{ opacity: 0, y: 100, scale: 0.8, x: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 100, scale: 0.8, x: 20, filter: "blur(10px)" }}
            className="fixed bottom-24 right-8 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] glass-card border border-primary/20 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header with Mode Selector */}
            <div className="p-4 border-b border-primary/10 bg-primary/5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
                    <Sparkles size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Jeya Companion</h3>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <p className="text-[10px] text-primary uppercase font-mono-label tracking-tighter">AI Powered Agent</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Mode Selector */}
              <div className="flex bg-muted/30 p-1 rounded-xl gap-1">
                {[
                  { id: "recruiter", icon: UserCheck, label: "Recruiter" },
                  { id: "developer", icon: Terminal, label: "Dev" },
                  { id: "fun", icon: Gamepad2, label: "Fun" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-[10px] font-mono-label transition-all ${
                      activeMode === mode.id 
                        ? "bg-primary text-primary-foreground shadow-lg" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <mode.icon size={12} />
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 mesh-gradient custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`group relative max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground ml-auto rounded-tr-none" 
                      : "glass-card border border-primary/10 rounded-tl-none"
                  }`}>
                    {msg.content}
                    {(msg.content.toLowerCase().includes("resume") || msg.content.toLowerCase().includes("cv")) && msg.role === "bot" && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-3 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-2">
                           <Layout size={16} className="text-primary" />
                           <span className="text-[10px] font-bold uppercase tracking-wider">Jeya_Resume.pdf</span>
                        </div>
                        <button 
                          onClick={() => toast.info("Resume download started...")}
                          className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold hover:bg-primary/80 transition-all flex items-center gap-1"
                        >
                           <Volume2 size={12} className="rotate-90" /> Download
                        </button>
                      </motion.div>
                    )}
                    {msg.role === "bot" && (
                      <div className="absolute -left-10 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                            <Bot size={14} className="text-primary" />
                         </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Action Footer */}
            <div className="px-4 py-2 border-t border-primary/5 bg-background/20 flex gap-2 overflow-x-auto no-scrollbar">
               <button onClick={startTour} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold hover:bg-accent/20 transition-all">
                  <Play size={10} /> Start Tour
               </button>
               <button onClick={() => handleSend("Tell me about your tech stack")} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold hover:bg-primary/20 transition-all">
                  <Layout size={10} /> Tech Stack
               </button>
               <button onClick={() => handleSend("How can I hire you?")} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold hover:bg-primary/20 transition-all">
                  <ArrowRight size={10} /> Hire Me
               </button>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background/80 backdrop-blur-md border-t border-primary/10">
              <div className="flex gap-2">
                <button
                  onClick={toggleListening}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    isListening ? "bg-red-500 text-white animate-pulse" : "bg-muted/50 text-muted-foreground hover:text-primary"
                  }`}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={isListening ? "Listening..." : "Ask your AI companion..."}
                  className="flex-1 bg-muted/30 border border-primary/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 transition-all"
                >
                  <Send size={18} />
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

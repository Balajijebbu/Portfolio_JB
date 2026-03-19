import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ease = [0.2, 0, 0, 1];

const ContactSection = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const sectionRotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [8, 0, 0, -8]);
  const smoothRotateX = useSpring(sectionRotateX, { damping: 40, stiffness: 120 });
  const bgGlowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 0.5]);

  const copyEmail = () => {
    navigator.clipboard.writeText("jeyabalajichandrasekaran@gmail.com");
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "jeyabalajichandrasekaran@gmail.com", href: "mailto:jeyabalajichandrasekaran@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 9789099336", href: "tel:+919789099336" },
    { icon: MapPin, label: "Location", value: "Namakkal, Tamil Nadu" },
  ];

  const socials = [
    { icon: Github, href: "https://github.com/Balajijebbu", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/jeya-balaji-800397259", label: "LinkedIn" },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden snap-start min-h-screen flex items-center" ref={sectionRef} style={{ perspective: "1400px" }}>
      {/* Background glow with parallax */}
      <motion.div
        style={{ scale: bgGlowScale }}
        className="absolute inset-0 pointer-events-none"
      >
        <div style={{ background: "radial-gradient(ellipse at 50% 100%, hsl(180 100% 50% / 0.06), transparent 60%)" }} className="absolute inset-0" />
        <div style={{ background: "radial-gradient(ellipse at 30% 30%, hsl(270 100% 66% / 0.04), transparent 50%)" }} className="absolute inset-0" />
      </motion.div>

      <motion.div style={{ rotateX: smoothRotateX }} className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <p className="font-mono-label text-primary mb-3">Contact</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Let's Work <span className="text-primary neon-text">Together</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            I'm open to new opportunities and interesting projects. Feel free to reach out.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Info with 3D hover */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease }}
            className="space-y-4"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.02, x: 5, rotateY: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                style={{ transformStyle: "preserve-3d", perspective: 800 }}
                className="glass-card p-5 flex items-center gap-4 group"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:shadow-[0_0_15px_hsl(180_100%_50%/0.3)] transition-shadow"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <item.icon size={18} strokeWidth={1.5} className="text-primary" />
                </motion.div>
                <div style={{ transform: "translateZ(15px)" }}>
                  <p className="font-mono-label text-muted-foreground">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-foreground text-sm hover:text-primary transition-colors break-all">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-foreground text-sm">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            <div className="flex gap-3 pt-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3, rotateZ: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-xl glass-card flex items-center justify-center hover:shadow-[0_0_20px_hsl(180_100%_50%/0.3)] hover:text-primary transition-all duration-300 text-muted-foreground"
                >
                  <s.icon size={20} strokeWidth={1.5} />
                </motion.a>
              ))}
              <motion.button
                onClick={copyEmail}
                whileHover={{ scale: 1.15, y: -3, rotateZ: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-xl glass-card flex items-center justify-center hover:shadow-[0_0_20px_hsl(180_100%_50%/0.3)] hover:text-primary transition-all duration-300 text-muted-foreground"
              >
                {copied ? <Check size={20} strokeWidth={1.5} /> : <Copy size={20} strokeWidth={1.5} />}
              </motion.button>
            </div>
          </motion.div>

          {/* Contact Form with 3D depth */}
          <motion.form
            initial={{ opacity: 0, x: 30, rotateY: -8 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease }}
            whileHover={{ rotateY: 3, scale: 1.01 }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            className="glass-card p-6 space-y-4 relative overflow-hidden"
            onSubmit={(e) => {
              e.preventDefault();
              setFormStatus("submitting");
              setTimeout(() => {
                setFormStatus("success");
                toast.success("Message sent! I'll get back to you soon.");
              }, 1500);
            }}
          >
            <AnimatePresence>
              {formStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-50 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4"
                  >
                    <Check size={32} className="text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground mb-6">Thanks for reaching out. I'll get back to you shortly.</p>
                  <Button variant="outline" size="sm" onClick={() => setFormStatus("idle")}>
                    Send another
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, hsl(180 100% 50% / 0.08), transparent)" }} />

            <div style={{ transform: "translateZ(15px)" }}>
              <label className="font-mono-label text-muted-foreground block mb-2">Name</label>
              <input
                type="text"
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary/50 focus:shadow-[0_0_10px_hsl(180_100%_50%/0.1)] transition-all"
                placeholder="Your name"
              />
            </div>
            <div style={{ transform: "translateZ(12px)" }}>
              <label className="font-mono-label text-muted-foreground block mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary/50 focus:shadow-[0_0_10px_hsl(180_100%_50%/0.1)] transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div style={{ transform: "translateZ(10px)" }}>
              <label className="font-mono-label text-muted-foreground block mb-2">Message</label>
              <textarea
                rows={4}
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary/50 focus:shadow-[0_0_10px_hsl(180_100%_50%/0.1)] transition-all resize-none"
                placeholder="Your message..."
              />
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ transform: "translateZ(20px)" }}>
              <Button variant="hero" size="lg" className="w-full glow-button" type="submit">
                <Send size={16} strokeWidth={1.5} />
                Send Message
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;

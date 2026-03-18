import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ease = [0.2, 0, 0, 1];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

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
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, hsl(180 100% 50% / 0.04), transparent 60%)" }} />

      <div className="container mx-auto px-6" ref={ref}>
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
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease }}
            className="space-y-4"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.02, x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="glass-card p-5 flex items-center gap-4 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:shadow-[0_0_15px_hsl(180_100%_50%/0.3)] transition-shadow"
                >
                  <item.icon size={18} strokeWidth={1.5} className="text-primary" />
                </motion.div>
                <div>
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
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-xl glass-card flex items-center justify-center hover:shadow-[0_0_20px_hsl(180_100%_50%/0.3)] hover:text-primary transition-all duration-300 text-muted-foreground"
                >
                  <s.icon size={20} strokeWidth={1.5} />
                </motion.a>
              ))}
              <motion.button
                onClick={copyEmail}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-xl glass-card flex items-center justify-center hover:shadow-[0_0_20px_hsl(180_100%_50%/0.3)] hover:text-primary transition-all duration-300 text-muted-foreground"
              >
                {copied ? <Check size={20} strokeWidth={1.5} /> : <Copy size={20} strokeWidth={1.5} />}
              </motion.button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease }}
            className="glass-card p-6 space-y-4 relative overflow-hidden"
            onSubmit={(e) => { e.preventDefault(); toast.success("Message sent!"); }}
          >
            {/* Corner glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, hsl(180 100% 50% / 0.08), transparent)" }} />

            <div>
              <label className="font-mono-label text-muted-foreground block mb-2">Name</label>
              <input
                type="text"
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary/50 focus:shadow-[0_0_10px_hsl(180_100%_50%/0.1)] transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="font-mono-label text-muted-foreground block mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary/50 focus:shadow-[0_0_10px_hsl(180_100%_50%/0.1)] transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="font-mono-label text-muted-foreground block mb-2">Message</label>
              <textarea
                rows={4}
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary/50 focus:shadow-[0_0_10px_hsl(180_100%_50%/0.1)] transition-all resize-none"
                placeholder="Your message..."
              />
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="hero" size="lg" className="w-full glow-button" type="submit">
                <Send size={16} strokeWidth={1.5} />
                Send Message
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

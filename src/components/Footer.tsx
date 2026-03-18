import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="py-8 border-t border-border/50">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} <span className="text-primary">Jeya Balaji C K</span>. Built with passion.
      </p>
      <div className="flex gap-4">
        {[
          { icon: Github, href: "https://github.com/Balajijebbu" },
          { icon: Linkedin, href: "https://linkedin.com/in/jeya-balaji-800397259" },
          { icon: Mail, href: "mailto:jeyabalajichandrasekaran@gmail.com" },
        ].map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_8px_hsl(180_100%_50%/0.4)] transition-all duration-300"
          >
            <s.icon size={18} strokeWidth={1.5} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;

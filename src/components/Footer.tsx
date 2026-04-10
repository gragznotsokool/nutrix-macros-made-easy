import { Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <span className="font-display text-3xl text-foreground">
              NUTRI<span className="gradient-text">X</span>
            </span>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Premium supplements with transparent macro information. Macros Made Easy.
            </p>
            <div className="flex gap-4 mt-5">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Products",
              links: [
                { label: "Whey Protein", href: "#" },
                { label: "Pre-Workout", href: "#" },
                { label: "BCAA", href: "#" },
                { label: "Creatine", href: "#" },
                { label: "Vitamins", href: "#" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About Us", href: "#" },
                { label: "Lab Reports", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Contact", href: "#" },
              ],
            },
            {
              title: "Support",
              links: [
                { label: "FAQs", href: "#" },
                { label: "Shipping", href: "#" },
                { label: "Returns", href: "#" },
                { label: "Track Order", href: "#" },
                { label: "Terms & Privacy", href: "/terms-privacy" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-xl text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} NutriX. All rights reserved. Macros Made Easy™
        </div>
      </div>
    </footer>
  );
};

export default Footer;

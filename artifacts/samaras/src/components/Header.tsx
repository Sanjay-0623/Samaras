import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Food Menu", path: "/menu" },
  { name: "Services", path: "/services" },
  { name: "Contact Us", path: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 lg:px-12",
          isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-white/5 py-4" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="relative z-50 group">
            <h1 className="text-3xl font-display font-bold text-white tracking-wider group-hover:text-primary transition-colors">
              SAMARAS
            </h1>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 p-2 text-white hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? <RiCloseLine size={28} /> : <RiMenu3Line size={28} />}
            </motion.div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "text-4xl md:text-6xl font-display font-bold hover:text-primary hover:text-glow transition-all duration-300",
                      location.pathname === link.path ? "text-primary text-glow" : "text-white/80"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 text-center text-muted-foreground"
            >
              <p>123 Samaras Street, Food District, NY</p>
              <p className="mt-2 text-primary font-medium">+1 (555) 123-4567</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

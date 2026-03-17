import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { BsFlower1 } from "react-icons/bs";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Food Menu", path: "/menu" },
  { name: "Services", path: "/services" },
  { name: "Gallery", path: "/gallery" },
  { name: "Reviews", path: "/reviews" },
  { name: "Contact Us", path: "/contact" },
];

const branches = [
  {
    name: "Chikkaballapura",
    phone: "+91 8951454455",
    tel: "tel:+918951454455",
    mapsUrl: "https://maps.app.goo.gl/nZhwxaGPvhtRrkhKA?g_st=iw",
  },
  {
    name: "Bagepalli",
    phone: "+91 9164117733",
    tel: "tel:+919164117733",
    mapsUrl: null,
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12",
          isScrolled ? "bg-[#080808]/85 backdrop-blur-lg border-b border-white/5 py-3" : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* LEFT — logo */}
          <Link to="/" className="relative z-50 flex items-center gap-2.5 group shrink-0">
            {!logoError ? (
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="Samara's Veg"
                className="h-10 w-auto object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex items-center gap-2">
                <BsFlower1 className="text-primary text-2xl group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xl font-display font-bold text-white tracking-wider whitespace-nowrap">
                  SAMARA'S VEG
                </span>
              </div>
            )}
          </Link>

          {/* RIGHT — hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 w-12 h-12 flex flex-col items-center justify-center gap-1.5 focus:outline-none group"
            aria-label="Toggle Menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-[2px] bg-white group-hover:bg-primary transition-colors block"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-[2px] bg-white group-hover:bg-primary transition-colors block"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-[2px] bg-white group-hover:bg-primary transition-colors block"
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[rgba(8,8,8,0.97)] backdrop-blur-2xl flex flex-col"
          >
            {/* Ambient orb */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

            {/* Menu header — logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="relative z-10 px-6 lg:px-12 pt-6 flex items-center"
            >
              {!logoError ? (
                <img
                  src={`${import.meta.env.BASE_URL}logo.png`}
                  alt="Samara's Veg"
                  className="h-9 w-auto object-contain opacity-80"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <BsFlower1 className="text-primary text-xl" />
                  <span className="text-lg font-display font-bold text-white/80 tracking-wider">SAMARA'S VEG</span>
                </div>
              )}
            </motion.div>

            <div className="flex-1 flex items-center max-w-7xl mx-auto w-full px-6 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full relative z-10">

                {/* Nav links */}
                <nav className="flex flex-col justify-center w-full">
                  {navLinks.map((link, i) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: 0.15 + i * 0.08, duration: 0.45, ease: "easeOut" }}
                        className="border-b border-white/10 py-3 last:border-b-0"
                      >
                        <Link to={link.path} className="group relative inline-block overflow-hidden">
                          <span
                            className={cn(
                              "text-[24px] md:text-[32px] lg:text-[44px] font-display font-bold block transition-colors duration-300 leading-tight",
                              isActive ? "text-primary" : "text-white/40 group-hover:text-primary"
                            )}
                          >
                            {link.name}
                          </span>
                          <motion.div
                            className="absolute bottom-0 left-0 w-full h-[3px] bg-primary origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Branch contact panel */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.5 }}
                  className="hidden md:flex flex-col justify-end pb-12"
                >
                  <div className="space-y-7">
                    {branches.map((branch, i) => (
                      <div key={i}>
                        <h3 className="text-white font-bold mb-3 uppercase tracking-[0.2em] text-xs">
                          {branch.name} Branch
                        </h3>
                        <a
                          href={branch.tel}
                          className="flex items-center gap-2.5 text-primary text-xl font-light hover:text-white transition-colors duration-300 mb-2 group"
                        >
                          <FaPhoneAlt className="text-primary/60 text-sm shrink-0 group-hover:text-primary transition-colors" />
                          {branch.phone}
                        </a>
                        {branch.mapsUrl && (
                          <a
                            href={branch.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 text-white/50 text-base font-light hover:text-primary transition-colors duration-300 group"
                          >
                            <FaMapMarkerAlt className="text-primary/60 text-sm shrink-0 group-hover:text-primary transition-colors" />
                            Open in Google Maps ↗
                          </a>
                        )}
                        {i < branches.length - 1 && (
                          <div className="mt-6 h-[1px] w-full bg-white/10" />
                        )}
                      </div>
                    ))}
                    <div>
                      <h3 className="text-white font-bold mb-2 uppercase tracking-[0.2em] text-xs">Hours</h3>
                      <p className="text-white/50 text-base font-light">Mon–Fri: 11am – 10pm</p>
                      <p className="text-white/50 text-base font-light">Sat–Sun: 10am – 11pm</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

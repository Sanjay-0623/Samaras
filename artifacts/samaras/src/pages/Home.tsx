import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaLeaf, FaSeedling, FaFire } from "react-icons/fa";
import { MdTableRestaurant } from "react-icons/md";
import { PiForkKnife } from "react-icons/pi";
import PageTransition from "@/components/PageTransition";

import heroImg1 from "@assets/IMG_6427-1_1773696883206.jpg";
import heroImg2 from "@assets/_DSC1844-59_1773696883212.jpg";
import heroImg3 from "@assets/_DSC1820-53_1773696883236.jpg";
import heroImg4 from "@assets/_DSC1813-50_1773696883248.jpg";
import heroImg5 from "@assets/_DSC1784-42_1773696883285.jpg";

/* ─── STATIC DATA ────────────────────────────────────────── */
const heroSlides = [
  { src: heroImg1, label: "Signature Thali" },
  { src: heroImg2, label: "Rava Dosa" },
  { src: heroImg3, label: "Masala Dosa" },
  { src: heroImg4, label: "Benne Dosa" },
  { src: heroImg5, label: "Gobi Manchurian" },
];

const specialities = [
  {
    icon: FaLeaf,
    title: "Pure Vegetarian",
    description: "100% pure vegetarian cuisine — no meat, no compromise. Every dish is prepared with the highest standards.",
  },
  {
    icon: FaFire,
    title: "Authentic Indian Flavours",
    description: "Traditional recipes passed down through generations, bringing the real taste of India to your table.",
  },
  {
    icon: FaSeedling,
    title: "Fresh Ingredients",
    description: "We source only the freshest seasonal vegetables and spices daily to ensure every bite is full of flavour.",
  },
  {
    icon: MdTableRestaurant,
    title: "Comfortable Dining",
    description: "A warm, welcoming atmosphere perfect for family gatherings, celebrations, and everyday dining.",
  },
];

const signatureDishes = [
  {
    name: "Paneer Butter Masala",
    description: "Soft paneer cubes in a rich, creamy tomato-based gravy with aromatic spices.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Masala Dosa",
    description: "Crispy golden dosa filled with spiced potato stuffing, served with sambar and chutneys.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Veg Biryani",
    description: "Fragrant basmati rice layered with seasonal vegetables and whole spices, slow-cooked to perfection.",
    image: "https://images.unsplash.com/photo-1563379091339-03246963f96c?q=80&w=800&auto=format&fit=crop",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

/* ─── PAGE COMPONENT ─────────────────────────────────────── */
export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const bgY          = useTransform(scrollY, [0, 700], [0, 120]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const largeOrbY    = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const mediumOrbY   = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PageTransition>

      {/* ═══════════════════════════════════════ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-24">

        {/* ── Slideshow background with parallax ── */}
        <motion.div style={{ y: bgY }} className="absolute inset-[-10%] z-0">
          <AnimatePresence mode="sync">
            <motion.img
              key={slideIndex}
              src={heroSlides[slideIndex].src}
              alt={heroSlides[slideIndex].label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: "translateZ(0)" }}
            />
          </AnimatePresence>
        </motion.div>

        {/* ── Overlays ── */}
        <div className="absolute inset-0 z-[1] bg-black/55" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,0,0.16),transparent_52%)]" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,122,0,0.10),transparent_55%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#080808] to-transparent z-[1]" />

        {/* ── Ambient orbs ── */}
        <motion.div
          style={{ y: largeOrbY }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[rgba(255,122,0,0.07)] rounded-full blur-[160px] z-[2] pointer-events-none"
        />
        <motion.div
          style={{ y: mediumOrbY }}
          className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[rgba(255,122,0,0.05)] rounded-full blur-[120px] z-[2] pointer-events-none"
        />

        {/* ── Center content ── */}
        <motion.div
          style={{ y: heroContentY }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-7"
          >
            <span className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-semibold tracking-[0.3em] uppercase backdrop-blur-md">
              Pure Vegetarian · Authentic Indian
            </span>
          </motion.div>

          {/* Restaurant name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
            className="text-[4.2rem] sm:text-[5.5rem] md:text-[7.5rem] lg:text-[9rem] font-display font-bold text-white leading-none tracking-tight mb-4"
          >
            Samara's Veg
          </motion.h1>

          {/* Headline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-2xl font-light text-white/80 tracking-wider mb-3"
          >
            Authentic Indian{" "}
            <span className="text-primary font-normal text-glow">Vegetarian</span>{" "}
            Flavours
          </motion.p>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-sm md:text-base text-white/50 tracking-[0.14em] mb-12 font-light"
          >
            Fresh Ingredients&nbsp;•&nbsp;Traditional Taste&nbsp;•&nbsp;Modern Dining
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto"
          >
            <Link
              to="/menu"
              className="relative px-10 py-4 bg-primary text-white text-sm font-semibold tracking-[0.15em] uppercase rounded-full overflow-hidden
                         hover:scale-[1.04] hover:shadow-[0_0_55px_rgba(255,122,0,0.55),0_0_20px_rgba(255,122,0,0.3)] transition-all duration-300 group"
            >
              <span className="relative z-10">View Menu</span>
              <motion.span
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 bg-transparent border border-white/25 text-white text-sm font-semibold tracking-[0.15em] uppercase rounded-full
                         hover:border-primary/60 hover:bg-primary/8 hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(255,122,0,0.15)] transition-all duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Slide dots ── */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`rounded-full transition-all duration-500 ${
                i === slideIndex
                  ? "w-6 h-2 bg-primary shadow-[0_0_8px_rgba(255,122,0,0.7)]"
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-[1px] h-[60px] bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </section>

      {/* ═══════════════════════════ ABOUT ═══ */}
      <section className="py-32 px-6 lg:px-12 relative bg-[#080808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden relative group">
              <img
                src="https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=800&auto=format&fit=crop"
                alt="Indian vegetarian thali"
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                style={{ transform: "translateZ(0)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent z-10" />
              <div className="absolute bottom-8 left-8 z-20 glass-panel p-5 rounded-2xl flex items-center gap-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary shrink-0">
                  <PiForkKnife size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm tracking-wider uppercase">100% Pure Veg</h4>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_2px,transparent_2px)] bg-[length:20px_20px] -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-primary font-bold tracking-[0.3em] uppercase mb-4 text-xs">Our Story</h2>
            <h3 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Welcome to Samara's Veg
            </h3>
            <div className="space-y-6 text-white/60 text-lg leading-[1.9] mb-10">
              <p>
                At Samara's Veg, we celebrate the richness of Indian vegetarian cuisine. Our kitchen is dedicated to serving authentic dishes rooted in tradition — every recipe crafted with love, fresh ingredients, and the finest spices sourced directly from Indian farms.
              </p>
              <p>
                From the creamy indulgence of Paneer Butter Masala to the crispy perfection of Masala Dosa, our menu is a journey through India's diverse culinary heritage. We welcome you to experience the warmth of true Indian hospitality.
              </p>
            </div>
            <div className="h-[1px] w-full bg-white/10 mb-8" />
            <div className="flex flex-col sm:flex-row gap-12">
              <div>
                <h4 className="text-primary font-bold text-2xl mb-1">100%</h4>
                <p className="text-white/50 text-sm uppercase tracking-wider">Pure Vegetarian</p>
              </div>
              <div>
                <h4 className="text-primary font-bold text-2xl mb-1">50+</h4>
                <p className="text-white/50 text-sm uppercase tracking-wider">Authentic Dishes</p>
              </div>
              <div>
                <h4 className="text-primary font-bold text-2xl mb-1">Fresh</h4>
                <p className="text-white/50 text-sm uppercase tracking-wider">Daily Ingredients</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ OUR SPECIALITY ═══ */}
      <section className="py-32 px-6 lg:px-12 bg-[#080808] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.05),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-primary font-bold tracking-[0.3em] uppercase mb-4 text-xs"
            >
              Why Choose Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-bold text-white leading-tight"
            >
              Our Speciality
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialities.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="glass-panel p-8 text-center group relative overflow-hidden flex flex-col items-center"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
                <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-400 relative z-10">
                  <item.icon className="w-9 h-9 text-primary group-hover:scale-110 transition-transform duration-400" />
                </div>
                <h3 className="text-white font-display font-bold text-xl mb-3 relative z-10">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed font-light relative z-10">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SIGNATURE DISHES ═══ */}
      <section className="py-32 px-6 lg:px-12 bg-[#080808] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-primary font-bold tracking-[0.3em] uppercase mb-4 text-xs"
            >
              Must Try
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-bold text-white leading-tight"
            >
              Signature Dishes
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {signatureDishes.map((dish, i) => (
              <motion.div
                key={dish.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="glass-panel group overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                    style={{ transform: "translateZ(0)" }}
                  />
                </div>
                <div className="p-8 relative">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300 relative z-10">
                    {dish.name}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed font-light relative z-10">{dish.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-14"
          >
            <Link
              to="/menu"
              className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white text-sm font-semibold tracking-[0.15em] uppercase rounded-full hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,122,0,0.5)] transition-all duration-300"
            >
              Explore Full Menu →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ SERVING LOCATION ═══ */}
      <section className="py-32 px-6 lg:px-12 bg-[#080808] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-primary font-bold tracking-[0.3em] uppercase mb-4 text-xs">Find Us</h2>
            <h3 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">Serving At</h3>
            <p className="text-white/60 mb-16 text-lg font-light">Come visit us and enjoy an authentic Indian vegetarian experience.</p>

            <a
              href="https://maps.app.goo.gl/nZhwxaGPvhtRrkhKA?g_st=iw"
              target="_blank"
              rel="noopener noreferrer"
              className="group block mx-auto max-w-2xl"
            >
              <div className="glass-panel p-10 md:p-16 hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
                <motion.div
                  className="w-24 h-24 mx-auto bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mb-8 relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/20 rounded-full"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <FaMapMarkerAlt className="text-primary w-8 h-8 relative z-10" />
                </motion.div>
                <h4 className="text-3xl font-display font-bold text-white mb-4">Samara's Veg</h4>
                <p className="text-white/60 text-xl mb-8 font-light">Click to open location in Google Maps</p>
                <span className="inline-flex items-center text-primary text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                  Open in Google Maps
                  <motion.span className="ml-2 inline-block" initial={{ x: 0 }} whileHover={{ x: 5 }}>→</motion.span>
                </span>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes shimmer { 100% { transform: translateX(200%); } }
      `}</style>
    </PageTransition>
  );
}

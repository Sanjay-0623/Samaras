import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PiForkKnife } from "react-icons/pi";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const largeOrbY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const mediumOrbY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const headlineText = "Authentic Taste. Modern Experience.";
  const words = headlineText.split(" ");
  
  return (
    <PageTransition>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-24">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 bg-[#080808]">
          <div className="absolute inset-0 bg-black/35 z-10" />
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Samaras ambient background" 
            className="w-full h-full object-cover"
          />
          {/* Layered Gradients */}
          <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,0,0.12),transparent_50%)]" />
          <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,122,0,0.06),transparent_50%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#080808] to-transparent z-10" />
        </div>

        {/* 3D Floating Shapes */}
        <motion.div 
          style={{ y: largeOrbY }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[rgba(255,122,0,0.08)] rounded-full blur-[160px] z-0 pointer-events-none"
        />
        <motion.div 
          style={{ y: mediumOrbY }}
          className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[rgba(255,122,0,0.06)] rounded-full blur-[120px] z-0 pointer-events-none"
        />
        <motion.div 
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[rgba(255,122,0,0.1)] rounded-full blur-[80px] z-0 pointer-events-none"
        />

        <motion.div 
          style={{ y: heroContentY }}
          className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-semibold tracking-[0.3em] uppercase backdrop-blur-md">
              Est. 2010 · Fine Dining
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[7rem] md:text-[10rem] lg:text-[13rem] font-display font-bold text-white mb-4 leading-none tracking-tight"
          >
            Samaras
          </motion.h1>

          <div className="text-xl md:text-2xl font-light text-white/70 tracking-wider mb-12 flex flex-wrap justify-center gap-x-2">
            {words.map((word, i) => {
              const isHighlight = word === "Taste." || word === "Experience.";
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: "easeOut" }}
                  className={isHighlight ? "text-primary text-glow font-normal" : ""}
                >
                  {word}
                </motion.span>
              );
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto"
          >
            <Link 
              to="/menu" 
              className="px-10 py-4 bg-primary text-white text-sm font-semibold tracking-[0.15em] uppercase rounded-full hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,122,0,0.5)] transition-all duration-300"
            >
              View Menu
            </Link>
            <Link 
              to="/contact" 
              className="px-10 py-4 bg-transparent border border-white/20 text-white text-sm font-semibold tracking-[0.15em] uppercase rounded-full hover:border-white/50 hover:bg-white/5 transition-all duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-[1px] h-[60px] bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </section>

      {/* 2. ABOUT SAMARAS */}
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
                src={`${import.meta.env.BASE_URL}images/about-img.png`}
                alt="Samaras Interior"
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                style={{ transform: "translateZ(0)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent z-10" />
              
              <div className="absolute bottom-8 left-8 z-20 glass-panel p-5 rounded-2xl flex items-center gap-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary shrink-0">
                  <PiForkKnife size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm tracking-wider uppercase">Since 2010</h4>
                </div>
              </div>
            </div>
            
            {/* Decorative dot grid */}
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
              A Symphony of Flavors
            </h3>
            <div className="space-y-6 text-white/60 text-lg leading-[1.9] mb-10">
              <p>
                At Samaras, we believe that dining is more than just eating—it's a journey. Founded on the principles of authenticity and innovation, our kitchen bridges the gap between traditional recipes and contemporary culinary techniques.
              </p>
              <p>
                Every dish tells a story, crafted with locally sourced ingredients and a passion for excellence. Our warm, luxurious ambiance provides the perfect backdrop for unforgettable moments with family and friends.
              </p>
            </div>
            
            <div className="h-[1px] w-full bg-white/10 mb-8" />
            
            <div className="flex flex-col sm:flex-row gap-12">
              <div>
                <h4 className="text-primary font-bold text-2xl mb-1">15 Years</h4>
                <p className="text-white/50 text-sm uppercase tracking-wider">of Excellence</p>
              </div>
              <div>
                <h4 className="text-primary font-bold text-2xl mb-1">200+</h4>
                <p className="text-white/50 text-sm uppercase tracking-wider">Menu Items</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. SERVING LOCATION */}
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
            <h3 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
              Serving At
            </h3>
            <p className="text-white/60 mb-16 text-lg">Experience our flagship location in the heart of the city.</p>

            <a 
              href="https://maps.google.com/?q=Samaras+Restaurant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block mx-auto max-w-2xl"
            >
              <div className="glass-panel p-10 md:p-16 hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
                {/* Shimmer effect */}
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

                <h4 className="text-3xl font-display font-bold text-white mb-4">Samaras Flagship</h4>
                <p className="text-white/60 text-xl mb-8 font-light">123 Samaras Street, Food District<br />New York, NY 10001</p>
                
                <span className="inline-flex items-center text-primary text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                  Open in Google Maps 
                  <motion.span 
                    className="ml-2 inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >→</motion.span>
                </span>
              </div>
            </a>
          </motion.div>
        </div>
      </section>
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </PageTransition>
  );
}
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PiForkKnife } from "react-icons/pi";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const headlineText = "Authentic Taste. Modern Experience.";
  
  return (
    <PageTransition>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden -mt-24">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background z-10" />
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Samaras ambient background" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        {/* 3D Floating Shapes */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[80px] z-0"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] z-0"
        />

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-block"
          >
            <span className="px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-widest uppercase backdrop-blur-md">
              Welcome to
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight"
          >
            <span className="text-primary text-glow">Samaras</span>
          </motion.h1>

          <div className="text-3xl md:text-5xl font-display text-white/90 mb-10 overflow-hidden flex flex-wrap justify-center gap-x-3">
            {headlineText.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6, type: "spring" }}
                className={word === "Taste." || word === "Experience." ? "text-primary" : ""}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto"
          >
            <Link 
              to="/menu" 
              className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 box-glow transition-all duration-300 hover:-translate-y-1 text-lg"
            >
              View Menu
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-transparent border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 text-lg"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* 2. ABOUT SAMARAS */}
      <section className="py-24 px-6 lg:px-12 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay" />
              <img 
                src={`${import.meta.env.BASE_URL}images/about-img.png`}
                alt="Samaras Interior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              
              <div className="absolute bottom-8 left-8 right-8 z-20 glass-panel p-6 rounded-2xl flex items-center gap-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shrink-0">
                  <PiForkKnife size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white">Award Winning</h4>
                  <p className="text-sm text-white/70">Culinary Excellence</p>
                </div>
              </div>
            </div>
            
            {/* Decorative dot grid */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.3)_2px,transparent_2px)] bg-[length:16px_16px] -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-primary font-medium tracking-widest uppercase mb-4 text-sm">Our Story</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
              A Symphony of Flavors Since 2010
            </h3>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                At Samaras, we believe that dining is more than just eating—it's a journey. Founded on the principles of authenticity and innovation, our kitchen bridges the gap between traditional recipes and contemporary culinary techniques.
              </p>
              <p>
                Every dish tells a story, crafted with locally sourced ingredients and a passion for excellence. Our warm, luxurious ambiance provides the perfect backdrop for unforgettable moments with family and friends.
              </p>
            </div>
            <div className="mt-10">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/f6/Signature_placeholder.svg" 
                alt="Chef Signature" 
                className="h-12 opacity-50 invert"
                style={{ filter: 'invert(1) sepia(1) saturate(5) hue-rotate(175deg)' }} // tint to match
              />
              <p className="mt-2 text-sm text-white font-medium uppercase tracking-wider">Executive Chef</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. SERVING LOCATION */}
      <section className="py-24 px-6 lg:px-12 bg-card/30 border-y border-white/5 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-primary font-medium tracking-widest uppercase mb-4 text-sm">Find Us</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-12">
              Serving At
            </h3>

            <a 
              href="https://maps.google.com/?q=Samaras+Restaurant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="glass-panel rounded-3xl p-8 md:p-12 hover:bg-white/5 hover:border-primary/50 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <motion.div 
                  className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-6 relative"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-primary/30 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <FaMapMarkerAlt className="text-primary w-8 h-8 relative z-10" />
                </motion.div>

                <h4 className="text-2xl font-bold text-white mb-2">Samaras Flagship</h4>
                <p className="text-muted-foreground text-lg mb-6">123 Samaras Street, Food District<br />New York, NY 10001</p>
                
                <span className="inline-flex items-center text-primary font-bold group-hover:translate-x-2 transition-transform">
                  Open in Google Maps 
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              </div>
            </a>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}

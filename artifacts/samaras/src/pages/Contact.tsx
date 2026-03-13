import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import PageTransition from "@/components/PageTransition";

export default function Contact() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold text-white mb-6"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            We'd love to hear from you. Reserve a table, ask about our menu, or simply say hello.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
            
            <div className="flex items-start gap-6 bg-card/50 p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                <FaPhoneAlt className="text-primary text-xl" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                <p className="text-sm text-muted-foreground mt-1">Mon-Sun, 10am - 11pm</p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-card/50 p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                <FaEnvelope className="text-primary text-xl" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Email</h3>
                <p className="text-muted-foreground">hello@samaras.com</p>
                <p className="text-sm text-muted-foreground mt-1">We'll reply within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-card/50 p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                <FaMapMarkerAlt className="text-primary text-xl" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Address</h3>
                <p className="text-muted-foreground">123 Samaras Street, Food District</p>
                <p className="text-muted-foreground">New York, NY 10001</p>
                <a 
                  href="https://maps.google.com/?q=Samaras+Restaurant" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary text-sm font-medium mt-2 inline-block hover:underline"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Big WhatsApp CTA */}
            <a 
              href="https://wa.me/15551234567" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block mt-8"
            >
              <div className="bg-[#25D366]/10 border border-[#25D366]/30 p-6 rounded-2xl flex items-center justify-between hover:bg-[#25D366]/20 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <FaWhatsapp className="text-[#25D366] text-3xl" />
                  <div>
                    <h3 className="text-white font-bold">Chat on WhatsApp</h3>
                    <p className="text-[#25D366] text-sm">Instant replies</p>
                  </div>
                </div>
                <span className="text-[#25D366] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-card p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] pointer-events-none rounded-full" />
              
              <h2 className="text-2xl font-bold text-white mb-8 relative z-10">Send a Message</h2>
              
              <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">First Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Subject</label>
                  <select className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none">
                    <option value="reservation">Table Reservation</option>
                    <option value="catering">Catering Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary text-white font-bold rounded-xl px-4 py-4 hover:bg-primary/90 transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(255,122,0,0.5)] active:translate-y-0"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}

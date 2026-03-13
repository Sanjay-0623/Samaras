import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import PageTransition from "@/components/PageTransition";

export default function Contact() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative">
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold text-white mb-6 pt-12"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-2xl mx-auto font-light"
          >
            We'd love to hear from you. Reserve a table, ask about our menu, or simply say hello.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-display font-bold text-white mb-8">Contact Information</h2>

            {/* Phone */}
            <a href="tel:+918951454455" className="glass-panel p-6 flex items-center gap-6 hover:translate-x-1 hover:border-primary/40 transition-all duration-300 group block">
              <div className="w-[60px] h-[60px] bg-primary/15 border border-primary/20 rounded-full flex items-center justify-center shrink-0 group-hover:shadow-[0_0_20px_rgba(255,122,0,0.3)] transition-shadow">
                <FaPhoneAlt className="text-primary text-xl" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1 text-lg">Phone</h3>
                <p className="text-white/60 font-light">+91 89514 54455</p>
                <p className="text-sm text-white/40 mt-1">Mon–Sun, 10am – 11pm</p>
              </div>
            </a>

            {/* Email */}
            <div className="glass-panel p-6 flex items-center gap-6 hover:translate-x-1 hover:border-primary/40 transition-all duration-300 group">
              <div className="w-[60px] h-[60px] bg-primary/15 border border-primary/20 rounded-full flex items-center justify-center shrink-0 group-hover:shadow-[0_0_20px_rgba(255,122,0,0.3)] transition-shadow">
                <FaEnvelope className="text-primary text-xl" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1 text-lg">Email</h3>
                <p className="text-white/60 font-light">hello@samarasveg.com</p>
                <p className="text-sm text-white/40 mt-1">We'll reply within 24 hours</p>
              </div>
            </div>

            {/* Address */}
            <a
              href="https://maps.app.goo.gl/nZhwxaGPvhtRrkhKA?g_st=iw"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-6 flex items-center gap-6 hover:translate-x-1 hover:border-primary/40 transition-all duration-300 group block"
            >
              <div className="w-[60px] h-[60px] bg-primary/15 border border-primary/20 rounded-full flex items-center justify-center shrink-0 group-hover:shadow-[0_0_20px_rgba(255,122,0,0.3)] transition-shadow">
                <FaMapMarkerAlt className="text-primary text-xl" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1 text-lg">Address</h3>
                <p className="text-white/60 font-light">Samara's Veg Restaurant</p>
                <span className="text-primary text-sm font-bold uppercase tracking-wider mt-2 inline-block group-hover:text-white transition-colors">
                  Open in Google Maps →
                </span>
              </div>
            </a>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/918951454455"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-10"
            >
              <div className="bg-[#25D366]/8 border border-[#25D366]/25 p-8 rounded-[24px] flex items-center justify-between hover:bg-[#25D366]/15 hover:border-[#25D366]/40 transition-all duration-300 group backdrop-blur-md">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-[#25D366]/20 rounded-full flex items-center justify-center shrink-0">
                    <FaWhatsapp className="text-[#25D366] text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">Chat on WhatsApp</h3>
                    <p className="text-[#25D366] text-sm uppercase tracking-wider font-semibold">+91 89514 54455</p>
                  </div>
                </div>
                <span className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white font-bold group-hover:translate-x-2 transition-transform shadow-[0_0_20px_rgba(37,211,102,0.4)]">
                  →
                </span>
              </div>
            </a>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] pointer-events-none rounded-full" />
              <h2 className="text-3xl font-display font-bold text-white mb-8 relative z-10">Send a Message</h2>

              <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wider uppercase text-white/50">First Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all font-light" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wider uppercase text-white/50">Last Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all font-light" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-wider uppercase text-white/50">Phone</label>
                  <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all font-light" placeholder="+91 XXXXX XXXXX" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-wider uppercase text-white/50">Subject</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all appearance-none font-light">
                    <option value="reservation" className="bg-[#181818]">Table Reservation</option>
                    <option value="catering" className="bg-[#181818]">Catering Inquiry</option>
                    <option value="takeaway" className="bg-[#181818]">Takeaway Order</option>
                    <option value="feedback" className="bg-[#181818]">Feedback</option>
                    <option value="other" className="bg-[#181818]">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-wider uppercase text-white/50">Message</label>
                  <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all resize-none font-light" placeholder="How can we help you?"></textarea>
                </div>

                <button type="submit" className="w-full bg-primary text-white font-bold tracking-[0.15em] uppercase text-sm rounded-xl px-4 py-5 hover:bg-primary/90 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(255,122,0,0.6)] active:translate-y-0 mt-4">
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

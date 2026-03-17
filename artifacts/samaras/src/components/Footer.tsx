import { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { BsFlower1 } from "react-icons/bs";

export default function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-[#080808] pt-16 pb-8 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">

        {/* Brand column */}
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-5 group w-fit">
            {!logoError ? (
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="Samara's Veg"
                className="h-10 w-auto object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex items-center gap-2">
                <BsFlower1 className="text-primary text-xl group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xl font-display font-bold text-white tracking-wider">SAMARA'S VEG</span>
              </div>
            )}
          </Link>
          <p className="text-white/50 max-w-sm mb-6 italic font-light text-sm">
            "Where every meal becomes a memory."
          </p>
          <div className="flex gap-3">
            <a
              href="https://wa.me/918951454455"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#25D366] hover:border-[#25D366] hover:scale-110 transition-all duration-300 ease-out"
            >
              <FaWhatsapp size={16} />
            </a>
            <a
              href="https://www.instagram.com/samarasveg?igsh=NHNhcjRnd29obzFh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300 ease-out"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://www.facebook.com/share/18AnVPJqBA/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300 ease-out"
            >
              <FaFacebookF size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base font-display font-bold text-white mb-6">Quick Links</h3>
          <ul className="space-y-4">
            {[
              { label: "Home", to: "/" },
              { label: "Menu", to: "/menu" },
              { label: "Services", to: "/services" },
              { label: "Reviews", to: "/reviews" },
              { label: "Contact Us", to: "/contact" },
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-white/50 hover:text-primary transition-colors flex items-center gap-2 duration-300 font-light text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-base font-display font-bold text-white mb-6">Opening Hours</h3>
          <ul className="space-y-4 text-white/50 font-light text-sm">
            <li className="flex justify-between items-center gap-2">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#25D366] shrink-0" />
                Mon – Fri:
              </span>
              <span className="text-white">11am – 10pm</span>
            </li>
            <li className="flex justify-between gap-2">
              <span className="pl-4">Saturday:</span>
              <span className="text-white">10am – 11pm</span>
            </li>
            <li className="flex justify-between gap-2">
              <span className="pl-4">Sunday:</span>
              <span className="text-white">10am – 9pm</span>
            </li>
          </ul>
        </div>

        {/* Branch Contact */}
        <div>
          <h3 className="text-base font-display font-bold text-white mb-6">Contact</h3>
          <div className="space-y-5">

            {/* Chikkaballapura */}
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Chikkaballapura</p>
              <a href="tel:+918951454455" className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors duration-300 text-sm font-light mb-1.5 group">
                <FaPhoneAlt className="text-primary/60 text-xs shrink-0 group-hover:text-primary transition-colors" />
                +91 8951454455
              </a>
              <a
                href="https://maps.app.goo.gl/gtABD36duSbhTRT28?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors duration-300 text-sm font-light group"
              >
                <FaMapMarkerAlt className="text-primary/60 text-xs shrink-0 group-hover:text-primary transition-colors" />
                FP2P+M9C, Chikkaballapur, Karnataka 562101
              </a>
            </div>

            <div className="w-full h-[1px] bg-white/8" />

            {/* Bagepalli */}
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Bagepalli</p>
              <a href="tel:+919164117733" className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors duration-300 text-sm font-light mb-1.5 group">
                <FaPhoneAlt className="text-primary/60 text-xs shrink-0 group-hover:text-primary transition-colors" />
                +91 9164117733
              </a>
              <a
                href="https://share.google/PHvX6mZyHGcqLZRph"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors duration-300 text-sm font-light group"
              >
                <FaMapMarkerAlt className="text-primary/60 text-xs shrink-0 group-hover:text-primary transition-colors" />
                Toll plaza, NH7, Bagepalli, Karnataka 561207
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-sm text-white/40 font-light">
          © {new Date().getFullYear()} Samara's Veg Restaurant. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-white/40">
          <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { BsFlower1 } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-[#080808] pt-16 pb-8 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-3 mb-4 group w-fit">
            <BsFlower1 className="text-primary text-2xl group-hover:scale-110 transition-transform duration-300" />
            <h2 className="text-3xl font-display font-bold text-white tracking-wider">SAMARA'S VEG</h2>
          </Link>
          <p className="text-white/50 max-w-sm mb-6 italic font-light">
            "Where every meal becomes a memory."
          </p>
          <div className="flex gap-4">
            {[FaInstagram, FaFacebookF, FaTwitter].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300 ease-out">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-white mb-6">Quick Links</h3>
          <ul className="space-y-4">
            {[
              { label: "Home", to: "/" },
              { label: "Menu", to: "/menu" },
              { label: "Services", to: "/services" },
              { label: "Reviews", to: "/reviews" },
              { label: "Contact Us", to: "/contact" },
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-white/50 hover:text-primary transition-colors flex items-center gap-2 duration-300 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-white mb-6">Opening Hours</h3>
          <ul className="space-y-4 text-white/50 font-light">
            <li className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                Mon – Fri:
              </span>
              <span className="text-white">11:00 AM – 10:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span className="pl-4">Saturday:</span>
              <span className="text-white">10:00 AM – 11:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span className="pl-4">Sunday:</span>
              <span className="text-white">10:00 AM – 09:00 PM</span>
            </li>
          </ul>
          <div className="mt-8">
            <a href="tel:+918951454455" className="text-primary font-semibold text-lg hover:text-white transition-colors duration-300">
              +91 89514 54455
            </a>
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

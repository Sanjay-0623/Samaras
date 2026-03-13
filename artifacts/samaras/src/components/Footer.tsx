import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t-2 border-primary pt-16 pb-8 px-6 lg:px-12 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <Link to="/">
            <h2 className="text-3xl font-display font-bold text-white tracking-wider mb-4">SAMARAS</h2>
          </Link>
          <p className="text-muted-foreground max-w-sm mb-6">
            Authentic taste meets modern experience. We bring you the finest culinary delights crafted with passion and precision.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300">
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
          <ul className="space-y-4">
            {["Home", "Menu", "Services", "Contact Us"].map((item) => (
              <li key={item}>
                <Link 
                  to={item === "Home" ? "/" : item === "Contact Us" ? "/contact" : `/${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-6">Opening Hours</h3>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex justify-between">
              <span>Mon - Fri:</span>
              <span className="text-white">11:00 AM - 10:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday:</span>
              <span className="text-white">10:00 AM - 11:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday:</span>
              <span className="text-white">10:00 AM - 09:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Samaras Restaurant. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

import { FaWhatsapp } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const branches = [
  {
    label: "Samara's Veg – Branch 1",
    number: "918951454455",
    available: true,
  },
  {
    label: "Samara's Veg – Branch 2",
    number: "919876543210",
    available: true,
  },
  {
    label: "Samara's Veg – Branch 3",
    number: "",
    available: false,
    tag: "Coming Soon",
  },
];

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Branch popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="w-72 rounded-2xl border border-white/10 bg-[#111]/90 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.7)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#25D366]/15 rounded-full flex items-center justify-center">
                  <FaWhatsapp className="text-[#25D366]" size={16} />
                </div>
                <p className="text-white font-semibold text-sm">Select a Branch</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/6 hover:bg-white/12 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <MdClose size={15} />
              </button>
            </div>

            {/* Branch list */}
            <div className="p-3 space-y-1.5">
              {branches.map((branch, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.07, duration: 0.3 }}
                >
                  {branch.available ? (
                    <a
                      href={`https://wa.me/${branch.number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-[#25D366]/10 hover:border-[#25D366]/25 border border-transparent transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 bg-[#25D366]/15 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/25 transition-colors">
                        <FaWhatsapp className="text-[#25D366]" size={15} />
                      </div>
                      <span className="text-white/80 group-hover:text-white text-sm font-medium transition-colors leading-tight">
                        {branch.label}
                      </span>
                      <span className="ml-auto text-white/25 group-hover:text-[#25D366]/70 transition-colors text-xs">→</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-transparent opacity-45 cursor-not-allowed">
                      <div className="w-8 h-8 bg-white/6 rounded-full flex items-center justify-center shrink-0">
                        <FaWhatsapp className="text-white/30" size={15} />
                      </div>
                      <span className="text-white/40 text-sm font-medium leading-tight">{branch.label}</span>
                      <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-[#FF7A00]/70 bg-[#FF7A00]/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {branch.tag}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="px-5 pb-4 pt-1">
              <p className="text-white/25 text-[11px] text-center">We typically reply within minutes</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-[60px] h-[60px] bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-shadow"
        style={{ transform: "translateZ(0)" }}
        aria-label="Contact us on WhatsApp"
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#25D366]"
          animate={{ scale: [1, 1.8, 2], opacity: [0.8, 0, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 2.5 }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#25D366]"
          animate={{ scale: [1, 1.8, 2], opacity: [0.8, 0, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 3 }}
        />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MdClose className="w-7 h-7 relative z-10" />
            </motion.span>
          ) : (
            <motion.span key="whatsapp" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <FaWhatsapp className="w-8 h-8 relative z-10" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

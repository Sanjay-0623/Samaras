import { FaWhatsapp, FaInstagram, FaFacebookF, FaEnvelope } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

/* ─── BRANCH DATA ─────────────────────────────────────────── */
const waBranches = [
  { name: "Chikkaballapura", phone: "+91 8951454455", url: "https://wa.me/918951454455" },
  { name: "Bagepalli",       phone: "+91 9164117733", url: "https://wa.me/919164117733" },
];

const emailBranches = [
  {
    name: "Chikkaballapura",
    email: "Chikkaballapur@gmail.com",
    url: "mailto:Chikkaballapur@gmail.com?subject=Inquiry%20-%20Samara's%20Veg%20Chikkaballapura",
  },
  {
    name: "Bagepalli",
    email: "Bagepalli@samarasveg.com",
    url: "mailto:Bagepalli@samarasveg.com?subject=Inquiry%20-%20Samara's%20Veg%20Bagepalli",
  },
];

/* ─── SPEED-DIAL ACTIONS ──────────────────────────────────── */
const speedDial = [
  { id: "facebook",  label: "Facebook",  Icon: FaFacebookF,  color: "bg-[#1877F2]", href: "https://www.facebook.com/share/18AnVPJqBA/" },
  { id: "instagram", label: "Instagram", Icon: FaInstagram,  color: "bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888]", href: "https://www.instagram.com/samarasveg?igsh=NHNhcjRnd29obzFh" },
  { id: "email",     label: "Email",     Icon: FaEnvelope,   color: "bg-primary",   href: null },
  { id: "whatsapp",  label: "WhatsApp",  Icon: FaWhatsapp,   color: "bg-[#25D366]", href: null },
];

/* ─── BRANCH POPUP ────────────────────────────────────────── */
type PopupType = "whatsapp" | "email" | null;

interface BranchPopupProps {
  type: PopupType;
  onClose: () => void;
}

function BranchPopup({ type, onClose }: BranchPopupProps) {
  if (!type) return null;

  const isWa = type === "whatsapp";
  const branches = isWa ? waBranches : emailBranches;
  const Icon = isWa ? FaWhatsapp : FaEnvelope;
  const iconColor = isWa ? "text-[#25D366]" : "text-primary";
  const hoverColor = isWa ? "hover:bg-[#25D366]/10 hover:border-[#25D366]/25" : "hover:bg-primary/10 hover:border-primary/25";
  const sublabelHover = isWa ? "group-hover:text-[#25D366]/70" : "group-hover:text-primary/70";
  const bgIcon = isWa ? "bg-[#25D366]/15 group-hover:bg-[#25D366]/25" : "bg-primary/15 group-hover:bg-primary/25";
  const title = isWa ? "Select a Branch" : "Email a Branch";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.94 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="w-72 rounded-2xl border border-white/10 bg-[#111]/95 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.7)] overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 ${isWa ? "bg-[#25D366]/15" : "bg-primary/15"} rounded-full flex items-center justify-center`}>
            <Icon className={iconColor} size={15} />
          </div>
          <p className="text-white font-semibold text-sm">{title}</p>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white/6 hover:bg-white/12 flex items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          <MdClose size={15} />
        </button>
      </div>

      <div className="p-3 space-y-1.5">
        {branches.map((branch, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.06, duration: 0.28 }}
          >
            <a
              href={branch.url}
              target={isWa ? "_blank" : undefined}
              rel={isWa ? "noopener noreferrer" : undefined}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border border-transparent ${hoverColor} transition-all duration-200 group`}
            >
              <div className={`w-8 h-8 ${bgIcon} rounded-full flex items-center justify-center shrink-0 transition-colors`}>
                <Icon className={iconColor} size={14} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white/85 group-hover:text-white text-sm font-medium transition-colors leading-tight">
                  {branch.name}
                </span>
                <span className={`text-white/35 text-[11px] ${sublabelHover} transition-colors mt-0.5 truncate`}>
                  {"email" in branch ? branch.email : branch.phone}
                </span>
              </div>
              <span className="ml-auto text-white/25 group-hover:text-white/60 transition-colors text-xs shrink-0">→</span>
            </a>
          </motion.div>
        ))}
      </div>

      <div className="px-5 pb-4 pt-1">
        <p className="text-white/25 text-[11px] text-center">
          {isWa ? "We typically reply within minutes" : "We'll respond within 24 hours"}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── MAIN WIDGET ─────────────────────────────────────────── */
export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [popup, setPopup] = useState<PopupType>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setPopup(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDialClick = (item: typeof speedDial[0]) => {
    if (item.id === "whatsapp") {
      setPopup(popup === "whatsapp" ? null : "whatsapp");
    } else if (item.id === "email") {
      setPopup(popup === "email" ? null : "email");
    } else if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      setIsOpen(false);
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (isOpen) setPopup(null);
  };

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Branch popup (WhatsApp or Email) */}
      <AnimatePresence>
        {popup && (
          <div className="mb-1">
            <BranchPopup type={popup} onClose={() => setPopup(null)} />
          </div>
        )}
      </AnimatePresence>

      {/* Speed-dial buttons */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end gap-2.5">
            {speedDial.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.7 }}
                transition={{ duration: 0.22, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] }}
                className="flex items-center gap-3"
              >
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: i * 0.05 + 0.05 }}
                  className="text-white text-xs font-semibold tracking-wider bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
                <button
                  onClick={() => handleDialClick(item)}
                  className={`w-11 h-11 ${item.color} text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200`}
                  aria-label={item.label}
                >
                  <item.Icon size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        onClick={toggleOpen}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-[60px] h-[60px] bg-primary text-white rounded-full shadow-lg shadow-primary/30 hover:shadow-[0_0_30px_rgba(255,122,0,0.6)] transition-shadow"
        style={{ transform: "translateZ(0)" }}
        aria-label="Contact us"
      >
        {/* Pulse rings */}
        {!isOpen && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
              animate={{ scale: [1, 1.8, 2], opacity: [0.7, 0, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 2 }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
              animate={{ scale: [1, 1.8, 2], opacity: [0.7, 0, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 2.6 }}
            />
          </>
        )}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MdClose className="w-7 h-7" />
            </motion.span>
          ) : (
            <motion.span key="phone" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="flex items-center justify-center w-7 h-7">
              <img
                src={`${import.meta.env.BASE_URL}phone-icon.jpg`}
                alt="Contact"
                className="w-full h-full object-contain"
                style={{ mixBlendMode: "screen" }}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

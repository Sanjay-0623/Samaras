import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transform: "translateZ(0)" }}
    >
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="mr-4 glass-panel px-4 py-2 text-sm font-medium text-white shadow-lg pointer-events-none"
      >
        Chat with us
      </motion.div>
      <a
        href="https://wa.me/15551234567"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-[60px] h-[60px] bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 transition-transform duration-300 hover:scale-[1.12] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)]"
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#25D366]"
          animate={{
            scale: [1, 1.8, 2],
            opacity: [0.8, 0, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1.5,
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#25D366]"
          animate={{
            scale: [1, 1.8, 2],
            opacity: [0.8, 0, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: 2,
          }}
        />
        <FaWhatsapp className="w-8 h-8 relative z-10" />
      </a>
    </motion.div>
  );
}
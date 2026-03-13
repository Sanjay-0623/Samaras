import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/15551234567"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform duration-300"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-[#25D366]"
        animate={{
          scale: [1, 1.5, 2],
          opacity: [0.8, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      <FaWhatsapp className="w-8 h-8 relative z-10" />
    </motion.a>
  );
}

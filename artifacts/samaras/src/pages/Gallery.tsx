import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PageTransition from "@/components/PageTransition";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=85&w=900&auto=format&fit=crop",
    alt: "Indian masala curry being cooked",
    label: "Kitchen Cooking",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=85&w=900&auto=format&fit=crop",
    alt: "Paneer Butter Masala",
    label: "Paneer Butter Masala",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=900&auto=format&fit=crop",
    alt: "Crispy Masala Dosa on plate",
    label: "Masala Dosa",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=85&w=900&auto=format&fit=crop",
    alt: "Warm restaurant dining area",
    label: "Dining Area",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1563379091339-03246963f96c?q=85&w=900&auto=format&fit=crop",
    alt: "Fragrant Veg Biryani",
    label: "Veg Biryani",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?q=85&w=900&auto=format&fit=crop",
    alt: "Palak Paneer — spinach and cottage cheese",
    label: "Palak Paneer",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1567337710282-00832b415979?q=85&w=900&auto=format&fit=crop",
    alt: "Full Indian Thali spread",
    label: "Grand Thali",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=85&w=900&auto=format&fit=crop",
    alt: "Crispy golden samosas",
    label: "Crispy Samosas",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=85&w=900&auto=format&fit=crop",
    alt: "Chole Bhature — chickpea curry",
    label: "Chole Bhature",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1601303516534-bf4c1a574dc9?q=85&w=900&auto=format&fit=crop",
    alt: "Gulab Jamun dessert in syrup",
    label: "Gulab Jamun",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?q=85&w=900&auto=format&fit=crop",
    alt: "Dal Tadka with ghee tempering",
    label: "Dal Tadka",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=85&w=900&auto=format&fit=crop",
    alt: "Chilled mango lassi",
    label: "Mango Lassi",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=85&w=900&auto=format&fit=crop",
    alt: "Premium restaurant ambiance",
    label: "Our Ambiance",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=85&w=900&auto=format&fit=crop",
    alt: "Steaming cup of masala chai",
    label: "Masala Chai",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1606248897732-2c5eba2c9e90?q=85&w=900&auto=format&fit=crop",
    alt: "Indian street chaat snacks",
    label: "Street Chaats",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=85&w=900&auto=format&fit=crop",
    alt: "Steaming basmati rice",
    label: "Basmati Rice",
    tall: true,
  },
];

interface LightboxProps {
  image: typeof galleryImages[0];
  onClose: () => void;
}

function Lightbox({ image, onClose }: LightboxProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl"
      >
        <img src={image.src} alt={image.alt} className="w-full max-h-[80vh] object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
          <p className="text-white font-display font-bold text-xl">{image.label}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors text-xl font-bold"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const [selected, setSelected] = useState<typeof galleryImages[0] | null>(null);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">

        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-4 pt-12"
          >
            Visual Journey
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-display font-bold text-white mb-5"
          >
            Our Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/55 text-lg max-w-2xl mx-auto font-light"
          >
            A glimpse into the warmth, flavours, and experience that define Samara's Veg.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07, ease: "easeOut" }}
              className="break-inside-avoid mb-4 relative group cursor-zoom-in overflow-hidden rounded-2xl"
              onClick={() => setSelected(img)}
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`w-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out ${img.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl flex items-end p-5">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                >
                  <p className="text-white font-display font-bold text-lg leading-tight">{img.label}</p>
                  <p className="text-white/60 text-xs mt-0.5 tracking-wider">Tap to enlarge</p>
                </motion.div>
              </div>

              {/* Orange top-left corner accent */}
              <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(255,122,0,0.8)]" />
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />
          <p className="text-white/30 text-sm font-light italic">
            "Every dish tells a story — come be part of ours."
          </p>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && <Lightbox image={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </PageTransition>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";

const categories = ["All", "Starters", "Curries", "Rice & Bread", "Desserts", "Beverages"];

const menuItems = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    description: "Soft paneer cubes simmered in a rich, velvety tomato and cashew gravy with aromatic whole spices.",
    category: "Curries",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Masala Dosa",
    description: "Thin, crispy rice crepe filled with spiced potato masala, served with coconut chutney and sambar.",
    category: "Starters",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Veg Biryani",
    description: "Fragrant basmati rice slow-cooked with mixed vegetables, saffron, and whole spices. Served with raita.",
    category: "Rice & Bread",
    image: "https://images.unsplash.com/photo-1563379091339-03246963f96c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Chole Bhature",
    description: "Spicy and tangy chickpea curry served with fluffy, golden deep-fried bhature bread.",
    category: "Starters",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Palak Paneer",
    description: "Fresh cottage cheese in a smooth, vibrant spinach gravy spiced with ginger, garlic, and cumin.",
    category: "Curries",
    image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Dal Tadka",
    description: "Yellow lentils tempered with ghee, cumin, mustard seeds, garlic, and dried red chillies.",
    category: "Curries",
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Veg Fried Rice",
    description: "Wok-tossed basmati rice with garden vegetables, soy sauce, and a hint of sesame oil.",
    category: "Rice & Bread",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Veg Thali",
    description: "A wholesome platter with dal, two sabzis, rice, rotis, raita, pickle, and a sweet dessert.",
    category: "Rice & Bread",
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Gulab Jamun",
    description: "Soft, melt-in-your-mouth milk solid dumplings soaked in rose-flavoured sugar syrup.",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1601303516534-bf4c1a574dc9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 10,
    name: "Mango Lassi",
    description: "Thick, creamy blended yoghurt drink with Alphonso mango pulp and a pinch of cardamom.",
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 11,
    name: "Samosa",
    description: "Golden, flaky pastry pockets filled with spiced potato and peas, served with mint chutney.",
    category: "Starters",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 12,
    name: "Masala Chai",
    description: "Traditional Indian spiced tea brewed with ginger, cardamom, cinnamon, and full-cream milk.",
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Menu() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredItems = menuItems.filter(
    (item) => activeTab === "All" || item.category === activeTab
  );

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 pt-12">Our Menu</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
            Discover the rich tapestry of authentic Indian vegetarian cuisine, crafted daily with the freshest ingredients and time-honoured recipes.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-7 py-3 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeTab === category
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(255,122,0,0.4)] scale-105"
                  : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
                className="glass-panel group cursor-default overflow-hidden transform-gpu hover:border-primary/40 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,122,0,0.1)] transition-all duration-400"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                    style={{ transform: "translateZ(0)" }}
                  />
                  <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-white/80 text-xs tracking-wider uppercase">
                    {item.category}
                  </div>
                </div>

                <div className="p-8 relative">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300 relative z-10">
                    {item.name}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed font-light relative z-10">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-white/40 text-lg">
            No items found in this category.
          </div>
        )}
      </div>
    </PageTransition>
  );
}

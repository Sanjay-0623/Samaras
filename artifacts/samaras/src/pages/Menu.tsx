import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";

const categories = ["All", "Starters", "Mains", "Desserts", "Drinks"];

const menuItems = [
  {
    id: 1,
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with asparagus and lemon butter sauce.",
    price: "$28.00",
    category: "Mains",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Lamb Chops",
    description: "Rosemary infused lamb chops served with garlic mashed potatoes.",
    price: "$34.00",
    category: "Mains",
    image: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, parmesan cheese, croutons, and house dressing.",
    price: "$14.00",
    category: "Starters",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Bruschetta",
    description: "Toasted baguette topped with fresh tomatoes, basil, and balsamic glaze.",
    price: "$12.00",
    category: "Starters",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    description: "Warm molten chocolate center served with vanilla bean ice cream.",
    price: "$11.00",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Mango Sorbet",
    description: "Refreshing tropical mango sorbet with fresh mint.",
    price: "$8.00",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1558500662-cefcbdfa2d1e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Fresh Orange Juice",
    description: "Locally sourced, freshly squeezed valencia oranges.",
    price: "$6.00",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451b02?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Premium Red Wine",
    description: "House selected cabernet sauvignon, glass.",
    price: "$14.00",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Menu() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredItems = menuItems.filter(
    item => activeTab === "All" || item.category === activeTab
  );

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 pt-12">Our Menu</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
            Discover a culinary journey through our carefully curated dishes, crafted with the finest ingredients and passion.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-8 py-3 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
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
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="glass-panel group cursor-pointer overflow-hidden transform-gpu"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                    style={{ transform: "translateZ(0)" }}
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-white/80 text-xs tracking-wider uppercase">
                    {item.category}
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 z-20 glass-panel px-4 py-2 rounded-full text-primary font-bold text-sm">
                    {item.price}
                  </div>
                </div>
                
                <div className="p-8 relative">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-6 font-light">
                    {item.description}
                  </p>
                  
                  <div className="pt-6 border-t border-white/10 flex justify-between items-center relative z-10">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/40">{item.category}</span>
                    <button className="text-primary text-sm font-bold uppercase tracking-wider group-hover:text-white transition-colors flex items-center gap-2">
                      Order Now
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
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
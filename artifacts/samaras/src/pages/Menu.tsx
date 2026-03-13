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
    // food photography grilled salmon
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Lamb Chops",
    description: "Rosemary infused lamb chops served with garlic mashed potatoes.",
    price: "$34.00",
    category: "Mains",
    // food photography roasted lamb chops
    image: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, parmesan cheese, croutons, and house dressing.",
    price: "$14.00",
    category: "Starters",
    // food photography caesar salad
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Bruschetta",
    description: "Toasted baguette topped with fresh tomatoes, basil, and balsamic glaze.",
    price: "$12.00",
    category: "Starters",
    // food photography tomato bruschetta
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    description: "Warm molten chocolate center served with vanilla bean ice cream.",
    price: "$11.00",
    category: "Desserts",
    // food photography chocolate lava cake
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Mango Sorbet",
    description: "Refreshing tropical mango sorbet with fresh mint.",
    price: "$8.00",
    category: "Desserts",
    // food photography mango sorbet
    image: "https://images.unsplash.com/photo-1558500662-cefcbdfa2d1e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Fresh Orange Juice",
    description: "Locally sourced, freshly squeezed valencia oranges.",
    price: "$6.00",
    category: "Drinks",
    // drink photography orange juice
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451b02?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Premium Red Wine",
    description: "House selected cabernet sauvignon, glass.",
    price: "$14.00",
    category: "Drinks",
    // drink photography red wine glass
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
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">Our Menu</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover a culinary journey through our carefully curated dishes, crafted with the finest ingredients and passion.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === category
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(255,122,0,0.4)]"
                  : "bg-card text-muted-foreground hover:bg-white/10 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 group transition-colors duration-500 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-primary font-bold text-sm">
                    {item.price}
                  </div>
                </div>
                <div className="p-6 relative">
                  {/* Subtle hover glow inside card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                    {item.description}
                  </p>
                  
                  <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center relative z-10">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">{item.category}</span>
                    <button className="text-primary text-sm font-bold uppercase hover:text-white transition-colors">
                      Order Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No items found in this category.
          </div>
        )}
      </div>
    </PageTransition>
  );
}

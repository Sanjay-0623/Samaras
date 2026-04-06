import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

/* ─── PER-DISH IMAGES (unique for every item) ────────────── */
const Q = "?q=75&w=600&auto=format&fit=crop";
const u = (id: string) => `https://images.unsplash.com/${id}${Q}`;

const IMG = {
  // South Indian
  masalaDosa:          u("photo-1589301760014-d929f3979dbc"),
  plainDosa:           u("photo-1668236543090-82eba5ee5976"),
  ravaDosa:            u("photo-1567188040759-fb8a883dc6d6"),
  onionDosa:           u("photo-1630409346824-9db8c23c68f2"),
  idli:                u("photo-1567337710282-00832b415979"),
  vada:                u("photo-1601050690597-df0568f70950"),
  sambarIdli:          u("photo-1598511796432-32c4e6806d4e"),
  setDosa:             u("photo-1588166524941-3bf61a9c41db"),
  pongal:              u("photo-1546833998-877b37c2e5c6"),
  upma:                u("photo-1645177628172-a788a7c1cb7a"),
  // North Indian
  paneerButterMasala:  u("photo-1565557623262-b51c2513a641"),
  kadaiPaneer:         u("photo-1631452180519-a9c68606ddf2"),
  palakPaneer:         u("photo-1618449840665-9ed506d73a34"),
  shahiPaneer:         u("photo-1574194836913-1a1e7c2bbf4d"),
  choleMasala:         u("photo-1606491956689-2ea866880c84"),
  dalTadka:            u("photo-1621996346565-e3dbc646d9a9"),
  dalMakhani:          u("photo-1585937421612-70a008356fbe"),
  vegKolhapuri:        u("photo-1556910103-1c02745aae4d"),
  mixVegCurry:         u("photo-1544025162-d76538641aa6"),
  malaiKofta:          u("photo-1598511796432-dc1d313c3b2e"),
  // Rice & Biryani
  vegBiryani:          u("photo-1563379091339-03246963f96c"),
  paneerBiryani:       u("photo-1574653853027-5382a3d23a15"),
  jeeraRice:           u("photo-1603133872878-684f208fb84b"),
  vegPulao:            u("photo-1512058564366-18510be2db19"),
  curdRice:            u("photo-1476224203421-9ac39bcb3327"),
  sambarRice:          u("photo-1516714435131-44d6b64dc6a2"),
  lemonRice:           u("photo-1574271143515-5cddf8da19be"),
  tomatoRice:          u("photo-1644575695577-44a1e44f3d70"),
  // Indian Breads
  butterNaan:          u("photo-1565299624946-b28f40a0ae38"),
  garlicNaan:          u("photo-1568369748929-4f8c5db17f4f"),
  tandooriRoti:        u("photo-1586190848861-99aa4a171e90"),
  butterRoti:          u("photo-1527324688151-0e627063f2b1"),
  kulcha:              u("photo-1613292443284-8d10ef9383fe"),
  paratha:             u("photo-1540713434306-58505cf1b6fc"),
  // Starters
  paneerTikka:         u("photo-1599487488170-d11ec9c172f0"),
  vegManchurian:       u("photo-1504674900247-0877df9cc836"),
  gobiManchurian:      u("photo-1609167830220-7164aa360951"),
  chilliPaneer:        u("photo-1625244724120-1fd1d34d00f6"),
  vegCutlet:           u("photo-1631859303038-3e70a3f6a6ef"),
  haraBharaKabab:      u("photo-1512621776951-a57141f2eefd"),
  // Chats
  paniPuri:            u("photo-1606248897732-2c5eba2c9e90"),
  bhelPuri:            u("photo-1515516969-d4008cc6241a"),
  sevPuri:             u("photo-1514190051997-0f6f39ca5cde"),
  pavBhaji:            u("photo-1623428187969-5da2dcea5ebf"),
  samosaChaat:         u("photo-1625398407796-82da1e823e95"),
  dahiPuri:            u("photo-1593525949895-19261a25d7e1"),
  // Chinese Veg
  vegFriedRice:        u("photo-1628294896516-0a3d00e7e4ef"),
  schezwanFriedRice:   u("photo-1627308595229-7830a5c91f9f"),
  vegNoodles:          u("photo-1548943487-a2e4e43b4853"),
  hakkaNoodles:        u("photo-1569718212165-3a8278d5f624"),
  chilliGarlicNoodles: u("photo-1585032226651-759b368d7246"),
  vegManchurianGravy:  u("photo-1633945274405-b6c8069d3e72"),
  // Desserts
  gulabJamun:          u("photo-1601303516534-bf4c1a574dc9"),
  rasgulla:            u("photo-1554491458-9e52b3ef4c74"),
  rasmalai:            u("photo-1616299915952-04c803d5e7d1"),
  gajarHalwa:          u("photo-1568051243851-f9b136146e97"),
  kulfi:               u("photo-1558500662-cefcbdfa2d1e"),
  kheer:               u("photo-1643980891936-be6fd47a8b40"),
  // Beverages
  masalaChai:          u("photo-1561336313-0bd5e0b27ec8"),
  filterCoffee:        u("photo-1540189549336-e6e99eb4b97b"),
  sweetLassi:          u("photo-1553361371-9b22f78e8b1d"),
  saltLassi:           u("photo-1534422298391-e4f8a52bcb5d"),
  buttermilk:          u("photo-1574071318508-1cdbab80d002"),
  freshLimeSoda:       u("photo-1527960669566-f882ba85a4c6"),
};

/* ─── MENU DATA ──────────────────────────────────────────── */
interface Dish { name: string; description: string; image: string; }
interface Category { id: string; label: string; emoji: string; items: Dish[]; }

const menuData: Category[] = [
  {
    id: "south-indian",
    label: "South Indian",
    emoji: "🌴",
    items: [
      { name: "Masala Dosa",  description: "Crispy golden rice crepe filled with spiced potato masala, served with coconut chutney and sambar.", image: IMG.masalaDosa },
      { name: "Plain Dosa",   description: "Classic thin and crispy rice-lentil crepe, light and delicate, served with chutneys and sambar.",   image: IMG.plainDosa },
      { name: "Rava Dosa",    description: "Instantly made crispy semolina crepe with onions and green chillies, served with chutneys.",         image: IMG.ravaDosa },
      { name: "Onion Dosa",   description: "Thin and lacy rice crepe topped with freshly chopped onions and tempered with mustard seeds.",        image: IMG.onionDosa },
      { name: "Idli",         description: "Soft and fluffy steamed rice cakes served warm with sambar and a trio of chutneys.",                  image: IMG.idli },
      { name: "Vada",         description: "Crispy fried lentil doughnuts with curry leaves and black pepper, served with sambar and chutney.",   image: IMG.vada },
      { name: "Sambar Idli",  description: "Pillowy steamed idlis dunked in rich, tangy vegetable sambar — a South Indian comfort classic.",      image: IMG.sambarIdli },
      { name: "Set Dosa",     description: "Thick, soft and spongy dosas served in a set of three with vegetable korma and coconut chutney.",    image: IMG.setDosa },
      { name: "Pongal",       description: "Slow-cooked rice and lentil porridge with black pepper, cumin, ginger, and a generous ghee tempering.", image: IMG.pongal },
      { name: "Upma",         description: "Savory semolina porridge tempered with mustard seeds, curry leaves, onions, and mixed vegetables.",   image: IMG.upma },
    ],
  },
  {
    id: "north-indian",
    label: "North Indian",
    emoji: "🫕",
    items: [
      { name: "Paneer Butter Masala", description: "Velvety tomato and cashew gravy with soft paneer, butter, and aromatic whole spices.",                      image: IMG.paneerButterMasala },
      { name: "Kadai Paneer",         description: "Paneer and capsicum tossed in a bold kadai masala with onions, tomatoes, and freshly ground spices.",       image: IMG.kadaiPaneer },
      { name: "Palak Paneer",         description: "Fresh cottage cheese simmered in a vibrant spinach gravy spiced with ginger, garlic, and cumin.",           image: IMG.palakPaneer },
      { name: "Shahi Paneer",         description: "Royal-style paneer in a rich, cream-laced onion and cashew gravy with saffron and cardamom.",              image: IMG.shahiPaneer },
      { name: "Chole Masala",         description: "Hearty chickpeas cooked in a robust blend of whole spices, tomatoes, and caramelised onions.",             image: IMG.choleMasala },
      { name: "Dal Tadka",            description: "Yellow lentils simmered to perfection and finished with a sizzling ghee tempering of garlic and red chilli.", image: IMG.dalTadka },
      { name: "Dal Makhani",          description: "Slow-cooked black lentils with kidney beans, butter, cream, and a medley of aromatic spices.",             image: IMG.dalMakhani },
      { name: "Veg Kolhapuri",        description: "A fiery, flavour-packed Maharashtrian curry with seasonal vegetables and a coconut-spice masala.",         image: IMG.vegKolhapuri },
      { name: "Mix Veg Curry",        description: "Seasonal vegetables cooked in a mildly spiced tomato-onion gravy — wholesome and full of colour.",         image: IMG.mixVegCurry },
      { name: "Malai Kofta",          description: "Creamy paneer and potato dumplings served in a delicate mildly spiced makhani-style gravy.",               image: IMG.malaiKofta },
    ],
  },
  {
    id: "rice-biryani",
    label: "Rice & Biryani",
    emoji: "🍚",
    items: [
      { name: "Veg Biryani",     description: "Fragrant basmati rice slow-cooked with seasonal vegetables, saffron strands, and whole spices. Served with raita.", image: IMG.vegBiryani },
      { name: "Paneer Biryani",  description: "Aromatic dum-cooked biryani with marinated paneer, caramelised onions, and fresh mint.",                           image: IMG.paneerBiryani },
      { name: "Jeera Rice",      description: "Basmati rice tempered with cumin seeds, ghee, and whole spices — a simple yet fragrant accompaniment.",            image: IMG.jeeraRice },
      { name: "Veg Pulao",       description: "Lightly spiced basmati rice cooked with garden vegetables, whole spices, and a drizzle of ghee.",                 image: IMG.vegPulao },
      { name: "Curd Rice",       description: "Soft cooked rice mixed with fresh curd and tempered with mustard seeds, curry leaves, and green chillies.",        image: IMG.curdRice },
      { name: "Sambar Rice",     description: "Comforting South Indian rice cooked with toor dal, tamarind, and a vegetable-rich sambar base.",                  image: IMG.sambarRice },
      { name: "Lemon Rice",      description: "Tangy turmeric-tinted rice tossed with lemon juice, peanuts, and a mustard-curry leaf tempering.",               image: IMG.lemonRice },
      { name: "Tomato Rice",     description: "Flavourful rice cooked with ripe tomatoes, onions, and South Indian spices — vibrant, tangy, and satisfying.",   image: IMG.tomatoRice },
    ],
  },
  {
    id: "indian-breads",
    label: "Indian Breads",
    emoji: "🫓",
    items: [
      { name: "Butter Naan",     description: "Soft leavened bread baked in a tandoor and brushed generously with fresh butter — fluffy and pillowy.",  image: IMG.butterNaan },
      { name: "Garlic Naan",     description: "Freshly baked naan topped with minced garlic, butter, and coriander — aromatic and irresistible.",       image: IMG.garlicNaan },
      { name: "Tandoori Roti",   description: "Whole wheat bread baked directly on the walls of a clay tandoor, crisp outside and soft within.",        image: IMG.tandooriRoti },
      { name: "Butter Roti",     description: "Thin whole-wheat flatbread cooked on a tawa and generously smothered with soft butter.",                  image: IMG.butterRoti },
      { name: "Kulcha",          description: "Soft leavened bread stuffed with spiced onion or potato filling, baked in the tandoor to golden perfection.", image: IMG.kulcha },
      { name: "Paratha",         description: "Layered whole-wheat flatbread pan-cooked with ghee, served with yoghurt, pickle, and butter.",           image: IMG.paratha },
    ],
  },
  {
    id: "starters",
    label: "Starters",
    emoji: "🥗",
    items: [
      { name: "Paneer Tikka",    description: "Marinated cottage cheese cubes grilled in a tandoor with capsicum and onion, served with mint chutney.",    image: IMG.paneerTikka },
      { name: "Veg Manchurian",  description: "Crispy fried vegetable balls tossed in a tangy, spicy Indo-Chinese sauce with spring onions and ginger.",  image: IMG.vegManchurian },
      { name: "Gobi Manchurian", description: "Golden crispy cauliflower tossed in a bold Manchurian sauce — a crowd-favourite Indo-Chinese appetiser.", image: IMG.gobiManchurian },
      { name: "Chilli Paneer",   description: "Paneer cubes stir-fried with capsicum, onions, soy sauce, and chilli in a savoury Indo-Chinese style.",   image: IMG.chilliPaneer },
      { name: "Veg Cutlet",      description: "Crispy shallow-fried patties made with seasoned mixed vegetables, herbs, and spices, served with chutney.", image: IMG.vegCutlet },
      { name: "Hara Bhara Kabab", description: "Vibrant green kababs made with spinach, green peas, paneer, and spices — nutritious and flavourful.",    image: IMG.haraBharaKabab },
    ],
  },
  {
    id: "chats",
    label: "Chats",
    emoji: "🌮",
    items: [
      { name: "Pani Puri",      description: "Hollow crispy puris filled with spiced potato-chickpea and dunked in tangy, ice-cold flavoured jaljeera water.", image: IMG.paniPuri },
      { name: "Bhel Puri",      description: "A crunchy mix of puffed rice, sev, onions, tomatoes, coriander, and sweet-tangy tamarind chutney.",            image: IMG.bhelPuri },
      { name: "Sev Puri",       description: "Crispy puris loaded with potatoes, chutneys, onions, and topped with fine sev — a Mumbai street classic.",     image: IMG.sevPuri },
      { name: "Pav Bhaji",      description: "Buttery, spiced mixed vegetable mash served with toasted buttered pav rolls and a squeeze of lime.",           image: IMG.pavBhaji },
      { name: "Samosa Chaat",   description: "Flaky samosas broken open and topped with chole, chutneys, yoghurt, onions, and crunchy sev.",                image: IMG.samosaChaat },
      { name: "Dahi Puri",      description: "Crispy puris filled with potatoes, chickpeas, fresh yoghurt, chutneys, and a sprinkle of chaat masala.",      image: IMG.dahiPuri },
    ],
  },
  {
    id: "chinese-veg",
    label: "Chinese Veg",
    emoji: "🥢",
    items: [
      { name: "Veg Fried Rice",         description: "Wok-tossed long-grain rice with garden vegetables, soy sauce, and a hint of sesame oil.",                  image: IMG.vegFriedRice },
      { name: "Schezwan Fried Rice",    description: "Fiery and aromatic fried rice tossed with Schezwan sauce, mixed vegetables, and spring onions.",           image: IMG.schezwanFriedRice },
      { name: "Veg Noodles",            description: "Stir-fried noodles with crisp vegetables in a savoury Indo-Chinese sauce — light, flavourful, and satisfying.", image: IMG.vegNoodles },
      { name: "Hakka Noodles",          description: "Classic Indo-Chinese Hakka noodles tossed with vegetables, soy, and chilli in a wok on high flame.",       image: IMG.hakkaNoodles },
      { name: "Chilli Garlic Noodles",  description: "Noodles stir-fried with bold chilli garlic sauce, capsicum, and spring onions — a flavour-packed bowl.",  image: IMG.chilliGarlicNoodles },
      { name: "Veg Manchurian Gravy",   description: "Crispy vegetable balls served in a rich, tangy Manchurian gravy — perfect with fried rice or noodles.",    image: IMG.vegManchurianGravy },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    emoji: "🍮",
    items: [
      { name: "Gulab Jamun",  description: "Soft, spongy milk-solid dumplings soaked in a warm rose-cardamom sugar syrup — a timeless Indian sweet.",         image: IMG.gulabJamun },
      { name: "Rasgulla",     description: "Light, spongy cottage cheese balls simmered in a delicate sugar syrup — Bengali patisserie at its finest.",          image: IMG.rasgulla },
      { name: "Rasmalai",     description: "Soft paneer patties served in chilled, saffron-infused sweetened milk with pistachios and cardamom.",              image: IMG.rasmalai },
      { name: "Gajar Halwa",  description: "Slow-cooked grated carrot pudding with ghee, sugar, milk, and cardamom — a nostalgic winter dessert.",            image: IMG.gajarHalwa },
      { name: "Kulfi",        description: "Dense, creamy Indian ice cream in traditional flavours of mango, rose, and pistachio — richly indulgent.",         image: IMG.kulfi },
      { name: "Kheer",        description: "Creamy rice pudding slow-cooked in full-fat milk with sugar, saffron, cardamom, and topped with dry fruits.",      image: IMG.kheer },
    ],
  },
  {
    id: "beverages",
    label: "Beverages",
    emoji: "🥤",
    items: [
      { name: "Masala Chai",      description: "Traditional Indian spiced tea brewed with ginger, cardamom, cinnamon, and full-cream milk.",              image: IMG.masalaChai },
      { name: "Filter Coffee",    description: "South Indian decoction coffee — strong, aromatic, and perfectly blended with frothy steamed milk.",       image: IMG.filterCoffee },
      { name: "Sweet Lassi",      description: "Thick blended yoghurt drink sweetened with sugar and flavoured with cardamom and rose water.",            image: IMG.sweetLassi },
      { name: "Salt Lassi",       description: "Chilled savoury yoghurt drink with roasted cumin, black salt, and a hint of mint — refreshing and cooling.", image: IMG.saltLassi },
      { name: "Buttermilk",       description: "Thin, spiced yoghurt drink with coriander, ginger, green chilli, and a pinch of asafoetida.",            image: IMG.buttermilk },
      { name: "Fresh Lime Soda",  description: "Fizzy freshly squeezed lime soda with your choice of sweet, salt, or a tangy combination of both.",      image: IMG.freshLimeSoda },
    ],
  },
];

/* ─── DISH CARD (3D floating) ────────────────────────────── */
function DishCard({ dish, index }: { dish: Dish; index: number }) {
  const floatDuration = 3.2 + (index % 4) * 0.5;
  const floatDelay = (index % 6) * 0.4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: "easeOut" }}
      style={{ perspective: "900px" }}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay, repeatType: "loop" }}
        whileHover={{
          rotateX: -6,
          rotateY: 5,
          scale: 1.03,
          y: -14,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="glass-panel group cursor-default overflow-hidden transform-gpu hover:border-primary/50 hover:shadow-[0_30px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,122,0,0.18),0_0_40px_rgba(255,122,0,0.06)] transition-colors duration-300"
      >
        <div className="aspect-[16/10] overflow-hidden relative">
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/5 transition-colors duration-500 z-10" />
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.1] transition-transform duration-700 ease-out"
            style={{ transform: "translateZ(0)" }}
          />
          {/* 3D shine overlay */}
          <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
        </div>
        <div className="p-5 relative" style={{ transform: "translateZ(20px)" }}>
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-primary/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-b-[inherit]" />
          <h4 className="text-[17px] font-display font-bold text-white mb-1.5 group-hover:text-primary transition-colors duration-300 relative z-10 leading-snug">
            {dish.name}
          </h4>
          <p className="text-white/50 text-[13px] leading-relaxed font-light relative z-10 line-clamp-2">
            {dish.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── CATEGORY SECTION ───────────────────────────────────── */
function CategorySection({ cat, sectionRef }: { cat: Category; sectionRef: (el: HTMLElement | null) => void }) {
  return (
    <section id={cat.id} ref={sectionRef} className="scroll-mt-32 mb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-3xl">{cat.emoji}</span>
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">{cat.label}</h2>
        </div>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/30 to-transparent ml-4" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {cat.items.map((dish, i) => (
          <DishCard key={dish.name} dish={dish} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─── MAIN MENU PAGE ─────────────────────────────────────── */
export default function Menu() {
  const [activeId, setActiveId] = useState(menuData[0].id);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const navRef = useRef<HTMLDivElement>(null);
  const navButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const setRef = useCallback((id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveId(id);
    const el = sectionRefs.current.get(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    const btn = navButtonRefs.current.get(id);
    if (btn && navRef.current) {
      const nav = navRef.current;
      nav.scrollTo({ left: btn.offsetLeft - nav.clientWidth / 2 + btn.clientWidth / 2, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveId(id);
            const btn = navButtonRefs.current.get(id);
            if (btn && navRef.current) {
              navRef.current.scrollTo({ left: btn.offsetLeft - navRef.current.clientWidth / 2 + btn.clientWidth / 2, behavior: "smooth" });
            }
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-24">

        {/* ── Header ── */}
        <div className="text-center mb-14 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-display font-bold text-white mb-4 pt-12"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/55 text-lg max-w-2xl mx-auto font-light"
          >
            A complete journey through authentic Indian vegetarian cuisine — fresh, flavourful, and prepared with love every day.
          </motion.p>
        </div>

        {/* ── Sticky Category Nav ── */}
        <div className="sticky top-20 z-30 mb-14 -mx-6 lg:-mx-12 px-6 lg:px-12 py-3 bg-[#080808]/80 backdrop-blur-md border-b border-white/[0.06]">
          <div ref={navRef} className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {menuData.map((cat) => (
              <button
                key={cat.id}
                ref={(el) => { if (el) navButtonRefs.current.set(cat.id, el); }}
                onClick={() => scrollToSection(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 shrink-0 ${
                  activeId === cat.id
                    ? "bg-primary text-white shadow-[0_0_18px_rgba(255,122,0,0.45)] scale-[1.04]"
                    : "bg-white/5 border border-white/10 text-white/55 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Menu Sections ── */}
        <div>
          {menuData.map((cat) => (
            <CategorySection key={cat.id} cat={cat} sectionRef={setRef(cat.id)} />
          ))}
        </div>

      </div>
    </PageTransition>
  );
}

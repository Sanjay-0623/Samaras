import { motion } from "framer-motion";
import { MdTableRestaurant, MdTakeoutDining } from "react-icons/md";
import { GiCookingPot } from "react-icons/gi";
import PageTransition from "@/components/PageTransition";

const services = [
  {
    id: "dine-in",
    title: "Dine In",
    description: "Experience our luxurious ambiance with impeccable table service. Perfect for dates, family gatherings, and business dinners. Enjoy the complete Samaras atmospheric journey.",
    icon: MdTableRestaurant,
    delay: 0.1
  },
  {
    id: "takeaway",
    title: "Takeaway",
    description: "Enjoy restaurant-quality meals in the comfort of your home. Carefully packaged to maintain temperature and presentation, ensuring the Samaras taste wherever you are.",
    icon: MdTakeoutDining,
    delay: 0.3
  },
  {
    id: "catering",
    title: "Catering",
    description: "Elevate your events with our bespoke catering services. From corporate events to weddings, we provide customized menus and professional staff to make your occasion unforgettable.",
    icon: GiCookingPot,
    delay: 0.5
  }
];

export default function Services() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative">
        {/* Background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="text-center mb-20 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold text-white mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            More than just a meal. We offer tailored experiences to suit your needs, delivering excellence in every format.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: service.delay }}
              className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:bg-card hover:border-primary/50 transition-all duration-500 group relative overflow-hidden text-center"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-24 h-24 mx-auto bg-background rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-primary/30 group-hover:scale-110 transition-all duration-500 relative z-10 shadow-xl shadow-black/50">
                <service.icon className="w-12 h-12 text-primary" />
              </div>
              
              <h3 className="text-2xl font-display font-bold text-white mb-4 relative z-10">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed relative z-10">
                {service.description}
              </p>

              <div className="mt-8 relative z-10">
                <button className="text-sm font-bold uppercase tracking-wider text-white group-hover:text-primary transition-colors flex items-center justify-center w-full gap-2">
                  Learn More
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 md:max-w-xl text-center md:text-left">
            <h3 className="text-3xl font-display font-bold text-white mb-4">Planning a special event?</h3>
            <p className="text-white/80 text-lg">Let our team handle the culinary details so you can focus on making memories with your guests.</p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <button className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-white hover:text-primary transition-all duration-300 shadow-lg shadow-primary/20">
              Inquire Now
            </button>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}

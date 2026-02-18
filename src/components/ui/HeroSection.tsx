import { motion } from "framer-motion";

export const HeroSection = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.5 }}
    className="absolute top-20 text-center z-10 pointer-events-none"
  >
    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-200 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
      Daily Sensory Ritual
    </h1>
    <p className="mt-4 text-white/60 text-xl tracking-[0.4em] font-light">
      每日使用說明書
    </p>
  </motion.div>
);
import { motion } from "framer-motion";

interface JellyVisualProps {
  isShaking: boolean;
}

export const JellyVisual = () => (
  <motion.div 
    className="relative flex items-center justify-start mt-24 md:mt-32 mb-16"
    transition={{ duration: 0.4 }}
  >
    {/* 衛星 A */}
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute w-64 h-64 border border-transparent"
    >
      <motion.div 
         animate={{ scale: [1, 1.5, 1] }}
         transition={{ duration: 2, repeat: Infinity }}
         className="w-3 h-3 bg-cyan-200 rounded-full blur-[2px] shadow-[0_0_10px_#fff]"
      />
    </motion.div>

    {/* 衛星 B 與 果凍球主體邏輯*/}
    <motion.div 
      className="relative w-56 h-56 bg-gradient-to-br from-white/50 via-purple-200/30 to-cyan-200/20 backdrop-blur-2xl border-2 border-white/40 shadow-xl flex items-center justify-start overflow-hidden"
      animate={{ 
        borderRadius: ["40% 60% 70% 30% / 50% 30% 70% 50%", "60% 40% 30% 70% / 60% 70% 30% 40%", "40% 60% 70% 30% / 50% 30% 70% 50%"],
        y: [0, -20, 0]
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10 mix-blend-overlay" />
    </motion.div>
  </motion.div>
);
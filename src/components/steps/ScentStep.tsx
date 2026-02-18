"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SCENTS } from "../../data/scentConfig";

interface ScentStepProps {
  onComplete: (scentId: string) => void;
}

export default function ScentStep({ onComplete }: ScentStepProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedScent, setSelectedScent] = useState<typeof SCENTS[0] | null>(null);
  const [breathPhase, setBreathPhase] = useState<"IDLE" | "INHALE" | "EXHALE">("IDLE");

  const RADIUS = 140;

  const handleSelect = (scent: typeof SCENTS[0]) => {
    setSelectedScent(scent);
    setBreathPhase("INHALE");

    // 模擬呼吸節奏：吸氣 3秒 -> 吐氣 3秒 -> 完成
    setTimeout(() => {
      setBreathPhase("EXHALE");
      setTimeout(() => {
        onComplete(scent.id);
      }, 3000);
    }, 3000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-[500px]">
      <AnimatePresence mode="wait">
        {breathPhase === "IDLE" ? (
          <motion.div 
            key="selection-ui"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* 標題引導 */}
            <div className="absolute top-0 text-center z-20 pointer-events-none">
              <p className="text-cyan-100 text-lg tracking-[0.4em] font-light mb-2">— 嗅覺維度連結 —</p>
              <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase">選擇一個氣味粒子，並準備深呼吸</p>
            </div>

            {/* 粒子圓環 */}
            {SCENTS.map((scent, index) => {
              const angle = (index * (360 / SCENTS.length) * Math.PI) / 180;
              const x = Math.cos(angle) * RADIUS;
              const y = Math.sin(angle) * RADIUS;
              const isHovered = hoveredId === scent.id;

              return (
                <motion.div
                  key={scent.id}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{ x, y, opacity: 1 }}
                  whileHover={{ scale: 1.2 }}
                  onMouseEnter={() => setHoveredId(scent.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleSelect(scent)}
                  className="absolute cursor-pointer z-10"
                >
                  <div className={`w-5 h-5 rounded-full ${scent.particleColor} shadow-[0_0_20px_rgba(255,255,255,0.3)] relative`}>
                    {isHovered && (
                      <motion.div layoutId="glow" className="absolute inset-[-15px] border border-white/20 rounded-full animate-ping" />
                    )}
                  </div>
                  {isHovered && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-10 left-1/2 -translate-x-1/2 w-32 text-center">
                      <span className="text-white text-xs tracking-widest">{scent.label}</span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* Idea B: 深呼吸引導畫面 */
          <motion.div 
            key="inhale-logic"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center"
          >
            {/* 核心擴張粒子 */}
            <motion.div
              animate={{
                scale: breathPhase === "INHALE" ? [1, 3] : [3, 0],
                opacity: breathPhase === "INHALE" ? [0.5, 1] : [1, 0],
                filter: breathPhase === "INHALE" ? "blur(0px)" : "blur(20px)"
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className={`w-16 h-16 rounded-full ${selectedScent?.particleColor} shadow-[0_0_50px_white]`}
            />

            {/* 呼吸文字提示 */}
            <motion.p
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: 1, ease: "linear" }}
              className="mt-16 text-cyan-200 text-2xl tracking-[0.6em] font-extralight"
            >
              {breathPhase === "INHALE" ? "吸氣..." : "吐氣..."}
            </motion.p>
            
            <p className="mt-4 text-white/30 text-sm tracking-widest">
              想像 {selectedScent?.label} 的香氣正在填滿你的空間
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
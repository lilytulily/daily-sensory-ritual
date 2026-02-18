"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BODY_SENSATIONS } from "../../data/bodySensationConfig";

// 定義粒子介面
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

// --- 樣式生成器 (保持不變) ---
const getParticleStyle = (behavior: string, color: string, size: number, rotation: number) => {
  const baseStyle = {
    backgroundColor: color,
    position: "absolute" as const,
    left: "50%",
    top: "50%",
  };

  switch (behavior) {
    case "float":
      return {
        ...baseStyle,
        width: size * 0.8,
        height: size * 1.2,
        borderRadius: "80% 0 55% 0",
        rotate: rotation,
        filter: "blur(1px)",
        opacity: 0.6,
      };
    case "sink":
      return {
        ...baseStyle,
        width: size * 2.5,
        height: size * 0.4,
        borderRadius: "2px",
        rotate: 0,
        filter: "blur(0.5px)",
        opacity: 0.9,
      };
    case "drift":
      return {
        ...baseStyle,
        width: size,
        height: size,
        borderRadius: "1px",
        rotate: rotation,
        filter: "blur(0.5px)",
        opacity: 0.8,
      };
    case "drip":
      return {
        ...baseStyle,
        width: size * 0.7,
        height: size,
        borderRadius: "50% 50% 40% 40%",
        filter: "blur(6px)",
        opacity: 0.7,
      };
    case "static":
      return {
        ...baseStyle,
        width: size * 0.3, // 稍微調大一點點讓雜訊明顯些
        height: size * 0.3,
        borderRadius: "0",
        filter: "blur(0px)",
        opacity: 0.9,
      };
    case "rise":
    default:
      return {
        ...baseStyle,
        width: size * 1.5,
        height: size * 1.5,
        borderRadius: "50%",
        filter: "blur(15px)",
        opacity: 0.5,
      };
  }
};

// --- 動畫路徑生成器 (保持不變) ---
const getParticleAnimation = (behavior: string, particle: Particle, isConfirmed: boolean) => {
  if (isConfirmed) {
    // 確認後：快速收縮消失 (雖無文字，但保留此視覺回饋)
    return {
      scale: 0, opacity: 0,
      transition: { duration: 0.5 }
    };
  }

  const randomX = (particle.x - 50) * 4;
  const randomY = (particle.y - 50) * 3;

  switch (behavior) {
    case "float":
      return {
        x: [randomX, randomX + 30, randomX - 30, randomX],
        y: [randomY - 20, randomY + 20],
        rotate: [particle.rotation - 20, particle.rotation + 20, particle.rotation - 20],
        opacity: [0.4, 0.8, 0.4],
        transition: { duration: particle.duration + 2, repeat: Infinity, ease: "easeInOut" }
      };
    case "sink":
      return {
        x: [randomX, randomX + (Math.random() * 10 - 5)],
        y: [50 + Math.abs(randomY * 0.5), 50 + Math.abs(randomY * 0.5) + 5],
        scaleX: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7],
        transition: { duration: particle.duration + 4, repeat: Infinity, ease: "linear" }
      };
    case "drift":
      return {
        x: [randomX, randomX + (Math.random() * 20 - 10)],
        y: [randomY, randomY + (Math.random() * 20 - 10)],
        rotate: [particle.rotation, particle.rotation + 45],
        opacity: [0, 0.8, 0],
        scale: [0.8, 1, 0.8],
      };
    case "drip":
      return {
        x: randomX,
        y: [randomY - 50, randomY + 50],
        scaleY: [1, 1.2, 0.9],
        opacity: [0, 0.7, 0],
      };
    case "static":
      return {
        x: [randomX, randomX + (Math.random() * 10 - 5), randomX],
        y: [randomY, randomY + (Math.random() * 10 - 5), randomY],
        opacity: [0, 1, 0, 1, 0],
        scale: [1, 0.8, 1.2],
      };
    case "rise":
    default:
      return {
        x: [randomX, randomX + (Math.random() * 30 - 15)],
        y: [randomY + 50, randomY - 80],
        scale: [0.5, 1.5, 0],
        opacity: [0, 0.6, 0],
      };
  }
};

export default function BodyFeelStep({ onComplete }: { onComplete: (value: string) => void }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 10,
      duration: Math.random() * 2 + 3,
      delay: Math.random() * 2,
      rotation: Math.random() * 360,
    }));
    setParticles(newParticles);
  }, []);

  const activeSensation = BODY_SENSATIONS.find(s => s.id === (hoveredId || selectedId)) 
    || BODY_SENSATIONS[0];

  const handleSelect = (id: string) => {
    if (isConfirmed) return;
    setSelectedId(id);
  };

  const handleConfirm = () => {
    if (!selectedId) return;
    setIsConfirmed(true);
    // 這裡的 delay 是為了讓粒子消失的動畫跑完，優化轉場體驗
    setTimeout(() => {
      onComplete(selectedId);
    }, 1000); 
  };

  return (
    // 1. 使用你指定的新結構作為主容器
    <div className="relative flex flex-col items-center justify-center w-full min-h-[600px]">
      
      {/* 2. 標題區域：統一格式，Absolute定位在頂部 */}
      <div className="absolute top-0 text-center z-20">
        <p className="text-cyan-100 text-lg tracking-[0.4em] font-light">— 感受身體的觸覺 —</p>
        <AnimatePresence mode="wait">
            <motion.p 
                key={activeSensation.id} // 加入 key 讓文字切換時有淡入淡出效果
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white/40 text-[10px] tracking-[0.2em] mt-2 uppercase max-w-md mx-auto"
            >
                {activeSensation.desc}
            </motion.p>
        </AnimatePresence>
      </div>

      {/* 3. 粒子展示舞台 (稍微調整 margin-top 以避開標題) */}
      <div className="relative w-full max-w-[300px] h-[200px] flex items-center justify-center mt-12 mb-8">
         <div className="absolute inset-0 overflow-visible">
            <AnimatePresence mode="popLayout">
              {particles.map((particle) => (
                <motion.div
                  key={`${particle.id}-${activeSensation.behavior}`}
                  style={getParticleStyle(activeSensation.behavior, activeSensation.particleColor, particle.size, particle.rotation) as any}
                  animate={getParticleAnimation(activeSensation.behavior, particle, isConfirmed) as any}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    repeatType: activeSensation.behavior === "float" ? "mirror" : "loop",
                    delay: particle.delay,
                    ease: activeSensation.behavior === "sink" ? "linear" : "easeInOut"
                  }}
                />
              ))}
            </AnimatePresence>
         </div>
      </div>

      {/* 4. 選項按鈕區 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl px-6 z-10">
          {BODY_SENSATIONS.map((sensation) => {
            const isHovered = hoveredId === sensation.id;
            const isSelected = selectedId === sensation.id;

            return (
              <motion.button
                key={sensation.id}
                disabled={isConfirmed}
                onMouseEnter={() => !isConfirmed && setHoveredId(sensation.id)}
                onMouseLeave={() => !isConfirmed && setHoveredId(null)}
                onClick={() => handleSelect(sensation.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    opacity: isConfirmed && !isSelected ? 0.3 : 1,
                    scale: isConfirmed && isSelected ? 1.05 : 1,
                    filter: isConfirmed && !isSelected ? "grayscale(100%) blur(2px)" : (selectedId && !isSelected ? "opacity(0.6)" : "none")
                }}
                className={`
                  relative p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-2
                  ${isSelected ? 'border-cyan-200/60 bg-cyan-900/30' : 'border-white/10 bg-transparent hover:border-white/30 hover:bg-white/5'}
                `}
                style={{
                    borderColor: (isHovered || isSelected) ? sensation.particleColor : undefined,
                    boxShadow: isSelected ? `0 0 15px ${sensation.particleColor}30` : "none"
                }}
              >
                <span className="text-base font-medium tracking-widest text-white/80">
                    {sensation.label}
                </span>
              </motion.button>
            );
          })}
      </div>

      {/* 5. 確認按鈕 */}
      <AnimatePresence>
        {selectedId && !isConfirmed && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-0 z-20 translate-y-full pt-6" // 調整位置到容器底部下方一點點，或者保留 margin-top
            >
                <button
                    onClick={handleConfirm}
                    className="px-12 py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md 
                               text-white tracking-[0.5em] hover:bg-white/20 hover:border-cyan-200/50 
                               transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                >
                    頻率鎖定
                </button>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
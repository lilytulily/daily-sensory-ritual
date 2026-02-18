"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TASTES } from "../../data/tasteConfig";
import Image from "next/image";

export default function TasteStep({ onComplete }: { onComplete: (id: string) => void }) {
  const [hoveredTaste, setHoveredTaste] = useState<typeof TASTES[0] | null>(null);
  const [selectedTaste, setSelectedTaste] = useState<typeof TASTES[0] | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const activeTaste = hoveredTaste || selectedTaste;

  const handleSelect = (taste: typeof TASTES[0]) => {
    if (isConfirmed) return;
    setSelectedTaste(taste);
  };

  const handleConfirm = () => {
    if (!selectedTaste) return;
    setIsConfirmed(true);
    setTimeout(() => onComplete(selectedTaste.id), 1500);
  };

  return (
    // 使用 flex-col，間距 gap-6
    <div className="flex flex-col items-center justify-center w-full min-h-[600px] gap-6 py-4">
      
      {/* --- 上方標題區 --- */}
      <div className="text-center z-20 flex flex-col justify-end">
        <p className="text-cyan-100 text-lg tracking-[0.4em] font-light drop-shadow-md">
            — 味覺維度收束 —
        </p>
        <AnimatePresence mode="wait">
            <motion.div 
                key={activeTaste?.id || "default"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mt-2 min-h-[2em] flex flex-col items-center justify-center"
            >
                {activeTaste ? (
                    <span className="text-white/60 text-xs md:text-sm tracking-[0.1em] uppercase max-w-md mx-auto px-4 text-center">
                        {activeTaste.desc}
                    </span>
                ) : (
                    <span className="text-white/40 text-xs tracking-[0.2em] uppercase">
                        探索地圖，尋找你的共振頻率
                    </span>
                )}
            </motion.div>
        </AnimatePresence>
      </div>

      {/* --- 中間地圖區 --- */}
      {/* 設定明確高度 (h-[400px] md:h-[500px]) 確保按鈕定位正常 */}
      <div className="relative w-full max-w-5xl h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
        
        {/* 背景圖層 */}
        <div className="absolute inset-0 z-0">
          <Image 
             src="/images/taste-map.jpg" 
             alt="Taste Map" 
             fill 
             priority
             className={`object-cover transition-all duration-1000 ${isConfirmed ? 'scale-110 blur-sm brightness-50' : 'scale-100 opacity-90 group-hover:opacity-100'}`}
          />
          
          {/* 暗角遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
          
          {/* 確認時的遮罩 */}
          <AnimatePresence>
              {isConfirmed && (
                  <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm"
                  />
              )}
          </AnimatePresence>
        </div>

        {/* 互動按鈕區 */}
        <div className="relative w-full h-full z-10">
            {TASTES.map((taste) => {
                const isHovered = hoveredTaste?.id === taste.id;
                const isSelected = selectedTaste?.id === taste.id;

                // 防呆機制：如果忘記貼 config，這裡給個預設值避免報錯，但位置會怪怪的
                const topPos = taste.position?.top || "50%";
                const leftPos = taste.position?.left || "50%";

                return (
                    <motion.button
                        key={taste.id}
                        disabled={isConfirmed}
                        onMouseEnter={() => !isConfirmed && setHoveredTaste(taste)}
                        onMouseLeave={() => !isConfirmed && setHoveredTaste(null)}
                        onClick={() => handleSelect(taste)}
                        
                        style={{ 
                            top: topPos, 
                            left: leftPos,
                            transform: 'translate(-50%, -50%)' 
                        }}

                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                            opacity: isConfirmed && !isSelected ? 0 : 1,
                            scale: isConfirmed && isSelected ? 1.5 : 1,
                            zIndex: isHovered || isSelected ? 50 : 1
                        }}
                        transition={{ delay: 0.2 + Math.random() * 0.3 }}
                        
                        className="absolute outline-none flex flex-col items-center justify-center group/btn"
                    >
                        {/* 核心光點 */}
                        <div className={`
                            w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white/60 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.4)]
                            transition-all duration-300
                            ${isSelected ? 'bg-white scale-125' : 'bg-white/20 group-hover/btn:bg-white/80 group-hover/btn:scale-110'}
                            ${taste.liquidColor.replace('bg-', 'shadow-')} 
                        `} />

                        {/* 文字標籤 */}
                        <div className={`
                            absolute -top-8 whitespace-nowrap px-3 py-1 rounded-full border backdrop-blur-sm transition-all duration-300 z-20
                            ${isHovered || isSelected 
                                ? 'bg-black/70 border-white/50 text-white opacity-100 scale-100' 
                                : 'bg-black/20 border-white/10 text-white/80 opacity-0 scale-90 group-hover/btn:opacity-100 group-hover/btn:scale-100'}
                        `}>
                            <span className="text-xs font-light tracking-widest">
                                {taste.label}
                            </span>
                        </div>

                        {/* 光暈 */}
                        {(isHovered || isSelected) && !isConfirmed && (
                            <motion.div 
                                layoutId="glow-ring"
                                className={`absolute inset-0 -m-4 rounded-full opacity-40 blur-md -z-10 ${taste.liquidColor}`}
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </motion.button>
                );
            })}

            {/* 確認後的儀式文字 (顯示在圖片中央) */}
            <AnimatePresence>
                {isConfirmed && selectedTaste && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center w-full"
                    >
                        <div className={`text-4xl font-thin tracking-[0.5em] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]`}>
                            攝入
                        </div>
                        <div className="text-sm text-white/60 tracking-[0.8em] mt-4 uppercase">
                            Integration Complete
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* --- 下方確認按鈕區 (獨立區域) --- */}
      <div className="h-20 flex items-start justify-center w-full z-20">
        <AnimatePresence>
            {selectedTaste && !isConfirmed && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                >
                    <button
                        onClick={handleConfirm}
                        className="px-12 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl 
                                   text-white tracking-[0.5em] hover:bg-white/10 hover:border-cyan-200/50 
                                   transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] whitespace-nowrap"
                    >
                        品嘗儀式
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

    </div>
  );
}
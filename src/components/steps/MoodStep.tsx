"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOODS } from "../../data/moodConfig";

interface MoodStepProps {
  onComplete: (moodId: string) => void;
}

export default function MoodStep({ onComplete }: MoodStepProps) {
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);
  const [positions, setPositions] = useState<{x: number, y: number}[]>([]);

  useEffect(() => {
    // 💡 調整參數：讓泡泡群稍微緊湊一點，解決 "黏住字" 的問題
    const COLS = 3; 
    const X_SPACING = 150; // 水平間距
    const Y_SPACING = 110; // 📉 垂直間距縮小，讓上下留出更多空間

    const newPositions = MOODS.map((_, index) => {
      const col = index % COLS; 
      const row = Math.floor(index / COLS);
      const totalRows = Math.ceil(MOODS.length / COLS);

      // 計算中心點座標
      const baseX = (col - (COLS - 1) / 2) * X_SPACING;
      // 這裡加個 -20 的 offset，讓整體位置稍微偏上一點點，避開下方按鈕
      const baseY = (row - (totalRows - 1) / 2) * Y_SPACING - 20;

      // 隨機擾動 (Jitter)
      const jitterX = Math.random() * 40 - 20;
      const jitterY = Math.random() * 30 - 15;

      return {
        x: baseX + jitterX,
        y: baseY + jitterY,
      };
    });
    
    setPositions(newPositions);
  }, []);

  return (
    // 增加 py-20 確保上下都有安全距離
    <div className="relative flex flex-col items-center justify-center w-full min-h-[700px] overflow-hidden py-20">
      
      {/* 標題 */}
      <motion.p 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 text-pink-100 text-lg tracking-[0.3em] font-light z-20 pointer-events-none mix-blend-plus-lighter"
      >
        — 捕捉此刻的心緒 —
      </motion.p>

      {/* 泡泡容器 */}
      <div className="relative w-full h-full flex items-center justify-center">
        {positions.length > 0 && MOODS.map((mood, index) => {
          const isSelected = selectedMoodId === mood.id;
          
          // 每個泡泡獨特的形狀
          const randomShape = index % 2 === 0 
            ? "60% 40% 30% 70% / 60% 30% 70% 40%" 
            : "40% 60% 70% 30% / 40% 70% 30% 60%";

          // 🌬️ 隨機呼吸速度 (有些快有些慢，才像真的生物)
          const breathingDuration = 3 + (index % 4) + Math.random(); 
          const floatDuration = 5 + (index % 3) + Math.random();

          return (
            <motion.div
              key={mood.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                opacity: 1,
                // 📍 X軸：加上一點點微幅擺動
                x: [positions[index].x, positions[index].x + 5, positions[index].x - 5, positions[index].x],
                
                // 🎈 Y軸：漂浮效果 (Floating)
                y: [positions[index].y, positions[index].y - 12, positions[index].y + 8, positions[index].y],
                
                // 🫁 呼吸效果 (Breathing)：未選中時忽大忽小，選中時鎖定變大
                scale: isSelected ? 1.35 : [1, 1.05, 0.98, 1], 
              }}
              transition={{
                // 進場
                opacity: { duration: 0.8 },
                
                // 漂浮循環 (Y軸)
                y: {
                  duration: floatDuration, 
                  repeat: Infinity, 
                  repeatType: "mirror", 
                  ease: "easeInOut" 
                },
                // 擺動循環 (X軸)
                x: {
                  duration: floatDuration * 1.5, // 時間錯開，路徑才不會太規律
                  repeat: Infinity, 
                  repeatType: "mirror", 
                  ease: "easeInOut" 
                },
                // 呼吸循環 (Scale)
                scale: {
                  duration: isSelected ? 0.3 : breathingDuration, // 選中時快速變大，平時慢呼吸
                  repeat: isSelected ? 0 : Infinity, // 選中就不呼吸了，定住
                  repeatType: "mirror",
                  ease: "easeInOut"
                }
              }}
              onClick={() => setSelectedMoodId(mood.id)}
              
              className={`
                absolute cursor-pointer flex items-center justify-center text-center p-4
                bg-gradient-to-br backdrop-blur-md border-2
                transition-colors duration-500 box-content
                ${isSelected 
                  ? 'border-white z-50 shadow-[0_0_60px_rgba(255,255,255,0.7)] mix-blend-normal' 
                  : 'border-white/30 z-10 hover:border-white/80 hover:bg-white/10 mix-blend-screen'}
                ${mood.colors.join(" ")}
              `}
              style={{
                width: '125px', // 稍微調小一點點寬度，避免太擠
                height: '105px',
                borderRadius: randomShape,
                boxShadow: isSelected ? 'inset 0 0 30px rgba(255,255,255,0.6)' : 'none'
              }}
            >
              {/* 泡泡內容 */}
              <div className="relative z-10 flex flex-col items-center pointer-events-none">
                <span className={`text-sm tracking-widest font-bold drop-shadow-md ${isSelected ? 'text-white' : 'text-white/95'}`}>
                  {mood.label}
                </span>
                
                <AnimatePresence>
                  {isSelected && (
                     <motion.span 
                       initial={{ opacity: 0, scale: 0.8 }} 
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.8 }}
                       className="text-[10px] mt-2 text-white/90 font-medium leading-tight px-1"
                     >
                       {mood.traits}
                     </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* 卡通小尾巴 (選中時出現) */}
              {isSelected && (
                <>
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -bottom-3 -right-3 w-5 h-5 rounded-full bg-white/50 backdrop-blur-xl shadow-lg" 
                  />
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="absolute -bottom-8 -right-8 w-3 h-3 rounded-full bg-white/40 backdrop-blur-xl shadow-lg" 
                  />
                </>
              )}

            </motion.div>
          );
        })}
      </div>

      {/* 確認按鈕 */}
      <AnimatePresence>
        {selectedMoodId && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-10 z-50"
          >
            <button
              onClick={() => onComplete(selectedMoodId)}
              className="px-12 py-3 bg-white/20 hover:bg-white/30 border border-white/50 rounded-full text-white tracking-[0.2em] backdrop-blur-xl transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
            >
              確認心境
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
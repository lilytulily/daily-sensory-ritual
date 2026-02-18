"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ENVIRONMENTS } from "../../data/envConfig";

// 簡單的 Fisher-Yates shuffle 函式（打亂陣列）
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface EnvSelectStepProps {
  onComplete: (ids: string[]) => void;
  maxSelect?: number;
  isScpMode?: boolean;
}

export default function EnvSelectStep({
  onComplete,
  maxSelect = 3,
  isScpMode = false,
}: EnvSelectStepProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 只在組件第一次 render 時打亂一次
  const shuffledEnvironments = useMemo(() => shuffleArray(ENVIRONMENTS), []);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : prev.length < maxSelect
        ? [...prev, id]
        : prev
    );
  };

  const getImagePath = (id: string) => `/images/envpic/${id}_pic.jpg`;

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-[600px] p-4">
      {/* 頂部引導 */}
      <div className="text-center z-20 mb-8">
        <p className="text-cyan-100 text-lg tracking-[0.4em] font-light">— 捕獲環境座標 —</p>
        <p className="text-white/40 text-[10px] tracking-[0.2em] mt-2 uppercase">
          點擊圖片鎖定維度（已選擇 {selectedIds.length} / {maxSelect}）
        </p>
      </div>

      {/* 響應式網格，使用打亂後的陣列 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {shuffledEnvironments.map((env) => {
          const isSelected = selectedIds.includes(env.id);
          const imagePath = getImagePath(env.id);

          return (
            <motion.button
              key={env.id}
              onClick={() => toggleSelect(env.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative rounded-xl overflow-hidden aspect-square cursor-pointer transition-all duration-500 group
                ${isSelected
                  ? "ring-4 ring-cyan-400/50 shadow-2xl shadow-cyan-500/25 scale-105 z-10"
                  : "hover:ring-2 hover:ring-white/20"}
                ${isScpMode ? "filter grayscale hover:filter-none" : ""}`}
              aria-label={`選擇 ${env.label}`}
            >
              <Image
                src={imagePath}
                alt={env.label}
                fill
                className="object-cover group-hover:brightness-110 transition-all duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              <div
                className={`absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 text-center transition-all duration-500
                  ${isSelected ? "bg-cyan-500/30 text-white" : "text-white/70 group-hover:text-white"}`}
              >
                <span className="text-xs font-bold tracking-widest uppercase">
                  {env.label}
                </span>
              </div>

              {isSelected && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black text-xs font-bold"
                >
                  ✓
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* 選中預覽 + 完成按鈕 保持不變 */}
      {/* ... 原來的 AnimatePresence 預覽輪播 + 完成按鈕 ... */}
      
      <AnimatePresence>
        {selectedIds.length === maxSelect && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => onComplete(selectedIds)}
            className="mt-8 px-12 py-3 bg-white/10 border border-cyan-400/30 rounded-full text-cyan-100 text-xs tracking-[0.5em] hover:bg-cyan-400/20 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          >
            鎖定環境
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
"use client";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ORACLE_PROMPTS } from "../../data/oraclePrompts";
import { getDayAnalysis } from "../../lib/validation";

interface DayStepProps {
  onComplete: (day: string) => void;
}

export default function DayStep({ onComplete }: DayStepProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);

  // --- 星軌拉桿邏輯 ---
  const dragX = useMotionValue(0);
  // 將拖曳的 X 軸位移（-140 到 140 像素）映射到日期（1 到 31）
  const dayDisplay = useTransform(dragX, [-140, 140], [1, 31]);

  useEffect(() => {
    // 當物理位移改變時，更新顯示的整數日期
    const unsubscribe = dayDisplay.on("change", (latest) => {
      setSelectedDay(Math.round(latest));
    });
    return () => unsubscribe();
  }, [dayDisplay]);

  // 1. 初始打字：詢問日期
  useEffect(() => {
    let i = 0;
    const text = ORACLE_PROMPTS.day.pre;
    const timer = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(timer);
        setIsTypingDone(true);
      }
    }, 60);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    setIsSubmitted(true);
    const analysis = getDayAnalysis(selectedDay.toString());
    
    // 2. 顯示日期的神祕評語
    let i = 0;
    const postText = analysis?.comment || "";
    const timer = setInterval(() => {
      setDisplayText(postText.slice(0, i));
      i++;
      if (i > postText.length) {
        clearInterval(timer);
         // 延遲
        setTimeout(() => onComplete(selectedDay.toString()), 2400);
      }
    }, 60);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex flex-col items-center w-full"
    >
      <p className="whitespace-pre-line text-pink-100 text-lg md:text-xl font-light tracking-[0.2em] min-h-[4em] mb-12 text-center leading-relaxed px-4">
        {displayText}
        {!isSubmitted && <span className="animate-pulse ml-1">|</span>}
      </p>

      {isTypingDone && !isSubmitted && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex flex-col items-center w-full max-w-sm"
        >
          {/* 星軌拉桿主體 */}
          <div className="relative w-72 h-32 flex items-center justify-center">
            {/* 背景軌道線 */}
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            
            {/* 核心顯示數字：帶有發光特效 */}
            <motion.div className="text-8xl font-bold text-cyan-200 drop-shadow-[0_0_20px_rgba(165,243,252,0.6)] font-mono">
              {selectedDay}
            </motion.div>

            {/* 可拖曳的校準器 */}
            <motion.div
              drag="x"
              dragConstraints={{ left: -140, right: 140 }}
              dragElastic={0.1}
              style={{ x: dragX }}
              className="absolute w-12 h-12 bg-white/10 border border-white/50 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center backdrop-blur-md shadow-lg"
            >
              {/* 校準器的中心光點 */}
              <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]" />
              {/* 裝飾性擴散環 */}
              <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" />
            </motion.div>
          </div>

          <p className="mt-4 text-white/40 text-[10px] tracking-[0.4em] uppercase font-light">
            左右滑動以校準時空座標
          </p>

          <motion.button
            whileHover={{ scale: 1.05, borderColor: "rgba(165,243,252,0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="mt-12 px-12 py-3 border border-cyan-300/20 rounded-full text-cyan-100 text-xs tracking-[0.5em] transition-all hover:bg-cyan-300/5"
          >
            鎖定座標
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
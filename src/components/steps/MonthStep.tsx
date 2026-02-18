"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ORACLE_PROMPTS } from "../../data/oraclePrompts";
import { getMonthAnalysis } from "../../lib/validation";

const ROMAN_MONTHS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

interface MonthStepProps {
  onComplete: (month: string) => void;
}

export default function MonthStep({ onComplete }: MonthStepProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  // 1. 初始打字：詢問月份
  useEffect(() => {
    let i = 0;
    const text = ORACLE_PROMPTS.month.pre;
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

  const handleSelect = (month: number) => {
    setIsSubmitted(true);
    const analysis = getMonthAnalysis(month.toString());
    
    // 2. 顯示月份的神祕評語
    let i = 0;
    const postText = analysis.comment || "月份頻率已鎖定。";
    const timer = setInterval(() => {
      setDisplayText(postText.slice(0, i));
      i++;
      if (i > postText.length) {
        clearInterval(timer);
        setTimeout(() => onComplete(month.toString()), 2400);
      }
    }, 60);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex flex-col items-center w-full"
    >
      <p className="whitespace-pre-line text-pink-100 text-lg md:text-xl font-light tracking-[0.2em] min-h-[4em] mb-12 text-center leading-relaxed px-4">
        {displayText}
        {!isSubmitted && <span className="animate-pulse ml-1">|</span>}
      </p>

      {isTypingDone && !isSubmitted && (
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: 0.05 } }
          }}
          className="grid grid-cols-4 gap-4 md:gap-6 justify-items-center"
        >
          {ROMAN_MONTHS.map((roman, i) => (
            <motion.button
              key={roman}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 }
              }}
              onMouseEnter={() => setHoveredMonth(i + 1)}
              onMouseLeave={() => setHoveredMonth(null)}
              onClick={() => handleSelect(i + 1)}
              whileHover={{ scale: 1.15, borderColor: "rgba(255,255,255,0.6)", backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white font-serif text-lg backdrop-blur-md transition-all duration-300"
            >
              {hoveredMonth === i + 1 ? (i + 1) : roman}
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
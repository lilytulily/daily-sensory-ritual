"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ORACLE_PROMPTS } from "../../data/oraclePrompts";
import { getYearAnalysis } from "../../lib/validation";

interface YearStepProps {
  onComplete: (year: string) => void;
}

export default function YearStep({ onComplete }: YearStepProps) {
  const [displayText, setDisplayText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 1. 初始打字：詢問年份
  useEffect(() => {
    let i = 0;
    const text = ORACLE_PROMPTS.year.pre;
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
    // 分析邏輯
    const analysis = getYearAnalysis(inputValue);
    
    if (analysis.error) {
      setDisplayText(analysis.error); // 噴出警告
      return;
    }

    setIsSubmitted(true);
    
    // 2. 提交後的打字：顯示針對年份的分析
    let i = 0;
    const postText = analysis.comment || ORACLE_PROMPTS.year.post.default;
    
    const timer = setInterval(() => {
      setDisplayText(postText.slice(0, i));
      i++;
      if (i > postText.length) {
        clearInterval(timer);
        // 延遲
        setTimeout(() => onComplete(inputValue), 2400);
      }
    }, 60);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center w-full"
    >
      <p className="whitespace-pre-line text-pink-100 text-lg md:text-xl font-light tracking-[0.2em] min-h-[4em] mb-12 text-center leading-relaxed px-4">
        {displayText}
        {!isSubmitted && <span className="animate-pulse ml-1">|</span>}
      </p>

      {isTypingDone && !isSubmitted && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6 w-full max-w-sm"
        >
          <input 
            autoFocus
            type="text"
            inputMode="numeric" // 手機自動跳出數字鍵盤
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.replace(/\D/g, '').slice(0, 4))} // 只准輸入4位數字
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="YYYY"
            className="bg-white/5 backdrop-blur-md border-2 border-white/10 rounded-full px-8 py-4 w-full text-center text-white text-2xl tracking-[0.5em] outline-none focus:border-cyan-300/30 transition-all shadow-inner"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="px-10 py-2 bg-white/10 border border-white/20 rounded-full text-sm tracking-widest hover:bg-white/20 uppercase font-light"
          >
            校準年份
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
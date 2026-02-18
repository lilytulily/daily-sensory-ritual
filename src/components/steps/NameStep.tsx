"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ORACLE_PROMPTS } from "../../data/oraclePrompts";
import { validateInput } from "../../lib/validation";

interface NameStepProps {
  onComplete: (name: string) => void;
}

export default function NameStep({ onComplete }: NameStepProps) {
  const [displayText, setDisplayText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 打字機效果
  useEffect(() => {
    let i = 0;
    const text = ORACLE_PROMPTS.identifier.pre;
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
    const error = validateInput(inputValue, "name");
    
    if (error) {
      // 如果有錯，讓打字機噴出錯誤訊息
      setDisplayText(error);
      return;
    }

    setIsSubmitted(true);
    // 跑 post 回饋文案
    let i = 0;
    const postText = ORACLE_PROMPTS.identifier.post;
    const timer = setInterval(() => {
      setDisplayText(postText.slice(0, i));
      i++;
      if (i > postText.length) {
        clearInterval(timer);
        // 延遲一下下，讓使用者讀完文案再進入下一步
        setTimeout(() => onComplete(inputValue), 2400);
      }
    }, 60);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="在此輸入代號..."
            className="bg-white/5 backdrop-blur-md border-2 border-white/10 rounded-full px-8 py-4 w-full text-center text-white outline-none focus:border-cyan-300/30 transition-all shadow-inner"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="px-10 py-2 bg-white/10 border border-white/20 rounded-full text-sm tracking-widest hover:bg-white/20"
          >
            確認代號
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
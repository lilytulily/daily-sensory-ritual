// src/components/steps/ScpStep.tsx
"use client";
import { motion } from "framer-motion";
import { SCP_QUESTIONS } from "@/data/scpConfig";
import { useState } from "react";

interface ScpStepProps {
  onComplete: (scpResults: any) => void;
}

export const ScpStep = ({ onComplete }: ScpStepProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  
  const currentQuestion = SCP_QUESTIONS[currentIdx];

  const handleSelect = (option: any) => {
    const newAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(newAnswers);

    if (currentIdx < SCP_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // 進入最後結果生成
      onComplete(newAnswers);
    }
  };

  return (
    <div className="scp-text min-h-[400px] flex flex-col justify-center items-start p-8 space-y-6">
      {/* 異常編號裝飾 */}
      <div className="text-xs opacity-50 mb-4 glitch-anim">
        [REDACTED] STATUS: UNSTABLE_LOG_#0{currentIdx + 1}
      </div>

      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-2"
      >
        <h2 className="text-2xl font-bold tracking-widest uppercase">
          {currentQuestion.text}
        </h2>
        {currentQuestion.subText && (
          <p className="text-sm italic text-red-500 opacity-80">
            {currentQuestion.subText}
          </p>
        )}
      </motion.div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {currentQuestion.options.map((opt, index) => (
          <button
            key={index}
            onClick={() => handleSelect(opt)}
            className="border border-green-900/50 bg-black/40 p-4 text-left hover:bg-green-900/20 hover:border-green-500 transition-all group relative overflow-hidden"
          >
            <span className="relative z-10">{opt.label}</span>
            {/* 懸停時的微小干擾條 */}
            <div className="absolute inset-0 bg-green-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
          </button>
        ))}
      </div>

      {/* 底部裝飾線 */}
      <div className="w-full h-px bg-green-900/30 mt-8" />
    </div>
  );
};
// src/components/ritual/ScpResult.tsx
"use client";
import { motion } from "framer-motion";

export const ScpResult = () => {
  // 暫時隨機顯示一段怪談指南
  const placeholderRules = [
    "規則一：如果看見鏡子裡的你正在對你笑，請立刻與他同步對鏡子裡笑。",
    "規則二：牆壁的滲水溢出，那在台北市是正常的，若不在台北市請背對不要看它。",
    "規則三：不要與任何宣稱自己是系統管理員的生物(例如:Lily)交談。",
    "規則四：本儀式已失效。請保持安靜，祂正在門外。"
  ];

  return (
    <div className="scp-text p-10 border-2 border-red-900 bg-black/80 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-red-600 glitch-anim">異常收容報告</h1>
      <div className="space-y-4 text-lg">
        <p className="border-l-4 border-green-500 pl-4 bg-green-900/10 py-2">
          偵測到深度意識偏差。以下為您的生存指南：
        </p>
        <ul className="list-disc list-inside space-y-3 opacity-90">
          {placeholderRules.map((rule, i) => (
            <motion.li 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: i * 0.5 }}
              key={i}
            >
              {rule}
            </motion.li>
          ))}
        </ul>
      </div>
      <button 
        onClick={() => window.location.reload()}
        className="mt-10 px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-colors"
      >
        嘗試終止程序...
      </button>
    </div>
  );
};
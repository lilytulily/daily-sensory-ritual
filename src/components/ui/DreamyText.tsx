import { motion } from "framer-motion";

export const DreamyText = ({ text }: { text: string }) => {
  const lines = text.split("\n");

  return (
    <div className="text-center">
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="mb-4 last:mb-0">
          {line.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              // 1. 初始狀態 
              initial={{ 
                opacity: 0, 
                y: 10, 
                filter: "blur(8px)", 
                scale: 0.8 
              }}
              // 2. 動畫狀態 (結合了進場與呼吸)
              animate={{ 
                opacity: [0, 1, 0.7, 1], // 從 0 到 1 (進場)，然後在 0.7~1 之間呼吸
                y: 0,
                filter: [
                  "blur(8px)", 
                  "blur(0px)", 
                  "drop-shadow(0 0 15px rgba(255,182,193,0.6))", 
                  "drop-shadow(0 0 8px rgba(255,182,193,0.3))"
                ],
                scale: [0.8, 1, 0.98, 1],
              }}
              transition={{
                // 進場動畫的延遲
                delay: charIndex * 0.1 + lineIndex * 0.5,
                // 呼吸效果的設定
                duration: 3,
                times: [0, 0.2, 0.6, 1], // 定義動畫階段：前 20% 是進場，後 80% 是呼吸
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: "easeInOut",
              }}
              className="inline-block text-pink-100 text-xl md:text-2xl font-light tracking-[0.2em]"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
};
// src/components/ui/ScpBackground.tsx
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ScpBackgroundProps {
  isScpMode: boolean;
}

export const ScpBackground = ({ isScpMode }: ScpBackgroundProps) => {
  if (!isScpMode) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-black transition-colors duration-[3000ms]">
      {/* 1. 底層紅色氛圍 (像警告燈) */}
      <motion.div
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#7f1d1d_0%,transparent_70%)]"
      />

      {/* 2. Glitch 條紋效果 */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full bg-red-600 h-[1px]"
            initial={{ top: `${Math.random() * 100}%` }}
            animate={{
              top: ["0%", "100%"],
              opacity: [0, 1, 0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* 3. CRT 掃描線效果 (綠色終端感) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 255, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.05))",
          backgroundSize: "100% 4px, 3px 100%"
        }}
      />

      {/* 4. 隨機出現的「數位殘影」 (Glitch Box) */}
      <motion.div
        animate={{
          x: [-100, 100, -50],
          y: [-50, 50, 100],
          opacity: [0, 0.3, 0],
        }}
        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
        className="absolute w-40 h-40 bg-red-900 mix-blend-screen blur-xl"
      />

      {/* 5. 文字容器樣式定義 (供父元件使用) */}
      <style jsx global>{`
        .scp-text {
          color: #22c55e; /* Tailwind green-500 */
          text-shadow: 0 0 5px #22c55e, 0 0 10px #22c55e;
          font-family: 'Courier New', Courier, monospace;
          filter: contrast(1.5);
        }
        .glitch-anim {
          animation: glitch 0.3s infinite;
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  );
};
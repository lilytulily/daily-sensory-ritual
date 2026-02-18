// src/components/ui/BackgroundOracle.tsx
"use client";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

// 新增 props 定義
interface BackgroundOracleProps {
  isScpMode?: boolean;
}

export const BackgroundOracle = ({ isScpMode = false }: BackgroundOracleProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // SCP 模式下，滑鼠跟隨會變得遲鈍或過於靈敏 (Uncanny feel)
  const springConfig = isScpMode 
    ? { damping: 10, stiffness: 300 } // SCP: 抖動、神經質
    : { damping: 50, stiffness: 100 }; // Normal: 滑順

  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0));
      mouseY.set(e.clientY - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isScpMode]);

  // 定義顏色變數
  const bgBase = isScpMode ? "bg-black" : "bg-[#0B1026]";
  
  // SCP 模式的霧氣是暗紅/深灰，正常模式是藍紫/青色
  const blobColor1 = isScpMode ? "bg-red-900/40" : "bg-purple-500/30";
  const blobColor2 = isScpMode ? "bg-gray-800/50" : "bg-blue-500/30";
  const blobColor3 = isScpMode ? "bg-black/80" : "bg-cyan-500/30";

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden transition-colors duration-[2000ms] ${bgBase}`}>
      
      {/* SCP 專屬：雜訊 (Noise) 覆蓋層 */}
      {isScpMode && (
        <div className="absolute inset-0 opacity-20 pointer-events-none z-50 mix-blend-overlay">
          <svg className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
      )}

      {/* 原本的雲絮質感層 */}
      <div className={`absolute inset-0 mix-blend-overlay pointer-events-none ${isScpMode ? 'opacity-10' : 'opacity-30'}`}>
         <motion.div 
            animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-5%] w-[120%] h-[120%] bg-[url('https://www.transparenttextures.com/patterns/p6.png')] opacity-20" 
         />
      </div>

      {/* 夢幻雲團 1 (主視覺) */}
      <motion.div 
        style={{ x: smoothX, y: smoothY }}
        className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] ${blobColor1} rounded-full blur-[100px] transition-colors duration-[2000ms]`}
      />

      {/* 夢幻雲團 2 (副視覺) */}
      <motion.div 
        animate={{ 
          x: isScpMode ? [-10, 10, -5, 5] : [0, 100, 0], // SCP 模式下是微顫抖
          scale: isScpMode ? [1, 1.1, 0.9, 1] : [1, 1.2, 1] 
        }}
        transition={{ 
          duration: isScpMode ? 0.2 : 10, // SCP 模式頻率極快
          repeat: Infinity, 
          repeatType: isScpMode ? "mirror" : "reverse" 
        }}
        className={`absolute top-1/3 right-1/4 w-[400px] h-[400px] ${blobColor2} rounded-full blur-[80px] transition-colors duration-[2000ms]`}
      />

      {/* 夢幻雲團 3 (底層) */}
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className={`absolute bottom-0 left-1/3 w-[600px] h-[600px] ${blobColor3} rounded-full blur-[120px] transition-colors duration-[2000ms]`}
      />
    </div>
  );
};
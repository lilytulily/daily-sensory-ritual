"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResultProps {
  userData: any; // 暫時 any，之後換回 UserData
  onReset: () => void;
  isScpMode: boolean;
}

// 假資料（超夢幻版）
const mockUserData = {
  name: "Lily",
  timestamp: "2026/03/09 深夜 23:47",
  weather: "霧雨交織的量子薄霧",
  location: { address: "板橋 × 邊界維度交界處" },
  mood: "漂浮於粉紫色的倦怠與期待之間",
  scent: "潮濕的舊書頁與遠方焚香的餘韻",
  bodyFeel: "皮膚像被月光輕輕撫過，微微發燙",
  taste: "舌尖殘留的藍莓薄荷與未說出口的秘密",
  environments: ["碎浪灘", "極光湖", "發光樹"],
};

const mockElements = {
  wood: 4,
  fire: -1,
  earth: 2,
  metal: 3,
  water: 5,
};

const mockSuggestions = {
  energyFormula:
    "今夜的你被水元素深深擁抱，建議在窗邊點一盞藍色小燈，讓霧雨的頻率與室內光暈共振。香氛配方：乳香 + 海洋鹽 + 一絲雪松，讓呼吸成為穿越維度的通道。",
  microRitual:
    "子夜時分，赤腳踩在地板上，閉眼想像腳底生出銀色根莖，往下扎進地球的核心，往上延伸到今晚最亮的那顆星。持續 3 分 33 秒，然後輕聲對自己說：『我允許自己漂浮。』",
  sensoryTea:
    "今晚最適合的是一杯冰鎮薰衣草藍莓茶，杯緣沾一點海鹽，喝的時候想像每一口都在沖刷掉白天殘留的灰塵，讓舌尖重新學會發光。",
};

export const RESULT = ({ userData = mockUserData, onReset, isScpMode }: ResultProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 模擬載入完成，讓動畫更有儀式感
    const timer = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isScpMode) {
    return (
      <div className="text-red-500 text-2xl text-center p-10">
        [SCP 模式已啟動] 請勿關閉終端...
      </div>
    );
  }

  const getLabel = (id: string) => id; // 假資料直接用敘述性文字

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-20 w-full max-w-5xl mx-auto px-4 py-16 min-h-screen flex flex-col items-center"
    >
      {/* 背景光暈 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-tl from-pink-500/10 to-blue-600/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      <motion.h2
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-light tracking-[0.6em] mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 text-center"
        style={{ textShadow: "0 0 40px rgba(168,85,247,0.4)" }}
      >
        儀式已完成
          <p className="text-white/20 text-[10px] tracking-widest max-w-xs mx-auto leading-loose">
            此為《每日使用說明書》的預定完成的預想結果頁面， <br/>
            注意！此頁面尚未完成，顯示結果與您選擇的不同為正常現象。
          </p>
      </motion.h2>
    

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.92 }}
        transition={{ duration: 1.4, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full relative"
      >
        {/* 卡片 1 - 維度座標 */}
        <GlassCard title="維度座標" icon="🌌" delay={0.1}>
          <div className="text-3xl font-light text-cyan-200 mb-2">{userData.timestamp}</div>
          <div className="text-lg opacity-90 leading-relaxed">
            {userData.weather}
            <br />
            <span className="text-sm opacity-70">@{userData.location.address}</span>
          </div>
        </GlassCard>

        {/* 卡片 2 - 能量基底 */}
        <GlassCard title="能量基底" icon="⚡" delay={0.2}>
          <p className="text-xl leading-relaxed">
            {userData.name}，<br />
            你已被輕輕校準至今夜的頻率。
          </p>
          <div className="mt-4 space-y-1 text-sm opacity-90">
            <div>心境：{userData.mood}</div>
            <div>氣息：{userData.scent}</div>
            <div>體感：{userData.bodyFeel}</div>
            <div>餘味：{userData.taste}</div>
            <div className="mt-3 text-pink-300">
              環境共振：{userData.environments.join}
            </div>
          </div>
        </GlassCard>

        {/* 卡片 3 - 能量空間配方 */}
        <GlassCard title="能量空間配方" icon="🌿" delay={0.3}>
          <p className="text-base leading-relaxed opacity-90">
            {mockSuggestions.energyFormula}
          </p>
        </GlassCard>

        {/* 卡片 4 - 微儀式神諭 */}
        <GlassCard title="微儀式神諭" icon="🕯️" delay={0.4}>
          <p className="text-base leading-relaxed opacity-90">
            {mockSuggestions.microRitual}
          </p>
        </GlassCard>

        {/* 卡片 5 - 感官下午茶 */}
        <GlassCard title="感官下午茶" icon="☕" delay={0.5}>
          <p className="text-base leading-relaxed opacity-90">
            {mockSuggestions.sensoryTea}
          </p>
        </GlassCard>

        {/* 卡片 6 - 五行能量圖 */}
        <GlassCard title="五行能量圖" icon="🔮" delay={0.6}>
          <div className="flex flex-wrap gap-3 text-sm mb-3">
            <span className="px-3 py-1 bg-green-900/30 rounded-full">木 +{mockElements.wood}</span>
            <span className="px-3 py-1 bg-red-900/30 rounded-full">火 {mockElements.fire}</span>
            <span className="px-3 py-1 bg-yellow-900/30 rounded-full">土 +{mockElements.earth}</span>
            <span className="px-3 py-1 bg-gray-900/30 rounded-full">金 +{mockElements.metal}</span>
            <span className="px-3 py-1 bg-blue-900/30 rounded-full">水 +{mockElements.water}</span>
          </div>
          <p className="text-sm opacity-90 leading-relaxed">
            水元素今夜主導，建議讓情緒像湖水一樣緩緩流動，不要強行阻擋。
          </p>
        </GlassCard>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168,85,247,0.5)" }}
        whileTap={{ scale: 0.98 }}
        onClick={onReset}
        className="mt-16 px-12 py-5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-xl border border-purple-400/40 rounded-full text-lg tracking-[0.4em] text-purple-200 hover:text-white transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)]"
      >
        重新對齊頻率
      </motion.button>
    </motion.div>
  );
};

// 共用玻璃態卡片元件
function GlassCard({
  title,
  icon,
  children,
  delay = 0,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.4 } }}
      className="relative p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
    >
      {/* 懸浮光暈 */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-lg font-light tracking-widest text-white/80 uppercase">{title}</h3>
        </div>
        {children}
      </div>
    </motion.div>
  );
}

// 額外動畫 keyframes（可加到 globals.css 或 tailwind）
/*
@keyframes pulse-slow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.15); }
}
.animate-pulse-slow {
  animation: pulse-slow 12s infinite ease-in-out;
}
*/
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ScpResult } from "../ritual/ScpResult";
import { calculateElements, Elements } from "@/lib/elementLogic";
import { UserData } from "@/types/ritualTypes";
import { MOODS } from "@/data/moodConfig";
import { SCENTS } from "@/data/scentConfig";
import { BODY_SENSATIONS } from "@/data/bodySensationConfig";
import { TASTES } from "@/data/tasteConfig";
import { ENVIRONMENTS } from "@/data/envConfig";
import { DreamyText } from "../../components/ui/DreamyText";


interface AiSuggestions {
  energyFormula: string;
  microRitual: string;
  sensoryTea: string;
}

interface ResultProps {
  userData: UserData;
  onReset: () => void;
  isScpMode: boolean;
}

export const RESULT = ({ userData, onReset, isScpMode }: ResultProps) => {
  const [suggestions, setSuggestions] = useState<AiSuggestions | null>(null);
  const [elements, setElements] = useState<Elements | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const elementsCalc = calculateElements(userData);
    setElements(elementsCalc);

    if (isScpMode) {
      setLoading(false);
      return;
    }

    const generateSuggestions = async () => {
      try {
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const elementSummary = `五行總分: 木${elementsCalc.wood}, 火${elementsCalc.fire}, 土${elementsCalc.earth}, 金${elementsCalc.metal}, 水${elementsCalc.water}`;

        const prompt = `
          基於使用者資料和五行，生成療癒感官微指引。輸出 JSON: {"energyFormula": "生活風格建議 (1-2句, 如熱開冷氣; 香味配方如雪松+玫瑰)", "microRitual": "每日任務 (1-2句, 如帶雨傘/紫色物/注意紅綠燈)", "sensoryTea": "下午茶飲料建議 (1句, 如適合的茶/飲料)" }。
          資料：姓名 ${userData.name} | 心情 ${userData.mood} | 氣味 ${userData.scent} | 身體 ${userData.bodyFeel} | 環境 ${userData.environments.join(', ')} | 味覺 ${userData.taste} | 天氣 ${userData.weather} | ${elementSummary}。
          風格：夢幻、溫柔指引，聚焦今天微行動。融入五行 (e.g., 火高建議涼爽; 水高加水元素)。
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const jsonStr = response.text().replace(/```json\n?|\n?```/g, '');
        const parsed = JSON.parse(jsonStr) as AiSuggestions;

        setSuggestions(parsed);
      } catch (err) {
        console.error("AI 生成失敗:", err);
        setError("頻率中斷... 使用預設。");
        setSuggestions({
          energyFormula: `在 ${userData.weather} 中，讓 ${userData.mood} 平衡。試試 ${userData.scent} + 玫瑰配方；如果熱，開冷氣流動能量。`,
          microRitual: `今天帶把傘（雨天備用），注意紅綠燈；幸運物：紫色小物增強木元素。`,
          sensoryTea: `適合 ${userData.taste} 風味的涼茶，平衡火元素。`
        });
      } finally {
        setLoading(false);
      }
    };

    generateSuggestions();
  }, [userData, isScpMode]);

  if (isScpMode) {
    return <ScpResult />;
  }

  const locationStr = userData.location?.address || "未知維度";

  const getLabel = (options: any[], id: string) => {
    return options.find(opt => opt.id === id)?.label || id;
  };

  const moodLabel = getLabel(MOODS, userData.mood);
  const scentLabel = getLabel(SCENTS, userData.scent);
  const bodyFeelLabel = getLabel(BODY_SENSATIONS, userData.bodyFeel);
  const tasteLabel = getLabel(TASTES, userData.taste);
  const envLabels = userData.environments.map(id => getLabel(ENVIRONMENTS, id)).join(" • ");

  // 新增：五行平衡提示 helper
  const getElementBalanceTip = (elements: Elements) => {
    const maxElem = Object.entries(elements).reduce((max, [key, val]) => val > max[1] ? [key, val] : max, ['', -Infinity])[0];
    switch (maxElem) {
      case 'wood': return '木元素活躍，多接觸綠色植物，讓成長流暢。';
      case 'fire': return '火元素旺盛，試著涼爽環境，平衡熱情。';
      case 'earth': return '土元素穩定，接地冥想，鞏固內在。';
      case 'metal': return '金元素堅韌，深呼吸金屬般的清晰。';
      case 'water': return '水元素流動，喝水或近水邊，釋放情緒。';
      default: return '元素平衡，維持當下頻率。';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="z-20 w-full max-w-4xl mt-20 px-6"
    >
      <DreamyText text={'儀式完成'}/>
      
      {/* Dashboard Grid - 加到 6 個卡片，lg:grid-cols-3 變兩行三列 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* 卡片 1: 維度座標 */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-xl border border-white/10 rounded-3xl text-center shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        >
          <div className="text-xs text-white/50 uppercase tracking-widest mb-2">維度座標 🌌</div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">🕒</span>
            <p className="text-xl font-light text-cyan-200">{userData.timestamp}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            
            <span className="text-sm text-white/70">{userData.weather} @ {locationStr}</span>
          </div>
        </motion.div>

        {/* 卡片 2: 能量基底 */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        >
          <div className="text-xs text-white/50 uppercase tracking-widest mb-2">能量基底 ⚡</div>
          <p className="text-lg leading-relaxed font-light text-white/90">
            {userData.name}，校準完成。<br />
            心境：{moodLabel} <br />
            氣息：{scentLabel} <br />
            感受：{bodyFeelLabel} <br />
            味覺：{tasteLabel}
          </p>
          {userData.environments.length > 0 && (
            <div className="mt-2 text-sm text-pink-300">
              環境：{envLabels}
            </div>
          )}
        </motion.div>

        {/* 卡片 3: 能量空間配方 */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        >
          <div className="text-xs text-white/50 uppercase tracking-widest mb-2">能量空間配方 🌿</div>
          <AnimatePresence>
            {loading ? (
              <motion.p className="text-sm text-white/70 animate-pulse">對齊中...</motion.p>
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm leading-relaxed text-white/90">
                {suggestions?.energyFormula || "平衡你的能量..."}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 卡片 4: 微儀式神諭 */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-gradient-to-br from-pink-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        >
          <div className="text-xs text-white/50 uppercase tracking-widest mb-2">微儀式神諭 🕯️</div>
          <AnimatePresence>
            {loading ? (
              <motion.p className="text-sm text-white/70 animate-pulse">指引生成中...</motion.p>
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm leading-relaxed text-white/90">
                {suggestions?.microRitual || "今天的儀式感行動..."}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 卡片 5: 感官下午茶建議 */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        >
          <div className="text-xs text-white/50 uppercase tracking-widest mb-2">神秘好味下午茶 ☕</div>
          <AnimatePresence>
            {loading ? (
              <motion.p className="text-sm text-white/70 animate-pulse">配方調製中...</motion.p>
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm leading-relaxed text-white/90">
                {suggestions?.sensoryTea || "適合你的飲品..."}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 新卡片 6: 五行能量圖 */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        >
          <div className="text-xs text-white/50 uppercase tracking-widest mb-2">五行能量圖 🔮</div>
          {elements ? (
            <div className="text-sm leading-relaxed text-white/90">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-green-300">木{elements.wood}</span>
                <span className="text-red-300">火{elements.fire}</span>
                <span className="text-yellow-300">土{elements.earth}</span>
                <span className="text-gray-300">金{elements.metal}</span>
                <span className="text-blue-300">水{elements.water}</span>
              </div>
              <p>{getElementBalanceTip(elements)}</p>
            </div>
          ) : (
            <p className="text-sm text-white/70 animate-pulse">能量計算中...</p>
          )}
        </motion.div>
      </div>

      {error && <p className="text-center text-yellow-300 text-sm mb-4">{error}</p>}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="mx-auto block text-white/70 hover:text-white transition-colors tracking-[0.2em] text-sm border border-white/20 px-8 py-3 rounded-full backdrop-blur-sm"
      >
        重新對齊頻率
      </motion.button>
    </motion.div>
  );
};

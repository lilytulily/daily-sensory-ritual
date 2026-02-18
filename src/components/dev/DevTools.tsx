"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserData } from "@/types/ritualTypes";

interface DevToolsProps {
  setStep: (step: string) => void;
  setUserData: (data: any) => void;
  setIsStarted: (started: boolean) => void;
  setHasPermission: (has: boolean) => void;
}

export default function DevTools({ 
  setStep, 
  setUserData, 
  setIsStarted, 
  setHasPermission 
}: DevToolsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsDev(true);
    }
  }, []);

  if (!isDev) return null;

  // 上帝模式：注入全套假資料
  const activateGodMode = (targetStep: string) => {
    setUserData({
      name: "超美的測試精靈",
      year: "1991",
      month: "11",
      day: "26",
      mood: "mood_001",
      scent: "scent_001",
      bodyFeel: "feel_001",
      environments: "style_nol_001",
      taste: "taste_001",
      timestamp: new Date().toLocaleString(),
      weather: "晴天",
      temperature: "26", 
      location: "", 
    });

    setHasPermission(true);
    setIsStarted(true);
    setStep(targetStep);
  };

  return (
    <div className="fixed bottom-4 left-4 z-[9999] font-sans">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border border-red-500/50 ${
          isOpen ? 'bg-red-500 text-white rotate-90' : 'bg-black/60 text-red-500 hover:scale-110'
        }`}
      >
        🛠️
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className="absolute bottom-14 left-0 w-64 bg-slate-900/95 backdrop-blur-xl border border-red-500/30 p-5 rounded-2xl shadow-2xl max-h-[80vh] overflow-y-auto custom-scrollbar"
          >
            <div className="flex justify-between items-center mb-4 border-b border-red-500/20 pb-2">
              <p className="text-[10px] text-red-400 font-bold tracking-[0.2em]">GOD MODE</p>
              <button onClick={() => window.location.reload()} className="text-[10px] text-gray-400 hover:text-white">RESET</button>
            </div>
            
            <div className="space-y-4">
              {/* 基礎資訊 */}
              <section>
                <p className="text-[9px] text-gray-500 mb-2 font-bold uppercase">Basic Info</p>
                <div className="grid grid-cols-2 gap-2">
                  <ToolBtn label="姓名" onClick={() => activateGodMode("NAME")} />
                  <ToolBtn label="年份" onClick={() => activateGodMode("YEAR")} />
                  <ToolBtn label="月份" onClick={() => activateGodMode("MONTH")} />
                  <ToolBtn label="日期" onClick={() => activateGodMode("DAY")} />
                </div>
              </section>

              {/* 感官環節 */}
              <section>
                <p className="text-[9px] text-gray-500 mb-2 font-bold uppercase">Sensory Steps</p>
                <div className="grid grid-cols-2 gap-2">
                  <ToolBtn label="Mood (泡泡)" onClick={() => activateGodMode("MOOD")} color="pink" />
                  <ToolBtn label="Scent (氣味)" onClick={() => activateGodMode("SCENT")} color="pink" />
                  <ToolBtn label="Body (體感)" onClick={() => activateGodMode("BODY_FEEL")} color="pink" />
                  <ToolBtn label="Env (環境)" onClick={() => activateGodMode("ENV_SELECT")} color="pink" />
                  <ToolBtn label="Taste (味覺)" onClick={() => activateGodMode("TASTE")} color="pink" />
                </div>
              </section>

              {/* 過渡與結果 */}
              <section>
                <p className="text-[9px] text-gray-500 mb-2 font-bold uppercase">Flow & Results</p>
                <div className="grid grid-cols-2 gap-2">
                  <ToolBtn label="過渡: 偵測完成" onClick={() => activateGodMode("BREAK")} color="gray" />
                  <ToolBtn label="過渡: 頻率收束" onClick={() => activateGodMode("POST_TASTE")} color="gray" />
                  <ToolBtn label="🏆 結果頁面" onClick={() => activateGodMode("RESULT")} color="green" />
                  <ToolBtn label="🏆 SCP結果" onClick={() => activateGodMode("SCP_FLOW")} color="red" />
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToolBtn({ label, onClick, color = "blue" }: { label: string, onClick: () => void, color?: string }) {
  const colorMap: any = {
    blue: "bg-blue-500/10 text-blue-300 border-blue-500/30 hover:bg-blue-500/30",
    pink: "bg-pink-500/10 text-pink-300 border-pink-500/30 hover:bg-pink-500/30",
    green: "bg-green-500/20 text-green-300 border-green-500/40 hover:bg-green-500/40 font-bold",
    gray: "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10",
  };

  return (
    <button
      onClick={onClick}
      className={`text-[10px] py-2 px-2 rounded-lg border transition-all text-left truncate ${colorMap[color]}`}
    >
      {label}
    </button>
  );
}
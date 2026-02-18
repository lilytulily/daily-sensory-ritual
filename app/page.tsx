"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BackgroundOracle } from "../src/components/ui/BackgroundOracle";
import { HeroSection } from "../src/components/ui/HeroSection";
import { JellyVisual } from "../src/components/ui/JellyVisual";
import { DreamyText } from "../src/components/ui/DreamyText";

// 開發者組件
import DevTools from "../src/components/dev/DevTools";

// 引入邏輯與資料
import { checkScpStatus } from "../src/lib/scpLogic";
import { ENVIRONMENTS } from "../src/data/envConfig";

// 步驟組件
import PermissionStep from "../src/components/steps/PermissionStep";
import NameStep from "../src/components/steps/NameStep";
import YearStep from "../src/components/steps/YearStep";
import MonthStep from "../src/components/steps/MonthStep";
import DayStep from "../src/components/steps/DayStep";
import MoodStep from "../src/components/steps/MoodStep";
import ScentStep from "../src/components/steps/ScentStep";
import BodyFeelStep from "../src/components/steps/BodyFeelStep";
import EnvSelectStep from "../src/components/steps/EnvSelectStep";
import TasteStep from "../src/components/steps/TasteStep";
import { ScpStep } from "../src/components/steps/ScpStep";
import { ScpResult } from "../src/components/ritual/ScpResult";
import { ScpBackground } from "../src/components/ui/ScpBackground";
import { RESULT } from "../src/components/ritual/Result";


export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [step, setStep] = useState("NAME");
  const [isScpMode, setIsScpMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showScpResult, setShowScpResult] = useState(false);

  // 環境背景圖片狀態（用來疊加顯示）
  const [selectedEnvImages, setSelectedEnvImages] = useState<string[]>([]);

  const [userData, setUserData] = useState({
    name: "",       // 使用者名稱
    year: "",       //生日的年份
    month: "",     //生日的月份
    day: "",      //生日的日期
    timestamp: "",  // "現在"的時間戳記
    weather: "",    // 天氣
    temperature: "", // 氣溫
    location: null, // 地點初始給 null
    mood: "",       // 心情
    bodyFeel: "",   // 體感
    scent: "",      // 氣味
    taste: "",      // 味道
    environments:[], // 環境標籤 
  });

  // SCP 觸發轉場
  const triggerScpSequence = () => {
    setIsTransitioning(true);
    setIsScpMode(true);

    setTimeout(() => {
      setIsTransitioning(false);
      setStep("SCP_FLOW");
    }, 2500);
  };

  // 自動推進某些中間步驟（BREAK 等）
  useEffect(() => {
  let timer: NodeJS.Timeout;

  const breakSteps: Record<string, string> = {
    BREAK: "MOOD",
    POST_MOOD: "SCENT",
    POST_SCENT: "BODY_FEEL",
    POST_BODY: "ENV_SELECT",
    POST_ENV: "TASTE",
    // POST_TASTE 我們不直接設 nextStep，而是自己檢查 SCP
  };

  // 一般的 break 步驟自動推進
  if (step in breakSteps) {
    timer = setTimeout(() => {
      setStep(breakSteps[step]);
    }, 4000);
  }

  // ★ 關鍵：POST_TASTE 結束後檢查全部 SCP 條件
  if (step === "POST_TASTE") {
    timer = setTimeout(() => {
      const scpStatus = checkScpStatus(userData);

      if (scpStatus.isTriggered) {
        // 不管是 AGE 還是 SCORE，只要觸發就進 SCP
        triggerScpSequence();
      } else {
        setStep("RESULT");
      }
    }, 4000); // 保持 4 秒的過場動畫時間
  }

  return () => clearTimeout(timer);
}, [step, userData]);   // 注意要加入 userData 依賴！

// 1. 保留 birthday 專用完成函式（處理 AGE 異常）
const handleBirthComplete = (field: string, value: any, nextStep: string) => {
  setUserData((prev) => {
    const newData = { ...prev, [field]: value };
    const scpStatus = checkScpStatus(newData);

    // 只在 AGE 異常時立即觸發（避免生日正常但權重高的情況被誤觸）
    if (scpStatus.isTriggered && scpStatus.type === 'AGE') {
      triggerScpSequence();
    } else {
      setStep(nextStep);
    }
    return newData;
  });
};

// 2. 通用的完成函式（其他步驟用）
const handleStepComplete = (field: string, value: any, nextStep: string) => {
  setUserData((prev) => ({ ...prev, [field]: value }));
  setStep(nextStep);
};

  const handlePermissionComplete = (data: { location: any; timestamp: string; weather: string }) => {
    setUserData((prev) => ({ ...prev, ...data }));
    setHasPermission(true);
    setStep("NAME"); // 權限通過後進入 NAME
  };

  const handleReject = () => {
    setIsRejected(true);
    setTimeout(() => {
      setIsRejected(false);
      setIsStarted(false);
      setHasPermission(false);
    }, 3500);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start p-4 overflow-hidden">
      {/* 基礎背景 */}
      <BackgroundOracle />

      {/* 環境選擇後的背景疊加 */}
      <AnimatePresence>
        {selectedEnvImages.length > 0 && step !== "RESULT" && !isScpMode && (
          <motion.div
            key="env-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8 }}
            className="fixed inset-0 z-[-2] bg-black"
            style={{
              backgroundImage: selectedEnvImages.map((path) => `url(${path})`).join(", "),
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "overlay",
            }}
          />
        )}
      </AnimatePresence>

      {/* SCP 模式背景 */}
      <ScpBackground isScpMode={isScpMode} />

      <AnimatePresence mode="wait">
        {isRejected ? (
          <motion.div
            key="rejected"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[400px] text-center px-6">
            <p className="text-pink-300 text-xl tracking-[0.3em] font-light leading-relaxed">
              偵測到低維度的恐懼。<br/>
              協定已自動終止，請在準備好面對真實後再行開啟。
            </p>
            <div className="mt-8 w-12 h-[1px] bg-white/20 animate-pulse" />
          </motion.div>
        ) : isTransitioning ? (
          <motion.div
            key="transitioning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[400px] text-center px-6">
            <p className="text-red-500 text-xl tracking-[0.3em] font-light leading-relaxed animate-pulse">
              異常收容模式觸發...<br/>
              請勿移動。系統正在調整維度。
            </p>
          </motion.div>
        ) : isScpMode ? (
          <motion.div
            key="scp-mode"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="z-20 w-full max-w-4xl mt-20 text-center text-white px-6">
            {step === "SCP_FLOW" && <ScpStep onComplete={() => setShowScpResult(true)} />}
            {showScpResult && <ScpResult />}
          </motion.div>
        ) : step !== "RESULT" ? (
          <motion.div
            key="input-phase"
            exit={{ opacity: 0, filter: "blur(20px)" }}
            className="flex flex-col items-center w-full">
            
            {/* 標題果凍的隱藏控制*/}
            {(!["MOOD", "SCENT", "BODY_FEEL", "ENV_SELECT", "TASTE", "POST_MOOD", "POST_SCENT", "POST_BODY", "POST_ENV", "POST_TASTE"].includes(step)) && (
              <div className="flex flex-col items-center -mb-8 md:-mb-12"> 
                <HeroSection />
                <JellyVisual />
              </div>
            )}

            {/* 更新間距條件 */}
            <div className={`relative z-10 w-full flex flex-col items-center justify-center 
              ${["MOOD", "SCENT", "BODY_FEEL", "ENV_SELECT", "TASTE"].includes(step) ? "mt-4" : "min-h-[300px]"}`}>
              
              <AnimatePresence mode="wait">
                {!isStarted ? (
                  <motion.div key="intro" exit={{ opacity: 0 }} className="flex flex-col items-center gap-8 pt-4">
                    <DreamyText text={`歡迎來到維度的邊緣。\n頻率正在對齊中…`} />
                    <button onClick={() => setIsStarted(true)} className="px-12 py-4 bg-white/10 border border-white/20 rounded-full text-white tracking-[0.5em] backdrop-blur-xl hover:bg-white/20 transition-all">
                      開啟儀式
                    </button>
                  </motion.div>
                ) : !hasPermission ? (
                  <PermissionStep key="permission" onComplete={handlePermissionComplete} onReject={handleReject} />
                ) : (
                  <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full">
                    {step === "NAME" && <NameStep onComplete={(v) => handleStepComplete("name", v, "YEAR")} />}
                    {step === "YEAR" && <YearStep onComplete={(v) => handleStepComplete("year", v, "MONTH")} />}
                    {step === "MONTH" && <MonthStep onComplete={(v) => handleStepComplete("month", v, "DAY")} />}
                    {step === "DAY" && ( <DayStep onComplete={(v) => handleBirthComplete("day", v, "BREAK")}  />)}
                    
                    {step === "BREAK" && (
                      <div className="flex flex-col items-center justify-center text-center">
                        <p className="text-cyan-200 tracking-[0.3em] font-light animate-pulse text-xl">
                          時空座標：{userData.weather}<br/>
                          偵測完成。感知模組加載中...
                        </p>
                      </div>
                    )}

                    {step === "MOOD" && <MoodStep onComplete={(v) => handleStepComplete("mood", v, "POST_MOOD")} />}
                    {step === "POST_MOOD" && (
                      <div className="flex flex-col items-center justify-center text-center px-4">
                        <p className="text-cyan-200 tracking-[0.3em] font-light animate-pulse text-xl leading-relaxed">
                          你的心情...我明白了。
                          <br />
                          今天的執行續會依此進行。
                        </p>
                      </div>
                    )}

                    {step === "SCENT" && <ScentStep onComplete={(v) => handleStepComplete("scent", v, "POST_SCENT")} />}
                    {step === "POST_SCENT" && (
                      <div className="flex flex-col items-center justify-center text-center px-4">
                        <p className="text-cyan-200 tracking-[0.3em] font-light animate-pulse text-xl leading-relaxed">
                          氣息在呼吸之中...
                          <br />
                          氣場的交織已經完成。
                        </p>
                      </div>
                    )}

                    {step === "BODY_FEEL" && <BodyFeelStep onComplete={(v) => handleStepComplete("bodyFeel", v, "POST_BODY")} />}
                    {step === "POST_BODY" && (
                      <div className="flex flex-col items-center justify-center text-center px-4">
                        <p className="text-cyan-200 tracking-[0.3em] font-light animate-pulse text-xl leading-relaxed">
                          你的感覺很重要...
                          <br />
                          希望你今天都好。
                        </p>
                      </div>
                    )}

                    {step === "ENV_SELECT" && (
                      <EnvSelectStep
                        onComplete={(ids) => {
                          // 設定背景圖片
                          const imagePaths = ids.map((id) => `/images/envpic/${id}_pic.jpg`);
                          setSelectedEnvImages(imagePaths);
                          handleStepComplete("environments", ids, "POST_ENV");
                        }}
                        maxSelect={3}
                        isScpMode={isScpMode}
                      />
                    )}

                    {step === "POST_ENV" && (
                      <div className="flex flex-col items-center justify-center text-center px-4">
                        <p className="text-cyan-200 tracking-[0.3em] font-light animate-pulse text-xl leading-relaxed mb-6">
                          環境的選擇如此...
                          <br />
                          想必你會在那裡待得很舒服。
                        </p>

                        {userData.environments?.length > 0 && (
                          <div className="mt-4 text-white/70 text-sm">
                            已鎖定環境：
                            <div className="flex flex-wrap gap-2 justify-center mt-2">
                              {userData.environments.map((id) => {
                                const env = ENVIRONMENTS.find((e) => e.id === id);
                                return env ? (
                                  <span key={id} className="px-3 py-1 bg-white/10 rounded-full">
                                    {env.label}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {step === "TASTE" && <TasteStep onComplete={(v) => handleStepComplete("taste", v, "POST_TASTE")} />}
                    {step === "POST_TASTE" && (
                      <div className="flex flex-col items-center justify-center text-center px-4">
                        <p className="text-cyan-200 tracking-[0.3em] font-light animate-pulse text-xl leading-relaxed">
                          最後的頻率已收束。
                          <br />
                          感官清單正在編織中...
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <RESULT
          key="result-page"
          userData={userData}
          onReset={() => window.location.reload()}
         isScpMode={isScpMode}
          />
        )}
      </AnimatePresence>

      {/* 開發工具 */}
      <DevTools setStep={setStep} setUserData={setUserData} setIsStarted={setIsStarted} setHasPermission={setHasPermission} />
    </main>
  );
}
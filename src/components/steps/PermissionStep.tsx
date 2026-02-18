//src/components/steps/PermissionStep.tsx

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { DreamyText } from "../../components/ui/DreamyText";

interface PermissionStepProps {
  onComplete: (data: { location: any; timestamp: string; weather: string }) => void;
  onReject: () => void;
}

export default function PermissionStep({ onComplete, onReject }: PermissionStepProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  // 新增：格式化天氣描述的 helper 函式
  const formatWeatherDesc = (temp: number, humidity: number, windSpeed: number, weatherMain: string): string => {
    let desc = "周圍環境";
    if (temp < 15) desc += "寒意如維度的邊緣，";
    else if (temp > 30) desc += "熱浪扭曲了時空，";
    else desc += "平衡的頻率，";

    if (humidity > 70) desc += "微濕如淚痕，";
    else if (humidity < 30) desc += "乾澀的靜默，";
    else desc += "柔和的擁抱，";

    if (windSpeed > 10) desc += "風如低語的預言";
    else desc += "風偏向靜止";

    // 根據主要天氣加點神秘感
    switch (weatherMain.toLowerCase()) {
      case "rain":
        desc += "，雨絲是裂隙的召喚。";
        break;
      case "clear":
        desc += "，晴空是純淨的鏡面。";
        break;
      case "clouds":
        desc += "，雲霧遮蔽了隱藏的門扉。";
        break;
      default:
        desc += "。";
    }

    return desc;
  };

  // 新增：反向地理編碼 helper (用 Nominatim 免費 API)
  const getAddressFromLatLng = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
      );
      if (response.ok) {
        const data = await response.json();
        return data.display_name || `${data.address.city || ''}${data.address.suburb || ''}`; // e.g., "台北市板橋區"
      }
      return "未知維度";
    } catch (error) {
      console.error("地址 API 錯誤:", error);
      return "未知維度";
    }
  };

  const handleRequest = async () => {
    setIsProcessing(true);
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          const timestamp = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" }); // 假設台灣時區，優化本地化

          let weather = "周圍環境微濕，風偏向靜止"; // fallback 寫死值
          let address = "未知維度"; // 新增 fallback

          try {
            // 天氣 API (原有)
            const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
            if (!apiKey) {
              throw new Error("API key 未設定");
            }

            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric&lang=zh_tw`
            );

            if (response.ok) {
              const data = await response.json();
              const { main, wind, weather: weatherArray } = data;
              const weatherMain = weatherArray[0]?.main || "Clear";

              weather = formatWeatherDesc(
                main.temp,
                main.humidity,
                wind.speed,
                weatherMain
              );
            } else {
              console.error("API 請求失敗:", response.statusText);
            }

            // 新增：獲取地址
            address = await getAddressFromLatLng(lat, lng);
          } catch (error) {
            console.error("天氣或地址 API 錯誤:", error);
            // fallback 到寫死，流程不中斷
          }

          const weatherData = {
            location: { lat, lng, address }, // 新增 address 欄位
            timestamp,
            weather,
          };
          
          // 稍微延遲一下，製造「檢索中」的神祕感
          setTimeout(() => onComplete(weatherData), 2000);
        },
        (error) => {
          console.error("位置權限錯誤:", error);
          onReject();
        },
        { timeout: 10000, enableHighAccuracy: true } // 優化：加 timeout 和高精度
      );
    } else {
      onReject();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center gap-8 pt-4 px-6 text-center"
    >
      <DreamyText text={isProcessing ? "正在對齊維度..." : "協定對齊確認"} />

      <p className="text-white/60 text-xl tracking-[0.2em] font-extralight max-w-md leading-relaxed">
        {isProcessing 
          ? "正在檢索當前時空的能量分布，請勿斷開連結。" 
          : "維度需要您的時空座標作為錨點。\n是否允許核心讀取當前頻率？"}
      </p>

      {!isProcessing && (
        <div className="flex flex-col gap-6 mt-4">
          <button 
            onClick={handleRequest}
            className="px-12 py-4 bg-cyan-400/10 border border-cyan-400/40 rounded-full text-cyan-100 tracking-[0.5em] backdrop-blur-xl hover:bg-cyan-400/20 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          >
            授權讀取
          </button>
          
          <button 
            onClick={onReject}
            className="text-white/30 hover:text-pink-300/50 transition-colors text-xs tracking-[0.3em] underline underline-offset-8"
          >
            拒絕提供座標
          </button>

          <p className="text-white/20 text-[10px] tracking-widest max-w-xs mx-auto leading-loose">
            根據《每日使用說明書》，我們將獲取您的地理位置與時間數據以最佳化體驗。
            並詢問您的生日，數據僅用於此生成清單，不會儲存於外部使用。
            拒絕授權將結束流程並回到最初頁面。
          </p>
        </div>
      )}

      {isProcessing && (
        <div className="mt-8 flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 bg-cyan-200 rounded-full"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}


import { MOODS } from "../data/moodConfig";
import { SCENTS } from "../data/scentConfig";
import { BODY_SENSATIONS } from "../data/bodySensationConfig";
import { TASTES } from "../data/tasteConfig";
import { ENVIRONMENTS } from "../data/envConfig";
import { UserData } from "@/types/ritualTypes"






// 定義回傳型別：告訴前端「是否有異常」以及「異常種類」
export type ScpTriggerType = 'AGE' | 'SCORE' | 'NONE';

interface ScpCheckResult {
  isTriggered: boolean;
  type: ScpTriggerType;
  score: number; // 除錯用
}

/**
 * 核心判斷函式
 * @param data 使用者目前的選擇資料
 * @returns { isTriggered, type, score }
 */
export const checkScpStatus = (data: UserData): ScpCheckResult => {
  let totalWeight = 0;
  
  // --- 1. 時間異常檢測 (Age Check) ---
  const currentYear = new Date().getFullYear();
  const birthYear = parseInt(data.year || "2000"); // 防呆預設值
  const age = currentYear - birthYear;
  
  // 如果大於 100 歲，直接觸發，不需要算分
  if (age > 100) {
    console.log(`SCP Triggered: Temporal Anomaly (Age: ${age})`);
    return {
      isTriggered: true,
      type: 'AGE',
      score: 0
    };
  }

  // --- 2. 權重計算 (Score Check) ---
  
  // Helper: 通用查表函式
  // options: 選項陣列, value: 使用者選的值


  const getWeight = (
  options: any[] | undefined,
  value: string | string[] | undefined
): number => {
  if (!options || !value) return 0;

  // 如果是陣列 → 累加每個項目的權重
  if (Array.isArray(value)) {
    return value.reduce((sum, id) => {
      const found = options.find((opt) => opt.id === id);
      return sum + (found?.scpWeight || 0);
    }, 0);
  }

  // 單一值（原本邏輯）
  const found = options.find((opt) => opt.id === value);
  return found?.scpWeight || 0;
};

  // 依序累加各步驟的分數 
  totalWeight += getWeight(MOODS, data.mood);
  totalWeight += getWeight(SCENTS, data.scent);
  totalWeight += getWeight(BODY_SENSATIONS, data.bodyFeel);
  totalWeight += getWeight(TASTES, data.taste);
  totalWeight += getWeight(ENVIRONMENTS, data.environments);

  console.log(`Current SCP Weight: ${totalWeight}`);

  // --- 3. 判定結果 ---
  const isHighRisk = totalWeight >= 4;

  return {
    isTriggered: isHighRisk,
    type: isHighRisk ? 'SCORE' : 'NONE',
    score: totalWeight
  };
};
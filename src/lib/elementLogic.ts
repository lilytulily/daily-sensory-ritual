// src/lib/elementLogic.ts

import { MOODS } from "../data/moodConfig";
import { SCENTS } from "../data/scentConfig";
import { BODY_SENSATIONS } from "../data/bodySensationConfig";
import { TASTES } from "../data/tasteConfig";
import { ENVIRONMENTS } from "../data/envConfig";
import { UserData } from "@/types/ritualTypes"

export interface Elements {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
}

export const calculateElements = (data: UserData): Elements => {
  const elements: Elements = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };

  // 輔助函式：解析單一權重字串 "木+2 / 火-1 / 水+3"
  const addWeights = (weightStr: string | undefined) => {
    if (!weightStr) return;
    const parts = weightStr.split('/').map(p => p.trim());
    parts.forEach(part => {
      const match = part.match(/([木火土金水])([+-]\d+)/);
      if (match) {
        const elem = match[1] as keyof Elements;
        const val = parseInt(match[2]);
        elements[elem] += val;
      }
    });
  };

  // 改成支援單一值或陣列的通用取值函式
  const processOption = (
    options: any[] | undefined,
    value: string | string[] | undefined
  ) => {
    if (!options || !value) return;

    if (Array.isArray(value)) {
      // 陣列情況：每個 id 都去找並累加
      value.forEach(id => {
        const found = options.find(opt => opt.id === id);
        if (found?.elementWeight) {
          addWeights(found.elementWeight);
        }
      });
    } else {
      // 單一值
      const found = options.find(opt => opt.id === value);
      if (found?.elementWeight) {
        addWeights(found.elementWeight);
      }
    }
  };

  // 開始處理各欄位
  processOption(MOODS, data.mood);
  processOption(SCENTS, data.scent);
  processOption(BODY_SENSATIONS, data.bodyFeel);
  processOption(TASTES, data.taste);
  processOption(ENVIRONMENTS, data.environments);   // 這裡 environments 是 string[]，現在可以正常傳入

  return elements;
};
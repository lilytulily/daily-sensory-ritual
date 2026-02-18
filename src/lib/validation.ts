import { ORACLE_PROMPTS } from "../data/oraclePrompts";

// 1. 暱稱驗證：防止過長或非法字元

export const validateInput = (value: string, type: 'name' | 'year' | 'day'): string | null => {
  const trimmedValue = value.trim();
  
  // 通用的空值檢查
  if (!trimmedValue) {
    return "沈默無法開啟連結，請留下你的痕跡。";
  }

  if (type === 'name') {
    if (trimmedValue.length > 10) return "這個代號太沉重了，這片空間容不下超過十個字的靈魂。";
    if (/<script|javascript:|data:/i.test(trimmedValue)) return "你想在這裡植入什麼？請收起你的把戲。";
  }

  if (type === 'year') {
    const year = parseInt(trimmedValue);
    // 年份檢查：除了空值，也要確保是合理的 4 位數
     if (isNaN(year) || year < 1900 || year > 2025) {
      return "在我的觀測範圍內，時間並沒有這個維度。請重新校準年份。";
    }
  }

  return null;
};

// 2. 年份驗證與文案選擇
export const getYearAnalysis = (yearStr: string) => {
  const year = parseInt(yearStr);
 
  let comment = ORACLE_PROMPTS.year.post.default;
  if (year >= 1990 && year <= 1999) comment = ORACLE_PROMPTS.year.post.y1990s;
  else if (year === 2000) comment = ORACLE_PROMPTS.year.post.y2000;
  else if (year >= 2010) comment = ORACLE_PROMPTS.year.post.y2010s;
  
  return { comment, error: null };
};

// 3. 月份驗證與文案選擇
export const getMonthAnalysis = (monthStr: string) => {
  const month = parseInt(monthStr);
  if (isNaN(month) || month < 1 || month > 12) {
    return { error: "月亮從未有過這樣的週期。請告訴我真實的月份。" };
  }

  let comment = ORACLE_PROMPTS.month.post.default;
  if ([3, 4, 5].includes(month)) comment = ORACLE_PROMPTS.month.post.spring;
  else if ([6, 7, 8].includes(month)) comment = ORACLE_PROMPTS.month.post.summer;
  else if ([9, 10, 11].includes(month)) comment = ORACLE_PROMPTS.month.post.autumn;
  else if ([12, 1, 2].includes(month)) comment = ORACLE_PROMPTS.month.post.winter;

  return { comment, error: null };
};

// 4. 日期驗證與文案選擇
export const getDayAnalysis = (dayStr: string) => {
  const day = parseInt(dayStr);
  if (isNaN(day) || day < 1 || day > 31) {
    return { error: "那一天的光景並不存在，請重新校準日期。" };
  }

  let comment = ORACLE_PROMPTS.day.post.default;
  if (day >= 1 && day <= 10) comment = ORACLE_PROMPTS.day.post.early;
  else if (day >= 11 && day <= 20) comment = ORACLE_PROMPTS.day.post.mid;
  else if (day >= 21 && day <= 31) comment = ORACLE_PROMPTS.day.post.late;

  return { comment, error: null };
};

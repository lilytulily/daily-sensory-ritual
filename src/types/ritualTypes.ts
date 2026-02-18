// 1. 定義地點的小結構
export interface LocationData {
  lat: number;
  lng: number;
  address: string;
  placeName?: string; // 選填：地點名稱
}

// 2. UserData 主結構
export interface UserData {
  // 基本資訊
  name: string;       // 使用者名稱

  // 時間相關 
  year: string;       //生日的年份
  month: string;     //生日的月份
  day: string;       //生日的日期
  timestamp: string;  // "現在"的時間戳記

  // 環境與感官 (Sensory & Vibe)
  weather: string;    // 天氣
  temperature: string; // 氣溫
  location: LocationData | null; // 初始狀態可能是 null
  
  // 內在狀態
  mood: string;       // 心情
  bodyFeel: string;   // 體感
  scent: string;      // 氣味
  taste: string;      // 味道
  
  // 其他
  environments: string[]; // 環境標籤 
}
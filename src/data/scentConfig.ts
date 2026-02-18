export interface ScentConfig {
  id: string;
  label: string;
  desc: string;
  traits: string;
  element: string;       // 描述用的屬性標籤 (例如: "木, 金")
  weight: Record<string, number>; // 支援多重五行權重 (例如: { wood: 2, metal: 1 })
  scpWeight: number;     // SCP 模式權重
  
  // 視覺化參數
  particleColor: string; 
  glowColor: string;     
  spreadRange: number;   
}

export const SCENTS: ScentConfig[] = [
  {
    id: "sense_nose_001",
    label: "冷衫林",
    desc: "高海拔森林的清冷氣息，帶有針葉與冰涼的木質調。",
    traits: "孤高、清醒",
    element: "wood, metal",
    weight: { wood: 2, metal: 1 },
    scpWeight: -1,
    particleColor: "bg-emerald-300",
    glowColor: "shadow-emerald-500/50",
    spreadRange: 60
  },
  {
    id: "sense_nose_002",
    label: "陳墨香",
    desc: "研磨後的古老墨色，帶有書房的沉靜與文化厚度。",
    traits: "智慧、內斂",
    element: "wood, earth",
    weight: { wood: 2, earth: 1 },
    scpWeight: 1,
    particleColor: "bg-slate-700",
    glowColor: "shadow-slate-900/40",
    spreadRange: 30
  },
  {
    id: "sense_nose_003",
    label: "暖橘光",
    desc: "現剝柑橘的飽滿果香，混合著陽光曬過的溫暖與活潑感。",
    traits: "愉悅、生命",
    element: "fire, wood",
    weight: { fire: 2, wood: 1 },
    scpWeight: -1,
    particleColor: "bg-orange-400",
    glowColor: "shadow-orange-500/60",
    spreadRange: 80
  },
  {
    id: "sense_nose_004",
    label: "乾稻草",
    desc: "豐收後堆疊的草堆，帶著大地曬乾後的甘甜與粗獷感。",
    traits: "踏實、淳樸",
    element: "earth, wood",
    weight: { earth: 2, wood: -1 },
    scpWeight: -1,
    particleColor: "bg-yellow-600",
    glowColor: "shadow-yellow-700/40",
    spreadRange: 45
  },
  {
    id: "sense_nose_005",
    label: "雨後土",
    desc: "第一場雨落下後的潮濕泥土聲，象徵萬物復甦的濕潤感。",
    traits: "契機、循環",
    element: "water, earth",
    weight: { water: 1, earth: 2 },
    scpWeight: -1,
    particleColor: "bg-stone-500",
    glowColor: "shadow-stone-600/50",
    spreadRange: 50
  },
  {
    id: "sense_nose_006",
    label: "海鹽風",
    desc: "帶著鹹味的海浪拍打，空曠且帶有一絲孤獨的自由感。",
    traits: "開闊、洗滌",
    element: "water",
    weight: { water: 3 },
    scpWeight: 0,
    particleColor: "bg-cyan-200",
    glowColor: "shadow-cyan-400/40",
    spreadRange: 100
  },
  {
    id: "sense_nose_007",
    label: "舊書頁",
    desc: "泛黃紙張與古舊裝訂的味道，帶有時間流逝的乾燥氣息。",
    traits: "懷舊、凝固",
    element: "metal, earth, water",
    weight: { metal: 2, earth: 1, water: -1 },
    scpWeight: 1,
    particleColor: "bg-amber-100",
    glowColor: "shadow-amber-200/30",
    spreadRange: 35
  },
  {
    id: "sense_nose_008",
    label: "夜煙霧",
    desc: "深夜營火或焚香殘留的煙燻味，神祕且帶有儀式終結感。",
    traits: "幽冥、轉化",
    element: "fire, metal, wood",
    weight: { fire: 1, metal: 1, wood: 1 },
    scpWeight: 0,
    particleColor: "bg-zinc-800",
    glowColor: "shadow-purple-900/50",
    spreadRange: 70
  },
  {
    id: "sense_nose_009",
    label: "無香嗅",
    desc: "沒有味道乾淨純淨，無的感覺。",
    traits: "空白、乾淨",
    element: "water, wood",
    weight: { water: 1, wood: 1 },
    scpWeight: 2,
    particleColor: "bg-white/50",
    glowColor: "shadow-white/20",
    spreadRange: 20
  }
];
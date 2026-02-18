export interface BodySensationConfig {
  id: string;
  label: string;
  desc: string;
  traits: string;
  element: string;
  weight: Record<string, number>; // 支援多重五行權重
  scpWeight: number;             // 對照 PRD 的 SCP 權重
  particleColor: string; // 新增：粒子顏色
  behavior: 'drift' | 'rise' | 'drip' | 'static' | 'float' | 'sink'; // 新增：行為類型
  speed: number; // 新增：速度係數
}

export const BODY_SENSATIONS: BodySensationConfig[] = [
  { 
    id: "sense_feel_001", 
    label: "冷涼透", 
    desc: "像指尖觸碰冰塊或薄荷拂過皮膚，極致的物理降溫。", 
    traits: "斷開、冷靜", 
    element: "metal, water", 
    weight: { metal: 2, water: 1 },
    scpWeight: 0,
    particleColor: "#A5F3FC",
    behavior: "drift", // 漂移
    speed: 0.3
  },
  { 
    id: "sense_feel_002", 
    label: "溫火炙", 
    desc: "像冬日暖爐的熱輻射，微弱但持續的能量包覆感。", 
    traits: "溫暖、熱烈", 
    element: "fire, wood", 
    weight: { fire: 2, wood: 1 },
    scpWeight: 0,
    particleColor: "#FB923C",
    behavior: "rise", // 上升
    speed: 0.8
  },
  { 
    id: "sense_feel_003", 
    label: "濕露滴", 
    desc: "像晨間草地的濕潤觸感，飽含水分且帶有黏著性。", 
    traits: "滋養、糾纏", 
    element: "water, wood", 
    weight: { water: 2, wood: 1, fire: -1 },
    scpWeight: 1,
    particleColor: "#06B6D4",
    behavior: "drip", // 滴落
    speed: 0.5
  },
  { 
    id: "sense_feel_004", 
    label: "乾灰燥", 
    desc: "像火山灰或沙漠礫石，完全失去水分的磨砂與酥脆感。", 
    traits: "崩解、靜止", 
    element: "earth, metal", 
    weight: { earth: 1, metal: 1 },
    scpWeight: 0,
    particleColor: "#78716C",
    behavior: "static", // 靜止
    speed: 0.1
  },
  { 
    id: "sense_feel_005", 
    label: "羽落飄", 
    desc: "幾乎感受不到重力，像羽毛在空氣中懸浮的輕盈律動。", 
    traits: "自由、空靈", 
    element: "wood, earth", 
    weight: { wood: 2, earth: -1 },
    scpWeight: 0,
    particleColor: "#F1F5F9",
    behavior: "float", // 漂浮
    speed: 0.4
  },
  { 
    id: "sense_feel_006", 
    label: "沉武穩", 
    desc: "像玄武岩般厚重且不可撼動，帶有極強的垂直壓迫感。", 
    traits: "承載、封印", 
    element: "earth, fire", 
    weight: { earth: 3, fire: -1 },
    scpWeight: 0,
    particleColor: "#3F3F46",
    behavior: "sink", // 下沉
    speed: 0.7
  }
];
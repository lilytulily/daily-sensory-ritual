// src/data/moodConfig.ts

export interface MoodConfig {
  id: string;
  label: string;
  desc: string;
  colors: string[];   // Tailwind class 漸層色
  blur: string;       // 模糊強度
  speed: number;      // 動畫速度 (秒)
  traits: string;     // 核心特質
  element: string;    // 五行屬性標籤
  weight: Record<string, number>; // 多重五行權重
  scpWeight: number;  // SCP 模式權重
}

export const MOODS: MoodConfig[] = [
  { 
    id: "mood_001", 
    label: "漂浮感", 
    desc: "感覺與現實脫節，思緒散亂無法聚焦，像在濃霧中行走。", 
    traits: "迷茫、不穩定",
    element: "water, earth",
    weight: { water: 1, earth: -2 },
    scpWeight: 2,
    colors: ["from-cyan-100/30", "to-slate-500/20"], 
    blur: "blur-2xl", 
    speed: 8
  },
  { 
    id: "mood_002", 
    label: "烈焰灼", 
    desc: "情緒高度亢奮或焦慮，能量過載，感覺腦袋與身體都在發燙。", 
    traits: "焦躁、亢奮",
    element: "fire",
    weight: { fire: 3 },
    scpWeight: 0,
    colors: ["from-orange-600/40", "to-red-700/30"], 
    blur: "blur-md", 
    speed: 2
  },
  { 
    id: "mood_003", 
    label: "乾枯期", 
    desc: "長期輸出導致的靈魂枯竭，缺乏靈感與動力，像乾裂的土地。", 
    traits: "疲憊、空虛",
    element: "wood, earth",
    weight: { wood: -2, earth: 1 },
    scpWeight: 0,
    colors: ["from-amber-800/20", "to-stone-600/20"], 
    blur: "blur-sm", 
    speed: 10
  },
  { 
    id: "mood_004", 
    label: "封閉態", 
    desc: "拒絕社交與外部訊息，縮回自己的保護殼，處於高度防禦機制。", 
    traits: "疏離、冷靜",
    element: "metal, water",
    weight: { metal: 2, water: -1 },
    scpWeight: 1,
    colors: ["from-indigo-900/40", "to-slate-800/40"], 
    blur: "blur-lg", 
    speed: 6
  },
  { 
    id: "mood_005", 
    label: "飽滿實", 
    desc: "能量充沛且穩定，準備好執行計畫，感覺自己無所不能。", 
    traits: "自信、行動",
    element: "fire, earth",
    weight: { fire: 1, earth: 2 },
    scpWeight: 1,
    colors: ["from-emerald-400/30", "to-teal-600/20"], 
    blur: "blur-none", 
    speed: 4
  },
  { 
    id: "mood_006", 
    label: "澄澈境", 
    desc: "雜念全消，心境如明鏡般通透，能看穿事物本質的純粹時刻。", 
    traits: "清醒、極簡",
    element: "metal, water",
    weight: { metal: 2, water: 1 },
    scpWeight: -1,
    colors: ["from-blue-50/40", "to-cyan-200/30"], 
    blur: "blur-3xl", 
    speed: 12
  },
  { 
    id: "mood_007", 
    label: "雙拉扯", 
    desc: "內在矛盾，兩股力量在心中拔河，難以做出決定，能量互相抵銷。", 
    traits: "猶豫、衝突",
    element: "wood, metal",
    weight: { wood: 1, metal: 1 },
    scpWeight: 0,
    colors: ["from-fuchsia-500/20", "to-lime-400/20"], 
    blur: "blur-md", 
    speed: 1
  },
  { 
    id: "mood_008", 
    label: "空白層", 
    desc: "情感暫時麻木或大腦當機，處於一種無意識的純白狀態。", 
    traits: "停滯、空白",
    element: "metal, earth",
    weight: { metal: 1, earth: 1 },
    scpWeight: 1,
    colors: ["from-slate-100/50", "to-white/10"], 
    blur: "blur-xl", 
    speed: 15
  },
  { 
    id: "mood_009", 
    label: "翻湧流", 
    desc: "內心情緒波動巨大，靈感或感性如潮水般湧入，難以平復。", 
    traits: "感性、敏感",
    element: "water",
    weight: { water: 3 },
    scpWeight: 0,
    colors: ["from-blue-600/30", "to-violet-800/30"], 
    blur: "blur-lg", 
    speed: 3
  },
  { 
    id: "mood_010", 
    label: "飛展開", 
    desc: "思考躍遷，充滿擴張性的想法，迫不及待要向外生長。", 
    traits: "創意、探索",
    element: "wood",
    weight: { wood: 3 },
    scpWeight: -2,
    colors: ["from-green-300/30", "to-yellow-200/20"], 
    blur: "blur-sm", 
    speed: 5
  },
  { 
    id: "mood_011", 
    label: "破曉光", 
    desc: "在黑暗後看見第一線曙光，雖然微弱但充滿希望與新生感。", 
    traits: "希望、契機",
    element: "wood, fire",
    weight: { wood: 2, fire: 1 },
    scpWeight: -2,
    colors: ["from-rose-300/30", "to-orange-100/20"], 
    blur: "blur-md", 
    speed: 7
  },
  { 
    id: "mood_012", 
    label: "過載中", 
    desc: "覺得事情很多，已經超越可以乘載的執行緒。", 
    traits: "過多、失控",
    element: "metal, fire",
    weight: { metal: 1, fire: 1 },
    scpWeight: 1,
    colors: ["from-red-500/20", "to-purple-900/40"], 
    blur: "blur-none", 
    speed: 0.5
  }
];
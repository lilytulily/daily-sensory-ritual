// src/data/ritualConfig.ts
export interface MoodOption {
  id: string;
  label: string;
  description: string;
  trait: string;
  weights: Record<string, number>; // 支援多重五行權重 (例如: { wood: 2, metal: 1 })
  scpWeight: number;     // SCP 模式權重
   
}

export const MOODS: MoodOption[] = [
  {
    id: "mood_001",
    label: "漂浮感",
    description: "感覺與現實脫節，思緒散亂無法聚焦，像在濃霧中行走。",
    trait: "迷茫、不穩定",
    weights: { water: 1, earth: -2 },
    scpWeight: 2,
  },
  {
    id: "mood_002",
    label: "烈焰灼",
    description: "情緒高度亢奮或焦慮，能量過載，感覺腦袋與身體都在發燙。",
    trait: "焦慮、高壓",
    weights: { fire: 3 },
    scpWeight: 0,
  },
  {
    id: "mood_003",
    label: "乾枯期",
    description: "長期輸出導致的靈魂枯竭，缺乏靈感與動力，像乾裂的土地。",
    trait: "疲憊、空虛",
    weights: { earth: 1 }, // 木-- 在程式中通常對應負值或特定邏輯，此處先依土+1實作
    scpWeight: 0,
  },
  {
    id: "mood_004",
    label: "封閉態",
    description: "拒絕社交與外部訊息，縮回自己的保護殼，處於高度防禦機制。",
    trait: "疏離、冷靜",
    weights: { metal: 2, water: -1 },
    scpWeight: 1,
  },
  {
    id: "mood_005",
    label: "飽滿實",
    description: "能量充沛且穩定，準備好執行計畫，感覺自己無所不能。",
    trait: "自信、行動",
    weights: { fire: 1, earth: 2 },
    scpWeight: 1,
  },
  {
    id: "mood_006",
    label: "澄澈境",
    description: "雜念全消，心境如明鏡般通透，能看穿事物本質的純粹時刻。",
    trait: "清醒、極簡",
    weights: { metal: 2, water: 1 },
    scpWeight: -1,
  },
  {
    id: "mood_007",
    label: "雙拉扯",
    description: "內在矛盾，兩股力量在心中拔河，難以做出決定，能量互相抵銷。",
    trait: "猶豫、衝突",
    weights: { wood: 1, metal: 1 },
    scpWeight: 0,
  },
  {
    id: "mood_008",
    label: "空白層",
    description: "情感暫時麻木或大腦當機，處於一種無意識的純白狀態。",
    trait: "停滯、中性",
    weights: { metal: 1, earth: 1 },
    scpWeight: 1,
  },
  {
    id: "mood_009",
    label: "翻湧流",
    description: "內心情緒波動巨大，靈感或感性如潮水般湧入，難以平復。",
    trait: "感性、敏銳",
    weights: { water: 3 },
    scpWeight: 0,
  },
  {
    id: "mood_010",
    label: "飛展開",
    description: "思考躍遷，充滿擴張性的想法，迫不及待要向外生長。",
    trait: "創意、探索",
    weights: { wood: 3 },
    scpWeight: -2,
  },
  {
    id: "mood_011",
    label: "破曉光",
    description: "在黑暗後看見第一線曙光，雖然微弱但充滿希望與新生感。",
    trait: "希望、契機",
    weights: { wood: 2, fire: 1 },
    scpWeight: -2,
  },
  {
    id: "mood_012",
    label: "過載中",
    description: "覺得事情很多，已經超越可以乘載的執行緒。",
    trait: "過多、失控",
    weights: { metal: 1, fire: 1 },
    scpWeight: 1,
  },
];

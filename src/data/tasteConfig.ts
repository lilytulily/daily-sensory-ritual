export interface TasteConfig {
  id: string;
  label: string;
  desc: string;
  traits: string;
  element: string;
  weight: Record<string, number>;
  scpWeight: number;
  viscosity: number;
  liquidColor: string;
  //按鈕位置
  position: { top: string; left: string };
}

export const TASTES: TasteConfig[] = [
  { 
    id: "sense_taste_001", 
    label: "野莓酒", 
    desc: "發酵後的莓果深紅感，帶有微醺的酸甜與生長張力。", 
    traits: "誘惑、生機", 
    element: "木火", 
    weight: { wood: 1, fire: 1 }, 
    scpWeight: -2, 
    viscosity: 4, 
    liquidColor: "bg-red-900/60",
    // 左上
    position: { top: "40%", left: "20%" }
  },
  { 
    id: "sense_taste_002", 
    label: "青蘋果", 
    desc: "脆爽且帶有澀感的果香，象徵初生的純粹與酸楚。", 
    traits: "稚嫩、清爽", 
    element: "木金", 
    weight: { wood: 3, gold: -1 }, 
    scpWeight: 1, 
    viscosity: 2, 
    liquidColor: "bg-lime-400/40",
    // 右上
    position: { top: "20%", left: "80%" }
  },
  { 
    id: "sense_taste_003", 
    label: "鮮新蔬", 
    desc: "剛採摘的蔬菜清甜與草本纖維感，充滿大地的生命力。", 
    traits: "自然、平衡", 
    element: "木土", 
    weight: { wood: 1, earth: 1 }, 
    scpWeight: 2, 
    viscosity: 3, 
    liquidColor: "bg-emerald-500/30",
    // 左下
    position: { top: "60%", left: "35%" }
  },
  { 
    id: "sense_taste_004", 
    label: "奶可可", 
    desc: "濃郁的乳脂混合苦甜可可，帶來極度的包覆感與安全感。", 
    traits: "療癒、溫暖", 
    element: "土火", 
    weight: { earth: 1, fire: 1 }, 
    scpWeight: -1, 
    viscosity: 8, 
    liquidColor: "bg-orange-950/70",
    // 右中上
    position: { top: "45%", left: "80%" }
  },
  { 
    id: "sense_taste_005", 
    label: "焙咖啡", 
    desc: "深焙後的焦苦與強烈香氣，帶有理性且清醒的節奏感。", 
    traits: "專注、燃燒", 
    element: "火金", 
    weight: { fire: 2, gold: 1 }, 
    scpWeight: 0, 
    viscosity: 3, 
    liquidColor: "bg-stone-900/80",
    // 右中下
    position: { top: "70%", left: "70%" }
  },
  { 
    id: "sense_taste_006", 
    label: "醇乳酪", 
    desc: "厚重的發酵乳香，質地綿密且帶有陳年的豐饒感。", 
    traits: "穩定、飽滿", 
    element: "土水", 
    weight: { earth: 3, water: -1 }, 
    scpWeight: -1, 
    viscosity: 9, 
    liquidColor: "bg-yellow-100/60",
    // 正下方偏右
    position: { top: "80%", left: "80%" }
  },
  { 
    id: "sense_taste_007", 
    label: "蜜糖漿", 
    desc: "極高密度的純粹甜美，帶有黏稠的流動性與糖分誘惑。", 
    traits: "滋養、糾纏", 
    element: "土水", 
    weight: { earth: 2, water: 1 }, 
    scpWeight: 1, 
    viscosity: 10, 
    liquidColor: "bg-amber-500/70",
    // 正上方
    position: { top: "25%", left: "60%" }
  },
  { 
    id: "sense_taste_008", 
    label: "暖肉鍋", 
    desc: "強烈的辛辣與複雜香料，代表情緒的極致釋放與翻湧。", 
    traits: "熱烈、衝擊", 
    element: "火", 
    weight: { fire: 3 }, 
    scpWeight: -2, 
    viscosity: 6, 
    liquidColor: "bg-red-600/50",
    // 正中間
    position: { top: "70%", left: "50%" }
  },
  { 
    id: "sense_taste_009", 
    label: "檸蘇打", 
    desc: "穿透性的清涼感，瞬間切斷雜念，呈現透明的冷靜。", 
    traits: "澄澈、銳利", 
    element: "金水火", 
    weight: { gold: 2, water: 1, fire: -1 }, 
    scpWeight: 0, 
    viscosity: 1, 
    liquidColor: "bg-cyan-200/40",
    // 中右
    position: { top: "45%", left: "50%" }
  },
  { 
    id: "sense_taste_010", 
    label: "香米飯", 
    desc: "單純的碳水化合物，充滿家的味道的暈碳感。", 
    traits: "安全、安心", 
    element: "火木", 
    weight: { fire: 1, wood: 1 }, 
    scpWeight: 1, 
    viscosity: 7, 
    liquidColor: "bg-slate-50/50",
    // 右下
    position: { top: "70%", left: "15%" }
  },
  { 
    id: "sense_taste_011", 
    label: "煙燻魚", 
    desc: "鹽分與煙燻香氣交織，帶有深海與火焰處理後的殘影。", 
    traits: "陰鬱、深刻", 
    element: "水火", 
    weight: { water: 1, fire: 2 }, 
    scpWeight: 0, 
    viscosity: 5, 
    liquidColor: "bg-indigo-950/60",
    // 正下方偏左
    position: { top: "85%", left: "40%" }
  },
  { 
    id: "sense_taste_012", 
    label: "鹽酥雞", 
    desc: "油炸香氣與胡椒鹽引發的原始食慾，接地氣的愉悅。", 
    traits: "混亂、滿足", 
    element: "土火水", 
    weight: { earth: 2, fire: 2, water: -1 }, 
    scpWeight: -3, 
    viscosity: 4, 
    liquidColor: "bg-yellow-700/50",
    // 右中下
    position: { top: "60%", left: "65%" }
  }
];
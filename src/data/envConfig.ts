export interface EnvConfig {
  id: string;
  type: 'normal' | 'dreamcore';
  label: string;
  desc: string;
  traits: string;
  element: string; 
  weight: Record<string, number>;
  scpWeight: number;
}

export const ENVIRONMENTS: EnvConfig[] = [
  // ▌一般場景 (style_nol)
  { 
    id: "style_nol_001", type: 'normal', label: "獨行舟", 
    desc: "在無邊水面上獨自前行，象徵與自我的深度對話。", 
    traits: "自省、孤獨", element: "water", weight: { water: 2 }, scpWeight: -2 
  },
  { 
    id: "style_nol_002", type: 'normal', label: "螢火靜", 
    desc: "黑暗中微弱但聚集的點點螢光，象徵絕望中的引導。", 
    traits: "希望、纖細", element: "fire, wood", weight: { fire: 1, wood: 1 }, scpWeight: -2 
  },
  { 
    id: "style_nol_003", type: 'normal', label: "冰川冷", 
    desc: "萬年不化的巨型冰封，時間在此完全失去意義。", 
    traits: "靜止、永恆", element: "metal, water", weight: { metal: 2, water: 1 }, scpWeight: 1 
  },
  { 
    id: "style_nol_004", type: 'normal', label: "紅沙丘", 
    desc: "極度飽和的紅色沙漠，帶有原始且狂野的熱力。", 
    traits: "熱情、荒蕪", element: "earth, fire", weight: { earth: 2, fire: 1, water: -1 }, scpWeight: 1 
  },
  { 
    id: "style_nol_005", type: 'normal', label: "瀑布流", 
    desc: "奔騰而下的巨量水流，象徵情感的宣洩與淨化。", 
    traits: "釋放、衝擊", element: "water", weight: { water: 3, fire: -1 }, scpWeight: -1 
  },
  { 
    id: "style_nol_006", type: 'normal', label: "星軌圖", 
    desc: "鏡頭長曝光下的星辰旋轉，將時間具象化為光線。", 
    traits: "永恆、規律", element: "metal, fire", weight: { metal: 2, fire: 1 }, scpWeight: -1 
  },
  { 
    id: "style_nol_007", type: 'normal', label: "秘銅門", 
    desc: "刻滿神祕符號的巨大銅門，背後隱藏著未知的命運。", 
    traits: "好奇、未知", element: "metal", weight: { metal: 2, wood: -1 }, scpWeight: 1 
  },
  { 
    id: "style_nol_008", type: 'normal', label: "深山鳴", 
    desc: "深山中不明來源的低頻震動，帶有沉靜的隱密感。", 
    traits: "沉穩、隱匿", element: "earth, wood", weight: { earth: 2, wood: 1 }, scpWeight: 1 
  },
  { 
    id: "style_nol_009", type: 'normal', label: "晨曦林", 
    desc: "陽光穿透薄霧，泥土與露水交織出新生的濕潤感。", 
    traits: "復甦、希望", element: "wood", weight: { wood: 3, metal: -1 }, scpWeight: -1 
  },
  { 
    id: "style_nol_010", type: 'normal', label: "寂靜雪", 
    desc: "銀色平原與枯木，將空間感壓縮至極致的留白。", 
    traits: "專注、空無", element: "metal, water", weight: { metal: 2, water: 1 }, scpWeight: 1 
  },
  { 
    id: "style_nol_011", type: 'normal', label: "晚風田", 
    desc: "夕陽下的金黃麥浪，溫暖的乾草香氣帶來飽足感。", 
    traits: "豐饒、溫暖", element: "earth, fire", weight: { earth: 2, fire: 1 }, scpWeight: -2 
  },
  { 
    id: "style_nol_012", type: 'normal', label: "碎浪灘", 
    desc: "黑色礁石與白色泡沫，象徵情緒瞬間的崩解與消散。", 
    traits: "釋放、虛幻", element: "water, metal", weight: { water: 2, metal: 1 }, scpWeight: 1 
  },
  { 
    id: "style_nol_013", type: 'normal', label: "古城牆", 
    desc: "磚紅牆面與蔓延藤蔓，日光下凝固的歷史厚度。", 
    traits: "沉澱、守護", element: "earth, wood", weight: { earth: 2, wood: 1 }, scpWeight: 0 
  },
  { 
    id: "style_nol_014", type: 'normal', label: "浮空島", 
    desc: "違反重力的翠綠島嶼，雲端之上的絕對自由。", 
    traits: "超脫、靈動", element: "wood, water", weight: { wood: 2, water: 1 }, scpWeight: 1 
  },
  { 
    id: "style_nol_015", type: 'normal', label: "極光湖", 
    desc: "紫色湖水與綠色極光，如夢境般的色彩共振。", 
    traits: "神祕、靈感", element: "water, fire", weight: { water: 2, fire: 2 }, scpWeight: 0 
  },
  { 
    id: "style_nol_016", type: 'normal', label: "晶礦洞", 
    desc: "地心生長的巨大晶柱，發出低頻嗡鳴與內在力量。", 
    traits: "能量、核心", element: "metal", weight: { metal: 3, fire: -1 }, scpWeight: 1 
  },
  { 
    id: "style_nol_017", type: 'normal', label: "雲海梯", 
    desc: "通往雲層深處的純白階梯，指向未知的進化路徑。", 
    traits: "探索", element: "metal, wood", weight: { metal: 2, wood: 1 }, scpWeight: -1 
  },
  { 
    id: "style_nol_018", type: 'normal', label: "午夜梯", 
    desc: "空無一人的自動扶梯，背景模糊的白噪音。", 
    traits: "疏離、機械", element: "metal", weight: { metal: 1 }, scpWeight: 1
  },

  // ▌異常場景 (style_drc)
  { 
    id: "style_drc_001", type: 'dreamcore', label: "無盡廊", 
    desc: "鮮紅地毯與無數白門，閃爍燈光下的無限循環感。", 
    traits: "焦慮、輪迴", element: "fire, water", weight: { fire: 1, water: 1 }, scpWeight: 2 
  },
  { 
    id: "style_drc_002", type: 'dreamcore', label: "空泳池", 
    desc: "藍色磁磚與滴水聲，情感枯竭後的極度孤寂。", 
    traits: "枯竭、陰冷", element: "water", weight: { water: 3 }, scpWeight: 2 
  },
  { 
    id: "style_drc_003", type: 'dreamcore', label: "流沙鐘", 
    desc: "星空下流動的銀色砂礫，具象化地流失時間。", 
    traits: "流逝、虛無", element: "earth, metal", weight: { earth: 2, metal: 2, water: -1 }, scpWeight: 2 
  },
  { 
    id: "style_drc_004", type: 'dreamcore', label: "異色空", 
    desc: "紫色天空與靜止絮狀雲，現實感的徹底崩解。", 
    traits: "崩解、虛假", element: "fire, water", weight: { fire: 2, water: 2 }, scpWeight: 2 
  },
  { 
    id: "style_drc_005", type: 'dreamcore', label: "迴旋梯", 
    desc: "深不見底的螺旋，昏黃壁燈映照出的潛意識恐懼。", 
    traits: "探索、恐懼", element: "earth, water", weight: { earth: 2, water: 1 }, scpWeight: 2 
  },
  { 
    id: "style_drc_006", type: 'dreamcore', label: "複印室", 
    desc: "無人運行且閃爍螢幕的辦公室，數位時代的殘影。", 
    traits: "焦慮、殘留", element: "metal, fire", weight: { metal: 2, fire: 1 }, scpWeight: 2 
  },
  { 
    id: "style_drc_007", type: 'dreamcore', label: "發光樹", 
    desc: "透明脈絡流動著岩漿光芒，生命力的極致噴發。", 
    traits: "生命、能量", element: "wood, fire", weight: { wood: 2, fire: 2 }, scpWeight: 2 
  },
  { 
    id: "style_drc_008", type: 'dreamcore', label: "半截門", 
    desc: "嵌在牆壁高處的門，打開後只有磚牆，象徵出口的喪失。", 
    traits: "阻斷、殘缺", element: "earth", weight: { earth: 2, metal: -1 }, scpWeight: 2 
  },
  { 
    id: "style_drc_009", type: 'dreamcore', label: "重疊窗", 
    desc: "兩面窗戶以不可能的角度重疊，窗外是永恆的黃昏。", 
    traits: "扭曲、監視", element: "fire, earth", weight: { fire: 1, earth: 2 }, scpWeight: 2 
  },
];
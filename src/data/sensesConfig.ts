export interface SenseOption {
  id: string;
  category: string;
  label: string;
  description: string;
  trait: string;
  weights: Record<string, number>; // 支援多重五行權重 (例如: { wood: 2, metal: 1 })
  scpWeight: number;     // SCP 模式權重
   
}

export const SENSES: SenseOption[] = [
  // ▌氣味 (Nose)
  { id: "sense_nose_001", category: "nose", label: "冷衫林", description: "高海拔森林的清冷氣息，帶有針葉與冰涼的木質調。", trait: "孤高、清醒", weights: { wood: 2, metal: 1 }, scpWeight: -1 },
  { id: "sense_nose_002", category: "nose", label: "陳墨香", description: "研磨後的古老墨色，帶有書房的沉靜與文化厚度。", trait: "智慧、內斂", weights: { wood: 2, earth: 1 }, scpWeight: 1 },
  { id: "sense_nose_003", category: "nose", label: "暖橘光", description: "現剝柑橘的飽滿果香，混合著陽光曬過的溫暖與活潑感。", trait: "愉悅、生命", weights: { fire: 2, wood: 1 }, scpWeight: -1 },
  { id: "sense_nose_004", category: "nose", label: "乾稻草", description: "豐收後堆疊的草堆，帶著大地曬乾後的甘甜與粗獷感。", trait: "踏實、淳樸", weights: { earth: 2, wood: -1 }, scpWeight: -1 },
  { id: "sense_nose_005", category: "nose", label: "雨後土", description: "第一場雨落下後的潮濕泥土聲，象徵萬物復甦的濕潤感。", trait: "契機、循環", weights: { water: 1, earth: 2 }, scpWeight: -1 },
  { id: "sense_nose_006", category: "nose", label: "海鹽風", description: "帶著鹹味的海浪拍打，空曠且帶有一絲孤獨的自由感。", trait: "開闊、洗滌", weights: { water: 3 }, scpWeight: 0 },
  { id: "sense_nose_007", category: "nose", label: "舊書頁", description: "泛黃紙張與古舊裝訂的味道，帶有時間流逝的乾燥氣息。", trait: "懷舊、凝固", weights: { metal: 2, earth: 1, water: -1 }, scpWeight: 1 },
  { id: "sense_nose_008", category: "nose", label: "夜煙霧", description: "深夜營火或焚香殘留的煙燻味，神祕且帶有儀式終結感。", trait: "幽冥、轉化", weights: { fire: 1, metal: 1, wood: 1 }, scpWeight: 0 },
  { id: "sense_nose_009", category: "nose", label: "無香嗅", description: "沒有味道乾淨純淨，無的感覺。", trait: "空白、乾淨", weights: { water: 1, wood: 1 }, scpWeight: 2 },

  // ▌身體感受 (Feel)
  { id: "sense_feel_001", category: "feel", label: "冷涼透", description: "像指尖觸碰冰塊或薄荷拂過皮膚，極致的物理降溫。", trait: "斷開、冷靜", weights: { metal: 2, water: 1 }, scpWeight: 0 },
  { id: "sense_feel_002", category: "feel", label: "溫火炙", description: "像冬日暖爐的熱輻射，微弱但持續的能量包覆感。", trait: "保護、親密", weights: { fire: 2, wood: 1 }, scpWeight: 0 },
  { id: "sense_feel_003", category: "feel", label: "濕露滴", description: "像晨間草地的濕潤觸感，飽含水分且帶有黏著性。", trait: "滋養、糾纏", weights: { water: 2, wood: 1, fire: -1 }, scpWeight: 1 },
  { id: "sense_feel_004", category: "feel", label: "乾灰燥", description: "像火山灰或沙漠礫石，完全失去水分的磨砂與酥脆感。", trait: "崩解、靜止", weights: { earth: 1, metal: 1 }, scpWeight: 0 },
  { id: "sense_feel_005", category: "feel", label: "羽落飄", description: "幾乎感受不到重力，像羽毛在空氣中懸浮的輕盈律動。", trait: "自由、空靈", weights: { wood: 2, earth: -1 }, scpWeight: 0 },
  { id: "sense_feel_006", category: "feel", label: "沉武穩", description: "像玄武岩般厚重且不可撼動，帶有極強的垂直壓迫感。", trait: "承載、封印", weights: { earth: 3, fire: -1 }, scpWeight: 0 },

  // ▌風格 (Style)
  { id: "sense_style_001", category: "style", label: "棉麻觸", description: "粗糙但親膚的天然纖維感，象徵平實且無害的生活。", trait: "樸質、呼吸", weights: { wood: 1, earth: 1 }, scpWeight: -1 },
  { id: "sense_style_002", category: "style", label: "侘寂境", description: "殘缺、斑駁且不對稱的空間美感，接受時間的毀壞。", trait: "枯寂、永恆", weights: { earth: 2, metal: 1 }, scpWeight: 1 },
  { id: "sense_style_003", category: "style", label: "絨毛絨", description: "極度柔軟且帶有靜電的包覆感，模糊了形體的邊界。", trait: "柔焦、保護", weights: { fire: 1, earth: 1 }, scpWeight: -1 },
  { id: "sense_style_004", category: "style", label: "風鈴響", description: "破碎且規律的清脆音頻，在空靈中指引出空間的邊界。", trait: "淨化、輕盈", weights: { metal: 2, wood: 1 }, scpWeight: 0 },
  { id: "sense_style_005", category: "style", label: "柴火燒", description: "劈啪作響的熱能與跳動的光影，最原始的防禦能量。", trait: "守護、傳承", weights: { fire: 3, metal: -1 }, scpWeight: -2 },
  { id: "sense_style_006", category: "style", label: "蔓延卷", description: "像藤蔓般向外擴張的曲線，華麗且帶有強烈的侵蝕性。", trait: "繁複、擴張", weights: { wood: 2, water: 1, fire: -1 }, scpWeight: 1 },
  { id: "sense_style_007", category: "style", label: "幾何線", description: "絕對的直線與比例，不容許誤差的鋼鐵理性與秩序感。", trait: "秩序、精準", weights: { metal: 3, wood: -1 }, scpWeight: 1 },
  { id: "sense_style_008", category: "style", label: "斑駁影", description: "光線被遮擋後的殘缺陰影，在虛實之間產生的懷舊感。", trait: "內省、模糊", weights: { earth: 2, wood: 1 }, scpWeight: 2 },
  { id: "sense_style_011", category: "style", label: "盛華奢", description: "極致的裝飾與感官飽和，壓倒性的存在感與感官衝擊。", trait: "權威、燃燒", weights: { fire: 2, metal: 2, water: -1 }, scpWeight: 1 },
  { id: "sense_style_012", category: "style", label: "柔雅淡", description: "低飽和度，讓環境和身心感官都放鬆警戒。", trait: "柔軟、淡色", weights: { wood: 2, water: 1, metal: -1 }, scpWeight: -1 },

  // ▌味覺 (Taste)
  { id: "sense_taste_001", category: "taste", label: "野莓酒", description: "發酵後的莓果深紅感，帶有微醺的酸甜與生長張力。", trait: "誘惑、生機", weights: { wood: 1, fire: 1 }, scpWeight: -2 },
  { id: "sense_taste_002", category: "taste", label: "青蘋果", description: "脆爽且帶有澀感的果香，象徵初生的純粹與酸楚。", trait: "稚嫩、清爽", weights: { wood: 3, metal: -1 }, scpWeight: 1 },
  { id: "sense_taste_003", category: "taste", label: "鮮新蔬", description: "剛採摘的蔬菜清甜與草本纖維感，充滿大地的生命力。", trait: "自然、平衡", weights: { wood: 1, earth: 1 }, scpWeight: 2 },
  { id: "sense_taste_004", category: "taste", label: "奶可可", description: "濃郁的乳脂混合苦甜可可，帶來極度的包覆感與安全感。", trait: "療癒、溫暖", weights: { earth: 1, fire: 1 }, scpWeight: -1 },
  { id: "sense_taste_005", category: "taste", label: "焙咖啡", description: "深焙後的焦苦與強烈香氣，帶有理性且清醒的節奏感。", trait: "專注、燃燒", weights: { fire: 2, metal: 1 }, scpWeight: 0 },
  { id: "sense_taste_006", category: "taste", label: "醇乳酪", description: "厚重的發酵乳香，質地綿密且帶有陳年的豐饒感。", trait: "穩定、飽滿", weights: { earth: 3, water: -1 }, scpWeight: -1 },
  { id: "sense_taste_007", category: "taste", label: "蜜糖漿", description: "極高密度的純粹甜美，帶有黏稠的流動性與糖分誘惑。", trait: "滋養、糾纏", weights: { earth: 2, water: 1 }, scpWeight: 1 },
  { id: "sense_taste_008", category: "taste", label: "暖肉鍋", description: "強烈的辛辣與複雜香料，代表情緒的極致釋放與翻湧。", trait: "熱烈、衝擊", weights: { fire: 3 }, scpWeight: -2 },
  { id: "sense_taste_009", category: "taste", label: "檸蘇打", description: "穿透性的清涼感，瞬間切斷雜念，呈現透明的冷靜。", trait: "澄澈、銳利", weights: { metal: 2, water: 1, fire: -1 }, scpWeight: 0 },
  { id: "sense_taste_010", category: "taste", label: "香米飯", description: "單純的碳水化合物，充滿家的味道的暈碳感。", trait: "安全、安心", weights: { fire: 1, wood: 1 }, scpWeight: 1 },
  { id: "sense_taste_011", category: "taste", label: "煙燻魚", description: "鹽分與煙燻香氣交織，帶有深海與火焰處理後的殘影。", trait: "陰鬱、深刻", weights: { water: 1, fire: 2 }, scpWeight: 0 },
  { id: "sense_taste_012", category: "taste", label: "鹽酥雞", description: "油炸香氣與胡椒鹽引發的原始食慾，接地氣的愉悅。", trait: "混亂、滿足", weights: { earth: 2, fire: 2, water: -1 }, scpWeight: -3 },
];
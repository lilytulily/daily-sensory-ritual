// src/data/scpConfig.ts

// 定義選項的類型：'normal' 是救贖鑰匙，'scp' 是繼續下潛
export type ScpOptionValue = 'normal' | 'scp';

export interface ScpOption {
  label: string;
  value: ScpOptionValue;
  score: number; // 負分代表理性(回歸)，正分代表異常(深入)
}

export interface ScpQuestion {
  id: string;
  text: string; // 問題文本
  subText?: string; // 補充的小字，增加氛圍感
  options: ScpOption[];
}

// 精神檢定問題集 (Sanity Check Questions)
export const SCP_QUESTIONS: ScpQuestion[] = [
  {
    id: 'sanity_visual',
    text: '現在，請把視線移開螢幕一秒，確認你的四周。',
    subText: '(不要回頭，用眼角餘光就好)',
    options: [
      { 
        label: '只有我一個人，一切正常。', 
        value: 'normal', 
        score: -2 
      },
      { 
        label: '角落的陰影...好像比剛才更近了。', 
        value: 'scp', 
        score: 2 
      },
    ],
  },
  {
    id: 'sanity_auditory',
    text: '你聽到的那個聲音是什麼？',
    subText: '(好像是左後方傳來的...)',
    options: [
      { 
        label: '那是窗外的風聲 / 電腦的運轉聲。', 
        value: 'normal', 
        score: -2 
      },
      { 
        label: '它在念一串數字，但我聽不清楚。', 
        value: 'scp', 
        score: 2 
      },
    ],
  },
  {
    id: 'sanity_memory',
    text: '確認記憶連續性：你是怎麼來到這個頁面的？',
    subText: '(是不是有個管理員...)',
    options: [
      { 
        label: '我點擊了網址，並依序填寫了表單。', 
        value: 'normal', 
        score: -2 
      },
      { 
        label: '我不記得了...我好像一直都在這裡。', 
        value: 'scp', 
        score: 3 
      },
    ],
  },
  {
    id: 'sanity_identity',
    text: '如果現在有一面鏡子，你覺得會看到什麼？',
    subText: '(系統偵測到你的瞳孔正在放大)',
    options: [
      { 
        label: '我自己，或許有點疲憊，但就是我。', 
        value: 'normal', 
        score: -2 
      },
      { 
        label: '一張陌生的臉，正在對我笑。', 
        value: 'scp', 
        score: 3 
      },
    ],
  },
  {
    id: 'sanity_final',
    text: '最後確認：你真的想知道結果嗎？',
    subText: '有些知識一旦獲取，就無法「未知」。',
    options: [
      { 
        label: '不想，帶我回到安全的儀式。', 
        value: 'normal', 
        score: -5 // 強制救贖的大分值
      },
      { 
        label: '別廢話，讓我看。', 
        value: 'scp', 
        score: 5 
      },
    ],
  }
];
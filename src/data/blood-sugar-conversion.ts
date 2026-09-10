import type { Language } from '@/types';

/**
 * Blood sugar unit conversion calculator: content (4 languages) + conversion math.
 *
 * Conversion factors (standard clinical conventions):
 * - Glucose: mg/dL = mmol/L × 18 (molar mass of glucose ≈ 180 g/mol)
 * - HbA1c → estimated average glucose (eAG), ADAG study formulas:
 *   eAG (mg/dL)  = 28.7 × A1c − 46.7
 *   eAG (mmol/L) = 1.59 × A1c − 2.59
 *
 * This tool is informational only — never a diagnosis.
 */

// ---------------------------------------------------------------------------
// Conversion logic (language-independent)
// ---------------------------------------------------------------------------

export const MGDL_PER_MMOL = 18;

export function mmolToMgDl(value: number): number {
  return value * MGDL_PER_MMOL;
}

export function mgDlToMmol(value: number): number {
  return value / MGDL_PER_MMOL;
}

export function hba1cToEagMgDl(a1c: number): number {
  return 28.7 * a1c - 46.7;
}

export function hba1cToEagMmol(a1c: number): number {
  return 1.59 * a1c - 2.59;
}

// ---------------------------------------------------------------------------
// Content types
// ---------------------------------------------------------------------------

export interface ConversionContent {
  intro: { heading: string; paragraphs: string[] };
  calc: {
    tabGlucose: string;
    tabHba1c: string;
    inputLabel: string;
    inputUnitLabel: string;
    resultLabel: string;
    formulaNote: string;
    hba1cLabel: string;
    hba1cResultLabel: string;
    hba1cNote: string;
    invalid: string;
  };
  conversionTable: {
    heading: string;
    description: string;
    mmol: string;
    mgdl: string;
    rows: { mmol: string; mgdl: string }[];
  };
  hba1cTable: {
    heading: string;
    description: string;
    a1c: string;
    eagMgdl: string;
    eagMmol: string;
    category: string;
    rows: { a1c: string; eagMgdl: string; eagMmol: string; category: string }[];
  };
  formula: { heading: string; items: { title: string; text: string }[] };
  faq: { heading: string; items: { q: string; a: string }[] };
  disclaimer: string;
}

export function getConversionContent(lang: Language): ConversionContent {
  return CONTENT[lang];
}

// ---------------------------------------------------------------------------
// Static reference tables (shared numbers, per-language labels)
// ---------------------------------------------------------------------------

/** Common mmol/L values with mg/dL equivalents (× 18, rounded). */
const CONVERSION_ROWS: { mmol: string; mgdl: string }[] = [
  { mmol: '1.0', mgdl: '18' },
  { mmol: '2.0', mgdl: '36' },
  { mmol: '3.0', mgdl: '54' },
  { mmol: '3.9', mgdl: '70' },
  { mmol: '4.0', mgdl: '72' },
  { mmol: '4.4', mgdl: '79' },
  { mmol: '5.0', mgdl: '90' },
  { mmol: '5.6', mgdl: '101' },
  { mmol: '6.0', mgdl: '108' },
  { mmol: '7.0', mgdl: '126' },
  { mmol: '8.0', mgdl: '144' },
  { mmol: '10.0', mgdl: '180' },
  { mmol: '11.1', mgdl: '200' },
  { mmol: '13.9', mgdl: '250' },
  { mmol: '16.7', mgdl: '300' },
  { mmol: '22.2', mgdl: '400' },
  { mmol: '25.0', mgdl: '450' },
  { mmol: '33.3', mgdl: '600' },
];

/** HbA1c → eAG per the ADAG study formulas, plus ADA category. */
const HBA1C_ROWS: {
  a1c: string;
  eagMgdl: string;
  eagMmol: string;
  categoryKey: 'normal' | 'prediabetes' | 'diabetes';
}[] = [
  { a1c: '5.0 %', eagMgdl: '97 mg/dL', eagMmol: '5.4 mmol/L', categoryKey: 'normal' },
  { a1c: '5.7 %', eagMgdl: '117 mg/dL', eagMmol: '6.5 mmol/L', categoryKey: 'prediabetes' },
  { a1c: '6.0 %', eagMgdl: '126 mg/dL', eagMmol: '7.0 mmol/L', categoryKey: 'prediabetes' },
  { a1c: '6.5 %', eagMgdl: '140 mg/dL', eagMmol: '7.7 mmol/L', categoryKey: 'diabetes' },
  { a1c: '7.0 %', eagMgdl: '154 mg/dL', eagMmol: '8.5 mmol/L', categoryKey: 'diabetes' },
  { a1c: '8.0 %', eagMgdl: '183 mg/dL', eagMmol: '10.1 mmol/L', categoryKey: 'diabetes' },
  { a1c: '9.0 %', eagMgdl: '212 mg/dL', eagMmol: '11.7 mmol/L', categoryKey: 'diabetes' },
  { a1c: '10.0 %', eagMgdl: '240 mg/dL', eagMmol: '13.3 mmol/L', categoryKey: 'diabetes' },
];

function hba1cRows(labels: Record<'normal' | 'prediabetes' | 'diabetes', string>) {
  return HBA1C_ROWS.map((row) => ({
    a1c: row.a1c,
    eagMgdl: row.eagMgdl,
    eagMmol: row.eagMmol,
    category: labels[row.categoryKey],
  }));
}

// ---------------------------------------------------------------------------
// Per-language content
// ---------------------------------------------------------------------------

const zh: ConversionContent = {
  intro: {
    heading: '血糖单位换算：mmol/L 与 mg/dL',
    paragraphs: [
      '血糖报告和血糖仪上的单位并不统一：中国等多数国家使用 mmol/L（毫摩尔/升），而美国、日本等地区使用 mg/dL（毫克/分升）。看到国外资料或进口设备时，经常需要把两种单位互相换算。',
      '两者是线性关系：mg/dL = mmol/L × 18，反过来 mmol/L = mg/dL ÷ 18。例如空腹血糖 5.6 mmol/L 约等于 101 mg/dL，餐后血糖 7.8 mmol/L 约等于 140 mg/dL。',
      '下面的换算工具支持双向实时换算，还可以把糖化血红蛋白（HbA1c）换算成估算平均血糖（eAG），方便理解化验单上不同指标之间的关系。所有计算都在您的浏览器本地完成。',
    ],
  },
  calc: {
    tabGlucose: '血糖值换算',
    tabHba1c: 'HbA1c 换算',
    inputLabel: '血糖值',
    inputUnitLabel: '输入单位',
    resultLabel: '换算结果',
    formulaNote: '换算公式：mg/dL = mmol/L × 18',
    hba1cLabel: '糖化血红蛋白 HbA1c（%）',
    hba1cResultLabel: '估算平均血糖（eAG）',
    hba1cNote: '基于 ADAG 研究公式：eAG（mg/dL）= 28.7 × HbA1c − 46.7',
    invalid: '请输入有效的数值',
  },
  conversionTable: {
    heading: '常用血糖值换算对照表',
    description: '下表列出常见血糖值的 mmol/L 与 mg/dL 对照，可反向查阅：从右列 mg/dL 也能查到对应的 mmol/L。',
    mmol: 'mmol/L',
    mgdl: 'mg/dL',
    rows: CONVERSION_ROWS,
  },
  hba1cTable: {
    heading: 'HbA1c 与估算平均血糖对照表',
    description: 'HbA1c 反映近 2–3 个月的平均血糖水平。下表按 ADA 采用的 ADAG 研究公式给出对应关系，分类界限参考 ADA 标准。',
    a1c: 'HbA1c',
    eagMgdl: '平均血糖 (mg/dL)',
    eagMmol: '平均血糖 (mmol/L)',
    category: '分类',
    rows: hba1cRows({ normal: '正常', prediabetes: '糖前期', diabetes: '糖尿病参考范围' }),
  },
  formula: {
    heading: '换算公式说明',
    items: [
      { title: '血糖单位换算', text: 'mg/dL = mmol/L × 18；mmol/L = mg/dL ÷ 18。系数 18 来自葡萄糖的摩尔质量（约 180 g/mol）与单位换算（1 L = 10 dL）的比值。' },
      { title: 'HbA1c → 估算平均血糖（eAG）', text: 'eAG（mg/dL）= 28.7 × HbA1c − 46.7；eAG（mmol/L）= 1.59 × HbA1c − 2.59。该公式来自 ADA 支持的 ADAG 研究，是个体平均水平的估算。' },
      { title: '小数位数', text: '习惯上 mg/dL 取整数，mmol/L 保留一位小数。换算时先用精确系数计算，最后再四舍五入即可。' },
    ],
  },
  faq: {
    heading: '血糖单位换算常见问题',
    items: [
      {
        q: 'mmol/L 和 mg/dL 怎么互相换算？',
        a: '记住系数 18 即可：mmol/L 乘以 18 得到 mg/dL，mg/dL 除以 18 得到 mmol/L。例如 6.0 mmol/L × 18 = 108 mg/dL；180 mg/dL ÷ 18 = 10.0 mmol/L。',
      },
      {
        q: '为什么中国用 mmol/L，美国用 mg/dL？',
        a: '这是历史与计量习惯的差异。mmol/L 是国际单位制（SI）的摩尔浓度单位，中国、日本、欧洲大部分地区采用；mg/dL 是质量浓度单位，美国沿用至今。两种单位描述的是同一个指标，只是表达方式不同，用系数 18 即可互换。',
      },
      {
        q: '空腹血糖 5.6 mmol/L 是多少 mg/dL？',
        a: '5.6 × 18 = 100.8，约等于 101 mg/dL。这也是 ADA 标准中空腹血糖「正常上限」的来源：5.6 mmol/L（≈100 mg/dL）以上即进入糖前期范围（5.6–6.9 mmol/L，即 100–125 mg/dL）。',
      },
      {
        q: 'HbA1c 7% 相当于平均血糖多少？',
        a: '按 ADAG 公式：28.7 × 7 − 46.7 ≈ 154 mg/dL，约合 8.5 mmol/L。对多数已确诊的糖尿病患者，7% 是常用的 HbA1c 控制目标，具体目标请以医生的建议为准。',
      },
      {
        q: '换算结果和我的血糖仪显示不一致？',
        a: '先确认设备和 App 中设置的单位是否与报告一致，再检查是否取整差异：mg/dL 显示整数、mmol/L 显示一位小数，换算过程中的四舍五入可能造成 ±1 的差别，属正常现象。此外血糖仪本身允许约 ±15% 的测量误差。',
      },
      {
        q: '这个换算工具适用于 CGM 和 Apple Health 数据吗？',
        a: '适用。CGM（连续血糖监测）、血糖仪和 Apple Health 中的葡萄糖数据都使用同样的单位体系，可以在设备或 App 设置中直接切换单位；当需要阅读英文文献、国外报告或与海外医生沟通时，用本工具手动换算也很方便。',
      },
    ],
  },
  disclaimer:
    '本换算工具仅供参考，不构成医疗诊断或治疗建议。HbA1c 与平均血糖的对应关系基于 ADA 采用的 ADAG 研究公式，为人群平均水平估算。如有疑问，请咨询专业医生。',
};

const en: ConversionContent = {
  intro: {
    heading: 'Blood Sugar Unit Conversion: mmol/L and mg/dL',
    paragraphs: [
      'Glucose readings are reported in different units around the world: most countries including China use mmol/L (millimoles per liter), while the United States and Japan use mg/dL (milligrams per deciliter). When reading international research or using an imported meter, you often need to convert between the two.',
      'The two units are linearly related: mg/dL = mmol/L × 18, and mmol/L = mg/dL ÷ 18. For example, a fasting glucose of 5.6 mmol/L is about 101 mg/dL, and 7.8 mmol/L after a meal is about 140 mg/dL.',
      'The tool below converts in both directions in real time, and can also translate your HbA1c into an estimated average glucose (eAG) to help you understand how the numbers on your lab report relate. All calculations run locally in your browser.',
    ],
  },
  calc: {
    tabGlucose: 'Glucose Conversion',
    tabHba1c: 'HbA1c Conversion',
    inputLabel: 'Glucose value',
    inputUnitLabel: 'Input unit',
    resultLabel: 'Result',
    formulaNote: 'Formula: mg/dL = mmol/L × 18',
    hba1cLabel: 'HbA1c (%)',
    hba1cResultLabel: 'Estimated average glucose (eAG)',
    hba1cNote: 'Based on the ADAG study formula: eAG (mg/dL) = 28.7 × HbA1c − 46.7',
    invalid: 'Please enter a valid number',
  },
  conversionTable: {
    heading: 'Common Blood Sugar Conversion Chart',
    description: 'Common glucose values side by side in mmol/L and mg/dL. Read it in both directions: the mg/dL column on the right also tells you the matching mmol/L value.',
    mmol: 'mmol/L',
    mgdl: 'mg/dL',
    rows: CONVERSION_ROWS,
  },
  hba1cTable: {
    heading: 'HbA1c to Estimated Average Glucose Chart',
    description: 'HbA1c reflects your average glucose over the past 2–3 months. The table below follows the ADAG study formulas adopted by the ADA; categories reference ADA cutoffs.',
    a1c: 'HbA1c',
    eagMgdl: 'eAG (mg/dL)',
    eagMmol: 'eAG (mmol/L)',
    category: 'Category',
    rows: hba1cRows({ normal: 'Normal', prediabetes: 'Prediabetes', diabetes: 'Diabetes range' }),
  },
  formula: {
    heading: 'Conversion Formulas',
    items: [
      { title: 'Glucose units', text: 'mg/dL = mmol/L × 18; mmol/L = mg/dL ÷ 18. The factor 18 comes from the molar mass of glucose (≈180 g/mol) and the 1 L = 10 dL unit relationship.' },
      { title: 'HbA1c → estimated average glucose (eAG)', text: 'eAG (mg/dL) = 28.7 × HbA1c − 46.7; eAG (mmol/L) = 1.59 × HbA1c − 2.59. These formulas come from the ADAG study endorsed by the ADA and estimate an individual\u2019s average level.' },
      { title: 'Decimal places', text: 'By convention mg/dL is shown as a whole number and mmol/L to one decimal place. Convert with the exact factor first, then round at the end.' },
    ],
  },
  faq: {
    heading: 'Blood Sugar Conversion FAQ',
    items: [
      {
        q: 'How do I convert between mmol/L and mg/dL?',
        a: 'Just remember the factor 18: multiply mmol/L by 18 to get mg/dL, and divide mg/dL by 18 to get mmol/L. For example, 6.0 mmol/L × 18 = 108 mg/dL; 180 mg/dL ÷ 18 = 10.0 mmol/L.',
      },
      {
        q: 'Why does the US use mg/dL while most other countries use mmol/L?',
        a: 'It is a matter of historical and metrological convention. mmol/L is the SI molar-concentration unit used in China and most of Europe; mg/dL is a mass-concentration unit still used in the United States and Japan. Both describe the same measurement and are interchangeable with the factor 18.',
      },
      {
        q: 'What is a fasting glucose of 5.6 mmol/L in mg/dL?',
        a: '5.6 × 18 = 100.8, roughly 101 mg/dL. This is also where the ADA\u2019s fasting upper-normal limit comes from: above 5.6 mmol/L (≈100 mg/dL) falls into the prediabetes range (5.6–6.9 mmol/L, or 100–125 mg/dL).',
      },
      {
        q: 'What average glucose does an HbA1c of 7% correspond to?',
        a: 'Using the ADAG formula: 28.7 × 7 − 46.7 ≈ 154 mg/dL, about 8.5 mmol/L. For many people diagnosed with diabetes, 7% is a common HbA1c target — always follow your doctor\u2019s individualized goal.',
      },
      {
        q: 'My meter shows a different number after converting. Why?',
        a: 'First check that the unit setting on your device or app matches your report. Rounding differences are normal: mg/dL displays whole numbers and mmol/L one decimal, so rounding can cause ±1 discrepancies. Glucose meters also allow roughly ±15% measurement error.',
      },
      {
        q: 'Does this tool work for CGM and Apple Health data?',
        a: 'Yes. CGM (continuous glucose monitoring), meters, and glucose data in Apple Health all use the same unit systems, and most devices let you switch units in settings. When reading English research, foreign reports, or talking to doctors abroad, converting manually with this tool is also handy.',
      },
    ],
  },
  disclaimer:
    'This conversion tool is for informational purposes only and is not medical advice. The HbA1c-to-eAG relationship follows the ADAG study formulas adopted by the ADA and estimates a population average. Consult a healthcare professional with any concerns.',
};

const ja: ConversionContent = {
  intro: {
    heading: '血糖値の単位変換：mmol/L と mg/dL',
    paragraphs: [
      '血糖値の単位は国によって異なります。日本をはじめ多くの国では mmol/L（ミリモル/リットル）ではなく mg/dL（ミリグラム/デシリットル）が使われ、中国や欧州では mmol/L が主流です。海外の資料や輸入機器を見るとき、単位の変換が必要になることがよくあります。',
      '両者は線形関係にあります：mg/dL = mmol/L × 18、mmol/L = mg/dL ÷ 18。たとえば空腹時血糖 5.6 mmol/L は約 101 mg/dL、食後 7.8 mmol/L は約 140 mg/dL に相当します。',
      '下のツールは双方向のリアルタイム変換に対応し、HbA1c（糖化ヘモグロビン）から推定平均血糖値（eAG）への換算もできます。すべての計算はブラウザ内で行われます。',
    ],
  },
  calc: {
    tabGlucose: '血糖値の変換',
    tabHba1c: 'HbA1c の変換',
    inputLabel: '血糖値',
    inputUnitLabel: '入力単位',
    resultLabel: '変換結果',
    formulaNote: '変換式：mg/dL = mmol/L × 18',
    hba1cLabel: 'HbA1c（%）',
    hba1cResultLabel: '推定平均血糖値（eAG）',
    hba1cNote: 'ADAG研究の式に基づく：eAG（mg/dL）= 28.7 × HbA1c − 46.7',
    invalid: '有効な数値を入力してください',
  },
  conversionTable: {
    heading: 'よく使う血糖値の換算表',
    description: '代表的な血糖値の mmol/L と mg/dL の対照表です。右の mg/dL 列から左の mmol/L を逆引きすることもできます。',
    mmol: 'mmol/L',
    mgdl: 'mg/dL',
    rows: CONVERSION_ROWS,
  },
  hba1cTable: {
    heading: 'HbA1c と推定平均血糖値の対照表',
    description: 'HbA1c は過去2〜3か月の平均血糖を反映します。下表はADAが採用するADAG研究の式による対応で、分類はADAの基準を参考にしています。',
    a1c: 'HbA1c',
    eagMgdl: '平均血糖 (mg/dL)',
    eagMmol: '平均血糖 (mmol/L)',
    category: '分類',
    rows: hba1cRows({ normal: '正常', prediabetes: '糖尿病前期', diabetes: '糖尿病の範囲' }),
  },
  formula: {
    heading: '変換式の解説',
    items: [
      { title: '血糖値の単位変換', text: 'mg/dL = mmol/L × 18、mmol/L = mg/dL ÷ 18。係数18はブドウ糖のモル質量（約180 g/mol）と 1 L = 10 dL の単位関係から導かれます。' },
      { title: 'HbA1c → 推定平均血糖値（eAG）', text: 'eAG（mg/dL）= 28.7 × HbA1c − 46.7、eAG（mmol/L）= 1.59 × HbA1c − 2.59。ADAが採用するADAG研究に基づく個人の平均値の推定式です。' },
      { title: '小数点以下の桁数', text: '一般的に mg/dL は整数、mmol/L は小数第1位まで表示します。まず正確な係数で計算し、最後に四捨五入します。' },
    ],
  },
  faq: {
    heading: '血糖値の単位変換についてよくある質問',
    items: [
      {
        q: 'mmol/L と mg/dL はどう変換しますか？',
        a: '係数18を覚えておけば大丈夫です。mmol/L × 18 = mg/dL、mg/dL ÷ 18 = mmol/L。たとえば 6.0 mmol/L × 18 = 108 mg/dL、180 mg/dL ÷ 18 = 10.0 mmol/L です。',
      },
      {
        q: '日本では mg/dL、他の国では mmol/L が使われるのはなぜですか？',
        a: '歴史的な計量慣行の違いです。mmol/L はSI単位系のモル濃度で中国・欧州などで広く使われ、mg/dL は質量濃度で日本や米国で使われています。どちらも同じ指標を表し、係数18で相互に変換できます。',
      },
      {
        q: '空腹時血糖 5.6 mmol/L は mg/dL でいくつですか？',
        a: '5.6 × 18 = 100.8、約 101 mg/dL です。ADA基準で空腹時血糖の正常上限が 5.6 mmol/L（約100 mg/dL）、糖尿病前期が 5.6〜6.9 mmol/L（100〜125 mg/dL）とされる由来にもなっています。',
      },
      {
        q: 'HbA1c 7% は平均血糖値でいうとどのくらいですか？',
        a: 'ADAGの式では 28.7 × 7 − 46.7 ≈ 154 mg/dL、約 8.5 mmol/L に相当します。多くの糖尿病患者では 7% がHbA1cの一般的な目標値ですが、個別の目標は医師に確認してください。',
      },
      {
        q: '変換結果が血糖計の表示と合いません。',
        a: 'まず機器やアプリの単位設定が報告書と一致しているか確認してください。丸めの誤差（mg/dL は整数、mmol/L は小数1桁）による ±1 程度のずれは正常です。また血糖計自体に約 ±15% の測定誤差があります。',
      },
      {
        q: 'CGM や Apple Health のデータにも使えますか？',
        a: '使えます。CGM（持続血糖測定）、血糖計、Apple Health の血糖データは同じ単位体系で、多くの機器では設定から単位を切り替えられます。海外の文献や報告書を読むときに本ツールで手動変換するのも便利です。',
      },
    ],
  },
  disclaimer:
    '本ツールは参考情報であり、医学的な診断・治療の助言ではありません。HbA1c と平均血糖の対応はADAが採用するADAG研究の式に基づく集団平均の推定です。ご不明な点は医療専門家にご相談ください。',
};

const zhHant: ConversionContent = {
  intro: {
    heading: '血糖單位換算：mmol/L 與 mg/dL',
    paragraphs: [
      '血糖報告和血糖機上的單位並不統一：中國、日本等地多使用 mg/dL（毫克/分升），而國際單位制與歐洲多使用 mmol/L（毫莫爾/公升）。閱讀國外資料或使用進口設備時，經常需要把兩種單位互相換算。',
      '兩者是線性關係：mg/dL = mmol/L × 18，反過來 mmol/L = mg/dL ÷ 18。例如空腹血糖 5.6 mmol/L 約等於 101 mg/dL，餐後血糖 7.8 mmol/L 約等於 140 mg/dL。',
      '下面的換算工具支援雙向即時換算，還可以把糖化血紅蛋白（HbA1c）換算成估算平均血糖（eAG），方便理解檢驗報告上不同指標之間的關係。所有計算都在您的瀏覽器本地完成。',
    ],
  },
  calc: {
    tabGlucose: '血糖值換算',
    tabHba1c: 'HbA1c 換算',
    inputLabel: '血糖值',
    inputUnitLabel: '輸入單位',
    resultLabel: '換算結果',
    formulaNote: '換算公式：mg/dL = mmol/L × 18',
    hba1cLabel: '糖化血紅蛋白 HbA1c（%）',
    hba1cResultLabel: '估算平均血糖（eAG）',
    hba1cNote: '基於 ADAG 研究公式：eAG（mg/dL）= 28.7 × HbA1c − 46.7',
    invalid: '請輸入有效的數值',
  },
  conversionTable: {
    heading: '常用血糖值換算對照表',
    description: '下表列出常見血糖值的 mmol/L 與 mg/dL 對照，可反向查閱：從右列 mg/dL 也能查到對應的 mmol/L。',
    mmol: 'mmol/L',
    mgdl: 'mg/dL',
    rows: CONVERSION_ROWS,
  },
  hba1cTable: {
    heading: 'HbA1c 與估算平均血糖對照表',
    description: 'HbA1c 反映近 2–3 個月的平均血糖水平。下表按 ADA 採用的 ADAG 研究公式給出對應關係，分類界限參考 ADA 標準。',
    a1c: 'HbA1c',
    eagMgdl: '平均血糖 (mg/dL)',
    eagMmol: '平均血糖 (mmol/L)',
    category: '分類',
    rows: hba1cRows({ normal: '正常', prediabetes: '糖前期', diabetes: '糖尿病參考範圍' }),
  },
  formula: {
    heading: '換算公式說明',
    items: [
      { title: '血糖單位換算', text: 'mg/dL = mmol/L × 18；mmol/L = mg/dL ÷ 18。係數 18 來自葡萄糖的莫爾質量（約 180 g/mol）與單位換算（1 L = 10 dL）的比值。' },
      { title: 'HbA1c → 估算平均血糖（eAG）', text: 'eAG（mg/dL）= 28.7 × HbA1c − 46.7；eAG（mmol/L）= 1.59 × HbA1c − 2.59。該公式來自 ADA 支持的 ADAG 研究，是個體平均水平的估算。' },
      { title: '小數位數', text: '習慣上 mg/dL 取整數，mmol/L 保留一位小數。換算時先用精確係數計算，最後再四捨五入即可。' },
    ],
  },
  faq: {
    heading: '血糖單位換算常見問題',
    items: [
      {
        q: 'mmol/L 和 mg/dL 怎麼互相換算？',
        a: '記住係數 18 即可：mmol/L 乘以 18 得到 mg/dL，mg/dL 除以 18 得到 mmol/L。例如 6.0 mmol/L × 18 = 108 mg/dL；180 mg/dL ÷ 18 = 10.0 mmol/L。',
      },
      {
        q: '為什麼各地使用的單位不同？',
        a: '這是歷史與計量習慣的差異。mmol/L 是國際單位制（SI）的莫耳濃度單位，歐洲與中國大陸採用；mg/dL 是質量濃度單位，日本與美國沿用至今。兩種單位描述的是同一個指標，用係數 18 即可互換。',
      },
      {
        q: '空腹血糖 5.6 mmol/L 是多少 mg/dL？',
        a: '5.6 × 18 = 100.8，約等於 101 mg/dL。這也是 ADA 標準中空腹血糖「正常上限」的來源：5.6 mmol/L（≈100 mg/dL）以上即進入糖前期範圍（5.6–6.9 mmol/L，即 100–125 mg/dL）。',
      },
      {
        q: 'HbA1c 7% 相當於平均血糖多少？',
        a: '按 ADAG 公式：28.7 × 7 − 46.7 ≈ 154 mg/dL，約合 8.5 mmol/L。對多數已確診的糖尿病患者，7% 是常用的 HbA1c 控制目標，具體目標請以醫生的建議為準。',
      },
      {
        q: '換算結果和我的血糖機顯示不一致？',
        a: '先確認設備和 App 中設定的單位是否與報告一致，再檢查是否取整差異：mg/dL 顯示整數、mmol/L 顯示一位小數，換算過程中的四捨五入可能造成 ±1 的差別，屬正常現象。此外血糖機本身允許約 ±15% 的測量誤差。',
      },
      {
        q: '這個換算工具適用於 CGM 和 Apple Health 數據嗎？',
        a: '適用。CGM（連續血糖監測）、血糖機和 Apple Health 中的葡萄糖數據都使用同樣的單位體系，可以在設備或 App 設定中直接切換單位；當需要閱讀英文文獻、國外報告或與海外醫生溝通時，用本工具手動換算也很方便。',
      },
    ],
  },
  disclaimer:
    '本換算工具僅供參考，不構成醫療診斷或治療建議。HbA1c 與平均血糖的對應關係基於 ADA 採用的 ADAG 研究公式，為群體平均水平估算。如有疑問，請諮詢專業醫生。',
};

const CONTENT: Record<Language, ConversionContent> = { zh, en, ja, 'zh-Hant': zhHant };

import type { Language } from '@/types';

/**
 * Prediabetes self-check questionnaire: content (4 languages) + scoring logic.
 *
 * Glucose thresholds follow the ADA Standards of Care / WHO cutoffs:
 * - Fasting plasma glucose:  normal < 5.6 | prediabetes 5.6-6.9 | diabetes >= 7.0 (mmol/L)
 * - 2-h postprandial glucose: normal < 7.8 | prediabetes 7.8-11.0 | diabetes >= 11.1 (mmol/L)
 * - HbA1c (%):               normal < 5.7  | prediabetes 5.7-6.4  | diabetes >= 6.5
 *
 * Risk score is a simplified FINDRISC-style accumulation (max 19 pts).
 * This tool is informational only — never a diagnosis.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type GlucoseMetric = 'fasting' | 'postprandial' | 'hba1c';
export type GlucoseCategory = 'normal' | 'prediabetes' | 'diabetes';
export type ResultLevel = 'low' | 'watch' | 'high' | 'medical';
export type GlucoseUnit = 'mmol' | 'mgdl';

export interface Answers {
  gender: 'male' | 'female' | null;
  age: string | null;
  heightCm: number | null;
  weightKg: number | null;
  waistCm: number | null;
  familyHistory: boolean | null;
  gestationalHistory: boolean | null;
  hypertension: boolean | null;
  exercise: string | null;
  glucoseProvided: boolean;
  fasting: number | null;
  postprandial: number | null;
  hba1c: number | null;
  unit: GlucoseUnit;
  symptoms: string[];
}

export interface MetricResult {
  metric: GlucoseMetric;
  value: number | null;
  category: GlucoseCategory | null; // null = not provided
}

export interface AssessmentResult {
  level: ResultLevel;
  riskScore: number;
  symptomCount: number;
  metrics: MetricResult[];
  topRiskFactorIds: string[];
}

export interface QuestionOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  label: string;
  kind: 'single' | 'number' | 'boolean';
  options?: QuestionOption[];
  unit?: string;
  hint?: string;
  optional?: boolean;
  showIf?: { questionId: string; equals: string[] };
}

export interface PrediabetesContent {
  intro: { heading: string; paragraphs: string[] };
  wizard: {
    startTitle: string;
    startSubtitle: string;
    startButton: string;
    stepLabel: string; // '{current} / {total}' template
    prev: string;
    next: string;
    seeResult: string;
    optional: string;
    skip: string;
    redo: string;
    privacyNote: string;
    yes: string;
    no: string;
    stepTitles: string[];
    resultTitle: string;
    riskHeading: string;
    metricHeading: string;
    adviceHeading: string;
    guideLink: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
  questions: Question[];
  glucoseStep: {
    title: string;
    subtitle: string;
    metrics: { id: GlucoseMetric; label: string; hint: string }[];
    unitToggle: { mmol: string; mgdl: string };
  };
  symptomStep: {
    title: string;
    subtitle: string;
    options: QuestionOption[];
    noneLabel: string;
  };
  classification: Record<GlucoseCategory, string> & { notProvided: string };
  normalRangeTemplate: string; // '{value} {unit}' prefix like '正常 < {value} {unit}'
  resultLevels: Record<
    ResultLevel,
    { label: string; title: string; description: string; advice: string[] }
  >;
  riskFactorLabels: Record<string, string>;
  standards: {
    heading: string;
    description: string;
    metric: string;
    normal: string;
    prediabetes: string;
    diabetes: string;
    rows: { metric: string; normal: string; prediabetes: string; diabetes: string }[];
  };
  faq: { heading: string; items: { q: string; a: string }[] };
  disclaimer: string;
}

// ---------------------------------------------------------------------------
// Scoring logic (language-independent)
// ---------------------------------------------------------------------------

const GLUCOSE_THRESHOLDS: Record<GlucoseMetric, { prediabetesFrom: number; diabetesFrom: number }> = {
  // mmol/L (HbA1c in %)
  fasting: { prediabetesFrom: 5.6, diabetesFrom: 7.0 },
  postprandial: { prediabetesFrom: 7.8, diabetesFrom: 11.1 },
  hba1c: { prediabetesFrom: 5.7, diabetesFrom: 6.5 },
};

const MGDL_PER_MMOL = 18;

export function toMmolPerL(value: number, unit: GlucoseUnit): number {
  return unit === 'mgdl' ? value / MGDL_PER_MMOL : value;
}

export function mmolToMgDl(value: number): number {
  return value * MGDL_PER_MMOL;
}

export function classifyGlucose(
  value: number,
  metric: GlucoseMetric,
  unit: GlucoseUnit
): GlucoseCategory {
  const mmol = metric === 'hba1c' ? value : toMmolPerL(value, unit);
  const { prediabetesFrom, diabetesFrom } = GLUCOSE_THRESHOLDS[metric];
  if (mmol >= diabetesFrom) return 'diabetes';
  if (mmol >= prediabetesFrom) return 'prediabetes';
  return 'normal';
}

export function computeBmi(heightCm: number | null, weightKg: number | null): number | null {
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) return null;
  const m = heightCm / 100;
  return weightKg / (m * m);
}

export function computeResult(answers: Answers): AssessmentResult {
  const bmi = computeBmi(answers.heightCm, answers.weightKg);

  let riskScore = 0;
  const topRiskFactorIds: string[] = [];

  // Age
  let agePoints = 0;
  if (answers.age === '40to59') agePoints = 2;
  if (answers.age === 'ge60') agePoints = 3;
  riskScore += agePoints;
  if (agePoints >= 2) topRiskFactorIds.push('age');

  // BMI (Chinese adult cutoffs: 24 overweight / 28 obese)
  let bmiPoints = 0;
  if (bmi != null) {
    if (bmi >= 28) bmiPoints = 3;
    else if (bmi >= 24) bmiPoints = 1;
  }
  riskScore += bmiPoints;
  if (bmiPoints >= 1) topRiskFactorIds.push('bmi');

  // Waist circumference (gender-specific: male >=90/100, female >=80/90)
  let waistPoints = 0;
  if (answers.waistCm != null && answers.gender) {
    if (answers.gender === 'male') {
      if (answers.waistCm >= 100) waistPoints = 4;
      else if (answers.waistCm >= 90) waistPoints = 3;
    } else {
      if (answers.waistCm >= 90) waistPoints = 4;
      else if (answers.waistCm >= 80) waistPoints = 3;
    }
  }
  riskScore += waistPoints;
  if (waistPoints >= 3) topRiskFactorIds.push('waist');

  if (answers.familyHistory) {
    riskScore += 3;
    topRiskFactorIds.push('familyHistory');
  }
  if (answers.gestationalHistory) {
    riskScore += 2;
    topRiskFactorIds.push('gestationalHistory');
  }
  if (answers.hypertension) {
    riskScore += 2;
    topRiskFactorIds.push('hypertension');
  }

  // Physical activity
  let exercisePoints = 0;
  if (answers.exercise === 'rarely') exercisePoints = 2;
  else if (answers.exercise === 'occasional') exercisePoints = 1;
  riskScore += exercisePoints;
  if (exercisePoints >= 2) topRiskFactorIds.push('exercise');

  // Symptoms: informational weighting (1 pt each), excluded from FINDRISC score
  const realSymptoms = answers.symptoms.filter((s) => s !== 'none');
  const symptomCount = realSymptoms.length;
  if (symptomCount >= 2) topRiskFactorIds.push('symptoms');

  // Glucose metric classification
  const metrics: MetricResult[] = answers.glucoseProvided
    ? [
        {
          metric: 'fasting',
          value: answers.fasting,
          category:
            answers.fasting != null
              ? classifyGlucose(answers.fasting, 'fasting', answers.unit)
              : null,
        },
        {
          metric: 'postprandial',
          value: answers.postprandial,
          category:
            answers.postprandial != null
              ? classifyGlucose(answers.postprandial, 'postprandial', answers.unit)
              : null,
        },
        {
          metric: 'hba1c',
          value: answers.hba1c,
          category:
            answers.hba1c != null ? classifyGlucose(answers.hba1c, 'hba1c', answers.unit) : null,
        },
      ]
    : [];

  const prediabetesCount = metrics.filter((m) => m.category === 'prediabetes').length;
  const diabetesCount = metrics.filter((m) => m.category === 'diabetes').length;

  let level: ResultLevel;
  if (diabetesCount > 0) {
    level = 'medical';
  } else if (riskScore >= 12 || (riskScore >= 7 && (prediabetesCount >= 1 || symptomCount >= 2))) {
    level = 'high';
  } else if (riskScore >= 5 || prediabetesCount >= 1 || symptomCount >= 1) {
    level = 'watch';
  } else {
    level = 'low';
  }

  return { level, riskScore, symptomCount, metrics, topRiskFactorIds };
}

// ---------------------------------------------------------------------------
// Per-language content
// ---------------------------------------------------------------------------

const zh: PrediabetesContent = {
  intro: {
    heading: '什么是糖尿病前期？',
    paragraphs: [
      '糖尿病前期（糖前期）指血糖水平高于正常、但尚未达到糖尿病诊断标准的状态，包括空腹血糖受损、糖耐量异常或 HbA1c 处于 5.7%–6.4%。糖前期通常没有明显症状，很多人是在体检时才偶然发现。',
      '好消息是：糖前期往往可以逆转。研究显示，通过控制饮食、规律运动、适度减重（5%–7%），可以显著降低发展为 2 型糖尿病的风险。越早发现，干预效果越好。',
      '这份自测问卷结合您近期的血糖数据（如有）、典型症状与常见风险因素，帮您初步了解自己的糖前期风险水平。整个过程约 3 分钟，所有数据仅在您的浏览器本地计算。',
    ],
  },
  wizard: {
    startTitle: '3 分钟评估您的糖前期风险',
    startSubtitle: '回答约 10 个问题，结合近期血糖与症状表现，了解您离糖尿病有多远。',
    startButton: '开始自测',
    stepLabel: '第 {current} 步 / 共 {total} 步',
    prev: '上一步',
    next: '下一步',
    seeResult: '查看评估结果',
    optional: '选填',
    skip: '不清楚血糖数据，跳过这一步',
    redo: '重新测试',
    privacyNote: '所有数据仅在您的浏览器本地计算，不会上传或保存。',
    yes: '是',
    no: '否',
    stepTitles: ['基础信息与风险因素', '近期血糖（可选）', '近期症状'],
    resultTitle: '您的评估结果',
    riskHeading: '主要风险因素',
    metricHeading: '血糖指标分析',
    adviceHeading: '针对建议',
    guideLink: '查看血糖管理指南',
    ctaTitle: '用轻糖持续追踪血糖',
    ctaSubtitle: '记录血糖、饮食与运动，AI 洞察帮您更早发现问题。',
    ctaButton: '免费下载轻糖',
  },
  questions: [
    {
      id: 'gender',
      label: '您的性别',
      kind: 'single',
      options: [
        { id: 'male', label: '男' },
        { id: 'female', label: '女' },
      ],
    },
    {
      id: 'age',
      label: '您的年龄段',
      kind: 'single',
      options: [
        { id: 'lt40', label: '40 岁以下' },
        { id: '40to59', label: '40–59 岁' },
        { id: 'ge60', label: '60 岁及以上' },
      ],
    },
    { id: 'height', label: '身高', kind: 'number', unit: 'cm', optional: true },
    { id: 'weight', label: '体重', kind: 'number', unit: 'kg', optional: true },
    {
      id: 'waist',
      label: '腰围',
      kind: 'number',
      unit: 'cm',
      hint: '绕肚脐水平一圈测量',
      optional: true,
    },
    {
      id: 'familyHistory',
      label: '父母或兄弟姐妹中有人患糖尿病？',
      kind: 'boolean',
    },
    {
      id: 'gestationalHistory',
      label: '曾患妊娠糖尿病或分娩过巨大儿（≥4 kg）？',
      kind: 'boolean',
      showIf: { questionId: 'gender', equals: ['female'] },
    },
    { id: 'hypertension', label: '有高血压（或正在服用降压药）？', kind: 'boolean' },
    {
      id: 'exercise',
      label: '日常运动情况',
      kind: 'single',
      options: [
        { id: 'regular', label: '每周至少 3 次中等强度运动' },
        { id: 'occasional', label: '偶尔运动' },
        { id: 'rarely', label: '几乎不运动' },
      ],
    },
  ],
  glucoseStep: {
    title: '近期血糖数据',
    subtitle: '如果您近期测过血糖或做过体检，填写以下数值可以让评估更准确。',
    metrics: [
      { id: 'fasting', label: '空腹血糖', hint: '至少 8 小时未进食后测得（如晨起）' },
      { id: 'postprandial', label: '餐后 2 小时血糖', hint: '从吃第一口饭算起 2 小时' },
      { id: 'hba1c', label: '糖化血红蛋白（HbA1c）', hint: '反映近 2–3 个月平均血糖，见化验单' },
    ],
    unitToggle: { mmol: 'mmol/L', mgdl: 'mg/dL' },
  },
  symptomStep: {
    title: '近期症状',
    subtitle: '以下症状在最近 2–4 周内是否出现过？（可多选）',
    options: [
      { id: 'thirst', label: '经常口渴、喝水多' },
      { id: 'urination', label: '尿频、夜尿增多' },
      { id: 'fatigue', label: '容易疲劳、乏力' },
      { id: 'blurred', label: '视力模糊或波动' },
      { id: 'wounds', label: '伤口不易愈合' },
      { id: 'numbness', label: '手脚麻木或刺痛' },
      { id: 'weightLoss', label: '不明原因体重下降' },
    ],
    noneLabel: '以上均无明显症状',
  },
  classification: {
    normal: '正常范围',
    prediabetes: '糖前期范围',
    diabetes: '糖尿病参考范围',
    notProvided: '未填写',
  },
  normalRangeTemplate: '正常 < {value} {unit}',
  resultLevels: {
    low: {
      label: '低风险',
      title: '目前糖前期风险较低',
      description:
        '根据您的回答，目前暂未发现明显的糖前期风险信号。继续保持健康的生活方式即可。',
      advice: [
        '保持规律运动与均衡饮食，控制精制碳水和含糖饮料',
        '每年复查一次空腹血糖或 HbA1c，尤其是 40 岁以后',
        '保持健康体重，腰围不超标',
      ],
    },
    watch: {
      label: '关注级',
      title: '存在糖前期可能，建议关注',
      description:
        '您存在一些糖前期相关风险信号。虽然目前不必过度担心，但建议尽早改善生活方式并安排复测。',
      advice: [
        '减少精制碳水与含糖饮料，增加蔬菜、全谷物和蛋白质比例',
        '每周至少 150 分钟中等强度运动（快走、游泳、骑行等）',
        '如超重，目标减重 5%–7%',
        '3–6 个月后复测空腹血糖；有条件时测一次 HbA1c',
        '可以用轻糖 App 记录血糖与饮食，观察趋势变化',
      ],
    },
    high: {
      label: '高风险',
      title: '糖前期可能性较大',
      description:
        '综合风险因素与症状表现，您目前处于糖前期较高风险水平。建议尽快安排医院检查（空腹血糖、OGTT 或 HbA1c）以明确情况。',
      advice: [
        '尽快到医院做空腹血糖、口服葡萄糖耐量试验（OGTT）或 HbA1c 检查',
        '立即开始生活方式干预：饮食调整 + 规律运动 + 减重 5%–7%',
        '戒含糖饮料与夜宵，主食粗细搭配',
        '每 3–6 个月复查一次血糖指标',
        '如已确诊糖前期，遵医嘱定期随访，部分情况医生可能建议药物干预',
      ],
    },
    medical: {
      label: '血糖偏高',
      title: '血糖值已达糖尿病参考范围',
      description:
        '您填写的血糖值达到了糖尿病诊断参考范围（注意：单次测量不能确诊）。请尽快到医院复查确认，不建议拖延。',
      advice: [
        '尽快到内分泌科就诊，复查空腹血糖 / OGTT / HbA1c',
        '就诊时携带近期全部血糖记录，便于医生判断',
        '在确诊前避免高糖饮食，但不要极端节食',
        '如出现明显口渴、多尿、体重快速下降，请立即就医',
      ],
    },
  },
  riskFactorLabels: {
    age: '年龄 ≥ 40 岁',
    bmi: '体重超标（BMI ≥ 24）',
    waist: '腰围超标（向心性肥胖）',
    familyHistory: '糖尿病家族史',
    gestationalHistory: '妊娠糖尿病史',
    hypertension: '高血压',
    exercise: '运动不足',
    symptoms: '存在多项典型症状',
  },
  standards: {
    heading: '糖前期判断标准',
    description:
      '下表为 ADA（美国糖尿病协会）与 WHO 公布的血糖分类界限值，也是本自测工具使用的判断依据（单位：mmol/L，括号内为 mg/dL）。',
    metric: '指标',
    normal: '正常',
    prediabetes: '糖前期',
    diabetes: '糖尿病范围',
    rows: [
      {
        metric: '空腹血糖（FPG）',
        normal: '< 5.6 (100)',
        prediabetes: '5.6–6.9 (100–125)',
        diabetes: '≥ 7.0 (126)',
      },
      {
        metric: '餐后 2 小时血糖（2h PG）',
        normal: '< 7.8 (140)',
        prediabetes: '7.8–11.0 (140–199)',
        diabetes: '≥ 11.1 (200)',
      },
      {
        metric: '糖化血红蛋白（HbA1c）',
        normal: '< 5.7 %',
        prediabetes: '5.7–6.4 %',
        diabetes: '≥ 6.5 %',
      },
    ],
  },
  faq: {
    heading: '糖前期常见问题',
    items: [
      {
        q: '糖尿病前期是什么意思？会发展成糖尿病吗？',
        a: '糖尿病前期指血糖高于正常但未达糖尿病诊断标准的状态，包括空腹血糖受损（5.6–6.9 mmol/L）、糖耐量异常（餐后 2h 7.8–11.0 mmol/L）或 HbA1c 5.7%–6.4%。如果不加干预，每年约有 5%–10% 的糖前期人群会发展为 2 型糖尿病；但通过生活方式干预，大部分人是可以逆转或长期稳定的。',
      },
      {
        q: '糖前期可以逆转吗？',
        a: '可以。多项大型研究（如中国大庆研究、美国 DPP 研究）证实：通过饮食控制、每周 150 分钟以上中等强度运动、减重 5%–7%，可以把发展为糖尿病的风险降低约 40%–58%，部分参与者血糖完全恢复正常。越早发现、越早干预，逆转的可能性越大。',
      },
      {
        q: '没有任何症状，也需要关注糖前期吗？',
        a: '需要。糖前期和早期 2 型糖尿病往往没有明显症状，很多人多饮、多尿、疲劳等症状出现时，血糖已经偏高多年。因此高危人群（40 岁以上、超重、有家族史、高血压、妊娠糖尿病史）即使没有症状，也建议定期检测血糖。',
      },
      {
        q: '自测显示高风险，下一步怎么办？',
        a: '建议尽快到医院内分泌科检查空腹血糖、口服葡萄糖耐量试验（OGTT）或糖化血红蛋白（HbA1c），以明确诊断。单次指尖血糖或本问卷结果都不能作为确诊依据。同时可以立即开始生活方式干预：控制饮食、规律运动、减重。',
      },
      {
        q: '多久测一次血糖比较合适？',
        a: '普通 35 岁以上人群建议每年体检查一次空腹血糖；糖前期人群建议每 3–6 个月复查空腹血糖或 HbA1c；已确诊糖尿病者遵医嘱监测。居家自测建议固定时间（如晨起空腹）并做好记录，便于观察趋势。',
      },
      {
        q: '这个自测工具的结果准确吗？能代替医院检查吗？',
        a: '不能代替医院检查。本工具基于 ADA/WHO 的公开判断标准和 FINDRISC 等经典风险评估量表设计，用于帮助您了解自身风险水平、判断是否需要就医检查。最终诊断必须以医院静脉血检测（空腹血糖、OGTT、HbA1c）为准。',
      },
    ],
  },
  disclaimer:
    '本自测工具仅供参考，不构成医疗诊断或治疗建议。判断标准参考 ADA 与 WHO 公开发布的血糖分类界限值。如有疑问，请咨询专业医生。',
};

const en: PrediabetesContent = {
  intro: {
    heading: 'What Is Prediabetes?',
    paragraphs: [
      'Prediabetes means your blood sugar is higher than normal but not yet in the diabetes range — impaired fasting glucose, impaired glucose tolerance, or an HbA1c of 5.7%–6.4%. It usually has no obvious symptoms, and many people only discover it during a routine checkup.',
      'The good news: prediabetes is often reversible. Studies show that a healthier diet, regular exercise, and modest weight loss (5%–7%) can dramatically reduce the risk of progressing to type 2 diabetes. The earlier you find it, the better the outcome.',
      'This self-check combines your recent glucose readings (if available), typical symptoms, and common risk factors to give you a preliminary picture of your prediabetes risk. It takes about 3 minutes, and all data is computed locally in your browser.',
    ],
  },
  wizard: {
    startTitle: 'Assess Your Prediabetes Risk in 3 Minutes',
    startSubtitle:
      'Answer about 10 questions covering recent glucose readings and symptoms to see where you stand.',
    startButton: 'Start Self-Check',
    stepLabel: 'Step {current} of {total}',
    prev: 'Back',
    next: 'Next',
    seeResult: 'See My Result',
    optional: 'Optional',
    skip: "I don't know my glucose numbers — skip",
    redo: 'Retake the Check',
    privacyNote: 'All data is computed locally in your browser. Nothing is uploaded or stored.',
    yes: 'Yes',
    no: 'No',
    stepTitles: ['Basics & Risk Factors', 'Recent Glucose (Optional)', 'Recent Symptoms'],
    resultTitle: 'Your Assessment',
    riskHeading: 'Main Risk Factors',
    metricHeading: 'Glucose Metrics',
    adviceHeading: 'Recommendations',
    guideLink: 'Read the Blood Sugar Management Guide',
    ctaTitle: 'Keep Tracking with SugarLite',
    ctaSubtitle: 'Log glucose, meals, and exercise — AI insights help you spot issues earlier.',
    ctaButton: 'Download SugarLite Free',
  },
  questions: [
    {
      id: 'gender',
      label: 'Your sex',
      kind: 'single',
      options: [
        { id: 'male', label: 'Male' },
        { id: 'female', label: 'Female' },
      ],
    },
    {
      id: 'age',
      label: 'Age group',
      kind: 'single',
      options: [
        { id: 'lt40', label: 'Under 40' },
        { id: '40to59', label: '40–59' },
        { id: 'ge60', label: '60 or older' },
      ],
    },
    { id: 'height', label: 'Height', kind: 'number', unit: 'cm', optional: true },
    { id: 'weight', label: 'Weight', kind: 'number', unit: 'kg', optional: true },
    {
      id: 'waist',
      label: 'Waist circumference',
      kind: 'number',
      unit: 'cm',
      hint: 'Measure around the navel',
      optional: true,
    },
    {
      id: 'familyHistory',
      label: 'Does a parent or sibling have diabetes?',
      kind: 'boolean',
    },
    {
      id: 'gestationalHistory',
      label: 'History of gestational diabetes or a baby weighing 4 kg (8.8 lb) or more?',
      kind: 'boolean',
      showIf: { questionId: 'gender', equals: ['female'] },
    },
    {
      id: 'hypertension',
      label: 'High blood pressure (or on blood-pressure medication)?',
      kind: 'boolean',
    },
    {
      id: 'exercise',
      label: 'How often do you exercise?',
      kind: 'single',
      options: [
        { id: 'regular', label: 'Moderate exercise 3+ times a week' },
        { id: 'occasional', label: 'Occasionally' },
        { id: 'rarely', label: 'Hardly ever' },
      ],
    },
  ],
  glucoseStep: {
    title: 'Recent Glucose Readings',
    subtitle:
      'If you have tested your glucose recently or had a checkup, enter the values below for a more accurate assessment.',
    metrics: [
      { id: 'fasting', label: 'Fasting glucose', hint: 'After no food for at least 8 hours (e.g., morning)' },
      { id: 'postprandial', label: '2-hour post-meal glucose', hint: '2 hours after the first bite of a meal' },
      { id: 'hba1c', label: 'HbA1c', hint: 'Average glucose over 2–3 months, from your lab report' },
    ],
    unitToggle: { mmol: 'mmol/L', mgdl: 'mg/dL' },
  },
  symptomStep: {
    title: 'Recent Symptoms',
    subtitle: 'Have you experienced any of these in the past 2–4 weeks? (Select all that apply)',
    options: [
      { id: 'thirst', label: 'Frequent thirst, drinking a lot' },
      { id: 'urination', label: 'Frequent urination, especially at night' },
      { id: 'fatigue', label: 'Unusual tiredness or low energy' },
      { id: 'blurred', label: 'Blurred or fluctuating vision' },
      { id: 'wounds', label: 'Slow-healing wounds' },
      { id: 'numbness', label: 'Numbness or tingling in hands or feet' },
      { id: 'weightLoss', label: 'Unexplained weight loss' },
    ],
    noneLabel: 'None of the above',
  },
  classification: {
    normal: 'Normal range',
    prediabetes: 'Prediabetes range',
    diabetes: 'Diabetes range',
    notProvided: 'Not provided',
  },
  normalRangeTemplate: 'Normal < {value} {unit}',
  resultLevels: {
    low: {
      label: 'Low Risk',
      title: 'Low prediabetes risk for now',
      description:
        'Based on your answers, no clear prediabetes risk signals were found. Keep up your healthy habits.',
      advice: [
        'Keep exercising regularly and eating a balanced diet with fewer refined carbs and sugary drinks',
        'Recheck fasting glucose or HbA1c once a year, especially after 40',
        'Maintain a healthy weight and waistline',
      ],
    },
    watch: {
      label: 'Watch Level',
      title: 'Prediabetes is possible — worth watching',
      description:
        'You have some signals associated with prediabetes. No need to panic, but improving your lifestyle now and rechecking soon is a smart move.',
      advice: [
        'Cut back on refined carbs and sugary drinks; add vegetables, whole grains, and protein',
        'At least 150 minutes of moderate exercise per week (brisk walking, swimming, cycling)',
        'If overweight, aim to lose 5%–7% of body weight',
        'Recheck fasting glucose in 3–6 months; get an HbA1c if possible',
        'Use SugarLite to log glucose and meals and watch your trends',
      ],
    },
    high: {
      label: 'High Risk',
      title: 'Prediabetes is likely',
      description:
        'Combining your risk factors and symptoms, you are at a high risk level for prediabetes. We recommend getting tested soon (fasting glucose, OGTT, or HbA1c) to confirm.',
      advice: [
        'Get a fasting glucose, oral glucose tolerance test (OGTT), or HbA1c at a clinic soon',
        'Start lifestyle intervention right away: diet changes + regular exercise + 5%–7% weight loss',
        'Cut sugary drinks and late-night snacks; mix whole grains into your staples',
        'Recheck glucose markers every 3–6 months',
        'If diagnosed with prediabetes, follow up as advised — medication may be considered in some cases',
      ],
    },
    medical: {
      label: 'Elevated Glucose',
      title: 'Your glucose value is in the diabetes range',
      description:
        'The glucose value you entered falls in the diabetes reference range (note: a single measurement does not confirm diabetes). Please see a doctor promptly for confirmation.',
      advice: [
        'See an endocrinologist soon and recheck fasting glucose / OGTT / HbA1c',
        'Bring all your recent glucose records to the appointment',
        'Avoid high-sugar foods before diagnosis, but do not crash diet',
        'Seek care immediately if you have marked thirst, frequent urination, or rapid weight loss',
      ],
    },
  },
  riskFactorLabels: {
    age: 'Age 40 or older',
    bmi: 'Overweight (BMI ≥ 24)',
    waist: 'High waist circumference (central obesity)',
    familyHistory: 'Family history of diabetes',
    gestationalHistory: 'History of gestational diabetes',
    hypertension: 'High blood pressure',
    exercise: 'Physical inactivity',
    symptoms: 'Multiple typical symptoms',
  },
  standards: {
    heading: 'Prediabetes Diagnostic Cutoffs',
    description:
      'The table below shows the glucose classification cutoffs published by the ADA and WHO — the same thresholds this self-check uses (mmol/L, with mg/dL in parentheses).',
    metric: 'Metric',
    normal: 'Normal',
    prediabetes: 'Prediabetes',
    diabetes: 'Diabetes range',
    rows: [
      {
        metric: 'Fasting plasma glucose (FPG)',
        normal: '< 5.6 (100)',
        prediabetes: '5.6–6.9 (100–125)',
        diabetes: '≥ 7.0 (126)',
      },
      {
        metric: '2-hour post-meal glucose (2h PG)',
        normal: '< 7.8 (140)',
        prediabetes: '7.8–11.0 (140–199)',
        diabetes: '≥ 11.1 (200)',
      },
      {
        metric: 'HbA1c',
        normal: '< 5.7 %',
        prediabetes: '5.7–6.4 %',
        diabetes: '≥ 6.5 %',
      },
    ],
  },
  faq: {
    heading: 'Prediabetes FAQ',
    items: [
      {
        q: 'What does prediabetes mean? Will it become diabetes?',
        a: 'Prediabetes means blood sugar above normal but below the diabetes threshold: impaired fasting glucose (5.6–6.9 mmol/L), impaired glucose tolerance (2h glucose 7.8–11.0 mmol/L), or HbA1c 5.7%–6.4%. Without intervention, about 5%–10% of people with prediabetes develop type 2 diabetes each year — but with lifestyle changes, most can reverse it or stay stable long term.',
      },
      {
        q: 'Can prediabetes be reversed?',
        a: 'Yes. Large trials such as the Da Qing study in China and the US Diabetes Prevention Program showed that diet changes, 150+ minutes of weekly moderate exercise, and 5%–7% weight loss cut the risk of progressing to diabetes by roughly 40%–58%, and some participants returned to normal glucose entirely. The earlier the intervention, the better the odds.',
      },
      {
        q: 'Should I worry about prediabetes without symptoms?',
        a: 'Yes. Prediabetes and early type 2 diabetes are often symptom-free; by the time thirst, frequent urination, or fatigue appear, glucose may have been elevated for years. That is why higher-risk groups (40+, overweight, family history, hypertension, gestational diabetes history) should test regularly even without symptoms.',
      },
      {
        q: 'My result is high risk — what now?',
        a: 'See a doctor for a fasting glucose, oral glucose tolerance test (OGTT), or HbA1c to confirm. Neither a single fingerstick reading nor this questionnaire can diagnose diabetes. Meanwhile, start lifestyle changes immediately: eat better, exercise regularly, and lose weight if needed.',
      },
      {
        q: 'How often should I check my blood sugar?',
        a: 'Adults 35+ should have a fasting glucose check at their annual physical. People with prediabetes should recheck fasting glucose or HbA1c every 3–6 months. People diagnosed with diabetes follow their doctor\u2019s monitoring plan. At home, test at a consistent time (e.g., morning fasting) and keep records to track trends.',
      },
      {
        q: 'Is this self-check accurate? Can it replace a medical test?',
        a: 'No — it cannot replace medical testing. This tool is built on the ADA/WHO published cutoffs and validated risk-score instruments (e.g., FINDRISC) to help you gauge your risk and decide whether to get tested. Diagnosis must be based on venous blood tests at a clinic (fasting glucose, OGTT, HbA1c).',
      },
    ],
  },
  disclaimer:
    'This self-check is for informational purposes only and is not a medical diagnosis or treatment advice. Thresholds are based on glucose classification cutoffs published by the ADA and WHO. Consult a healthcare professional with any concerns.',
};

const ja: PrediabetesContent = {
  intro: {
    heading: '糖尿病前期（予備軍）とは？',
    paragraphs: [
      '糖尿病前期とは、血糖値が正常より高いものの、糖尿病の診断基準には達していない状態です。空腹時血糖障害、耐糖能異常、HbA1c 5.7%–6.4% が該当します。自覚症状はほとんどなく、健康診断で偶然見つかることも少なくありません。',
      '朗報です。糖尿病前期は多くの場合、改善（リバース）できます。研究では、食事改善・定期的な運動・体重の5%〜7%減によって、2型糖尿病への進行リスクを大幅に下げられることが示されています。早く見つけるほど効果は大きくなります。',
      'このセルフチェックは、直近の血糖データ（あれば）、典型的な症状、主なリスク要因をもとに、あなたの糖尿病前期リスクを大まかに把握するものです。所要時間は約3分で、すべてのデータはブラウザ内でのみ計算されます。',
    ],
  },
  wizard: {
    startTitle: '3分でわかる糖尿病前期リスク',
    startSubtitle:
      '約10問の質問に答えて、直近の血糖値と症状から、糖尿病までの距離をチェックしましょう。',
    startButton: 'チェックを始める',
    stepLabel: 'ステップ {current} / {total}',
    prev: '戻る',
    next: '次へ',
    seeResult: '結果を見る',
    optional: '任意',
    skip: '血糖値がわからないのでスキップ',
    redo: 'もう一度チェックする',
    privacyNote: 'すべてのデータはブラウザ内でのみ計算され、送信・保存されません。',
    yes: 'はい',
    no: 'いいえ',
    stepTitles: ['基本情報とリスク要因', '直近の血糖値（任意）', '直近の症状'],
    resultTitle: 'あなたの評価結果',
    riskHeading: '主なリスク要因',
    metricHeading: '血糖指標の分析',
    adviceHeading: 'おすすめの対応',
    guideLink: '血糖管理ガイドを読む',
    ctaTitle: '軽糖（SugarLite）で血糖を続けて記録',
    ctaSubtitle: '血糖・食事・運動を記録し、AIインサイトで早めに変化に気づけます。',
    ctaButton: '軽糖を無料ダウンロード',
  },
  questions: [
    {
      id: 'gender',
      label: '性別',
      kind: 'single',
      options: [
        { id: 'male', label: '男性' },
        { id: 'female', label: '女性' },
      ],
    },
    {
      id: 'age',
      label: '年齢区分',
      kind: 'single',
      options: [
        { id: 'lt40', label: '40歳未満' },
        { id: '40to59', label: '40〜59歳' },
        { id: 'ge60', label: '60歳以上' },
      ],
    },
    { id: 'height', label: '身長', kind: 'number', unit: 'cm', optional: true },
    { id: 'weight', label: '体重', kind: 'number', unit: 'kg', optional: true },
    {
      id: 'waist',
      label: 'ウエスト周囲径',
      kind: 'number',
      unit: 'cm',
      hint: 'へその高さで水平に測定',
      optional: true,
    },
    {
      id: 'familyHistory',
      label: '父母・兄弟姉妹に糖尿病の人がいますか？',
      kind: 'boolean',
    },
    {
      id: 'gestationalHistory',
      label: '妊娠糖尿病の既往、または4kg以上の巨大児の出産経験がありますか？',
      kind: 'boolean',
      showIf: { questionId: 'gender', equals: ['female'] },
    },
    {
      id: 'hypertension',
      label: '高血圧（または降圧薬服用中）ですか？',
      kind: 'boolean',
    },
    {
      id: 'exercise',
      label: 'ふだんの運動習慣',
      kind: 'single',
      options: [
        { id: 'regular', label: '週3回以上の中強度運動' },
        { id: 'occasional', label: 'ときどき運動する' },
        { id: 'rarely', label: 'ほとんどしない' },
      ],
    },
  ],
  glucoseStep: {
    title: '直近の血糖データ',
    subtitle:
      '最近血糖を測った、または健康診断を受けた場合は、以下の数値を入力すると評価の精度が上がります。',
    metrics: [
      { id: 'fasting', label: '空腹時血糖', hint: '8時間以上絶食後（早朝など）に測定' },
      { id: 'postprandial', label: '食後2時間血糖', hint: '食事の最初の一口から2時間後' },
      { id: 'hba1c', label: 'HbA1c（糖化ヘモグロビン）', hint: '過去2〜3か月の平均血糖。検査票をご確認ください' },
    ],
    unitToggle: { mmol: 'mmol/L', mgdl: 'mg/dL' },
  },
  symptomStep: {
    title: '直近の症状',
    subtitle: '過去2〜4週間で、以下の症状がありましたか？（複数選択可）',
    options: [
      { id: 'thirst', label: 'のどが渇きやすい、水分を多く飲む' },
      { id: 'urination', label: '尿が多い、夜間頻尿' },
      { id: 'fatigue', label: '疲れやすい、だるい' },
      { id: 'blurred', label: '視界のかすみ・ゆらぎ' },
      { id: 'wounds', label: '傷の治りが遅い' },
      { id: 'numbness', label: '手足のしびれ・ピリピリ感' },
      { id: 'weightLoss', label: '原因不明の体重減少' },
    ],
    noneLabel: 'いずれも当てはまらない',
  },
  classification: {
    normal: '正常範囲',
    prediabetes: '糖尿病前期の範囲',
    diabetes: '糖尿病の参考範囲',
    notProvided: '未入力',
  },
  normalRangeTemplate: '正常 < {value} {unit}',
  resultLevels: {
    low: {
      label: '低リスク',
      title: '現時点で糖尿病前期のリスクは低めです',
      description:
        'ご回答の内容から、明確なリスク信号は見つかりませんでした。今の健康的な生活習慣を続けましょう。',
      advice: [
        '定期的な運動とバランスのよい食事を継続し、精製糖質や甘い飲料を控える',
        '年1回は空腹時血糖またはHbA1cを再チェック（特に40歳以降）',
        '健康的な体重とウエストを維持する',
      ],
    },
    watch: {
      label: '要注意',
      title: '糖尿病前期の可能性があります',
      description:
        '糖尿病前期に関連するサインがいくつか見られます。過度に心配する必要はありませんが、生活習慣の改善と早めの再検査がおすすめです。',
      advice: [
        '精製糖質や甘い飲料を減らし、野菜・全粒穀物・たんぱく質を増やす',
        '週150分以上の中強度運動（早歩き・水泳・サイクリングなど）',
        '過体重の場合は体重の5%〜7%減を目標に',
        '3〜6か月後に空腹時血糖を再検査。可能ならHbA1cも',
        '軽糖アプリで血糖と食事を記録し、トレンドを観察',
      ],
    },
    high: {
      label: '高リスク',
      title: '糖尿病前期の可能性が高めです',
      description:
        'リスク要因と症状を総合すると、糖尿病前期のリスクが高い状態です。早めに医療機関での検査（空腹時血糖・OGTT・HbA1c）を受けることをおすすめします。',
      advice: [
        '早めに空腹時血糖・経口ブドウ糖負荷試験（OGTT）・HbA1cのいずれかを検査',
        'すぐに生活習慣介入を開始：食事改善＋定期的な運動＋体重の5%〜7%減',
        '甘い飲料や夜食を控え、主食に全粒穀物を取り入れる',
        '血糖指標を3〜6か月ごとに再チェック',
        '糖尿病前期と診断されたら医師の指示に従い、場合によっては薬物治療も検討',
      ],
    },
    medical: {
      label: '血糖高め',
      title: '入力された血糖値が糖尿病の参考範囲に達しています',
      description:
        '入力された血糖値は糖尿病の参考範囲です（1回の測定では確定できません）。放置せず、早めに医療機関で再検査を受けてください。',
      advice: [
        'なるべく早く内分泌・代謝内科を受診し、空腹時血糖／OGTT／HbA1cを再検査',
        '受診時に直近の血糖記録をすべて持参',
        '診断前は高糖質の食事を避けつつ、極端な食事制限はしない',
        '強いのどの渇き・頻尿・急な体重減少がある場合はすぐに受診',
      ],
    },
  },
  riskFactorLabels: {
    age: '40歳以上',
    bmi: '過体重（BMI ≥ 24）',
    waist: 'ウエスト超過（内臓脂肪型肥満）',
    familyHistory: '糖尿病の家族歴',
    gestationalHistory: '妊娠糖尿病の既往',
    hypertension: '高血圧',
    exercise: '運動不足',
    symptoms: '複数の典型的な症状',
  },
  standards: {
    heading: '糖尿病前期の判定基準',
    description:
      '下表はADA（米国糖尿病学会）とWHOが公表している血糖分類の基準値で、このセルフチェックも同じ基準を使用しています（mmol/L、括弧内はmg/dL）。',
    metric: '指標',
    normal: '正常',
    prediabetes: '糖尿病前期',
    diabetes: '糖尿病の範囲',
    rows: [
      {
        metric: '空腹時血糖（FPG）',
        normal: '< 5.6 (100)',
        prediabetes: '5.6–6.9 (100–125)',
        diabetes: '≥ 7.0 (126)',
      },
      {
        metric: '食後2時間血糖（2h PG）',
        normal: '< 7.8 (140)',
        prediabetes: '7.8–11.0 (140–199)',
        diabetes: '≥ 11.1 (200)',
      },
      {
        metric: 'HbA1c',
        normal: '< 5.7 %',
        prediabetes: '5.7–6.4 %',
        diabetes: '≥ 6.5 %',
      },
    ],
  },
  faq: {
    heading: '糖尿病前期のよくある質問',
    items: [
      {
        q: '糖尿病前期とはどういう状態ですか？糖尿病になりますか？',
        a: '糖尿病前期は、血糖が正常より高いが糖尿病の診断基準には達していない状態です。空腹時血糖障害（5.6〜6.9 mmol/L）、耐糖能異常（食後2時間血糖7.8〜11.0 mmol/L）、HbA1c 5.7%〜6.4%が該当します。介入しない場合、毎年約5%〜10%の人が2型糖尿病へ進行しますが、生活習慣の改善で多くの人は逆転または長期安定が可能です。',
      },
      {
        q: '糖尿病前期は改善（リバース）できますか？',
        a: 'できます。中国の大慶（Da Qing）研究や米国DPP研究などの大規模試験で、食事改善・週150分以上の中強度運動・体重の5%〜7%減によって、糖尿病への進行リスクを約40%〜58%低減でき、血糖が完全に正常化した参加者もいました。早く始めるほど効果は高くなります。',
      },
      {
        q: '症状がないのに糖尿病前期を気にする必要がありますか？',
        a: '必要です。糖尿病前期と初期の2型糖尿病はほとんど無症状で、のどの渇き・頻尿・疲労などの症状が出たときには、血糖が高い状態が何年も続いていたということが珍しくありません。高リスク群（40歳以上・過体重・家族歴・高血圧・妊娠糖尿病の既往）は、症状がなくても定期的な血糖検査が推奨されます。',
      },
      {
        q: 'セルフチェックで高リスクと出たら、次に何をすればいいですか？',
        a: '医療機関（内分泌代謝内科など）で空腹時血糖・経口ブドウ糖負荷試験（OGTT）・HbA1cの検査を受け、診断を確認してください。1回の指尖血糖やこのチェック結果だけでは確定できません。並行して、食事・運動・減重の生活改善をすぐに始めることをおすすめします。',
      },
      {
        q: '血糖はどのくらいの頻度で測ればいいですか？',
        a: '35歳以上の方は年1回の健康診断で空腹時血糖を確認するのが目安です。糖尿病前期の人は3〜6か月ごとに空腹時血糖またはHbA1cを再検査し、糖尿病患者は医師の指示に従います。自宅での測定は時間帯を固定（朝の空腹時など）して記録を続けると、トレンドがつかみやすくなります。',
      },
      {
        q: 'このセルフチェックの結果は正確ですか？病院の検査の代わりになりますか？',
        a: '代わりにはなりません。本ツールはADA/WHOの公開基準値とFINDRISCなどの検証済みリスク評価に基づき、自身のリスク水準を把握して受診の目安にするためのものです。診断は必ず医療機関での静脈血検査（空腹時血糖・OGTT・HbA1c）に基づいて行われます。',
      },
    ],
  },
  disclaimer:
    '本セルフチェックは参考情報であり、医学的な診断や治療の助言ではありません。判定基準はADAおよびWHOが公表した血糖分類の基準値に基づきます。ご不安がある場合は専門医にご相談ください。',
};

const zhHant: PrediabetesContent = {
  intro: {
    heading: '什麼是糖尿病前期？',
    paragraphs: [
      '糖尿病前期（糖前期）指血糖水平高於正常、但尚未達到糖尿病診斷標準的狀態，包括空腹血糖受損、糖耐量異常或 HbA1c 處於 5.7%–6.4%。糖前期通常沒有明顯症狀，很多人是在健檢時才偶然發現。',
      '好消息是：糖前期往往可以逆轉。研究顯示，透過控制飲食、規律運動、適度減重（5%–7%），可以顯著降低發展為第 2 型糖尿病的風險。越早發現，介入效果越好。',
      '這份自我檢測結合您近期的血糖數據（如有）、典型症狀與常見風險因素，幫您初步了解自己的糖前期風險水平。整個過程約 3 分鐘，所有數據僅在您的瀏覽器本地計算。',
    ],
  },
  wizard: {
    startTitle: '3 分鐘評估您的糖前期風險',
    startSubtitle: '回答約 10 個問題，結合近期血糖與症狀表現，了解您離糖尿病有多遠。',
    startButton: '開始檢測',
    stepLabel: '第 {current} 步 / 共 {total} 步',
    prev: '上一步',
    next: '下一步',
    seeResult: '查看評估結果',
    optional: '選填',
    skip: '不清楚血糖數據，跳過這一步',
    redo: '重新檢測',
    privacyNote: '所有數據僅在您的瀏覽器本地計算，不會上傳或保存。',
    yes: '是',
    no: '否',
    stepTitles: ['基本資訊與風險因素', '近期血糖（可選）', '近期症狀'],
    resultTitle: '您的評估結果',
    riskHeading: '主要風險因素',
    metricHeading: '血糖指標分析',
    adviceHeading: '針對建議',
    guideLink: '查看血糖管理指南',
    ctaTitle: '用輕糖持續追蹤血糖',
    ctaSubtitle: '記錄血糖、飲食與運動，AI 洞察幫您更早發現問題。',
    ctaButton: '免費下載輕糖',
  },
  questions: [
    {
      id: 'gender',
      label: '您的性別',
      kind: 'single',
      options: [
        { id: 'male', label: '男' },
        { id: 'female', label: '女' },
      ],
    },
    {
      id: 'age',
      label: '您的年齡層',
      kind: 'single',
      options: [
        { id: 'lt40', label: '40 歲以下' },
        { id: '40to59', label: '40–59 歲' },
        { id: 'ge60', label: '60 歲及以上' },
      ],
    },
    { id: 'height', label: '身高', kind: 'number', unit: 'cm', optional: true },
    { id: 'weight', label: '體重', kind: 'number', unit: 'kg', optional: true },
    {
      id: 'waist',
      label: '腰圍',
      kind: 'number',
      unit: 'cm',
      hint: '繞肚臍水平一圈測量',
      optional: true,
    },
    {
      id: 'familyHistory',
      label: '父母或兄弟姊妹中有人患糖尿病？',
      kind: 'boolean',
    },
    {
      id: 'gestationalHistory',
      label: '曾患妊娠糖尿病或分娩過巨嬰（≥4 kg）？',
      kind: 'boolean',
      showIf: { questionId: 'gender', equals: ['female'] },
    },
    { id: 'hypertension', label: '有高血壓（或正在服用降壓藥）？', kind: 'boolean' },
    {
      id: 'exercise',
      label: '日常運動情況',
      kind: 'single',
      options: [
        { id: 'regular', label: '每週至少 3 次中等強度運動' },
        { id: 'occasional', label: '偶爾運動' },
        { id: 'rarely', label: '幾乎不運動' },
      ],
    },
  ],
  glucoseStep: {
    title: '近期血糖數據',
    subtitle: '如果您近期測過血糖或做過健檢，填寫以下數值可以讓評估更準確。',
    metrics: [
      { id: 'fasting', label: '空腹血糖', hint: '至少 8 小時未進食後測得（如晨起）' },
      { id: 'postprandial', label: '餐後 2 小時血糖', hint: '從吃第一口飯算起 2 小時' },
      { id: 'hba1c', label: '糖化血紅蛋白（HbA1c）', hint: '反映近 2–3 個月平均血糖，見檢驗報告' },
    ],
    unitToggle: { mmol: 'mmol/L', mgdl: 'mg/dL' },
  },
  symptomStep: {
    title: '近期症狀',
    subtitle: '以下症狀在最近 2–4 週內是否出現過？（可多選）',
    options: [
      { id: 'thirst', label: '經常口渴、喝水多' },
      { id: 'urination', label: '頻尿、夜尿增多' },
      { id: 'fatigue', label: '容易疲勞、無力' },
      { id: 'blurred', label: '視力模糊或波動' },
      { id: 'wounds', label: '傷口不易癒合' },
      { id: 'numbness', label: '手腳麻木或刺痛' },
      { id: 'weightLoss', label: '不明原因體重下降' },
    ],
    noneLabel: '以上均無明顯症狀',
  },
  classification: {
    normal: '正常範圍',
    prediabetes: '糖前期範圍',
    diabetes: '糖尿病參考範圍',
    notProvided: '未填寫',
  },
  normalRangeTemplate: '正常 < {value} {unit}',
  resultLevels: {
    low: {
      label: '低風險',
      title: '目前糖前期風險較低',
      description:
        '根據您的回答，目前暫未發現明顯的糖前期風險信號。繼續保持健康的生活方式即可。',
      advice: [
        '保持規律運動與均衡飲食，控制精製碳水與含糖飲料',
        '每年複查一次空腹血糖或 HbA1c，尤其是 40 歲以後',
        '保持健康體重，腰圍不超標',
      ],
    },
    watch: {
      label: '注意級',
      title: '存在糖前期可能，建議留意',
      description:
        '您存在一些糖前期相關風險信號。雖然目前不必過度擔心，但建議盡早改善生活方式並安排複檢。',
      advice: [
        '減少精製碳水與含糖飲料，增加蔬菜、全穀物和蛋白質比例',
        '每週至少 150 分鐘中等強度運動（快走、游泳、騎行等）',
        '如超重，目標減重 5%–7%',
        '3–6 個月後複檢空腹血糖；有條件時測一次 HbA1c',
        '可以用輕糖 App 記錄血糖與飲食，觀察趨勢變化',
      ],
    },
    high: {
      label: '高風險',
      title: '糖前期可能性較大',
      description:
        '綜合風險因素與症狀表現，您目前處於糖前期較高風險水平。建議盡快安排醫院檢查（空腹血糖、OGTT 或 HbA1c）以明確情況。',
      advice: [
        '盡快到醫院做空腹血糖、口服葡萄糖耐量試驗（OGTT）或 HbA1c 檢查',
        '立即開始生活方式介入：飲食調整 + 規律運動 + 減重 5%–7%',
        '戒含糖飲料與宵夜，主食粗細搭配',
        '每 3–6 個月複查一次血糖指標',
        '如已確診糖前期，遵醫囑定期追蹤，部分情況醫師可能建議藥物介入',
      ],
    },
    medical: {
      label: '血糖偏高',
      title: '血糖值已達糖尿病參考範圍',
      description:
        '您填寫的血糖值達到了糖尿病診斷參考範圍（注意：單次測量不能確診）。請盡快到醫院複查確認，不建議拖延。',
      advice: [
        '盡快到新陳代謝科／內分泌科就診，複查空腹血糖 / OGTT / HbA1c',
        '就診時攜帶近期全部血糖記錄，便於醫師判斷',
        '在確診前避免高糖飲食，但不要極端節食',
        '如出現明顯口渴、多尿、體重快速下降，請立即就醫',
      ],
    },
  },
  riskFactorLabels: {
    age: '年齡 ≥ 40 歲',
    bmi: '體重超標（BMI ≥ 24）',
    waist: '腰圍超標（中心型肥胖）',
    familyHistory: '糖尿病家族史',
    gestationalHistory: '妊娠糖尿病史',
    hypertension: '高血壓',
    exercise: '運動不足',
    symptoms: '存在多項典型症狀',
  },
  standards: {
    heading: '糖前期判斷標準',
    description:
      '下表為 ADA（美國糖尿病學會）與 WHO 公布的血糖分類界限值，也是本檢測工具使用的判斷依據（單位：mmol/L，括號內為 mg/dL）。',
    metric: '指標',
    normal: '正常',
    prediabetes: '糖前期',
    diabetes: '糖尿病範圍',
    rows: [
      {
        metric: '空腹血糖（FPG）',
        normal: '< 5.6 (100)',
        prediabetes: '5.6–6.9 (100–125)',
        diabetes: '≥ 7.0 (126)',
      },
      {
        metric: '餐後 2 小時血糖（2h PG）',
        normal: '< 7.8 (140)',
        prediabetes: '7.8–11.0 (140–199)',
        diabetes: '≥ 11.1 (200)',
      },
      {
        metric: '糖化血紅蛋白（HbA1c）',
        normal: '< 5.7 %',
        prediabetes: '5.7–6.4 %',
        diabetes: '≥ 6.5 %',
      },
    ],
  },
  faq: {
    heading: '糖前期常見問題',
    items: [
      {
        q: '糖尿病前期是什麼意思？會發展成糖尿病嗎？',
        a: '糖尿病前期指血糖高於正常但未達糖尿病診斷標準的狀態，包括空腹血糖受損（5.6–6.9 mmol/L）、糖耐量異常（餐後 2h 7.8–11.0 mmol/L）或 HbA1c 5.7%–6.4%。如果不加介入，每年約有 5%–10% 的糖前期人群會發展為第 2 型糖尿病；但透過生活方式介入，大部分人是可以逆轉或長期穩定的。',
      },
      {
        q: '糖前期可以逆轉嗎？',
        a: '可以。多項大型研究（如中國大慶研究、美國 DPP 研究）證實：透過飲食控制、每週 150 分鐘以上中等強度運動、減重 5%–7%，可以把發展為糖尿病的風險降低約 40%–58%，部分參與者血糖完全恢復正常。越早發現、越早介入，逆轉的可能性越大。',
      },
      {
        q: '沒有任何症狀，也需要關注糖前期嗎？',
        a: '需要。糖前期和早期第 2 型糖尿病往往沒有明顯症狀，很多人多飲、多尿、疲勞等症狀出現時，血糖已經偏高多年。因此高危險群（40 歲以上、超重、有家族史、高血壓、妊娠糖尿病史）即使沒有症狀，也建議定期檢測血糖。',
      },
      {
        q: '自我檢測顯示高風險，下一步怎麼辦？',
        a: '建議盡快到醫院內分泌／新陳代謝科檢查空腹血糖、口服葡萄糖耐量試驗（OGTT）或糖化血紅蛋白（HbA1c），以明確診斷。單次指尖血糖或本檢測結果都不能作為確診依據。同時可以立即開始生活方式介入：控制飲食、規律運動、減重。',
      },
      {
        q: '多久測一次血糖比較合適？',
        a: '一般 35 歲以上人群建議每年健檢測一次空腹血糖；糖前期人群建議每 3–6 個月複查空腹血糖或 HbA1c；已確診糖尿病者遵醫囑監測。居家自我檢測建議固定時間（如晨起空腹）並做好記錄，便於觀察趨勢。',
      },
      {
        q: '這個檢測工具的結果準確嗎？能代替醫院檢查嗎？',
        a: '不能代替醫院檢查。本工具基於 ADA/WHO 的公開判斷標準和 FINDRISC 等經典風險評估量表設計，用於幫助您了解自身風險水平、判斷是否需要就醫檢查。最終診斷必須以醫院靜脈血檢測（空腹血糖、OGTT、HbA1c）為準。',
      },
    ],
  },
  disclaimer:
    '本自我檢測工具僅供參考，不構成醫療診斷或治療建議。判斷標準參考 ADA 與 WHO 公開發布的血糖分類界限值。如有疑問，請諮詢專業醫師。',
};

export const PREDIABETES_CONTENT: Record<Language, PrediabetesContent> = {
  zh,
  en,
  ja,
  'zh-Hant': zhHant,
};

export function getPrediabetesContent(lang: Language): PrediabetesContent {
  return PREDIABETES_CONTENT[lang];
}

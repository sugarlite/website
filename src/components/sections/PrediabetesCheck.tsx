import { useMemo, useState } from 'react';
import { APP_LINKS } from '@/constants';
import {
  computeBmi,
  computeResult,
  getPrediabetesContent,
  type Answers,
  type GlucoseMetric,
  type GlucoseUnit,
  type ResultLevel,
} from '@/data/prediabetes-check';
import { getLocalizedPath } from '@/i18n/routing';
import type { Language } from '@/types';

interface Props {
  lang: Language;
}

type Screen = 'start' | 'basics' | 'glucose' | 'symptoms' | 'result';

const TOTAL_STEPS = 3;

// mg/dL display thresholds (standard ADA cutoffs, integers)
const MGDL_DISPLAY: Record<GlucoseMetric, { normalBelow: string; prediabetesFrom: string }> = {
  fasting: { normalBelow: '100', prediabetesFrom: '100–125' },
  postprandial: { normalBelow: '140', prediabetesFrom: '140–199' },
  hba1c: { normalBelow: '5.7', prediabetesFrom: '5.7–6.4' },
};

const MMOL_DISPLAY: Record<GlucoseMetric, { normalBelow: string }> = {
  fasting: { normalBelow: '5.6' },
  postprandial: { normalBelow: '7.8' },
  hba1c: { normalBelow: '5.7' },
};

const LEVEL_STYLES: Record<ResultLevel, string> = {
  low: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
  watch: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
  high: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800',
  medical: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800',
};

function emptyAnswers(): Answers {
  return {
    gender: null,
    age: null,
    heightCm: null,
    weightKg: null,
    waistCm: null,
    familyHistory: null,
    gestationalHistory: null,
    hypertension: null,
    exercise: null,
    glucoseProvided: false,
    fasting: null,
    postprandial: null,
    hba1c: null,
    unit: 'mmol',
    symptoms: [],
  };
}

function parseNumber(raw: string): number | null {
  const v = parseFloat(raw);
  return Number.isFinite(v) && v > 0 ? v : null;
}

export default function PrediabetesCheck({ lang }: Props) {
  const c = getPrediabetesContent(lang);
  const [screen, setScreen] = useState<Screen>('start');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);

  const result = useMemo(() => computeResult(answers), [answers]);
  const bmi = useMemo(() => computeBmi(answers.heightCm, answers.weightKg), [answers.heightCm, answers.weightKg]);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  const stepScreen = (index: number): Screen => (['basics', 'glucose', 'symptoms'] as Screen[])[index];

  const stepLabel = (current: number) =>
    c.wizard.stepLabel.replace('{current}', String(current)).replace('{total}', String(TOTAL_STEPS));

  const basicsComplete = answers.gender !== null && answers.age !== null && answers.exercise !== null;

  const unitLabel = (unit: GlucoseUnit) => (unit === 'mmol' ? c.glucoseStep.unitToggle.mmol : c.glucoseStep.unitToggle.mgdl);

  const normalRangeText = (metric: GlucoseMetric) => {
    if (answers.unit === 'mgdl' && metric !== 'hba1c') {
      return c.normalRangeTemplate
        .replace('{value}', MGDL_DISPLAY[metric].normalBelow)
        .replace('{unit}', 'mg/dL');
    }
    const unit = metric === 'hba1c' ? '%' : unitLabel(answers.unit);
    return c.normalRangeTemplate.replace('{value}', MMOL_DISPLAY[metric].normalBelow).replace('{unit}', unit);
  };

  const visibleQuestions = c.questions.filter((q) => {
    if (!q.showIf) return true;
    const dependsOn = answers[q.showIf.questionId as keyof Answers];
    return typeof dependsOn === 'string' && (q.showIf.equals as string[]).includes(dependsOn);
  });

  const toggleSymptom = (id: string) =>
    setAnswers((a) => {
      if (id === 'none') return { ...a, symptoms: ['none'] };
      const withoutNone = a.symptoms.filter((s) => s !== 'none');
      return {
        ...a,
        symptoms: withoutNone.includes(id)
          ? withoutNone.filter((s) => s !== id)
          : [...withoutNone, id],
      };
    });

  const renderBoolean = (
    value: boolean | null,
    onChange: (v: boolean) => void
  ) => (
    <div className="flex gap-2">
      {[
        { label: c.wizard.yes, val: true },
        { label: c.wizard.no, val: false },
      ].map(({ label, val }) => (
        <button
          key={String(val)}
          type="button"
          onClick={() => onChange(val)}
          className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
            value === val
              ? 'border-brand bg-brand/10 text-brand'
              : 'border-slate-200 text-slate-600 hover:border-brand/50 dark:border-slate-700 dark:text-slate-300'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );

  // ------------------------------------------------------------------ start
  if (screen === 'start') {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {c.wizard.startTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {c.wizard.startSubtitle}
        </p>
        <button
          type="button"
          onClick={() => {
            setAnswers(emptyAnswers());
            setStepIndex(0);
            setScreen('basics');
          }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-85"
        >
          {c.wizard.startButton}
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <p className="mt-6 text-xs text-slate-400 dark:text-slate-500">{c.wizard.privacyNote}</p>
      </div>
    );
  }

  // ----------------------------------------------------------------- result
  if (screen === 'result') {
    const level = result.level;
    const resultCopy = c.resultLevels[level];
    return (
      <div className="space-y-6">
        <div className={`rounded-2xl border p-6 sm:p-8 ${LEVEL_STYLES[level]}`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-wide dark:bg-black/20">
              {resultCopy.label}
            </span>
          </div>
          <h2 className="mt-3 text-xl font-bold sm:text-2xl">{resultCopy.title}</h2>
          <p className="mt-2 text-sm leading-relaxed opacity-90">{resultCopy.description}</p>
        </div>

        {result.topRiskFactorIds.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{c.wizard.riskHeading}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.topRiskFactorIds.map((id) => (
                <span
                  key={id}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {c.riskFactorLabels[id]}
                </span>
              ))}
            </div>
          </div>
        )}

        {answers.glucoseProvided && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{c.wizard.metricHeading}</h3>
            <ul className="mt-3 divide-y divide-slate-100 dark:divide-slate-800">
              {c.glucoseStep.metrics.map((m) => {
                const metric = result.metrics.find((r) => r.metric === m.id);
                return (
                  <li key={m.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{m.label}</span>
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                        {metric?.value != null ? `${metric.value} ${m.id === 'hba1c' ? '%' : unitLabel(answers.unit)}` : c.classification.notProvided}
                      </span>
                      {metric?.category != null && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            metric.category === 'normal'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                              : metric.category === 'prediabetes'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                                : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                          }`}
                        >
                          {c.classification[metric.category]}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{c.wizard.adviceHeading}</h3>
          <ul className="mt-3 space-y-2">
            {resultCopy.advice.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <a
            href={getLocalizedPath(lang, 'guide/blood-sugar-management')}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand hover:opacity-80"
          >
            {c.wizard.guideLink}
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6 text-center dark:border-brand/40 dark:bg-brand/10">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">{c.wizard.ctaTitle}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{c.wizard.ctaSubtitle}</p>
          <a
            href={APP_LINKS.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
          >
            {c.wizard.ctaButton}
          </a>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setAnswers(emptyAnswers());
              setStepIndex(0);
              setScreen('basics');
            }}
            className="text-sm text-slate-500 underline-offset-4 hover:text-brand hover:underline dark:text-slate-400"
          >
            {c.wizard.redo}
          </button>
        </div>

        <p className="text-center text-xs leading-relaxed text-slate-400 dark:text-slate-500">{c.disclaimer}</p>
      </div>
    );
  }

  // ------------------------------------------------------------------ steps
  const current = stepIndex + 1;
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === TOTAL_STEPS - 1;

  const goNext = () => {
    if (isLast) {
      setScreen('result');
    } else {
      setStepIndex((i) => Math.min(i + 1, TOTAL_STEPS - 1));
      setScreen(stepScreen(stepIndex + 1));
    }
  };

  const goPrev = () => {
    setStepIndex((i) => Math.max(i - 1, 0));
    setScreen(stepScreen(Math.max(stepIndex - 1, 0)));
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      {/* progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{stepLabel(current)}</span>
          <span className="font-medium text-slate-900 dark:text-white">{c.wizard.stepTitles[stepIndex]}</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-brand transition-all duration-300"
            style={{ width: `${(current / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* step 1: basics */}
      {screen === 'basics' && (
        <div className="space-y-5">
          {visibleQuestions.map((q) => (
            <div key={q.id}>
              <div className="mb-1.5 flex items-baseline gap-2">
                <label className="text-sm font-medium text-slate-900 dark:text-white">{q.label}</label>
                {q.optional && <span className="text-xs text-slate-400">{c.wizard.optional}</span>}
              </div>
              {q.kind === 'single' && (
                <div className="grid gap-2 sm:grid-cols-3">
                  {q.options?.map((opt) => {
                    const value = answers[q.id as keyof Answers];
                    const active = value === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => set(q.id as keyof Answers, opt.id as never)}
                        className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                          active
                            ? 'border-brand bg-brand/10 text-brand'
                            : 'border-slate-200 text-slate-600 hover:border-brand/50 dark:border-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}
              {q.kind === 'number' && (
                <div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="any"
                      placeholder={q.unit}
                      value={
                        (q.id === 'height'
                          ? answers.heightCm
                          : q.id === 'weight'
                            ? answers.weightKg
                            : answers.waistCm) ?? ''
                      }
                      onChange={(e) => {
                        const num = parseNumber(e.target.value);
                        if (q.id === 'height') set('heightCm', num);
                        else if (q.id === 'weight') set('weightKg', num);
                        else set('waistCm', num);
                      }}
                      className="w-32 rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand dark:border-slate-700 dark:text-white"
                    />
                    <span className="text-xs text-slate-400">{q.unit}</span>
                  </div>
                  {q.hint && <p className="mt-1 text-xs text-slate-400">{q.hint}</p>}
                </div>
              )}
              {q.kind === 'boolean' && (
                <div>
                  {renderBoolean(
                    answers[q.id as 'familyHistory' | 'gestationalHistory' | 'hypertension'],
                    (v) => set(q.id as 'familyHistory' | 'gestationalHistory' | 'hypertension', v)
                  )}
                </div>
              )}
            </div>
          ))}
          {bmi != null && (
            <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
              BMI: {bmi.toFixed(1)}
            </p>
          )}
        </div>
      )}

      {/* step 2: glucose */}
      {screen === 'glucose' && (
        <div className="space-y-5">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{c.glucoseStep.title}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{c.glucoseStep.subtitle}</p>
          </div>

          {c.glucoseStep.metrics[0] && (
            <div className="flex gap-2">
              {(['mmol', 'mgdl'] as GlucoseUnit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => set('unit', u)}
                  className={`rounded-lg border px-4 py-1.5 text-xs font-medium transition-colors ${
                    answers.unit === u
                      ? 'border-brand bg-brand/10 text-brand'
                      : 'border-slate-200 text-slate-500 hover:border-brand/50 dark:border-slate-700 dark:text-slate-400'
                  }`}
                >
                  {u === 'mmol' ? c.glucoseStep.unitToggle.mmol : c.glucoseStep.unitToggle.mgdl}
                </button>
              ))}
            </div>
          )}

          {c.glucoseStep.metrics.map((m) => (
            <div key={m.id}>
              <label className="mb-1.5 block text-sm font-medium text-slate-900 dark:text-white">
                {m.label} <span className="text-xs font-normal text-slate-400">({c.wizard.optional})</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={
                    answers[m.id] != null ? String(answers[m.id]) : ''
                  }
                  onChange={(e) => set(m.id, parseNumber(e.target.value))}
                  className="w-32 rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand dark:border-slate-700 dark:text-white"
                />
                <span className="text-xs text-slate-400">{m.id === 'hba1c' ? '%' : unitLabel(answers.unit)}</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {m.hint} · {normalRangeText(m.id)}
              </p>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              setAnswers((a) => ({ ...a, glucoseProvided: false, fasting: null, postprandial: null, hba1c: null }));
              goNext();
            }}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-500 transition-colors hover:border-brand/50 hover:text-brand dark:border-slate-700 dark:text-slate-400"
          >
            {c.wizard.skip}
          </button>
        </div>
      )}

      {/* step 3: symptoms */}
      {screen === 'symptoms' && (
        <div className="space-y-5">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{c.symptomStep.title}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{c.symptomStep.subtitle}</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {c.symptomStep.options.map((opt) => {
              const active = answers.symptoms.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleSymptom(opt.id)}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                    active
                      ? 'border-brand bg-brand/10 text-brand'
                      : 'border-slate-200 text-slate-600 hover:border-brand/50 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                      active ? 'border-brand bg-brand text-white' : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {active && (
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  {opt.label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => toggleSymptom('none')}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                answers.symptoms.includes('none')
                  ? 'border-brand bg-brand/10 text-brand'
                  : 'border-slate-200 text-slate-600 hover:border-brand/50 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                  answers.symptoms.includes('none')
                    ? 'border-brand bg-brand text-white'
                    : 'border-slate-300 dark:border-slate-600'
                }`}
              >
                {answers.symptoms.includes('none') && (
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              {c.symptomStep.noneLabel}
            </button>
          </div>
        </div>
      )}

      {/* nav buttons */}
      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={isFirst}
          className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:text-brand disabled:opacity-0 dark:text-slate-400"
        >
          {c.wizard.prev}
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={screen === 'basics' && !basicsComplete}
          className="rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLast ? c.wizard.seeResult : c.wizard.next}
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">{c.wizard.privacyNote}</p>
    </div>
  );
}

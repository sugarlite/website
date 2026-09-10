import { useMemo, useState } from 'react';
import {
  getConversionContent,
  hba1cToEagMgDl,
  hba1cToEagMmol,
  mgDlToMmol,
  mmolToMgDl,
} from '@/data/blood-sugar-conversion';
import type { Language } from '@/types';

interface Props {
  lang: Language;
}

type Tab = 'glucose' | 'hba1c';
type GlucoseUnit = 'mmol' | 'mgdl';

function parseValue(raw: string): number | null {
  const v = parseFloat(raw);
  return Number.isFinite(v) && v > 0 ? v : null;
}

export default function BloodSugarConversion({ lang }: Props) {
  const c = getConversionContent(lang);
  const [tab, setTab] = useState<Tab>('glucose');
  const [inputUnit, setInputUnit] = useState<GlucoseUnit>('mmol');
  const [glucose, setGlucose] = useState('');
  const [a1c, setA1c] = useState('');

  const glucoseValue = parseValue(glucose);
  const converted = useMemo(() => {
    if (glucoseValue == null) return null;
    return inputUnit === 'mmol' ? mmolToMgDl(glucoseValue) : mgDlToMmol(glucoseValue);
  }, [glucoseValue, inputUnit]);

  // Convention: mg/dL whole numbers, mmol/L one decimal place
  const convertedText =
    converted == null
      ? null
      : inputUnit === 'mmol'
        ? String(Math.round(converted))
        : converted.toFixed(1);

  const a1cValue = parseValue(a1c);
  const eag = useMemo(() => {
    if (a1cValue == null) return null;
    return { mgdl: Math.round(hba1cToEagMgDl(a1cValue)), mmol: hba1cToEagMmol(a1cValue).toFixed(1) };
  }, [a1cValue]);

  const unitButtons: { id: GlucoseUnit; label: string }[] = [
    { id: 'mmol', label: 'mmol/L' },
    { id: 'mgdl', label: 'mg/dL' },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      {/* Tabs */}
      <div className="mb-6 flex rounded-lg border border-slate-200 p-1 dark:border-slate-700">
        {(
          [
            { id: 'glucose' as Tab, label: c.calc.tabGlucose },
            { id: 'hba1c' as Tab, label: c.calc.tabHba1c },
          ]
        ).map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === id
                ? 'bg-brand/10 text-brand'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'glucose' ? (
        <div>
          <label
            htmlFor="bsc-input"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {c.calc.inputLabel}
          </label>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <div className="relative">
                <input
                  id="bsc-input"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.1"
                  value={glucose}
                  onChange={(e) => setGlucose(e.target.value)}
                  placeholder={inputUnit === 'mmol' ? '5.6' : '100'}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 outline-none transition-colors focus:border-brand dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                  {inputUnit === 'mmol' ? 'mmol/L' : 'mg/dL'}
                </span>
              </div>
            </div>
            <div className="text-center text-slate-400 sm:pb-3">=</div>
            <div className="flex-1">
              <div className="flex h-[50px] items-center justify-between rounded-lg border border-brand/40 bg-brand/5 px-4 dark:border-brand/40">
                {convertedText ? (
                  <>
                    <span className="text-lg font-semibold text-brand">{convertedText}</span>
                    <span className="text-sm font-medium text-brand/70">
                      {inputUnit === 'mmol' ? 'mg/dL' : 'mmol/L'}
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-slate-400">{c.calc.invalid}</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              {c.calc.inputUnitLabel}
            </span>
            <div className="flex gap-2">
              {unitButtons.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setInputUnit(id)}
                  className={`rounded-lg border px-5 py-2 text-sm font-medium transition-colors ${
                    inputUnit === id
                      ? 'border-brand bg-brand/10 text-brand'
                      : 'border-slate-200 text-slate-600 hover:border-brand/50 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-slate-400 dark:text-slate-500">
            {c.calc.formulaNote}
          </p>
        </div>
      ) : (
        <div>
          <label
            htmlFor="bsc-a1c"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {c.calc.hba1cLabel}
          </label>
          <div className="relative">
            <input
              id="bsc-a1c"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              value={a1c}
              onChange={(e) => setA1c(e.target.value)}
              placeholder="7.0"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 outline-none transition-colors focus:border-brand dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
              %
            </span>
          </div>

          <div className="mt-4">
            <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              {c.calc.hba1cResultLabel}
            </span>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-brand/40 bg-brand/5 px-4 py-3">
                {eag ? (
                  <>
                    <span className="text-lg font-semibold text-brand">{eag.mgdl}</span>
                    <span className="ml-1.5 text-sm font-medium text-brand/70">mg/dL</span>
                  </>
                ) : (
                  <span className="text-sm text-slate-400">{c.calc.invalid}</span>
                )}
              </div>
              <div className="rounded-lg border border-brand/40 bg-brand/5 px-4 py-3">
                {eag ? (
                  <>
                    <span className="text-lg font-semibold text-brand">{eag.mmol}</span>
                    <span className="ml-1.5 text-sm font-medium text-brand/70">mmol/L</span>
                  </>
                ) : (
                  <span className="text-sm text-slate-400">{c.calc.invalid}</span>
                )}
              </div>
            </div>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-slate-400 dark:text-slate-500">
            {c.calc.hba1cNote}
          </p>
        </div>
      )}
    </div>
  );
}

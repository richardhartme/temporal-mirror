import { FormEvent, useState } from 'react';
import {
  calculateMirror,
  formatDate,
  getDefaultPivotString,
  getTodayString,
  parseInputDate
} from './utils/dateMirror';

type MirrorResult = {
  future: string;
  past: string;
  pivot: string;
};

function App() {
  const [inputValue, setInputValue] = useState(() => getTodayString());
  const [pivotValue, setPivotValue] = useState(() => getDefaultPivotString());
  const [result, setResult] = useState<MirrorResult | null>(null);
  const [offsetDays, setOffsetDays] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setResult(null);
    setOffsetDays(null);

    const parsedDate = parseInputDate(inputValue);
    const pivotDate = parseInputDate(pivotValue);

    if (!parsedDate) {
      setError('Enter a valid date in DD/MM/YYYY format (e.g. 20/02/2025).');
      return;
    }

    if (!pivotDate) {
      setError('Enter a valid pivot date in DD/MM/YYYY format (e.g. 01/01/2025).');
      return;
    }

    const { mirroredDate, offsetDays: diffDays } = calculateMirror(parsedDate, pivotDate);

    if (diffDays < 0) {
      setError('Future date must be on or after the pivot date.');
      return;
    }

    setResult({
      future: formatDate(parsedDate),
      past: formatDate(mirroredDate),
      pivot: formatDate(pivotDate)
    });
    setOffsetDays(diffDays);
  };

  const dayLabel = offsetDays === 1 ? 'day' : 'days';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 text-center">
      <div>
        <h1 className="text-4xl font-semibold text-white sm:text-5xl">Temporal Mirror</h1>
        <p className="mt-3 text-base text-slate-300 sm:text-lg">
          Enter a future date after 01/01 to see the day that mirrors it before the year began.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/40 p-8 text-left shadow-2xl shadow-slate-950/40"
      >
        <div>
          <label className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Future date (DD/MM/YYYY)
          </label>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              inputMode="numeric"
              placeholder="e.g. 20/02/2025"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-center text-lg text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!inputValue.trim() || !pivotValue.trim()}
            >
              Find Mirror
            </button>
          </div>
        </div>

        <div className="mt-6">
          <label className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Pivot date (DD/MM/YYYY)
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="e.g. 01/01/2025"
            value={pivotValue}
            onChange={(event) => setPivotValue(event.target.value)}
            className="mt-4 w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-center text-lg text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40"
          />
        </div>

        {error && (
          <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        {result && (
          <div className="mt-8 space-y-4 text-center">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">Reflection Date</p>
                <p className="mt-3 text-3xl font-semibold text-white">{result.past}</p>
                <p className="mt-2 text-sm text-emerald-200">
                  {offsetDays ?? 0} {dayLabel} before {result.pivot}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Future Date</p>
                <p className="mt-3 text-3xl font-semibold text-white">{result.future}</p>
                <p className="mt-2 text-sm text-slate-400">
                  {offsetDays ?? 0} {dayLabel} after {result.pivot}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Mirrored around {result.pivot}. Future days become equally distant memories before the new year.
            </p>
          </div>
        )}
      </form>

      <a
        href="https://github.com/richardhartme/temporal-mirror"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 underline-offset-4 hover:underline"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4 fill-current"
        >
          <path d="M12 0a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.4-4.04-1.4-.55-1.4-1.34-1.77-1.34-1.77-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.82 1.3 3.51.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.33 11.33 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.23 1.91 1.23 3.23 0 4.63-2.81 5.66-5.49 5.96.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 0" />
        </svg>
        View on GitHub
      </a>
    </div>
  );
}

export default App;

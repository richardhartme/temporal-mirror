import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { calculateMirror, formatDate, getDefaultPivotString, getTodayString, parseInputDate } from './utils/dateMirror';
function App() {
    const [inputValue, setInputValue] = useState(() => getTodayString());
    const [pivotValue, setPivotValue] = useState(() => getDefaultPivotString());
    const [result, setResult] = useState(null);
    const [offsetDays, setOffsetDays] = useState(null);
    const [error, setError] = useState('');
    const handleSubmit = (event) => {
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
    return (_jsxs("div", { className: "flex min-h-screen flex-col items-center justify-center gap-10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 text-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-semibold text-white sm:text-5xl", children: "Temporal Mirror" }), _jsx("p", { className: "mt-3 text-base text-slate-300 sm:text-lg", children: "Enter a future date after 01/01 to see the day that mirrors it before the year began." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/40 p-8 text-left shadow-2xl shadow-slate-950/40", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-semibold uppercase tracking-[0.3em] text-slate-400", children: "Future date (DD/MM/YYYY)" }), _jsxs("div", { className: "mt-4 flex flex-col gap-4 sm:flex-row", children: [_jsx("input", { type: "text", inputMode: "numeric", placeholder: "e.g. 20/02/2025", value: inputValue, onChange: (event) => setInputValue(event.target.value), className: "w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-center text-lg text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40" }), _jsx("button", { type: "submit", className: "inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50", disabled: !inputValue.trim() || !pivotValue.trim(), children: "Find Mirror" })] })] }), _jsxs("div", { className: "mt-6", children: [_jsx("label", { className: "text-sm font-semibold uppercase tracking-[0.3em] text-slate-400", children: "Pivot date (DD/MM/YYYY)" }), _jsx("input", { type: "text", inputMode: "numeric", placeholder: "e.g. 01/01/2025", value: pivotValue, onChange: (event) => setPivotValue(event.target.value), className: "mt-4 w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-center text-lg text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40" })] }), error && (_jsx("p", { className: "mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200", children: error })), result && (_jsxs("div", { className: "mt-8 space-y-4 text-center", children: [_jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [_jsxs("div", { className: "rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-6", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-emerald-300", children: "Reflection Date" }), _jsx("p", { className: "mt-3 text-3xl font-semibold text-white", children: result.past }), _jsxs("p", { className: "mt-2 text-sm text-emerald-200", children: [offsetDays ?? 0, " ", dayLabel, " before ", result.pivot] })] }), _jsxs("div", { className: "rounded-3xl border border-slate-800 bg-slate-900/60 p-6", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-slate-400", children: "Future Date" }), _jsx("p", { className: "mt-3 text-3xl font-semibold text-white", children: result.future }), _jsxs("p", { className: "mt-2 text-sm text-slate-400", children: [offsetDays ?? 0, " ", dayLabel, " after ", result.pivot] })] })] }), _jsxs("p", { className: "text-xs text-slate-400", children: ["Mirrored around ", result.pivot, ". Future days become equally distant memories before the new year."] })] }))] })] }));
}
export default App;

import React, { useEffect, useState } from 'react';
import { Check, Pencil, RotateCcw, Trash2 } from 'lucide-react';
import { displayBodyText } from '../services/displayText';
import { fieldChoices } from '../data/fieldChoices';

interface EditableTextProps {
  label: string;
  value: string;
  onSave: (value: string) => void;
  multiline?: boolean;
  rows?: number;
  onDelete?: () => void;
  className?: string;
  suggestions?: string[];
  targetLetter?: string;
  validate?: (value: string) => string | undefined;
}

/** A compact, explicit edit/save control that keeps the normal document appearance. */
export const EditableText: React.FC<EditableTextProps> = ({
  label, value, onSave, multiline = true, rows = 3, onDelete = () => onSave(''), className = '', suggestions, validate, targetLetter
}) => {
  value = displayBodyText(value);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [customizing, setCustomizing] = useState(false);
  const [appendChoice, setAppendChoice] = useState(false);
  const choices = [...new Set([...(suggestions || []), ...fieldChoices(label, targetLetter)].map(displayBodyText))];
  const hasChoices = choices.length > 0;

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  const save = () => {
    const problem = validate?.(draft.trim());
    if (problem) { setError(problem); return; }
    setError('');
    onSave(draft.trim());
    setEditing(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div data-print-value={value} className={`group relative min-w-0 ${className}`}>
      {editing ? (
        <div className="space-y-2 print:hidden">
          {error && <p role="alert" className="text-xs text-rose-700">{error}</p>}
          {hasChoices && <>{multiline && <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={appendChoice} onChange={e => setAppendChoice(e.target.checked)} />إضافة الاختيار إلى النص الحالي</label>}<select aria-label={`خيارات ${label}`} value={choices.includes(draft) ? draft : ''} onChange={e => { if (e.target.value) { setDraft(current => appendChoice && current ? `${current}\n${e.target.value}` : e.target.value); setCustomizing(false); setError(''); } }} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm"><option value="">اختر من القائمة</option>{choices.map(option => <option key={option} value={option}>{option}</option>)}</select><p className="whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-sm leading-relaxed">{draft || 'لم يُحدد اختيار بعد'}</p><button type="button" onClick={() => setCustomizing(!customizing)} className="text-xs text-sky-800 underline">{customizing ? 'العودة للاختيار' : 'تخصيص النص (اختياري)'}</button></>}
          {(!hasChoices || customizing) && (multiline ? (
            <textarea aria-label={label} value={draft} onChange={event => setDraft(event.target.value)} rows={rows} className="w-full resize-none rounded-lg border border-sky-300 bg-white p-2 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-500" />
          ) : (
            <input aria-label={label} value={draft} onChange={event => setDraft(event.target.value)} className="w-full rounded-lg border border-sky-300 bg-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
          ))}
          <div className="flex items-center gap-2">
            <button type="button" onClick={save} className="inline-flex items-center gap-1 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white"><Check className="h-3.5 w-3.5" />حفظ</button>
            <button type="button" onClick={() => { setDraft(value); setEditing(false); }} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600"><RotateCcw className="h-3.5 w-3.5" />إلغاء</button>
            {onDelete && <button type="button" onClick={() => { if (window.confirm(`حذف ${label}؟`)) { onDelete(); setEditing(false); } }} className="mr-auto inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-50"><Trash2 className="h-3.5 w-3.5" />حذف</button>}
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1 whitespace-pre-wrap leading-relaxed print:text-black">{value || <span className="text-slate-400">—</span>}</div>
          <button type="button" onClick={() => { setDraft(value); setCustomizing(false); setAppendChoice(false); setError(''); setEditing(true); }} aria-label={`تعديل ${label}`} title={`تعديل ${label}`} className="shrink-0 rounded-md p-1 text-slate-400 opacity-60 transition hover:bg-sky-50 hover:text-sky-800 group-hover:opacity-100 print:hidden"><Pencil className="h-3.5 w-3.5" /></button>
          {saved && <span role="status" className="shrink-0 text-[10px] font-bold text-emerald-700 print:hidden">تم اعتماد التعديل</span>}
        </div>
      )}
    </div>
  );
};

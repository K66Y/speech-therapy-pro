import React, { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';

export function SavedSelect({ value, onChange, children, className = '', ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value ?? ''));
  useEffect(() => { if (!editing) setDraft(String(value ?? '')); }, [value, editing]);
  const options = React.Children.toArray(children).flatMap(child => React.isValidElement<{value?: string; children?: React.ReactNode}>(child) ? [child] : []);
  const label = options.find(option => String(option.props.value ?? option.props.children) === String(value))?.props.children ?? String(value ?? '');
  return <div data-print-value={typeof label === 'string' ? label : String(value ?? '')} className="min-w-0">
    {editing ? <div className="space-y-2 print:hidden"><select {...props} value={draft} onChange={e => setDraft(e.target.value)} className={className}>{children}</select><div className="flex gap-2"><button type="button" className="rounded bg-emerald-700 px-3 py-1 text-xs text-white" onClick={() => { onChange?.({target:{value:draft}} as React.ChangeEvent<HTMLSelectElement>); setEditing(false); }}>حفظ</button><button type="button" className="text-xs text-slate-600" onClick={() => setEditing(false)}>إلغاء</button></div></div> : <div className="flex items-center justify-between gap-2"><span>{label}</span><button type="button" aria-label={`تعديل ${props['aria-label'] || 'الاختيار'}`} className="p-1 text-slate-400 print:hidden" onClick={() => setEditing(true)}><Pencil className="h-3.5 w-3.5" /></button></div>}
  </div>;
}

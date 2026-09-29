import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { ArabicLetterKey } from '../types/speechTherapy';
import { ARABIC_LETTERS_LIST } from '../data/arabicLettersData';

export function TargetLettersEditor({value, onSave}: {value: ArabicLetterKey[]; onSave:(letters:ArabicLetterKey[])=>void}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  return <div data-print-value={value.join('، ')}><div className="flex items-center gap-2"><span>{value.join('، ') || 'لم تحدد'}</span><button type="button" aria-label="تعديل الحروف المستهدفة" className="print:hidden" onClick={() => { setDraft(value); setEditing(true); }}><Pencil className="h-4 w-4" /></button></div>
    {editing && <div className="mt-2 space-y-2 print:hidden"><div className="grid grid-cols-7 gap-1">{ARABIC_LETTERS_LIST.map(letter => <button type="button" aria-pressed={draft.includes(letter)} key={letter} onClick={() => setDraft(draft.includes(letter) ? draft.filter(item => item !== letter) : [...draft,letter])} className={`rounded border p-2 ${draft.includes(letter) ? 'bg-sky-800 text-white' : 'bg-white'}`}>{letter}</button>)}</div><div className="flex gap-3"><button type="button" onClick={() => setDraft([...ARABIC_LETTERS_LIST])}>تحديد الجميع</button><button type="button" onClick={() => setDraft([])}>إلغاء التحديد</button><button type="button" className="rounded bg-emerald-700 px-3 py-1 text-white" onClick={() => { onSave(draft); setEditing(false); }}>حفظ</button><button type="button" onClick={() => setEditing(false)}>إلغاء</button></div></div>}
  </div>;
}

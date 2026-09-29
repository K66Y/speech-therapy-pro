import React, { useEffect, useState } from 'react';
import { Check, Pencil, Plus, Trash2, X } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

interface ChoicePickerProps {
  category: string;
  label: string;
  suggestions: string[];
  onSelect: (value: string) => void;
}

/** Saved choices belong to the signed-in teacher; choosing one always requires a save. */
export const ChoicePicker: React.FC<ChoicePickerProps> = ({ category, label, suggestions, onSelect }) => {
  const [uid, setUid] = useState(auth?.currentUser?.uid ?? null);
  const [choices, setChoices] = useState(suggestions);
  const [selected, setSelected] = useState('');
  const [editing, setEditing] = useState(false);
  const [drafts, setDrafts] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const defaultsKey = JSON.stringify(suggestions);

  useEffect(() => auth ? onAuthStateChanged(auth, user => setUid(user?.uid ?? null)) : undefined, []);
  useEffect(() => {
    const defaults = JSON.parse(defaultsKey) as string[];
    setChoices(defaults);
    setSelected('');
    setEditing(false);
    setMessage('');
    setReady(false);
    if (!uid || !db) return;
    return onSnapshot(doc(db, 'userWorkspaces', uid, 'settings', `formChoices-${category}`), snapshot => {
      const stored = snapshot.data()?.choices;
      setChoices(Array.isArray(stored) ? stored.filter((value): value is string => typeof value === 'string') : defaults);
      setReady(true);
    }, () => setMessage('تعذر تحميل خياراتك المحفوظة. حاول مرة أخرى بعد اتصال الشبكة.'));
  }, [uid, category, defaultsKey]);

  const saveChoices = async () => {
    if (!uid || !db || !ready) return;
    const values = [...new Set(drafts.map(value => value.trim()).filter(Boolean))];
    setSaving(true);
    setMessage('');
    try {
      await setDoc(doc(db, 'userWorkspaces', uid, 'settings', `formChoices-${category}`), { choices: values }, { merge: true });
      if (auth?.currentUser?.uid !== uid) return;
      setChoices(values);
      setEditing(false);
      setMessage('تم حفظ الخيارات');
    } catch {
      setMessage('لم يتم حفظ الخيارات. بقيت تعديلاتك هنا؛ أعد المحاولة.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-2 space-y-2 text-xs font-normal print:hidden" data-print-controls>
      <div className="flex flex-wrap items-center gap-2">
        <select aria-label={label} value={selected} onChange={event => { setSelected(event.target.value); setMessage(''); }} className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-2 py-2 text-slate-700">
          <option value="">{label} (اقتراحات)</option>
          {choices.map((choice, index) => <option key={`${index}-${choice}`} value={choice}>{choice}</option>)}
        </select>
        <button type="button" aria-label={`تعديل خيارات ${label}`} title="إضافة وتعديل وحذف الخيارات" disabled={!ready} onClick={() => { setDrafts([...choices]); setEditing(!editing); }} className="rounded-lg p-2 text-slate-600 hover:bg-white disabled:opacity-40"><Pencil className="h-4 w-4" /></button>
        {selected && <button type="button" onClick={() => { onSelect(selected); setSelected(''); setMessage('تم حفظ الاختيار'); }} className="inline-flex items-center gap-1 rounded-lg bg-emerald-700 px-3 py-2 font-bold text-white"><Check className="h-3.5 w-3.5" />حفظ الاختيار</button>}
      </div>
      {editing && <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-3">
        <p className="text-slate-500">خياراتك المحفوظة — اختر ما يناسب الحالة بعد التقييم.</p>
        {drafts.map((draft, index) => <div key={index} className="flex items-start gap-2">
          <textarea aria-label={`نص الخيار ${index + 1}`} rows={2} value={draft} onChange={event => setDrafts(current => current.map((value, i) => i === index ? event.target.value : value))} className="min-w-0 flex-1 resize-none rounded-lg border border-slate-200 p-2 leading-relaxed" />
          <button type="button" aria-label={`حذف الخيار ${index + 1}`} onClick={() => setDrafts(current => current.filter((_, i) => i !== index))} className="p-2 text-rose-700"><Trash2 className="h-4 w-4" /></button>
        </div>)}
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setDrafts(current => [...current, ''])} className="inline-flex items-center gap-1 rounded-lg border px-3 py-2"><Plus className="h-3.5 w-3.5" />إضافة خيار</button>
          <button type="button" disabled={saving} onClick={saveChoices} className="inline-flex items-center gap-1 rounded-lg bg-emerald-700 px-3 py-2 font-bold text-white disabled:opacity-50"><Check className="h-3.5 w-3.5" />{saving ? 'جارٍ الحفظ…' : 'حفظ الخيارات'}</button>
          <button type="button" disabled={saving} onClick={() => setEditing(false)} className="inline-flex items-center gap-1 px-3 py-2 text-slate-600"><X className="h-3.5 w-3.5" />إلغاء</button>
        </div>
      </div>}
      {message && <p role="status" className={message.includes('تعذر') || message.includes('لم يتم') ? 'text-rose-700' : 'text-emerald-700'}>{message}</p>}
    </div>
  );
};

export const homeworkSuggestions = (letter: string) => [
  `التدريب على حرف (${letter}) أمام المرآة وفق الطريقة التي شرحها المعلم.`,
  `مراجعة حرف (${letter}) مع الحركات القصيرة ثم الحركات الطويلة.`,
  `التدريب على حرف (${letter}) في أول الكلمة باستخدام البطاقات المصورة.`,
  `التدريب على حرف (${letter}) في وسط الكلمة وآخرها وفق الأمثلة المحددة.`,
  `تكرار الجملة المستهدفة لحرف (${letter}) ثم استخدامه في حديث قصير.`,
  'الاكتفاء بالمستوى الذي أتقنه الطالب داخل الجلسة، مع تعزيز المحاولات الصحيحة.'
];

export const sessionNotesSuggestions = [
  'استجاب الطالب للتوجيه أمام المرآة وتحسن أداؤه خلال الجلسة.',
  'احتاج الطالب إلى نموذج واضح وتكرار التعليمات قبل الاستجابة.',
  'أصبح الطالب ينتبه للخطأ ويصحح نطقه بعد التلميح.',
  'أصبح الطالب ينتبه للخطأ ويصحح نطقه دون مساعدة.',
  'تحسن الأداء مع التعزيز وفترات الراحة القصيرة.',
  'يحتاج الطالب إلى الاستمرار في المستوى الحالي قبل الانتقال للمستوى التالي.'
];

export const parentGuidanceSuggestions = (letter: string) => [
  `المكرم ولي أمر الطالب، يرجى مراجعة حرف (${letter}) حسب الأمثلة المحددة في هذه الورقة وبالطريقة التي وضحها المعلم.`,
  'اجعل وقت التدريب قصيراً وهادئاً، وقدم نموذجاً واضحاً ثم شجع الطالب على المحاولة.',
  'استخدم المرآة للملاحظة البصرية وفق توجيهات المعلم، مع تعزيز المحاولات الصحيحة.',
  'عند صعوبة الأداء، اكتف بالمستوى المحدد في الورقة ودوّن الملاحظة ليتابعها المعلم.',
  'شجع الطالب على استخدام الحرف المستهدف في حديث يومي قصير دون مقاطعة متكررة.'
];

export const feedbackSuggestions = [
  'أداء ممتاز، استمروا في التعزيز المنزلي.',
  'تحسن ملحوظ في الأداء؛ يرجى الاستمرار على الأمثلة المحددة.',
  'يرجى التركيز على الحرف منفرداً قبل الانتقال إلى المقاطع.',
  'يرجى مراجعة الحرف في الموضع المحدد مع تقديم نموذج واضح.',
  'يرجى تقليل المساعدة تدريجياً وملاحظة قدرة الطالب على التصحيح الذاتي.',
  'ستتم مراجعة الصعوبة المذكورة في الجلسة القادمة وتحديث الواجب وفق الأداء.'
];

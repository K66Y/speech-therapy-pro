import React, { useEffect, useMemo } from 'react';
import type { CommunicationDiagnosis, StudentProfile, StudentWeeklyTherapyPlan, StudentWeeklyTherapySession } from '../types/speechTherapy';
import { COMMUNICATION_THERAPY_GUIDES } from '../data/communicationTherapyGuides';

const DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'] as const;
type Mode = 'schedule' | 'plan';

function defaultPlan(student: StudentProfile): StudentWeeklyTherapyPlan {
  const diagnoses = student.communicationDiagnoses || [];
  const sessions: StudentWeeklyTherapySession[] = DAYS.flatMap(day =>
    ([1, 2, 3] as const).map((sessionNumber, index) => {
      const diagnosis = diagnoses.length ? diagnoses[index % diagnoses.length] : undefined;
      const guide = diagnosis ? COMMUNICATION_THERAPY_GUIDES[diagnosis] : undefined;
      return {
        id: `${student.id}-${day}-${sessionNumber}`,
        day,
        sessionNumber,
        focus: guide ? `${guide.label}: هدف وظيفي يحدده التقييم` : 'تدريب الهدف النطقي المسجل',
        activities: guide?.methods[(index + DAYS.indexOf(day)) % guide.methods.length]
          || 'تدريب الهدف المحدد في خطة الطالب من مستوى مناسب إلى موقف وظيفي، مع توثيق الاستجابة ودرجة المساعدة.',
        breathingPractice: guide?.breathing || 'لا يضاف تدريب تنفس تلقائيًا؛ يُدرج فقط إذا حدّد التقييم حاجة وظيفية للتنسيق بين النفس والكلام.',
        homePractice: guide?.homePractice || 'مراجعة النشاط الذي نجح فيه الطالب في الجلسة، مع التوقف عند التعب وتسجيل ما يحتاج متابعة.',
        status: 'مجدولة'
      };
    })
  );
  return {
    diagnosisKey: diagnoses.slice().sort().join('|') || 'speech',
    weekOf: new Date().toISOString().slice(0, 10),
    longTermGoal: diagnoses.length
      ? diagnoses.map(diagnosis => COMMUNICATION_THERAPY_GUIDES[diagnosis].longTermGoal).join('\n\n')
      : 'تحقيق أهداف الطالب الفردية المسجلة في التشخيص والخطة العلاجية، ومراجعة التقدم بالبيانات.',
    shortTermGoals: diagnoses.length
      ? diagnoses.map(diagnosis => COMMUNICATION_THERAPY_GUIDES[diagnosis].shortTermGoal)
      : ['تنفيذ الهدف التدريبي الحالي وتسجيل الاستجابة ودرجة المساعدة.'],
    sessions
  };
}

function reconcilePlan(student: StudentProfile, existing: StudentWeeklyTherapyPlan): StudentWeeklyTherapyPlan {
  const diagnosisKey = student.communicationDiagnoses?.slice().sort().join('|') || 'speech';
  const previousDiagnoses = existing.diagnosisKey && existing.diagnosisKey !== 'speech'
    ? existing.diagnosisKey.split('|') as CommunicationDiagnosis[]
    : [];
  const previousTemplate = defaultPlan({ ...student, communicationDiagnoses: previousDiagnoses });
  const nextTemplate = defaultPlan(student);
  const sessions = DAYS.flatMap(day => ([1, 2, 3] as const).map(sessionNumber => {
    const current = existing.sessions.find(item => item.day === day && item.sessionNumber === sessionNumber);
    const next = nextTemplate.sessions.find(item => item.day === day && item.sessionNumber === sessionNumber)!;
    if (!current) return next;
    const oldDefault = previousTemplate.sessions.find(item => item.day === day && item.sessionNumber === sessionNumber);
    if (existing.diagnosisKey === diagnosisKey) return current;
    return {
      ...next,
      id: current.id,
      status: current.status,
      focus: oldDefault && current.focus === oldDefault.focus ? next.focus : current.focus,
      activities: oldDefault && current.activities === oldDefault.activities ? next.activities : current.activities,
      breathingPractice: oldDefault && current.breathingPractice === oldDefault.breathingPractice ? next.breathingPractice : current.breathingPractice,
      homePractice: oldDefault && current.homePractice === oldDefault.homePractice ? next.homePractice : current.homePractice
    };
  }));
  return {
    ...existing,
    diagnosisKey,
    longTermGoal: existing.diagnosisKey !== diagnosisKey && existing.longTermGoal === previousTemplate.longTermGoal ? nextTemplate.longTermGoal : existing.longTermGoal,
    shortTermGoals: existing.diagnosisKey !== diagnosisKey
      ? nextTemplate.shortTermGoals.map((nextGoal, index) => {
          const oldGoal = existing.shortTermGoals[index];
          return oldGoal === previousTemplate.shortTermGoals[index] ? nextGoal : (oldGoal || nextGoal);
        })
      : existing.shortTermGoals,
    sessions
  };
}

export const WeeklyTherapyPlanView: React.FC<{
  student: StudentProfile;
  onUpdateStudent: (student: StudentProfile) => void;
  mode: Mode;
}> = ({ student, onUpdateStudent, mode }) => {
  const diagnoses = student.communicationDiagnoses || [];
  const diagnosisKey = diagnoses.slice().sort().join('|') || 'speech';
  const plan = useMemo(() => student.weeklyTherapyPlan || defaultPlan(student), [student.id, student.weeklyTherapyPlan, diagnosisKey]);
  const update = (changes: Partial<StudentWeeklyTherapyPlan>) => onUpdateStudent({ ...student, weeklyTherapyPlan: { ...plan, ...changes } });
  useEffect(() => {
    const existing = student.weeklyTherapyPlan;
    const next = existing ? reconcilePlan(student, existing) : defaultPlan(student);
    if (JSON.stringify(next) !== JSON.stringify(existing || null)) {
      onUpdateStudent({ ...student, weeklyTherapyPlan: next });
    }
  }, [student.id, diagnosisKey, student.weeklyTherapyPlan?.diagnosisKey, student.weeklyTherapyPlan?.sessions.length]);
  const updateSession = (id: string, changes: Partial<StudentWeeklyTherapySession>) => update({ sessions: plan.sessions.map(session => session.id === id ? { ...session, ...changes } : session) });
  const toggleDiagnosis = (diagnosis: CommunicationDiagnosis) => {
    const next = diagnoses.includes(diagnosis) ? diagnoses.filter(item => item !== diagnosis) : [...diagnoses, diagnosis];
    onUpdateStudent({ ...student, communicationDiagnoses: next });
  };

  if (mode === 'schedule') return <section dir="rtl" className="space-y-5">
    <header className="rounded-2xl border border-sky-100 bg-white p-5">
      <h2 className="text-xl font-black text-sky-950">الجدول الأسبوعي للجلسات التدريبية</h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">جدول مستقل للطالب المحدد: خمسة أيام دراسية، ثلاث جلسات في اليوم، بإجمالي 15 جلسة أسبوعياً. اختر حالة كل جلسة وعدّل محورها وأنشطتها وتدريب المنزل.</p>
      <p className="mt-1 font-bold text-sky-900">الطالب: {student.fullName}</p>
      <label className="mt-3 block text-sm font-bold">بداية الأسبوع
        <input type="date" value={plan.weekOf} onChange={event => update({ weekOf: event.target.value })} className="mt-1 block rounded-lg border border-slate-300 p-2" />
      </label>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">{diagnoses.map(item => <span key={item} className="rounded-full bg-emerald-100 px-3 py-1 font-bold text-emerald-900">{COMMUNICATION_THERAPY_GUIDES[item].label}</span>)}</div>
    </header>
    <div className="grid gap-4 xl:grid-cols-2">
      {DAYS.map(day => <article key={day} className="overflow-hidden rounded-2xl border bg-white">
        <h3 className="bg-emerald-900 px-4 py-3 font-black text-white">{day} · 3 جلسات</h3>
        <div className="divide-y">
          {plan.sessions.filter(session => session.day === day).sort((a,b)=>a.sessionNumber-b.sessionNumber).map(session => <div key={session.id} className="space-y-2 p-4">
            <div className="flex items-center justify-between gap-2">
              <strong>الجلسة {session.sessionNumber}</strong>
              <select aria-label={`حالة ${day} الجلسة ${session.sessionNumber}`} value={session.status} onChange={event => updateSession(session.id, { status: event.target.value as StudentWeeklyTherapySession['status'] })} className="rounded-lg border p-2">
                <option>مجدولة</option><option>منفذة</option><option>مؤجلة</option>
              </select>
            </div>
            {([
              ['focus','محور الجلسة'], ['activities','التدريبات والأنشطة'], ['breathingPractice','تنسيق التنفس والكلام (عند الحاجة فقط)'], ['homePractice','التدريب المنزلي']
            ] as const).map(([key,label]) => <label key={key} className="block text-xs font-bold text-slate-700">{label}
              <textarea value={session[key]} onChange={event => updateSession(session.id, { [key]: event.target.value })} rows={key === 'focus' ? 1 : 2} className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-sm font-normal leading-6" />
            </label>)}
          </div>)}
        </div>
      </article>)}
    </div>
  </section>;

  return <section dir="rtl" className="space-y-5">
    <header className="rounded-2xl border border-sky-100 bg-white p-5">
      <h2 className="text-xl font-black text-sky-950">الخطة الأسبوعية لكل طالب</h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">أهداف ومقترحات أسبوعية مرتبطة باختيار التشخيص للطالب، محفوظة في ملفه ويمكن تعديلها. حدّد التشخيص من هذه الصفحة أو من دراسة الحالة.</p>
      <div className="mt-4 flex flex-wrap gap-4 text-sm print:hidden">
        {(['stuttering', 'aphasia'] as CommunicationDiagnosis[]).map(diagnosis => <label key={diagnosis} className="flex items-center gap-2 rounded-xl border bg-slate-50 px-4 py-3 font-bold">
          <input type="checkbox" checked={diagnoses.includes(diagnosis)} onChange={() => toggleDiagnosis(diagnosis)} />
          {COMMUNICATION_THERAPY_GUIDES[diagnosis].label}
        </label>)}
      </div>
      <p className="mt-3 text-sm font-bold text-sky-900">الطالب: {student.fullName}</p>
    </header>
    <div className="grid gap-4 lg:grid-cols-2">
      <label className="rounded-2xl border bg-white p-4 text-sm font-bold">الهدف طويل المدى
        <textarea value={plan.longTermGoal} onChange={event => update({ longTermGoal: event.target.value })} rows={5} className="mt-2 w-full rounded-xl border p-3 font-normal leading-7" />
      </label>
      <div className="rounded-2xl border bg-white p-4">
        <h3 className="font-black">الأهداف قصيرة المدى لهذا الأسبوع</h3>
        {plan.shortTermGoals.map((goal, index) => <label key={index} className="mt-3 block text-sm font-bold">الهدف {index + 1}
          <textarea value={goal} onChange={event => update({ shortTermGoals: plan.shortTermGoals.map((item, i) => i === index ? event.target.value : item) })} rows={4} className="mt-1 w-full rounded-xl border p-3 font-normal leading-6" />
        </label>)}
      </div>
    </div>
    {diagnoses.map(diagnosis => {
      const guide = COMMUNICATION_THERAPY_GUIDES[diagnosis];
      return <article key={diagnosis} className="rounded-2xl border border-sky-100 bg-white p-5">
        <h3 className="font-black text-sky-950">{guide.label} · أساليب مقترحة للخطة</h3>
        <ul className="mt-3 list-disc space-y-2 pr-5 text-sm leading-7 text-slate-700">{guide.methods.map(method => <li key={method}>{method}</li>)}</ul>
        <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm leading-7 text-amber-950"><strong>التنفس:</strong> {guide.breathing}</p>
        <p className="mt-3 text-xs text-slate-500">تُختار الطريقة وفق نتيجة تقييم الطالب وتفضيلاته، ولا تُطبّق كل الطرق في جلسة واحدة.</p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-sky-800 print:hidden">{guide.references.map(reference => <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer" className="underline">{reference.label}</a>)}</div>
      </article>;
    })}
    {(diagnoses.length === 0) && <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">حدد التشخيص التواصلي المطلوب أو استخدم الخطط النطقية المرتبطة بالحروف.</p>}
  </section>;
};

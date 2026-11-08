import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, ChevronDown, Clock3, Pencil, X, Printer } from 'lucide-react';
import type { CommunicationDiagnosis, ShortTermPlan, LongTermPlan, StudentProfile, StudentWeeklyTherapyPlan, StudentWeeklyTherapySession } from '../types/speechTherapy';
import { COMMUNICATION_THERAPY_GUIDES } from '../data/communicationTherapyGuides';
import { SavedField } from './SavedField';
import { SavedSelect } from './SavedSelect';
import { ChoicePicker } from './ChoicePicker';
import { OfficialHeader } from './OfficialHeader';
import { triggerOfficialPrint } from '../services/printService';

const DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'] as const;
type Mode = 'schedule' | 'plan';
const WEEKLY_FOCUS = [
  ['تحديد أولوية الأسبوع وتهيئة الطالب', 'تدريب موجّه على المهارة', 'تطبيق وظيفي وتوثيق الاستجابة'],
  ['استرجاع المهارة السابقة', 'تدريب مع مساندة مناسبة', 'تطبيق المهارة في موقف يومي'],
  ['مراجعة المهارة في نشاط جديد', 'تقليل التلميح تدريجيًا', 'تسجيل الدقة ودرجة المساعدة'],
  ['تعميم المهارة مع شريك تواصل', 'تدريب في موقف قريب من الواقع', 'مراجعة ما ساعد الطالب'],
  ['مراجعة أهداف الأسبوع', 'تطبيق المهارة باستقلال أكبر', 'تلخيص التقدم وتحديد الخطوة التالية']
] as const;
const METHOD_ORDER = [[0, 1, 2], [1, 2, 3], [2, 3, 0], [3, 0, 1], [0, 2, 3]] as const;
const GENERAL_METHODS = [
  'تدريب الحروف المستهدفة المسجلة من المقطع إلى الكلمة ثم الجملة، بحسب مستوى الطالب.',
  'استخدام كلمات وصور وظيفية تحتوي الحرف المستهدف، مع نموذج واضح ثم إتاحة محاولة مستقلة.',
  'تطبيق الهدف في حوار قصير مناسب للعمر، وتسجيل المحاولات ودرجة التلميح.'
];
const GENERAL_HOME = [
  'مراجعة كلمات قليلة من هدف الجلسة أمام ولي الأمر، مع نموذج هادئ ومدح المحاولة الصحيحة.',
  'استخدام كلمة الهدف في جملة أو موقف يومي مناسب، والتوقف عند التعب دون ضغط أو تكرار مرهق.',
  'تدوين ملاحظة قصيرة عن استجابة الطالب والموضع الذي احتاج فيه إلى مساعدة لمناقشتها مع المعلم.'
];
const WEEKLY_PLAN_VERSION = 3;

function weeklyDiagnosisKey(student: StudentProfile): string {
  const letters = student.targetLetters?.length ? `letters:${student.targetLetters.join(',')}` : '';
  const communication = (student.communicationDiagnoses || []).slice().sort().map(item => `communication:${item}`).join('|');
  return [letters, communication].filter(Boolean).join('|') || 'speech';
}

function studentForWeeklyKey(student: StudentProfile, key: string): StudentProfile {
  if (!key || key === 'speech') return { ...student, targetLetters: [], communicationDiagnoses: [] };
  const parts = key.split('|');
  if (parts.some(part => part.startsWith('communication:') || part.startsWith('letters:'))) {
    const lettersPart = parts.find(part => part.startsWith('letters:'))?.slice('letters:'.length);
    const communicationDiagnoses = parts.filter(part => part.startsWith('communication:')).map(part => part.slice('communication:'.length)) as CommunicationDiagnosis[];
    return { ...student, targetLetters: lettersPart ? lettersPart.split(',') as StudentProfile['targetLetters'] : [], communicationDiagnoses };
  }
  return { ...student, targetLetters: [], communicationDiagnoses: parts as CommunicationDiagnosis[] };
}

function defaultPlan(student: StudentProfile): StudentWeeklyTherapyPlan {
  const diagnoses = student.communicationDiagnoses || [];
  const targetLetters = student.targetLetters || [];
  const targetLabel = targetLetters.join('، ');
  const tracks: Array<'letters' | CommunicationDiagnosis> = [
    ...(targetLetters.length ? ['letters' as const] : []),
    ...diagnoses
  ];
  const assignedTrack = (index: number): 'letters' | CommunicationDiagnosis => tracks.length ? tracks[index % tracks.length] : 'letters';
  const sessions: StudentWeeklyTherapySession[] = DAYS.flatMap((day, dayIndex) =>
    ([1, 2, 3] as const).map((sessionNumber, slotIndex) => {
      const index = dayIndex * 3 + slotIndex;
      const track = assignedTrack(index);
      const guide = track === 'letters' ? undefined : COMMUNICATION_THERAPY_GUIDES[track];
      const methodIndex = METHOD_ORDER[dayIndex][slotIndex];
      const activities = guide
        ? guide.methods[methodIndex % guide.methods.length]
        : GENERAL_METHODS[methodIndex % GENERAL_METHODS.length];
      const breathingPractice = guide
        ? guide.breathing
        : 'لا يضاف تدريب تنفس تلقائيًا للحروف؛ يُدرج فقط إذا أظهر التقييم حاجة وظيفية واضحة.';
      const homePractice = guide
        ? guide.homePractice
        : GENERAL_HOME[methodIndex % GENERAL_HOME.length];
      return {
        id: `${student.id}-${day}-${sessionNumber}`,
        day,
        sessionNumber,
        trainingType: track,
        focus: guide
          ? `${guide.label} · ${WEEKLY_FOCUS[dayIndex][slotIndex]}`
          : `${WEEKLY_FOCUS[dayIndex][slotIndex]}${targetLabel ? ` · الحروف المستهدفة: ${targetLabel}` : ''}`,
        activities,
        breathingPractice,
        homePractice,
        status: 'مجدولة'
      };
    })
  );
  const longTermGoals = [
    ...(targetLetters.length ? [`تحقيق أهداف الحروف المستهدفة (${targetLabel}) وفق الخطة العلاجية والقياس الموثق.`] : []),
    ...diagnoses.map(diagnosis => COMMUNICATION_THERAPY_GUIDES[diagnosis].longTermGoal)
  ];
  const shortTermGoals = [
    ...(targetLetters.length ? [`تنفيذ الهدف النطقي الحالي للحروف (${targetLabel}) وتسجيل الدقة ودرجة المساعدة.`] : []),
    ...diagnoses.map(diagnosis => COMMUNICATION_THERAPY_GUIDES[diagnosis].shortTermGoal)
  ];
  return {
    templateVersion: WEEKLY_PLAN_VERSION,
    diagnosisKey: weeklyDiagnosisKey(student),
    weekOf: new Date().toISOString().slice(0, 10),
    longTermGoal: longTermGoals.join('\\n\\n') || 'لم تُسجل أهداف بعد؛ استكمل التشخيص والخطة قصيرة المدى قبل إعداد الخطة الأسبوعية.',
    shortTermGoals: shortTermGoals.length ? shortTermGoals : ['لم تُسجل أهداف قصيرة المدى بعد.'],
    sessions
  };
}

/** Deterministic previous template used only to preserve manually edited plan fields during migration. */
function legacyDefaultPlan(student: StudentProfile): StudentWeeklyTherapyPlan {
  return defaultPlan(student);
}

function reconcilePlan(student: StudentProfile, existing: StudentWeeklyTherapyPlan): StudentWeeklyTherapyPlan {
  const diagnosisKey = weeklyDiagnosisKey(student);
  const previousStudent = studentForWeeklyKey(student, existing.diagnosisKey);
  const previousTemplate = legacyDefaultPlan(previousStudent);
  const nextTemplate = defaultPlan(student);
  const sessions = DAYS.flatMap(day => ([1, 2, 3] as const).map(sessionNumber => {
    const current = (Array.isArray(existing.sessions) ? existing.sessions : []).find(item => item.day === day && item.sessionNumber === sessionNumber);
    const next = nextTemplate.sessions.find(item => item.day === day && item.sessionNumber === sessionNumber)!;
    if (!current) return next;
    const oldDefault = previousTemplate.sessions.find(item => item.day === day && item.sessionNumber === sessionNumber);
    if (!oldDefault) return { ...next, id: current.id, status: current.status };
    return {
      ...next,
      id: current.id,
      status: current.status,
      focus: current.focus === oldDefault.focus ? next.focus : current.focus,
      trainingType: current.trainingType ?? next.trainingType,
      activities: current.activities === oldDefault.activities ? next.activities : current.activities,
      breathingPractice: current.breathingPractice === oldDefault.breathingPractice ? next.breathingPractice : current.breathingPractice,
      homePractice: current.homePractice === oldDefault.homePractice ? next.homePractice : current.homePractice
    };
  }));
  return {
    ...nextTemplate,
    ...existing,
    templateVersion: WEEKLY_PLAN_VERSION,
    diagnosisKey,
    longTermGoal: existing.longTermGoal === previousTemplate.longTermGoal ? nextTemplate.longTermGoal : existing.longTermGoal,
    shortTermGoals: nextTemplate.shortTermGoals.map((nextGoal, index) => {
      const oldGoal = previousTemplate.shortTermGoals[index];
      const currentGoal = existing.shortTermGoals[index];
      return currentGoal === oldGoal || !currentGoal ? nextGoal : currentGoal;
    }),
    sessions
  };
}

const makeChoiceCategory = (diagnosisKey: string, field: string) =>
  `weekly-${(diagnosisKey || 'speech').replace(/[^a-z0-9-]/gi, '-')}-${field}`;

export const WeeklyTherapyPlanView: React.FC<{
  student: StudentProfile;
  onUpdateStudent: (student: StudentProfile) => void;
  mode: Mode;
  shortPlan: ShortTermPlan;
  longPlan: LongTermPlan;
}> = ({ student, onUpdateStudent, mode, shortPlan, longPlan }) => {
  const diagnoses = student.communicationDiagnoses || [];
  const diagnosisKey = weeklyDiagnosisKey(student);
  const plan = useMemo(() => student.weeklyTherapyPlan || defaultPlan(student), [student.id, student.weeklyTherapyPlan, diagnosisKey]);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingWeek, setEditingWeek] = useState(false);
  const [weekDraft, setWeekDraft] = useState(plan.weekOf);

  useEffect(() => {
    const existing = student.weeklyTherapyPlan;
    const next = existing
      ? (existing.templateVersion === WEEKLY_PLAN_VERSION && existing.diagnosisKey === diagnosisKey && existing.sessions?.length === 15
        ? existing
        : reconcilePlan(student, existing))
      : defaultPlan(student);
    if (JSON.stringify(next) !== JSON.stringify(existing || null)) {
      onUpdateStudent({ ...student, weeklyTherapyPlan: next });
    }
  }, [student.id, diagnosisKey, student.weeklyTherapyPlan?.templateVersion, student.weeklyTherapyPlan?.diagnosisKey, student.weeklyTherapyPlan?.sessions.length]);

  useEffect(() => {
    if (!editingWeek) setWeekDraft(plan.weekOf);
  }, [plan.weekOf, editingWeek]);

  const update = (changes: Partial<StudentWeeklyTherapyPlan>) =>
    onUpdateStudent({ ...student, weeklyTherapyPlan: { ...plan, ...changes } });
  const updateSession = (id: string, changes: Partial<StudentWeeklyTherapySession>) =>
    update({ sessions: plan.sessions.map(session => session.id === id ? { ...session, ...changes } : session) });
  const toggleDiagnosis = (diagnosis: CommunicationDiagnosis) => {
    const next = diagnoses.includes(diagnosis) ? diagnoses.filter(item => item !== diagnosis) : [...diagnoses, diagnosis];
    onUpdateStudent({ ...student, communicationDiagnoses: next });
  };
  const optionMethods = (type: StudentWeeklyTherapySession['trainingType']) => type && type !== 'letters' ? COMMUNICATION_THERAPY_GUIDES[type].methods : GENERAL_METHODS;
  const breathingOptions = (type: StudentWeeklyTherapySession['trainingType']) => type && type !== 'letters'
    ? [COMMUNICATION_THERAPY_GUIDES[type].breathing]
    : ['لا يضاف تدريب تنفس تلقائيًا للحروف؛ يُدرج فقط إذا حدّد التقييم حاجة وظيفية واضحة.'];
  const homeOptions = (type: StudentWeeklyTherapySession['trainingType']) => type && type !== 'letters'
    ? [COMMUNICATION_THERAPY_GUIDES[type].homePractice]
    : GENERAL_HOME;
  const focusOptions = WEEKLY_FOCUS.flatMap(dayFocus => [...dayFocus]);
  const completedCount = plan.sessions.filter(session => session.status === 'منفذة').length;
  const targetLettersText = (student.targetLetters || []).join('، ');

  const weeklyGoals = [
    ...shortPlan.objectives.filter(goal => student.targetLetters?.includes(goal.targetLetter) && goal.status !== 'achieved'),
    ...(shortPlan.communicationObjectiveSteps || []).filter(goal => diagnoses.includes(goal.diagnosis) && goal.status !== 'achieved')
  ];
  const weeklyTargets = weeklyGoals.map(goal => goal.objectiveText);
  const linkedLong = [...longPlan.goals.filter(goal => student.targetLetters?.includes(goal.targetLetter) && goal.status !== 'achieved').map(goal => goal.goalDescription), ...diagnoses.map(d => longPlan.communicationGoals?.[d] || COMMUNICATION_THERAPY_GUIDES[d].longTermGoal)].join('\n\n');
  if (mode === 'schedule') return <section dir="rtl" className="space-y-5">
    <header className="rounded-2xl border border-sky-100 bg-white p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-black text-sky-950"><CalendarDays className="h-5 w-5" />الجدول الأسبوعي للجلسات التدريبية</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">خمسة أيام، ثلاث جلسات يوميًا. الجدول منظم في تسلسل ثابت، والتعديل محفوظ لكل طالب.</p>
          <p className="mt-1 text-sm font-bold text-sky-900">الطالب: {student.fullName}</p>
          {!!targetLettersText && <p className="mt-1 text-xs text-slate-600">الحروف المستهدفة المرتبطة بالحالة: {targetLettersText}</p>}
        </div>
        <div className="flex gap-2">
          <div className="rounded-xl bg-sky-50 px-3 py-2 text-center"><strong className="block text-lg text-sky-900">{plan.sessions.length}</strong><span className="text-xs text-slate-600">جلسة أسبوعيًا</span></div>
          <div className="rounded-xl bg-emerald-50 px-3 py-2 text-center"><strong className="block text-lg text-emerald-800">{completedCount}</strong><span className="text-xs text-slate-600">جلسة منفذة</span></div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        {diagnoses.map(item => <span key={item} className="rounded-full bg-emerald-100 px-3 py-1 font-bold text-emerald-900">{COMMUNICATION_THERAPY_GUIDES[item].label}</span>)}
        {!diagnoses.length && <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">خطة مرتبطة بأهداف الحروف المحددة</span>}
      </div>
      <div className="mt-3 flex items-center gap-2 text-sm">
        <span className="font-bold text-slate-700">بداية الأسبوع:</span>
        {editingWeek ? <>
          <input type="date" value={weekDraft} onChange={event => setWeekDraft(event.target.value)} className="rounded-lg border border-slate-300 px-2 py-1.5" />
          <button type="button" onClick={() => { update({ weekOf: weekDraft }); setEditingWeek(false); }} className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white">حفظ</button>
          <button type="button" onClick={() => { setWeekDraft(plan.weekOf); setEditingWeek(false); }} className="rounded-lg px-2 py-1.5 text-xs text-slate-600">إلغاء</button>
        </> : <>
          <span className="text-slate-700">{plan.weekOf}</span>
          <button type="button" title="تعديل بداية الأسبوع" aria-label="تعديل بداية الأسبوع" onClick={() => setEditingWeek(true)} className="rounded p-1 text-slate-400 hover:bg-slate-100 print:hidden"><Pencil className="h-4 w-4" /></button>
        </>}
      </div>
    </header>

    <div className="grid gap-3 xl:grid-cols-2">
      {DAYS.map((day, dayIndex) => <details key={day} open={dayIndex === 0} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 bg-emerald-900 px-4 py-3 font-black text-white">
          <span>{day} <span className="text-xs font-normal text-emerald-100">· 3 جلسات</span></span>
          <ChevronDown className="h-4 w-4 transition-transform" />
        </summary>
        <div className="divide-y divide-slate-100">
          {plan.sessions.filter(session => session.day === day).sort((a, b) => a.sessionNumber - b.sessionNumber).map(session => <article key={session.id} className="p-3 md:p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2"><span className="rounded-md bg-sky-50 px-2 py-1 text-xs font-black text-sky-900">الجلسة {session.sessionNumber}</span><strong className="text-sm text-slate-800">{session.focus}</strong></div>
                <p className="mt-2 line-clamp-2 whitespace-pre-line text-xs leading-6 text-slate-600">{session.activities}</p>
              </div>
              <div className="flex items-center gap-2">
                <SavedSelect aria-label={`حالة ${day} الجلسة ${session.sessionNumber}`} value={session.status} onChange={event => updateSession(session.id, { status: event.target.value as StudentWeeklyTherapySession['status'] })} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs">
                  <option value="مجدولة">مجدولة</option><option value="منفذة">منفذة</option><option value="مؤجلة">مؤجلة</option>
                </SavedSelect>
                <button type="button" title="تعديل تفاصيل الجلسة" aria-label={`تعديل تفاصيل الجلسة ${session.sessionNumber} ${day}`} onClick={() => setEditingSessionId(editingSessionId === session.id ? null : session.id)} className="rounded-lg border border-slate-200 p-2 text-sky-800 hover:bg-sky-50 print:hidden">{editingSessionId === session.id ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}</button>
              </div>
            </div>
            {editingSessionId === session.id && <div className="mt-3 grid gap-3 rounded-xl border border-sky-100 bg-sky-50/50 p-3 md:grid-cols-2 print:hidden">
              <div className="md:col-span-2"><p className="mb-2 text-xs leading-5 text-slate-600">اختر العنصر المناسب من القائمة. زر القلم بجانب القائمة يتيح إضافة الاقتراحات أو تعديلها وحذف غير المناسب.</p></div>
              <ChoicePicker key={makeChoiceCategory(diagnosisKey, 'focus')} category={makeChoiceCategory(diagnosisKey, 'focus')} label="محور الجلسة" suggestions={focusOptions} onSelect={value => updateSession(session.id, { focus: value })} />
              <ChoicePicker key={makeChoiceCategory(diagnosisKey, 'methods')} category={makeChoiceCategory(diagnosisKey, 'methods')} label="طريقة التدريب" suggestions={optionMethods(session.trainingType)} onSelect={value => updateSession(session.id, { activities: value })} />
              <ChoicePicker key={makeChoiceCategory(diagnosisKey, 'breathing')} category={makeChoiceCategory(diagnosisKey, 'breathing')} label="تنسيق التنفس (وفق التقييم)" suggestions={breathingOptions(session.trainingType)} onSelect={value => updateSession(session.id, { breathingPractice: value })} />
              <ChoicePicker key={makeChoiceCategory(diagnosisKey, 'home')} category={makeChoiceCategory(diagnosisKey, 'home')} label="تدريب المنزل" suggestions={homeOptions(session.trainingType)} onSelect={value => updateSession(session.id, { homePractice: value })} />
            </div>}
          </article>)}
        </div>
      </details>)}
    </div>
    {diagnoses.length > 0 && <aside className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs leading-6 text-amber-950">
      التدريبات المعروضة مقترحات قابلة للتعديل وليست تشخيصًا أو وصفة علاجية. تُراجع من المختص وفق تقييم الطالب. التنفس ليس علاجًا للحبسة، ولا يُفرض شهيق عميق أو حبس للنفس عند التأتأة.
    </aside>}
  </section>;

  return <section dir="rtl" className="weekly-plan-print printable-sheet space-y-5 print:p-0 print:border-none">
    <header className="rounded-2xl border border-sky-100 bg-white p-4 md:p-5 print:hidden">
      <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-black text-sky-950">الخطة الأسبوعية لكل طالب</h2><button type="button" onClick={() => triggerOfficialPrint('.weekly-plan-print')} className="inline-flex items-center gap-2 rounded-xl bg-sky-800 px-4 py-2 text-sm font-bold text-white"><Printer className="h-4 w-4"/>طباعة الخطة الأسبوعية</button></div>
      <p className="mt-2 text-sm leading-7 text-slate-600">خطة مستقلة لكل طالب، ترتبط بتشخيصه والحروف المستهدفة المسجلة. يظهر القلم عند الحقول القابلة للتحرير، ويمكن اختيار نص بديل من الاقتراحات.</p>
      <div className="mt-3 flex flex-wrap gap-3 text-sm print:hidden">
        {(['stuttering', 'aphasia'] as CommunicationDiagnosis[]).map(diagnosis => <label key={diagnosis} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-bold">
          <input type="checkbox" checked={diagnoses.includes(diagnosis)} onChange={() => toggleDiagnosis(diagnosis)} />
          {COMMUNICATION_THERAPY_GUIDES[diagnosis].label}
        </label>)}
      </div>
      <p className="mt-3 text-sm font-bold text-sky-900">الطالب: {student.fullName}</p>
    </header>
    {mode === 'plan' && <OfficialHeader documentTitle="الخطة الأسبوعية للطالب" subTitle="خطة متابعة أسبوعية مرتبطة بمسارات التشخيص والأهداف العلاجية المحددة" studentName={student.fullName} nationalId={student.nationalId} grade={`${student.grade} - ${student.classRoom}`} />}
    <div className="grid gap-4 lg:grid-cols-2">
      <label className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold">الهدف طويل المدى
        <SavedField multiline rows={4} aria-label="الهدف طويل المدى للأسبوع" value={plan.longTermGoal === defaultPlan(student).longTermGoal && linkedLong ? linkedLong : plan.longTermGoal} onChange={event => update({ longTermGoal: event.target.value })} suggestions={[...diagnoses.map(item => COMMUNICATION_THERAPY_GUIDES[item].longTermGoal), `تحقيق أهداف الطالب للحروف المستهدفة (${targetLettersText || 'المحددة في الخطة'}) ومراجعة التقدم بالبيانات.`]} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal leading-7" />
      </label>
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="font-black">الأهداف قصيرة المدى لهذا الأسبوع</h3>
        {(plan.shortTermGoals.every((g,i) => g === defaultPlan(student).shortTermGoals[i]) && weeklyTargets.length ? weeklyTargets : plan.shortTermGoals).map((goal, index) => <label key={index} className="mt-3 block text-sm font-bold">الهدف {index + 1}
          <SavedField multiline rows={3} aria-label={`الهدف الأسبوعي القصير ${index + 1}`} value={goal} onChange={event => update({ shortTermGoals: (plan.shortTermGoals.every((g,i) => g === defaultPlan(student).shortTermGoals[i]) && weeklyTargets.length ? weeklyTargets : plan.shortTermGoals).map((item, i) => i === index ? event.target.value : item) })} suggestions={[...diagnoses.map(item => COMMUNICATION_THERAPY_GUIDES[item].shortTermGoal), 'تدريب الهدف النطقي الحالي في كلمة أو جملة وظيفية، وتسجيل المحاولات الصحيحة ودرجة المساعدة.']} className="mt-1 w-full rounded-xl border border-slate-200 p-3 font-normal leading-6" />
        </label>)}
      </div>
    </div>
    {diagnoses.map(diagnosis => {
      const guide = COMMUNICATION_THERAPY_GUIDES[diagnosis];
      return <article key={diagnosis} className="rounded-2xl border border-sky-100 bg-white p-4 md:p-5">
        <h3 className="font-black text-sky-950">{guide.label} · أساليب مقترحة للخطة</h3>
        <ul className="mt-3 list-disc space-y-2 pr-5 text-sm leading-7 text-slate-700">{guide.methods.map(method => <li key={method}>{method}</li>)}</ul>
        <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm leading-7 text-amber-950"><strong>تنسيق التنفس:</strong> {guide.breathing}</p>
        <p className="mt-3 text-xs text-slate-500">تُختار الطريقة وفق نتيجة تقييم الطالب وتفضيلاته، ولا تُطبق كل الطرق في جلسة واحدة.</p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-sky-800 print:hidden">{guide.references.map(reference => <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer" className="underline">{reference.label}</a>)}</div>
      </article>;
    })}
    {diagnoses.length === 0 && <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">حدد التشخيص التواصلي المطلوب أو استخدم الخطط النطقية المرتبطة بالحروف المستهدفة.</p>}
  </section>;
};

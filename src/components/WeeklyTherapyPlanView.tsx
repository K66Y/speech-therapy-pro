import React, { useMemo } from 'react';
import type { StudentProfile, StudentWeeklyTherapyPlan, StudentWeeklyTherapySession } from '../types/speechTherapy';

const DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'] as const;
type Diagnosis = 'stuttering' | 'aphasia';

function defaultPlan(student: StudentProfile): StudentWeeklyTherapyPlan {
  const diagnoses = student.communicationDiagnoses || [];
  const stuttering = diagnoses.includes('stuttering');
  const aphasia = diagnoses.includes('aphasia');
  const focus = stuttering && aphasia
    ? 'تواصل وظيفي يجمع الطلاقة واللغة وفق هدف الطالب المسجل'
    : stuttering ? 'تواصل مريح وتنظيم الكلام عند الحاجة' : aphasia ? 'فهم اللغة والتعبير والتواصل الوظيفي' : 'تدريب الهدف النطقي المسجل';
  const sessions: StudentWeeklyTherapySession[] = DAYS.flatMap(day =>
    ([1, 2, 3] as const).map((sessionNumber, index) => ({
      id: `${student.id}-${day}-${sessionNumber}`,
      day,
      sessionNumber,
      focus: index === 0 ? focus : index === 1 ? 'تطبيق المهارة في نشاط مناسب لعمر الطالب' : 'مراجعة الأداء والتعميم في موقف تواصلي',
      activities: stuttering
        ? 'حوار قصير يختاره الطالب، مع إتاحة وقت كافٍ للكلام ورصد الراحة والمشاركة دون مقاطعة.'
        : aphasia
          ? 'مهمة لغة وظيفية قصيرة: فهم تعليمات/تسمية/اختيار صورة أو استخدام وسيلة تواصل مناسبة، وفق نتيجة التقييم.'
          : 'تدريب الهدف المحدد في الخطة من مستوى سهل إلى سياق وظيفي، مع تسجيل المحاولات ودرجة المساعدة.',
      breathingPractice: stuttering
        ? 'عند ملاءمة الأخصائي: ملاحظة نفس مريح ثم بدء عبارة قصيرة مع زفير طبيعي؛ بلا شهيق عميق مفروض أو حبس نفس أو ضغط لإزالة التأتأة.'
        : aphasia
          ? 'لا يُستخدم التنفس لعلاج الحبسة. يُسجل فقط تنسيق النفس والصوت إذا ظهر احتياج مقيم من مختص؛ ويكون التدريب اللغوي هو محور الجلسة.'
          : 'يُترك هذا الحقل فارغاً ما لم يحدّد التقييم حاجة وظيفية للتنسيق بين التنفس والكلام.',
      homePractice: stuttering
        ? 'محادثة ممتعة قصيرة يختار موضوعها الطالب؛ يستمع ولي الأمر بهدوء ويمنحه دوره كاملاً دون مطالبته بإعادة الكلمة أو التحكم في تنفسه.'
        : aphasia
          ? 'نشاط منزلي وظيفي قصير: اختيار غرض أو صورة، فهم تعليمات مناسبة، والتعبير بالكلام أو الإشارة أو الكتابة؛ دون اختبار أو استعجال.'
          : 'مراجعة النشاط الذي نجح فيه الطالب في الجلسة، مع التوقف عند التعب وإبلاغ المعلم بما لوحظ.',
      status: 'مجدولة'
    }))
  );
  return {
    weekOf: new Date().toISOString().slice(0, 10),
    longTermGoal: stuttering
      ? 'تعزيز المشاركة والتواصل المريح في مواقف الحياة اليومية، وفق خط أساس فردي ومراجعة دورية للأثر الوظيفي.'
      : aphasia
        ? 'تحسين التواصل الوظيفي والفهم والتعبير باستخدام الوسائل المناسبة للطالب، وفق تقييم لغوي فردي وأهداف يشارك في تحديدها الطالب وأسرته.'
        : 'تحقيق أهداف الطالب الفردية المسجلة في التشخيص والخطة العلاجية، ومراجعة التقدم بالبيانات.',
    shortTermGoals: [
      stuttering ? 'المشاركة في حوار قصير يختاره الطالب، مع توثيق المبادرة والراحة ودرجة المساندة.' : aphasia ? 'تنفيذ مهمة فهم وظيفية مناسبة للتقييم وتسجيل الاستجابة ودرجة التلميح.' : 'تنفيذ الهدف التدريبي الحالي وتسجيل المحاولات الصحيحة والإجمالية.',
      aphasia ? 'استخدام استراتيجية تواصل داعمة (صورة أو إشارة أو كتابة) عند الحاجة مع احترام اختيار الطالب.' : stuttering ? 'تجربة تنسيق طبيعي بين الكلام والزفير فقط إذا أوصى الأخصائي، دون إجبار أو تصحيح مستمر.' : 'تعميم المهارة في كلمة أو جملة وظيفية وفق المستوى المسجل.'
    ],
    sessions
  };
}

export const WeeklyTherapyPlanView: React.FC<{ student: StudentProfile; onUpdateStudent: (student: StudentProfile) => void }> = ({ student, onUpdateStudent }) => {
  const diagnoses = student.communicationDiagnoses || [];
  const plan = useMemo(() => student.weeklyTherapyPlan || defaultPlan(student), [student.id, student.weeklyTherapyPlan, diagnoses.join('|')]);
  const update = (changes: Partial<StudentWeeklyTherapyPlan>) => onUpdateStudent({ ...student, weeklyTherapyPlan: { ...plan, ...changes } });
  const updateSession = (id: string, changes: Partial<StudentWeeklyTherapySession>) => update({ sessions: plan.sessions.map(session => session.id === id ? { ...session, ...changes } : session) });
  const toggleDiagnosis = (diagnosis: Diagnosis) => {
    const next = diagnoses.includes(diagnosis) ? diagnoses.filter(item => item !== diagnosis) : [...diagnoses, diagnosis];
    const updated = { ...student, communicationDiagnoses: next };
    if (!student.weeklyTherapyPlan) updated.weeklyTherapyPlan = defaultPlan(updated);
    onUpdateStudent(updated);
  };

  return <section dir="rtl" className="space-y-5">
    <header className="rounded-2xl bg-white border border-sky-100 p-5">
      <h2 className="text-xl font-black text-sky-950">الخطة العلاجية والجدول الأسبوعي</h2>
      <p className="mt-2 text-sm text-slate-600">خطة مستقلة ومحفوظة لكل طالب، مرتبطة بتشخيصه. الجدول من خمسة أيام دراسية، ثلاث جلسات يومياً (15 جلسة أسبوعياً)، ويمكن تعديل تفاصيل كل جلسة وحالتها.</p>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={diagnoses.includes('stuttering')} onChange={() => toggleDiagnosis('stuttering')} /> التأتأة</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={diagnoses.includes('aphasia')} onChange={() => toggleDiagnosis('aphasia')} /> الحبسة الكلامية</label>
      </div>
      <label className="mt-4 block text-sm font-bold">بداية الأسبوع
        <input type="date" value={plan.weekOf} onChange={event => update({ weekOf: event.target.value })} className="mt-1 block rounded-lg border border-slate-300 p-2" />
      </label>
    </header>

    <div className="grid gap-4 lg:grid-cols-2">
      <label className="rounded-2xl border bg-white p-4 text-sm font-bold">الهدف طويل المدى
        <textarea value={plan.longTermGoal} onChange={event => update({ longTermGoal: event.target.value })} rows={4} className="mt-2 w-full rounded-xl border p-3 font-normal leading-7" />
      </label>
      <div className="rounded-2xl border bg-white p-4">
        <h3 className="font-black">الأهداف قصيرة المدى لهذا الأسبوع</h3>
        {plan.shortTermGoals.map((goal, index) => <label key={index} className="mt-3 block text-sm font-bold">الهدف {index + 1}
          <textarea value={goal} onChange={event => update({ shortTermGoals: plan.shortTermGoals.map((item, i) => i === index ? event.target.value : item) })} rows={2} className="mt-1 w-full rounded-xl border p-3 font-normal leading-6" />
        </label>)}
      </div>
    </div>

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
    {(diagnoses.includes('stuttering') || diagnoses.includes('aphasia')) && <aside className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-7 text-amber-950">
      تُعد هذه البنود مسودات تنظيمية قابلة للتعديل وليست تشخيصاً أو وصفة علاجية. تُراجع الخطة من أخصائي مؤهل وفق تقييم الطالب. تمارين التنفس ليست علاجاً للحبسة؛ وفي التأتأة لا يُطلب من الطالب أخذ أنفاس عميقة أو حبس النفس أو إجباره على الطلاقة. أوقف أي نشاط يسبب انزعاجاً أو دواراً.
    </aside>}
  </section>;
};

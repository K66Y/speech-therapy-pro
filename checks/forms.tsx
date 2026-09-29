import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/index.css';
import { ShortTermPlanView } from '../src/components/ShortTermPlanView';
import { DailySessionView } from '../src/components/DailySessionView';
import { CaseStudyView } from '../src/components/CaseStudyView';
import { HomeworkView } from '../src/components/HomeworkView';
import { DiagnosisView } from '../src/components/DiagnosisView';
import * as samples from '../src/data/sampleData';
import { triggerOfficialPrint } from '../src/services/printService';

function Fixture() {
  const [view, setView] = useState('الخطة');
  const [plan, setPlan] = useState(samples.INITIAL_SHORT_TERM_PLANS['std-001']);
  const [sessions, setSessions] = useState(samples.INITIAL_DAILY_SESSIONS['std-001']);
  const [caseStudy, setCaseStudy] = useState(samples.INITIAL_CASE_STUDIES['std-001']);
  const [homework, setHomework] = useState(samples.INITIAL_HOMEWORK_SHEETS['std-001']);
  const [assessment, setAssessment] = useState(samples.INITIAL_DIAGNOSTIC_ASSESSMENTS['std-001']);
  const student = samples.SAMPLE_STUDENTS[0];
  return <main className="mx-auto max-w-7xl p-6"><nav className="mb-4 flex gap-3 print:hidden">{['الخطة','الجلسات','الفحص','الواجب','التشخيص'].map(item => <button key={item} onClick={() => setView(item)}>{item}</button>)}<strong>اختبار محلي — لا يحفظ بيانات طلاب</strong><button onClick={() => void triggerOfficialPrint('.printable-sheet', true)}>فحص قالب الطباعة</button><button className="fixed left-0 top-0 z-[1000] bg-white" onClick={() => document.querySelector('iframe[data-official-print]')?.remove()}>إغلاق فحص الطباعة</button></nav>
    {view === 'الخطة' && <ShortTermPlanView student={student} plan={plan} onUpdatePlan={setPlan} onExportDocx={() => {}} isExportingDocx={false} />}
    {view === 'الجلسات' && <DailySessionView student={student} sessions={sessions} onAddSession={s => setSessions([s,...sessions])} onUpdateSession={s => setSessions(sessions.map(item => item.id === s.id ? s : item))} onDeleteSession={id => setSessions(sessions.filter(item => item.id !== id))} />}
    {view === 'الفحص' && <CaseStudyView caseStudy={caseStudy} onUpdateCaseStudy={setCaseStudy} />}
    {view === 'الواجب' && <HomeworkView student={student} homeworkList={homework} onUpdateHomework={s => setHomework([s,...homework.filter(item => item.id !== s.id)])} />}
    {view === 'التشخيص' && <DiagnosisView student={student} assessment={assessment} onUpdateAssessment={setAssessment} />}
  </main>;
}
const root = createRoot(document.getElementById('root')!);
root.render(<Fixture />);
if (import.meta.hot) import.meta.hot.dispose(() => root.unmount());

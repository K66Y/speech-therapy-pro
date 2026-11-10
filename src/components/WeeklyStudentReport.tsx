import React,{useState} from 'react';
import { OfficialHeader } from './OfficialHeader';
import { SavedField } from './SavedField';
import { triggerOfficialPrint } from '../services/printService';
import type { StudentProfile,ShortTermPlan,LongTermPlan } from '../types/speechTherapy';

type WeekReport = {goalId:string;text:string;longGoal:string;note:string;completed:boolean};
export type StudentWeeks = Record<string,WeekReport>;
export function WeeklyStudentReport({student,short,long,saveStudent,savePlan}:{student:StudentProfile;short:ShortTermPlan;long:LongTermPlan;saveStudent:(s:StudentProfile)=>void;savePlan:(p:ShortTermPlan)=>void}) {
  const today=new Date();
  today.setDate(today.getDate()-today.getDay());
  const initial=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
  const [week,setWeek]=useState(student.selectedReportWeek || initial);
  const goals=[...short.objectives.filter(g=>student.targetLetters?.includes(g.targetLetter)),...(short.communicationObjectiveSteps||[]).filter(g=>student.communicationDiagnoses?.includes(g.diagnosis))];
  const first=goals.find(g=>g.status!=='achieved');
  const reports=student.weekReports || {};
  const saved=reports[week];
  const archived=!!saved?.completed || Object.keys(reports).some(date=>date>week);
  const held = saved && goals.find(g=>g.id===saved.goalId);
  const goal=held && (archived || held.status!=='achieved') ? held : first;
  const legacy=student.weeklyPlanHistory?.[week] || (student.weeklyTherapyPlan?.weekOf===week ? student.weeklyTherapyPlan : undefined);
  const longText=goal && 'diagnosis' in goal ? long.communicationGoals?.[goal.diagnosis] : long.goals.find(g=>goal && 'targetLetter' in goal && g.targetLetter===goal.targetLetter)?.goalDescription;
  const current:WeekReport = saved && (archived || saved.goalId===goal?.id) ? {...saved,completed:saved.completed || goal?.status==='achieved'} : {goalId:goal?.id||'',text:goal?.objectiveText||'لا يوجد هدف قيد التدريب.',longGoal:longText || legacy?.longTermGoal || '',note:saved?.note || '',completed:false};
  function persist(changes:Partial<WeekReport>={}, selectedReportWeek=week) {saveStudent({...student,selectedReportWeek,weekReports:{...reports,[week]:{...current,...changes}}});}
  return <section className="weekly-plan-print printable-sheet space-y-4 rounded-2xl bg-white p-5" dir="rtl"><div className="flex flex-wrap items-center gap-4 print:hidden"><label>تاريخ الأسبوع <input type="date" value={week} onChange={e=>{if(e.target.value){persist({},e.target.value);setWeek(e.target.value);}}}/></label><button className="rounded-lg bg-sky-800 p-2 text-white" onClick={()=>triggerOfficialPrint('.weekly-plan-print')}>طباعة خطة هذا الأسبوع</button></div>
    <OfficialHeader documentTitle="الخطة الأسبوعية للطالب" studentName={student.fullName} nationalId={student.nationalId} grade={student.grade}/><p>أسبوع <bdi>{week}</bdi></p>
    <h3 className="font-bold">الهدف طويل المدى</h3><p>{current.longGoal}</p>
    <h3 className="font-bold">هدف الأسبوع</h3><SavedField multiline value={current.text} aria-label="هدف الأسبوع" onChange={e=>persist({text:e.target.value})}/>
    <h3 className="font-bold">متابعة المشاركة والتعزيز</h3><SavedField multiline value={current.note} aria-label="ملاحظات الأسبوع" onChange={e=>persist({note:e.target.value})}/>
    {goal && !archived && goal.status!=='achieved' && <button className="rounded-lg bg-emerald-800 p-2 text-white print:hidden" onClick={()=>{persist({completed:true});savePlan({...short,objectives:short.objectives.map(g=>g.id===goal.id?{...g,status:'achieved'}:g),communicationObjectiveSteps:(short.communicationObjectiveSteps||[]).map(g=>g.id===goal.id?{...g,status:'achieved'}:g)});}}>اعتماد إنجاز الهدف</button>}
    {legacy && <details className="print:hidden"><summary>عرض الخطة المحفوظة سابقًا</summary><p>{legacy.longTermGoal}</p>{legacy.shortTermGoals.map((g,i)=><p key={i}>{g}</p>)}</details>}
  </section>;
}


import React from 'react';
import type { StudentProfile } from '../types/speechTherapy';
import { SavedSelect } from './SavedSelect';
import { SavedField } from './SavedField';

const hijri = new Intl.DateTimeFormat('en-GB-u-ca-islamic-umalqura-nu-latn',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'UTC'});
function hijriDate(date:Date) {
  const parts = Object.fromEntries(hijri.formatToParts(date).map(p=>[p.type,p.value]));
  return [parts.year,parts.month,parts.day].join('/');
}
const ranges = [['1448/03/24','1448/07/15'],['1448/08/09','1448/12/28']];
export function semesterWeeks(term:number) {
  const [start,end]=ranges[term];
  const weeks:{start:string;end:string}[]=[];
  for(let day=Date.UTC(2026,7,1);day<Date.UTC(2027,7,1);day+=86400000){
    const date=new Date(day), label=hijriDate(date);
    if(label<start || label>end) continue;
    if(!weeks.length || date.getUTCDay()===0) weeks.push({start:label,end:label});
    else weeks[weeks.length-1].end=label;
  }
  return weeks;
}
const semesters = [semesterWeeks(0),semesterWeeks(1)];
const phases = ['المسح','التقييم والتشخيص','التدريب','التقرير النطقي النهائي'];
const phaseGoals = ['حصر الطلاب ومراجعة الإحالات مع المعلمين والأسرة.','جمع عينات الأداء وتوثيق خط الأساس وتحديد أولويات كل طالب.','تنفيذ الهدف الجاري لكل طالب وتوثيق المشاركة ودرجة المساعدة.','مقارنة الأداء بخط الأساس وإعداد التقرير النهائي وتوصيات المتابعة.'];

export function ProgramCalendar({mode,students,entries,save}:{mode:'schedule'|'semester';students:StudentProfile[];entries:Record<string,string>;save:(key:string,value:string)=>void}) {
  const [term,setTerm]=React.useState(0);
  if(mode==='schedule') return <section dir="rtl" className="rounded-2xl bg-white p-5"><h2 className="mb-4 text-xl font-bold">الجدول الأسبوعي العام</h2>
    {['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس'].map((day,i)=><div key={day} className="mb-4"><h3 className="mb-2 font-bold">{day}</h3><div className="grid gap-2 sm:grid-cols-3">{[1,2,3].map(slot=>{
      const id='slot-'+i+'-'+slot;
      return <article className="rounded-xl border border-sky-200 bg-sky-50 p-3" key={slot}><strong>الجلسة {slot}</strong><SavedSelect aria-label={day+' الجلسة '+slot} value={entries[id]||''} onChange={e=>save(id,e.target.value)} className="mt-2 w-full rounded-lg border bg-white p-2"><option value="">متاحة</option>{students.filter(s=>!s.deletedAt || s.id===entries[id]).map(s=><option key={s.id} value={s.id}>{s.fullName}</option>)}</SavedSelect></article>;
    })}</div></div>)}</section>;
  return <section dir="rtl" className="rounded-2xl bg-white p-5"><h2 className="mb-4 text-xl font-bold">الخطط الأسبوعية العامة</h2><label>الفصل الدراسي <select value={term} onChange={e=>setTerm(Number(e.target.value))}><option value={0}>الأول</option><option value={1}>الثاني</option></select></label>
    <div className="mt-4 grid gap-3 md:grid-cols-2">{semesters[term].map((week,i)=>{
      const id='term-'+term+'-'+week.start;
      const phase=entries[id]||phases[i===0?0:i<3?1:i===semesters[term].length-1?3:2];
      return <article className="rounded-xl border p-3" key={id}><strong>الأسبوع {i+1}</strong> · <bdi>{week.start}</bdi> إلى <bdi>{week.end}</bdi> هـ
        <SavedSelect aria-label="مرحلة الأسبوع" className="my-2 w-full rounded border p-2" value={phase} onChange={e=>save(id,e.target.value)}>{phases.map(p=><option key={p}>{p}</option>)}</SavedSelect>
        <SavedField aria-label="خطة الأسبوع" multiline value={entries[id+'-'+phase]??phaseGoals[phases.indexOf(phase)]} onChange={e=>save(id+'-'+phase,e.target.value)}/></article>;
    })}</div></section>;
}


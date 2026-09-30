import { SavedSelect } from './SavedSelect';
import { SavedField } from './SavedField';
import { EditableText } from './EditableText';
import React, { useEffect, useState } from 'react';
import {
  FileDown,
  Printer,
  Calendar,
  CheckCircle2,
  Wrench,
  Eye,
  Plus
} from 'lucide-react';
import { LongTermPlan, StudentProfile, ArabicLetterKey } from '../types/speechTherapy';
import { OfficialHeader } from './OfficialHeader';
import { SCHOOL_KLICHE } from '../data/sampleData';
import { triggerOfficialPrint } from '../services/printService';
import { ARABIC_LETTERS_LIST } from '../data/arabicLettersData';

interface LongTermPlanViewProps {
  student: StudentProfile;
  plan: LongTermPlan;
  onUpdatePlan: (updated: LongTermPlan) => void;
  onExportDocx: () => void;
  isExportingDocx: boolean;
}

export const LongTermPlanView: React.FC<LongTermPlanViewProps> = ({
  student,
  plan,
  onUpdatePlan,
  onExportDocx,
  isExportingDocx
}) => {
  const [data, setData] = useState<LongTermPlan>(plan);
  const [addedGoalId, setAddedGoalId] = useState('');
  const [newGoalLetter, setNewGoalLetter] = useState<ArabicLetterKey>(student.targetLetters?.[0] || plan.goals[0]?.targetLetter || 'ر');
  useEffect(() => { if (addedGoalId) document.getElementById(addedGoalId)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, [addedGoalId]);
  useEffect(() => setData(plan), [plan]);
  const updateGoal = (goalId: string, changes: Partial<LongTermPlan['goals'][number]>) => {
    const updated = { ...data, goals: data.goals.map(goal => goal.id === goalId ? { ...goal, ...changes } : goal) };
    setData(updated);
    onUpdatePlan(updated);
  };
  const updateTool = (index: number, value: string) => {
    const toolsUsed = [...data.toolsUsed];
    toolsUsed[index] = value;
    const updated = { ...data, toolsUsed };
    setData(updated);
    onUpdatePlan(updated);
  };
  const addGoal = () => {
    const letter = newGoalLetter;
    const first = data.goals[0];
    const newGoal = { ...(first || {}), id: `ltg-${student.id}-${Date.now()}`, code: `هدف عام ${data.goals.length + 1}`, targetLetter: letter, goalDescription: `أن ينطق الطالب صوت حرف (${letter}) في مواضعه المختلفة وفق معيار الإتقان المحدد.`, successCriterion: first?.successCriterion || '', targetPeriod: first?.targetPeriod || 'فصل دراسي', startingBaseline: '', finalExpectedOutcome: '', evaluationMethod: first?.evaluationMethod || '', progressPercentage: 0 };
    newGoal.id = `ltg-${crypto.randomUUID()}`;
    const updated = { ...data, goals: [...data.goals, { ...newGoal, status: 'in_progress' as const }] };
    setData(updated);
    onUpdatePlan(updated);
    setAddedGoalId(newGoal.id);
  };
  const addStrategy = () => {
    const updated = { ...data, generalStrategies: [...data.generalStrategies, ''] };
    setData(updated);
    onUpdatePlan(updated);
  };
  const updateRecommendations = (value: string) => {
    const updated = { ...data, recommendationsForNextStage: value.split('\n') };
    setData(updated);
    onUpdatePlan(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs print:hidden">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            الخطة التدريبية النطقية طويلة المدى (Long-Term Plan)
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onExportDocx}
            disabled={isExportingDocx}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            {isExportingDocx ? 'جاري تجهيز Word...' : 'تصدير الخطة طويلة المدى (Word)'}
          </button>

          <button
            onClick={() => triggerOfficialPrint('.printable-sheet')}
            className="flex items-center gap-1.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
            title="طباعة الخطة طويلة المدى الرسمية"
          >
            <Printer className="w-4 h-4" />
            طباعة الصفحة الحالية
          </button>
        </div>
      </div>

      {/* Main Long Term Plan Printable Sheet */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 printable-sheet print:p-0 print:border-none print:shadow-none min-h-[900px] flex flex-col justify-between">
        <div>
          {/* Official Cliché */}
          <OfficialHeader
            documentTitle="الخطة التدريبية النطقية طويلة المدى"
            subTitle="برنامج التأهيل الصوتي والنطقي الشامل للأهداف العامة ومخرجات نهاية الفصل الدراسي"
            studentName={student.fullName}
            nationalId={student.nationalId}
            grade={`${student.grade} - ${student.classRoom}`}
          />

          {/* Academic Info Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs mb-6">
            <label><span className="text-slate-500 block text-[11px]">العام الدراسي:</span><SavedField aria-label="العام الدراسي" value={data.academicYear} onChange={e => { const updated={...data,academicYear:e.target.value}; setData(updated); onUpdatePlan(updated); }} className="w-full bg-transparent font-bold text-slate-800 print:border-0" /></label>
            <label><span className="text-slate-500 block text-[11px]">الفصل الدراسي:</span><SavedField aria-label="الفصل الدراسي" value={data.semester} onChange={e => { const updated={...data,semester:e.target.value}; setData(updated); onUpdatePlan(updated); }} className="w-full bg-transparent font-bold text-slate-800 print:border-0" /></label>
            <label><span className="text-slate-500 block text-[11px]">مدة الخطة:</span><SavedField aria-label="مدة الخطة" value={data.goals[0]?.targetPeriod || ''} onChange={e => { const updated={...data,goals:data.goals.map(goal=>({...goal,targetPeriod:e.target.value}))}; setData(updated); onUpdatePlan(updated); }} className="w-full bg-transparent font-bold text-slate-800 print:border-0" /></label>
            <div><span className="text-slate-500 block text-[11px]">الحروف المستهدفة:</span><strong className="text-emerald-800">{data.goals.map(goal=>goal.targetLetter).join('، ')}</strong></div>
          </div>

          {/* Goals Table */}
          <div className="mb-6">
            <h3 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
              أولاً: صياغة الأهداف العامة طويلة المدى ومعايير التحقق
            </h3>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 print:hidden"><label className="text-sm">حرف الهدف الجديد <select aria-label="حرف الهدف الجديد" value={newGoalLetter} onChange={e => setNewGoalLetter(e.target.value as ArabicLetterKey)} className="rounded-lg border p-2">{ARABIC_LETTERS_LIST.map(letter => <option key={letter}>{letter}</option>)}</select></label><button type="button" onClick={addGoal} className="text-xs rounded-lg bg-emerald-800 px-3 py-2 font-bold text-white print:hidden">إضافة هدف لحرف مستهدف</button>{addedGoalId && <span role="status" className="text-sm text-emerald-800">تمت إضافة الهدف، ويمكنك اختيار تفاصيله الآن.</span>}</div>
              {data.goals.map((g, index) => (
                <div
                  key={g.id}
                  id={g.id}
                  className="bg-white border-2 border-emerald-900/20 rounded-xl p-5 shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
                    <div className="flex items-center gap-2">
                    <span className="bg-sky-800 text-white font-black text-xs px-2.5 py-1 rounded-md">
                        {g.code}
                      </span>
                    <button type="button" className="text-xs text-rose-700 print:hidden" onClick={() => { if (window.confirm('حذف هذا الهدف؟')) { const updated = { ...data, goals: data.goals.filter(goal => goal.id !== g.id) }; setData(updated); onUpdatePlan(updated); } }}>حذف الهدف</button>
                    <label className="text-xs font-bold text-slate-600">الحرف:
                        <SavedSelect value={g.targetLetter} onChange={e => { const targetLetter = e.target.value as typeof g.targetLetter; const replace = (value: string) => value.split(g.targetLetter).join(targetLetter); updateGoal(g.id, { targetLetter, goalDescription: replace(g.goalDescription), startingBaseline: replace(g.startingBaseline), finalExpectedOutcome: replace(g.finalExpectedOutcome) }); }} className="mr-1 rounded border border-slate-200 bg-white p-1 print:hidden">{ARABIC_LETTERS_LIST.map(letter => <option key={letter}>{letter}</option>)}</SavedSelect>
                        
                      </label>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="hidden print:block">{g.status === 'achieved' ? 'منجز' : 'تحت التدريب'}</span>
                      <button type="button" className={`rounded-lg px-3 py-2 text-xs font-bold ${g.status === 'achieved' ? 'bg-slate-500 text-white' : 'bg-amber-500 text-slate-900'}`} onClick={() => updateGoal(g.id, { status: g.status === 'achieved' ? 'in_progress' : 'achieved' })}>{g.status === 'achieved' ? 'منجز' : 'تحت التدريب'}</button>
                      <span className="text-slate-500">نسبة الإنجاز الحالية:</span>
                      <div className="w-28 bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                        <div
                          className="bg-emerald-600 h-full rounded-full transition-all"
                          style={{ width: `${g.progressPercentage}%` }}
                        ></div>
                      </div>
                      <SavedField suffix="%" aria-label="نسبة الإنجاز" type="number" min="0" max="100" value={g.progressPercentage} onChange={e => updateGoal(g.id, { progressPercentage: Math.min(100, Math.max(0, Number(e.target.value) || 0)) })} className="w-14 rounded border border-slate-200 px-1 text-center font-bold text-emerald-800 print:border-0" />
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-500 block mb-1">
                      نص الهدف التدريبي طويل المدى:
                    </span>
                    <SavedField multiline targetLetter={g.targetLetter} aria-label="نص الهدف التدريبي" value={g.goalDescription} onChange={e => updateGoal(g.id, { goalDescription: e.target.value })} rows={3} className="w-full text-sm font-black text-slate-900 leading-relaxed bg-emerald-50/50 p-3 rounded-lg border border-emerald-200/60 print:hidden" />
                    
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block font-bold text-[11px] mb-0.5">
                        خط الأساس عند البدء:
                      </span>
                      <SavedField multiline targetLetter={g.targetLetter} aria-label="خط الأساس" value={g.startingBaseline} onChange={e => updateGoal(g.id, { startingBaseline: e.target.value })} className="w-full bg-transparent text-slate-800 print:hidden" rows={3} />
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block font-bold text-[11px] mb-0.5">
                        معيار النجاح النهائي:
                      </span>
                      <SavedField multiline aria-label="معيار النجاح" value={g.successCriterion} onChange={e => updateGoal(g.id, { successCriterion: e.target.value })} className="w-full bg-transparent text-slate-800 print:hidden" rows={3} />
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block font-bold text-[11px] mb-0.5">
                        أداة وأسلوب التقييم:
                      </span>
                      <SavedField multiline aria-label="أداة التقييم" value={g.evaluationMethod} onChange={e => updateGoal(g.id, { evaluationMethod: e.target.value })} className="w-full bg-transparent text-slate-800 print:hidden" rows={3} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Tools in the Long Term Plan */}
          <div className="mb-6">
            <h3 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
              ثانياً: الأدوات الإكلينيكية المعتمدة لتنفيذ الخطة
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-700 text-white flex items-center justify-center font-black text-sm shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-sky-950 text-sm flex items-center gap-1.5 mb-1">
                    <Eye className="w-4 h-4 text-sky-700" />
                    مرآة تدريبات النطق (Mirror Therapy)
                  </h4>
                    <SavedField multiline aria-label="إجراء المرآة" value={data.toolsUsed[0] || ''} onChange={e => updateTool(0, e.target.value)} rows={3} className="w-full rounded border border-sky-100 bg-white/60 p-2 text-xs text-slate-700 leading-relaxed print:hidden" />
                    
                    <label className="mt-2 block text-[11px] font-bold text-slate-600 print:hidden">تفاصيل إضافية للإجراء<SavedField multiline aria-label="تفاصيل إضافية" value={data.toolsUsed[2] || ''} onChange={e => updateTool(2, e.target.value)} rows={2} className="mt-1 w-full rounded border border-slate-200 p-2" /></label>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center font-black text-sm shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-amber-950 text-sm flex items-center gap-1.5 mb-1">
                    <Wrench className="w-4 h-4 text-amber-700" />
                    خافض لسان طبي معقم (التوجيه العضلي اللمسي)
                  </h4>
                  <SavedField multiline aria-label="إجراء خافض اللسان" value={data.toolsUsed[1] || ''} onChange={e => updateTool(1, e.target.value)} rows={3} className="w-full rounded border border-amber-100 bg-white/60 p-2 text-xs text-slate-700 leading-relaxed print:hidden" />
                  
                  <label className="mt-2 block text-[11px] font-bold text-slate-600 print:hidden">أداة أخرى<SavedField multiline aria-label="أداة أخرى" value={data.toolsUsed.slice(3).join('\n')} onChange={e => { const rest = e.target.value.split('\n'); const updated = { ...data, toolsUsed: [...data.toolsUsed.slice(0, 3), ...rest] }; setData(updated); onUpdatePlan(updated); }} rows={2} className="mt-1 w-full rounded border border-slate-200 p-2" /></label>
                </div>
              </div>
            </div>
          </div>

          {/* General Strategies */}
          <div className="mb-6">
            <h3 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
              ثالثاً: الاستراتيجيات العامة للتدريب والتعميم
            </h3>

            <div className="mb-3 print:hidden"><label className="block text-xs font-bold text-slate-600 mb-1">الاستراتيجيات (كل سطر استراتيجية)</label><SavedField multiline aria-label="الاستراتيجيات" value={data.generalStrategies.join('\n')} onChange={e => { const updated = { ...data, generalStrategies: e.target.value.split('\n') }; setData(updated); onUpdatePlan(updated); }} rows={4} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs" /><button type="button" onClick={addStrategy} className="mt-2 rounded-lg bg-emerald-800 px-3 py-1.5 text-xs font-bold text-white">إضافة إجراء</button></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {data.generalStrategies.map((strat, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-800 flex items-center gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <EditableText label="الاستراتيجيات" value={strat} onSave={value => { const updated = { ...data, generalStrategies: data.generalStrategies.map((item, index) => index === i ? value : item) }; setData(updated); onUpdatePlan(updated); }} onDelete={() => { const updated = { ...data, generalStrategies: data.generalStrategies.filter((_, index) => index !== i) }; setData(updated); onUpdatePlan(updated); }} className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Official Specialist Signature Row */}
        <div className="pt-8 border-t border-slate-300 flex justify-center text-xs text-center mt-6">
          <div className="space-y-2.5 max-w-sm w-full bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
            <span className="text-slate-600 font-bold block text-xs">أخصائي تدريبات نطق</span>
            <span className="text-base font-black text-emerald-900 block">
              {SCHOOL_KLICHE.specialistName}
            </span>
            <div className="h-0.5 w-40 mx-auto bg-emerald-700/40 my-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

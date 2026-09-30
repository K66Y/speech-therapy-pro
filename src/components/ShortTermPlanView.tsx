import { SavedSelect } from './SavedSelect';
import { SavedField } from './SavedField';
import React, { useEffect, useState } from 'react';
import {
  FileDown,
  Printer,
  Calendar,
  CheckCircle2,
  Clock,
  Wrench,
  Eye,
  Check,
  Award,
  Plus,
  Trash2
} from 'lucide-react';
import { ShortTermPlan, StudentProfile, ArabicLetterKey } from '../types/speechTherapy';
import { OfficialHeader } from './OfficialHeader';
import { SCHOOL_KLICHE } from '../data/sampleData';
import { triggerOfficialPrint } from '../services/printService';
import { ARABIC_LETTERS_LIST } from '../data/arabicLettersData';
import { getLiveHijriDate } from '../services/dateService';
import { EditableText } from './EditableText';

interface ShortTermPlanViewProps {
  student: StudentProfile;
  plan: ShortTermPlan;
  onUpdatePlan: (updated: ShortTermPlan) => void;
  onExportDocx: () => void;
  isExportingDocx: boolean;
}

function displayLevel(level: string): string {
  const legacyLabels: Record<string, string> = {
    'كلمات أول الكلمة': 'الحرف في بداية الكلمة',
    'كلمات وسط الكلمة': 'الحرف في وسط الكلمة',
    'كلمات آخر الكلمة': 'الحرف في نهاية الكلمة',
    'الحرف في أول الكلمة': 'الحرف في بداية الكلمة',
    'الحرف في آخر الكلمة': 'الحرف في نهاية الكلمة',
    'عزل الصوت': 'حرف منفرد',
    'مقاطع صوتية': 'مقاطع الحرف',
    'جمل بسيطة': 'جمل تحتوي الحرف'
  };
  return legacyLabels[level] || level;
}

export const ShortTermPlanView: React.FC<ShortTermPlanViewProps> = ({
  student,
  plan,
  onUpdatePlan,
  onExportDocx,
  isExportingDocx
}) => {
  const [data, setData] = useState<ShortTermPlan>(plan);
  const [addedObjectiveId, setAddedObjectiveId] = useState('');
  useEffect(() => { if (addedObjectiveId) document.getElementById(addedObjectiveId)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, [addedObjectiveId]);
  const [selectedLetter, setSelectedLetter] = useState<ArabicLetterKey>(plan.targetLetters?.[0] || plan.targetLetter);

  useEffect(() => {
    setData(plan);
  }, [plan]);
  useEffect(() => setSelectedLetter(plan.targetLetters?.[0] || plan.targetLetter), [student.id]);

  const updateObjective = (objId: string, changes: Partial<ShortTermPlan['objectives'][number]>) => {
    const updated = { ...data, objectives: data.objectives.map(obj => obj.id === objId ? { ...obj, ...changes } : obj) };
    setData(updated);
    onUpdatePlan(updated);
  };
  const toggleObjectiveStatus = (objId: string) => {
    const objective = data.objectives.find(item => item.id === objId);
    if (!objective) return;
    const nextStatus = objective.status === 'achieved' ? 'in_progress' : objective.status === 'in_progress' ? 'pending' : 'achieved';
    updateObjective(objId, { status: nextStatus });
  };

  const deleteObjective = (objId: string) => {
    if (!window.confirm('حذف هذا الهدف؟')) return;
    const updated = { ...data, objectives: data.objectives.filter(objective => objective.id !== objId) };
    setData(updated);
    onUpdatePlan(updated);
  };

  const addObjective = () => {
    const letter = selectedLetter || (data.targetLetters || [data.targetLetter])[0] || data.targetLetter;
    const id = `sto-${crypto.randomUUID()}`;
    const updated = {
      ...data,
      objectives: [...data.objectives, {
        id,
        stepNumber: Math.max(0, ...data.objectives.filter(objective => objective.targetLetter === letter).map(objective => objective.stepNumber)) + 1,
        objectiveText: `أن ينطق الطالب حرف (${letter}) في المستوى التدريبي المحدد.`,
        targetLetter: letter,
        level: 'حرف منفرد',
        toolsApplied: ['مرآة'] as ('مرآة' | 'خافض لسان' | 'بطاقات بصرية' | 'تعزيز رمزي')[],
        mirrorUsageDetails: '',
        tongueDepressorDetails: '',
        successTargetPercentage: 80,
        currentPercentage: 0,
        startDate: getLiveHijriDate(),
        targetDate: getLiveHijriDate(),
        status: 'pending' as const,
        notes: ''
      }]
    };
    setData(updated);
    onUpdatePlan(updated);
    setSelectedLetter(letter);
    setAddedObjectiveId(id);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs print:hidden">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            الخطة التدريبية النطقية قصيرة المدى
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onExportDocx}
            disabled={isExportingDocx}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            {isExportingDocx ? 'جاري تجهيز Word...' : 'تصدير الخطة قصيرة المدى (Word)'}
          </button>

          <button
            onClick={() => triggerOfficialPrint('.printable-sheet')}
            className="flex items-center gap-1.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
            title="طباعة الخطة قصيرة المدى الرسمية"
          >
            <Printer className="w-4 h-4" />
            طباعة الخطة الحالية
          </button>
        </div>
      </div>

      {/* Main Short Term Plan Printable Sheet (Completely Separate Page) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 printable-sheet print:p-0 print:border-none print:shadow-none">
        <div>
          {/* Official Cliché for the Separate Short Term Plan Page */}
          <OfficialHeader
            documentTitle="الخطة التدريبية النطقية قصيرة المدى"
            subTitle="الأهداف الإجرائية المتدرجة وتطبيقات (المرآة وخافض اللسان) ونسب التحقق"
            studentName={student.fullName}
            nationalId={student.nationalId}
            grade={`${student.grade} - ${student.classRoom}`}
          />

          {/* Plan Info Badge */}
          <div className="bg-teal-50/70 border border-teal-200/80 rounded-xl p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div>
              <label className="font-bold text-teal-950 block text-sm mb-0.5">عنوان الخطة
                <SavedField aria-label="عنوان الخطة" value={data.planTitle} onChange={e => { const updated = { ...data, planTitle: e.target.value }; setData(updated); onUpdatePlan(updated); }} className="mt-1 w-full rounded-md border border-teal-200 bg-white px-2 py-1 print:hidden" />
              </label>
              <p className="text-slate-600">
                مرجع الهدف العام: <strong className="text-slate-800">{data.longTermGoalRef}</strong> | الحروف المستهدفة: [ <strong className="text-emerald-800 text-sm">{(data.targetLetters || [data.targetLetter]).join('، ')}</strong> ]
              </p>
            </div>
            <label className="bg-white px-3 py-1.5 rounded-lg border border-teal-200 text-teal-900 font-bold shrink-0 print:hidden">حرف عرض الخطة:
              <select value={selectedLetter} onChange={e => setSelectedLetter(e.target.value as typeof selectedLetter)} className="mr-2 rounded border border-slate-200 p-1">{Array.from(new Set([...(data.targetLetters || [data.targetLetter]), ...data.objectives.map(obj => obj.targetLetter), ...(student.targetLetters || [])])).map(letter => <option key={letter}>{letter}</option>)}</select>
            </label>
          </div>

          {/* Stepped Objectives Table */}
          <div className="mb-6">
            <h3 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block"></span>
              الأهداف الإجرائية المجزأة والوسائل الإكلينيكية الميدانية
            </h3>

            <div className="flex justify-start mb-3 print:hidden">
              <button type="button" onClick={addObjective} className="inline-flex items-center gap-1.5 rounded-lg bg-teal-800 px-3 py-2 text-xs font-bold text-white"><Plus className="h-4 w-4"/>إضافة هدف ومستوى</button>
              {addedObjectiveId && <span role="status" className="text-sm text-emerald-800 print:hidden">تمت إضافة الهدف، ويمكنك اختيار تفاصيله الآن.</span>}
            </div>
            <div className="space-y-3.5">
              {data.objectives.filter(obj => obj.targetLetter === selectedLetter).map(obj => {
                const isAchieved = obj.status === 'achieved';
                const isInProgress = obj.status === 'in_progress';

                return (
                  <div
                    key={obj.id}
                    id={obj.id}
                    className={`border-2 rounded-xl p-4 transition-all ${
                      isAchieved
                        ? 'border-emerald-200 bg-emerald-50/40'
                        : isInProgress
                        ? 'border-amber-200 bg-amber-50/30'
                        : 'border-slate-200 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5 border-b border-slate-200/60 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-teal-800 text-white flex items-center justify-center font-black text-xs">
                          {obj.stepNumber}
                        </span>
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800">
                            {displayLevel(obj.level)}
                          </span>
                          <button type="button" onClick={() => deleteObjective(obj.id)} title="حذف هذا الهدف" aria-label="حذف هذا الهدف" className="rounded-md p-1.5 text-rose-600 hover:bg-rose-50 print:hidden"><Trash2 className="h-4 w-4" /></button>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex flex-wrap items-center gap-1 text-xs">
                          <span className="text-slate-500 ml-1">الهدف:</span>
                          <SavedField aria-label="نسبة الهدف" type="number" min="0" max="100" value={obj.successTargetPercentage} onChange={e => updateObjective(obj.id, { successTargetPercentage: Math.min(100, Math.max(0, Number(e.target.value) || 0)) })} className="w-14 rounded border border-slate-200 bg-white px-1 py-0.5 text-center font-bold text-slate-700 print:border-0" />%
                          <span className="text-slate-400 mx-1">|</span>
                          <span className="text-slate-500 ml-1">المحقق:</span>
                          <SavedField aria-label="نسبة الإنجاز" type="number" min="0" max="100" value={obj.currentPercentage} onChange={e => updateObjective(obj.id, { currentPercentage: Math.min(100, Math.max(0, Number(e.target.value) || 0)), status: Number(e.target.value) >= obj.successTargetPercentage ? 'achieved' : Number(e.target.value) > 0 ? 'in_progress' : 'pending' })} className="w-14 rounded border border-slate-200 bg-white px-1 py-0.5 text-center font-black text-emerald-800 print:border-0" />%
                        </div>

                      <span className="hidden print:block">{isAchieved ? 'منجز' : isInProgress ? 'تحت التدريب' : 'لم يسجل الإنجاز'}</span>
                      <button
                          onClick={() => toggleObjectiveStatus(obj.id)}
                          className={`text-xs px-2.5 py-1 rounded-md font-bold flex items-center gap-1 transition-all cursor-pointer ${
                            isAchieved
                              ? 'bg-emerald-600 text-white'
                              : isInProgress
                              ? 'bg-amber-500 text-slate-900'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {isAchieved ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              منجز
                            </>
                          ) : (
                            <><Check className="w-3.5 h-3.5" />{isInProgress ? 'تحت التدريب' : 'تسجيل المنجز'}</>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mb-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                      <label className="text-[11px] font-bold text-slate-600">الحرف
                        <SavedSelect value={obj.targetLetter} onChange={e => updateObjective(obj.id, { targetLetter: e.target.value as typeof obj.targetLetter })} className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-sm font-black">
                          {ARABIC_LETTERS_LIST.map(letter => <option key={letter} value={letter}>{letter}</option>)}
                        </SavedSelect>
                      </label>
                      <label className="text-[11px] font-bold text-slate-600">المستوى
                        <SavedSelect value={displayLevel(obj.level)} onChange={e => updateObjective(obj.id, { level: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2">
                          {['حرف منفرد', 'مقاطع الحرف', 'الحرف في بداية الكلمة', 'الحرف في وسط الكلمة', 'الحرف في نهاية الكلمة', 'جمل تحتوي الحرف', 'محادثة تلقائية'].map(level => <option key={level}>{level}</option>)}
                        </SavedSelect>
                      </label>
                      <label className="text-[11px] font-bold text-slate-600">تفاصيل الهدف والإجراءات
                        <EditableText targetLetter={obj.targetLetter} label="تفاصيل الهدف" value={obj.objectiveText} onSave={objectiveText => updateObjective(obj.id, { objectiveText })} rows={3} className="mt-1 rounded-lg border border-slate-200 bg-white p-2 text-slate-800" />
                      </label>
                    </div>

                    {/* Tools Details Grid (Mandatory 1- Mirror & 2- Tongue Depressor) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-sky-50/80 p-2.5 rounded-lg border border-sky-100 flex items-start gap-2">
                        <Eye className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-sky-950 block text-[11px]">
                            1- إجراء المرآة للهدف:
                          </span>
                          <EditableText targetLetter={obj.targetLetter} label="إجراء المرآة" value={obj.mirrorUsageDetails} onSave={mirrorUsageDetails => updateObjective(obj.id, { mirrorUsageDetails })} rows={2} className="text-slate-700" />
                        </div>
                      </div>

                      <div className="bg-amber-50/80 p-2.5 rounded-lg border border-amber-100 flex items-start gap-2">
                        <Wrench className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-950 block text-[11px]">
                            2- إجراء خافض اللسان للهدف:
                          </span>
                          <EditableText label="إجراء خافض اللسان" value={obj.tongueDepressorDetails} onSave={tongueDepressorDetails => updateObjective(obj.id, { tongueDepressorDetails })} rows={2} className="text-slate-700" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 text-[11px] text-slate-600"><span className="mb-1 block font-bold">ملاحظة</span><EditableText label="ملاحظة الهدف" value={obj.notes} onSave={notes => updateObjective(obj.id, { notes })} onDelete={() => updateObjective(obj.id, { notes: '' })} rows={2} /></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Methodology & Home Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs mb-6">
            <div>
              <span className="font-bold text-slate-800 block mb-1">
                المنهجية الإكلينيكية المتبعة:
              </span>
              <EditableText label="المنهجية الإكلينيكية" value={data.clinicalMethodology} onSave={clinicalMethodology => { const updated = { ...data, clinicalMethodology }; setData(updated); onUpdatePlan(updated); }} rows={3} className="rounded-md border border-slate-200 bg-white p-2 text-slate-700" />
            </div>
            <div>
              <span className="font-bold text-slate-800 block mb-1">
                متطلبات الدعم الأسري المنزلي:
              </span>
              <EditableText label="متطلبات الدعم الأسري" value={data.homeSupportRequirements} onSave={homeSupportRequirements => { const updated = { ...data, homeSupportRequirements }; setData(updated); onUpdatePlan(updated); }} rows={3} className="rounded-md border border-slate-200 bg-white p-2 text-slate-700" />
            </div>
          </div>
        </div>

        {/* Official Signatures Row (Specialist and Guardian) */}
        <div className="pt-8 border-t border-slate-300 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-center mt-6">
          <div className="space-y-3 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-bold block">أخصائي تدريبات نطق</span>
            <span className="text-sm font-black text-emerald-900 block">
              {SCHOOL_KLICHE.specialistName}
            </span>
            <div className="h-0.5 w-32 mx-auto bg-slate-300"></div>
            <span className="text-[10px] text-slate-400">التوقيع</span>
          </div>

          <div className="space-y-3 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-bold block">ولي أمر الطالب</span>
            <span className="text-sm font-bold text-slate-800 block">
              {student.guardianName}
            </span>
            <div className="h-0.5 w-32 mx-auto bg-slate-300"></div>
            <span className="text-[10px] text-slate-400">التوقيع والمصادقة</span>
          </div>
        </div>
      </div>
    </div>
  );
};

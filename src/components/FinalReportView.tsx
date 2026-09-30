import { SavedSelect } from './SavedSelect';
import { SavedField } from './SavedField';
import React, { useEffect, useState } from 'react';
import {
  FileDown,
  Printer,
  Award,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Wrench,
  Eye,
  FileCheck
} from 'lucide-react';
import { FinalProgressReport, StudentProfile } from '../types/speechTherapy';
import { OfficialHeader } from './OfficialHeader';
import { SCHOOL_KLICHE } from '../data/sampleData';
import { triggerOfficialPrint } from '../services/printService';
import { ARABIC_LETTERS_LIST } from '../data/arabicLettersData';

interface FinalReportViewProps {
  student: StudentProfile;
  report: FinalProgressReport;
  onUpdateReport: (updated: FinalProgressReport) => void;
}

export const FinalReportView: React.FC<FinalReportViewProps> = ({
  student,
  report,
  onUpdateReport
}) => {
  const [data, setData] = useState<FinalProgressReport>(report);
  const availableLetters = student.targetLetters?.length ? student.targetLetters : ARABIC_LETTERS_LIST;
  const nextAvailableLetter = availableLetters.find(letter => !data.letterProgression.some(row => row.letter === letter));
  useEffect(() => setData(report), [report]);
  const updateReport = (updated: FinalProgressReport) => { setData(updated); onUpdateReport(updated); };
  const updateLetter = (index: number, changes: Partial<FinalProgressReport['letterProgression'][number]>) => updateReport({ ...data, letterProgression: data.letterProgression.map((item, itemIndex) => itemIndex === index ? { ...item, ...changes } : item) });
  const updateRecommendations = (value: string) => updateReport({ ...data, recommendationsForNextStage: value.split('\n') });
  const addLetter = () => { if (nextAvailableLetter) updateReport({ ...data, letterProgression: [...data.letterProgression, { letter: nextAvailableLetter, beforeRate: 0, afterRate: 0, status: 'قيد التدريب' }] }); };
  const [isExporting, setIsExporting] = useState(false);

  const handleExportDocx = async () => {
    setIsExporting(true);
    try {
      const { exportFinalReportDocx } = await import('../services/docxExportService');
      await exportFinalReportDocx(student, data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs print:hidden">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            التقرير النطقي النهائي وشهادة التخرج والإنجاز
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportDocx}
            disabled={isExporting}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            {isExporting ? 'جاري تجهيز Word...' : 'تصدير التقرير النهائي (Word)'}
          </button>

          <button
            onClick={() => triggerOfficialPrint('.printable-sheet')}
            className="flex items-center gap-1.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
            title="طباعة التقرير النهائي الرسمي"
          >
            <Printer className="w-4 h-4" />
            طباعة التقرير الرسمي
          </button>
        </div>
      </div>

      {/* Main Printable Document Canvas */}
      <div className="bg-white rounded-2xl border-2 border-sky-900/20 shadow-sm p-6 sm:p-10 printable-sheet print:p-0 print:border-none print:shadow-none relative">
        {/* Decorative corner seals */}
        <div className="absolute top-4 left-4 text-emerald-800/10 pointer-events-none print:hidden">
          <Award className="w-24 h-24" />
        </div>

        <OfficialHeader
          documentTitle="التقرير النطقي الختامي ومؤشرات الإنجاز والتطور العلاجي"
          subTitle="تقرير الإغلاق والتوصيات والدمج الصفي الكامل بعد استكمال البرنامج التدريبي"
          studentName={student.fullName}
          nationalId={student.nationalId}
          grade={`${student.grade} - ${student.classRoom}`}
        />

        {/* Big Achievement Metrics Highlight Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 text-center shadow-xs">
            <span className="text-xs font-bold text-emerald-800 block mb-1">
              نسبة وضوح النطق النهائية
            </span>
            <SavedField aria-label="وضوح النطق النهائي" type="number" min="0" max="100" value={data.speechIntelligibilityFinal} onChange={e => updateReport({ ...data, speechIntelligibilityFinal: Math.min(100, Math.max(0, Number(e.target.value) || 0)) })} className="w-full bg-transparent text-center text-4xl font-black text-emerald-950 print:border-0" />
            <span className="text-[11px] text-emerald-700 block mt-1 font-bold">
              (حسب نتيجة التقييم المسجلة)
            </span>
          </div>

          <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-5 text-center shadow-xs">
            <span className="text-xs font-bold text-teal-800 block mb-1">
              مدة البرنامج التدريبي
            </span>
            <SavedField aria-label="مدة البرنامج التدريبي" value={data.trainingPeriod} onChange={e => updateReport({ ...data, trainingPeriod: e.target.value })} className="mt-2 block w-full bg-transparent text-center text-lg font-black text-teal-950 print:border-0" />
            <span className="text-[11px] text-teal-700 block mt-1">
              الفترة المسجلة للبرنامج
            </span>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 text-center shadow-xs">
            <span className="text-xs font-bold text-amber-800 block mb-1">
              الحالة الختامية
            </span>
            <SavedSelect aria-label="الحالة الختامية" value={data.letterProgression.length > 0 && data.letterProgression.every(letter => letter.status === 'تم التصحيح والتعميم') ? 'مؤهل للتخرج' : 'مستمر في التدريب'} onChange={e => updateReport({ ...data, letterProgression: data.letterProgression.map(letter => ({ ...letter, status: (e.target.value === 'مؤهل للتخرج' ? 'تم التصحيح والتعميم' : 'قيد التدريب') as typeof letter.status })) })} className="mt-1 w-full bg-transparent text-center text-lg font-black text-amber-950 print:border-0 print:appearance-none"><option>مؤهل للتخرج</option><option>مستمر في التدريب</option></SavedSelect>
            <span className="text-[11px] text-amber-700 block mt-1">
              الحالة حسب التقييم النهائي
            </span>
          </div>
        </div>

        {/* Narrative Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-xs">
          <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-4 space-y-1.5">
            <span className="font-bold text-rose-950 block text-sm">
              الحالة عند بدء البرنامج (خط الأساس):
            </span>
            <SavedField multiline aria-label="حالة البداية" rows={4} value={data.initialStateSummary} onChange={e => updateReport({ ...data, initialStateSummary: e.target.value })} className="w-full bg-transparent text-slate-700 leading-relaxed print:hidden" />
            
          </div>

          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 space-y-1.5">
            <span className="font-bold text-emerald-950 block text-sm">
              الحالة عند الإغلاق والتقييم الختامي:
            </span>
            <SavedField multiline aria-label="الحالة الختامية" rows={4} value={data.finalStateSummary} onChange={e => updateReport({ ...data, finalStateSummary: e.target.value })} className="w-full bg-transparent text-slate-700 leading-relaxed print:hidden" />
            
          </div>
        </div>

        {/* Letter Progression Progress Table */}
        <div className="mb-8">
          <h3 className="font-black text-slate-900 text-base mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-700" />
            جدول قياس تطور الأصوات النطقية المستهدفة (قبل وبعد التدخل):
          </h3>

          <div className="overflow-x-auto">
            <button onClick={addLetter} disabled={!nextAvailableLetter} className="mb-2 rounded bg-emerald-800 px-3 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 print:hidden">إضافة حرف مستهدف</button>
            <table className="w-full text-right border-collapse text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-emerald-900 text-white text-center">
                  <th className="p-3 border border-emerald-800">الصوت المستهدف</th>
                  <th className="p-3 border border-emerald-800">مستوى البداية</th>
                  <th className="p-3 border border-emerald-800">مستوى الإغلاق الحالي</th>
                  <th className="p-3 border border-emerald-800">معدل التحسن الإجمالي</th>
                  <th className="p-3 border border-emerald-800">الحالة الإكلينيكية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-center">
                {data.letterProgression.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 font-medium">
                    <td className="p-3 font-black text-emerald-900 text-lg border border-slate-200 bg-slate-50">
                      <SavedSelect aria-label="حرف مستهدف" value={p.letter} onChange={e => updateLetter(idx, { letter: e.target.value as typeof p.letter })} className="bg-transparent font-black text-emerald-900 print:hidden">{availableLetters.map(letter => <option key={letter}>{letter}</option>)}</SavedSelect>
                    </td>
                    <td className="p-3 text-rose-700 font-bold border border-slate-200">
                      <SavedField suffix="%" aria-label="نسبة البداية" type="number" min="0" max="100" value={p.beforeRate} onChange={e => updateLetter(idx, { beforeRate: Math.min(100, Math.max(0, Number(e.target.value) || 0)) })} className="w-14 bg-transparent text-center font-bold text-rose-700 print:border-0" />
                    </td>
                    <td className="p-3 text-emerald-800 font-black text-base border border-slate-200">
                      <SavedField suffix="%" aria-label="نسبة الإغلاق" type="number" min="0" max="100" value={p.afterRate} onChange={e => updateLetter(idx, { afterRate: Math.min(100, Math.max(0, Number(e.target.value) || 0)) })} className="w-14 bg-transparent text-center font-black text-emerald-800 print:border-0" />
                    </td>
                    <td className="p-3 border border-slate-200">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold">
                        <bdi dir="ltr" className="whitespace-nowrap">{p.afterRate >= p.beforeRate ? '+' : ''}{p.afterRate - p.beforeRate}%</bdi> {p.afterRate >= p.beforeRate ? 'تحسن' : 'انتكاس'}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-emerald-800 border border-slate-200">
                      <SavedSelect aria-label="حالة الحرف" value={p.status} onChange={e => updateLetter(idx, { status: e.target.value as typeof p.status })} className="w-32 bg-transparent text-center font-bold text-emerald-800 print:border-0">{['تحسن كبير', 'تم التصحيح والتعميم', 'يحتاج استمرار متابعة', 'قيد التدريب', 'غير محدد'].map(status => <option key={status}>{status}</option>)}</SavedSelect>
                      <button type="button" className="mt-2 text-xs text-rose-700 print:hidden" onClick={() => { if (window.confirm('حذف هذا الحرف من التقرير؟')) updateReport({ ...data, letterProgression: data.letterProgression.filter((_, i) => i !== idx) }); }}>حذف</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tools Effectiveness Report (1- Mirror, 2- Tongue Depressor) */}
        <div className="mb-8">
          <h3 className="font-black text-slate-900 text-base mb-3 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-700" />
            تقييم فاعلية الأدوات المعتمدة في الجلسات:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 space-y-1">
              <div className="flex items-center gap-2 text-sky-950 font-bold text-sm">
                <Eye className="w-4 h-4 text-sky-700" />
                <span>1- فاعلية استخدام المرآة:</span>
              </div>
              <SavedField multiline aria-label="فاعلية المرآة" value={data.toolsEffectiveness.mirrorEffectiveness} onChange={e => updateReport({ ...data, toolsEffectiveness: { ...data.toolsEffectiveness, mirrorEffectiveness: e.target.value } })} rows={4} className="w-full bg-transparent text-slate-700 leading-relaxed print:hidden" />
              
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-1">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                <Wrench className="w-4 h-4 text-amber-700" />
                <span>2- فاعلية استخدام خافض اللسان:</span>
              </div>
              <SavedField multiline aria-label="فاعلية خافض اللسان" value={data.toolsEffectiveness.tongueDepressorEffectiveness} onChange={e => updateReport({ ...data, toolsEffectiveness: { ...data.toolsEffectiveness, tongueDepressorEffectiveness: e.target.value } })} rows={4} className="w-full bg-transparent text-slate-700 leading-relaxed print:hidden" />
              
            </div>
          </div>
        </div>

        {/* Future Recommendations */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8 text-xs">
          <h4 className="font-bold text-slate-900 text-sm mb-2.5">
            التوصيات للمرحلة القادمة والدمج الصفي الكامل:
          </h4>
          <div className="space-y-1.5">
            <SavedField multiline aria-label="التوصيات" value={data.recommendationsForNextStage.join('\n')} onChange={e => updateRecommendations(e.target.value)} rows={4} className="w-full rounded border border-slate-200 p-2 print:hidden" />
            <div className="hidden print:block">{data.recommendationsForNextStage.map((rec, i) => <p key={i} className="text-slate-700">• {rec}</p>)}</div>
            {data.recommendationsForNextStage.map((rec, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-700 print:hidden">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Official Specialist Signature Row */}
        <div className="pt-8 border-t border-slate-300 flex justify-center text-xs text-center">
          <div className="space-y-2.5 max-w-sm w-full bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
            <span className="text-slate-600 font-bold block text-xs">أخصائي تدريبات نطق</span>
            <span className="text-base font-black text-emerald-900 block">
              {SCHOOL_KLICHE.specialistName}
            </span>
            <div className="h-0.5 w-40 mx-auto bg-emerald-700/40 my-2"></div>
            <span className="text-[11px] text-slate-500 font-medium">التوقيع</span>
          </div>
        </div>
      </div>
    </div>
  );
};

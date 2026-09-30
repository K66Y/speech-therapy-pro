import { SavedField } from './SavedField';
import { TargetLettersEditor } from './TargetLettersEditor';
import React, { useEffect, useState } from 'react';
import {
  FileDown,
  Printer,
  Save,
  CheckCircle2,
  Stethoscope,
  Wrench,
  User,
  Activity,
  ClipboardList
} from 'lucide-react';
import { CaseStudyData, StudentProfile } from '../types/speechTherapy';
import { OfficialHeader } from './OfficialHeader';
import { SCHOOL_KLICHE } from '../data/sampleData';
import { triggerOfficialPrint } from '../services/printService';
import { EditableText } from './EditableText';

interface CaseStudyViewProps {
  caseStudy: CaseStudyData;
  onUpdateCaseStudy: (updated: CaseStudyData) => void;
}

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({
  caseStudy,
  onUpdateCaseStudy
}) => {
  const [data, setData] = useState<CaseStudyData>(caseStudy);
  useEffect(() => setData(caseStudy), [caseStudy]);
  const [isSavedAlert, setIsSavedAlert] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const std = data.student;
  const exam = data.oralMotorExam;
  const grades = ['الروضة / التمهيدي', 'الصف الأول الابتدائي', 'الصف الثاني الابتدائي', 'الصف الثالث الابتدائي', 'الصف الرابع الابتدائي', 'الصف الخامس الابتدائي', 'الصف السادس الابتدائي', 'المرحلة المتوسطة'];
  const ageForGrade = (grade: string) => ({ 'الروضة / التمهيدي': '5–6 سنوات (تقديري)', 'الصف الأول الابتدائي': '6–7 سنوات (تقديري)', 'الصف الثاني الابتدائي': '7–8 سنوات (تقديري)', 'الصف الثالث الابتدائي': '8–9 سنوات (تقديري)', 'الصف الرابع الابتدائي': '9–10 سنوات (تقديري)', 'الصف الخامس الابتدائي': '10–11 سنة (تقديري)', 'الصف السادس الابتدائي': '11–12 سنة (تقديري)', 'المرحلة المتوسطة': '12–15 سنة (تقديري)' } as Record<string, string>)[grade] || '';

  const handleSave = () => {
    onUpdateCaseStudy(data);
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 3000);
  };

  const saveExamNote = (section: 'lips' | 'teeth' | 'tongue' | 'palateAndUvula' | 'breathing', notes: string) => {
    const updated = {
      ...data,
      oralMotorExam: {
        ...data.oralMotorExam,
        [section]: { ...data.oralMotorExam[section], notes }
      }
    } as CaseStudyData;
    setData(updated);
    onUpdateCaseStudy(updated);
  };

  const noteChoices = {
    lips: ['حركة وإطباق طبيعيان.', 'ضعف بسيط في الإطباق يحتاج تمارين إغلاق الشفتين.', 'عدم تناظر ملحوظ أثناء الحركة.'],
    teeth: ['اصطفاف الأسنان والفك طبيعي.', 'تباعد بسيط لا يؤثر على مخارج الأصوات.', 'يوصى بمتابعة حالة الإطباق مع طبيب الأسنان.'],
    tongue: ['حركة اللسان ومداه طبيعيان.', 'يحتاج اللسان إلى تدريب على الرفع الجانبي.', 'يحتاج إلى تمارين رفع طرف اللسان للأعلى.'],
    palateAndUvula: ['سقف الحلق واللهاة طبيعيان.', 'توجد ملاحظة على حركة سقف الحلق وتحتاج متابعة.', 'الرنين الأنفي ضمن النطاق الطبيعي.'],
    breathing: ['التنفس الأنفي وسعة النفس مناسبان للكلام.', 'يحتاج إلى تنظيم الزفير أثناء الجمل الطويلة.', 'لوحظ تنفس فموي يحتاج إلى متابعة.']
  };

  const handleExportDocx = async () => {
    setIsExporting(true);
    try {
      const { exportCaseStudyDocx } = await import('../services/docxExportService');
      await exportCaseStudyDocx(data);
    } catch (e) {
      console.error(e);
      window.alert('تعذر تجهيز ملف Word. تحقق من الاتصال ثم أعد المحاولة. إذا استمر الخطأ، أرسل صورة الرسالة.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">
              نموذج دراسة الحالة الشاملة
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {isSavedAlert && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-bold animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              تم حفظ البيانات بنجاح!
            </span>
          )}

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 bg-sky-800 hover:bg-sky-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <Save className="w-4 h-4" />
            حفظ دراسة الحالة
          </button>

          <button
            onClick={handleExportDocx}
            disabled={isExporting}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <FileDown className="w-4 h-4" />
            {isExporting ? 'جاري التصدير...' : 'تصدير Word (.docx)'}
          </button>

          <button
            onClick={() => triggerOfficialPrint('.printable-sheet')}
            className="flex items-center gap-1.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
            title="طباعة الاستمارة الرسمية A4"
          >
            <Printer className="w-4 h-4" />
            طباعة رسمية
          </button>
        </div>
      </div>

      {/* Main Printable Document Canvas */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 printable-sheet print:p-0 print:border-none print:shadow-none">
        {/* Official 4-Line Cliché */}
          <OfficialHeader
          documentTitle="استمارة دراسة الحالة الشاملة لجلسات تدريبات النطق والتخاطب"
          subTitle="التقييم العضوي والوظيفي لأعضاء النطق والكلام وتحديد خط الأساس العلاجي"
          studentName={std.fullName}
          nationalId={std.nationalId}
          grade={`${std.grade} - ${std.classRoom}`}
        />

        {/* Section 1: General Student Info */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 border-b border-emerald-800/20 pb-2">
            <User className="w-4 h-4 text-emerald-800" />
            <h3 className="font-black text-slate-900 text-base">
              أولاً: البيانات العامة والبيئة الأسرية
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/70 p-4 rounded-xl border border-slate-200/60 text-xs">
            <div>
              <span className="text-slate-500 block mb-1">اسم الطالب رباعياً:</span>
              <SavedField
                type="text"
                aria-label="اسم الطالب" value={std.fullName}
                onChange={e => { const updated = { ...data, student: { ...std, fullName: e.target.value } }; setData(updated); onUpdateCaseStudy(updated); }}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900"
              />
            </div>
            <div>
              <span className="text-slate-500 block mb-1">رقم السجل المدني:</span>
              <SavedField
                type="text"
                aria-label="السجل المدني" value={std.nationalId}
                onChange={e => { const updated = { ...data, student: { ...std, nationalId: e.target.value } }; setData(updated); onUpdateCaseStudy(updated); }}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 font-mono font-bold text-slate-900"
              />
            </div>
            <div>
              <span className="text-slate-500 block mb-1">الصف الدراسي:</span>
              <select value={std.grade} onChange={e => { const grade = e.target.value; const updated = { ...data, student: { ...std, grade, age: ageForGrade(grade) } }; setData(updated); onUpdateCaseStudy(updated); }} className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900 print:hidden">
                {grades.map(grade => <option key={grade}>{grade}</option>)}
              </select>
              <span className="hidden print:block">{std.grade}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">الفصل:</span>
              <SavedField type="text" aria-label="الفصل" value={std.classRoom} onChange={e => { const updated = { ...data, student: { ...std, classRoom: e.target.value } }; setData(updated); onUpdateCaseStudy(updated); }} className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900" />
            </div>
            <div>
              <span className="text-slate-500 block mb-1">العمر التقديري المرتبط بالصف:</span>
              <SavedField type="text" readOnly value={std.age} className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 font-bold text-slate-600" />
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-4 rounded-xl border border-slate-200 p-4 text-xs md:grid-cols-2">
          <div><h4 className="mb-2 font-bold">الاضطرابات النطقية</h4><EditableText label="الاضطرابات النطقية" value={(std.diagnosisCategories || [std.diagnosisCategory]).filter(Boolean).join('، ')} suggestions={['إبدال','حذف','تشويه','إضافة','إبدال، تشويه','إبدال، حذف']} onSave={value => { const updated = { ...data, student: { ...std, diagnosisCategory: value, diagnosisCategories: value.split(/[،,\n]/).map(item => item.trim()).filter(Boolean) } }; setData(updated); onUpdateCaseStudy(updated); }} /></div>
          <div><h4 className="mb-2 font-bold">الحروف المستهدفة</h4><TargetLettersEditor value={std.targetLetters || []} onSave={targetLetters => { const updated = { ...data, student: { ...std, targetLetters } }; setData(updated); onUpdateCaseStudy(updated); }} /></div>
        </div>
        {/* Section 2: Clinical Developmental History */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 border-b border-emerald-800/20 pb-2">
            <Activity className="w-4 h-4 text-emerald-800" />
            <h3 className="font-black text-slate-900 text-base">
              ثانياً: التاريخ التطوري والكلامي والسمعي
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">التاريخ الطبي والحركي:</label>
              <SavedField multiline
                rows={2}
                aria-label="التاريخ الطبي" value={data.medicalHistory}
                onChange={e => { const updated = { ...data, medicalHistory: e.target.value }; setData(updated); onUpdateCaseStudy(updated); }}
                className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50/50 leading-relaxed"
              />
              <span className="hidden print:block whitespace-pre-wrap">{data.medicalHistory}</span>
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700">تاريخ ظهور مشكلة النطق والكلام:</label>
              <SavedField multiline
                rows={2}
                aria-label="تاريخ ظهور الصعوبة" value={data.speechHistory}
                onChange={e => { const updated = { ...data, speechHistory: e.target.value }; setData(updated); onUpdateCaseStudy(updated); }}
                className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50/50 leading-relaxed"
              />
              <span className="hidden print:block whitespace-pre-wrap">{data.speechHistory}</span>
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700">الفحص السمعي والإدراك السمعي للأصوات:</label>
              <SavedField multiline
                rows={2}
                aria-label="الفحص السمعي" value={data.hearingStatus}
                onChange={e => { const updated = { ...data, hearingStatus: e.target.value }; setData(updated); onUpdateCaseStudy(updated); }}
                className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50/50 leading-relaxed"
              />
              <span className="hidden print:block whitespace-pre-wrap">{data.hearingStatus}</span>
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700">السلوك والتواصل الصفي:</label>
              <SavedField multiline
                rows={2}
                aria-label="السلوك والتواصل الصفي" value={data.behaviorNotes}
                onChange={e => { const updated = { ...data, behaviorNotes: e.target.value }; setData(updated); onUpdateCaseStudy(updated); }}
                className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50/50 leading-relaxed"
              />
              <span className="hidden print:block whitespace-pre-wrap">{data.behaviorNotes}</span>
            </div>
          </div>
        </div>

        {/* Section 3: MANDATORY TOOLS (1- Mirror, 2- Tongue Depressor) */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 border-b border-emerald-800/20 pb-2">
            <Wrench className="w-4 h-4 text-emerald-800" />
            <h3 className="font-black text-slate-900 text-base">
              ثالثاً: الأدوات المستخدمة في التشخيص والتقييم
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-sky-200 bg-sky-50/60 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-sky-700 text-white flex items-center justify-center font-black text-sm">
                  1
                </span>
                <h4 className="font-bold text-sky-950 text-sm">
                  مرآة نطق وتخاطب تشخيصية
                </h4>
              </div>
              <p className="text-xs text-slate-600">
                ملاحظات الفحص بالمرآة أمام الطالب لمقارنة حركة الشفاه واللسان وتطابق الفكين:
              </p>
              <SavedField multiline
                rows={3}
                aria-label="إجراء المرآة" value={exam.mirrorObservation}
                onChange={e =>
                  ((updated: CaseStudyData) => { setData(updated); onUpdateCaseStudy(updated); })({ ...data, oralMotorExam: { ...exam, mirrorObservation: e.target.value } })
                }
                className="w-full bg-white border border-sky-200 rounded-lg p-2 text-xs text-slate-800"
              />
            </div>

            <div className="border-2 border-amber-200 bg-amber-50/60 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-700 text-white flex items-center justify-center font-black text-sm">
                  2
                </span>
                <h4 className="font-bold text-amber-950 text-sm">
                  خافض لسان طبي معقم
                </h4>
              </div>
              <p className="text-xs text-slate-600">
                نتائج فحص مرونة اللسان ورفع طرفه بالخافض وتنبيه لثة الأسنان وسقف الحلق:
              </p>
              <SavedField multiline
                rows={3}
                aria-label="إجراء خافض اللسان" value={exam.tongueDepressorExam}
                onChange={e =>
                  ((updated: CaseStudyData) => { setData(updated); onUpdateCaseStudy(updated); })({ ...data, oralMotorExam: { ...exam, tongueDepressorExam: e.target.value } })
                }
                className="w-full bg-white border border-amber-200 rounded-lg p-2 text-xs text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Oral Motor Examination Table */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 border-b border-emerald-800/20 pb-2">
            <Stethoscope className="w-4 h-4 text-emerald-800" />
            <h3 className="font-black text-slate-900 text-base">
              رابعاً: الفحص العضوي والوظيفي لأعضاء النطق والكلام (Oral-Motor Exam)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-emerald-900 text-white">
                  <th className="p-3 border border-emerald-800">العضو المفحوص</th>
                  <th className="p-3 border border-emerald-800">الحالة الإكلينيكية</th>
                  <th className="p-3 border border-emerald-800">الملاحظات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 border border-slate-200 bg-slate-50">
                    الشفتان (Lips)
                  </td>
                  <td className="p-3 border border-slate-200">
                    <span className="inline-block px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-900 font-bold text-[11px] ml-1">
                      <EditableText label="الحالة الإكلينيكية" value={exam.lips.closure} multiline={false} suggestions={["سليم","ضعيف","مشوه"]} onSave={value => { const updated = { ...data, oralMotorExam: { ...exam, lips: { ...exam.lips, closure: value } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} onDelete={() => { const updated = { ...data, oralMotorExam: { ...exam, lips: { ...exam.lips, closure: '' } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} />
                    </span>
                    <span className="text-slate-600 font-medium">حركية <EditableText label="الحالة الإكلينيكية" value={exam.lips.mobility} multiline={false} suggestions={["طبيعي","محدود"]} onSave={value => { const updated = { ...data, oralMotorExam: { ...exam, lips: { ...exam.lips, mobility: value } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} onDelete={() => { const updated = { ...data, oralMotorExam: { ...exam, lips: { ...exam.lips, mobility: '' } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} /></span>
                  </td>
                  <td className="p-3 border border-slate-200">
                    <EditableText label="ملاحظات الشفتين" value={exam.lips.notes} onSave={value => saveExamNote('lips', value)} onDelete={() => saveExamNote('lips', '')} suggestions={noteChoices.lips} rows={3} />
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 border border-slate-200 bg-slate-50">
                    الأسنان والفك (Teeth & Jaw)
                  </td>
                  <td className="p-3 border border-slate-200">
                    <span className="inline-block px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-900 font-bold text-[11px] ml-1">
                      <EditableText label="الحالة الإكلينيكية" value={exam.teeth.bite} multiline={false} suggestions={["إطباق سليم","عضة مفتوحة","عضة معكوسة","تراكب أسنان"]} onSave={value => { const updated = { ...data, oralMotorExam: { ...exam, teeth: { ...exam.teeth, bite: value } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} onDelete={() => { const updated = { ...data, oralMotorExam: { ...exam, teeth: { ...exam.teeth, bite: '' } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} />
                    </span>
                    <span className="text-slate-600 font-medium"><EditableText label="الحالة الإكلينيكية" value={exam.teeth.spacing} multiline={false} suggestions={["طبيعي","فراغات بينية","فقدان أسنان"]} onSave={value => { const updated = { ...data, oralMotorExam: { ...exam, teeth: { ...exam.teeth, spacing: value } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} onDelete={() => { const updated = { ...data, oralMotorExam: { ...exam, teeth: { ...exam.teeth, spacing: '' } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} /></span>
                  </td>
                  <td className="p-3 border border-slate-200">
                    <EditableText label="ملاحظات الأسنان والفك" value={exam.teeth.notes} onSave={value => saveExamNote('teeth', value)} onDelete={() => saveExamNote('teeth', '')} suggestions={noteChoices.teeth} rows={3} />
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 border border-slate-200 bg-slate-50">
                    اللسان والرابط اللساني (Tongue & Frenulum)
                  </td>
                  <td className="p-3 border border-slate-200">
                    <span className="inline-block px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-900 font-bold text-[11px] ml-1">
                      <EditableText label="الحالة الإكلينيكية" value={exam.tongue.frenulum} multiline={false} suggestions={["طبيعي (غير مربوط)","ربط لساني خفيف","ربط لساني مقيد (ملتصق)"]} onSave={value => { const updated = { ...data, oralMotorExam: { ...exam, tongue: { ...exam.tongue, frenulum: value } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} onDelete={() => { const updated = { ...data, oralMotorExam: { ...exam, tongue: { ...exam.tongue, frenulum: '' } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} />
                    </span>
                    <span className="text-slate-600 font-medium"><EditableText label="الحالة الإكلينيكية" value={exam.tongue.mobilityElevation} multiline={false} suggestions={["قادر على الرفع","صعوبة بالرفع"]} onSave={value => { const updated = { ...data, oralMotorExam: { ...exam, tongue: { ...exam.tongue, mobilityElevation: value } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} onDelete={() => { const updated = { ...data, oralMotorExam: { ...exam, tongue: { ...exam.tongue, mobilityElevation: '' } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} /></span>
                  </td>
                  <td className="p-3 border border-slate-200">
                    <EditableText label="ملاحظات اللسان" value={exam.tongue.notes} onSave={value => saveExamNote('tongue', value)} onDelete={() => saveExamNote('tongue', '')} suggestions={noteChoices.tongue} rows={3} />
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 border border-slate-200 bg-slate-50">
                    سقف الحلق واللهاة (Palate & Uvula)
                  </td>
                  <td className="p-3 border border-slate-200">
                    <span className="inline-block px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-900 font-bold text-[11px] ml-1">
                      <EditableText label="الحالة الإكلينيكية" value={exam.palateAndUvula.hardPalate} multiline={false} suggestions={["سليم","مرتفع وضيق","شق سقف الحلق"]} onSave={value => { const updated = { ...data, oralMotorExam: { ...exam, palateAndUvula: { ...exam.palateAndUvula, hardPalate: value } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} onDelete={() => { const updated = { ...data, oralMotorExam: { ...exam, palateAndUvula: { ...exam.palateAndUvula, hardPalate: '' } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} />
                    </span>
                    <span className="text-slate-600 font-medium"><EditableText label="الحالة الإكلينيكية" value={exam.palateAndUvula.nasality} multiline={false} suggestions={["طبيعي (بدون خنف)","خنف مفتوح (رنين أنفي زائد)","خنف مغلق"]} onSave={value => { const updated = { ...data, oralMotorExam: { ...exam, palateAndUvula: { ...exam.palateAndUvula, nasality: value } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} onDelete={() => { const updated = { ...data, oralMotorExam: { ...exam, palateAndUvula: { ...exam.palateAndUvula, nasality: '' } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} /></span>
                  </td>
                  <td className="p-3 border border-slate-200">
                    <EditableText label="ملاحظات الحنك واللهاة" value={exam.palateAndUvula.notes} onSave={value => saveExamNote('palateAndUvula', value)} onDelete={() => saveExamNote('palateAndUvula', '')} suggestions={noteChoices.palateAndUvula} rows={3} />
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 border border-slate-200 bg-slate-50">
                    التنفس والكفاءة الصوتية (Respiration)
                  </td>
                  <td className="p-3 border border-slate-200">
                    <span className="inline-block px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-900 font-bold text-[11px] ml-1">
                      <EditableText label="الحالة الإكلينيكية" value={exam.breathing.type} multiline={false} suggestions={["أنفي سليم","فموي","مختلط"]} onSave={value => { const updated = { ...data, oralMotorExam: { ...exam, breathing: { ...exam.breathing, type: value } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} onDelete={() => { const updated = { ...data, oralMotorExam: { ...exam, breathing: { ...exam.breathing, type: '' } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} />
                    </span>
                    <span className="text-slate-600 font-medium"><EditableText label="الحالة الإكلينيكية" value={exam.breathing.capacity} multiline={false} suggestions={["كافٍ لإخراج الجمل","نفس قصير وسطحي"]} onSave={value => { const updated = { ...data, oralMotorExam: { ...exam, breathing: { ...exam.breathing, capacity: value } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} onDelete={() => { const updated = { ...data, oralMotorExam: { ...exam, breathing: { ...exam.breathing, capacity: '' } } } as CaseStudyData; setData(updated); onUpdateCaseStudy(updated); }} /></span>
                  </td>
                  <td className="p-3 border border-slate-200">
                    <EditableText label="ملاحظات التنفس" value={exam.breathing.notes} onSave={value => saveExamNote('breathing', value)} onDelete={() => saveExamNote('breathing', '')} suggestions={noteChoices.breathing} rows={3} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 5: Diagnosis & Recommendations */}
        <div className="mb-8 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 space-y-4">
          <div>
            <h4 className="font-black text-emerald-950 text-sm mb-1.5">
              التشخيص النطقي النهائي وخطة التدخل:
            </h4>
            <SavedField
              type="text"
              aria-label="التشخيص الأولي" value={data.initialDiagnosis}
              onChange={e => { const updated = { ...data, initialDiagnosis: e.target.value }; setData(updated); onUpdateCaseStudy(updated); }}
              className="w-full bg-white border border-emerald-300 rounded-xl p-2.5 font-bold text-slate-900 text-sm"
            />
          </div>

          <div>
            <h4 className="font-bold text-emerald-950 text-xs mb-1">
              التوصيات العلاجية والإجرائية المعتمدة:
            </h4>
            <div className="space-y-2">
              {data.recommendations.map((rec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    {i + 1}
                  </span>
                  <SavedField
                    type="text"
                    aria-label="التوصيات" value={rec}
                    onChange={e => {
                      const newRecs = [...data.recommendations];
                      newRecs[i] = e.target.value;
                      const updated = { ...data, recommendations: newRecs }; setData(updated); onUpdateCaseStudy(updated);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800"
                  />
                </div>
              ))}
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

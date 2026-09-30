import React, { useEffect, useState } from 'react';
import {
  FileDown,
  Printer,
  Calendar,
  CheckCircle2,
  Star,
  Eye,
  Heart,
  Send
} from 'lucide-react';
import { HomeworkSheet, StudentProfile } from '../types/speechTherapy';
import { OfficialHeader } from './OfficialHeader';
import { SCHOOL_KLICHE } from '../data/sampleData';
import { triggerOfficialPrint } from '../services/printService';
import { ARABIC_LETTERS_LIST, ARABIC_LETTERS_MAP } from '../data/arabicLettersData';
import { getLiveHijriDate } from '../services/dateService';
import { EditableText } from './EditableText';
import { SavedField } from './SavedField';
import { SavedSelect } from './SavedSelect';
import { ChoicePicker, parentGuidanceSuggestions, feedbackSuggestions } from './ChoicePicker';

interface HomeworkViewProps {
  student: StudentProfile;
  homeworkList: HomeworkSheet[];
  onUpdateHomework: (updated: HomeworkSheet) => void;
}

export const HomeworkView: React.FC<HomeworkViewProps> = ({
  student,
  homeworkList,
  onUpdateHomework
}) => {
  const [activeHw, setActiveHw] = useState<HomeworkSheet>(
    homeworkList[0] || {
      id: 'hw-new',
      studentId: student.id,
      targetLetter: 'ر',
      dateGiven: getLiveHijriDate(),
      returnDate: getLiveHijriDate(),
      letterInstructionsForParent:
        'المكرم ولي أمر الطالب، نرجو تدريب ابنكم أمام مرآة المنزل بحيث يرى شفتيه ولسانه وهو يرفع طرف اللسان للثة العلوية دون إغلاق الفم أو تحويل الصوت للياء.',
      mirrorInstructionAtHome:
        'اجعل الطالب ينظر في المرآة ويبتسم ابتسامة خفيفة، ثم يرفع طرف لسانه ليلامس سقف الفم خلف الأسنان مباشرة ويكرر الصوت بوضوح.',
      wordsToPractice: [
        { position: 'أول الكلمة', word: 'رُمَّان', repetitionCount: 5 },
        { position: 'أول الكلمة', word: 'رَجُل', repetitionCount: 5 },
        { position: 'وسط الكلمة', word: 'كُرَة', repetitionCount: 5 },
        { position: 'آخر الكلمة', word: 'نَمِر', repetitionCount: 5 }
      ],
      sentenceToRepeat: 'رَكِبَ رَامِي قِطَارَ الرِّحْلَاتِ المَدْرَسِيَّةِ.',
      parentNotes: '',
      parentSignature: student.guardianName,
      specialistFeedback: 'أداء ممتاز، استمروا في التعزيز المنزلي.',
      specialistName: SCHOOL_KLICHE.specialistName
    }
  );

  const [isExporting, setIsExporting] = useState(false);
  useEffect(() => {
    const matching = homeworkList.find(item => item.id === activeHw.id) || homeworkList[0];
    if (matching) setActiveHw(matching);
  }, [student.id, homeworkList]);
  const updateHomework = (changes: Partial<HomeworkSheet>) => {
    const updated = { ...activeHw, ...changes };
    setActiveHw(updated);
    onUpdateHomework(updated);
  };
  const changeTargetLetter = (targetLetter: HomeworkSheet['targetLetter']) => {
    const existing = homeworkList.find(item => item.targetLetter === targetLetter);
    if (existing) { setActiveHw(existing); return; }
    const info = ARABIC_LETTERS_MAP[targetLetter];
    updateHomework({ id: `hw-${student.id}-${targetLetter}-${Date.now()}`, targetLetter, parentNotes: '', specialistFeedback: '', letterInstructionsForParent: parentGuidanceSuggestions(targetLetter)[0], mirrorInstructionAtHome: 'التدريب أمام المرآة حسب النموذج الذي يوضحه المعلم للحرف المستهدف.', wordsToPractice: [
      ...info.examples.beginning.words.map(w => ({ position: 'أول الكلمة' as const, word: w.word, repetitionCount: 5 })),
      ...info.examples.middle.words.map(w => ({ position: 'وسط الكلمة' as const, word: w.word, repetitionCount: 5 })),
      ...info.examples.end.words.map(w => ({ position: 'آخر الكلمة' as const, word: w.word, repetitionCount: 5 }))
    ], sentenceToRepeat: info.practiceSentences[0] || `تدريب حرف ${targetLetter}` });
  };

  const handleExportDocx = async () => {
    setIsExporting(true);
    try {
      const { exportHomeworkDocx } = await import('../services/docxExportService');
      await exportHomeworkDocx(student, activeHw);
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
            أوراق العمل والواجبات المنزلية لحرف [ {activeHw.targetLetter} ]
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <label className="text-xs font-bold text-slate-700">الحرف:
            <select value={activeHw.targetLetter} onChange={e => changeTargetLetter(e.target.value as HomeworkSheet['targetLetter'])} className="mr-1 rounded-lg border border-slate-200 bg-white p-2">{(student.targetLetters?.length ? student.targetLetters : ARABIC_LETTERS_LIST).map(letter => <option key={letter}>{letter}</option>)}</select>
          </label>
          <button
            onClick={handleExportDocx}
            disabled={isExporting}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            {isExporting ? 'جاري تجهيز Word...' : 'تصدير ورقة الواجب (Word)'}
          </button>

          <button
            onClick={() => triggerOfficialPrint('.printable-sheet')}
            className="flex items-center gap-1.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
            title="طباعة ورقة الواجب الرسمية"
          >
            <Printer className="w-4 h-4" />
            طباعة ورقة الواجب
          </button>
        </div>
      </div>

      {/* Main Homework Sheet */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 printable-sheet print:p-0 print:border-none print:shadow-none">
        <OfficialHeader
          documentTitle={`استمارة الواجب المنزلي والمتابعة الأسرية لحرف [ ${activeHw.targetLetter} ]`}
          subTitle="برنامج التدريب المنزلي اليومي أمام المرآة والشراكة بين المدرسة وولي الأمر"
          studentName={student.fullName}
          nationalId={student.nationalId}
          grade={`${student.grade} - ${student.classRoom}`}
        />

        {/* Instructions for parents */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 mb-6 space-y-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-emerald-950 text-sm">
              رسالة وإرشادات التدريب المنزلي إلى ولي أمر الطالب:
            </h3>
          </div>
          <EditableText targetLetter={activeHw.targetLetter} label="إرشادات ولي الأمر" value={activeHw.letterInstructionsForParent} onSave={letterInstructionsForParent => updateHomework({ letterInstructionsForParent })} onDelete={() => updateHomework({ letterInstructionsForParent: '' })} className="text-sm bg-white/80 p-3.5 rounded-xl" />
          <ChoicePicker category={`parent-guidance-${activeHw.targetLetter}`} label="التوجيهات" suggestions={parentGuidanceSuggestions(activeHw.targetLetter)} onSelect={letterInstructionsForParent => updateHomework({ letterInstructionsForParent })} />

          <div className="flex items-start gap-2.5 bg-sky-50 p-3.5 rounded-xl border border-sky-200 text-xs">
            <Eye className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-sky-950 block text-[11px] mb-0.5">
                طريقة التدريب أمام مرآة المنزل:
              </strong>
              <EditableText label="طريقة التدريب بالمرآة" value={activeHw.mirrorInstructionAtHome} onSave={mirrorInstructionAtHome => updateHomework({ mirrorInstructionAtHome })} onDelete={() => updateHomework({ mirrorInstructionAtHome: '' })} />
            </div>
          </div>
        </div>

        {/* Practice Words Table with Stars / Repetition Checklist */}
        <div className="mb-6">
          <h3 className="font-black text-slate-900 text-base mb-3">
            جدول متابعة تكرار الكلمات المستهدفة يومياً:
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-emerald-900 text-white text-center">
                  <th className="p-3 border border-emerald-800">موضع الحرف</th>
                  <th className="p-3 border border-emerald-800">الكلمة المطلوب نطقها</th>
                  <th className="p-3 border border-emerald-800">التكرار اليومي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {activeHw.wordsToPractice.map((w, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 text-center">
                    <td className="p-3 font-bold text-slate-700 border border-slate-200 bg-slate-50">
                      <SavedSelect aria-label="موضع الحرف" value={w.position} onChange={e => updateHomework({ wordsToPractice: activeHw.wordsToPractice.map((item, i) => i === idx ? { ...item, position: e.target.value as typeof item.position } : item) })}>{['أول الكلمة','وسط الكلمة','آخر الكلمة'].map(position => <option key={position}>{position}</option>)}</SavedSelect>
                    </td>
                    <td className="p-3 font-black text-emerald-900 text-lg border border-slate-200">
                      <EditableText suggestions={ARABIC_LETTERS_MAP[activeHw.targetLetter].examples[w.position === 'أول الكلمة' ? 'beginning' : w.position === 'وسط الكلمة' ? 'middle' : 'end'].words.map(item => item.word).filter(Boolean)} label="كلمة الواجب" value={w.word} onSave={word => updateHomework({ wordsToPractice: activeHw.wordsToPractice.map((item, i) => i === idx ? { ...item, word } : item) })} onDelete={() => updateHomework({ wordsToPractice: activeHw.wordsToPractice.filter((_, i) => i !== idx) })} />
                    </td>
                    <td className="p-3 border border-slate-200">
                      <SavedField aria-label="عدد التكرار" type="number" min={1} max={20} value={w.repetitionCount} onChange={e => updateHomework({ wordsToPractice: activeHw.wordsToPractice.map((item, i) => i === idx ? { ...item, repetitionCount: Number(e.target.value) } : item) })} />
                      <div className="flex flex-wrap items-center justify-center gap-1.5">
                        {Array.from({ length: Math.min(20, Math.max(0, w.repetitionCount)) }, (_, i) => i + 1).map(star => (
                          <div
                            key={star}
                            className="w-6 h-6 rounded-full border border-amber-300 bg-amber-50 flex items-center justify-center text-amber-500 font-bold text-xs"
                          >
                            ★
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" className="mt-3 text-xs text-emerald-800 print:hidden" onClick={() => updateHomework({ wordsToPractice: [...activeHw.wordsToPractice, { word: 'كلمة جديدة', position: 'أول الكلمة', repetitionCount: 5 }] })}>+ إضافة كلمة</button>
          </div>
        </div>

        {/* Practice sentence */}
        <div className="bg-slate-50 border-2 border-emerald-800/30 rounded-2xl p-5 mb-6 text-center space-y-2">
          <span className="text-xs font-bold text-slate-500">
            الجملة النطقية المتكاملة للتدريب والتعميم:
          </span>
          <div className="flex items-center justify-center gap-3">
            <h4 className="text-xl sm:text-2xl font-black text-emerald-900">
              <EditableText suggestions={ARABIC_LETTERS_MAP[activeHw.targetLetter].practiceSentences} label="جملة التدريب" value={activeHw.sentenceToRepeat} onSave={sentenceToRepeat => updateHomework({ sentenceToRepeat })} onDelete={() => updateHomework({ sentenceToRepeat: '' })} />
            </h4>
          </div>
        </div>

        {/* Parent Feedback & Signature */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-8 text-xs">
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              ملاحظات ولي الأمر بعد تدريب الطالب بالمنزل:
            </label>
            <textarea
              rows={2}
              value={activeHw.parentNotes}
              onChange={e => {
                updateHomework({ parentNotes: e.target.value });
              }}
              className="w-full bg-white border border-slate-200 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">
              توجيهات وتغذية راجعة:
            </label>
            <EditableText label="التوجيهات والتغذية الراجعة" value={activeHw.specialistFeedback} onSave={specialistFeedback => updateHomework({ specialistFeedback })} onDelete={() => updateHomework({ specialistFeedback: '' })} />
            <ChoicePicker category="homework-feedback" label="التغذية الراجعة" suggestions={feedbackSuggestions} onSelect={specialistFeedback => updateHomework({ specialistFeedback })} />
          </div>
        </div>

        {/* Signatures */}
        <div className="pt-8 border-t border-slate-300 grid grid-cols-2 gap-6 text-xs text-center">
          <div className="space-y-3">
            <span className="text-slate-500 font-bold block">أخصائي تدريبات نطق</span>
            <span className="text-sm font-black text-emerald-900 block">
              {SCHOOL_KLICHE.specialistName}
            </span>
            <div className="h-0.5 w-32 mx-auto bg-slate-300"></div>
            <span className="text-[10px] text-slate-400">التوقيع</span>
          </div>

          <div className="space-y-3">
            <span className="text-slate-500 font-bold block">ولي أمر الطالب</span>
            <span className="text-sm font-bold text-slate-800 block">
              {student.guardianName}
            </span>
            <div className="h-0.5 w-32 mx-auto bg-slate-300"></div>
            <span className="text-[10px] text-slate-400">التوقيع</span>
          </div>
        </div>
      </div>
    </div>
  );
};

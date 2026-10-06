import { homeworkColumns, homeworkPositions } from '../services/homeworkGrid';
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
import { parentTrainingGuide, parentTrainingGuideForGuidance, shouldUpgradeParentTrainingGuide } from '../services/parentTrainingGuide';

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
  useEffect(() => {
    if (!shouldUpgradeParentTrainingGuide(activeHw.mirrorInstructionAtHome)) return;
    const mirrorInstructionAtHome = parentTrainingGuide(activeHw.targetLetter);
    const updated = { ...activeHw, mirrorInstructionAtHome };
    setActiveHw(updated);
    onUpdateHomework(updated);
  }, [activeHw.id, activeHw.targetLetter, activeHw.mirrorInstructionAtHome, onUpdateHomework]);
  const updateHomework = (changes: Partial<HomeworkSheet>) => {
    const updated = { ...activeHw, ...changes };
    setActiveHw(updated);
    onUpdateHomework(updated);
  };
  const changeTargetLetter = (targetLetter: HomeworkSheet['targetLetter']) => {
    const existing = homeworkList.find(item => item.targetLetter === targetLetter);
    if (existing) { setActiveHw(existing); return; }
    const info = ARABIC_LETTERS_MAP[targetLetter];
    updateHomework({ id: `hw-${student.id}-${targetLetter}-${Date.now()}`, targetLetter, parentNotes: '', specialistFeedback: '', letterInstructionsForParent: parentGuidanceSuggestions(targetLetter)[0], mirrorInstructionAtHome: parentTrainingGuide(targetLetter), wordsToPractice: [
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
      window.alert('تعذر تجهيز ملف Word. تحقق من الاتصال ثم أعد المحاولة. إذا استمر الخطأ، أرسل صورة الرسالة.');
    } finally {
      setIsExporting(false);
    }
  };
  const practiceColumns = homeworkColumns(activeHw);
  const savePracticeWord = (positionIndex: number, wordIndex: number, value: string) => {
    const columns = homeworkColumns(activeHw);
    columns[positionIndex][wordIndex] = { ...columns[positionIndex][wordIndex], word: value };
    updateHomework({ wordsToPractice: columns.flat() });
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

        <div className="flex gap-4 mb-4">
          <div>تاريخ تسليم الواجب<EditableText label="تاريخ تسليم الواجب" multiline={false} value={activeHw.dateGiven} onSave={dateGiven => updateHomework({ dateGiven })} /></div>
          <div>تاريخ إعادة الواجب<EditableText label="تاريخ إعادة الواجب" multiline={false} value={activeHw.returnDate} onSave={returnDate => updateHomework({ returnDate })} /></div>
        </div>
        {/* Instructions for parents */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 mb-6 space-y-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-emerald-950 text-sm">
              رسالة وإرشادات التدريب المنزلي إلى ولي أمر الطالب:
            </h3>
          </div>
          <EditableText targetLetter={activeHw.targetLetter} label="إرشادات ولي الأمر" value={activeHw.letterInstructionsForParent} onSave={letterInstructionsForParent => updateHomework({ letterInstructionsForParent })} onDelete={() => updateHomework({ letterInstructionsForParent: '' })} className="text-sm bg-white/80 p-3.5 rounded-xl" />
          <ChoicePicker category={`parent-guidance-${activeHw.targetLetter}`} label="اختر التوجيه لتوليد طريقة التدريب المناسبة" suggestions={parentGuidanceSuggestions(activeHw.targetLetter)} onSelect={letterInstructionsForParent => updateHomework({ letterInstructionsForParent, mirrorInstructionAtHome: parentTrainingGuideForGuidance(activeHw.targetLetter, letterInstructionsForParent) })} />

          <div className="flex items-start gap-2.5 bg-sky-50 p-3.5 rounded-xl border border-sky-200 text-xs">
            <Eye className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-sky-950 block text-[11px] mb-0.5">
                طريقة تدريب ولي الأمر للطالب على حرف ({activeHw.targetLetter}):
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
            <table className="homework-words-table w-full min-w-[900px] text-right border-collapse text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-emerald-900 text-white">{['الحرف', 'أول الكلمة (3 نماذج)', 'وسط الكلمة (3 نماذج)', 'آخر الكلمة (3 نماذج)', 'التكرار اليومي'].map(title => <th key={title} className="p-3 border text-center">{title}</th>)}</tr></thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-slate-200 p-4 text-center text-2xl font-black text-emerald-950">{activeHw.targetLetter}</td>
                  {practiceColumns.map((words, positionIndex) => <td key={homeworkPositions[positionIndex]} className="border border-slate-200 p-3 align-top">
                    <div className="flex flex-wrap justify-center gap-2">
                      {words.slice(0, 3).map((word, wordIndex) => <div key={`${positionIndex}-${wordIndex}`} className="min-w-24 rounded-lg bg-slate-50 px-2 py-1.5 text-center font-bold">
                        <EditableText label={`${homeworkPositions[positionIndex]} - الكلمة ${wordIndex + 1}`} value={word.word} suggestions={ARABIC_LETTERS_MAP[activeHw.targetLetter].examples[positionIndex === 0 ? 'beginning' : positionIndex === 1 ? 'middle' : 'end'].words.map(item => item.word)} onSave={value => savePracticeWord(positionIndex, wordIndex, value)} onDelete={() => savePracticeWord(positionIndex, wordIndex, '')} />
                      </div>)}
                    </div>
                  </td>)}
                  <td className="border border-slate-200 p-3 align-top">
                    <div className="space-y-3">{homeworkPositions.map(position => <div key={position} className="space-y-1 text-center"><span className="block text-[10px] font-bold text-emerald-900">{position}</span><div className="flex justify-center gap-1.5" aria-label={`خمس خانات لتكرار ${position}`}>{Array.from({ length: 5 }, (_, i) => <span key={i} className="inline-block h-5 w-5 rounded-sm border border-slate-500 bg-white" />)}</div></div>)}</div>
                  </td>
                </tr>
              </tbody>
            </table>
            {practiceColumns.some(words => words.length > 3) && <details className="print:hidden mt-3 text-xs"><summary>كلمات إضافية محفوظة خارج جدول الطباعة</summary>{practiceColumns.map((words, pos) => words.slice(3).map((word, index) => <EditableText key={`${pos}-${index}`} label="كلمة إضافية" value={word.word} onSave={value => savePracticeWord(pos, index + 3, value)} onDelete={() => { const columns = homeworkColumns(activeHw); columns[pos].splice(index + 3, 1); updateHomework({ wordsToPractice: columns.flat() }); }} />))}</details>}
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
          </div>

          <div className="space-y-3">
            <span className="text-slate-500 font-bold block">ولي أمر الطالب</span>
            <span className="text-sm font-bold text-slate-800 block">
              {student.guardianName}
            </span>
            <div className="h-0.5 w-32 mx-auto bg-slate-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

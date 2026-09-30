import { SavedField } from './SavedField';
import { consistentDiagnosisNote } from '../services/diagnosisNotes';
import { SavedSelect } from './SavedSelect';
import React, { useEffect, useState } from 'react';
import {
  StudentProfile,
  DiagnosticAssessment,
  ArabicLetterKey
} from '../types/speechTherapy';
import { ARABIC_LETTERS_LIST, ARABIC_LETTERS_MAP } from '../data/arabicLettersData';
import { SCHOOL_KLICHE } from '../data/sampleData';
import { OfficialHeader } from './OfficialHeader';
import { triggerOfficialPrint } from '../services/printService';
import {
  Search,
  FileDown,
  Printer,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Wand2,
  Edit3,
  RotateCcw,
  Sliders,
  Save
} from 'lucide-react';

interface DiagnosisViewProps {
  student: StudentProfile;
  assessment: DiagnosticAssessment;
  onUpdateAssessment: (updated: DiagnosticAssessment) => void;
}

export const DiagnosisView: React.FC<DiagnosisViewProps> = ({
  student,
  assessment,
  onUpdateAssessment
}) => {
  const [data, setData] = useState<DiagnosticAssessment>(assessment);
  const [selectedLetter, setSelectedLetter] = useState<ArabicLetterKey>(student.targetLetters?.[0] || 'ر');
  useEffect(() => setData(assessment), [assessment]);
  useEffect(() => { setSelectedLetter(student.targetLetters?.[0] || 'ر'); setLetterView(student.targetLetters?.length ? 'targets' : 'all'); }, [student.id, student.targetLetters]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorOnlyFilter, setErrorOnlyFilter] = useState(false);
  const [letterView, setLetterView] = useState<'all' | 'targets' | 'single'>(() => student.targetLetters?.length ? 'targets' : 'all');
  const [isExporting, setIsExporting] = useState(false);
  const [generatedNotice, setGeneratedNotice] = useState(false);
  const [isManualScoreMode, setIsManualScoreMode] = useState(false);
  const [activeLetterNotes, setActiveLetterNotes] = useState<ArabicLetterKey | null>(null);

  // حساب نسبة وضوح الكلام العامة تلقائياً
  const calculateScore = (results = data.lettersResults) => {
    let totalPositions = 0;
    let correctCount = 0;

    ARABIC_LETTERS_LIST.forEach(letter => {
      const item = results[letter];
      if (item) {
        (['beginning', 'middle', 'end'] as const).forEach(pos => {
          totalPositions++;
          if (item[pos]?.production === 'صحيح') {
            correctCount++;
          }
        });
      }
    });

    if (totalPositions === 0) return 0;
    return Math.round((correctCount / totalPositions) * 100);
  };

  const autoScore = calculateScore();
  const currentScore = isManualScoreMode
    ? data.speechIntelligibilityScore
    : autoScore;

  const commitAssessment = (updated: DiagnosticAssessment) => {
    const committed = { ...updated, speechIntelligibilityScore: isManualScoreMode ? updated.speechIntelligibilityScore : calculateScore(updated.lettersResults) };
    setData(committed);
    onUpdateAssessment(committed);
  };

  const handlePositionChange = (
    letter: ArabicLetterKey,
    pos: 'beginning' | 'middle' | 'end',
    val: 'صحيح' | 'حذف' | 'إبدال' | 'تشويه' | 'إضافة'
  ) => {
    const updated = {
      ...data,
      summaryNeedsReview: true,
      speechIntelligibilityScore: isManualScoreMode ? data.speechIntelligibilityScore : autoScore,
      lettersResults: {
        ...data.lettersResults,
        [letter]: {
          ...data.lettersResults[letter],
          [pos]: {
            ...data.lettersResults[letter]?.[pos],
            production: val,
            notes: consistentDiagnosisNote(val, data.lettersResults[letter]?.[pos]?.notes)
          }
        }
      }
    };
    commitAssessment(updated);
  };

  const handleNotesChange = (
    letter: ArabicLetterKey,
    pos: 'beginning' | 'middle' | 'end',
    notesVal: string
  ) => {
    const updated = {
      ...data,
      lettersResults: {
        ...data.lettersResults,
        [letter]: {
          ...data.lettersResults[letter],
          [pos]: {
            ...data.lettersResults[letter]?.[pos],
            notes: notesVal
          }
        }
      }
    };
    commitAssessment(updated);
  };

  const handleSubstitutedLetterChange = (
    letter: ArabicLetterKey,
    pos: 'beginning' | 'middle' | 'end',
    subVal: string
  ) => {
    const updated = {
      ...data,
      lettersResults: {
        ...data.lettersResults,
        [letter]: {
          ...data.lettersResults[letter],
          [pos]: {
            ...data.lettersResults[letter]?.[pos],
            substitutedLetter: subVal
          }
        }
      }
    };
    commitAssessment(updated);
  };

  // تعيين الحرف بالكامل سليم أو مضطرب
  const handleSetLetterStateAllPositions = (
    letter: ArabicLetterKey,
    status: 'صحيح' | 'إبدال'
  ) => {
    const current = data.lettersResults[letter];
    const updated = {
      ...data,
      summaryNeedsReview: true,
      lettersResults: {
        ...data.lettersResults,
        [letter]: {
          letter,
          beginning: {
            ...current?.beginning,
            targetWord: current?.beginning?.targetWord || ARABIC_LETTERS_MAP[letter].examples.beginning.words[0].word,
            production: status,
            notes: consistentDiagnosisNote(status, current?.beginning?.notes)
          },
          middle: {
            ...current?.middle,
            targetWord: current?.middle?.targetWord || ARABIC_LETTERS_MAP[letter].examples.middle.words[0].word,
            production: status,
            notes: consistentDiagnosisNote(status, current?.middle?.notes)
          },
          end: {
            ...current?.end,
            targetWord: current?.end?.targetWord || ARABIC_LETTERS_MAP[letter].examples.end.words[0].word,
            production: status,
            notes: consistentDiagnosisNote(status, current?.end?.notes)
          }
        }
      }
    };
    commitAssessment(updated);
  };

  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const handleManualSave = () => {
    onUpdateAssessment(data);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  // إعادة ضبط كافة الحروف كسليمة
  const handleResetAllToCorrect = () => {
    if (!window.confirm('سيتم استبدال نتائج جميع الحروف بسليم. هل تريد المتابعة؟')) return;
    const newResults: any = {};
    ARABIC_LETTERS_LIST.forEach(l => {
      newResults[l] = {
        letter: l,
        beginning: { targetWord: ARABIC_LETTERS_MAP[l].examples.beginning.words[0].word, production: 'صحيح', notes: 'سليم' },
        middle: { targetWord: ARABIC_LETTERS_MAP[l].examples.middle.words[0].word, production: 'صحيح', notes: 'سليم' },
        end: { targetWord: ARABIC_LETTERS_MAP[l].examples.end.words[0].word, production: 'صحيح', notes: 'سليم' }
      };
    });
    const updated = {
      ...data,
      speechIntelligibilityScore: 100,
      lettersResults: newResults
    };
    commitAssessment(updated);
  };

  const applyRecordedDiagnosisToTargets = () => {
    const known = (student.diagnosisCategories || [student.diagnosisCategory]).filter(value => ['إبدال', 'حذف', 'تشويه', 'إضافة'].includes(value)) as Array<'إبدال' | 'حذف' | 'تشويه' | 'إضافة'>;
    if (!student.targetLetters?.length || !known.length) return window.alert('اختر الحروف المستهدفة ونوع الاضطراب من دراسة الحالة أولاً.');
    const results = { ...data.lettersResults };
    student.targetLetters.forEach((letter, index) => {
      const production = known[index] || known[0];
      const current = results[letter];
      results[letter] = { letter, ...Object.fromEntries((['beginning', 'middle', 'end'] as const).map(position => [position, { ...current?.[position], targetWord: current?.[position]?.targetWord || ARABIC_LETTERS_MAP[letter].examples[position].words[0].word, production, substitutedLetter: production === 'إبدال' ? current?.[position]?.substitutedLetter : undefined, notes: consistentDiagnosisNote(production, current?.[position]?.notes) }])) } as typeof current;
    });
    commitAssessment({ ...data, lettersResults: results, primaryErrors: student.targetLetters.map((letter, index) => `${known[index] || known[0]} في حرف (${letter})`), summaryNeedsReview: true });
    setLetterView('targets');
  };

  // توليد الخلاصة الإكلينيكية آلياً بناءً على التشخيص الميداني
  const handleAutoGenerateSummary = () => {
    const substitutedLetters: string[] = [];
    const distortedLetters: string[] = [];
    const omittedLetters: string[] = [];
    const addedLetters: string[] = [];
    const positionsAffected = new Set<string>();

    const summaryLetters = letterView === 'single' ? [selectedLetter] : letterView === 'targets' && student.targetLetters?.length ? student.targetLetters : ARABIC_LETTERS_LIST;
    let scopedAttempts = 0;
    let scopedCorrect = 0;
    summaryLetters.forEach(letter => {
      const res = data.lettersResults[letter];
      if (!res) return;

      (['beginning', 'middle', 'end'] as const).forEach(pos => {
        const prod = res[pos]?.production;
        if (prod) {
          scopedAttempts += 1;
          if (prod === 'صحيح') scopedCorrect += 1;
        }
        const posArabic = pos === 'beginning' ? 'أول الكلمة' : pos === 'middle' ? 'وسط الكلمة' : 'آخر الكلمة';

        if (prod === 'إبدال') {
          substitutedLetters.push(letter);
          positionsAffected.add(posArabic);
        } else if (prod === 'تشويه') {
          distortedLetters.push(letter);
          positionsAffected.add(posArabic);
        } else if (prod === 'حذف') {
          omittedLetters.push(letter);
          positionsAffected.add(posArabic);
        } else if (prod === 'إضافة') {
          addedLetters.push(letter);
          positionsAffected.add(posArabic);
        }
      });
    });
    const scopedScore = scopedAttempts > 0 ? Math.round((scopedCorrect / scopedAttempts) * 100) : 0;

    const uniqueSub = Array.from(new Set(substitutedLetters));
    const uniqueDist = Array.from(new Set(distortedLetters));
    const uniqueOm = Array.from(new Set(omittedLetters));
    const uniqueAdded = Array.from(new Set(addedLetters));
    const totalErrors = uniqueSub.length + uniqueDist.length + uniqueOm.length + uniqueAdded.length;

    const targetLetters = student.targetLetters || [];
    let summary = `ملخص النتائج المدخلة في اختبار النطق للطالب (${student.fullName})؛ `;
    if (letterView === 'single') summary += `نطاق هذه الخلاصة هو حرف (${selectedLetter}) فقط. `;
    else if (targetLetters.length) summary += `الحروف المستهدفة المسجلة في خطة الطالب هي (${targetLetters.join('، ')}). `;

    if (totalErrors === 0) {
      summary += `لم تُسجّل أخطاء ضمن المواضع المقيمة، وبلغت نسبة الأداء المحسوبة في نطاق العرض ${scopedScore}%. تُراجع النتائج مع اكتمال الفحص قبل اعتماد التشخيص أو قرار إنهاء التدريب.`;
    } else {
      summary += `أظهرت نتائج التقييم في نطاق العرض وجود اضطرابات نطقية محددة، وبلغت نسبة الأداء المحسوبة (${scopedScore}%). `;

      const detailsList: string[] = [];
      if (uniqueSub.length > 0) {
        let subText = `إبدال صوتي في حرف (${uniqueSub.join('، ')})`;



        detailsList.push(subText);
      }

      if (uniqueDist.length > 0) {
        let distText = `تشويه صوتي في حرف (${uniqueDist.join('، ')})`;
        
        detailsList.push(distText);
      }

      if (uniqueOm.length > 0) {
        detailsList.push(`حذف صوتي في حرف (${uniqueOm.join('، ')})`);
      }

      if (uniqueAdded.length) detailsList.push(`إضافة صوتية في الحروف (${uniqueAdded.join('، ')})`);
      summary += `وتتمثل أبرز الملاحظات في: ${detailsList.join('، ')}. `;
      summary += `المواضع الأكثر تأثراً: (${Array.from(positionsAffected).join(' و ')}). `;
      summary += `\n\nالخطة الإكلينيكية الموصى بها: `;
      summary += `1) التدريب المباشر أمام المرآة (التغذية الراجعة البصرية) لمطابقة وضعية المخرج الصحيح. `;
      summary += `2) استخدام خافض اللسان الطبي المعقم (التوجيه العضلي اللمسي) لتثبيت اللسان ومنع التدخلات الصوتية البديلة. `;
      summary += `3) التدرج الصوتي الهرمي: عزل الصوت -> المقاطع الصوتية -> الكلمات الثلاث لكل موضع -> الجمل السياقية والتعميم.`;
    }

    const updated = {
      ...data,
      summaryConclusion: summary,
      summaryNeedsReview: false,
      speechIntelligibilityScore: currentScore
    };

    commitAssessment(updated);
    setGeneratedNotice(true);
    setTimeout(() => setGeneratedNotice(false), 3000);
  };

  const handleExportDocx = async () => {
    setIsExporting(true);
    try {
      const { exportDiagnosisDocx } = await import('../services/docxExportService');
      await exportDiagnosisDocx(student, { ...data, speechIntelligibilityScore: currentScore });
    } catch (e) {
      console.error(e);
      window.alert('تعذر تجهيز ملف Word. تحقق من الاتصال ثم أعد المحاولة. إذا استمر الخطأ، أرسل صورة الرسالة.');
    } finally {
      setIsExporting(false);
    }
  };

  const filteredLetters = ARABIC_LETTERS_LIST.filter(l => {
    const item = data.lettersResults[l];
    const isError =
      (item?.beginning?.production && item.beginning.production !== 'صحيح') ||
      (item?.middle?.production && item.middle.production !== 'صحيح') ||
      (item?.end?.production && item.end.production !== 'صحيح');

    const matchesSearch = l.includes(searchTerm) || ARABIC_LETTERS_MAP[l].name.includes(searchTerm);
    if (errorOnlyFilter) return matchesSearch && isError;
    if (letterView === 'targets' && !(student.targetLetters || []).includes(l)) return false;
    if (letterView === 'single' && l !== selectedLetter) return false;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-sky-100 shadow-xs print:hidden">
        <div>
          <h2 className="text-lg font-black text-sky-950 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-sky-700" />
            اختبار التشخيص والتقييم النطقي الشامل (28 حرفاً)
          </h2>
          <p className="text-xs text-slate-500">
            فحص الأصوات الكلامية في أول ووسط وآخر الكلمة بالمرآة وخافض اللسان
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {isSavedNotice && (
            <span className="flex items-center gap-1.5 text-xs text-sky-900 bg-sky-100 px-3 py-1.5 rounded-lg border border-sky-300 font-bold animate-pulse">
              <CheckCircle2 className="w-4 h-4 text-sky-700" />
              تم حفظ التعديلات اليدوية بنجاح!
            </span>
          )}

          <button
            onClick={handleManualSave}
            className="flex items-center gap-1.5 bg-sky-800 hover:bg-sky-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <Save className="w-4 h-4" />
            حفظ التعديلات
          </button>

          <button
            onClick={handleResetAllToCorrect}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer"
            title="إعادة ضبط الكل لسليم"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            تصفير لسليم
          </button>

          <button
            onClick={handleExportDocx}
            disabled={isExporting}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            {isExporting ? 'جاري التصدير...' : 'تصدير التشخيص (Word)'}
          </button>

          <button
            onClick={() => triggerOfficialPrint('.printable-document')}
            className="flex items-center gap-1.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
            title="طباعة الاستمارة الرسمية A4"
          >
            <Printer className="w-4 h-4" />
            طباعة الاستمارة
          </button>
        </div>
      </div>

          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold print:hidden">
            <button type="button" onClick={() => { setSearchTerm(''); setLetterView('all'); setErrorOnlyFilter(false); }} className={`rounded-lg border px-3 py-2 ${letterView === 'all' && !errorOnlyFilter ? 'bg-sky-800 text-white' : 'bg-white text-slate-700'}`}>جميع الحروف</button>
            <button type="button" onClick={() => { setSearchTerm(''); setLetterView('targets'); setErrorOnlyFilter(false); }} className={`rounded-lg border px-3 py-2 ${letterView === 'targets' ? 'bg-sky-800 text-white' : 'bg-white text-slate-700'}`}>الحروف المستهدفة ({student.targetLetters?.length || 0})</button>
            <button type="button" onClick={applyRecordedDiagnosisToTargets} className="rounded-lg border border-sky-300 bg-sky-50 px-3 py-2 text-sky-900">تطبيق الاضطراب المسجل على الحروف المستهدفة</button>
            <button type="button" onClick={() => { setSearchTerm(''); setLetterView('all'); setErrorOnlyFilter(true); }} className={`rounded-lg border px-3 py-2 ${errorOnlyFilter ? 'bg-rose-700 text-white' : 'bg-white text-slate-700'}`}>تحديد الحروف المضطربة</button>
            <span className="text-slate-500">الحرف المختار: {selectedLetter}</span>
          </div>

          {/* Main Diagnostic Sheet */}
      <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 sm:p-10 printable-document printable-sheet print:p-0 print:border-none print:shadow-none">
        <OfficialHeader
          documentTitle="استمارة التشخيص والتقييم النطقي الشامل لجميع الحروف العربية"
          subTitle="رصد الأخطاء الصوتية والنطقية (حذف - إبدال - تشويه - إضافة) ونسبة وضوح الكلام العامة"
          studentName={student.fullName}
          nationalId={student.nationalId}
          grade={`${student.grade} - ${student.classRoom}`}
        />

        {/* Diagnostic Tools Banner & Manual Score Edit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-sky-900 font-bold block mb-1">
                  نسبة وضوح الكلام الإجمالية:
                </span>
                {isManualScoreMode ? (
                  <div className="flex items-center gap-1.5 mt-1">
                    <SavedField
                      suffix="%"
                      type="number"
                      min={0}
                      max={100}
                      value={currentScore}
                      onChange={e => {
                        const val = Math.min(100, Math.max(0, Number(e.target.value) || 0));
                        const updated = { ...data, speechIntelligibilityScore: val };
                        commitAssessment(updated);
                      }}
                      className="w-20 p-1.5 text-2xl font-black text-sky-950 bg-white border border-sky-300 rounded-lg text-center"
                    />
                  </div>
                ) : (
                  <bdi dir="ltr" className="text-3xl font-black text-sky-950 whitespace-nowrap">
                    {currentScore}%
                  </bdi>
                )}
              </div>
              <Sparkles className="w-8 h-8 text-sky-600 opacity-60" />
            </div>

            <div className="pt-2 border-t border-sky-200/60 mt-2 flex items-center justify-between text-[11px] print:hidden">
              <span className="text-slate-500 font-medium">
                {isManualScoreMode ? 'وضع التعديل اليدوي للنسبة' : 'حساب تلقائي من الجدول'}
              </span>
              <button
                type="button"
                onClick={() => setIsManualScoreMode(!isManualScoreMode)}
                className="text-sky-700 hover:text-sky-900 font-bold underline flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                {isManualScoreMode ? 'إعادة للحساب التلقائي' : 'تعديل النسبة'}
              </button>
            </div>
          </div>

          <div className="bg-sky-50/50 border border-sky-200/80 rounded-2xl p-4">
            <span className="text-xs text-sky-950 font-bold block mb-1">
              1- المرآة التشخيصية:
            </span>
            <p className="text-[11px] text-slate-600 leading-tight">
              تم استخدام المرآة في فحص كل حرف لملاحظة الانتكاس ومطابقة الفكين ورؤية المخرج بصرياً.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <span className="text-xs text-slate-900 font-bold block mb-1">
              2- خافض اللسان الطبي:
            </span>
            <p className="text-[11px] text-slate-600 leading-tight">
              تم فحص ارتكاز اللسان على اللثة والحنك الأعلى وعزل التداخلات النطقية بالخافض المعقم.
            </p>
          </div>
        </div>

        {/* Filter bar inside view */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 print:hidden">
          <div className="flex items-center gap-2 w-full sm:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
            <input
              type="text"
              placeholder="تصفية الحروف أو الكلمات..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pr-9 pl-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-hidden focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setLetterView('all'); setSearchTerm(''); setErrorOnlyFilter(!errorOnlyFilter); }}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                errorOnlyFilter
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {errorOnlyFilter ? 'عرض جميع الحروف الـ 28' : 'تحديد الحروف المضطربة'}
            </button>
              <span className="text-xs text-slate-500 font-semibold">
              (الظاهر: {filteredLetters.length} من 28)
            </span>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-7 sm:grid-cols-10 md:grid-cols-14 gap-1.5 print:hidden" aria-label="اختيار حرف للتشخيص">
          {ARABIC_LETTERS_LIST.map(letter => {
            const item = data.lettersResults[letter];
            const hasError = (['beginning', 'middle', 'end'] as const).some(position => item?.[position]?.production !== 'صحيح');
            const isTarget = student.targetLetters?.includes(letter);
            return <button type="button" key={letter} onClick={() => { setSelectedLetter(letter); setLetterView('single'); setErrorOnlyFilter(false); }} aria-pressed={letterView === 'single' && selectedLetter === letter} className={`aspect-square rounded-lg border text-base font-black transition-colors ${letterView === 'single' && selectedLetter === letter ? 'border-sky-900 bg-sky-800 text-white' : isTarget ? 'border-sky-300 bg-sky-100 text-sky-900' : hasError ? 'border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100' : 'border-slate-200 bg-white text-slate-700 hover:bg-sky-50'}`}>{letter}</button>;
          })}
        </div>

        {/* Matrix Table for 28 letters */}
        <div className="overflow-x-auto border border-sky-100 rounded-2xl mb-6 shadow-xs">
          <table className="w-full text-right text-xs border-collapse">
            <thead>
              <tr className="bg-sky-900 text-white text-[11px] font-bold">
                <th className="p-3 border border-sky-800 w-14 text-center">الحرف</th>
                <th className="p-3 border border-sky-800 w-28 text-center">المخرج</th>
                <th className="p-3 border border-sky-800">أول الكلمة (3 نماذج)</th>
                <th className="p-3 border border-sky-800">وسط الكلمة (3 نماذج)</th>
                <th className="p-3 border border-sky-800">آخر الكلمة (3 نماذج)</th>
                <th className="p-3 border border-sky-800 w-28 text-center">الحالة</th>
                <th className="p-3 border border-sky-800 w-20 text-center print:hidden">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredLetters.map(letter => {
                const info = ARABIC_LETTERS_MAP[letter];
                const item = data.lettersResults[letter];
                const isError =
                  (item?.beginning?.production && item.beginning.production !== 'صحيح') ||
                  (item?.middle?.production && item.middle.production !== 'صحيح') ||
                  (item?.end?.production && item.end.production !== 'صحيح');

                const begWords = info.examples.beginning.words;
                const midWords = info.examples.middle.words;
                const endWords = info.examples.end.words;
                const isNotesOpen = activeLetterNotes === letter;

                return (
                  <React.Fragment key={letter}>
                    <tr
                      className={`hover:bg-sky-50/40 transition-colors ${
                        isError ? 'bg-rose-50/40' : ''
                      }`}
                    >
                      {/* Letter badge */}
                      <td className="p-2.5 border border-slate-200 text-center font-black text-xl text-sky-950">
                        <div className="flex items-center justify-center gap-1">
                          <span>{letter}</span>
                          
                        </div>
                      </td>

                      {/* Classification */}
                      <td className="p-2.5 border border-slate-200 text-center font-bold text-slate-700 text-[11px]">
                        {info.classification}
                      </td>

                      {/* Beginning */}
                      <td className="p-2.5 border border-slate-200">
                        <div className="flex items-center gap-1 flex-wrap mb-1.5">
                          {begWords.map((w, idx) => (
                            <span
                              key={idx}
                              className="font-bold text-slate-900 bg-slate-100 hover:bg-sky-100 px-1.5 py-0.5 rounded text-[11px] cursor-pointer"
                              
                            >
                              {w.word}
                            </span>
                          ))}
                        </div>
                        <SavedSelect
                          value={item?.beginning?.production || 'صحيح'}
                          onChange={e =>
                            handlePositionChange(
                              letter,
                              'beginning',
                              e.target.value as any
                            )
                          }
                          className={`w-full text-[11px] p-1.5 rounded-lg border font-bold cursor-pointer ${
                            item?.beginning?.production === 'صحيح'
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                              : 'bg-rose-50 text-rose-900 border-rose-300'
                          }`}
                        >
                          <option value="صحيح">صحيح ✓</option>
                          <option value="إبدال">إبدال</option>
                          <option value="حذف">حذف</option>
                          <option value="تشويه">تشويه</option>
                          <option value="إضافة">إضافة</option>
                        </SavedSelect>
                      </td>

                      {/* Middle */}
                      <td className="p-2.5 border border-slate-200">
                        <div className="flex items-center gap-1 flex-wrap mb-1.5">
                          {midWords.map((w, idx) => (
                            <span
                              key={idx}
                              className="font-bold text-slate-900 bg-slate-100 hover:bg-sky-100 px-1.5 py-0.5 rounded text-[11px] cursor-pointer"
                              
                            >
                              {w.word}
                            </span>
                          ))}
                        </div>
                        <SavedSelect
                          value={item?.middle?.production || 'صحيح'}
                          onChange={e =>
                            handlePositionChange(
                              letter,
                              'middle',
                              e.target.value as any
                            )
                          }
                          className={`w-full text-[11px] p-1.5 rounded-lg border font-bold cursor-pointer ${
                            item?.middle?.production === 'صحيح'
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                              : 'bg-rose-50 text-rose-900 border-rose-300'
                          }`}
                        >
                          <option value="صحيح">صحيح ✓</option>
                          <option value="إبدال">إبدال</option>
                          <option value="حذف">حذف</option>
                          <option value="تشويه">تشويه</option>
                          <option value="إضافة">إضافة</option>
                        </SavedSelect>
                      </td>

                      {/* End */}
                      <td className="p-2.5 border border-slate-200">
                        <div className="flex items-center gap-1 flex-wrap mb-1.5">
                          {endWords.map((w, idx) => (
                            <span
                              key={idx}
                              className="font-bold text-slate-900 bg-slate-100 hover:bg-sky-100 px-1.5 py-0.5 rounded text-[11px] cursor-pointer"
                              
                            >
                              {w.word}
                            </span>
                          ))}
                        </div>
                        <SavedSelect
                          value={item?.end?.production || 'صحيح'}
                          onChange={e =>
                            handlePositionChange(
                              letter,
                              'end',
                              e.target.value as any
                            )
                          }
                          className={`w-full text-[11px] p-1.5 rounded-lg border font-bold cursor-pointer ${
                            item?.end?.production === 'صحيح'
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                              : 'bg-rose-50 text-rose-900 border-rose-300'
                          }`}
                        >
                          <option value="صحيح">صحيح ✓</option>
                          <option value="إبدال">إبدال</option>
                          <option value="حذف">حذف</option>
                          <option value="تشويه">تشويه</option>
                          <option value="إضافة">إضافة</option>
                        </SavedSelect>
                      </td>

                      {/* Result */}
                      <td className="p-2.5 border border-slate-200 text-center">
                        {isError ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-black text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full">
                            <AlertTriangle className="w-3 h-3" />
                            مضطرب
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            سليم ✓
                          </span>
                        )}
                      </td>

                      {/* Row Actions (Manual Details Edit) */}
                      <td className="p-2 border border-slate-200 text-center print:hidden">
                        <button
                          type="button"
                          onClick={() => setActiveLetterNotes(isNotesOpen ? null : letter)}
                          className={`p-1.5 rounded-lg border text-[11px] font-bold transition-colors cursor-pointer ${
                            isNotesOpen
                              ? 'bg-sky-700 text-white border-sky-800'
                              : 'bg-slate-100 hover:bg-sky-50 text-slate-700 border-slate-200'
                          }`}
                          title="تفاصيل وتعديل"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>

                    {/* Expandable Manual Edit Row for Notes & Substituted Letters */}
                    {isNotesOpen && (
                      <tr className="bg-sky-50/70 border-b-2 border-sky-200 print:hidden animate-fadeIn">
                        <td colSpan={7} className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="font-black text-sky-950 text-xs">
                            تفاصيل حرف [{letter}]:
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleSetLetterStateAllPositions(letter, 'صحيح')}
                                  className="text-[11px] bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-lg hover:bg-emerald-700 cursor-pointer"
                                >
                                  تعيين الكل كسليم ✓
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSetLetterStateAllPositions(letter, 'إبدال')}
                                  className="text-[11px] bg-rose-600 text-white font-bold px-2.5 py-1 rounded-lg hover:bg-rose-700 cursor-pointer"
                                >
                                  تعيين إبدال في جميع المواضع
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {/* Beginning Notes */}
                              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                                <span className="font-bold text-slate-700 text-[11px] block mb-1">
                                  ملاحظة / الحرف البديل في (أول الكلمة):
                                </span>
                                <SavedField
                                  type="text"
                                  placeholder="مثال: يبدل الراء بالياء (ينطق يمان)"
                                  aria-label="ملاحظات النطق" value={consistentDiagnosisNote(item?.beginning?.production, item?.beginning?.notes)}
                                  onChange={e => handleNotesChange(letter, 'beginning', e.target.value)}
                                  className="w-full p-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-medium"
                                />
                              </div>

                              {/* Middle Notes */}
                              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                                <span className="font-bold text-slate-700 text-[11px] block mb-1">
                                  ملاحظة / الحرف البديل في (وسط الكلمة):
                                </span>
                                <SavedField
                                  type="text"
                                  placeholder="مثال: يكرر الصوت أو يحذفه"
                                  aria-label="ملاحظات النطق" value={consistentDiagnosisNote(item?.middle?.production, item?.middle?.notes)}
                                  onChange={e => handleNotesChange(letter, 'middle', e.target.value)}
                                  className="w-full p-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-medium"
                                />
                              </div>

                              {/* End Notes */}
                              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                                <span className="font-bold text-slate-700 text-[11px] block mb-1">
                                  ملاحظة / الحرف البديل في (آخر الكلمة):
                                </span>
                                <SavedField
                                  type="text"
                                  placeholder="مثال: يحذف الحرف نهائياً"
                                  aria-label="ملاحظات النطق" value={consistentDiagnosisNote(item?.end?.production, item?.end?.notes)}
                                  onChange={e => handleNotesChange(letter, 'end', e.target.value)}
                                  className="w-full p-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-medium"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Conclusion / Summary notes with Auto-generate Button & Direct Manual Edit */}
        {data.summaryNeedsReview && <p role="status" className="rounded-lg bg-amber-50 p-3 text-amber-900">تغيّرت نتائج النطق. راجع الخلاصة أو أعد توليدها قبل الطباعة؛ لم نستبدل نصك المحفوظ تلقائياً.</p>}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="font-black text-slate-800 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-700" />
              الخلاصة الإكلينيكية<span className="print:hidden"> - قابلة للتعديل المباشر</span>:
            </label>

            {/* Smart Auto-Generate Button */}
            <button
              onClick={handleAutoGenerateSummary}
              className="flex items-center gap-2 bg-gradient-to-l from-sky-900 to-sky-700 hover:from-sky-800 hover:to-sky-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
            >
              <Wand2 className="w-3.5 h-3.5 text-amber-300" />
              توليد الخلاصة الإكلينيكية آلياً بناءً على التشخيص
            </button>
          </div>

          {generatedNotice && (
            <div className="p-2.5 rounded-xl bg-sky-100 border border-sky-300 text-sky-950 text-xs font-bold animate-pulse print:hidden">
              ✓ تم استخراج وتحليل بيانات جميع الحروف وتوليد التقرير الإكلينيكي بنجاح! يمكنك الآن تعديله يدوياً حسب الرغبة.
            </div>
          )}

          <SavedField multiline
            rows={5}
            aria-label="ملخص التشخيص" value={data.summaryConclusion}
            onChange={e => {
              const updated = { ...data, summaryConclusion: e.target.value };
              commitAssessment(updated);
            }}
            className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-xs text-slate-800 leading-relaxed font-semibold focus:ring-2 focus:ring-sky-600 focus:outline-hidden"
            placeholder="اكتب التقرير الإكلينيكي يدوياً أو انقر على 'توليد الخلاصة الإكلينيكية آلياً'..."
          />
        </div>

        {/* Official Specialist Signature Row Only */}
        <div className="pt-8 border-t border-slate-300 flex justify-center text-xs text-center">
          <div className="space-y-2.5 max-w-sm w-full bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
            <span className="text-slate-600 font-bold block text-xs">أخصائي تدريبات نطق</span>
            <span className="text-base font-black text-sky-950 block">
              {SCHOOL_KLICHE.specialistName}
            </span>
            <div className="h-0.5 w-40 mx-auto bg-sky-700/40 my-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

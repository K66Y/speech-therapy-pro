import { ARABIC_LETTERS_LIST } from '../data/arabicLettersData';
import type { ArabicLetterKey, CaseStudyData, DiagnosticAssessment } from '../types/speechTherapy';

const ERROR_TYPES = new Set(['حذف', 'إبدال', 'تشويه', 'إضافة']);
type ErrorType = 'حذف' | 'إبدال' | 'تشويه' | 'إضافة';

const extractErrorType = (value?: string): ErrorType | undefined =>
  [...ERROR_TYPES].find(type => value?.includes(type)) as ErrorType | undefined;

export function diagnosisCategoriesForTargets(
  targets: ArabicLetterKey[],
  source: string[] = []
): string[] {
  const errors = source.filter(value=>!value.includes('(')).map(extractErrorType).filter(Boolean) as ErrorType[];
  return targets.map((letter, index) => source.find(value=>value.includes('('+letter+')')) || `${errors[index] || errors[0] || 'قيد التقييم'} حرف (${letter})`);
}

export function linkCaseStudyClinicalFields(
  caseStudy: CaseStudyData,
  targets: ArabicLetterKey[],
  categories = caseStudy.student.diagnosisCategories || [caseStudy.student.diagnosisCategory]
): CaseStudyData {
  const diagnosisCategories = diagnosisCategoriesForTargets(targets, categories.filter(Boolean));
  const letters = targets.join('، ');
  return {
    ...caseStudy,
    student: {
      ...caseStudy.student,
      targetLetters: targets,
      diagnosisCategory: diagnosisCategories.join('، '),
      diagnosisCategories
    },
    clinicalInputKey: JSON.stringify([targets,diagnosisCategories,caseStudy.student.communicationDiagnoses || [],caseStudy.oralMotorExam,caseStudy.speechHistory,caseStudy.hearingStatus]),
    initialDiagnosis: [
      targets.length ? 'الحروف المستهدفة: ' + diagnosisCategories.join('، ') + '. تُراجع الأخطاء في مواضع الكلمة قبل تحديد مستوى التدريب.' : '',
      ...(caseStudy.student.communicationDiagnoses || []).map(d => d === 'stuttering' ? 'مسار التأتأة: توثّق مظاهر عدم الطلاقة وأثرها في المشاركة وتحدد الشدة في التقييم.' : 'مسار الحبسة الكلامية: يراجع التاريخ الطبي وتفحص مهارات الفهم والتعبير والتسمية والتواصل الوظيفي.'),
    ].filter(Boolean).join(' ') || 'تستكمل دراسة الحالة لتحديد مجال التدخل.',
    recommendations: [
      ...(targets.length ? ['تدريب الحروف (' + letters + ') في المواضع التي ثبتت فيها الصعوبة ثم قياس الأداء في كلمات جديدة.'] : []),
      ...(caseStudy.student.communicationDiagnoses || []).map(d => d === 'stuttering' ? 'اجمع عينة من الحوار والسرد وسجل التكرار والإطالة والوقفات والجهد. اسأل الطالب عن الراحة والتجنب واتفق معه على موقف مشاركة يهمه.' : 'حدد أولوية تواصل وظيفية من تقييم الفهم والتعبير، وجرّب صورة أو كلمة مفتاحية ثم سجل الاستجابة ودرجة التلميح.'),
      ...(caseStudy.oralMotorExam.breathing.type === 'فموي' ? ['راجع نمط التنفس الفموي المسجل وأثره الوظيفي قبل اختيار أي تدريب.'] : []),
      'راجع نتائج الفحص والتاريخ النمائي والسمعي مع الأسرة قبل اعتماد الأهداف.'
    ]
  };
}

export function applyStudentTargetsToAssessment(
  assessment: DiagnosticAssessment,
  targets: ArabicLetterKey[],
  categories: string[],
  previousTargets: ArabicLetterKey[] = []
): DiagnosticAssessment {
  const normalizedCategories = diagnosisCategoriesForTargets(targets, categories);
  const lettersResults = { ...assessment.lettersResults };

  const formerlyDiagnosed = [...new Set([...previousTargets, ...getDiagnosedTargetLetters(assessment)])];
  formerlyDiagnosed.filter(letter => !targets.includes(letter)).forEach(letter => {
    const result = lettersResults[letter];
    if (!result) return;
    lettersResults[letter] = {
      ...result,
      beginning: { ...result.beginning, production: 'صحيح', substitutedLetter: undefined, notes: 'نطق سليم' },
      middle: { ...result.middle, production: 'صحيح', substitutedLetter: undefined, notes: 'نطق سليم' },
      end: { ...result.end, production: 'صحيح', substitutedLetter: undefined, notes: 'نطق سليم' }
    };
  });

  targets.forEach((letter, index) => {
    const result = lettersResults[letter];
    if (!result) return;
    const production = extractErrorType(normalizedCategories[index]) || 'إبدال';
    const updatePosition = <T extends typeof result.beginning>(position: T): T => ({
      ...position,
      production,
      substitutedLetter: production === 'إبدال' ? position.substitutedLetter : undefined,
      notes: `${production} في الصوت المستهدف ويحتاج إلى تدريب وفق نتيجة التقييم.`
    });
    lettersResults[letter] = {
      ...result,
      beginning: updatePosition(result.beginning),
      middle: updatePosition(result.middle),
      end: updatePosition(result.end)
    };
  });

  return {
    ...assessment,
    lettersResults,
    primaryErrors: normalizedCategories,
    summaryNeedsReview: true
  };
}

export function getDiagnosedTargetLetters(
  assessment?: DiagnosticAssessment
): ArabicLetterKey[] {
  if (!assessment) return [];

  return ARABIC_LETTERS_LIST.filter(letter => {
    const result = assessment.lettersResults?.[letter];
    if (!result) return false;
    return [result.beginning, result.middle, result.end].some(position =>
      ERROR_TYPES.has(position.production)
    );
  });
}

export function getDiagnosisCategories(
  assessment: DiagnosticAssessment | undefined,
  targets: ArabicLetterKey[]
): string[] {
  if (!assessment) return [];

  return targets.map(letter => {
    const result = assessment.lettersResults?.[letter];
    const error = result && [result.beginning, result.middle, result.end]
      .map(position => position.production)
      .find(production => ERROR_TYPES.has(production));
    return `${error || 'اضطراب'} حرف (${letter})`;
  });
}

export function sameLetters(
  left: ArabicLetterKey[] | undefined,
  right: ArabicLetterKey[]
): boolean {
  return (left || []).length === right.length
    && (left || []).every((letter, index) => letter === right[index]);
}

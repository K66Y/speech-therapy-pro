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
  const errors = source.map(extractErrorType).filter(Boolean) as ErrorType[];
  return targets.map((letter, index) => `${errors[index] || errors[0] || 'إبدال'} حرف (${letter})`);
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
    initialDiagnosis: targets.length
      ? `اضطراب نطق وظيفي في الأصوات المستهدفة (${letters}) يتمثل في ${diagnosisCategories.join('، ')}، مع سلامة أعضاء النطق تشريحياً وفق الفحص الحالي.`
      : 'لم تُحدد أصوات مستهدفة بعد، ويُستكمل التشخيص بعد تسجيل نتائج التقييم النطقي.',
    recommendations: targets.length ? [
      `تدريب الأصوات المستهدفة (${letters}) بالتدرج من الصوت المفرد إلى المقاطع ثم الكلمات والجمل والتواصل وفق الأداء المسجل.`,
      `استخدام المرآة لتوفير تغذية راجعة بصرية عند تدريب مخارج الأصوات (${letters}).`,
      'تطبيق تدريب منزلي قصير ومنتظم، وتوثيق الاستجابة لمراجعتها في الجلسة التالية.'
    ] : ['استكمال التقييم وتحديد الأصوات المستهدفة قبل اعتماد خطة التدخل.']
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

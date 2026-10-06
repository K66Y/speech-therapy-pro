import { ARABIC_LETTERS_LIST } from '../data/arabicLettersData';
import type { ArabicLetterKey, DiagnosticAssessment } from '../types/speechTherapy';

const ERROR_TYPES = new Set(['حذف', 'إبدال', 'تشويه', 'إضافة']);

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

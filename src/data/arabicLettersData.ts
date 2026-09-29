import { ArabicLetterKey, LetterInfo } from '../types/speechTherapy';
import { LETTERS_PART_1 } from './lettersDataPart1';
import { LETTERS_PART_2 } from './lettersDataPart2';

export const ARABIC_LETTERS_LIST: ArabicLetterKey[] = [
  'أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ',
  'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص',
  'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق',
  'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي'
];

export const ARABIC_LETTERS_MAP: Record<ArabicLetterKey, LetterInfo> = {
  ...LETTERS_PART_1,
  ...LETTERS_PART_2
} as Record<ArabicLetterKey, LetterInfo>;

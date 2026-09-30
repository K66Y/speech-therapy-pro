import { HomeworkSheet } from '../types/speechTherapy';
import { ARABIC_LETTERS_MAP } from '../data/arabicLettersData';
export const homeworkPositions = ['أول الكلمة', 'وسط الكلمة', 'آخر الكلمة'] as const;
export function homeworkColumns(homework: HomeworkSheet) {
  const keys = ['beginning', 'middle', 'end'] as const;
  return homeworkPositions.map((position, column) => {
    const words = homework.wordsToPractice.filter(word => word.position === position).map(word => ({ ...word }));
    const examples = ARABIC_LETTERS_MAP[homework.targetLetter].examples[keys[column]].words;
    while (words.length < 3) {
      const word = examples.find(example => !words.some(existing => existing.word === example.word))?.word || '';
      words.push({ position, word, repetitionCount: 5 });
    }
    return words;
  });
}

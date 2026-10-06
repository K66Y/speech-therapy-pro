import { test } from 'node:test';
import assert from 'node:assert/strict';
import { consistentDiagnosisNote } from '../src/services/diagnosisNotes';
import { homeworkColumns } from '../src/services/homeworkGrid';
import { setDocumentHijriDate, getDocumentHijriDate, getDocumentGregorianDate } from '../src/services/dateService';
import type { HomeworkSheet } from '../src/types/speechTherapy';

test('diagnostic defaults follow result without overwriting custom notes', () => {
  assert.match(consistentDiagnosisNote('إبدال', 'نطق سليم'), /إبدال/);
  assert.match(consistentDiagnosisNote('حذف', consistentDiagnosisNote('إبدال')), /حذف/);
  assert.equal(consistentDiagnosisNote('إبدال', 'ملاحظة المعلم الخاصة'), 'ملاحظة المعلم الخاصة');
  assert.equal(consistentDiagnosisNote('صحيح', consistentDiagnosisNote('إبدال')), 'نطق سليم');
});
test('homework supplies three words per position and preserves extra saved words', () => {
  const homework = { targetLetter: 'ر', wordsToPractice: [{ word: 'مخصص', position: 'أول الكلمة', repetitionCount: 7 }] } as HomeworkSheet;
  const columns = homeworkColumns(homework);
  assert.deepEqual(columns.map(column => column.length), [3, 3, 3]);
  assert.equal(columns[0][0].word, 'مخصص');
  assert.equal(homework.wordsToPractice.length, 1);
  homework.wordsToPractice = [...columns.flat(), { word: 'إضافي', position: 'أول الكلمة', repetitionCount: 5 }];
  assert.equal(homeworkColumns(homework)[0][3].word, 'إضافي');
});
test('manual document date is normalized and shared with export', () => {
  assert.equal(setDocumentHijriDate('١٤٤٨/٠٤/١٩'), true);
  assert.equal(getDocumentHijriDate(), '\u2067هـ\u2069 \u20661448/04/19\u2069');
  assert.equal(getDocumentGregorianDate(), '');
  assert.equal(setDocumentHijriDate('33/14/1448'), false);
  setDocumentHijriDate('');
  assert.notEqual(getDocumentGregorianDate(), '');
});

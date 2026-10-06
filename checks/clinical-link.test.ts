import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_DIAGNOSTIC_ASSESSMENTS } from '../src/data/sampleData';
import { getDiagnosedTargetLetters, getDiagnosisCategories } from '../src/services/clinicalCaseLink';

test('the diagnosed disturbed letters become the single case target list', () => {
  const assessment = structuredClone(INITIAL_DIAGNOSTIC_ASSESSMENTS['std-001']);
  for (const result of Object.values(assessment.lettersResults)) {
    result.beginning.production = 'صحيح';
    result.middle.production = 'صحيح';
    result.end.production = 'صحيح';
  }
  assessment.lettersResults['أ'].beginning.production = 'إبدال';
  assessment.lettersResults['ر'].middle.production = 'حذف';
  assessment.lettersResults['ش'].end.production = 'تشويه';

  const targets = getDiagnosedTargetLetters(assessment);
  assert.deepEqual(targets, ['أ', 'ر', 'ش']);
  assert.deepEqual(getDiagnosisCategories(assessment, targets), [
    'إبدال حرف (أ)',
    'حذف حرف (ر)',
    'تشويه حرف (ش)'
  ]);
});

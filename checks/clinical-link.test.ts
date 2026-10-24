import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_CASE_STUDIES, INITIAL_DIAGNOSTIC_ASSESSMENTS } from '../src/data/sampleData';
import { applyStudentTargetsToAssessment, getDiagnosedTargetLetters, getDiagnosisCategories, linkCaseStudyClinicalFields } from '../src/services/clinicalCaseLink';

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

test('editing case-study targets updates diagnosis text, recommendations, and assessment', () => {
  const study = structuredClone(INITIAL_CASE_STUDIES['std-001']);
  const linkedStudy = linkCaseStudyClinicalFields(study, ['ت', 'ش'], ['حذف', 'تشويه']);
  assert.deepEqual(linkedStudy.student.diagnosisCategories, ['حذف حرف (ت)', 'تشويه حرف (ش)']);
  assert.match(linkedStudy.initialDiagnosis, /ت/);
  assert.match(linkedStudy.initialDiagnosis, /ش/);
  assert.ok(linkedStudy.recommendations.every(item => item.includes('ت') || !item.includes('الأصوات')));

  const assessment = applyStudentTargetsToAssessment(
    structuredClone(INITIAL_DIAGNOSTIC_ASSESSMENTS['std-001']),
    ['ت', 'ش'],
    linkedStudy.student.diagnosisCategories,
    study.student.targetLetters
  );
  assert.deepEqual(getDiagnosedTargetLetters(assessment), ['ت', 'ش']);
  assert.equal(assessment.lettersResults['ت'].beginning.production, 'حذف');
  assert.equal(assessment.lettersResults['ش'].end.production, 'تشويه');
});

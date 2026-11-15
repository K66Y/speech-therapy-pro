import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_DIAGNOSTIC_DOMAINS, diagnosticDomainsFor, recommendationFor } from '../src/data/diagnosticDomains';
import { INITIAL_DIAGNOSTIC_ASSESSMENTS } from '../src/data/sampleData';

test('all six domains remain unevaluated until findings are recorded', () => {
  const domains = Object.values(DEFAULT_DIAGNOSTIC_DOMAINS);
  assert.equal(domains.length, 6);
  for (const domain of domains) {
    assert.equal(domain.status, 'لم يُقيّم');
    assert.match(domain.evaluation, /لم يُستكمل تقييم/);
  }
});

test('legacy generated evaluation and recommendation upgrade without replacing custom text', () => {
  const assessment = structuredClone(INITIAL_DIAGNOSTIC_ASSESSMENTS['std-001']);
  assessment.extendedAssessments = structuredClone(DEFAULT_DIAGNOSTIC_DOMAINS);
  assessment.extendedAssessments.fluency.evaluation = 'تُجمع عينة من الكلام التلقائي والقراءة المناسبة للعمر.';
  assessment.extendedAssessments.fluency.status = 'لم يُقيّم';
  assessment.recommendationText = 'يوصى بحاجة الطالب إلى تدريب متخصص وفق نتائج التقييم، مع متابعة التقدم وتحديث الأهداف بما يتناسب مع استجابته.';
  assert.equal(diagnosticDomainsFor(assessment).fluency.status, 'لم يُقيّم');
  assert.equal(diagnosticDomainsFor(assessment).fluency.evaluation, DEFAULT_DIAGNOSTIC_DOMAINS.fluency.evaluation);
  assert.match(recommendationFor(assessment).text, /بالتدرج من نطق الصوت بشكل مفرد/);

  assessment.extendedAssessments.fluency.evaluation = 'ملاحظة مخصصة من الأخصائي.';
  assert.equal(diagnosticDomainsFor(assessment).fluency.evaluation, 'ملاحظة مخصصة من الأخصائي.');
});

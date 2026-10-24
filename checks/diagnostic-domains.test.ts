import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_DIAGNOSTIC_DOMAINS, diagnosticDomainsFor, recommendationFor } from '../src/data/diagnosticDomains';
import { INITIAL_DIAGNOSTIC_ASSESSMENTS } from '../src/data/sampleData';

test('supporting diagnostic evaluations use the approved concise clinical wording', () => {
  assert.equal(DEFAULT_DIAGNOSTIC_DOMAINS.fluency.evaluation, 'لا يوجد لدى الطالب أي مشكلات في طلاقة الكلام.');
  assert.match(DEFAULT_DIAGNOSTIC_DOMAINS.receptiveLanguage.evaluation, /الاستجابة وثبات الفهم/);
  assert.match(DEFAULT_DIAGNOSTIC_DOMAINS.expressiveLanguage.evaluation, /طول الجملة وتنوع المفردات/);
  assert.match(DEFAULT_DIAGNOSTIC_DOMAINS.vocabulary.evaluation, /سرعة استدعائها واستخدامها الوظيفي/);
  assert.match(DEFAULT_DIAGNOSTIC_DOMAINS.eyeContact.evaluation, /التواصل البصري أثناء الحوار/);
});

test('legacy generated evaluation and recommendation upgrade without replacing custom text', () => {
  const assessment = structuredClone(INITIAL_DIAGNOSTIC_ASSESSMENTS['std-001']);
  assessment.extendedAssessments = structuredClone(DEFAULT_DIAGNOSTIC_DOMAINS);
  assessment.extendedAssessments.fluency.evaluation = 'تُجمع عينة من الكلام التلقائي والقراءة المناسبة للعمر.';
  assessment.extendedAssessments.fluency.status = 'لم يُقيّم';
  assessment.recommendationText = 'يوصى بحاجة الطالب إلى تدريب متخصص وفق نتائج التقييم، مع متابعة التقدم وتحديث الأهداف بما يتناسب مع استجابته.';
  assert.equal(diagnosticDomainsFor(assessment).fluency.status, 'ضمن المتوقع');
  assert.equal(diagnosticDomainsFor(assessment).fluency.evaluation, DEFAULT_DIAGNOSTIC_DOMAINS.fluency.evaluation);
  assert.match(recommendationFor(assessment).text, /بالتدرج من نطق الصوت بشكل مفرد/);

  assessment.extendedAssessments.fluency.evaluation = 'ملاحظة مخصصة من الأخصائي.';
  assert.equal(diagnosticDomainsFor(assessment).fluency.evaluation, 'ملاحظة مخصصة من الأخصائي.');
});

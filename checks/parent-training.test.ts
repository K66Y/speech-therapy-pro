import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parentTrainingGuide, parentTrainingGuideForGuidance, shouldUpgradeParentTrainingGuide } from '../src/services/parentTrainingGuide';

test('parent home-training guidance is complete and specific to each target letter', () => {
  const raa = parentTrainingGuide('ر');
  const baa = parentTrainingGuide('ب');
  assert.match(raa, /حرف \(ر\)/);
  assert.match(raa, /معرفة المخرج/);
  assert.match(raa, /الحركات القصيرة/);
  assert.match(raa, /أول الكلمة/);
  assert.match(raa, /التغذية الراجعة/);
  assert.notEqual(raa, baa);
});

test('each parent guidance choice generates a matching training method', () => {
  const mirror = parentTrainingGuideForGuidance('ر', 'استخدم المرآة للملاحظة البصرية وفق توجيهات المعلم.');
  const vowels = parentTrainingGuideForGuidance('ر', 'مراجعة الحرف مع الحركات القصيرة ثم الحركات الطويلة.');
  const beginning = parentTrainingGuideForGuidance('ر', 'التدريب على الحرف في أول الكلمة باستخدام البطاقات.');
  const generalization = parentTrainingGuideForGuidance('ر', 'شجع الطالب على استخدام الحرف في حديث يومي قصير.');
  const shortSession = parentTrainingGuideForGuidance('ر', 'اجعل وقت التدريب قصيراً وهادئاً، وقدم نموذجاً واضحاً.');
  assert.match(mirror, /تدريب المرآة/);
  assert.match(vowels, /تدريب الحركات/);
  assert.match(beginning, /أول الكلمة/);
  assert.match(generalization, /الحديث اليومي/);
  assert.match(shortSession, /جلسة منزلية قصيرة/);
  assert.equal(new Set([mirror, vowels, beginning, generalization, shortSession]).size, 5);
});

test('legacy generic parent guidance is upgraded without replacing a detailed custom guide', () => {
  assert.equal(shouldUpgradeParentTrainingGuide('التدريب أمام المرآة حسب النموذج الذي يوضحه المعلم للحرف المستهدف.'), true);
  assert.equal(shouldUpgradeParentTrainingGuide('تعليمات خاصة كتبها المعلم لهذه الحالة ولا ينبغي استبدالها.'), false);
});

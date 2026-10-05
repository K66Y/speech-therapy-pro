import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parentTrainingGuide, shouldUpgradeParentTrainingGuide } from '../src/services/parentTrainingGuide';

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

test('legacy generic parent guidance is upgraded without replacing a detailed custom guide', () => {
  assert.equal(shouldUpgradeParentTrainingGuide('التدريب أمام المرآة حسب النموذج الذي يوضحه المعلم للحرف المستهدف.'), true);
  assert.equal(shouldUpgradeParentTrainingGuide('تعليمات خاصة كتبها المعلم لهذه الحالة ولا ينبغي استبدالها.'), false);
});

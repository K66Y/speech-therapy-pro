import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fieldChoices } from '../src/data/fieldChoices';

test('clinical documentation fields have multiple contextual choices', () => {
  for (const label of ['التاريخ الطبي','تاريخ ظهور الصعوبة','الفحص السمعي','السلوك والتواصل الصفي','المنهجية الإكلينيكية','تفاصيل الهدف','خط الأساس','معيار النجاح','أداة التقييم','ملاحظة الهدف','ملاحظات اللسان','التوصيات','الحالة الختامية','ملخص التشخيص','متطلبات الدعم الأسري']) {
    assert.ok(fieldChoices(label, 'س').length >= 4, label);
  }
});
test('target sound changes goals, while goal notes remain observations', () => {
  assert.ok(fieldChoices('تفاصيل الهدف', 'س').every(text => text.includes('(س)')));
  assert.ok(fieldChoices('ملاحظة الهدف', 'س').includes('لم تُسجل ملاحظة بعد.'));
});
test('identifiers have no invented choices and date menu uses Hijri', () => {
  assert.deepEqual(fieldChoices('اسم الطالب'), []);
  assert.deepEqual(fieldChoices('السجل المدني'), []);
  assert.equal(fieldChoices('تاريخ الجلسة').length, 61);
  assert.ok(fieldChoices('تاريخ الجلسة').every(text => text.includes('هـ')));
});

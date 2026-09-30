import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatPercentages } from '../src/services/displayText';
test('percentages stay adjacent and isolated in Arabic prose', () => {
  assert.equal(formatPercentages('الهدف ٩٠ ٪ والمحقق 75 %.'), 'الهدف \u206690%\u2069 والمحقق \u206675%\u2069.');
  assert.equal(formatPercentages('تحسن +12.5%'), 'تحسن \u2066+12.5%\u2069');
  assert.equal(formatPercentages(formatPercentages('85%')), formatPercentages('85%'));
  assert.equal(formatPercentages('1448/04/19'), '1448/04/19');
});

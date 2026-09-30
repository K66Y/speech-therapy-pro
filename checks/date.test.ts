import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatHijriDate, getLiveHijriDate, normalizeDigits } from '../src/services/dateService';
import { displayText } from '../src/services/displayText';

test('legacy Hijri dates retain their date in day/month/year order', () => {
  assert.equal(formatHijriDate('1447/02/02 هـ'), '\u206602/02/1447\u2069 هـ');
  assert.equal(formatHijriDate('١٤٤٧/٠٢/٢ هـ'), '\u206602/02/1447\u2069 هـ');
  assert.equal(formatHijriDate(formatHijriDate('1447/02/02')), formatHijriDate('1447/02/02'));
});
test('invalid dates never become a fabricated Hijri date', () => {
  assert.equal(formatHijriDate('2026/09/29'), '2026/09/29');
  assert.equal(formatHijriDate('1447/13/34'), '1447/13/34');
  assert.equal(getLiveHijriDate(new Date('invalid')), 'التاريخ الهجري غير متاح');
});
test('Arabic and Persian digits and terminology use the requested presentation', () => {
  assert.equal(normalizeDigits('٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹'), '01234567890123456789');
  assert.equal(displayText('٨٨٪ ارتداد الفونيم التوقيع بالعلم'), '\u206688%\u2069 انتكاس الصوتي التوقيع');
});

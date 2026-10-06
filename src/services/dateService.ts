/**
 * خدمة التواريخ الحية الذكية (هجري وميلادي) لمنظومة تدريبات النطق والتخاطب
 * تربط جميع النماذج والمستندات بتاريخ اليوم الفعلي تلقائياً
 */

export interface DynamicDateInfo {
  hijri: string;
  gregorian: string;
  combined: string;
}

let documentDate = '';
export function setDocumentHijriDate(value: string): boolean {
  if (!value.trim()) { documentDate = ''; return true; }
  const formatted = formatHijriDate(value);
  if (!formatted.startsWith('\u2067هـ\u2069')) return false;
  documentDate = formatted;
  return true;
}
export function getDocumentHijriDate(): string { return documentDate || getLiveHijriDate(); }
export function getDocumentGregorianDate(): string { return documentDate ? '' : getLiveGregorianDate(); }

/** Keep stored Arabic/Persian numerals readable with the application's 123 convention. */
export function normalizeDigits(value: string | number): string {
  return String(value).replace(/[٠-٩۰-۹]/g, digit => String(digit.charCodeAt(0) - (digit <= '٩' ? 0x660 : 0x6f0)));
}

/** Normalize old YYYY/MM/DD records without changing the calendar or the saved date. */
export function formatHijriDate(value: string): string {
  const clean = normalizeDigits(value).replace(/[\u200e\u200f\u202a-\u202e\u2066-\u2069]/g, '').trim();
  const match = clean.match(/^(?:هـ\s*)?(\d{1,4})[\/.-](\d{1,2})[\/.-](\d{1,4})(?:\s*هـ)?$/);
  if (!match) return clean;
  const [, first, middle, last] = match;
  const yearFirst = first.length === 4;
  const year = yearFirst ? first : last;
  const day = yearFirst ? last : first;
  if (year.length !== 4 || Number(year) >= 1700 || Number(middle) < 1 || Number(middle) > 12 || Number(day) < 1 || Number(day) > 30) return clean;
  // Separate bidi isolates keep the era marker and YYYY/MM/DD order stable in screen, print, PDF and Word.
  return `\u2067هـ\u2069 \u2066${year}/${middle.padStart(2, '0')}/${day.padStart(2, '0')}\u2069`;
}

/**
 * الحصول على التاريخ الهجري الحقيقي اليومي المعتمد
 */
export function getLiveHijriDate(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const parts = formatter.formatToParts(date);
    const day = parts.find(p => p.type === 'day')?.value;
    const month = parts.find(p => p.type === 'month')?.value;
    const year = parts.find(p => p.type === 'year')?.value;
    if (!day || !month || !year || formatter.resolvedOptions().calendar !== 'islamic-umalqura') return 'التاريخ الهجري غير متاح';
    return formatHijriDate(`${day}/${month}/${year}`);
  } catch {
    return 'التاريخ الهجري غير متاح';
  }
}

/**
 * الحصول على التاريخ الميلادي الحقيقي المنسق بالعربية
 */
export function getLiveGregorianDate(date: Date = new Date()): string {
  if (Number.isNaN(date.getTime())) return 'التاريخ غير متاح';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `\u2067م\u2069 \u2066${year}/${month}/${day}\u2069`;
}

/**
 * الحصول على حزمة التاريخ الكاملة (هجري وميلادي)
 */
export function getLiveDateInfo(date: Date = new Date()): DynamicDateInfo {
  const hijri = getLiveHijriDate(date);
  const gregorian = getLiveGregorianDate(date);
  return {
    hijri,
    gregorian,
    combined: `${hijri} الموافق (${gregorian})`
  };
}

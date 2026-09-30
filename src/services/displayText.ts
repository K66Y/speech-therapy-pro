import { normalizeDigits } from './dateService';

/** Keep percentages together and in number-then-sign order in RTL documents. */
export function formatPercentages(value: string): string {
  return normalizeDigits(value).replaceAll('٪', '%').replace(/\u2066?([+-]?\d+(?:[.,]\d+)?)[ \t\u00a0]*%\u2069?/g, '\u2066$1%\u2069');
}

/** Presentation only: legacy records remain unchanged until the teacher saves an edit. */
export function displayText(value: string | number | undefined | null): string {
  return formatPercentages(String(value ?? '')).replace(/الفونيم|الفينيوم/g, 'الصوتي').replace(/فونيم|فينيوم/g, 'صوتي').replaceAll('ارتداد', 'انتكاس').replaceAll('التوقيع بالعلم', 'التوقيع');
}

export function displayBodyText(value: string | undefined): string {
  return displayText(value).replace(/أخصائي تدريبات نطق|اخصائي تدريبات نطق/g, 'المعلم');
}

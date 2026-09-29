import { normalizeDigits } from './dateService';

/** Presentation only: legacy records remain unchanged until the teacher saves an edit. */
export function displayText(value: string | number | undefined | null): string {
  return normalizeDigits(value ?? '').replaceAll('٪', '%').replace(/الفونيم|الفينيوم/g, 'الصوتي').replace(/فونيم|فينيوم/g, 'صوتي').replaceAll('ارتداد', 'انتكاس').replaceAll('التوقيع بالعلم', 'التوقيع');
}

export function displayBodyText(value: string | undefined): string {
  return displayText(value).replace(/أخصائي تدريبات نطق|اخصائي تدريبات نطق/g, 'المعلم');
}

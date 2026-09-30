const defaults: Record<string, string> = {
  'صحيح': 'نطق سليم',
  'إبدال': 'سُجّل إبدال للصوت المستهدف في هذا الموضع. يُحدّد الصوت البديل من ملاحظة نطق الطالب، ولا يُفترض تلقائياً.',
  'حذف': 'سُجّل حذف للصوت المستهدف في هذا الموضع. تُراجع عينة النطق وتُوثّق الكلمة التي ظهر فيها الحذف.',
  'تشويه': 'سُجّل تشويه في نطق الصوت المستهدف في هذا الموضع. تُوصف طبيعة النطق حسب العينة المسموعة.',
  'إضافة': 'سُجّلت إضافة صوت في هذا الموضع. يُحدّد الصوت المضاف وموقعه من عينة النطق.'
};
export function consistentDiagnosisNote(production?: string, note = ''): string {
  const automatic = !note.trim() || ['سليم', 'نطق سليم', ...Object.values(defaults)].includes(note.trim());
  return automatic && production ? (defaults[production] || note) : note;
}

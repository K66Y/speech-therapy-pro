import React, { useState } from 'react';
import { SCHOOL_KLICHE } from '../data/sampleData';
import { getDocumentHijriDate, getDocumentGregorianDate, setDocumentHijriDate } from '../services/dateService';

interface OfficialHeaderProps {
  documentTitle: string;
  subTitle?: string;
  studentName?: string;
  nationalId?: string;
  grade?: string;
  showStudentBar?: boolean;
}

export const OfficialHeader: React.FC<OfficialHeaderProps> = ({
  documentTitle, subTitle, studentName, nationalId, grade, showStudentBar = true
}) => {
  const [editingDate, setEditingDate] = useState(false);
  const [draftDate, setDraftDate] = useState('');
  const [dateError, setDateError] = useState('');
  const currentDateHijri = getDocumentHijriDate();
  const currentDateGregorian = getDocumentGregorianDate();

  return (
    <div className="official-kliche-container bg-white border border-sky-900/20 rounded-2xl p-4 shadow-xs mb-6 print:border-none print:shadow-none print:p-0 print:mb-5">
      <div className="official-header-grid grid grid-cols-3 gap-3 items-center border-b border-sky-900/15 pb-4" dir="rtl">
        <div className="text-right space-y-0.5">
          <p className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">{SCHOOL_KLICHE.line1}</p>
          <p className="text-xs sm:text-sm font-bold text-sky-900 leading-tight">{SCHOOL_KLICHE.line2}</p>
          <p className="text-[10px] sm:text-xs font-semibold text-slate-600 leading-tight">{SCHOOL_KLICHE.line3}</p>
          <p className="text-[10px] sm:text-xs font-bold text-sky-950 leading-tight">{SCHOOL_KLICHE.line4}</p>
        </div>

        <div className="text-center flex items-center justify-center h-28 sm:h-36 overflow-hidden">
          <img src="/ministry-of-education-logo.jpg" alt="شعار وزارة التعليم" className="h-full w-auto max-w-none object-contain scale-[2.1] mix-blend-multiply" />
        </div>

        <div className="relative flex items-start justify-start text-[10px] sm:text-xs text-slate-600" dir="ltr">
          <div className="flex flex-col items-start">
            <span className="text-slate-500" dir="rtl">التاريخ:</span>
            <bdi className="font-black text-sky-950" dir="ltr">{currentDateHijri}</bdi>
            <bdi className="font-semibold text-slate-700" dir="ltr">{currentDateGregorian}</bdi>
            <div className="print:hidden" dir="rtl">
              <button type="button" className="text-sky-800 mt-2" onClick={() => { setDraftDate(currentDateHijri.replace(/[\u2066-\u2069]/g, '').replace(/^هـ\s*|\s*هـ$/g, '')); setEditingDate(true); }}>✎ تعديل تاريخ النموذج</button>
              {editingDate && <div className="bg-white border rounded-lg p-2 space-y-2">
                <label>التاريخ الهجري (سنة/شهر/يوم)<input aria-label="تاريخ النموذج الهجري" dir="ltr" className="w-full border rounded p-2" value={draftDate} onChange={e => setDraftDate(e.target.value)} /></label>
                <p>يسري على طباعة وتصدير النماذج في هذه الجلسة، ولا يغيّر تواريخ السجلات المحفوظة.</p>
                {dateError && <p role="alert">{dateError}</p>}
                <button type="button" className="bg-emerald-700 text-white rounded p-2" onClick={() => { if (setDocumentHijriDate(draftDate)) { setEditingDate(false); setDateError(''); } else setDateError('اكتب تاريخاً هجرياً صحيحاً مثل 1448/04/19'); }}>حفظ</button>
                <button type="button" className="p-2" onClick={() => setEditingDate(false)}>إلغاء</button>
                <button type="button" onClick={() => { setDocumentHijriDate(''); setEditingDate(false); }}>العودة لتاريخ اليوم</button>
              </div>}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <h1 className="text-lg md:text-xl font-black text-sky-950 tracking-wide">{documentTitle}</h1>
        {subTitle && <p className="text-xs text-slate-600 mt-1 font-semibold">{subTitle}</p>}
      </div>

      {showStudentBar && studentName && (
        <div className="mt-3 pt-3 border-t border-sky-100 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-sky-50/50 p-3 rounded-xl border border-sky-200/50 print:bg-transparent print:border-slate-300">
          <div><span className="text-slate-500 block text-[11px]">اسم الطالب:</span><span className="font-black text-slate-900 text-sm">{studentName}</span></div>
          <div><span className="text-slate-500 block text-[11px]">السجل المدني:</span><span className="font-bold text-slate-800">{nationalId || '—'}</span></div>
          <div><span className="text-slate-500 block text-[11px]">الصف / الفصل:</span><span className="font-bold text-slate-800">{grade || '—'}</span></div>
        </div>
      )}
    </div>
  );
};

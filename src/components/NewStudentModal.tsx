import React, { useState } from 'react';
import { StudentProfile, ArabicLetterKey } from '../types/speechTherapy';
import { ARABIC_LETTERS_LIST } from '../data/arabicLettersData';
import { SPECIALIST_NAME } from '../data/sampleData';
import { getLiveHijriDate } from '../services/dateService';
import { UserPlus, X, Check, AlertCircle } from 'lucide-react';

interface NewStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (newStudent: StudentProfile, initialTargetLetters: ArabicLetterKey[]) => void;
}

export const NewStudentModal: React.FC<NewStudentModalProps> = ({
  isOpen,
  onClose,
  onAddStudent
}) => {
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [grade, setGrade] = useState('الصف الأول الابتدائي');
  const [classRoom, setClassRoom] = useState('فصل (أ)');
  const [age, setAge] = useState('6–7 سنوات (تقديري)');
  const [guardianName, setGuardianName] = useState('');
  const [diagnosisCategories, setDiagnosisCategories] = useState<string[]>(['إبدال']);
  const [customDiagnosis, setCustomDiagnosis] = useState('');
  const [targetLetters, setTargetLetters] = useState<ArabicLetterKey[]>(['ر']);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const ageByGrade: Record<string, string> = {
    'الروضة / التمهيدي': '5–6 سنوات (تقديري)',
    'الصف الأول الابتدائي': '6–7 سنوات (تقديري)',
    'الصف الثاني الابتدائي': '7–8 سنوات (تقديري)',
    'الصف الثالث الابتدائي': '8–9 سنوات (تقديري)',
    'الصف الرابع الابتدائي': '9–10 سنوات (تقديري)',
    'الصف الخامس الابتدائي': '10–11 سنة (تقديري)',
    'الصف السادس الابتدائي': '11–12 سنة (تقديري)',
    'المرحلة المتوسطة': '12–15 سنة (تقديري)'
  };

  const toggleDiagnosis = (diagnosis: string) => setDiagnosisCategories(current =>
    current.includes(diagnosis) ? current.filter(item => item !== diagnosis) : [...current, diagnosis]
  );
  const toggleTargetLetter = (letter: ArabicLetterKey) => setTargetLetters(current =>
    current.includes(letter) ? current.filter(item => item !== letter) : [...current, letter]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage('يرجى إدخال اسم الطالب كاملاً');
      return;
    }
    if (!nationalId.trim()) {
      setErrorMessage('يرجى إدخال رقم السجل المدني');
      return;
    }
    if (!targetLetters.length) {
      setErrorMessage('يرجى اختيار حرف واحد على الأقل للخطة');
      return;
    }

    const newId = `std-${Date.now()}`;
    const newStudent: StudentProfile = {
      id: newId,
      fullName: fullName.trim(),
      nationalId: nationalId.trim(),
      age: age.trim() || '7 سنوات',
      grade: grade.trim(),
      classRoom: classRoom.trim(),
      guardianName: guardianName.trim() || `ولي أمر الطالب ${fullName.trim()}`,
      referralDate: getLiveHijriDate(),
      specialistName: SPECIALIST_NAME,
      diagnosisCategory: [...diagnosisCategories, customDiagnosis.trim()].filter(Boolean).join('، '),
      diagnosisCategories: [...diagnosisCategories, customDiagnosis.trim()].filter(Boolean),
      targetLetters,
      status: 'active'
    };

    onAddStudent(newStudent, targetLetters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-sky-100 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-700/60 border border-sky-400/40 flex items-center justify-center text-amber-300">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black">تسجيل ملف طالب جديد في برنامج التخاطب</h3>
              <p className="text-xs text-sky-200">
                إضافة بيانات الطالب واعتماد الخطة التشخيصية والتأهيلية المعتمدة
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-sky-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl flex items-center gap-2 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Student Core Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                اسم الطالب الكامل <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="مثال: خالد محمد ناصر القحطاني"
                value={fullName}
                onChange={e => {
                  setFullName(e.target.value);
                  setErrorMessage('');
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                السجل المدني (رقم الهوية) <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={10}
                placeholder="10 أرقام (مثال: 1123456789)"
                value={nationalId}
                onChange={e => {
                  setNationalId(e.target.value);
                  setErrorMessage('');
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden font-mono font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">الصف الدراسي</label>
              <select
                value={grade}
                onChange={e => { const nextGrade = e.target.value; setGrade(nextGrade); setAge(ageByGrade[nextGrade] || ''); }}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden font-semibold"
              >
                <option value="الروضة / التمهيدي">الروضة / التمهيدي</option>
                <option value="الصف الأول الابتدائي">الصف الأول الابتدائي</option>
                <option value="الصف الثاني الابتدائي">الصف الثاني الابتدائي</option>
                <option value="الصف الثالث الابتدائي">الصف الثالث الابتدائي</option>
                <option value="الصف الرابع الابتدائي">الصف الرابع الابتدائي</option>
                <option value="الصف الخامس الابتدائي">الصف الخامس الابتدائي</option>
                <option value="الصف السادس الابتدائي">الصف السادس الابتدائي</option>
                <option value="المرحلة المتوسطة">المرحلة المتوسطة</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">الفصل</label>
              <input
                type="text"
                placeholder="مثال: فصل (أ) أو فصل (1)"
                value={classRoom}
                onChange={e => setClassRoom(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">العمر الزمني</label>
              <input type="text" value={age} readOnly className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-600" />
            </div>
          </div>

          {/* Guardian Info */}
          <div className="bg-sky-50/50 p-3.5 rounded-2xl border border-sky-100 space-y-3">
            <span className="font-black text-sky-950 block text-xs">بيانات ولي الأمر والتواصل</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 block mb-1">اسم ولي الأمر</label>
                <input type="text" placeholder="اسم الأب أو الأم" value={guardianName} onChange={e => setGuardianName(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden" />
              </div>
            </div>
          </div>

          {/* Speech Therapy Clinical Needs */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3">
            <span className="font-black text-slate-900 block text-xs">
              التشخيص المبدئي والصوت المستهدف
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">نوع الاضطراب النطقي (يمكن اختيار أكثر من نوع)</label>
                <div className="grid grid-cols-2 gap-2">
                  {['إبدال', 'حذف', 'تشويه', 'إضافة', 'اضطراب متعدد الأصوات', 'أخرى'].map(item => (
                    <label key={item} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2 font-semibold">
                      <input type="checkbox" checked={diagnosisCategories.includes(item)} onChange={() => toggleDiagnosis(item)} />{item}
                    </label>
                  ))}
                </div>
                <input type="text" value={customDiagnosis} onChange={e => setCustomDiagnosis(e.target.value)} placeholder="تفصيل أو اضطراب إضافي (اختياري)" className="mt-2 w-full p-2.5 bg-white border border-slate-200 rounded-xl" />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">الحروف المستهدفة (اختر حرفًا أو أكثر)</label>
                <div className="grid grid-cols-7 gap-1.5 rounded-xl border border-slate-200 bg-white p-2">
                  {ARABIC_LETTERS_LIST.map(letter => (
                    <button type="button" key={letter} onClick={() => toggleTargetLetter(letter)} className={`rounded-md border p-1.5 font-black ${targetLetters.includes(letter) ? 'bg-sky-800 text-white border-sky-900' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>{letter}</button>
                  ))}
                </div>
                <p className="mt-1 text-[11px] text-slate-500">المحدد: {targetLetters.length ? targetLetters.join('، ') : 'اختر حرفًا واحدًا على الأقل'}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              حفظ وتسجيل ملف الطالب
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

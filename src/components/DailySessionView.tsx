import React, { useEffect, useState } from 'react';
import {
  FileDown,
  Printer,
  Calendar,
  CheckCircle2,
  Clock,
  Wrench,
  Eye,
  Plus,
  Smile,
  Award
} from 'lucide-react';
import { DailySessionLog, StudentProfile, ShortTermPlan, CommunicationDiagnosis } from '../types/speechTherapy';
import { OfficialHeader } from './OfficialHeader';
import { SCHOOL_KLICHE } from '../data/sampleData';
import { triggerOfficialPrint } from '../services/printService';
import { ARABIC_LETTERS_LIST } from '../data/arabicLettersData';
import { getLiveHijriDate } from '../services/dateService';
import { formatHijriDate } from '../services/dateService';
import { EditableText } from './EditableText';
import { SavedField } from './SavedField';
import { SavedSelect } from './SavedSelect';
import { ChoicePicker, homeworkSuggestions, sessionNotesSuggestions } from './ChoicePicker';
import { COMMUNICATION_THERAPY_GUIDES } from '../data/communicationTherapyGuides';

interface DailySessionViewProps {
  student: StudentProfile;
  sessions: DailySessionLog[];
  onAddSession: (session: DailySessionLog) => void;
  onUpdateSession: (session: DailySessionLog) => void;
  onDeleteSession: (id: string) => void;
  shortTermPlan: ShortTermPlan;
  onUpdateShortTermPlan: (updated: ShortTermPlan) => void;
}

export const DailySessionView: React.FC<DailySessionViewProps> = ({
  student,
  sessions,
  onAddSession, onUpdateSession, onDeleteSession, shortTermPlan, onUpdateShortTermPlan
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [targetLetter, setTargetLetter] = useState(student.targetLetters?.[0] || sessions[0]?.targetLetter || 'ر');
  const availableDiagnoses = student.communicationDiagnoses || [];
  const availableTracks = [...(student.targetLetters?.length ? ['letters' as const] : []), ...availableDiagnoses];
  const [trainingType, setTrainingType] = useState<DailySessionLog['trainingType']>(student.targetLetters?.length ? 'letters' : availableDiagnoses[0] || 'letters');
  const [completeCurrentGoal, setCompleteCurrentGoal] = useState(false);
  useEffect(() => { setTargetLetter(student.targetLetters?.[0] || sessions[0]?.targetLetter || 'ر'); setTrainingType(student.targetLetters?.length ? 'letters' : (student.communicationDiagnoses || [])[0] || 'letters'); }, [student.id]);
  const selectedDiagnosis: CommunicationDiagnosis | undefined = trainingType === 'stuttering' || trainingType === 'aphasia' ? trainingType : undefined;
  const selectedGuide = selectedDiagnosis ? COMMUNICATION_THERAPY_GUIDES[selectedDiagnosis] : undefined;
  const activeLetterGoal = trainingType === 'letters' ? shortTermPlan.objectives.filter(goal => goal.targetLetter === targetLetter && goal.status !== 'achieved').sort((a,b) => a.stepNumber-b.stepNumber)[0] : undefined;
  const activeCommunicationGoal = selectedDiagnosis ? (shortTermPlan.communicationObjectiveSteps || []).filter(goal => goal.diagnosis === selectedDiagnosis && goal.status !== 'achieved').sort((a,b) => a.stepNumber-b.stepNumber)[0] : undefined;
  const activeGoal = activeLetterGoal || activeCommunicationGoal;
  const goalId = activeGoal?.id;
  const goalType = activeLetterGoal ? 'letter' as const : activeCommunicationGoal ? 'communication' as const : undefined;
  const edit = (session: DailySessionLog, field: keyof DailySessionLog, label: string) => <EditableText targetLetter={session.targetLetter} label={label} value={String(session[field] ?? '')} onSave={value => onUpdateSession({ ...session, [field]: value })} onDelete={() => onUpdateSession({ ...session, [field]: '' })} className="w-full text-slate-700" />;
  const [newSessionDate, setNewSessionDate] = useState(() => getLiveHijriDate());
  const [newObjective, setNewObjective] = useState('');
  const [newAccuracy, setNewAccuracy] = useState(85);
  const [newStudentResponse, setNewStudentResponse] = useState<any>('ممتاز ومتحمس');
  const [newHomework, setNewHomework] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [selectedClinicalExercises, setSelectedClinicalExercises] = useState<string[]>([]);
  const hasCommunicationDiagnosis = !!selectedGuide;

  const handleCreateSession = () => {
    const newLog: DailySessionLog = {
      id: `ses-${Date.now()}`,
      studentId: student.id,
      sessionNumber: Math.max(0, ...sessions.map(session => Number(session.sessionNumber) || 0)) + 1,
      sessionDate: newSessionDate,
      sessionDuration: '30 دقيقة',
      targetLetter,
      trainingType: trainingType || 'letters',
      ...(goalId && goalType ? { linkedGoalId: goalId, linkedGoalType: goalType } : {}),
      goalCompleted: completeCurrentGoal,
      targetObjective: newObjective.trim() || activeGoal?.objectiveText || (selectedGuide ? selectedGuide.shortTermGoal : `تدريب نطق حرف (${targetLetter}) مع المرآة`),
      toolsUsed: {
        mirror: trainingType === 'letters',
        tongueDepressor: false,
        audioRecorder: false,
        visualFlashcards: trainingType === 'letters' || trainingType === 'aphasia',
        rewardTokens: true
      },
      mirrorProcedure: trainingType !== 'letters' ? 'لم تستخدم المرآة؛ ركزت الجلسة على مسار التواصل المحدد.' : 'استخدمت المرآة للملاحظة البصرية عند ملاءمتها لنتيجة التقييم.',
      depressorProcedure: 'لم يستخدم خافض اللسان في هذه الجلسة.',
      exercisesPerformed: hasCommunicationDiagnosis
        ? (selectedClinicalExercises.length ? selectedClinicalExercises : [selectedGuide!.methods[0]])
        : ['تدريب الحرف المستهدف في المستوى الحالي بالخطة.', 'تطبيق نموذج ثم إتاحة محاولة مستقلة وتسجيل الأداء.'],
      studentResponse: newStudentResponse,
      accuracyRate: newAccuracy,
      homeworkAssigned: newHomework.trim() || (selectedGuide ? selectedGuide.homePractice : `التدريب على حرف (${targetLetter}) في الكلمات والجمل المحددة بالخطة.`),
      specialistNotes: newNotes,
      specialistName: SCHOOL_KLICHE.specialistName
    };

    onAddSession(newLog);
    if (completeCurrentGoal && goalId) {
      const updatedPlan = goalType === 'letter'
        ? { ...shortTermPlan, objectives: shortTermPlan.objectives.map(goal => goal.id === goalId ? { ...goal, status: 'achieved' as const, currentPercentage: Math.max(goal.currentPercentage, newAccuracy) } : goal) }
        : { ...shortTermPlan, communicationObjectiveSteps: (shortTermPlan.communicationObjectiveSteps || []).map(goal => goal.id === goalId ? { ...goal, status: 'achieved' as const, currentPercentage: Math.max(goal.currentPercentage, newAccuracy) } : goal) };
      onUpdateShortTermPlan(updatedPlan);
    }
    setCompleteCurrentGoal(false);
    setNewObjective('');
    setSelectedClinicalExercises([]);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs print:hidden">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            سجل الجلسات التدريبية اليومية (Daily Session Protocol)
          </h2>
          <p className="text-xs text-slate-500">
            توثيق إجراءات الأدوات (1- المرآة، 2- خافض اللسان) ونسب الدقة والواجب المنزلي
          </p>
        </div>


        <div className="flex items-center gap-2">
          {trainingType === 'letters' && <label className="flex items-center gap-2 text-xs font-bold text-slate-700">حرف التدريب:
            <select value={targetLetter} onChange={e => setTargetLetter(e.target.value as typeof targetLetter)} className="rounded-lg border border-slate-200 bg-white p-2">{(student.targetLetters || []).map(letter => <option key={letter}>{letter}</option>)}</select>
          </label>}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 bg-sky-800 hover:bg-sky-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <Plus className="w-4 h-4" />
            إضافة جلسة تدريبية جديدة
          </button>

          <button
            onClick={() => triggerOfficialPrint('.printable-sheet')}
            className="flex items-center gap-1.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
            title="طباعة سجل الجلسات اليومية"
          >
            <Printer className="w-4 h-4" />
            طباعة السجل
          </button>
        </div>
      </div>

      {/* Add Session Modal Form */}
      {showAddForm && (
        <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-6 shadow-md print:hidden space-y-4">
          <h3 className="font-black text-emerald-950 text-base">
            تسجيل جلسة نطقية علاجية جديدة
          </h3>
          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
            <label className="block text-sm font-bold text-sky-950">مسار الجلسة (اختر مسارًا واحدًا)
              <select value={trainingType || 'letters'} onChange={event => { setTrainingType(event.target.value as DailySessionLog['trainingType']); setSelectedClinicalExercises([]); setCompleteCurrentGoal(false); }} className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2">
                {availableTracks.map(track => <option key={track} value={track}>{track === 'letters' ? 'تدريب الحروف' : COMMUNICATION_THERAPY_GUIDES[track].label}</option>)}
              </select>
            </label>
            {selectedGuide && <article className="mt-3 rounded-xl border border-white bg-white p-4">
              <h5 className="font-bold">{selectedGuide.label}</h5>
              <ul className="mt-2 list-disc space-y-2 pr-5 text-xs leading-6">{selectedGuide.methods.map(method => <li key={method}>
                <span>{method}</span>
                <button type="button" onClick={() => setSelectedClinicalExercises(previous => previous.includes(method) ? previous : [...previous, method])} className="mr-2 rounded-lg bg-sky-100 px-2 py-1 font-bold text-sky-900 print:hidden">
                  {selectedClinicalExercises.includes(method) ? 'أضيف للجلسة' : 'إضافة إلى الجلسة'}
                </button>
              </li>)}</ul>
              <p className="mt-3 rounded-lg bg-amber-50 p-3 text-xs leading-6"><strong>تنسيق التنفس:</strong> {selectedGuide.breathing}</p>
            </article>}
            {trainingType === 'letters' && <p className="mt-3 text-xs leading-6 text-slate-700">تُختار تدريبات الحروف من الهدف النشط في الخطة قصيرة المدى.</p>}
            <p className="mt-2 text-xs leading-6 text-slate-600">ستُسجل الأنشطة المختارة في تقرير هذا المسار فقط، دون دمج تدريب الحروف والتأتأة أو الحبسة.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">تاريخ الجلسة:</label>
              <SavedField aria-label="تاريخ الجلسة"
                value={newSessionDate}
                onChange={e => setNewSessionDate(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">الهدف المرتبط بالخطة قصيرة المدى:</label>
              {activeGoal && <p className="mb-1 rounded-lg bg-teal-50 p-2 text-[11px] leading-5 text-teal-950">الهدف التالي: {activeGoal.objectiveText} · المرحلة {activeGoal.stepNumber}</p>}
              <SavedField aria-label="هدف الجلسة" targetLetter={targetLetter}
                value={newObjective}
                onChange={e => setNewObjective(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2"
              />
            </div>
            {trainingType === 'letters' && <div>
                            <label className="font-bold text-slate-700 block mb-1">حرف التدريب:</label>
                            <select value={targetLetter} onChange={e => setTargetLetter(e.target.value as typeof targetLetter)} className="w-full rounded-lg border border-slate-200 bg-white p-2">{(student.targetLetters || []).map(letter => <option key={letter}>{letter}</option>)}</select>
                          </div>}
            <div>
              <label className="font-bold text-slate-700 block mb-1">نسبة الإتقان المحققة (%):</label>
              <SavedField aria-label="نسبة إتقان الجلسة"
                type="number"
                min="0"
                max="100"
                value={newAccuracy}
                onChange={e => setNewAccuracy(Number(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">تفاعل واستجابة الطالب:</label>
              <select
                value={newStudentResponse}
                onChange={e => setNewStudentResponse(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2"
              >
                <option value="ممتاز ومتحمس">ممتاز ومتحمس ⭐</option>
                <option value="جيد جداً مع تحسن">جيد جداً مع تحسن</option>
                <option value="متوسط يحتاج تكرار">متوسط يحتاج تكرار</option>
                <option value="مقاوم أو مشتت">مقاوم أو مشتت</option>
              </select>
            </div>
            {activeGoal && <label className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs font-bold text-emerald-950 md:col-span-3"><input type="checkbox" checked={completeCurrentGoal} onChange={event => setCompleteCurrentGoal(event.target.checked)} />سجّل هذا الهدف منجزًا بعد التحقق من معيار النجاح؛ ستنتقل الجلسة التالية تلقائيًا إلى الهدف التالي.</label>}
            <div className="md:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">الواجب المنزلي المرتبط بهذا المسار:</label>
              <SavedField aria-label="الواجب المنزلي" targetLetter={targetLetter}
                value={newHomework}
                onChange={e => setNewHomework(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2"
              />
            </div>
            <div className="md:col-span-3">
              <label className="font-bold text-slate-700 block mb-1">ملاحظات الجلسة:</label>
              <SavedField multiline aria-label="ملاحظات الجلسة"
                rows={2}
                value={newNotes}
                onChange={e => setNewNotes(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl text-xs text-slate-600 bg-slate-200 hover:bg-slate-300"
            >
              إلغاء
            </button>
            <button
              onClick={handleCreateSession}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800"
            >
              حفظ الجلسة في السجل
            </button>
          </div>
        </div>
      )}

      {/* Main Printable Session Log Sheet */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 printable-sheet print:p-0 print:border-none print:shadow-none">
        <OfficialHeader
          documentTitle="سجل الجلسات التدريبية اليومية والمتابعة الإكلينيكية"
          subTitle="رصد الممارسات العلاجية واستخدام أدوات المرآة والخافض ومستوى التقدم"
          studentName={student.fullName}
          nationalId={student.nationalId}
          grade={`${student.grade} - ${student.classRoom}`}
        />

        <div className="space-y-6">
          {sessions.map(s => (
            <div
              key={s.id}
              className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-xs space-y-4"
            >
              {/* Header row of session card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-black text-sm">
                    {s.sessionNumber}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      الجلسة رقم ({s.sessionNumber})
                    </h4>
                    {edit(s, 'targetObjective', 'هدف الجلسة')}
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <div>التاريخ: <EditableText label="تاريخ الجلسة" value={formatHijriDate(s.sessionDate)} multiline={false} onSave={sessionDate => onUpdateSession({ ...s, sessionDate: formatHijriDate(sessionDate) })} /></div>
                      <div>المدة: {edit(s, 'sessionDuration', 'مدة الجلسة')}</div>
                      {s.trainingType && s.trainingType !== 'letters' ? <strong>{COMMUNICATION_THERAPY_GUIDES[s.trainingType].label}</strong> : <div>الحرف: <SavedSelect aria-label="حرف الجلسة" value={s.targetLetter} onChange={e => onUpdateSession({ ...s, targetLetter: e.target.value as typeof s.targetLetter })}>{(student.targetLetters || []).map(letter => <option key={letter}>{letter}</option>)}</SavedSelect></div>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                    استجابة الطالب: <SavedSelect aria-label="استجابة الطالب" value={s.studentResponse} onChange={e => onUpdateSession({ ...s, studentResponse: e.target.value as typeof s.studentResponse })}>{['ممتاز ومتحمس','جيد جداً مع تحسن','متوسط يحتاج تكرار','مقاوم أو مشتت'].map(response => <option key={response}>{response}</option>)}</SavedSelect>
                  </span>
                  <span className="text-xs font-black text-white bg-emerald-700 px-3 py-1 rounded-md shadow-xs">
                    دقة الأداء: <SavedField suffix="%" aria-label="دقة الأداء" type="number" min={0} max={100} value={s.accuracyRate} onChange={e => onUpdateSession({ ...s, accuracyRate: Number(e.target.value) })} />
                  </span>
                </div>
              </div>

              {(!s.trainingType || s.trainingType === 'letters') && <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 flex items-start gap-2.5">
                  <Eye className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sky-950 block text-[11px] mb-0.5">
                      1- إجراء المرآة في الجلسة:
                    </span>
                    {edit(s, 'mirrorProcedure', 'إجراء المرآة')}
                  </div>
                </div>

                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-start gap-2.5">
                  <Wrench className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-950 block text-[11px] mb-0.5">
                      2- إجراء خافض اللسان في الجلسة:
                    </span>
                    {edit(s, 'depressorProcedure', 'إجراء خافض اللسان')}
                  </div>
                </div>
              </div>}

              {/* Exercises Performed */}
              <div className="text-xs">
                <span className="font-bold text-slate-700 block mb-1">
                  التمارين والأنشطة المنفذة:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {s.exercisesPerformed.map((ex, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <EditableText targetLetter={s.targetLetter} label={`نشاط ${i + 1}`} value={ex} onSave={value => onUpdateSession({ ...s, exercisesPerformed: s.exercisesPerformed.map((item, index) => index === i ? value : item) })} onDelete={() => onUpdateSession({ ...s, exercisesPerformed: s.exercisesPerformed.filter((_, index) => index !== i) })} className="flex-1" />
                    </div>
                  ))}
                </div>
                <button type="button" className="mt-2 text-emerald-800 print:hidden" onClick={() => onUpdateSession({ ...s, exercisesPerformed: [...s.exercisesPerformed, 'نشاط جديد'] })}>+ إضافة نشاط</button>
              </div>

              {/* Homework and Therapist notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100">
                  <span className="font-bold text-emerald-950 block mb-0.5">
                    الواجب المنزلي المسند:
                  </span>
                  {edit(s, 'homeworkAssigned', 'الواجب المنزلي')}
                  <ChoicePicker category={`session-homework-${s.targetLetter}`} label="الواجبات" suggestions={s.trainingType && s.trainingType !== 'letters' ? [COMMUNICATION_THERAPY_GUIDES[s.trainingType].homePractice] : homeworkSuggestions(s.targetLetter)} onSelect={homeworkAssigned => onUpdateSession({ ...s, homeworkAssigned })} />
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-800 block mb-0.5">
                    الملاحظات:
                  </span>
                  {edit(s, 'specialistNotes', 'ملاحظات الجلسة')}
                  <ChoicePicker category="session-notes" label="ملاحظات الجلسة" suggestions={sessionNotesSuggestions} onSelect={specialistNotes => onUpdateSession({ ...s, specialistNotes })} />
                </div>
              </div>
              <button type="button" className="text-xs text-rose-700 print:hidden" onClick={() => { if (window.confirm('حذف هذه الجلسة من السجل؟')) onDeleteSession(s.id); }}>حذف الجلسة</button>
            </div>
          ))}
        </div>

        {/* Official Specialist Signature Row */}
        <div className="pt-8 border-t border-slate-300 flex justify-center text-xs text-center mt-8">
          <div className="space-y-2.5 max-w-sm w-full bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
            <span className="text-slate-600 font-bold block text-xs">أخصائي تدريبات نطق</span>
            <span className="text-base font-black text-emerald-900 block">
              {SCHOOL_KLICHE.specialistName}
            </span>
            <div className="h-0.5 w-40 mx-auto bg-emerald-700/40 my-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

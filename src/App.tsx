import React, { useState, useEffect, useMemo } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { setDocumentHijriDate } from './services/dateService';
import { AccountPasswordSetup } from './components/AccountPasswordSetup';
import {
  BookOpen,
  ClipboardList,
  Stethoscope,
  Target,
  Calendar,
  Home,
  FileCheck,
  Printer,
  FileDown,
  ChevronDown,
  Users,
  UserPlus,
  LogOut,
  Cloud,
  CloudOff,
  DatabaseBackup,
  UserCircle,
  ShieldCheck
} from 'lucide-react';
import {
  StudentProfile,
  CaseStudyData,
  DiagnosticAssessment,
  LongTermPlan,
  ShortTermPlan,
  DailySessionLog,
  HomeworkSheet,
  FinalProgressReport,
  ArabicLetterKey
} from './types/speechTherapy';
import {
  SAMPLE_STUDENTS,
  INITIAL_CASE_STUDIES,
  INITIAL_DIAGNOSTIC_ASSESSMENTS,
  INITIAL_LONG_TERM_PLANS,
  INITIAL_SHORT_TERM_PLANS,
  INITIAL_DAILY_SESSIONS,
  INITIAL_HOMEWORK_SHEETS,
  INITIAL_FINAL_REPORTS,
  SPECIALIST_NAME
} from './data/sampleData';

import { LettersDirectory } from './components/LettersDirectory';
import { CaseStudyView } from './components/CaseStudyView';
import { DiagnosisView } from './components/DiagnosisView';
import { LongTermPlanView } from './components/LongTermPlanView';
import { ShortTermPlanView } from './components/ShortTermPlanView';
import { DailySessionView } from './components/DailySessionView';
import { HomeworkView } from './components/HomeworkView';
import { FinalReportView } from './components/FinalReportView';
import { NewStudentModal } from './components/NewStudentModal';
import { createNewStudentRecords } from './data/studentFactory';
import { AuthScreen } from './components/AuthScreen';
import { auth, db, firebaseConfigured } from './services/firebase';
import { waitForPendingWrites } from 'firebase/firestore';
import { loadWorkspace, recordLogin, saveWorkspace, type WorkspaceState } from './services/workspaceService';

import { triggerOfficialPrint } from './services/printService';
import { getDiagnosedTargetLetters, getDiagnosisCategories, sameLetters } from './services/clinicalCaseLink';

type ActiveTab =
  | 'letters'
  | 'casestudy'
  | 'diagnosis'
  | 'longterm'
  | 'shortterm'
  | 'sessions'
  | 'homework'
  | 'finalreport';

const LEGACY_CACHE_OWNER_KEY = 'st_legacy_workspace_owner_uid';
const userWorkspaceCacheKey = (uid: string) => `st_workspace_${uid}`;

function readUserWorkspaceCache(uid: string): WorkspaceState | null {
  try {
    const scoped = localStorage.getItem(userWorkspaceCacheKey(uid));
    if (scoped) return JSON.parse(scoped) as WorkspaceState;

    const legacyOwner = localStorage.getItem(LEGACY_CACHE_OWNER_KEY);
    if (legacyOwner && legacyOwner !== uid) return null;
    const legacyStudents = localStorage.getItem('st_students');
    if (!legacyStudents) return null;
    return {
      students: JSON.parse(legacyStudents) as StudentProfile[],
      caseStudies: JSON.parse(localStorage.getItem('st_case_studies') || '{}'),
      assessments: JSON.parse(localStorage.getItem('st_assessments') || '{}'),
      longTermPlans: JSON.parse(localStorage.getItem('st_lt_plans') || '{}'),
      shortTermPlans: JSON.parse(localStorage.getItem('st_st_plans') || '{}'),
      dailySessions: JSON.parse(localStorage.getItem('st_sessions') || '{}'),
      homeworkList: JSON.parse(localStorage.getItem('st_homework') || '{}'),
      finalReports: JSON.parse(localStorage.getItem('st_final_reports') || '{}')
    };
  } catch (error) {
    console.error('تعذر قراءة النسخة المحلية لهذا الحساب.', error);
    return null;
  }
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!auth) {
      setCheckingAuth(false);
      return;
    }
    return onAuthStateChanged(auth, nextUser => {
      setDocumentHijriDate('');
      setUser(nextUser);
      setCheckingAuth(false);
      if (nextUser) void recordLogin(nextUser.uid, nextUser.email).catch(console.error);
    });
  }, []);

  if (checkingAuth) return <div dir="rtl" className="min-h-screen bg-slate-950 text-white grid place-items-center font-bold">جارٍ التحقق من الجلسة الآمنة...</div>;
  if (!user) return <AuthScreen />;
  return <WorkspaceApp key={user.uid} user={user} />;
}

function WorkspaceApp({ user }: { user: User | null }) {
  const [initialWorkspace] = useState(() => user ? readUserWorkspaceCache(user.uid) : null);
  const [students, setStudents] = useState<StudentProfile[]>(() => initialWorkspace?.students || SAMPLE_STUDENTS);

  const [activeStudentId, setActiveStudentId] = useState<string>(() => {
    return initialWorkspace?.students[0]?.id || SAMPLE_STUDENTS[0].id;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('letters');
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isNewStudentModalOpen, setIsNewStudentModalOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'loading' | 'saving' | 'saved' | 'error'>('loading');

  // Data states per student
  const [caseStudies, setCaseStudies] = useState<Record<string, CaseStudyData>>(() => initialWorkspace?.caseStudies || INITIAL_CASE_STUDIES);

  const [assessments, setAssessments] = useState<Record<string, DiagnosticAssessment>>(() => initialWorkspace?.assessments || INITIAL_DIAGNOSTIC_ASSESSMENTS);

  const [longTermPlans, setLongTermPlans] = useState<Record<string, LongTermPlan>>(() => initialWorkspace?.longTermPlans || INITIAL_LONG_TERM_PLANS);

  const [shortTermPlans, setShortTermPlans] = useState<Record<string, ShortTermPlan>>(() => initialWorkspace?.shortTermPlans || INITIAL_SHORT_TERM_PLANS);

  const [dailySessions, setDailySessions] = useState<Record<string, DailySessionLog[]>>(() => initialWorkspace?.dailySessions || INITIAL_DAILY_SESSIONS);

  const [homeworkList, setHomeworkList] = useState<Record<string, HomeworkSheet[]>>(() => initialWorkspace?.homeworkList || INITIAL_HOMEWORK_SHEETS);

  const [finalReports, setFinalReports] = useState<Record<string, FinalProgressReport>>(() => initialWorkspace?.finalReports || INITIAL_FINAL_REPORTS);

  // Keep a local offline copy as a second layer of protection.
  useEffect(() => {
    try {
      const state: WorkspaceState = { students, caseStudies, assessments, longTermPlans, shortTermPlans, dailySessions, homeworkList, finalReports };
      localStorage.setItem(userWorkspaceCacheKey(user!.uid), JSON.stringify(state));
    } catch (error) {
      console.error('تعذر تحديث نسخة التخزين المحلي، تحقق من تنزيل النسخة الاحتياطية.', error);
    }
  }, [students, caseStudies, assessments, longTermPlans, shortTermPlans, dailySessions, homeworkList, finalReports]);

  useEffect(() => {
    if (!user) {
      setIsHydrated(true);
      setSyncStatus('error');
      return;
    }
    let active = true;
    const hydrate = async () => {
      try {
        if (!localStorage.getItem(LEGACY_CACHE_OWNER_KEY) && localStorage.getItem('st_students')) {
          localStorage.setItem(LEGACY_CACHE_OWNER_KEY, user.uid);
        }
        const cloudState = await loadWorkspace(user.uid);
        if (!active) return;
        if (cloudState) {
          // Keep local-only records during first cloud hydration; cloud wins on conflicting IDs.
          const mergedStudents = new Map(students.map(student => [student.id, student]));
          cloudState.students.forEach(student => mergedStudents.set(student.id, student));
          setStudents([...mergedStudents.values()]);
          setCaseStudies(previous => ({ ...previous, ...cloudState.caseStudies }));
          setAssessments(previous => ({ ...previous, ...cloudState.assessments }));
          setLongTermPlans(previous => ({ ...previous, ...cloudState.longTermPlans }));
          setShortTermPlans(previous => ({ ...previous, ...cloudState.shortTermPlans }));
          setDailySessions(previous => ({ ...previous, ...cloudState.dailySessions }));
          setHomeworkList(previous => ({ ...previous, ...cloudState.homeworkList }));
          setFinalReports(previous => ({ ...previous, ...cloudState.finalReports }));
          if (cloudState.students[0]) setActiveStudentId(cloudState.students[0].id);
        } else {
          const localState: WorkspaceState = { students, caseStudies, assessments, longTermPlans, shortTermPlans, dailySessions, homeworkList, finalReports };
          await saveWorkspace(user.uid, localState);
        }
        if (active) {
          setIsHydrated(true);
          setSyncStatus('saved');
        }
      } catch (error) {
        console.error('Workspace hydration failed', error);
        if (active) setSyncStatus('error');
      }
    };
    void hydrate();
    return () => { active = false; };
    // Hydration must happen once for the authenticated account.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  useEffect(() => {
    if (!isHydrated || !user) return;
    setSyncStatus('saving');
    const timer = window.setTimeout(() => {
      const state: WorkspaceState = { students, caseStudies, assessments, longTermPlans, shortTermPlans, dailySessions, homeworkList, finalReports };
      void saveWorkspace(user.uid, state)
        .then(() => setSyncStatus('saved'))
        .catch(error => {
          console.error('Workspace sync failed', error);
          setSyncStatus('error');
        });
    }, 900);
    return () => window.clearTimeout(timer);
  }, [user?.uid, isHydrated, students, caseStudies, assessments, longTermPlans, shortTermPlans, dailySessions, homeworkList, finalReports]);

  const currentStudent = students.find(s => s.id === activeStudentId) || students[0];
  const fallbackRecords = useMemo(
    () => createNewStudentRecords(currentStudent, currentStudent?.targetLetters?.length ? currentStudent.targetLetters : ['ر']),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentStudent?.id, currentStudent?.targetLetters?.join('|')]
  );
  // Never borrow another student's record as a fallback; every screen stays scoped to the active case.
  const currentCaseStudy = caseStudies[activeStudentId] || fallbackRecords.caseStudy;
  const currentAssessment = assessments[activeStudentId] || fallbackRecords.assessment;
  const currentLTPlan = longTermPlans[activeStudentId] || fallbackRecords.longTermPlan;
  const currentSTPlan = shortTermPlans[activeStudentId] || fallbackRecords.shortTermPlan;
  const currentSessions = dailySessions[activeStudentId] || fallbackRecords.sessions;
  const currentHwList = homeworkList[activeStudentId] || fallbackRecords.homework;
  const currentFinalReport = finalReports[activeStudentId] || fallbackRecords.finalReport;
  const diagnosedTargetLetters = getDiagnosedTargetLetters(currentAssessment);
  const clinicalTargetLetters = diagnosedTargetLetters.length
    ? diagnosedTargetLetters
    : (currentStudent?.targetLetters || []);
  const clinicalTargetsKey = clinicalTargetLetters.join('|');
  const clinicalTargets = new Set(clinicalTargetLetters);
  const linkedCurrentLTPlan = clinicalTargetLetters.length
    ? { ...currentLTPlan, goals: currentLTPlan.goals.filter(goal => clinicalTargets.has(goal.targetLetter)) }
    : currentLTPlan;
  const linkedCurrentSTPlan = clinicalTargetLetters.length
    ? {
        ...currentSTPlan,
        targetLetter: clinicalTargetLetters[0],
        targetLetters: clinicalTargetLetters,
        objectives: currentSTPlan.objectives.filter(objective => clinicalTargets.has(objective.targetLetter))
      }
    : currentSTPlan;
  const linkedCurrentFinalReport = clinicalTargetLetters.length
    ? { ...currentFinalReport, letterProgression: currentFinalReport.letterProgression.filter(progress => clinicalTargets.has(progress.letter)) }
    : currentFinalReport;
  const currentTargetHomework = currentHwList.find(homework => clinicalTargets.has(homework.targetLetter)) || currentHwList[0];

  // The diagnosis is the clinical source of truth. It updates the whole student case
  // while preserving every existing record and every manual edit.
  useEffect(() => {
    const targets = clinicalTargetLetters;
    if (!targets.length) return;
    const diagnosisCategories = getDiagnosisCategories(currentAssessment, targets);
    const linkedStudent: StudentProfile = {
      ...currentStudent,
      targetLetters: targets,
      diagnosisCategory: diagnosisCategories[0] || currentStudent.diagnosisCategory,
      diagnosisCategories: diagnosisCategories.length ? diagnosisCategories : currentStudent.diagnosisCategories
    };
    const generated = createNewStudentRecords(linkedStudent, targets);

    setAssessments(previous => previous[activeStudentId]
      ? previous
      : { ...previous, [activeStudentId]: generated.assessment });

    setStudents(previous => previous.map(student => {
      if (student.id !== activeStudentId) return student;
      const categoriesUnchanged = (student.diagnosisCategories || []).join('|') === diagnosisCategories.join('|');
      if (sameLetters(student.targetLetters, targets) && categoriesUnchanged) return student;
      return linkedStudent;
    }));

    setCaseStudies(previous => {
      const study = previous[activeStudentId];
      if (!study) return { ...previous, [activeStudentId]: generated.caseStudy };
      if (sameLetters(study.student.targetLetters, targets)
        && (study.student.diagnosisCategories || []).join('|') === diagnosisCategories.join('|')) return previous;
      return { ...previous, [activeStudentId]: { ...study, student: linkedStudent } };
    });

    setLongTermPlans(previous => {
      const plan = previous[activeStudentId];
      if (!plan) return { ...previous, [activeStudentId]: generated.longTermPlan };
      const missing = targets.filter(letter => !plan.goals.some(goal => goal.targetLetter === letter));
      if (!missing.length) return previous;
      const additions = generated.longTermPlan.goals.filter(goal => missing.includes(goal.targetLetter));
      return { ...previous, [activeStudentId]: { ...plan, goals: [...plan.goals, ...additions] } };
    });
    setShortTermPlans(previous => {
      const plan = previous[activeStudentId];
      if (!plan) return { ...previous, [activeStudentId]: generated.shortTermPlan };
      const missing = targets.filter(letter => !plan.objectives.some(objective => objective.targetLetter === letter));
      if (!missing.length && targets.every(letter => plan.targetLetters?.includes(letter))) return previous;
      const additions = generated.shortTermPlan.objectives.filter(objective => missing.includes(objective.targetLetter));
      return { ...previous, [activeStudentId]: { ...plan, targetLetter: targets[0], targetLetters: targets, objectives: [...plan.objectives, ...additions] } };
    });

    setDailySessions(previous => {
      const records = previous[activeStudentId] || [];
      const missing = targets.filter(letter => !records.some(session => session.targetLetter === letter));
      if (!missing.length) return previous;
      const additions = generated.sessions.filter(session => missing.includes(session.targetLetter));
      return { ...previous, [activeStudentId]: [...records, ...additions] };
    });

    setHomeworkList(previous => {
      const records = previous[activeStudentId] || [];
      const missing = targets.filter(letter => !records.some(homework => homework.targetLetter === letter));
      if (!missing.length) return previous;
      const additions = generated.homework.filter(homework => missing.includes(homework.targetLetter));
      return { ...previous, [activeStudentId]: [...records, ...additions] };
    });

    setFinalReports(previous => {
      const report = previous[activeStudentId];
      if (!report) return { ...previous, [activeStudentId]: generated.finalReport };
      const missing = targets.filter(letter => !report.letterProgression.some(progress => progress.letter === letter));
      if (!missing.length) return previous;
      const template = generated.finalReport.letterProgression[0];
      const additions = missing.map(letter => ({ ...template, letter, beforeRate: 0, afterRate: 0, status: 'قيد التدريب' as const }));
      return { ...previous, [activeStudentId]: { ...report, letterProgression: [...report.letterProgression, ...additions] } };
    });
  // Primitive keys prevent a loop when the linked student object is updated.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStudentId, clinicalTargetsKey, currentAssessment]);

  if (!isHydrated && syncStatus !== 'error') return <div dir="rtl" className="min-h-screen bg-slate-950 text-white grid place-items-center font-bold">جارٍ تحميل سجلاتك المحفوظة...</div>;

  // Handle adding a new student
  const handleAddNewStudent = (newStudent: StudentProfile, targetLetters: ArabicLetterKey[]) => {
    const newRecords = createNewStudentRecords(newStudent, targetLetters);

    setStudents(prev => [...prev, newStudent]);
    setCaseStudies(prev => ({ ...prev, [newStudent.id]: newRecords.caseStudy }));
    setAssessments(prev => ({ ...prev, [newStudent.id]: newRecords.assessment }));
    setLongTermPlans(prev => ({ ...prev, [newStudent.id]: newRecords.longTermPlan }));
    setShortTermPlans(prev => ({ ...prev, [newStudent.id]: newRecords.shortTermPlan }));
    setDailySessions(prev => ({ ...prev, [newStudent.id]: newRecords.sessions }));
    setHomeworkList(prev => ({ ...prev, [newStudent.id]: newRecords.homework }));
    setFinalReports(prev => ({ ...prev, [newStudent.id]: newRecords.finalReport }));

    setActiveStudentId(newStudent.id);
    setActiveTab('diagnosis');
  };

  const downloadBackup = () => {
    const state: WorkspaceState = { students, caseStudies, assessments, longTermPlans, shortTermPlans, dailySessions, homeworkList, finalReports };
    const blob = new Blob([JSON.stringify({ schemaVersion: 1, exportedAt: new Date().toISOString(), data: state }, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `speech-therapy-backup-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  // Export handlers
  const handleExportPlans = async () => {
    setIsExporting(true);
    try {
      const { exportPlansDocx } = await import('./services/docxExportService');
      await exportPlansDocx(currentStudent, linkedCurrentLTPlan, linkedCurrentSTPlan);
    } catch (e) {
      console.error(e);
      window.alert('تعذر تجهيز ملف Word. تحقق من الاتصال ثم أعد المحاولة. إذا استمر الخطأ، أرسل صورة الرسالة.');
    } finally {
      setIsExporting(false);
      setIsExportMenuOpen(false);
    }
  };

  const navTabs = [
    { id: 'letters', label: 'نماذج الـ 28 حرفاً (صور واقعية وتعديل)', icon: BookOpen },
    { id: 'casestudy', label: 'دراسة الحالة الشاملة', icon: ClipboardList },
    { id: 'diagnosis', label: 'التشخيص والتقييم النطقي', icon: Stethoscope },
    { id: 'longterm', label: 'الخطة طويلة المدى', icon: Target },
    { id: 'shortterm', label: 'الخطة قصيرة المدى', icon: Target },
    { id: 'sessions', label: 'سجل الجلسات اليومية', icon: Calendar },
    { id: 'homework', label: 'أوراق العمل والواجبات', icon: Home },
    { id: 'finalreport', label: 'التقرير النطقي النهائي', icon: FileCheck }
  ];

  return (
    <div className="min-h-screen bg-slate-50/80 bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:24px_24px] flex flex-col text-slate-900 font-['Cairo',sans-serif]">
      {/* Top Header */}
      <header className="relative bg-sky-950 text-white border-b-4 border-sky-500 shadow-md print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6">
          <div className="flex flex-col gap-2.5">
            {/* Title & Specialist */}
            <div className="flex items-center gap-3.5">
              <div>
                <h1 className="text-base sm:text-lg font-black tracking-wide text-white">
                  منظومة تدريبات النطق
                </h1>
                <p className="text-xs text-sky-200 font-bold">
                  أخصائي تدريبات نطق: <strong className="text-sky-100 font-black">{SPECIALIST_NAME}</strong>
                </p>
              </div>

            </div>

            {/* Student Switcher, Registration & Actions */}
            <div className="grid grid-cols-1 gap-2.5 sm:flex sm:items-center sm:flex-wrap">
              {/* Active Student Picker */}
              <div className="min-w-0 bg-sky-900/90 border border-sky-700/80 rounded-xl p-1 flex items-center gap-1 sm:gap-2 text-xs shadow-xs">
                <Users className="w-4 h-4 text-sky-300 mr-2 shrink-0" />
                <span className="text-sky-200 font-bold hidden sm:inline">الطالب:</span>
                <select
                  value={activeStudentId}
                  onChange={e => setActiveStudentId(e.target.value)}
                  className="min-w-0 flex-1 bg-sky-800 text-white font-bold text-xs rounded-lg px-2.5 py-1.5 focus:outline-hidden border border-sky-600 cursor-pointer sm:flex-none"
                >
                  {currentStudent?.deletedAt && <option value={activeStudentId}>اختر طالباً أو استرجع طالباً محذوفاً</option>}
                  {students.filter(s => !s.deletedAt).map(s => (
                    <option key={s.id} value={s.id}>
                      {s.fullName} ({s.grade})
                    </option>
                  ))}
                </select>
                {!currentStudent?.deletedAt && <details className="relative print:hidden">
                  <summary aria-label="إدارة بيانات الطالب" title="إدارة بيانات الطالب" className="list-none cursor-pointer rounded-lg p-2 text-white hover:bg-sky-700">✎</summary>
                  <div className="absolute top-full left-0 z-50 mt-2 w-60 rounded-xl border bg-white p-2 shadow-xl">
                    <button type="button" className="block w-full rounded-lg p-3 text-right text-sky-900" onClick={e => { e.currentTarget.closest('details')?.removeAttribute('open'); setActiveTab('casestudy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>تعديل اسم وبيانات الطالب</button>
                    <button type="button" className="block w-full rounded-lg p-3 text-right text-rose-800 hover:bg-rose-50" onClick={e => {
                      e.currentTarget.closest('details')?.removeAttribute('open');
                      if (!window.confirm(`نقل الطالب ${currentStudent.fullName} إلى المحذوفين؟ تبقى بياناته قابلة للاسترجاع.`)) return;
                      setStudents(previous => previous.map(student => student.id === currentStudent.id ? { ...student, deletedAt: new Date().toISOString() } : student));
                      const next = students.find(student => student.id !== currentStudent.id && !student.deletedAt);
                      if (next) setActiveStudentId(next.id);
                    }}>حذف الطالب</button>
                  </div>
                </details>}
              </div>

              {/* Add New Student Button */}

              <button
                onClick={() => setIsNewStudentModalOpen(true)}
                className="flex w-full sm:w-auto items-center justify-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-white font-black text-xs px-3 py-2 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                title="تسجيل طالب جديد في برنامج تدريبات النطق"
              >
                <UserPlus className="w-4 h-4" />
                <span>تسجيل طالب جديد</span>
              </button>

              {/* Master Word Export Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                  className="flex w-full sm:w-auto items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span>تصدير مستند وورد (.docx)</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {isExportMenuOpen && (
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-sky-200 z-50 p-2 text-xs divide-y divide-slate-100 text-slate-800 animate-fadeIn">
                    <div className="p-2 font-black text-sky-950 text-[11px]">
                      اختر النموذج المطلوب تصديره إلى ملف وورد (بالتاريخ الفعلي المحدث):
                    </div>
                    <div className="py-1 space-y-0.5">
                      <button
                        onClick={async () => {
                          setIsExporting(true);
                          try {
                          const { exportLettersGuideDocx } = await import('./services/docxExportService');
                          await exportLettersGuideDocx();
                          
                          } catch (error) { console.error(error); window.alert('تعذر تصدير Word. أعد المحاولة بعد التحقق من الاتصال.'); }
                          finally { setIsExporting(false); setIsExportMenuOpen(false); }
                        }}
                        className="w-full text-right p-2 rounded-lg hover:bg-sky-50 hover:text-sky-900 font-bold flex items-center justify-between cursor-pointer"
                      >
                        <span>دليل جميع الحروف الـ 28 مع الصور</span>
                        <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                      </button>
                      <button
                        onClick={async () => {
                          setIsExporting(true);
                          try {
                          const { exportCaseStudyDocx } = await import('./services/docxExportService');
                          await exportCaseStudyDocx(currentCaseStudy);
                          
                          } catch (error) { console.error(error); window.alert('تعذر تصدير Word. أعد المحاولة بعد التحقق من الاتصال.'); }
                          finally { setIsExporting(false); setIsExportMenuOpen(false); }
                        }}
                        className="w-full text-right p-2 rounded-lg hover:bg-sky-50 hover:text-sky-900 font-bold flex items-center justify-between cursor-pointer"
                      >
                        <span>دراسة الحالة الشاملة للطالب</span>
                        <ClipboardList className="w-3.5 h-3.5 text-sky-600" />
                      </button>
                      <button
                        onClick={async () => {
                          setIsExporting(true);
                          try {
                          const { exportDiagnosisDocx } = await import('./services/docxExportService');
                          await exportDiagnosisDocx(currentStudent, currentAssessment);
                          
                          } catch (error) { console.error(error); window.alert('تعذر تصدير Word. أعد المحاولة بعد التحقق من الاتصال.'); }
                          finally { setIsExporting(false); setIsExportMenuOpen(false); }
                        }}
                        className="w-full text-right p-2 rounded-lg hover:bg-sky-50 hover:text-sky-900 font-bold flex items-center justify-between cursor-pointer"
                      >
                        <span>استمارة التشخيص والتقييم النطقي</span>
                        <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
                      </button>
                      <button
                        onClick={handleExportPlans}
                        className="w-full text-right p-2 rounded-lg hover:bg-sky-50 hover:text-sky-900 font-bold flex items-center justify-between cursor-pointer"
                      >
                        <span>الخطط طويلة وقصيرة المدى</span>
                        <Target className="w-3.5 h-3.5 text-sky-600" />
                      </button>
                      <button
                        onClick={async () => {
                          setIsExporting(true);
                          try {
                          if (currentTargetHomework) {
                            const { exportHomeworkDocx } = await import('./services/docxExportService');
                            await exportHomeworkDocx(currentStudent, currentTargetHomework);
                          }
                          
                          } catch (error) { console.error(error); window.alert('تعذر تصدير Word. أعد المحاولة بعد التحقق من الاتصال.'); }
                          finally { setIsExporting(false); setIsExportMenuOpen(false); }
                        }}
                        className="w-full text-right p-2 rounded-lg hover:bg-sky-50 hover:text-sky-900 font-bold flex items-center justify-between cursor-pointer"
                      >
                        <span>ورقة الواجب والمتابعة الأسرية</span>
                        <Home className="w-3.5 h-3.5 text-sky-600" />
                      </button>
                      <button
                        onClick={async () => {
                          setIsExporting(true);
                          try {
                          const { exportFinalReportDocx } = await import('./services/docxExportService');
                          await exportFinalReportDocx(currentStudent, linkedCurrentFinalReport);
                          
                          } catch (error) { console.error(error); window.alert('تعذر تصدير Word. أعد المحاولة بعد التحقق من الاتصال.'); }
                          finally { setIsExporting(false); setIsExportMenuOpen(false); }
                        }}
                        className="w-full text-right p-2 rounded-lg hover:bg-sky-50 hover:text-sky-900 font-bold flex items-center justify-between cursor-pointer"
                      >
                        <span>التقرير النطقي النهائي والتخرج</span>
                        <FileCheck className="w-3.5 h-3.5 text-sky-600" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Master Print Button with bulletproof execution */}
              <button
                onClick={() => triggerOfficialPrint('.printable-sheet')}
                className="flex items-center gap-1.5 bg-sky-800 hover:bg-sky-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
                title="طباعة الصفحة الحالية بالختم والكليشة الرسمية"
              >
                <Printer className="w-4 h-4 text-sky-300" />
                <span className="hidden sm:inline">طباعة رسمية</span>
              </button>

              <div className="relative z-[80] shrink-0 print:hidden sm:mr-auto">
                <button
                  onClick={() => setIsAccountMenuOpen(open => !open)}
                  className="grid h-9 w-9 place-items-center rounded-full border-2 border-white/80 bg-white text-emerald-700 shadow-sm transition hover:bg-sky-50"
                  title="الحساب والنسخة الاحتياطية"
                  aria-label="فتح تفاصيل الحساب"
                  aria-expanded={isAccountMenuOpen}
                >
                  <UserCircle className="h-5 w-5" />
                </button>

                {isAccountMenuOpen && (
                  <div className="absolute left-0 top-full z-[90] mt-2 w-72 rounded-2xl border border-sky-200 bg-white p-3 text-right text-slate-800 shadow-2xl" dir="rtl">
                    <div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sky-100 text-sky-800"><ShieldCheck className="h-5 w-5" /></div>
                      <div className="min-w-0"><div className="text-sm font-black">{user?.displayName || user?.email?.split('@')[0] || 'تفاصيل الحساب'}</div><div className="truncate text-[11px] text-slate-500" dir="ltr">{user?.email || 'تشغيل محلي مؤقت'}</div></div>
                    </div>
                    <div className={`mb-2 flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold ${syncStatus === 'error' ? 'bg-red-50 text-red-800' : 'bg-sky-50 text-sky-900'}`}>
                      {syncStatus === 'error' ? <CloudOff className="h-4 w-4" /> : <Cloud className="h-4 w-4" />}
                      <span>{!user ? 'حفظ محلي مؤقت' : syncStatus === 'saving' ? 'جارٍ الحفظ' : syncStatus === 'saved' ? 'محفوظ سحابيًا' : syncStatus === 'error' ? 'تعذر الحفظ السحابي' : 'جارٍ التحميل'}</span>
                    </div>
                    <button onClick={() => { downloadBackup(); setIsAccountMenuOpen(false); }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-black text-emerald-800 hover:bg-emerald-50"><DatabaseBackup className="h-4 w-4" /><span>تنزيل نسخة احتياطية</span></button>
                    {students.some(student => student.deletedAt) && (
                      <details className="mt-1 border-t border-slate-100 pt-1 text-xs">
                        <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl px-3 py-2.5 font-black text-sky-900 hover:bg-sky-50">
                          <Users className="h-4 w-4" />
                          <span>الطلاب المحذوفون</span>
                          <span className="mr-auto rounded-full bg-sky-100 px-2 py-0.5 text-[10px]">{students.filter(student => student.deletedAt).length}</span>
                        </summary>
                        <div className="mt-1 space-y-1 rounded-xl bg-slate-50 p-2">
                          {students.filter(student => student.deletedAt).map(student => (
                            <button key={student.id} type="button" className="flex w-full items-center justify-between rounded-lg bg-white px-3 py-2 text-right font-bold text-sky-900 hover:bg-emerald-50" onClick={() => {
                              setStudents(previous => previous.map(item => item.id === student.id ? { ...item, deletedAt: null } : item));
                              setActiveStudentId(student.id);
                              setIsAccountMenuOpen(false);
                            }}>
                              <span>{student.fullName}</span>
                              <span className="text-[10px] text-emerald-700">استرجاع</span>
                            </button>
                          ))}
                        </div>
                      </details>
                    )}
                    {user && <AccountPasswordSetup user={user} />}
                    {user && <button onClick={async () => { if (!auth || !isHydrated) return; setSyncStatus('saving'); try { await saveWorkspace(user.uid, { students, caseStudies, assessments, longTermPlans, shortTermPlans, dailySessions, homeworkList, finalReports }); if (db) await waitForPendingWrites(db); await signOut(auth); } catch { setSyncStatus('error'); window.alert('لم يكتمل حفظ آخر التعديلات. لم نسجل خروجك لحماية بياناتك؛ تحقق من الاتصال وأعد المحاولة.'); } }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-black text-red-700 hover:bg-red-50"><LogOut className="h-4 w-4" /><span>تسجيل الخروج</span></button>}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Navigation Sub-Header (Tabs) */}
      <nav className="bg-white/95 backdrop-blur-xs border-b border-sky-100 sticky top-0 z-40 shadow-xs print:hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-6">
          <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-thin">
            {navTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-sky-800 text-white shadow-md'
                      : 'text-slate-600 hover:bg-sky-50 hover:text-sky-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-current' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-6 py-4 sm:py-8 overflow-x-hidden">
        {currentStudent?.deletedAt && activeTab !== 'letters' ? <p className="rounded-xl bg-white p-6">الطالب في المحذوفين. استرجعه من القائمة أعلاه أو سجل طالباً جديداً لعرض النماذج.</p> : <>
        {activeTab === 'letters' && <LettersDirectory />}

        {activeTab === 'casestudy' && (
          <CaseStudyView
            caseStudy={currentCaseStudy}
            onUpdateCaseStudy={updated => { setCaseStudies(prev => ({ ...prev, [activeStudentId]: updated })); setStudents(prev => prev.map(student => student.id === updated.student.id ? updated.student : student)); }}
          />
        )}

        {activeTab === 'diagnosis' && (
          <DiagnosisView
            student={currentStudent}
            assessment={currentAssessment}
            onUpdateAssessment={updated =>
              setAssessments(prev => ({ ...prev, [activeStudentId]: updated }))
            }
          />
        )}

        {/* Long Term Plan: Standalone Page */}
        {activeTab === 'longterm' && (
          <LongTermPlanView key={activeStudentId}
            student={currentStudent}
            plan={linkedCurrentLTPlan}
            onUpdatePlan={updated =>
              setLongTermPlans(prev => ({ ...prev, [activeStudentId]: updated }))
            }
            onExportDocx={handleExportPlans}
            isExportingDocx={isExporting}
          />
        )}

        {/* Short Term Plan: COMPLETELY SEPARATE PAGE */}
        {activeTab === 'shortterm' && (
          <ShortTermPlanView key={activeStudentId}
            student={currentStudent}
            plan={linkedCurrentSTPlan}
            onUpdatePlan={updated =>
              setShortTermPlans(prev => ({ ...prev, [activeStudentId]: updated }))
            }
            onExportDocx={handleExportPlans}
            isExportingDocx={isExporting}
          />
        )}

        {activeTab === 'sessions' && (
          <DailySessionView
            key={activeStudentId}
            student={currentStudent}
            sessions={currentSessions}
            onUpdateSession={updated => setDailySessions(prev => ({ ...prev, [activeStudentId]: (prev[activeStudentId] || []).map(session => session.id === updated.id ? updated : session) }))}
            onDeleteSession={id => setDailySessions(prev => ({ ...prev, [activeStudentId]: (prev[activeStudentId] || []).filter(session => session.id !== id) }))}
            onAddSession={newSes =>
              setDailySessions(prev => ({
                ...prev,
                [activeStudentId]: [newSes, ...(prev[activeStudentId] || [])]
              }))
            }
          />
        )}

        {activeTab === 'homework' && (
          <HomeworkView key={activeStudentId}
            student={currentStudent}
            homeworkList={currentHwList}
            onUpdateHomework={updated =>
              setHomeworkList(prev => ({ ...prev, [activeStudentId]: [updated, ...(prev[activeStudentId] || []).filter(item => item.id !== updated.id)] }))
            }
          />
        )}

        {activeTab === 'finalreport' && (
          <FinalReportView
            student={currentStudent}
            report={linkedCurrentFinalReport}
            onUpdateReport={updated =>
              setFinalReports(prev => ({ ...prev, [activeStudentId]: updated }))
            }
          />
        )}

        </>}
      </main>

      {/* New Student Registration Modal */}
      <NewStudentModal
        isOpen={isNewStudentModalOpen}
        onClose={() => setIsNewStudentModalOpen(false)}
        onAddStudent={handleAddNewStudent}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-sky-100 py-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-bold text-slate-700">
            المملكة العربية السعودية • وزارة التعليم • إدارة التعليم بمنطقة عسير
          </p>
          <p className="text-slate-600">
            ابتدائية ومتوسطة الشط وبرامج التربية الخاصة
          </p>

        </div>
      </footer>
    </div>
  );
}

import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { CaseStudyData, DailySessionLog, DiagnosticAssessment, FinalProgressReport, HomeworkSheet, LongTermPlan, ShortTermPlan, StudentProfile } from '../types/speechTherapy';

export interface WorkspaceState {
  students: StudentProfile[];
  caseStudies: Record<string, CaseStudyData>;
  assessments: Record<string, DiagnosticAssessment>;
  longTermPlans: Record<string, LongTermPlan>;
  shortTermPlans: Record<string, ShortTermPlan>;
  dailySessions: Record<string, DailySessionLog[]>;
  homeworkList: Record<string, HomeworkSheet[]>;
  finalReports: Record<string, FinalProgressReport>;
}

type StudentBundle = {
  profile: StudentProfile;
  caseStudy?: CaseStudyData;
  assessment?: DiagnosticAssessment;
  longTermPlan?: LongTermPlan;
  shortTermPlan?: ShortTermPlan;
  sessions?: DailySessionLog[];
  homework?: HomeworkSheet[];
  finalReport?: FinalProgressReport;
};

const studentCollection = (uid: string) => {
  if (!db) throw new Error('Firebase غير مهيأ');
  return collection(db, 'userWorkspaces', uid, 'students');
};

export async function loadWorkspace(uid: string): Promise<WorkspaceState | null> {
  const snapshot = await getDocs(studentCollection(uid));
  const legacyRoot = await getDoc(doc(db!, 'userWorkspaces', uid));
  if (snapshot.empty && !legacyRoot.exists()) return null;
  const state: WorkspaceState = { students: [], caseStudies: {}, assessments: {}, longTermPlans: {}, shortTermPlans: {}, dailySessions: {}, homeworkList: {}, finalReports: {} };
  snapshot.forEach(item => {
    const bundle = item.data() as StudentBundle;
    if (!bundle.profile) return;
    const id = bundle.profile.id;
    state.students.push(bundle.profile);
    if (bundle.caseStudy) state.caseStudies[id] = bundle.caseStudy;
    if (bundle.assessment) state.assessments[id] = bundle.assessment;
    if (bundle.longTermPlan) state.longTermPlans[id] = bundle.longTermPlan;
    if (bundle.shortTermPlan) state.shortTermPlans[id] = bundle.shortTermPlan;
    state.dailySessions[id] = bundle.sessions || [];
    state.homeworkList[id] = bundle.homework || [];
    if (bundle.finalReport) state.finalReports[id] = bundle.finalReport;
  });
  if (state.students.length === 0) return null;
  return state;
}

const pendingSaves = new Map<string, Promise<void>>();
export function saveWorkspace(uid: string, state: WorkspaceState): Promise<void> {
  const snapshot = structuredClone(state);
  const save = (pendingSaves.get(uid) || Promise.resolve()).catch(() => undefined).then(() => persistWorkspace(uid, snapshot));
  pendingSaves.set(uid, save);
  void save.finally(() => { if (pendingSaves.get(uid) === save) pendingSaves.delete(uid); }).catch(() => undefined);
  return save;
}

async function persistWorkspace(uid: string, state: WorkspaceState): Promise<void> {
  if (!db) throw new Error('Firebase غير مهيأ');
  const collectionRef = studentCollection(uid);
  await Promise.all(state.students.map(async profile => {
    const id = profile.id;
    const bundle: StudentBundle = {
      profile,
      caseStudy: state.caseStudies[id],
      assessment: state.assessments[id],
      longTermPlan: state.longTermPlans[id],
      shortTermPlan: state.shortTermPlans[id],
      sessions: state.dailySessions[id] || [],
      homework: state.homeworkList[id] || [],
      finalReport: state.finalReports[id]
    };
    await setDoc(doc(collectionRef, id), bundle, { merge: true });
  }));
  await setDoc(doc(db, 'userWorkspaces', uid), { ownerId: uid, schemaVersion: 1, updatedAt: serverTimestamp() }, { merge: true });
}

export async function recordLogin(uid: string, email: string | null): Promise<void> {
  if (!db) return;
  await setDoc(doc(db, 'userWorkspaces', uid), { ownerId: uid, email: email || '', lastLoginAt: serverTimestamp() }, { merge: true });
}

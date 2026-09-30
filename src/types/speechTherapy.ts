export type ArabicLetterKey =
  | 'أ' | 'ب' | 'ت' | 'ث' | 'ج' | 'ح' | 'خ'
  | 'د' | 'ذ' | 'ر' | 'ز' | 'س' | 'ش' | 'ص'
  | 'ض' | 'ط' | 'ظ' | 'ع' | 'غ' | 'ف' | 'ق'
  | 'ك' | 'ل' | 'م' | 'ن' | 'هـ' | 'و' | 'ي';

export interface LetterWordItem {
  word: string;
  sentence: string;
  imageUrl: string;
  imageAlt?: string;
}

export interface LetterPositionGroup {
  position: 'beginning' | 'middle' | 'end';
  positionLabel: string;
  words: [LetterWordItem, LetterWordItem, LetterWordItem]; // 3 نماذج كلمات واقعية لكل موضع
}

export interface LetterInfo {
  letter: ArabicLetterKey;
  name: string;
  articulationPoint: string; // مخرج الحرف
  articulationType: string; // صفات الحرف (جهر، همس، شدة، رخاوة، تفخيم، ترقيق)
  classification: 'شفوي' | 'أسناني' | 'لثوي' | 'غاري' | 'طبقي' | 'لهوي' | 'حلقي' | 'جوفي';
  mirrorInstruction: string; // طريقة استخدام المرآة
  tongueDepressorInstruction: string; // طريقة استخدام خافض اللسان
  clinicalTips: string[]; // نصائح علاجية للأخصائي
  shortVowels: {
    fatha: string;
    damma: string;
    kasra: string;
    sukoon: string;
  };
  longVowels: {
    alif: string;
    waw: string;
    yaa: string;
  };
  examples: {
    beginning: LetterPositionGroup;
    middle: LetterPositionGroup;
    end: LetterPositionGroup;
  };
  practiceSentences: string[];
}

export interface StudentProfile {
  deletedAt?: string | null;
  id: string;
  fullName: string;
  nationalId: string;
  birthDate?: string;
  age: string;
  grade: string;
  classRoom: string;
  guardianName: string;
  guardianPhone?: string;
  referralDate: string;
  specialistName: string; // ظافر ناصر الشهراني
  diagnosisCategory: string; // لدغة رائية، لدغة سينية، حذف أصوات، إبدال كاف بتاء...
  diagnosisCategories?: string[];
  targetLetters?: ArabicLetterKey[];
  status: 'active' | 'graduated' | 'under_evaluation';
}

export interface OralMotorExam {
  lips: {
    closure: 'سليم' | 'ضعيف' | 'مشوه' | (string & {});
    mobility: 'طبيعي' | 'محدود' | (string & {});
    symmetry: 'متناظر' | 'غير متناظر' | (string & {});
    notes: string;
  };
  teeth: {
    bite: 'إطباق سليم' | 'عضة مفتوحة' | 'عضة معكوسة' | 'تراكب أسنان' | (string & {});
    spacing: 'طبيعي' | 'فراغات بينية' | 'فقدان أسنان' | (string & {});
    notes: string;
  };
  tongue: {
    frenulum: 'طبيعي (غير مربوط)' | 'ربط لساني خفيف' | 'ربط لساني مقيد (ملتصق)' | (string & {});
    mobilityElevation: 'قادر على الرفع' | 'صعوبة بالرفع' | (string & {});
    mobilityLateral: 'طبيعي يميناً ويساراً' | 'محدود' | (string & {});
    size: 'طبيعي' | 'كبير نسبياً' | 'صغير' | (string & {});
    notes: string;
  };
  palateAndUvula: {
    hardPalate: 'سليم' | 'مرتفع وضيق' | 'شق سقف الحلق' | (string & {});
    softPalate: 'طبيعي ومتحرك' | 'ضعف رفع الصمام اللهائي' | (string & {});
    uvula: 'سليمة' | 'مشقوقة ثنائية' | 'منحرفة' | (string & {});
    nasality: 'طبيعي (بدون خنف)' | 'خنف مفتوح (رنين أنفي زائد)' | 'خنف مغلق' | (string & {});
    notes: string;
  };
  breathing: {
    type: 'أنفي سليم' | 'فموي' | 'مختلط' | (string & {});
    capacity: 'كافٍ لإخراج الجمل' | 'نفس قصير وسطحي' | (string & {});
    notes: string;
  };
  mirrorObservation: string;
  tongueDepressorExam: string;
}

export interface CaseStudyData {
  student: StudentProfile;
  medicalHistory: string;
  developmentHistory: string;
  speechHistory: string;
  familyHistory: string;
  hearingStatus: string;
  behaviorNotes: string;
  oralMotorExam: OralMotorExam;
  toolsUsed: string[];
  initialDiagnosis: string;
  recommendations: string[];
}

export interface LetterEvaluationItem {
  letter: ArabicLetterKey;
  beginning: {
    targetWord: string;
    production: 'صحيح' | 'حذف' | 'إبدال' | 'تشويه' | 'إضافة';
    substitutedLetter?: string;
    notes?: string;
  };
  middle: {
    targetWord: string;
    production: 'صحيح' | 'حذف' | 'إبدال' | 'تشويه' | 'إضافة';
    substitutedLetter?: string;
    notes?: string;
  };
  end: {
    targetWord: string;
    production: 'صحيح' | 'حذف' | 'إبدال' | 'تشويه' | 'إضافة';
    substitutedLetter?: string;
    notes?: string;
  };
}

export interface DiagnosticAssessment {
  studentId: string;
  assessmentDate: string;
  specialistName: string; // ظافر ناصر الشهراني
  toolsUsed: string[]; // 1- مرآة، 2- خافض لسان...
  lettersResults: Record<ArabicLetterKey, LetterEvaluationItem>;
  speechIntelligibilityScore: number; // percentage 0-100%
  primaryErrors: string[];
  summaryConclusion: string;
  summaryNeedsReview?: boolean;
}

export interface LongTermPlanGoal {
  status?: 'pending' | 'in_progress' | 'achieved';
  id: string;
  code: string; // مثال: هدف عام ١
  targetLetter: ArabicLetterKey;
  goalDescription: string;
  successCriterion: string;
  targetPeriod: string;
  startingBaseline: string;
  finalExpectedOutcome: string;
  evaluationMethod: string;
  progressPercentage: number;
}

export interface LongTermPlan {
  id: string;
  studentId: string;
  academicYear: string;
  semester: string;
  specialistName: string; // ظافر ناصر الشهراني
  goals: LongTermPlanGoal[];
  generalStrategies: string[];
  toolsUsed: string[];
  headmasterApproval: boolean;
}

export interface ShortTermObjective {
  id: string;
  stepNumber: number;
  objectiveText: string;
  targetLetter: ArabicLetterKey;
  level: string;
  toolsApplied: ('مرآة' | 'خافض لسان' | 'بطاقات بصرية' | 'تعزيز رمزي')[];
  mirrorUsageDetails: string;
  tongueDepressorDetails: string;
  successTargetPercentage: number;
  currentPercentage: number;
  startDate: string;
  targetDate: string;
  status: 'pending' | 'in_progress' | 'achieved';
  notes: string;
}

export interface ShortTermPlan {
  id: string;
  studentId: string;
  longTermGoalRef: string;
  targetLetter: ArabicLetterKey;
  targetLetters?: ArabicLetterKey[];
  planTitle: string;
  specialistName: string; // ظافر ناصر الشهراني
  objectives: ShortTermObjective[];
  clinicalMethodology: string;
  homeSupportRequirements: string;
}

export interface DailySessionLog {
  id: string;
  studentId: string;
  sessionNumber: number;
  sessionDate: string;
  sessionDuration: string; // 30 دقيقة
  targetLetter: ArabicLetterKey;
  targetObjective: string;
  toolsUsed: {
    mirror: boolean;
    tongueDepressor: boolean;
    audioRecorder: boolean;
    visualFlashcards: boolean;
    rewardTokens: boolean;
  };
  mirrorProcedure: string;
  depressorProcedure: string;
  exercisesPerformed: string[];
  studentResponse: 'ممتاز ومتحمس' | 'جيد جداً مع تحسن' | 'متوسط يحتاج تكرار' | 'مقاوم أو مشتت';
  accuracyRate: number; // 0-100%
  homeworkAssigned: string;
  specialistNotes: string;
  specialistName: string;
}

export interface HomeworkSheet {
  id: string;
  studentId: string;
  targetLetter: ArabicLetterKey;
  dateGiven: string;
  returnDate: string;
  letterInstructionsForParent: string;
  mirrorInstructionAtHome: string;
  wordsToPractice: {
    position: 'أول الكلمة' | 'وسط الكلمة' | 'آخر الكلمة';
    word: string;
    repetitionCount: number;
  }[];
  sentenceToRepeat: string;
  parentNotes: string;
  parentSignature: string;
  specialistFeedback: string;
  specialistName: string;
}

export interface FinalProgressReport {
  id: string;
  studentId: string;
  reportDate: string;
  specialistName: string; // ظافر ناصر الشهراني
  trainingPeriod: string;
  initialStateSummary: string;
  finalStateSummary: string;
  letterProgression: {
    letter: ArabicLetterKey;
    beforeRate: number;
    afterRate: number;
    status: 'تم التصحيح والتعميم' | 'تحسن كبير' | 'يحتاج استمرار متابعة' | 'قيد التدريب' | 'غير محدد';
  }[];
  speechIntelligibilityFinal: number;
  toolsEffectiveness: {
    mirrorEffectiveness: string;
    tongueDepressorEffectiveness: string;
  };
  recommendationsForNextStage: string[];
  headOfSpecialEducationApproval: string;
  schoolPrincipal: string;
}

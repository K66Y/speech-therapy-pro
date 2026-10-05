import {
  StudentProfile,
  ArabicLetterKey,
  CaseStudyData,
  DiagnosticAssessment,
  LongTermPlan,
  ShortTermPlan,
  DailySessionLog,
  HomeworkSheet,
  FinalProgressReport
} from '../types/speechTherapy';
import { ARABIC_LETTERS_LIST, ARABIC_LETTERS_MAP } from './arabicLettersData';
import { SPECIALIST_NAME, SCHOOL_KLICHE } from './sampleData';
import { getLiveHijriDate } from '../services/dateService';
import { parentTrainingGuide } from '../services/parentTrainingGuide';

export function createNewStudentRecords(student: StudentProfile, targetLettersInput: ArabicLetterKey[] | ArabicLetterKey) {
  const targetLetters = Array.isArray(targetLettersInput) ? [...new Set(targetLettersInput)] : [targetLettersInput];
  const targetLetter = targetLetters[0] || 'ر';
  const currentDate = getLiveHijriDate();
  const letterInfo = ARABIC_LETTERS_MAP[targetLetter] || ARABIC_LETTERS_MAP['ر'];
  const knownDiagnoses = (student.diagnosisCategories || [student.diagnosisCategory]).filter(value => ['إبدال', 'حذف', 'تشويه', 'إضافة'].includes(value)) as Array<'إبدال' | 'حذف' | 'تشويه' | 'إضافة'>;

  // 1. استمارة دراسة الحالة
  const caseStudy: CaseStudyData = {
    student,
    medicalHistory: 'تاريخ ولادي طبيعي دون مضاعفات، السمع سليم ولا توجد متلازمات وراثية أو أمراض مزمنة.',
    developmentHistory: 'تطور الحركات الكبرى طبيعي، تأخر طفيف في بداية نطق الكلمات والجمل في سن ما قبل المدرسة.',
    speechHistory: `صعوبة في نطق الأصوات المستهدفة (${targetLetters.join('، ')}) في مواضع الكلمة المختلفة مما يؤثر على الطلاقة اللغوية.`,
    familyHistory: `الأسرة متعاونة جداً وتتابع مع المدرسة لتطبيق التمارين المنزلية اليومية.`,
    hearingStatus: 'تم إجراء فحص المسح السمعي المدرسي وكانت النتيجة سليمة تماماً للأذنين.',
    behaviorNotes: 'طالب متعاون وذكي ويستجيب للتعزيز الإيجابي والتغذية الراجعة البصرية.',
    oralMotorExam: {
      lips: {
        closure: 'سليم',
        mobility: 'طبيعي',
        symmetry: 'متناظر',
        notes: 'إطباق الشفاه طبيعي وحركتها متناسقة.'
      },
      teeth: {
        bite: 'إطباق سليم',
        spacing: 'طبيعي',
        notes: 'لا توجد عضة مفتوحة أو تراكب يعيق مخارج الحروف.'
      },
      tongue: {
        frenulum: 'طبيعي (غير مربوط)',
        mobilityElevation: 'قادر على الرفع',
        mobilityLateral: 'طبيعي يميناً ويساراً',
        size: 'طبيعي',
        notes: `عضلة اللسان سليمة تشريحياً وبحاجة لتدريب موضعي لمخارج الأصوات (${targetLetters.join('، ')}).`
      },
      palateAndUvula: {
        hardPalate: 'سليم',
        softPalate: 'طبيعي ومتحرك',
        uvula: 'سليمة',
        nasality: 'طبيعي (بدون خنف)',
        notes: 'سقف الحلق واللهاة طبيعيان ولا يوجد رنين أنفي زائد.'
      },
      breathing: {
        type: 'أنفي سليم',
        capacity: 'كافٍ لإخراج الجمل',
        notes: 'التنفس سليم وسعة الهواء كافية لإخراج جمل كاملة.'
      },
      mirrorObservation: `تم تدريب الطالب على الوقوف أمام المرآة لملاحظة وضعية اللسان والشفاه بدقة عند نطق (${targetLetters.join('، ')}).`,
      tongueDepressorExam: `تم استخدام خافض اللسان الطبي المعقم لمساعدة الطالب على ضبط المخارج الصوتية للأحرف (${targetLetters.join('، ')}).`
    },
    toolsUsed: ['1- مرآة نطق مكبرة وواضحة', '2- خافض لسان طبي معقم', 'بطاقات تشخيص الأصوات الواقعية'],
    initialDiagnosis: `اضطراب نطق وظيفي في الأصوات المستهدفة (${targetLetters.join('، ')}) خالٍ من العيوب العضوية التشريحية.`,
    recommendations: [
      `الالتحاق بجلسات تدريبات النطق بمعدل جلستين أسبوعياً للتركيز على الأصوات (${targetLetters.join('، ')}).`,
      `استخدام المرآة لتوفير التغذية الراجعة البصرية أثناء إنتاج الأصوات.`,
      `استخدام خافض اللسان المعقم لتحديد نقاط التلامس الصحيحة في تجويف الفم.`,
      `إشراك الأسرة في متابعة وتطبيق أوراق الواجبات المنزلية.`
    ]
  };

  // 2. نتائج التشخيص المبدئي
  const lettersResults: any = {};
  ARABIC_LETTERS_LIST.forEach(l => {
    const isTarget = targetLetters.includes(l);
    const production = isTarget ? (knownDiagnoses[targetLetters.indexOf(l)] || knownDiagnoses[0] || 'إبدال') : 'صحيح';
    lettersResults[l] = {
      letter: l,
      beginning: {
        targetWord: ARABIC_LETTERS_MAP[l].examples.beginning.words[0].word,
        production,
        notes: isTarget ? `${production} في الصوت المستهدف ويحتاج إلى تدريب وفق نتيجة التقييم.` : 'نطق سليم'
      },
      middle: {
        targetWord: ARABIC_LETTERS_MAP[l].examples.middle.words[0].word,
        production,
        notes: isTarget ? `${production} في الصوت المستهدف ويحتاج إلى تدريب وفق نتيجة التقييم.` : 'نطق سليم'
      },
      end: {
        targetWord: ARABIC_LETTERS_MAP[l].examples.end.words[0].word,
        production,
        notes: isTarget ? `${production} في الصوت المستهدف ويحتاج إلى تدريب وفق نتيجة التقييم.` : 'نطق سليم'
      }
    };
  });

  const assessment: DiagnosticAssessment = {
    studentId: student.id,
    assessmentDate: currentDate,
    specialistName: SPECIALIST_NAME,
    toolsUsed: ['1- مرآة تدريبات النطق', '2- خافض لسان طبي معقم', 'بطاقات تشخيص الحروف الـ 28'],
    lettersResults,
    speechIntelligibilityScore: 88,
    primaryErrors: targetLetters.map(letter => `اضطراب نطق صوت حرف (${letter}) في أول ووسط وآخر الكلمة`),
    summaryConclusion: `أظهر التقييم التشخيصي وجود اضطراب نطق في الأصوات المستهدفة (${targetLetters.join('، ')}) بنسبة وضوح كلام إجمالية بلغت 88%. التوصية: خطة علاجية مخصصة باستخدام المرآة وخافض اللسان.`
  };

  // 3. الخطة طويلة المدى
  const longTermPlan: LongTermPlan = {
    id: `ltp-${student.id}`,
    studentId: student.id,
    academicYear: '1447 هـ',
    semester: 'الفصل الدراسي الأول',
    specialistName: SPECIALIST_NAME,
    goals: [
      {
        id: `ltg-${student.id}-1`,
        code: 'هدف عام 1',
        targetLetter,
        goalDescription: `أن ينطق الطالب صوت حرف (${targetLetter}) بجميع مواضعه وحركاته بنسبة إتقان لا تقل عن 90% في المحادثة الحرة بنهاية الفصل الدراسي.`,
        successCriterion: 'دقة نطق بنسبة 90% مقاسة عبر 3 جلسات تقييمية متتالية.',
        targetPeriod: 'فصل دراسي كامل (12 أسبوعاً)',
        startingBaseline: `إبدال صوت حرف (${targetLetter}) بنسبة خطأ في الكلمات العفوية.`,
        finalExpectedOutcome: `القدرة على نطق حرف (${targetLetter}) بطلاقة في الكلمات المعزولة والجمل والمحادثة اليومية.`,
        evaluationMethod: 'قوائم رصد الأداء الصوتي والنطقي والملاحظة المباشرة.',
    progressPercentage: 50
      }
    ],
    generalStrategies: [
      'استخدام التغذية الراجعة البصرية بالمرآة في كل جلسة.',
      'التوجيه الحسي العضلي بواسطة خافض اللسان الطبي المعقم.',
      'التدريج الهرمي السلوكي من الصوت المعزول إلى الحديث التلقائي.',
      'التعزيز الإيجابي الفوري المستمر.'
    ],
    toolsUsed: ['1- مرآة تدريبات النطق', '2- خافض لسان طبي معقم', 'بطاقات الكلمات الواقعية المصورة'],
    headmasterApproval: true
  };

  // 4. الخطة قصيرة المدى
  const shortTermPlan: ShortTermPlan = {
    id: `stp-${student.id}`,
    studentId: student.id,
    longTermGoalRef: 'هدف عام 1',
    targetLetter,
    targetLetters,
    planTitle: `الخطة التدريبية قصيرة المدى لمعالجة نطق حرف (${targetLetter})`,
    specialistName: SPECIALIST_NAME,
    clinicalMethodology: 'استراتيجية النمذجة البصرية والحسية والتدريب الهرمي المتدرج.',
    homeSupportRequirements: 'ممارسة ورقة العمل المنزلية اليومية لمدة 10 دقائق أمام مرآة المنزل.',
    objectives: [
      {
        id: `sto-${student.id}-1`,
        stepNumber: 1,
        objectiveText: `أن يخرج الطالب صوت حرف (${targetLetter}) معزولاً بنسبة صحة 90% باستخدام المرآة وخافض اللسان.`,
        targetLetter,
        level: 'عزل الصوت',
        toolsApplied: ['مرآة', 'خافض لسان', 'تعزيز رمزي'],
        mirrorUsageDetails: 'مراقبة انفراج الفكين وتثبيت وضعية الشفتين واللسان أمام المرآة.',
        tongueDepressorDetails: 'لمس لثة الأسنان وتوجيه طرف اللسان بالخافض الطبي المعقم.',
        successTargetPercentage: 90,
        currentPercentage: 70,
        startDate: currentDate,
        targetDate: currentDate,
        status: 'in_progress',
        notes: 'الاستجابة جيدة وهناك تقدم ملحوظ في إنتاج الصوت المعزول.'
      },
      {
        id: `sto-${student.id}-2`,
        stepNumber: 2,
        objectiveText: `أن ينطق الطالب كلمات تبدأ بحرف (${targetLetter}) في أول الكلمة بواسطة البطاقات الواقعية بنسبة 85%.`,
        targetLetter,
        level: 'كلمات أول الكلمة',
        toolsApplied: ['مرآة', 'بطاقات بصرية', 'تعزيز رمزي'],
        mirrorUsageDetails: 'تثبيت موضع اللسان قبل نطق كل كلمة ومطابقة فم المعلم.',
        tongueDepressorDetails: 'تثبيت جانبي اللسان وتوجيه الهواء للأمام.',
        successTargetPercentage: 85,
        currentPercentage: 60,
        startDate: currentDate,
        targetDate: currentDate,
        status: 'in_progress',
        notes: 'قيد التدريب في الجلسات القادمة.'
      }
    ]
  };

  const progression: { level: string; objective: string; target: number }[] = [
    { level: 'حرف منفرد', objective: 'نطق الحرف منفردًا بوضوح', target: 90 },
    { level: 'مقاطع الحرف', objective: 'نطق الحرف مع الحركات والمقاطع الصوتية', target: 85 },
    { level: 'الحرف في أول الكلمة', objective: 'نطق الحرف في أول الكلمة', target: 85 },
    { level: 'الحرف في وسط الكلمة', objective: 'نطق الحرف في وسط الكلمة', target: 80 },
    { level: 'الحرف في آخر الكلمة', objective: 'نطق الحرف في آخر الكلمة', target: 80 },
    { level: 'جمل تحتوي الحرف', objective: 'نطق الحرف ضمن جمل مفيدة', target: 80 },
    { level: 'محادثة تلقائية', objective: 'تعميم نطق الحرف في المحادثة التلقائية', target: 80 }
  ];
  shortTermPlan.objectives = targetLetters.flatMap(letter => progression.map((step, index) => ({
    id: `sto-${student.id}-${letter}-${index + 1}`,
    stepNumber: index + 1,
    objectiveText: `أن ${step.objective} (${letter}) بنسبة إتقان ${step.target}% حسب القياس.` ,
    targetLetter: letter,
    level: step.level,
    toolsApplied: index < 2 ? ['مرآة', 'خافض لسان', 'تعزيز رمزي'] as ('مرآة' | 'خافض لسان' | 'بطاقات بصرية' | 'تعزيز رمزي')[] : ['مرآة', 'بطاقات بصرية', 'تعزيز رمزي'] as ('مرآة' | 'خافض لسان' | 'بطاقات بصرية' | 'تعزيز رمزي')[],
    mirrorUsageDetails: `توجيه الطالب لملاحظة حركة اللسان والشفتين عند نطق الحرف (${letter}) في هذا المستوى.`,
    tongueDepressorDetails: index < 2 ? `استخدام الخافض لتوجيه مخرج الحرف (${letter}) عند الحاجة.` : 'يستخدم الخافض عند الحاجة فقط، ثم يستمر التدريب بدونه.',
    successTargetPercentage: step.target,
    currentPercentage: 0,
    startDate: currentDate,
    targetDate: currentDate,
    status: 'in_progress' as const,
    notes: ''
  })));
    longTermPlan.goals = targetLetters.map((letter, index) => ({
    ...(longTermPlan.goals[0] || {}),
    id: `ltg-${student.id}-${letter}`,
    code: `هدف عام ${index + 1}`,
    targetLetter: letter,
    goalDescription: `أن ينطق الطالب صوت حرف (${letter}) في جميع مواضعه وحركاته بنسبة إتقان لا تقل عن 90% في المحادثة الحرة.`,
    startingBaseline: `يُحدَّد مستوى أداء الطالب في حرف (${letter}) عند بدء الخطة.`,
    finalExpectedOutcome: `القدرة على نطق حرف (${letter}) بدقة في الكلمات والجمل والمحادثة اليومية.`
  }));

  // 5. سجل الجلسات
  const sessions: DailySessionLog[] = [
    {
      id: `ses-${student.id}-1`,
      studentId: student.id,
      sessionNumber: 1,
      sessionDate: currentDate,
      sessionDuration: '30 دقيقة',
      targetLetter,
      targetObjective: `التهيئة وبناء الألفة والتدريب على مخرج صوت (${targetLetter}) منفرداً بمساعدة المرآة والخافض`,
      toolsUsed: {
        mirror: true,
        tongueDepressor: true,
        audioRecorder: false,
        visualFlashcards: true,
        rewardTokens: true
      },
      mirrorProcedure: 'جلس الطالب أمام المرآة وضبط وضعية اللسان والشفاه قبل نطق الصوت.',
      depressorProcedure: 'استخدم الخافض المعقم لتنبيه لثة الثنايا العليا وتثبيت موضع اللسان.',
      exercisesPerformed: [
        'تمارين حركية لعضلات اللسان والشفاه.',
        'تدريب بصري حركي أمام المرآة.',
        `نطق المقاطع الصوتية لحرف (${targetLetter}).`
      ],
      studentResponse: 'ممتاز ومتحمس',
      accuracyRate: 85,
      homeworkAssigned: `التدريب أمام مرآة المنزل على نطق صوت (${targetLetter}) 10 مرات يومياً.`,
      specialistNotes: 'استجابة سريعة وتفاعل إيجابي مع التوجيه بالمرآة.',
      specialistName: SPECIALIST_NAME
    }
  ];
  sessions.splice(0, sessions.length, ...targetLetters.map((letter, index) => ({
    ...sessions[0],
    id: `ses-${student.id}-${letter}`,
    sessionNumber: index + 1,
    targetLetter: letter,
    targetObjective: `التهيئة وبناء الألفة والتدريب على مخرج صوت (${letter}) منفرداً بمساعدة المرآة والخافض`,
    exercisesPerformed: ['تمارين حركية للسان والشفاه.', 'تدريب أمام المرآة.', `نطق المقاطع الصوتية لحرف (${letter}).`],
    homeworkAssigned: `التدريب أمام مرآة المنزل على نطق صوت (${letter}) 10 مرات يومياً.`
  })));

  // 6. ورقة الواجبات
  const homework: HomeworkSheet[] = [
    {
      id: `hw-${student.id}-1`,
      studentId: student.id,
      targetLetter,
      dateGiven: currentDate,
      returnDate: currentDate,
      letterInstructionsForParent: `نرجو تدريب ابنكم أمام مرآة المنزل لمدة 5-10 دقائق وملاحظة حركة الفم واللسان عند نطق صوت حرف (${targetLetter}).`,
      mirrorInstructionAtHome: parentTrainingGuide(targetLetter),
      wordsToPractice: [
        { position: 'أول الكلمة', word: letterInfo.examples.beginning.words[0].word, repetitionCount: 5 },
        { position: 'وسط الكلمة', word: letterInfo.examples.middle.words[0].word, repetitionCount: 5 },
        { position: 'آخر الكلمة', word: letterInfo.examples.end.words[0].word, repetitionCount: 5 }
      ],
      sentenceToRepeat: letterInfo.examples.beginning.words[0].sentence,
      parentNotes: '',
      parentSignature: student.guardianName,
      specialistFeedback: 'جهد مشكور وتقدم ملموس والحمد لله.',
      specialistName: SPECIALIST_NAME
    }
  ];
  homework.splice(0, homework.length, ...targetLetters.map((letter, index) => {
    const info = ARABIC_LETTERS_MAP[letter];
    return {
      ...homework[0],
      id: `hw-${student.id}-${letter}`,
      targetLetter: letter,
      letterInstructionsForParent: `نرجو تدريب ابنكم أمام مرآة المنزل لمدة 5-10 دقائق وملاحظة حركة الفم واللسان عند نطق صوت حرف (${letter}).`,
      mirrorInstructionAtHome: parentTrainingGuide(letter),
      wordsToPractice: [
        ...info.examples.beginning.words.map(w => ({ position: 'أول الكلمة' as const, word: w.word, repetitionCount: 5 })),
        ...info.examples.middle.words.map(w => ({ position: 'وسط الكلمة' as const, word: w.word, repetitionCount: 5 })),
        ...info.examples.end.words.map(w => ({ position: 'آخر الكلمة' as const, word: w.word, repetitionCount: 5 }))
      ],
      sentenceToRepeat: info.practiceSentences[0] || info.examples.beginning.words[0].sentence,
      parentNotes: '',
      parentSignature: student.guardianName
    };
  }));

  // 7. التقرير النهائي
  const finalReport: FinalProgressReport = {
    id: `fr-${student.id}`,
    studentId: student.id,
    reportDate: currentDate,
    specialistName: SPECIALIST_NAME,
    trainingPeriod: 'الفصل الدراسي الأول (جلسات مكثفة)',
    initialStateSummary: `بدأ الطالب البرنامج بنسبة وضوح 88% مع صعوبة في نطق صوت حرف (${targetLetter}) في مواضع الكلمة المختلفة.`,
    finalStateSummary: `تحسن ملحوظ جداً في مخارج الأصوات، وتمكن الطالب من نطق صوت (${targetLetter}) في الكلمات والجمل بدقة 95%.`,
    letterProgression: [
      {
        letter: targetLetter,
        beforeRate: 0,
        afterRate: 95,
        status: 'تم التصحيح والتعميم'
      }
    ],
    speechIntelligibilityFinal: 95,
    toolsEffectiveness: {
      mirrorEffectiveness: 'ساعدت المرآة الطالب على تصحيح الخطأ ذاتياً ومطابقة وضعية المخرج النطقي.',
      tongueDepressorEffectiveness: 'ساهم خافض اللسان في ضبط الارتكاز وتثبيت حركة اللسان بدقة.'
    },
    recommendationsForNextStage: [
      'الاستمرار في القراءة الجهرية والمشاركة في الإذاعة المدرسية.',
      'متابعة دورية كل شهر للاطمئنان على استقرار وتثبيت الصوت في المحادثة اليومية.'
    ],
    headOfSpecialEducationApproval: 'معتمد وفق المعايير الإكلينيكية المعتمدة',
    schoolPrincipal: 'معتمد'
  };

  return {
    caseStudy,
    assessment,
    longTermPlan,
    shortTermPlan,
    sessions,
    homework,
    finalReport
  };
}

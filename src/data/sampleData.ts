import {
  StudentProfile,
  CaseStudyData,
  DiagnosticAssessment,
  LongTermPlan,
  ShortTermPlan,
  DailySessionLog,
  HomeworkSheet,
  FinalProgressReport
} from '../types/speechTherapy';
import { ARABIC_LETTERS_LIST, ARABIC_LETTERS_MAP } from './arabicLettersData';

export const SPECIALIST_NAME = 'ظافر ناصر الشهراني';

export const SCHOOL_KLICHE = {
  line1: 'المملكة العربية السعودية',
  line2: 'وزارة التعليم',
  line3: 'إدارة التعليم بمنطقة عسير',
  line4: 'ابتدائية ومتوسطة الشط وبرامج التربية الخاصة',
  specialistTitle: 'أخصائي تدريبات نطق',
  specialistName: SPECIALIST_NAME
};

export const SAMPLE_STUDENTS: StudentProfile[] = [
  {
    id: 'std-001',
    fullName: 'خالد عبدالله القحطاني',
    nationalId: '1124589632',
    age: '8 سنوات و 6 أشهر',
    grade: 'الصف الثالث الابتدائي',
    classRoom: '3 / أ',
    guardianName: 'عبدالله بن محمد القحطاني',
    referralDate: '1447/01/18 هـ',
    specialistName: SPECIALIST_NAME,
    diagnosisCategory: 'لدغة رائية (إبدال حرف الراء بالياء واللام) وضعف وضوح الكلام',
    status: 'active'
  },
  {
    id: 'std-002',
    fullName: 'عمر فهد الشهراني',
    nationalId: '1138974512',
    age: '7 سنوات و 8 أشهر',
    grade: 'الصف الثاني الابتدائي',
    classRoom: '2 / ب',
    guardianName: 'فهد بن ناصر الشهراني',
    referralDate: '1447/01/22 هـ',
    specialistName: SPECIALIST_NAME,
    diagnosisCategory: 'لدغة سينية بين-أسنانية (إبدال حرف السين بالثاء)',
    status: 'active'
  },
  {
    id: 'std-003',
    fullName: 'سعود عبدالعزيز عسيري',
    nationalId: '1141256398',
    age: '6 سنوات و 4 أشهر',
    grade: 'الصف الأول الابتدائي',
    classRoom: '1 / أ',
    guardianName: 'عبدالعزيز بن أحمد عسيري',
    referralDate: '1447/02/01 هـ',
    specialistName: SPECIALIST_NAME,
    diagnosisCategory: 'إبدال خلفي أمامي (إبدال الكاف بالتاء والقاف بالدال)',
    status: 'under_evaluation'
  }
];

export const INITIAL_CASE_STUDIES: Record<string, CaseStudyData> = {
  'std-001': {
    student: SAMPLE_STUDENTS[0],
    medicalHistory: 'تاريخ ولادي طبيعي دون مضاعفات، السمع سليم ولا توجد متلازمات وراثية. لا يعاني من حساسية صدرية مزمنة.',
    developmentHistory: 'تطور المشي والحركات الكبرى طبيعي. تأخر طفيف في نطق الكلمات الأولى حتى عمر سنتين ونصف.',
    speechHistory: 'لوحظ صعوبة نطق صوت (الراء) منذ سن الرابعة حيث يستبدله بـ (الياء) في أغلب مواضع الكلمة، ويتحول إلى (اللام) عند نطق الجمل السريعة مما يسبب إحراجاً للطالب في الصف.',
    familyHistory: 'الابن الثاني في الأسرة، يوجد دعم عائلي ممتاز من الوالدين والتزام بحضور الجلسات ومتابعة الواجبات المنزلية.',
    hearingStatus: 'تم إجراء فحص مقياس السمع النغمي في المركز الصحي وكانت النتيجة ضمن الحدود السمعية الطبيعية لكلا الأذنين (أقل من 20 ديسيبل).',
    behaviorNotes: 'طالب متعاون جداً، ذكي ولماح، يظهر استجابة ممتازة للتعزيز اللفظي والمادي، ويشعر بالرغبة في تحسين نطقه ليتحدث في الإذاعة المدرسية.',
    oralMotorExam: {
      lips: {
        closure: 'سليم',
        mobility: 'طبيعي',
        symmetry: 'متناظر',
        notes: 'إطباق الشفاه طبيعي، قادر على التصفير وحبس الهواء في تجويف الفم.'
      },
      teeth: {
        bite: 'إطباق سليم',
        spacing: 'طبيعي',
        notes: 'بزوغ القواطع الدائمة العلوية والسفلية سليم ولا توجد عضة مفتوحة.'
      },
      tongue: {
        frenulum: 'طبيعي (غير مربوط)',
        mobilityElevation: 'قادر على الرفع',
        mobilityLateral: 'طبيعي يميناً ويساراً',
        size: 'طبيعي',
        notes: 'الرابط اللساني طبيعي غير ملتصق، مرونة طرف اللسان جيدة مع خمول وظيفي طفيف في الارتعاد اللثوي السريع.'
      },
      palateAndUvula: {
        hardPalate: 'سليم',
        softPalate: 'طبيعي ومتحرك',
        uvula: 'سليمة',
        nasality: 'طبيعي (بدون خنف)',
        notes: 'سقف الحلق الصلب طبيعي القبة، اللهاة متناظرة، لا يوجد أي أثر لخنف أنفي.'
      },
      breathing: {
        type: 'أنفي سليم',
        capacity: 'كافٍ لإخراج الجمل',
        notes: 'التحكم بالزفير والشهيق كافٍ لإخراج جمل من 4-5 كلمات بسلاسة.'
      },
      mirrorObservation: 'عند النطق أمام المرآة، لوحظ انخفاض طرف اللسان في قاع الفم بدلاً من ارتفاعه للثة عند نطق صوت الراء، مع مقارنة بصرية بين حركة فم المعلم والطالب.',
      tongueDepressorExam: 'تم فحص حركة اللسان بالخافض الطبي، واستجابت عضلة طرف اللسان للمس اللثة العلوية دون ألم أو صعوبة حركية عضوية.'
    },
    toolsUsed: ['1- مرآة نطق مكبرة وواضحة', '2- خافض لسان طبي معقم', 'مصباح كشف فموي', 'بطاقات تشخيص الأصوات'],
    initialDiagnosis: 'اضطراب نطق وظيفي في الصوت /ر/ (لدغة رائية إبدالية) خالية من العيوب العضوية التشريحية.',
    recommendations: [
      'تطبيق خطة تدريبية لرفع طرف اللسان وتعزيز الارتعاد اللثوي.',
      'استخدام المرآة في كل جلسة للضبط البصري الحركي.',
      'استخدام خافض اللسان لتحديد نقطة التلامس اللثوي وتدريب العضلات.',
      'إشراك الأسرة في التدريبات المنزلية اليومية لمدة 10 دقائق.'
    ]
  }
};

export const INITIAL_DIAGNOSTIC_ASSESSMENTS: Record<string, DiagnosticAssessment> = {
  'std-001': {
    studentId: 'std-001',
    assessmentDate: '1447/01/20 هـ',
    specialistName: SPECIALIST_NAME,
    toolsUsed: ['1- مرآة تدريبات النطق', '2- خافض لسان طبي معقم', 'قائمة اختبار الأصوات المصورة'],
    lettersResults: generateSampleDiagnosticResults('std-001'),
    speechIntelligibilityScore: 82,
    primaryErrors: [
      'إبدال صوت الراء [ر] بالياء [ي] في أول ووسط وآخر الكلمة.',
      'تشويه طفيف لصوت الضاد [ض] في نهاية بعض الكلمات المتطرفة.'
    ],
    summaryConclusion: 'يعاني الطالب من عيب نطقي نوعي في الصوت /ر/ فقط، بينما باقي الأصوات اللغوية الـ 27 تنطق بشكل سليم مع وضوح نطق إجمالي 82%. الاستجابة ممتازة لتعديل المخرج.'
  }
};

function generateSampleDiagnosticResults(studentId: string) {
  const results: any = {};
  for (const letter of ARABIC_LETTERS_LIST) {
    const info = ARABIC_LETTERS_MAP[letter];
    if (studentId === 'std-001' && letter === 'ر') {
      results[letter] = {
        letter,
        beginning: {
          targetWord: info.examples.beginning.words[0].word,
          production: 'إبدال',
          substitutedLetter: 'ي',
          notes: 'ينطق (يُمَّان) بدلاً من (رُمَّان)'
        },
        middle: {
          targetWord: info.examples.middle.words[0].word,
          production: 'إبدال',
          substitutedLetter: 'ي',
          notes: 'ينطق (كُيَة) بدلاً من (كُرَة)'
        },
        end: {
          targetWord: info.examples.end.words[0].word,
          production: 'إبدال',
          substitutedLetter: 'ي',
          notes: 'ينطق (نَمِيْ) بدلاً من (نَمِر)'
        }
      };
    } else {
      results[letter] = {
        letter,
        beginning: {
          targetWord: info.examples.beginning.words[0].word,
          production: 'صحيح',
          notes: 'نطق سليم وواضح'
        },
        middle: {
          targetWord: info.examples.middle.words[0].word,
          production: 'صحيح',
          notes: 'نطق سليم'
        },
        end: {
          targetWord: info.examples.end.words[0].word,
          production: 'صحيح',
          notes: 'نطق سليم'
        }
      };
    }
  }
  return results;
}

export const INITIAL_LONG_TERM_PLANS: Record<string, LongTermPlan> = {
  'std-001': {
    id: 'ltp-001',
    studentId: 'std-001',
    academicYear: '1447 هـ',
    semester: 'الفصل الدراسي الأول',
    specialistName: SPECIALIST_NAME,
    goals: [
      {
        id: 'ltg-1',
        code: 'هدف عام 1',
        targetLetter: 'ر',
        goalDescription: 'أن ينطق الطالب خالد صوت حرف الراء [ر] بجميع مواضعه وحركاته بنسبة إتقان لا تقل عن 90% في الكلام التلقائي والمحادثة الحرة المستمرة بنهاية الفصل الدراسي.',
        successCriterion: 'دقة نطق بنسبة 90% مقاسة عبر 3 جلسات تقييمية متتالية مسجلة.',
        targetPeriod: 'فصل دراسي كامل (12 أسبوعاً - بمعدل جلستين أسبوعياً)',
        startingBaseline: 'إبدال الراء بالياء بنسبة خطأ 100% في الكلمات العفوية.',
        finalExpectedOutcome: 'القدرة على نطق حرف الراء بطلاقة في الكلمات المعزولة، والجمل، والمحادثة اليومية، والمشاركة في الإذاعة المدرسية.',
        evaluationMethod: 'قوائم رصد الأداء الصوتي والنطقي، التسجيل الصوتي المباشر، وملاحظة المعلم وولي الأمر.',
        progressPercentage: 75
      }
    ],
    generalStrategies: [
      'استخدام التغذية الراجعة البصرية بالمرآة في كل جلسة.',
      'التوجيه الحسي العضلي بواسطة خافض اللسان الطبي المعقم.',
      'التدريج الهرمي السلوكي (صوت مفرد -> مقاطع -> أول الكلمة -> وسط الكلمة -> آخر الكلمة -> جمل -> حديث حر).',
      'التعزيز الإيجابي الفوري (جدول التعزيز الرمزي والمكافآت).'
    ],
    toolsUsed: ['1- مرآة تدريبات النطق', '2- خافض لسان طبي معقم', 'بطاقات الكلمات الواقعية', 'مسجل صوتي', 'لوحة النجوم التفاعلية'],
    headmasterApproval: true
  }
};

export const INITIAL_SHORT_TERM_PLANS: Record<string, ShortTermPlan> = {
  'std-001': {
    id: 'stp-001',
    studentId: 'std-001',
    longTermGoalRef: 'هدف عام 1',
    targetLetter: 'ر',
    planTitle: 'الخطة التدريبية قصيرة المدى لمعالجة نطق حرف الراء [ر]',
    specialistName: SPECIALIST_NAME,
    clinicalMethodology: 'استراتيجية النمذجة البصرية والحسية والتدريب الهرمي المتدرج من الصوت المعزول إلى التعميم الكلامي.',
    homeSupportRequirements: 'ممارسة ورقة العمل المنزلية اليومية لمدة 10 دقائق أمام مرآة المنزل بحضور ولي الأمر وتوثيق ذلك.',
    objectives: [
      {
        id: 'sto-1',
        stepNumber: 1,
        objectiveText: 'أن يخرج الطالب صوت حرف الراء [رْ] معزولاً بنسبة صحة 90% باستخدام المرآة وخافض اللسان.',
        targetLetter: 'ر',
        level: 'عزل الصوت',
        toolsApplied: ['مرآة', 'خافض لسان', 'تعزيز رمزي'],
        mirrorUsageDetails: 'مراقبة انفراج الفكين وتثبيت وضعية الشفتين ومراقبة ارتعاد طرف اللسان السريع أمام المرآة.',
        tongueDepressorDetails: 'لمس لثة الأسنان العليا بالخافض لتحديد نقطة الارتكاز العصبية الحركية.',
        successTargetPercentage: 90,
        currentPercentage: 95,
        startDate: '1447/01/22 هـ',
        targetDate: '1447/02/05 هـ',
        status: 'achieved',
        notes: 'تم تحقيق الهدف بنجاح باهر وبدأ الطالب ينتج الصوت المعزول بثقة.'
      },
      {
        id: 'sto-2',
        stepNumber: 2,
        objectiveText: 'أن ينطق الطالب صوت الراء مع الحركات القصيرة والطويلة (رَ، رُ، رِ، رَا، رُو، رِي) بنسبة صحة 85%.',
        targetLetter: 'ر',
        level: 'مقاطع صوتية',
        toolsApplied: ['مرآة', 'خافض لسان', 'بطاقات بصرية'],
        mirrorUsageDetails: 'مراقبة حركة الفم عند الفتح والضم والكسر مع استمرار ارتعاد طرف اللسان في المرآة.',
        tongueDepressorDetails: 'استخدام الخافض لرفع طرف اللسان برفق عند كسر المقطع (رِ) لمنع تحوله إلى ياء.',
        successTargetPercentage: 85,
        currentPercentage: 90,
        startDate: '1447/02/06 هـ',
        targetDate: '1447/02/20 هـ',
        status: 'achieved',
        notes: 'أتقن الطالب المقاطع الصوتية بشكل ممتاز مع الحركات الثلاث.'
      },
      {
        id: 'sto-3',
        stepNumber: 3,
        objectiveText: 'أن ينطق الطالب كلمات تبدأ بحرف الراء في أول الكلمة (10 كلمات بصور واقعية مثل: رُمَّان، رَجُل، رِيشَة...) بنسبة صحة 85%.',
        targetLetter: 'ر',
        level: 'كلمات أول الكلمة',
        toolsApplied: ['مرآة', 'بطاقات بصرية', 'تعزيز رمزي'],
        mirrorUsageDetails: 'توجيه الطالب أمام المرآة للبدء فوراً بلمس اللثة العلوية قبل إطلاق صوت الكلمة.',
        tongueDepressorDetails: 'تنبيه موضعي بالخافض قبل بداية نطق القائمة لتأكيد المخرج.',
        successTargetPercentage: 85,
        currentPercentage: 85,
        startDate: '1447/02/21 هـ',
        targetDate: '1447/03/05 هـ',
        status: 'achieved',
        notes: 'تم إتقان نطق الراء في أول الكلمة بدقة.'
      },
      {
        id: 'sto-4',
        stepNumber: 4,
        objectiveText: 'أن ينطق الطالب كلمات تحتوي حرف الراء في وسط الكلمة (10 كلمات بصور واقعية مثل: كُرَة، مَطَر، جَرَس...) بنسبة صحة 80%.',
        targetLetter: 'ر',
        level: 'كلمات وسط الكلمة',
        toolsApplied: ['مرآة', 'خافض لسان', 'بطاقات بصرية'],
        mirrorUsageDetails: 'مراقبة الانتقال السلس من الصوت السابق إلى صوت الراء أمام المرآة دون استبداله بالياء.',
        tongueDepressorDetails: 'استخدام الخافض لتذكير الطالب بموضع اللسان عند حدوث خطأ إبدالي في وسط الكلمة.',
        successTargetPercentage: 80,
        currentPercentage: 75,
        startDate: '1447/03/06 هـ',
        targetDate: '1447/03/20 هـ',
        status: 'in_progress',
        notes: 'الطالب يظهر تحسناً ملحوظاً ويحتاج تركيزاً على بعض الكلمات المشددة.'
      },
      {
        id: 'sto-5',
        stepNumber: 5,
        objectiveText: 'أن ينطق الطالب كلمات تنتهي بحرف الراء في آخر الكلمة (10 كلمات بصور واقعية مثل: نَمِر، قَمَر، مَطَار...) بنسبة صحة 80%.',
        targetLetter: 'ر',
        level: 'كلمات آخر الكلمة',
        toolsApplied: ['مرآة', 'بطاقات بصرية'],
        mirrorUsageDetails: 'التأكد من عدم إسقاط صوت الراء الساكن أو المتحرك في نهاية الكلمة.',
        tongueDepressorDetails: 'التدريب على ملامسة اللثة عند الوقف.',
        successTargetPercentage: 80,
        currentPercentage: 70,
        startDate: '1447/03/21 هـ',
        targetDate: '1447/04/05 هـ',
        status: 'in_progress',
        notes: 'جاري التدريب المستمر.'
      },
      {
        id: 'sto-6',
        stepNumber: 6,
        objectiveText: 'أن ينطق الطالب جملاً مفيدة مكونة من 3 إلى 4 كلمات تشتمل على حرف الراء بنسبة صحة 80%.',
        targetLetter: 'ر',
        level: 'جمل بسيطة',
        toolsApplied: ['مرآة', 'بطاقات بصرية', 'تعزيز رمزي'],
        mirrorUsageDetails: 'التحدث بجمل مع النظر للمرآة لضبط الإيقاع وسرعة الكلام.',
        tongueDepressorDetails: 'لا يستخدم الخافض في هذه المرحلة للتركيز على الانسيابية.',
        successTargetPercentage: 80,
        currentPercentage: 60,
        startDate: '1447/04/06 هـ',
        targetDate: '1447/04/20 هـ',
        status: 'pending',
        notes: 'مجدول للأسابيع القادمة.'
      },
      {
        id: 'sto-7',
        stepNumber: 7,
        objectiveText: 'أن يعمم الطالب نطق حرف الراء في الحوار الحر والمواقف الصفية والتعبير الشفوي بنسبة صحة 90%.',
        targetLetter: 'ر',
        level: 'محادثة تلقائية',
        toolsApplied: ['تعزيز رمزي'],
        mirrorUsageDetails: 'مراقبة ذاتية دورية وتغذية سمعية راجعة.',
        tongueDepressorDetails: 'تم الاستغناء عنه.',
        successTargetPercentage: 90,
        currentPercentage: 50,
        startDate: '1447/04/21 هـ',
        targetDate: '1447/05/10 هـ',
        status: 'pending',
        notes: 'المرحلة النهائية للتخريج.'
      }
    ]
  }
};

export const INITIAL_DAILY_SESSIONS: Record<string, DailySessionLog[]> = {
  'std-001': [
    {
      id: 'ses-001',
      studentId: 'std-001',
      sessionNumber: 1,
      sessionDate: '1447/01/25 هـ',
      sessionDuration: '30 دقيقة',
      targetLetter: 'ر',
      targetObjective: 'إنتاج صوت الراء المعزول والمقاطع المفتوحة باستخدام المرآة والخافض',
      toolsUsed: {
        mirror: true,
        tongueDepressor: true,
        audioRecorder: false,
        visualFlashcards: true,
        rewardTokens: true
      },
      mirrorProcedure: 'جلس الطالب أمام المرآة الكبيرة بمحاذاة المعلم لملاحظة رفع طرف اللسان والتأكد من عدم عض الشفاه.',
      depressorProcedure: 'استخدم المعلم خافض اللسان الخشبي المعقم للمس لثة الأسنان العلوية وتوجيه طرف لسان الطالب للارتفاع.',
      exercisesPerformed: [
        'تمارين حركية للسان (رفع اللسان للأنف، خفضه للذقن، حركات دائرية).',
        'تنبيه اللثة بالخافض المعقم.',
        'تدريب ارتعاد الشفاه (بررر) ثم ارتعاد اللسان (تْدْ تْدْ رْ).',
        'نطق المقاطع (رَا - رُو - رِي).'
      ],
      studentResponse: 'ممتاز ومتحمس',
      accuracyRate: 85,
      homeworkAssigned: 'تكرار نطق صوت الراء المعزول أمام مرآة المنزل 10 مرات يومياً.',
      specialistNotes: 'استجابة سريعة جداً للمرآة، وأبدى فرحة كبيرة عند سماع صوته الصحيح لأول مرة.',
      specialistName: SPECIALIST_NAME
    },
    {
      id: 'ses-002',
      studentId: 'std-001',
      sessionNumber: 2,
      sessionDate: '1447/02/02 هـ',
      sessionDuration: '30 دقيقة',
      targetLetter: 'ر',
      targetObjective: 'نطق كلمات تبدأ بحرف الراء في أول الكلمة بواسطة البطاقات المصورة الواقعية',
      toolsUsed: {
        mirror: true,
        tongueDepressor: true,
        audioRecorder: false,
        visualFlashcards: true,
        rewardTokens: true
      },
      mirrorProcedure: 'استعان الطالب بالمرآة لتثبيت موضع اللسان قبل نطق كل كلمة من بطاقات الصور.',
      depressorProcedure: 'تم استخدام الخافض في بداية الجلسة لتثبيت موضع اللثة ثم الاستغناء عنه أثناء نطق الكلمات.',
      exercisesPerformed: [
        'مراجعة المقاطع الصوتية (رَا - رُو - رِي).',
        'نطق بطاقات الصور الواقعية: (رُمَّان، رَجُل، رِيشَة، رَسْم، رَمْل).',
        'مراجعة النطق وتقييم الأداء ذاتياً أمام المرآة.'
      ],
      studentResponse: 'ممتاز ومتحمس',
      accuracyRate: 88,
      homeworkAssigned: 'ورقة عمل منزلية لكلمات أول الكلمة (رُمَّان، رَجُل، رِيشَة) مع التلوين والتكرار.',
      specialistNotes: 'أصبح الطالب ينتبه ذاتياً عندما يخطئ ويصحح نطقه مباشرة دون مساعدة.',
      specialistName: SPECIALIST_NAME
    }
  ]
};

export const INITIAL_HOMEWORK_SHEETS: Record<string, HomeworkSheet[]> = {
  'std-001': [
    {
      id: 'hw-001',
      studentId: 'std-001',
      targetLetter: 'ر',
      dateGiven: '1447/02/02 هـ',
      returnDate: '1447/02/06 هـ',
      letterInstructionsForParent: 'المكرم ولي أمر الطالب، نرجو تدريب ابنكم أمام مرآة المنزل بحيث يرى شفتيه ولسانه وهو يرفع طرف اللسان للثة العلوية دون إغلاق الفم أو تحويل الصوت للياء.',
      mirrorInstructionAtHome: 'اجعل الطالب ينظر في المرآة ويبتسم ابتسامة خفيفة، ثم يرفع طرف لسانه ليلامس سقف الفم خلف الأسنان مباشرة ويكرر الصوت بوضوح.',
      wordsToPractice: [
        { position: 'أول الكلمة', word: 'رُمَّان', repetitionCount: 5 },
        { position: 'أول الكلمة', word: 'رَجُل', repetitionCount: 5 },
        { position: 'أول الكلمة', word: 'رِيشَة', repetitionCount: 5 },
        { position: 'وسط الكلمة', word: 'كُرَة', repetitionCount: 5 },
        { position: 'آخر الكلمة', word: 'نَمِر', repetitionCount: 5 }
      ],
      sentenceToRepeat: 'رَكِبَ رَامِي قِطَارَ الرِّحْلَاتِ المَدْرَسِيَّةِ.',
      parentNotes: '',
      parentSignature: 'عبدالله القحطاني',
      specialistFeedback: 'جهد رائع وتقدم ملموس جداً، بارك الله في جهودكم المستمرة.',
      specialistName: SPECIALIST_NAME
    }
  ]
};

export const INITIAL_FINAL_REPORTS: Record<string, FinalProgressReport> = {
  'std-001': {
    id: 'fr-001',
    studentId: 'std-001',
    reportDate: '1447/03/15 هـ',
    specialistName: SPECIALIST_NAME,
    trainingPeriod: 'الفصل الدراسي الأول (8 أسابيع تدريبية مكثفة)',
    initialStateSummary: 'كان الطالب يعاني من لدغة رائية صريحة (إبدال حرف الراء بالياء في جميع المواضع)، مما أثر على ثقته بنفسه ووضوح كلامه بنسبة إتقان 0% لصوت الراء عند بدء البرنامج.',
    finalStateSummary: 'أظهر الطالب استجابة علاجية استثنائية، حيث أتقن إنتاج صوت الراء منفرداً، ومع الحركات الطويلة والقصيرة، وفي مواضع الكلمات الثلاثة، وبلغت نسبة الإتقان في الجمل التعبيرية 85% مع ثقة عالية بالنفس.',
    letterProgression: [
      {
        letter: 'ر',
        beforeRate: 0,
        afterRate: 88,
        status: 'تحسن كبير'
      }
    ],
    speechIntelligibilityFinal: 96,
    toolsEffectiveness: {
      mirrorEffectiveness: 'شكلت المرآة أداة حاسمة ومحورية للطالب للمقارنة البصرية الفورية بين نموذج فم المعلم وفمه، مما ساهم في تصحيح وضعية اللسان بنسبة 80% من الجلسة الأولى.',
      tongueDepressorEffectiveness: 'ساعد خافض اللسان الطبي المعقم في تحديد الموضع اللمسي الحسي الدقيق للثة الثنايا العليا، وتدريب عضلة طرف اللسان على الارتفاع والارتعاد.'
    },
    recommendationsForNextStage: [
      'الاستمرار في جلسات التعميم والمحادثة الحرة بمعدل جلسة واحدة أسبوعياً.',
      'إشراك الطالب في الإذاعة المدرسية وتشجيعه على الإلقاء أمام زملائه لتعزيز الثقة.',
      'متابعة دورية من معلم الصف ورصد أي انتكاس نفعي أثناء الحصص الدراسية.'
    ],
    headOfSpecialEducationApproval: 'معتمد من مشرف برامج التربية الخاصة',
    schoolPrincipal: 'قائد ابتدائية ومتوسطة الشط'
  }
};

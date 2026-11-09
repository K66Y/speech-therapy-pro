import { DiagnosticAssessment, DiagnosticDomains } from '../types/speechTherapy';

export const DEFAULT_DIAGNOSTIC_DOMAINS: DiagnosticDomains = {
  fluency: {
    status: 'لم يُقيّم',
    skills: 'توثيق عينة كلام مناسبة في أكثر من موقف، ورصد تكرارات الأصوات أو المقاطع والكلمات، والإطالات والوقفات، والجهد أو التوتر والسلوكيات المصاحبة، ومدى أثرها في المشاركة والراحة. يُسأل الطالب وولي أمره عن الأثر دون وصم أو استعجال.',
    evaluation: 'لم يُستكمل تقييم الطلاقة بعد. تُحدد النتيجة بعد عينة ممثلة ومعلومات من الطالب والأسرة، ولا يُستنتج غياب التأتأة من عينة قصيرة أو من نسبة وضوح الكلام وحدها.'
  },
  receptiveLanguage: {
    status: 'لم يُقيّم',
    skills: 'فهم التعليمات المتدرجة، وتمييز المفاهيم والمفردات، والإجابة عن أسئلة من وماذا وأين ولماذا، وفهم العلاقات والتسلسل في قصة قصيرة.',
    evaluation: 'لم يُستكمل تقييم مهارات اللغة الاستقبالية بعد؛ تُوثق النتائج بعد تطبيق مهام مناسبة لعمر الطالب وصفه.'
  },
  expressiveLanguage: {
    status: 'لم يُقيّم',
    skills: 'تسمية الأشياء والأفعال، وتكوين جمل مناسبة للعمر، واستخدام الضمائر والأزمنة والروابط، ووصف الصور وسرد الأحداث بترتيب واضح.',
    evaluation: 'لم يُستكمل تقييم مهارات اللغة التعبيرية بعد؛ تُوثق النتائج من عينة لغوية ومهام مناسبة لعمر الطالب.'
  },
  vocabulary: {
    status: 'لم يُقيّم',
    skills: 'التعرّف إلى المفردات وتسميتها واستخدامها في سياق مناسب، وفهم المرادفات والتصنيفات والعلاقات بين الكلمات بحسب العمر والمرحلة الدراسية.',
    evaluation: 'لم يُستكمل تقييم الحصيلة اللغوية بعد؛ تُقاس المفردات استقباليًا وتعبيريًا في سياقات مناسبة.'
  },
  eyeContact: {
    status: 'لم يُقيّم',
    skills: 'بدء التواصل البصري واستمراره بصورة طبيعية، وتوجيه الانتباه نحو المتحدث والمادة المعروضة، والتبادل البصري أثناء الحوار دون إجبار.',
    evaluation: 'لم يُستكمل تقييم الانتباه المشترك والتواصل البصري بعد؛ تُلاحظ الاستجابة في مواقف طبيعية دون إجبار الطالب على التواصل البصري.'
  },
  aphasia: {
    status: 'لم يُقيّم',
    skills: 'فحص الفهم والتعبير والتسمية واستدعاء الكلمات والقراءة والكتابة والتواصل الوظيفي، مع توثيق نوع المهمة ودرجة المساندة. تُحدد المهام الملائمة بواسطة مختص وبعد مراجعة التاريخ الطبي واللغوي.',
    evaluation: 'لم يُستكمل تقييم الحبسة الكلامية. لا يُعتمد هذا العنوان كتَشخيص من هذا النموذج وحده؛ تُسجل نتائج التقييم اللغوي الشامل ومصدر الإحالة وتوصيات الفريق المختص.'
  }
};

const LEGACY_EVALUATION_PREFIXES: Record<keyof DiagnosticDomains, string> = {
  fluency: 'تُجمع عينة من الكلام التلقائي',
  receptiveLanguage: 'يُقارن أداء الطالب بمتطلبات عمره',
  expressiveLanguage: 'تُحلل عينة لغوية في التسمية',
  vocabulary: 'تُراجع الحصيلة اللغوية استقباليًا',
  eyeContact: 'تُلاحظ الاستجابة في مواقف فردية',
  aphasia: 'لم يُستكمل تقييم الحبسة الكلامية'
};

function mergeDomain<K extends keyof DiagnosticDomains>(key: K, saved?: DiagnosticDomains[K]): DiagnosticDomains[K] {
  const fallback = DEFAULT_DIAGNOSTIC_DOMAINS[key];
  if (!saved) return fallback;
  const isLegacy = saved.evaluation.startsWith(LEGACY_EVALUATION_PREFIXES[key]);
  return {
    ...fallback,
    ...saved,
    ...(isLegacy && saved.status === 'لم يُقيّم' ? { evaluation: fallback.evaluation } : {})
  };
}

export function diagnosticDomainsFor(assessment: DiagnosticAssessment): DiagnosticDomains {
  const saved = assessment.extendedAssessments;
  return {
    fluency: mergeDomain('fluency', saved?.fluency),
    receptiveLanguage: mergeDomain('receptiveLanguage', saved?.receptiveLanguage),
    expressiveLanguage: mergeDomain('expressiveLanguage', saved?.expressiveLanguage),
    vocabulary: mergeDomain('vocabulary', saved?.vocabulary),
    eyeContact: mergeDomain('eyeContact', saved?.eyeContact),
    aphasia: mergeDomain('aphasia', saved?.aphasia)
  };
}

export function recommendationFor(assessment: DiagnosticAssessment) {
  const decision = assessment.recommendationDecision || 'needs_training';
  const legacyRecommendation = 'يوصى بحاجة الطالب إلى تدريب متخصص وفق نتائج التقييم، مع متابعة التقدم وتحديث الأهداف بما يتناسب مع استجابته.';
  const savedText = assessment.recommendationText;
  return {
    decision,
    text: (savedText && savedText !== legacyRecommendation ? savedText : '') || (decision === 'needs_training'
      ? 'تدريب الصوت المستهدف بالتدرج من نطق الصوت بشكل مفرد إلى المقاطع ثم الكلمات والجمل والتواصل، وفق الأداء المسجل.'
      : 'لا يحتاج الطالب إلى تدريب في الوقت الحالي وفق نتائج التقييم، مع الاستمرار في المتابعة وإعادة التقييم عند ظهور حاجة جديدة.')
  };
}

import { DiagnosticAssessment, DiagnosticDomains } from '../types/speechTherapy';

export const DEFAULT_DIAGNOSTIC_DOMAINS: DiagnosticDomains = {
  fluency: {
    status: 'لم يُقيّم',
    skills: 'ملاحظة انتظام سرعة الكلام، وتكرار الأصوات أو المقاطع، والإطالات والتوقفات، ومدى تأثيرها في وضوح الرسالة وراحة الطالب أثناء الحديث.',
    evaluation: 'تُجمع عينة من الكلام التلقائي والقراءة المناسبة للعمر، ثم يُوثّق نوع عدم الطلاقة وتكراره والمواقف التي يظهر فيها قبل اعتماد الحكم النهائي.'
  },
  receptiveLanguage: {
    status: 'لم يُقيّم',
    skills: 'فهم التعليمات المتدرجة، وتمييز المفاهيم والمفردات، والإجابة عن أسئلة من وماذا وأين ولماذا، وفهم العلاقات والتسلسل في قصة قصيرة.',
    evaluation: 'يُقارن أداء الطالب بمتطلبات عمره وصفه من خلال تعليمات ومواقف متنوعة، مع تسجيل مستوى المساعدة ودقة الاستجابة وثبات الفهم.'
  },
  expressiveLanguage: {
    status: 'لم يُقيّم',
    skills: 'تسمية الأشياء والأفعال، وتكوين جمل مناسبة للعمر، واستخدام الضمائر والأزمنة والروابط، ووصف الصور وسرد الأحداث بترتيب واضح.',
    evaluation: 'تُحلل عينة لغوية في التسمية والوصف والسرد، مع ملاحظة طول الجملة وتنوع المفردات وصحة التراكيب وقدرة الطالب على إيصال المعنى.'
  },
  vocabulary: {
    status: 'لم يُقيّم',
    skills: 'التعرّف إلى المفردات وتسميتها واستخدامها في سياق مناسب، وفهم المرادفات والتصنيفات والعلاقات بين الكلمات بحسب العمر والمرحلة الدراسية.',
    evaluation: 'تُراجع الحصيلة اللغوية استقباليًا وتعبيريًا باستخدام صور ومواقف يومية، ويُوثّق مدى تنوع المفردات وسرعة استدعائها واستخدامها الوظيفي.'
  },
  eyeContact: {
    status: 'لم يُقيّم',
    skills: 'بدء التواصل البصري واستمراره بصورة طبيعية، وتوجيه الانتباه نحو المتحدث والمادة المعروضة، والتبادل البصري أثناء الحوار دون إجبار.',
    evaluation: 'تُلاحظ الاستجابة في مواقف فردية وتفاعلية مختلفة، مع مراعاة راحة الطالب والسياق، وتسجيل مدة التواصل وجودته وأثره في المشاركة.'
  }
};

export function diagnosticDomainsFor(assessment: DiagnosticAssessment): DiagnosticDomains {
  const saved = assessment.extendedAssessments;
  return {
    fluency: { ...DEFAULT_DIAGNOSTIC_DOMAINS.fluency, ...saved?.fluency },
    receptiveLanguage: { ...DEFAULT_DIAGNOSTIC_DOMAINS.receptiveLanguage, ...saved?.receptiveLanguage },
    expressiveLanguage: { ...DEFAULT_DIAGNOSTIC_DOMAINS.expressiveLanguage, ...saved?.expressiveLanguage },
    vocabulary: { ...DEFAULT_DIAGNOSTIC_DOMAINS.vocabulary, ...saved?.vocabulary },
    eyeContact: { ...DEFAULT_DIAGNOSTIC_DOMAINS.eyeContact, ...saved?.eyeContact }
  };
}

export function recommendationFor(assessment: DiagnosticAssessment) {
  const decision = assessment.recommendationDecision || 'needs_training';
  return {
    decision,
    text: assessment.recommendationText || (decision === 'needs_training'
      ? 'يوصى بحاجة الطالب إلى تدريب متخصص وفق نتائج التقييم، مع متابعة التقدم وتحديث الأهداف بما يتناسب مع استجابته.'
      : 'لا يحتاج الطالب إلى تدريب في الوقت الحالي وفق نتائج التقييم، مع الاستمرار في المتابعة وإعادة التقييم عند ظهور حاجة جديدة.')
  };
}

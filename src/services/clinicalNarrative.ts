import type { DiagnosticAssessment, DiagnosticDomains, LongTermPlan, StudentProfile } from '../types/speechTherapy';
import { diagnosticDomainsFor } from '../data/diagnosticDomains';
import { COMMUNICATION_THERAPY_GUIDES } from '../data/communicationTherapyGuides';

const labels: Record<keyof DiagnosticDomains,string> = {fluency:'الطلاقة', aphasia:'الحبسة الكلامية', receptiveLanguage:'اللغة الاستقبالية', expressiveLanguage:'اللغة التعبيرية', vocabulary:'الحصيلة اللغوية', eyeContact:'التواصل البصري'};

const programmes = {
  بسيطة: ['في نهاية الفصل، يبادر الطالب بتعليق أو سؤال في موقفين يختارهما داخل الصف، في أربع من خمس فرص عبر ثلاث ملاحظات متعاقبة. يُعدّل المعيار بعد توثيق خط الأساس.', 'يختار الطالب موقف كلام مريحًا ويسجل درجة الراحة قبل النشاط وبعده. يمنحه المعلم وقتًا لإتمام دوره ويعزز المبادرة وإيصال الفكرة.'],
  متوسطة: ['في نهاية الفصل، يشارك الطالب في حوار ثنائي ثم في مجموعة صغيرة، ويستخدم عند رغبته استراتيجية متفقًا عليها لإدارة الجهد في أربع من خمس فرص عبر ثلاث جلسات.', 'ينمذج الأخصائي استراتيجية واحدة مناسبة لعينة الكلام، ثم يقلل التلميح تدريجيًا. توثّق المشاركة والشد والتجنب في الحوار الفردي ثم في موقف صفي يختاره الطالب.'],
  شديدة: ['في نهاية الفصل، يوصل الطالب رسالة ذات أولوية له في موقفين دراسيين مع الدعم المتفق عليه، في أربع من خمس فرص عبر ثلاث جلسات. تُراجع درجة المساندة وراحة الطالب مع الأسرة.', 'يحدد الطالب والأخصائي موقفًا عالي الأولوية، ويتفقان مع المعلم على وقت كافٍ للدور وخيار المشاركة التدريجية. تراجع آثار التجنب والضيق وتعدّل المهمة بالتعاون مع الطالب.']
};

export function assessmentNarrative(student: StudentProfile, data: DiagnosticAssessment) {
  const domains = diagnosticDomainsFor(data);
  const tracks = student.communicationDiagnoses || [];
  const letters = student.targetLetters || [];
  const findings = letters.map(letter => {
    const result = data.lettersResults[letter];
    const positions = (['beginning','middle','end'] as const).map((key,i) => result?.[key]?.production ? ['أول','وسط','آخر'][i] + ' الكلمة: ' + result[key].production : '').filter(Boolean);
    return 'حرف (' + letter + ') ' + positions.join('، ');
  });
  const hasFluency = tracks.includes('stuttering') || domains.fluency.status === 'بحاجة إلى تدريب' || !!data.fluencySeverity || !!data.fluencyObservations?.length || !!data.fluencySample;
  const diagnosis = [...findings, ...(hasFluency ? ['الطلاقة والتأتأة' + (data.fluencySeverity ? ' · شدة ' + data.fluencySeverity + ' بحسب تقدير الأخصائي' : ' · الشدة لم تحدد')] : []), ...(tracks.includes('aphasia') ? ['الحبسة الكلامية · ' + domains.aphasia.status] : [])];
  const rows = Object.entries(labels).map(([key,label]) => {
    const domain = domains[key as keyof DiagnosticDomains];
    return label + ': ' + domain.status + (domain.status !== 'لم يُقيّم' ? ' — ' + domain.evaluation : '');
  });
  if (data.fluencyObservations?.length) rows.push('مظاهر الطلاقة المسجلة: ' + data.fluencyObservations.join('، '));
  if (hasFluency && data.fluencySample) rows.push('عينة الطلاقة وأثرها: ' + data.fluencySample);
  const needs = Object.entries(labels).filter(([key]) => domains[key as keyof DiagnosticDomains].status === 'بحاجة إلى تدريب').map(([,label])=>label);
  const impaired = letters.filter(letter => Object.values(data.lettersResults[letter] || {}).some(p => typeof p === 'object' && p?.production && p.production !== 'صحيح'));
  const priorities = [...new Set([...needs,...impaired.map(l=>'حرف ('+l+')'),...(hasFluency && data.fluencySeverity && domains.fluency.status !== 'ضمن المتوقع' ? ['الطلاقة'] : [])])];
  const allAssessed = Object.values(domains).every(domain => domain.status === 'ضمن المتوقع');
  const suggested = priorities.length ? 'يوصى بالتدريب على ' + priorities.join('، ') + ' وتوثيق خط الأساس ومراجعة أثر التدريب في الصف والمنزل.' : allAssessed && !tracks.length ? 'لا تشير النتائج المسجلة إلى حاجة للتدريب حاليًا؛ تستمر المتابعة عند ظهور صعوبة.' : 'يوصى باستكمال تقييم ' + (tracks.map(t=>COMMUNICATION_THERAPY_GUIDES[t].label).join('، ') || 'المجالات ذات الصلة بالإحالة') + ' قبل اعتماد قرار التدريب.';
  const key = JSON.stringify([diagnosis,rows,suggested]);
  const recommendation = data.recommendationInputKey === key ? data.recommendationText || suggested : suggested;
  const decision = data.recommendationInputKey === key ? data.recommendationDecision : priorities.length ? 'needs_training' : allAssessed && !tracks.length ? 'no_training' : undefined;
  return {key,diagnosis: 'التشخيص وفق البيانات المسجلة: ' + (diagnosis.join('؛ ') || 'لم يُحدد اضطراب بعد.'), rows, recommendation, decision};
}

export function linkFluencyPlan(plan: LongTermPlan, student: StudentProfile, data: DiagnosticAssessment): LongTermPlan {
  if (!student.communicationDiagnoses?.includes('stuttering')) return plan;
  const level = data.fluencySeverity;
  const key = 'مراحل التأتأة:' + (level || 'لم تحدد');
  if (plan.fluencyPlanKey === key) return plan;
  const [previousGoal,strategy] = level ? programmes[level] : [COMMUNICATION_THERAPY_GUIDES.stuttering.longTermGoal,'تُجمع عينة حوار وسرد وتوثّق أولويات الطالب قبل تحديد مستوى المساعدة ومعيار الإنجاز.'];
  const savedGoal = plan.communicationGoals?.stuttering;
  const wasGenerated = !savedGoal || savedGoal === previousGoal || savedGoal === COMMUNICATION_THERAPY_GUIDES.stuttering.longTermGoal || Object.values(programmes).some(([goal]) => savedGoal === goal) || savedGoal.startsWith('خلال مدة الخطة، يتعرف الطالب');
  const goal = wasGenerated ? 'خلال مدة الخطة، يتعرف الطالب على لحظة التأتأة، ويختار طريقة تخفف الجهد أو التجنب، ثم يستخدمها في مواقف تواصل يحددها مع الأخصائي. يُقارن مستوى الراحة والمشاركة ودرجة المساندة بخط الأساس في نهاية كل مرحلة.' : savedGoal;
  const strategies = [strategy,'يسجل الأخصائي عدد فرص المشاركة والمحاولات المستقلة ودرجة المساندة، ويقارنها بخط الأساس في الصف والمنزل.'];
  if (student.targetLetters?.length) strategies.push(...plan.generalStrategies.filter(x=>!Object.values(programmes).some(p=>p[1]===x) && !strategies.includes(x)));
  return {...plan,fluencyPlanKey:key,communicationGoals:{...plan.communicationGoals,stuttering:goal},generalStrategies:strategies};
}

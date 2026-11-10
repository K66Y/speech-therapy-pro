import { stutteringStages } from '../data/stutteringStages';
import type { StudentProfile, ShortTermPlan, LongTermPlan, DiagnosticAssessment } from '../types/speechTherapy';

export function linkShortTraining(student:StudentProfile, assessment:DiagnosticAssessment, long:LongTermPlan, short:ShortTermPlan): ShortTermPlan {
  if (!student.communicationDiagnoses?.includes('stuttering')) return short;
  const stages = long.stutteringStages || stutteringStages;
  const support = assessment.fluencySeverity === 'بسيطة' ? 'في حوار مألوف ثم مشاركة صفية يختارها الطالب' : assessment.fluencySeverity === 'متوسطة' ? 'بعد نموذج من الأخصائي ثم بتلميح أقل في مجموعة صغيرة' : assessment.fluencySeverity === 'شديدة' ? 'في حوار ثنائي قصير يختاره الطالب مع وقت كافٍ ودعم متفق عليه' : 'بعد تحديد خط الأساس والمساندة المناسبة للطالب';
  const measures = [
    'بعد الاستماع إلى عينة قصيرة، يصف الطالب موضعًا شعر فيه بجهد ويسمي موقفًا يريد المشاركة فيه.',
    'يختار الطالب دورًا في حوار آمن، ويصف راحته قبل المحاولة وبعدها على سلم يختاره.',
    'يجرّب الطالب أسلوبًا اختاره مع الأخصائي في ثلاث عبارات، ويسجل أيها ساعده على إكمال رسالته.',
    'ينقل الطالب أسلوبه إلى موقف يومي ثانٍ، ويذكر ما ساعده فيه. يوثق المعلم المبادرة والمساندة اللازمة.'
  ];
  const goals = [...stages.map((stage,i)=> stage.goal + ' ' + (measures[i] || '') + ' ' + support + '. سجّل الاستجابة ودرجة المساعدة في ثلاث فرص متتابعة.'), 'بعد التدريب، يتابع المعلم مبادرات الطالب في موقفين خلال الأسبوع ويسأله عن راحته. يصف ما نجح فيه تحديدًا، مثل إكمال فكرته أو طلب دوره، ويترك له اختيار الموقف التالي.'];
  const previous = short.communicationObjectiveSteps || [];
  const steps = goals.map((text,index)=>{
    const id = 'cto-'+student.id+'-stuttering-'+(index+1);
    const old = previous.find(step=>step.id===id);
    const manual = old && (old.generatedText ? old.objectiveText !== old.generatedText : !old.objectiveText.includes(' المرحلة '));
    return {id,diagnosis:'stuttering' as const,stepNumber:index+1,status:old?.status || 'in_progress' as const,currentPercentage:old?.currentPercentage || 0,successTargetPercentage:old?.successTargetPercentage ?? 90,objectiveText:manual ? old.objectiveText : text,generatedText:text};
  });
  return {...short,longTermGoalRef:long.communicationGoals?.stuttering || short.longTermGoalRef,communicationObjectiveSteps:[...steps,...previous.filter(step=>!steps.some(next=>next.id===step.id))]};
}

export const familyPractice = {
  stuttering:'اجلس مع طفلك في مكان هادئ. دعه يختار صورة أو يحكي شيئًا حدث اليوم. انتظر حتى يكمل فكرته، ثم ردّ على ما قاله. قل له مثلًا: «أعجبني أنك شرحت لي ما حدث». إذا تعب، أنهيا النشاط.',
  aphasia:'اختر شيئين مألوفين، مثل كوب وملعقة. اطلب من طفلك أن يشير إلى أحدهما، ثم دعه يطلب ما يريد بالكلمة أو الإشارة أو الصورة. انتظر رده وأكد أنك فهمته. كررا النشاط في موقف يومي مثل وقت الأكل.'
};


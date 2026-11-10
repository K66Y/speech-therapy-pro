import { ARABIC_LETTERS_MAP } from '../data/arabicLettersData';
import type { ArabicLetterKey } from '../types/speechTherapy';

const LEGACY_GENERIC_GUIDES = [
  'التدريب أمام المرآة حسب النموذج الذي يوضحه المعلم للحرف المستهدف.',
  'اجعل الطالب ينظر في المرآة ويبتسم ابتسامة خفيفة، ثم يرفع طرف لسانه ليلامس سقف الفم خلف الأسنان مباشرة ويكرر الصوت بوضوح.',
  'اجعل الطالب ينظر في المرآة ويبتسم بهدوء ويراقب وضعية شفتيه ولسانه أثناء نطق الكلمات.'
];

/** إرشاد منزلي قابل للطباعة ومخصص للحرف، دون توجيه ولي الأمر لاستخدام أدوات داخل الفم. */
export function parentTrainingGuide(letter: ArabicLetterKey): string {
  const info = ARABIC_LETTERS_MAP[letter];
  return parentTrainingGuideForGuidance(letter,'أمثلة');
}

export function parentTrainingGuideForGuidance(letter: ArabicLetterKey, guidance: string): string {
  const info = ARABIC_LETTERS_MAP[letter];
  const position = /وسط/.test(guidance) ? 'middle' : /آخر/.test(guidance) ? 'end' : 'beginning';
  const word = info.examples[position].words[0].word;
  const action = /مرآة/.test(guidance) ? 'اجلس بجانبه أمام المرآة. قل ('+info.shortVowels.fatha+') مرة واحدة ودعه يشاهد فمك ويجرب.' :
    /حركات|الحركات/.test(guidance) ? 'قل ('+info.shortVowels.fatha+')، وانتظر حتى يجرب طفلك. ثم قل ('+info.shortVowels.damma+') وامنحه دوره.' :
    /حديث|التعميم|جملة/.test(guidance) ? 'اسأله سؤالًا قصيرًا يمكن أن يجيب عنه بكلمة «'+word+'». انتظر حتى ينهي فكرته.' :
    'اختر كلمة من الورقة مثل «'+word+'». قلها بوضوح مرة واحدة، ثم أعط طفلك دوره ليقولها.';
  return action+' ضع علامة بعد المحاولة. إذا صعبت عليه الكلمة، قلها معه بهدوء. امدح محاولته وتوقف إذا تعب.';
}

export function shouldUpgradeParentTrainingGuide(value: string | undefined): boolean {
  const normalized = value?.trim() || '';
  return !normalized
    || normalized.startsWith('طريقة تدريب الطالب منزلياً على حرف') || normalized.includes('اختم بمدح المحاولة الصحيحة، وأوقف التدريب')
    || LEGACY_GENERIC_GUIDES.includes(normalized)
    || normalized.includes('ملاحظة حركة الفم واللسان عند نطق صوت حرف');
}

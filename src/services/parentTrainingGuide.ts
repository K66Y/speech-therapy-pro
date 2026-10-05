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
  const beginning = info.examples.beginning.words.map(item => item.word).join('، ');
  const middle = info.examples.middle.words.map(item => item.word).join('، ');
  const end = info.examples.end.words.map(item => item.word).join('، ');

  return [
    `طريقة تدريب الطالب منزلياً على حرف (${letter}):`,
    '1- التهيئة: اختر مكاناً هادئاً، واجعل مدة التدريب من 5 إلى 10 دقائق. انطق الحرف أمام الطالب بوضوح مرة واحدة، ثم اطلب منه الاستماع والملاحظة دون استعجال.',
    `2- معرفة المخرج: ${info.articulationPoint} راقب حركة أعضاء النطق من الخارج فقط، وقدّم نموذجاً صحيحاً دون إدخال أدوات داخل فم الطالب.`,
    `3- التدريب أمام المرآة: ${info.mirrorInstruction}`,
    `4- التدرج الصوتي: ابدأ بالحرف منفرداً (${info.shortVowels.sukoon})، ثم مع الحركات القصيرة (${info.shortVowels.fatha}، ${info.shortVowels.damma}، ${info.shortVowels.kasra})، وبعد نجاحه انتقل إلى الحركات الطويلة (${info.longVowels.alif}، ${info.longVowels.waw}، ${info.longVowels.yaa}). لا تنتقل إلى مستوى أصعب قبل نجاح المستوى السابق.`,
    `5- التدريب بالكلمات: درّب على كلمات أول الكلمة (${beginning})، ثم وسط الكلمة (${middle})، ثم آخر الكلمة (${end}). ينطق ولي الأمر الكلمة أولاً، ثم يكررها الطالب بهدوء، وتُسجّل علامة صح بعد كل محاولة مكتملة.`,
    `6- التعميم: بعد نجاح الكلمات، استخدم الجملة: «${info.practiceSentences[0]}»، ثم شجّع الطالب على استعمال كلمة تحتوي حرف (${letter}) في حديث يومي قصير.`,
    '7- التغذية الراجعة: امدح المحاولة الصحيحة مباشرة، وإذا أخطأ الطالب فأعد النموذج مرة واحدة واطلب محاولة جديدة دون لوم أو تكرار مُجهد. أوقف التدريب عند التعب أو الانزعاج، ودوّن الصعوبة في خانة ملاحظات ولي الأمر ليعالجها المعلم في الجلسة القادمة.'
  ].join('\n');
}

export function shouldUpgradeParentTrainingGuide(value: string | undefined): boolean {
  const normalized = value?.trim() || '';
  return !normalized
    || LEGACY_GENERIC_GUIDES.includes(normalized)
    || normalized.includes('ملاحظة حركة الفم واللسان عند نطق صوت حرف');
}

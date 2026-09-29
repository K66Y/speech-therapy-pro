import React, { useState } from 'react';
import { LetterWordItem, ArabicLetterKey } from '../types/speechTherapy';
import { X, Check, Image as ImageIcon, Sparkles, Upload } from 'lucide-react';

interface EditWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  letter: ArabicLetterKey;
  positionLabel: string;
  wordIndex: number;
  initialItem: LetterWordItem;
  onSave: (updatedItem: LetterWordItem) => void;
}

export const EditWordModal: React.FC<EditWordModalProps> = ({
  isOpen,
  onClose,
  letter,
  positionLabel,
  wordIndex,
  initialItem,
  onSave
}) => {
  const [word, setWord] = useState(initialItem.word);
  const [sentence, setSentence] = useState(initialItem.sentence);
  const [imageUrl, setImageUrl] = useState(initialItem.imageUrl);
  const [imgError, setImgError] = useState(false);
  const [imageError, setImageError] = useState('');
  const [processingImage, setProcessingImage] = useState(false);

  if (!isOpen) return null;

  // نماذج سريعة لصور بديلة عالية الدقة
  const quickSuggestions = [
    { label: 'طبيعة وثمار', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80' },
    { label: 'أدوات ومدرسة', url: 'https://images.unsplash.com/photo-1585336261026-6b2169116816?w=600&auto=format&fit=crop&q=80' },
    { label: 'حيوانات وأليف', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80' },
    { label: 'ألعاب ورياضة', url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=80' }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (processingImage) return;
    onSave({
      word: word.trim(),
      sentence: sentence.trim(),
      imageUrl: imageUrl.trim(),
      imageAlt: initialItem.imageAlt || ''
    });
    onClose();
  };

  const handleImageUpload = (file?: File) => {
    if (!file) return;
    setImageError('');
    if (!file.type.startsWith('image/')) {
      setImageError('اختر ملف صورة صالحًا.');
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setProcessingImage(true);
    const image = new Image();
    image.onload = () => {
      setProcessingImage(false);
      const canvas = document.createElement('canvas');
      const scale = Math.min(1, 800 / Math.max(image.width, image.height));
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext('2d');
      if (!context) {
        URL.revokeObjectURL(objectUrl);
        setImageError('تعذر تجهيز الصورة.');
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(objectUrl);
      let compressed = canvas.toDataURL('image/jpeg', 0.7);
      for (const quality of [0.6, 0.5, 0.4]) {
        if (compressed.length <= 55_000) break;
        compressed = canvas.toDataURL('image/jpeg', quality);
      }
      if (compressed.length > 55_000) {
        canvas.width = Math.max(1, Math.round(canvas.width * 0.6));
        canvas.height = Math.max(1, Math.round(canvas.height * 0.6));
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        compressed = canvas.toDataURL('image/jpeg', 0.5);
      }
      if (compressed.length > 55_000) {
        setImageError('حجم الصورة بعد الضغط كبير. اختر صورة أصغر.');
        return;
      }
      setImageUrl(compressed);
      setImgError(false);
    };
    image.onerror = () => {
      setProcessingImage(false);
      URL.revokeObjectURL(objectUrl);
      setImageError('تعذر فتح الصورة المحددة.');
    };
    image.src = objectUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-sky-100 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-700/60 border border-sky-400/40 flex items-center justify-center text-amber-300 font-black text-lg">
              {letter}
            </div>
            <div>
              <h3 className="text-base font-black">
                تعديل النموذج التدريبي ({positionLabel} - النموذج {wordIndex + 1})
              </h3>
              <p className="text-xs text-sky-200">
                تحديث الحرف أو الكلمة والجملة والصورة
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-sky-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Word & Sentence */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              الكلمة النموذجية (مع التشكيل للوضوح النطقي) <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              required
              value={word}
              onChange={e => setWord(e.target.value)}
              placeholder="مثال: رُمَّان"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-black text-lg text-sky-950 focus:ring-2 focus:ring-sky-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">
              الجملة السياقية لتدريب الطالب <span className="text-rose-600">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={sentence}
              onChange={e => setSentence(e.target.value)}
              placeholder="مثال: أَكَلَ خَالِدٌ حَبَّاتِ الرُّمَّانِ فِي الصَّبَاحِ."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-sky-600 focus:outline-hidden"
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">إضافة صورة من الجهاز</label>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-sky-50 px-4 py-2.5 font-bold text-sky-900 border border-sky-200 hover:bg-sky-100">
              <Upload className="h-4 w-4" />اختيار صورة
              <input type="file" accept="image/*" disabled={processingImage} className="sr-only" onChange={e => { handleImageUpload(e.target.files?.[0]); e.target.value = ''; }} />
            </label>
            {imageError && <p className="mt-2 text-rose-700">{imageError}</p>}
            {processingImage && <p role="status">جارٍ تجهيز الصورة، انتظر قبل الحفظ…</p>}
            <button type="button" className="mr-3 text-rose-700" onClick={() => { setImageUrl(''); setImgError(false); }}>إزالة الصورة</button>
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-[11px] text-slate-500 font-semibold block mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              صور سريعة للاختيار:
            </span>
            <div className="flex gap-2 flex-wrap">
              {quickSuggestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setImageUrl(q.url);
                    setImgError(false);
                  }}
                  className="bg-sky-50 hover:bg-sky-100 text-sky-900 px-2.5 py-1 rounded-lg border border-sky-200 text-[11px] font-bold cursor-pointer"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Image Live Preview */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-600 block mb-2">
              معاينة الصورة الحالية:
            </span>
            <div className="relative h-36 bg-slate-200 rounded-xl overflow-hidden flex items-center justify-center">
              {imageUrl && !imgError ? (
                <img
                  src={imageUrl}
                  alt={word}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-slate-400 p-4">
                  <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                  <p className="text-[11px]">تعذر تحميل الصورة أو الرابط غير صالح</p>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-200">
            <button type="button" className="ml-auto text-rose-700" onClick={() => { if (window.confirm('مسح محتوى هذا النموذج وصورته؟')) { onSave({word:'',sentence:'',imageUrl:'',imageAlt:''}); onClose(); } }}>حذف محتوى النموذج</button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={processingImage}
              className="px-5 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              حفظ التعديلات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

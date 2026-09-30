import React, { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { LockKeyhole, ShieldCheck } from 'lucide-react';
import { auth, authPersistenceReady, firebaseConfigured, missingFirebaseConfig } from '../services/firebase';

const authMessages: Record<string, string> = {
  'auth/invalid-credential': 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
  'auth/invalid-email': 'صيغة البريد الإلكتروني غير صحيحة.',
  'auth/email-already-in-use': 'هذا البريد مسجل مسبقًا.',
  'auth/weak-password': 'كلمة المرور يجب أن تكون أقوى (6 أحرف على الأقل).',
  'auth/too-many-requests': 'محاولات كثيرة. انتظر قليلًا ثم أعد المحاولة.',
  'auth/unauthorized-domain': 'نطاق الموقع غير مضاف إلى النطاقات المسموحة في Firebase Auth.',
  'auth/popup-closed-by-user': 'أُغلقت نافذة Google قبل اكتمال تسجيل الدخول.',
  'auth/popup-blocked': 'المتصفح منع نافذة تسجيل الدخول. اسمح بالنوافذ المنبثقة ثم أعد المحاولة.',
  'auth/operation-not-allowed': 'طريقة تسجيل الدخول هذه غير مفعلة في Firebase Authentication.',
  'auth/network-request-failed': 'تعذر الاتصال بخدمة تسجيل الدخول. تحقق من اتصال الإنترنت.'
};

export function AuthScreen() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (mode: 'login' | 'signup') => {
    if (!auth) return;
    if (mode === 'signup' && password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await authPersistenceReady;
      if (mode === 'signup') await createUserWithEmailAndPassword(auth, email.trim(), password);
      else await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (cause: any) {
      setError(authMessages[cause?.code] || 'تعذر تسجيل الدخول. تحقق من الاتصال وإعدادات الحساب.');
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    if (!auth) return;
    setLoading(true);
    setError('');
    try {
      await authPersistenceReady;
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (cause: any) {
      setError(authMessages[cause?.code] || 'تعذر تسجيل الدخول باستخدام Google. تحقق من إعدادات Firebase والنطاق المسموح.');
    } finally {
      setLoading(false);
    }
  };

  if (!firebaseConfigured) return (
    <main dir="rtl" className="min-h-screen bg-slate-950 text-white grid place-items-center p-6 font-['Cairo',sans-serif]">
      <section className="max-w-xl rounded-3xl border border-amber-400/30 bg-slate-900 p-8 shadow-2xl">
        <ShieldCheck className="w-12 h-12 text-amber-400 mb-4" />
        <h1 className="text-2xl font-black mb-3">يلزم إكمال ربط Firebase</h1>
        <p className="text-slate-300 leading-7">لن يفتح النظام على بيانات الطلاب قبل ضبط إعدادات الحماية والتخزين.</p>
        <p className="mt-4 text-xs text-amber-200 break-words">الإعدادات الناقصة: {missingFirebaseConfig.join(', ')}</p>
      </section>
    </main>
  );

  return (
    <main dir="rtl" className="min-h-screen bg-slate-950 bg-[radial-gradient(#0c4a6e_1px,transparent_1px)] [background-size:28px_28px] grid place-items-center p-6 font-['Cairo',sans-serif]">
      <form onSubmit={e => { e.preventDefault(); void submit(mode); }} className="w-full max-w-md bg-white rounded-3xl p-7 sm:p-9 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-sky-950 text-sky-200 grid place-items-center mb-5"><LockKeyhole /></div>
        <h1 className="text-2xl font-black text-slate-950">{mode === 'signup' ? 'إنشاء حساب جديد' : 'الدخول الآمن للمنظومة'}</h1>
        <p className="text-sm text-slate-500 mt-2 mb-6">{mode === 'signup' ? 'أنشئ حسابًا لحفظ سجلاتك بشكل آمن في مساحة خاصة بك.' : 'سجلات الطلاب محفوظة في حسابك السحابي وتبقى متاحة من أجهزتك.'}</p>
        <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
        <input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-500" />
        <label className="block text-sm font-bold text-slate-700 mb-2">كلمة المرور</label>
        <input type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} required minLength={6} value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-500" />
        {mode === 'signup' && <>
          <label className="block text-sm font-bold text-slate-700 mb-2">تأكيد كلمة المرور</label>
          <input type="password" autoComplete="new-password" required minLength={6} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-500" />
        </>}
        {error && <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3 mb-4">{error}{mode === 'login' && <span className="mt-2 block text-xs">إذا أنشأت الحساب بواسطة Google، ادخل بزر Google أولاً ثم عيّن كلمة مرور مستقلة للتطبيق من قائمة الحساب.</span>}</p>}
        <button disabled={loading} className="w-full bg-sky-800 hover:bg-sky-700 disabled:opacity-60 text-white rounded-xl py-3 font-black">{loading ? 'جارٍ التحقق...' : mode === 'signup' ? 'إنشاء الحساب' : 'تسجيل الدخول'}</button>
        <button type="button" disabled={loading} onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }} className="w-full mt-3 text-sky-800 hover:text-sky-950 font-bold text-sm">{mode === 'login' ? 'ليس لديك حساب؟ إنشاء حساب جديد' : 'لديك حساب بالفعل؟ تسجيل الدخول'}</button>
        <div className="my-4 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" />أو<span className="h-px flex-1 bg-slate-200" /></div>
        <button type="button" disabled={loading} onClick={() => void signInWithGoogle()} className="w-full rounded-xl border border-slate-300 bg-white py-3 font-bold text-slate-800 hover:bg-slate-50 disabled:opacity-60">{loading ? 'جارٍ الاتصال...' : 'تسجيل الدخول باستخدام Google'}</button>
      </form>
    </main>
  );
}

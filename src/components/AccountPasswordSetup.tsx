import React, { useState } from 'react';
import { EmailAuthProvider, linkWithCredential } from 'firebase/auth';
import type { User } from 'firebase/auth';

export function AccountPasswordSetup({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const hasPassword = user.providerData.some(provider => provider.providerId === 'password');
  if (!user.email) return null;
  if (hasPassword) return <p className="rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800">الدخول بالبريد وكلمة مرور التطبيق مفعّل لهذا الحساب.</p>;

  const save = async () => {
    if (password.length < 6) return setMessage('اكتب كلمة مرور للتطبيق من 6 أحرف على الأقل.');
    if (password !== confirm) return setMessage('كلمتا المرور غير متطابقتين.');
    try {
      await linkWithCredential(user, EmailAuthProvider.credential(user.email!, password));
      setPassword(''); setConfirm(''); setOpen(false);
      setMessage('تم ربط الدخول بالبريد بنفس الحساب والبيانات.');
    } catch (error: any) {
      setMessage(error?.code === 'auth/provider-already-linked' ? 'الدخول بالبريد مفعّل بالفعل.' : error?.code === 'auth/credential-already-in-use' ? 'هذا البريد مرتبط بحساب آخر. لا تنشئ حساباً جديداً؛ استخدم Google ثم تواصل معنا لدمج الحسابين بأمان.' : 'تعذر ربط كلمة المرور. أعد الدخول بواسطة Google ثم حاول مجدداً.');
    }
  };
  return <div className="rounded-xl bg-sky-50 p-3 text-xs text-sky-950">
    <button type="button" className="w-full text-right font-black" onClick={() => setOpen(value => !value)}>تعيين كلمة مرور للتطبيق</button>
    <p className="mt-1 text-[11px] text-slate-600">تدخل بعدها بالبريد نفسه دون فتح نافذة Google. استخدم كلمة مختلفة عن كلمة Gmail.</p>
    {open && <div className="mt-3 space-y-2"><input aria-label="كلمة مرور التطبيق الجديدة" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="كلمة مرور جديدة للتطبيق" className="w-full rounded-lg border p-2"/><input aria-label="تأكيد كلمة مرور التطبيق" type="password" autoComplete="new-password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="تأكيد كلمة المرور" className="w-full rounded-lg border p-2"/><button type="button" onClick={() => void save()} className="w-full rounded-lg bg-sky-800 p-2 font-bold text-white">حفظ وربط نفس الحساب</button></div>}
    {message && <p role="status" className="mt-2 font-bold">{message}</p>}
  </div>;
}

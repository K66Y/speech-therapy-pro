/** Native download with an explicit retry link if a browser blocks the automatic click. */
export function downloadDocument(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const panel = document.createElement('div');
  panel.className = 'print:hidden';
  panel.dir = 'rtl';
  panel.setAttribute('role', 'status');
  panel.style.cssText = 'position:fixed;bottom:20px;left:20px;z-index:9999;background:white;color:#0c4a6e;border:1px solid #94a3b8;border-radius:12px;padding:16px;max-width:90vw;box-shadow:0 4px 20px #0002';
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.textContent = 'ملف Word جاهز — اضغط هنا إن لم يبدأ التنزيل';
  link.style.cssText = 'text-decoration:underline;font-weight:bold';
  const close = document.createElement('button');
  close.textContent = 'إغلاق';
  close.style.marginInlineStart = '16px';
  close.onclick = () => { panel.remove(); URL.revokeObjectURL(url); };
  panel.append(link, close);
  document.body.append(panel);
  link.click();
}

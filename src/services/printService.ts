import { displayText } from './displayText';
/** Isolated print document: no navigation or clipped editable controls. */
export async function triggerOfficialPrint(elementSelector?: string, inspectOnly = false): Promise<void> {
  const source = document.querySelector<HTMLElement>(elementSelector || '.printable-document, .printable-sheet');
  if (!source) return;
  document.querySelectorAll('iframe[data-official-print]').forEach(frame => frame.remove());
  const frame = document.createElement('iframe');
  frame.dataset.officialPrint = 'true';
  frame.title = 'طباعة النموذج';
  frame.style.cssText = 'position:fixed;width:1px;height:1px;bottom:0;left:0;border:0;';
  document.body.appendChild(frame);
  const doc = frame.contentDocument!;
  doc.open();
  doc.write('<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title></title></head><body></body></html>');
  doc.close();
  const styles = Array.from(document.querySelectorAll('style,link[rel="stylesheet"]')).map(node => {
    const copy = node.cloneNode(true) as HTMLElement;
    if (node instanceof HTMLLinkElement) (copy as HTMLLinkElement).href = node.href;
    const ready = copy instanceof HTMLLinkElement ? new Promise<void>(resolve => { copy.onload = () => resolve(); copy.onerror = () => resolve(); }) : Promise.resolve();
    doc.head.appendChild(copy);
    return ready;
  });
  const clone = source.cloneNode(true) as HTMLElement;
  const originals = source.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input,textarea,select');
  clone.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input,textarea,select').forEach((control, index) => {
    const original = originals[index];
    if (control.closest('[data-print-value]')) return;
    const value = original instanceof HTMLSelectElement ? original.selectedOptions[0]?.text || '' : original.value;
    const text = doc.createElement('span');
    text.className = control.className;
    text.style.cssText = 'white-space:pre-wrap;overflow-wrap:anywhere;display:block;min-height:1.6em;height:auto;';
    text.textContent = original instanceof HTMLInputElement && ['checkbox', 'radio'].includes(original.type) ? (original.checked ? '✓' : '□') : value;
    control.replaceWith(text);
  });
  clone.querySelectorAll<HTMLElement>('[data-print-value]').forEach(element => {
    element.textContent = element.dataset.printValue || '';
    element.style.whiteSpace = 'pre-wrap';
    element.style.minHeight = '1.6em';
  });
  clone.querySelectorAll('button, .print\\:hidden').forEach(element => element.remove());
  clone.querySelectorAll<HTMLImageElement>('img').forEach(image => { image.src = new URL(image.getAttribute('src') || '', document.baseURI).href; });
  doc.body.appendChild(clone);
  const walker = doc.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) walker.currentNode.textContent = displayText(walker.currentNode.textContent);
  const overrides = doc.createElement('style');
  overrides.textContent = `@page {size:A4;margin:12mm;} body {margin:0;background:white;direction:rtl;color:#0f172a;} * {box-sizing:border-box;} .printable-sheet,.printable-document {width:100%!important;max-width:none!important;min-height:0!important;padding:0!important;border:0!important;box-shadow:none!important;position:static!important;} .official-kliche-container > .grid {direction:ltr!important;} .official-kliche-container > .grid > * {grid-row:1!important;direction:rtl;} .official-kliche-container > .grid > :first-child {grid-column:3!important;} .official-kliche-container > .grid > :nth-child(2) {grid-column:2!important;} .official-kliche-container > .grid > :nth-child(3) {grid-column:1!important;} table {width:100%;table-layout:fixed;} th,td {white-space:normal!important;overflow-wrap:anywhere;} tr,.official-kliche-container {break-inside:avoid;} thead {display:table-header-group;} .overflow-x-auto,.overflow-hidden {overflow:visible!important;} [dir=ltr],bdi {direction:ltr!important;unicode-bidi:isolate;} button {display:none!important;} img {max-width:100%;}`;
  doc.head.appendChild(overrides);
  try {
    await Promise.race([Promise.all(styles), new Promise(resolve => setTimeout(resolve, 5000))]);
    await Promise.race([Promise.all([doc.fonts.ready, ...Array.from(doc.images).map(image => image.decode().catch(() => undefined))]), new Promise(resolve => setTimeout(resolve, 8000))]);
    if (inspectOnly) {
      frame.style.cssText = 'position:fixed;width:794px;max-width:100vw;height:100vh;top:0;right:0;z-index:999;background:white;border:0;';
      return;
    }
    frame.contentWindow!.addEventListener('afterprint', () => setTimeout(() => frame.remove(), 1000), {once:true});
    frame.contentWindow!.focus();
    frame.contentWindow!.print();
  } catch {
    frame.remove();
    window.alert('تعذر تجهيز الطباعة. أعد المحاولة بعد اكتمال تحميل النموذج.');
  }
}

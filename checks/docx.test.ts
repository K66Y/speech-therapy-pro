import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import JSZip from 'jszip';
import * as samples from '../src/data/sampleData';
import * as exporter from '../src/services/docxExportService';

test('all six Word exporters create valid downloadable documents', async () => {
  const blobs: Blob[] = [];
  const originalFetch = globalThis.fetch;
  const originalDocument = globalThis.document;
  const originalCreate = URL.createObjectURL;
  globalThis.fetch = async () => new Response(await readFile('public/ministry-of-education-logo.jpg'));
  URL.createObjectURL = (blob: Blob) => { blobs.push(blob); return 'blob:test'; };
  const element = () => ({ style: {}, setAttribute() {}, append() {}, click() {}, remove() {} });
  globalThis.document = { createElement: element, body: { append() {} } } as unknown as Document;
  try {
    const student = samples.SAMPLE_STUDENTS[0];
    const id = student.id;
    await exporter.exportCaseStudyDocx(samples.INITIAL_CASE_STUDIES[id]);
    await exporter.exportDiagnosisDocx(student, samples.INITIAL_DIAGNOSTIC_ASSESSMENTS[id]);
    await exporter.exportPlansDocx(student, samples.INITIAL_LONG_TERM_PLANS[id], samples.INITIAL_SHORT_TERM_PLANS[id]);
    await exporter.exportLettersGuideDocx();
    await exporter.exportHomeworkDocx(student, samples.INITIAL_HOMEWORK_SHEETS[id][0]);
    await exporter.exportFinalReportDocx(student, samples.INITIAL_FINAL_REPORTS[id]);
    assert.equal(blobs.length, 6);
    for (const blob of blobs) {
      const zip = await JSZip.loadAsync(await blob.arrayBuffer());
      const xml = await zip.file('word/document.xml')!.async('string');
      assert.ok(xml.includes('وزارة التعليم'));
      assert.ok(zip.file('[Content_Types].xml'));
      assert.ok(Object.keys(zip.files).some(name => name.startsWith('word/media/')));
    }
  } finally { globalThis.fetch = originalFetch; globalThis.document = originalDocument; URL.createObjectURL = originalCreate; }
});

import { homeworkColumns, homeworkPositions } from './homeworkGrid';
import { parentTrainingGuide, shouldUpgradeParentTrainingGuide } from './parentTrainingGuide';
import {
  Document,
  Packer,
  Paragraph,
  TextRun as DocxTextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  PageBreak,
  HeadingLevel,
  ImageRun,
  BorderStyle,
  VerticalAlign
} from 'docx';
import { downloadDocument as saveAs } from './downloadDocument';
import {
  StudentProfile,
  CaseStudyData,
  DiagnosticAssessment,
  LongTermPlan,
  ShortTermPlan,
  DailySessionLog,
  HomeworkSheet,
  FinalProgressReport
} from '../types/speechTherapy';
import { ARABIC_LETTERS_LIST, ARABIC_LETTERS_MAP } from '../data/arabicLettersData';
import { SCHOOL_KLICHE } from '../data/sampleData';
import { getDocumentHijriDate, getDocumentGregorianDate } from './dateService';
import { displayText } from './displayText';

class TextRun extends DocxTextRun {
  constructor(options: ConstructorParameters<typeof DocxTextRun>[0]) {
    super(typeof options === 'string' ? displayText(options) : { ...options, ...(options.text !== undefined ? { text: displayText(options.text) } : {}) });
  }
}

const PRIMARY_COLOR = '0369A1'; // أزرق رسمي معتمد لوزارة التعليم
const SECONDARY_COLOR = '0284C7';

function printLevelLabel(level: string): string {
  const legacyLabels: Record<string, string> = {
    'كلمات أول الكلمة': 'الحرف في بداية الكلمة',
    'كلمات وسط الكلمة': 'الحرف في وسط الكلمة',
    'كلمات آخر الكلمة': 'الحرف في نهاية الكلمة',
    'الحرف في أول الكلمة': 'الحرف في بداية الكلمة',
    'الحرف في آخر الكلمة': 'الحرف في نهاية الكلمة',
    'عزل الصوت': 'حرف منفرد'
  };
  return legacyLabels[level] || level;
}

/**
 * إنشاء كليشة وزارة التعليم الرسمية المكونة من 4 أسطر متوافقة مع اليمين والوسط
 */
let ministryLogoPromise: Promise<Uint8Array> | null = null;

function loadMinistryLogo(): Promise<Uint8Array> {
  if (!ministryLogoPromise) {
    ministryLogoPromise = fetch('/ministry-of-education-logo.jpg')
      .then(response => {
        if (!response.ok) throw new Error('تعذر تحميل شعار وزارة التعليم');
        return response.arrayBuffer();
      })
      .then(buffer => new Uint8Array(buffer))
      .catch(error => { ministryLogoPromise = null; throw error; });
  }
  return ministryLogoPromise;
}

async function createOfficialHeaderParagraphs(docTitle: string, studentName?: string): Promise<(Paragraph | Table)[]> {
  const hijriDate = getDocumentHijriDate();
  const gregorianDate = getDocumentGregorianDate();
  const logoData = await loadMinistryLogo();
  const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };

  const officialLines = [SCHOOL_KLICHE.line1, SCHOOL_KLICHE.line2, SCHOOL_KLICHE.line3, SCHOOL_KLICHE.line4]
    .map((line, index) => new Paragraph({
      alignment: AlignmentType.RIGHT,
      bidirectional: true,
      spacing: { after: 35 },
      children: [new TextRun({
        text: line,
        font: 'Cairo',
        size: index < 2 ? 23 : 20,
        bold: index !== 2,
        color: index === 1 ? PRIMARY_COLOR : '1E293B',
        rightToLeft: true
      })]
    }));

  return [
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      alignment: AlignmentType.CENTER,
      visuallyRightToLeft: true,
      borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideHorizontal: noBorder, insideVertical: noBorder },
      rows: [new TableRow({
        children: [
          new TableCell({ width: { size: 36, type: WidthType.PERCENTAGE }, verticalAlign: VerticalAlign.CENTER, borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder }, children: officialLines }),
          new TableCell({ width: { size: 28, type: WidthType.PERCENTAGE }, verticalAlign: VerticalAlign.CENTER, borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new ImageRun({ data: logoData, type: 'jpg', transformation: { width: 140, height: 140 } })] })] }),
          new TableCell({ width: { size: 36, type: WidthType.PERCENTAGE }, verticalAlign: VerticalAlign.CENTER, borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder }, children: [
            new Paragraph({ alignment: AlignmentType.LEFT, bidirectional: true, children: [new TextRun({ text: 'التاريخ:', font: 'Cairo', bold: true, size: 20, color: '475569', rightToLeft: true })] }),
            new Paragraph({ alignment: AlignmentType.LEFT, bidirectional: false, children: [new TextRun({ text: hijriDate, font: 'Cairo', bold: true, size: 20, color: PRIMARY_COLOR, rightToLeft: false })] }),
            new Paragraph({ alignment: AlignmentType.LEFT, bidirectional: false, children: [new TextRun({ text: gregorianDate, font: 'Cairo', size: 18, color: '334155', rightToLeft: false })] }),
            new Paragraph({ alignment: AlignmentType.LEFT, bidirectional: true, children: [new TextRun({ text: '', font: 'Cairo', size: 1, rightToLeft: true })] })
          ] })
        ]
      })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      bidirectional: true,
      spacing: { before: 80, after: 120 },
      children: [
        new TextRun({
          text: `✦ ${docTitle} ✦`,
          font: 'Cairo',
          size: 28,
          bold: true,
          color: PRIMARY_COLOR,
          rightToLeft: true
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      bidirectional: true,
      spacing: { after: 100 },
      children: [
        ...(studentName
          ? [
              new TextRun({
                text: `    |    اسم الطالب: `,
                font: 'Cairo',
                size: 22,
                bold: true,
                color: '1E293B',
                rightToLeft: true
              }),
              new TextRun({
                text: studentName,
                font: 'Cairo',
                size: 22,
                bold: true,
                color: PRIMARY_COLOR,
                rightToLeft: true
              })
            ]
          : [])
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      bidirectional: true,
      spacing: { after: 160 },
      children: [
        new TextRun({
          text: '________________________________________________________________________________',
          color: 'CBD5E1',
          size: 18,
          rightToLeft: true
        })
      ]
    })
  ];
}

/**
 * خلية جدول منسقة بدقة RTL مع محاذاة النص لليمين
 */
function createStyledCell(
  text: string,
  widthPercent: number,
  isHeader = false,
  isBold = false,
  textColor = '1E293B',
  bgColor?: string
): TableCell {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: { fill: bgColor || (isHeader ? PRIMARY_COLOR : 'FFFFFF') },
    margins: { top: 120, bottom: 120, left: 140, right: 140 },
    children: [
      new Paragraph({
        alignment: isHeader ? AlignmentType.CENTER : AlignmentType.RIGHT,
        bidirectional: true,
        children: [
          new TextRun({
            text,
            font: 'Cairo',
            bold: isHeader || isBold,
            color: isHeader ? 'FFFFFF' : textColor,
            size: isHeader ? 22 : 20,
            rightToLeft: true
          })
        ]
      })
    ]
  });
}

/**
 * إنشاء جدول عربي Right-To-Left بمحاذاة اليمين
 */
function createRtlTable(rows: TableRow[], widthPercent = 100): Table {
  return new Table({
    visuallyRightToLeft: true,
    alignment: AlignmentType.RIGHT,
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    rows
  });
}

/**
 * تصدير دراسة الحالة الشاملة (.docx)
 */
export async function exportCaseStudyDocx(caseStudy: CaseStudyData) {
  const std = caseStudy.student;
  const exam = caseStudy.oralMotorExam;

  const doc = new Document({
    sections: [
      {
        children: [
          ...(await createOfficialHeaderParagraphs('نموذج دراسة الحالة الشاملة لجلسات النطق والتخاطب', std.fullName)),
          
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { before: 120, after: 100 },
            children: [
              new TextRun({ text: '١. البيانات العامة للطالب', font: 'Cairo', bold: true, color: PRIMARY_COLOR, size: 24, rightToLeft: true })
            ]
          }),
          createRtlTable([
            new TableRow({
              children: [
                createStyledCell('الاسم الكامل', 25, true),
                createStyledCell(std.fullName, 25),
                createStyledCell('السجل المدني', 25, true),
                createStyledCell(std.nationalId, 25)
              ]
            }),
            new TableRow({
              children: [
                createStyledCell('الصف / الفصل', 25, true),
                createStyledCell(`${std.grade} - ${std.classRoom}`, 25),
                createStyledCell('العمر التقديري', 25, true),
                createStyledCell(std.age, 25)
              ]
            }),
            new TableRow({
              children: [
                createStyledCell('الحروف المستهدفة', 25, true),
                createStyledCell((std.targetLetters || []).join('، '), 25, false, true, PRIMARY_COLOR),
                createStyledCell('التشخيص', 25, true),
                createStyledCell(std.diagnosisCategory || '', 25)
              ]
            })
          ]),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: '٢. الأدوات الأساسية المستخدمة في الفحص والتشخيص', font: 'Cairo', bold: true, color: PRIMARY_COLOR, size: 24, rightToLeft: true })
            ]
          }),
          createRtlTable([
            new TableRow({
              children: [
                createStyledCell('الأداة التشخيصية الأساسية', 30, true),
                createStyledCell('طريقة الاستخدام الإكلينيكي في الجلسة', 70, true)
              ]
            }),
            new TableRow({
              children: [
                createStyledCell('1- مرآة نطق وتخاطب (التغذية الراجعة البصرية)', 30, false, true),
                createStyledCell(exam.mirrorObservation || 'استخدام المرآة في فحص حركة الشفتين واللسان وتطابق الفكين وتوجيه تيار الهواء.', 70)
              ]
            }),
            new TableRow({
              children: [
                createStyledCell('2- خافض لسان طبي معقم (التوجيه العضلي اللمسي)', 30, false, true),
                createStyledCell(exam.tongueDepressorExam || 'فحص مرونة اللسان ورفع طرفه والتأكد من سلامة الرابط اللساني واللثة والحنك.', 70)
              ]
            })
          ]),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: '٣. فحص أعضاء النطق والكلام', font: 'Cairo', bold: true, color: PRIMARY_COLOR, size: 24, rightToLeft: true })
            ]
          }),
          createRtlTable([
            new TableRow({
              children: [
                createStyledCell('العضو المفحوص', 25, true),
                createStyledCell('الحالة الإكلينيكية', 25, true),
                createStyledCell('الملاحظات الطبية والتفصيلية', 50, true)
              ]
            }),
            new TableRow({
              children: [
                createStyledCell('الشفتان والأسنان', 25, false, true),
                createStyledCell(`${exam.lips.closure} | ${exam.teeth.bite}`, 25),
                createStyledCell(exam.lips.notes || 'إطباق سليم وحركة طبيعية.', 50)
              ]
            }),
            new TableRow({
              children: [
                createStyledCell('اللسان والرابط اللساني', 25, false, true),
                createStyledCell(`${exam.tongue.frenulum} | ${exam.tongue.mobilityElevation}`, 25),
                createStyledCell(exam.tongue.notes || 'الرابط طبيعي وحركة الرفع كافية.', 50)
              ]
            }),
            new TableRow({
              children: [
                createStyledCell('سقف الحلق واللهاة والرنين', 25, false, true),
                createStyledCell(`${exam.palateAndUvula.hardPalate} | ${exam.palateAndUvula.nasality}`, 25),
                createStyledCell(exam.palateAndUvula.notes || 'لا يوجد خنف، والرنين الفموي طبيعي.', 50)
              ]
            }),
            new TableRow({
              children: [
                createStyledCell('التنفس الصوتي', 25, false, true),
                createStyledCell(`${exam.breathing.type} | ${exam.breathing.capacity}`, 25),
                createStyledCell(exam.breathing.notes || 'تنفس أنفي منتظم وسعة كافية.', 50)
              ]
            })
          ]),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: '٤. التشخيص الإكلينيكي والتوصيات العلاجية', font: 'Cairo', bold: true, color: PRIMARY_COLOR, size: 24, rightToLeft: true })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { after: 100 },
            children: [
              new TextRun({ text: 'التشخيص النطقي المعتمد: ', font: 'Cairo', bold: true, rightToLeft: true }),
              new TextRun({ text: caseStudy.initialDiagnosis, font: 'Cairo', rightToLeft: true })
            ]
          }),
          ...caseStudy.recommendations.map(
            (rec, idx) =>
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                bidirectional: true,
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: `• [${idx + 1}] `, font: 'Cairo', bold: true, color: PRIMARY_COLOR, rightToLeft: true }),
                  new TextRun({ text: rec, font: 'Cairo', rightToLeft: true })
                ]
              })
          ),

          new Paragraph({
            spacing: { before: 300 },
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            children: [
              new TextRun({ text: 'أخصائي تدريبات نطق: ', font: 'Cairo', bold: true, size: 22, rightToLeft: true }),
              new TextRun({ text: SCHOOL_KLICHE.specialistName, font: 'Cairo', bold: true, size: 24, color: PRIMARY_COLOR, rightToLeft: true }),
            ]
          })
        ]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `دراسة_حالة_${std.fullName}_ظافر_الشهراني.docx`);
}

/**
 * تصدير استمارة التشخيص والتقييم النطقي الشامل (.docx)
 */
export async function exportDiagnosisDocx(student: StudentProfile, assessment: DiagnosticAssessment) {
  const rows = [
    new TableRow({
      children: [
        createStyledCell('الحرف', 10, true),
        createStyledCell('المخرج الصوتي', 20, true),
        createStyledCell('أول الكلمة (3 نماذج)', 22, true),
        createStyledCell('وسط الكلمة (3 نماذج)', 22, true),
        createStyledCell('آخر الكلمة (3 نماذج)', 22, true),
        createStyledCell('الحكم النطقي', 14, true)
      ]
    })
  ];

  for (const letter of ARABIC_LETTERS_LIST) {
    const info = ARABIC_LETTERS_MAP[letter];
    const item = assessment.lettersResults[letter];
    const isError =
      item?.beginning.production !== 'صحيح' ||
      item?.middle.production !== 'صحيح' ||
      item?.end.production !== 'صحيح';

    const begWords = info.examples.beginning.words.map(w => w.word).join('، ');
    const midWords = info.examples.middle.words.map(w => w.word).join('، ');
    const endWords = info.examples.end.words.map(w => w.word).join('، ');

    rows.push(
      new TableRow({
        children: [
          createStyledCell(letter, 10, false, true, isError ? 'B91C1C' : PRIMARY_COLOR),
          createStyledCell(info.classification, 20),
          createStyledCell(`${begWords} [${item?.beginning.production || 'صحيح'}]`, 22),
          createStyledCell(`${midWords} [${item?.middle.production || 'صحيح'}]`, 22),
          createStyledCell(`${endWords} [${item?.end.production || 'صحيح'}]`, 22),
          createStyledCell(isError ? 'مضطرب' : 'سليم', 14, false, true, isError ? 'B91C1C' : '059669')
        ]
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        children: [
          ...(await createOfficialHeaderParagraphs('استمارة التشخيص والتقييم النطقي الشامل لجميع الحروف العربية', student.fullName)),
          
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { after: 100 },
            children: [
              new TextRun({ text: 'الأدوات المستخدمة: ', font: 'Cairo', bold: true, rightToLeft: true }),
              new TextRun({ text: '1- مرآة نطق وتخاطب (التغذية الراجعة البصرية)    |    2- خافض لسان طبي معقم (التوجيه العضلي اللمسي)', font: 'Cairo', color: PRIMARY_COLOR, rightToLeft: true })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { after: 140 },
            children: [
              new TextRun({ text: 'نسبة وضوح الكلام العامة: ', font: 'Cairo', bold: true, rightToLeft: true }),
              new TextRun({ text: `${assessment.speechIntelligibilityScore}%`, font: 'Cairo', bold: true, size: 26, color: PRIMARY_COLOR, rightToLeft: true })
            ]
          }),

          createRtlTable(rows),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({ text: 'الخلاصة الإكلينيكية', font: 'Cairo', bold: true, color: PRIMARY_COLOR, size: 24, rightToLeft: true })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { after: 120 },
            children: [
              new TextRun({ text: assessment.summaryConclusion, font: 'Cairo', rightToLeft: true })
            ]
          }),

          new Paragraph({
            spacing: { before: 240 },
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            children: [
              new TextRun({ text: 'أخصائي تدريبات نطق: ', font: 'Cairo', bold: true, size: 22, rightToLeft: true }),
              new TextRun({ text: SCHOOL_KLICHE.specialistName, font: 'Cairo', bold: true, size: 24, color: PRIMARY_COLOR, rightToLeft: true }),
            ]
          })
        ]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `تشخيص_نطقي_${student.fullName}_ظافر_الشهراني.docx`);
}

/**
 * تصدير الخطط التدريبية النطقية طويلة وقصيرة المدى
 */
export async function exportPlansDocx(
  student: StudentProfile,
  longTermPlan: LongTermPlan,
  shortTermPlan: ShortTermPlan
) {
  // الصفحة الأولى: الخطة طويلة المدى
  const longTermChildren: (Paragraph | Table)[] = [
    ...(await createOfficialHeaderParagraphs('الخطة التدريبية النطقية طويلة المدى', student.fullName)),
    
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      bidirectional: true,
      spacing: { after: 80 },
      children: [
        new TextRun({ text: `العام الدراسي: ${longTermPlan.academicYear}    |    الفصل الدراسي: ${longTermPlan.semester}`, font: 'Cairo', bold: true, rightToLeft: true })
      ]
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      alignment: AlignmentType.RIGHT,
      bidirectional: true,
      spacing: { before: 120, after: 100 },
      children: [
        new TextRun({ text: 'الأهداف العامة طويلة المدى ومعايير التحقق', font: 'Cairo', bold: true, color: PRIMARY_COLOR, size: 24, rightToLeft: true })
      ]
    }),
    createRtlTable([
      new TableRow({
        children: [
          createStyledCell('الرمز والهدف العام', 20, true),
          createStyledCell('الصوت المستهدف', 15, true),
          createStyledCell('نص الهدف ومخرجات نهاية الفصل', 45, true),
          createStyledCell('معيار التحقق', 15, true),
          createStyledCell('الحالة', 15, true)
        ]
      }),
      ...longTermPlan.goals.map(
        g =>
          new TableRow({
            children: [
              createStyledCell(g.code, 20, false, true),
              createStyledCell(`حرف [ ${g.targetLetter} ]`, 15, false, true, PRIMARY_COLOR),
              createStyledCell(`${g.goalDescription}\nخط الأساس: ${g.startingBaseline}\nالناتج المتوقع: ${g.finalExpectedOutcome}\nمدة التنفيذ: ${g.targetPeriod}\nالتقييم: ${g.evaluationMethod}`, 45),
              createStyledCell(g.successCriterion, 15),
              createStyledCell(g.status === 'achieved' ? 'منجز' : 'تحت التدريب', 15, false, true, g.status === 'achieved' ? '059669' : 'B45309')
            ]
          })
      )
    ]),

    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      alignment: AlignmentType.RIGHT,
      bidirectional: true,
      spacing: { before: 200, after: 80 },
      children: [
        new TextRun({ text: 'الأدوات والاستراتيجيات التدريبية العامة', font: 'Cairo', bold: true, color: PRIMARY_COLOR, size: 22, rightToLeft: true })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      bidirectional: true,
      spacing: { after: 60 },
      children: [
        new TextRun({ text: '1- مرآة نطق وتخاطب: ', font: 'Cairo', bold: true, color: PRIMARY_COLOR, rightToLeft: true }),
        new TextRun({ text: 'التغذية الراجعة البصرية لمطابقة موضع اللسان والشفتين.', font: 'Cairo', rightToLeft: true })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      bidirectional: true,
      spacing: { after: 140 },
      children: [
        new TextRun({ text: '2- خافض لسان طبي معقم: ', font: 'Cairo', bold: true, color: PRIMARY_COLOR, rightToLeft: true }),
        new TextRun({ text: 'التوجيه الحسي العضلي وتحديد نقاط الارتكاز وعزل الأصوات البديلة.', font: 'Cairo', rightToLeft: true })
      ]
    }),

    new Paragraph({
      spacing: { before: 260 },
      alignment: AlignmentType.RIGHT,
      bidirectional: true,
      children: [
        new TextRun({ text: 'أخصائي تدريبات نطق: ', font: 'Cairo', bold: true, size: 22, rightToLeft: true }),
        new TextRun({ text: SCHOOL_KLICHE.specialistName, font: 'Cairo', bold: true, size: 24, color: PRIMARY_COLOR, rightToLeft: true }),
      ]
    })
  ];

  // الصفحة الثانية: الخطة قصيرة المدى مع فاصل صفحة للطباعة
  const shortTermChildren: (Paragraph | Table)[] = [
    new Paragraph({ children: [new PageBreak()] }),
    ...(await createOfficialHeaderParagraphs('الخطة التدريبية النطقية قصيرة المدى', student.fullName)),

    new Paragraph({
      alignment: AlignmentType.RIGHT,
      bidirectional: true,
      spacing: { after: 80 },
      children: [
        new TextRun({ text: `عنوان الخطة: ${shortTermPlan.planTitle}    |    مرجع الهدف العام: ${shortTermPlan.longTermGoalRef}`, font: 'Cairo', bold: true, rightToLeft: true })
      ]
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      alignment: AlignmentType.RIGHT,
      bidirectional: true,
      spacing: { before: 120, after: 100 },
      children: [
        new TextRun({ text: 'الأهداف الإجرائية المتدرجة للحروف [ ' + (shortTermPlan.targetLetters || [shortTermPlan.targetLetter]).join('، ') + ' ] وتطبيقات الأدوات', font: 'Cairo', bold: true, color: PRIMARY_COLOR, size: 24, rightToLeft: true })
      ]
    }),
    createRtlTable([
      new TableRow({
        children: [
          createStyledCell('م', 8, true),
          createStyledCell('المستوى الإجرائي', 22, true),
          createStyledCell('نص الهدف الإجرائي القصير', 40, true),
          createStyledCell('تطبيق المرآة وخافض اللسان', 22, true),
          createStyledCell('الحالة', 8, true)
        ]
      }),
      ...shortTermPlan.objectives.map(
        obj =>
          new TableRow({
            children: [
              createStyledCell(String(obj.stepNumber), 8, false, true),
              createStyledCell(printLevelLabel(obj.level), 22, false, true, PRIMARY_COLOR),
              createStyledCell(`${obj.objectiveText}\nالحرف: ${obj.targetLetter} | الهدف: ${obj.successTargetPercentage}% | المحقق: ${obj.currentPercentage}%\nالفترة: ${obj.startDate} إلى ${obj.targetDate}${obj.notes ? `\nالملاحظة: ${obj.notes}` : ''}`, 40),
              createStyledCell(
                `المرآة: ${obj.mirrorUsageDetails} | الخافض: ${obj.tongueDepressorDetails}`,
                22
              ),
              createStyledCell(obj.status === 'achieved' ? 'منجز' : 'تحت التدريب', 8, false, true, obj.status === 'achieved' ? '059669' : 'B45309')
            ]
          })
      )
    ]),

    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      alignment: AlignmentType.RIGHT,
      bidirectional: true,
      spacing: { before: 160, after: 80 },
      children: [
        new TextRun({ text: 'المنهجية الإكلينيكية المتبعة', font: 'Cairo', bold: true, color: PRIMARY_COLOR, size: 22, rightToLeft: true })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      bidirectional: true,
      spacing: { after: 60 },
      children: [
        new TextRun({ text: '• المنهجية: ', font: 'Cairo', bold: true, rightToLeft: true }),
        new TextRun({ text: shortTermPlan.clinicalMethodology, font: 'Cairo', rightToLeft: true })
      ]
    }),
    new Paragraph({
      spacing: { before: 240 },
      alignment: AlignmentType.RIGHT,
      bidirectional: true,
      children: [
        new TextRun({ text: 'أخصائي تدريبات نطق: ', font: 'Cairo', bold: true, size: 22, rightToLeft: true }),
        new TextRun({ text: SCHOOL_KLICHE.specialistName, font: 'Cairo', bold: true, size: 24, color: PRIMARY_COLOR, rightToLeft: true }),
      ]
    })
  ];

  const doc = new Document({
    sections: [
      {
        children: [...longTermChildren, ...shortTermChildren]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `الخطط_التدريبية_طويلة_وقصيرة_المدى_${student.fullName}_ظافر_الشهراني.docx`);
}

/**
 * تصدير دليل تدريبات الـ 28 حرفاً كاملاً (3 كلمات لكل موضع = 9 نماذج للحرف)
 */
export async function exportLettersGuideDocx(lettersMap = ARABIC_LETTERS_MAP) {
  const sectionsChildren: (Paragraph | Table)[] = [
    ...(await createOfficialHeaderParagraphs('دليل تدريبات جميع الحروف العربية الـ 28 مع مواضعها والصور الواقعية')),
    
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      bidirectional: true,
      spacing: { after: 160 },
      children: [
        new TextRun({
          text: 'دليل مهني مرجعي للمعلم يتضمن مخارج وصفات الـ 28 حرفاً، وطرق استخدام (1- المرآة) و(2- خافض اللسان)، ونماذج ثلاث كلمات لكل موضع (أول، وسط، آخر الكلمة) مع الجمل السياقية.',
          font: 'Cairo',
          size: 22,
          rightToLeft: true
        })
      ]
    })
  ];

  for (let i = 0; i < ARABIC_LETTERS_LIST.length; i++) {
    const letter = ARABIC_LETTERS_LIST[i];
    const info = ARABIC_LETTERS_MAP[letter];

    if (i > 0) {
      sectionsChildren.push(new Paragraph({ children: [new PageBreak()] }));
      sectionsChildren.push(...(await createOfficialHeaderParagraphs(`نموذج تدريب: ${info.name}`)));
    }

    sectionsChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.RIGHT,
        bidirectional: true,
        spacing: { before: 100, after: 80 },
        children: [
          new TextRun({ text: `حرف [ ${letter} ] - ${info.name}`, font: 'Cairo', bold: true, size: 28, color: PRIMARY_COLOR, rightToLeft: true })
        ]
      }),
      createRtlTable([
        new TableRow({
          children: [
            createStyledCell('المخرج الصوتي الدقيق', 25, true),
            createStyledCell(info.articulationPoint, 75)
          ]
        }),
        new TableRow({
          children: [
            createStyledCell(`${info.articulationType} (${info.classification})`, 75),
            createStyledCell('Classification', 25, true)
          ]
        }),
        new TableRow({
          children: [
            createStyledCell('1- طريقة استخدام المرآة', 25, true),
            createStyledCell(info.mirrorInstruction, 75)
          ]
        }),
        new TableRow({
          children: [
            createStyledCell('2- طريقة استخدام خافض اللسان', 25, true),
            createStyledCell(info.tongueDepressorInstruction, 75)
          ]
        }),
        new TableRow({
          children: [
            createStyledCell('نصائح علاجية إكلينيكية', 25, true),
            createStyledCell(info.clinicalTips.join(' | '), 75)
          ]
        })
      ]),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        alignment: AlignmentType.RIGHT,
        bidirectional: true,
        spacing: { before: 140, after: 60 },
        children: [
          new TextRun({ text: `نماذج مواضع الحرف الثلاثة (ثلاث كلمات لكل موضع):`, font: 'Cairo', bold: true, size: 22, color: PRIMARY_COLOR, rightToLeft: true })
        ]
      }),
      createRtlTable([
        new TableRow({
          children: [
            createStyledCell('الموضع والنموذج', 20, true),
            createStyledCell('الكلمة الواقعية', 25, true),
            createStyledCell('جملة تدريبية نطقية سياقية', 30, true)
          ]
        }),
        // 3 words at beginning
        ...info.examples.beginning.words.map((w, idx) => (
          new TableRow({
            children: [
              createStyledCell(`أول الكلمة (${idx + 1})`, 20, false, true),
              createStyledCell(w.word, 25, false, true, PRIMARY_COLOR),
              createStyledCell(w.sentence, 30)
            ]
          })
        )),
        // 3 words at middle
        ...info.examples.middle.words.map((w, idx) => (
          new TableRow({
            children: [
              createStyledCell(`وسط الكلمة (${idx + 1})`, 20, false, true),
              createStyledCell(w.word, 25, false, true, SECONDARY_COLOR),
              createStyledCell(w.sentence, 30)
            ]
          })
        )),
        // 3 words at end
        ...info.examples.end.words.map((w, idx) => (
          new TableRow({
            children: [
              createStyledCell(`آخر الكلمة (${idx + 1})`, 20, false, true),
              createStyledCell(w.word, 25, false, true, PRIMARY_COLOR),
              createStyledCell(w.sentence, 30)
            ]
          })
        ))
      ]),

      new Paragraph({
        spacing: { before: 160 },
        alignment: AlignmentType.RIGHT,
        bidirectional: true,
        children: [
          new TextRun({ text: 'أخصائي تدريبات نطق: ', font: 'Cairo', bold: true, rightToLeft: true }),
          new TextRun({ text: SCHOOL_KLICHE.specialistName, font: 'Cairo', bold: true, color: PRIMARY_COLOR, rightToLeft: true })
        ]
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        children: sectionsChildren
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `دليل_تدريبات_الحروف_العربية_28_ظافر_الشهراني.docx`);
}

/**
 * تصدير استمارة الواجب المنزلي (.docx)
 */
export async function exportHomeworkDocx(student: StudentProfile, homework: HomeworkSheet) {
  const parentMethod = shouldUpgradeParentTrainingGuide(homework.mirrorInstructionAtHome)
    ? parentTrainingGuide(homework.targetLetter)
    : homework.mirrorInstructionAtHome;
  const doc = new Document({
    sections: [
      {
        children: [
          ...(await createOfficialHeaderParagraphs(`استمارة الواجب المنزلي والمتابعة الأسرية لحرف [ ${homework.targetLetter} ]`, student.fullName)),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { before: 100, after: 80 },
            children: [
              new TextRun({ text: 'إرشادات التدريب المنزلي لولي الأمر', font: 'Cairo', bold: true, color: PRIMARY_COLOR, size: 24, rightToLeft: true })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { after: 80 },
            children: [
              new TextRun({ text: homework.letterInstructionsForParent, font: 'Cairo', size: 22, rightToLeft: true })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { after: 120 },
            children: [
              new TextRun({ text: 'طريقة التدريب أمام مرآة المنزل: ', font: 'Cairo', bold: true, color: PRIMARY_COLOR, rightToLeft: true }),
              new TextRun({ text: parentMethod, font: 'Cairo', rightToLeft: true })
            ]
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { before: 120, after: 80 },
            children: [
              new TextRun({ text: 'قائمة كلمات التدريب اليومي المنزلي', font: 'Cairo', bold: true, color: PRIMARY_COLOR, size: 22, rightToLeft: true })
            ]
          }),
          createRtlTable([
            new TableRow({ children: ['الكلمة الأولى', 'الكلمة الثانية', 'الكلمة الثالثة', 'التكرار اليومي'].map(title => createStyledCell(title, 25, true)) }),
            ...homeworkColumns(homework).map((words, positionIndex) => new TableRow({ children: [
              ...words.slice(0, 3).map((word, index) => createStyledCell((index === 0 ? homeworkPositions[positionIndex] + '\n' : '') + word.word, 25)),
              createStyledCell('□ □ □ □ □', 25)
            ] }))
          ]),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { before: 140, after: 60 },
            children: [
              new TextRun({ text: 'الجملة التدريبية المتكاملة: ', font: 'Cairo', bold: true, color: PRIMARY_COLOR, rightToLeft: true }),
              new TextRun({ text: `"${homework.sentenceToRepeat}"`, font: 'Cairo', bold: true, size: 24, rightToLeft: true })
            ]
          }),

          new Paragraph({
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { before: 200, after: 60 },
            children: [
              new TextRun({ text: 'ملاحظات ولي الأمر بعد التدريب: ', font: 'Cairo', bold: true, rightToLeft: true }),
              new TextRun({ text: homework.parentNotes || '..........................................................', font: 'Cairo', rightToLeft: true })
            ]
          }),

          new Paragraph({
            spacing: { before: 220 },
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            children: [
              new TextRun({ text: 'أخصائي تدريبات نطق: ', font: 'Cairo', bold: true, rightToLeft: true }),
              new TextRun({ text: SCHOOL_KLICHE.specialistName, font: 'Cairo', bold: true, color: PRIMARY_COLOR, rightToLeft: true }),
              new TextRun({ text: '             ولي الأمر: ____________________', font: 'Cairo', rightToLeft: true })
            ]
          })
        ]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `واجب_منزلي_${homework.targetLetter}_${student.fullName}_ظافر_الشهراني.docx`);
}

/**
 * تصدير التقرير النطقي النهائي (.docx)
 */
export async function exportFinalReportDocx(student: StudentProfile, report: FinalProgressReport) {
  const doc = new Document({
    sections: [
      {
        children: [
          ...(await createOfficialHeaderParagraphs('التقرير النطقي النهائي وقياس نسبة الإنجاز والتطور', student.fullName)),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { before: 100, after: 80 },
            children: [
              new TextRun({ text: 'ملخص الحالة ومسار التدريب', font: 'Cairo', bold: true, color: PRIMARY_COLOR, size: 24, rightToLeft: true })
            ]
          }),
          createRtlTable([
            new TableRow({
              children: [
                createStyledCell('الفترة التدريبية', 30, true),
                createStyledCell(report.trainingPeriod, 70)
              ]
            }),
            new TableRow({
              children: [
                createStyledCell('الحالة عند بدء البرنامج (خط الأساس)', 30, true),
                createStyledCell(report.initialStateSummary, 70)
              ]
            }),
            new TableRow({
              children: [
                createStyledCell('الحالة عند الإغلاق والتقييم الختامي', 30, true),
                createStyledCell(report.finalStateSummary, 70)
              ]
            }),
            new TableRow({
              children: [
                createStyledCell('نسبة وضوح النطق النهائية', 30, true),
                createStyledCell(`${report.speechIntelligibilityFinal}%`, 70, false, true, PRIMARY_COLOR)
              ]
            })
          ]),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { before: 160, after: 80 },
            children: [
              new TextRun({ text: 'جدول تطور إتقان الأصوات المستهدفة', font: 'Cairo', bold: true, color: PRIMARY_COLOR, size: 22, rightToLeft: true })
            ]
          }),
          createRtlTable([
            new TableRow({
              children: [
                createStyledCell('الصوت المستهدف', 25, true),
                createStyledCell('نسبة البداية', 25, true),
                createStyledCell('نسبة الإنجاز النهائية', 25, true),
                createStyledCell('الحالة الإكلينيكية', 25, true)
              ]
            }),
            ...report.letterProgression.map(
              p =>
                new TableRow({
                  children: [
                    createStyledCell(`حرف [ ${p.letter} ]`, 25, false, true),
                    createStyledCell(`${p.beforeRate}%`, 25),
                    createStyledCell(`${p.afterRate}%`, 25, false, true, PRIMARY_COLOR),
                    createStyledCell(p.status, 25, false, true, '059669')
                  ]
                })
            )
          ]),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { before: 160, after: 80 },
            children: [
              new TextRun({ text: 'أثر الأدوات المستخدمة في نجاح الخطة', font: 'Cairo', bold: true, color: PRIMARY_COLOR, size: 22, rightToLeft: true })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { after: 60 },
            children: [
              new TextRun({ text: '1- مرآة النطق والتخاطب: ', font: 'Cairo', bold: true, color: PRIMARY_COLOR, rightToLeft: true }),
              new TextRun({ text: report.toolsEffectiveness.mirrorEffectiveness, font: 'Cairo', rightToLeft: true })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { after: 120 },
            children: [
              new TextRun({ text: '2- خافض اللسان الطبي المعقم: ', font: 'Cairo', bold: true, color: PRIMARY_COLOR, rightToLeft: true }),
              new TextRun({ text: report.toolsEffectiveness.tongueDepressorEffectiveness, font: 'Cairo', rightToLeft: true })
            ]
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { before: 140, after: 80 },
            children: [
              new TextRun({ text: 'التوصيات للمرحلة القادمة', font: 'Cairo', bold: true, color: PRIMARY_COLOR, size: 22, rightToLeft: true })
            ]
          }),
          ...report.recommendationsForNextStage.map(
            (rec, idx) =>
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                bidirectional: true,
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: `• (${idx + 1}) `, font: 'Cairo', bold: true, color: PRIMARY_COLOR, rightToLeft: true }),
                  new TextRun({ text: rec, font: 'Cairo', rightToLeft: true })
                ]
              })
          ),

          new Paragraph({
            spacing: { before: 260 },
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            children: [
              new TextRun({ text: 'أخصائي تدريبات نطق: ', font: 'Cairo', bold: true, size: 22, rightToLeft: true }),
              new TextRun({ text: SCHOOL_KLICHE.specialistName, font: 'Cairo', bold: true, size: 24, color: PRIMARY_COLOR, rightToLeft: true }),
            ]
          })
        ]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `التقرير_النهائي_${student.fullName}_ظافر_الشهراني.docx`);
}

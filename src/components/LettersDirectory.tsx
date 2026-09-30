import { EditableText } from './EditableText';
import React, { useState, useEffect, useRef } from 'react';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import {
  FileDown,
  Printer,
  Sparkles,
  Camera,
  CheckCircle2,
  Eye,
  Wrench,
  Search,
  BookOpen,
  Pencil
} from 'lucide-react';
import { ArabicLetterKey, LetterInfo, LetterWordItem } from '../types/speechTherapy';
import { ARABIC_LETTERS_LIST, ARABIC_LETTERS_MAP } from '../data/arabicLettersData';
import { OfficialHeader } from './OfficialHeader';
import { triggerOfficialPrint } from '../services/printService';
import { SCHOOL_KLICHE } from '../data/sampleData';
import { EditWordModal } from './EditWordModal';
import { auth, db } from '../services/firebase';

export const LettersDirectory: React.FC = () => {
  const [cloudReady, setCloudReady] = useState(false);
  const [saveStatus, setSaveStatus] = useState('جارٍ تحميل تخصيصات الحروف…');
  const queuedMap = useRef<Partial<Record<string, LetterInfo>>>({});
  const [retrySave, setRetrySave] = useState(0);
  const [saveFailed, setSaveFailed] = useState(false);
  const saveSequence = useRef(0);
  const pendingSave = useRef<Promise<unknown>>(Promise.resolve());
  const [lettersMap, setLettersMap] = useState<Record<ArabicLetterKey, LetterInfo>>(() => {
    try { const uid = auth?.currentUser?.uid; const saved = uid ? localStorage.getItem(`st_custom_letters_map_${uid}`) : null; return saved ? { ...ARABIC_LETTERS_MAP, ...JSON.parse(saved) } : ARABIC_LETTERS_MAP; } catch { return ARABIC_LETTERS_MAP; }
  });

  const [selectedLetterKey, setSelectedLetterKey] = useState<ArabicLetterKey>('ر');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isExporting, setIsExporting] = useState(false);

  // Edit Modal State
  const [editingModal, setEditingModal] = useState<{
    isOpen: boolean;
    letter: ArabicLetterKey;
    position: 'beginning' | 'middle' | 'end';
    positionLabel: string;
    wordIndex: number;
    initialItem: LetterWordItem;
  } | null>(null);

  useEffect(() => {
    const uid = auth?.currentUser?.uid;
    const database = db;
    if (!uid || !database) return;
    let active = true;
    void Promise.all([
      getDoc(doc(database, 'userWorkspaces', uid, 'settings', 'letters')),
      ...ARABIC_LETTERS_LIST.map(letter => getDoc(doc(database, 'userWorkspaces', uid, 'settings', `letter-${letter}`)))
    ]).then(([legacy, ...letterSnapshots]) => {
      if (!active) return;
      const merged = { ...ARABIC_LETTERS_MAP, ...(legacy.data()?.lettersMap as Partial<Record<ArabicLetterKey, LetterInfo>> | undefined) };
      letterSnapshots.forEach((snapshot, index) => {
        const info = snapshot.data()?.letterInfo as LetterInfo | undefined;
        if (info) merged[ARABIC_LETTERS_LIST[index]] = info;
      });
      queuedMap.current = merged;
      setLettersMap(merged);
      setSaveStatus('تخصيصات الحروف محفوظة');
      setCloudReady(true);
    }).catch(error => {
      console.error('Could not load letter customizations', error);
      if (active) { setCloudReady(false); setSaveStatus('تعذر تحميل تخصيصاتك؛ لا تعدّل الحروف قبل إعادة تحميل الصفحة.'); }
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    try { if (auth?.currentUser?.uid) localStorage.setItem(`st_custom_letters_map_${auth.currentUser.uid}`, JSON.stringify(lettersMap)); }
    catch (error) { console.warn('Local letter image cache is full; cloud copy remains available.', error); }
    const uid = auth?.currentUser?.uid;
    const database = db;
    if (!cloudReady || !uid || !database) return;
    const changed = Object.entries(lettersMap).filter(([letter, info]) => queuedMap.current[letter] !== info);
    if (!changed.length) return;
    queuedMap.current = lettersMap;
    const sequence = ++saveSequence.current;
    setSaveFailed(false);
    setSaveStatus('جارٍ حفظ تخصيصات الحروف…');
    const task = pendingSave.current.catch(() => undefined).then(() => Promise.all(changed.map(([letter, letterInfo]) =>
      setDoc(doc(database, 'userWorkspaces', uid, 'settings', `letter-${letter}`), { letterInfo, updatedAt: serverTimestamp() }, { merge: true })
    )));
    pendingSave.current = task;
    void task.then(() => { if (sequence === saveSequence.current) setSaveStatus('تم حفظ تخصيصات الحروف سحابياً'); }).catch(error => {
      console.error('Could not sync letter customizations', error);
      changed.forEach(([letter, info]) => { if (queuedMap.current[letter] === info) queuedMap.current = { ...queuedMap.current, [letter]: undefined }; });
      setSaveFailed(true);
      setSaveStatus('تعذر حفظ بعض التخصيصات سحابياً. لا تغلق الصفحة، ثم أعد المحاولة بعد الاتصال.');
    });
  }, [lettersMap, cloudReady, retrySave]);

  const currentLetter: LetterInfo = lettersMap[selectedLetterKey] || lettersMap['ر'];

  const updateLetterDetails = (changes: Partial<LetterInfo>) => setLettersMap(previous => ({ ...previous, [selectedLetterKey]: { ...previous[selectedLetterKey], ...changes } }));

  const filteredLetters = ARABIC_LETTERS_LIST.filter(l => {
    const info = lettersMap[l];
    const matchesSearch =
      l.includes(searchTerm) ||
      info.name.includes(searchTerm) ||
      info.examples.beginning.words.some(w => w.word.includes(searchTerm)) ||
      info.examples.middle.words.some(w => w.word.includes(searchTerm)) ||
      info.examples.end.words.some(w => w.word.includes(searchTerm));
    if (selectedFilter === 'all') return matchesSearch;
    return matchesSearch && info.classification === selectedFilter;
  });

  const handleExportAllDocx = async () => {
    setIsExporting(true);
    try {
      const { exportLettersGuideDocx } = await import('../services/docxExportService');
      await exportLettersGuideDocx(lettersMap);
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleOpenEditModal = (
    position: 'beginning' | 'middle' | 'end',
    positionLabel: string,
    wordIndex: number,
    item: LetterWordItem
  ) => {
    setEditingModal({
      isOpen: true,
      letter: currentLetter.letter,
      position,
      positionLabel,
      wordIndex,
      initialItem: item
    });
  };

  const handleSaveWordItem = (updatedItem: LetterWordItem) => {
    if (!editingModal) return;
    const { letter, position, wordIndex } = editingModal;

    const oldLetterInfo = lettersMap[letter];
    const oldPositionGroup = oldLetterInfo.examples[position];
    const newWords = [...oldPositionGroup.words] as [LetterWordItem, LetterWordItem, LetterWordItem];
    newWords[wordIndex] = updatedItem;

    const updatedLetterInfo: LetterInfo = {
      ...oldLetterInfo,
      examples: {
        ...oldLetterInfo.examples,
        [position]: {
          ...oldPositionGroup,
          words: newWords
        }
      }
    };

    setLettersMap(prev => ({
      ...prev,
      [letter]: updatedLetterInfo
    }));
  };

  if (!cloudReady) return <div role="status" className="rounded-xl border bg-white p-6 text-slate-700">{saveStatus}<button type="button" className="mr-3 text-sky-800" onClick={() => window.location.reload()}>إعادة المحاولة</button></div>;

  return (
    <div className="space-y-6">
      <p role="status" className="text-xs text-slate-600 print:hidden">{saveStatus}</p>
      {saveFailed && <button type="button" className="rounded-lg bg-sky-800 px-4 py-2 text-white print:hidden" onClick={() => setRetrySave(value => value + 1)}>إعادة محاولة الحفظ</button>}
      {/* Top Banner & Actions - Harmonized Soft Blue Gradient */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gradient-to-l from-sky-950 via-sky-900 to-slate-900 text-white p-4 rounded-2xl shadow-md border border-sky-800/40">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-sky-800/90 text-sky-100 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 border border-sky-600/50">
              <Sparkles className="w-3.5 h-3.5 text-sky-100" />
              تدريبات الحروف الـ 28 مع إمكانية التعديل
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black">
            نماذج تدريبات النطق للحروف العربية بصور واقعية
          </h2>
          <p className="text-sky-200 text-xs mt-1 max-w-2xl">
            دليل تدريبي للمعلم لكل حرف بمواقعه الثلاثة، مع الصور وتعليمات المرآة وخافض اللسان.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleExportAllDocx}
            disabled={isExporting}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 text-sm cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            {isExporting ? 'جاري إنشاء ملف Word...' : 'تصدير دليل الـ 28 حرفاً (Word)'}
          </button>
          <button
            onClick={() => triggerOfficialPrint('.printable-document')}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 text-sm cursor-pointer"
            title="طباعة الدليل والنماذج على A4"
          >
            <Printer className="w-4 h-4" />
            طباعة الدليل
          </button>
        </div>
      </div>

      {/* Letters Filter & Quick Selection Bar */}
      <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث عن حرف أو كلمة..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pr-9 pl-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-sky-600 bg-slate-50/50"
            />
          </div>

          {/* Classification Filter Badges */}
          <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
            <span className="text-xs text-slate-500 font-medium ml-1">المخرج:</span>
            {[
              { id: 'all', label: 'الكل (28)' },
              { id: 'شفوي', label: 'شفوية' },
              { id: 'أسناني', label: 'أسنانية' },
              { id: 'لثوي', label: 'لثوية' },
              { id: 'غاري', label: 'غارية' },
              { id: 'طبقي', label: 'طبقية' },
              { id: 'لهوي', label: 'لهوية' },
              { id: 'حلقي', label: 'حلقية' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-sky-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 28 Letters Grid */}
        <div className="grid grid-cols-7 sm:grid-cols-14 md:grid-cols-28 gap-1.5 pt-2 border-t border-slate-100">
          {filteredLetters.map(letter => {
            const isSelected = selectedLetterKey === letter;
            return (
              <button
                key={letter}
                onClick={() => {
                  setSelectedLetterKey(letter);
                }}
                className={`h-11 rounded-xl font-black text-lg flex flex-col items-center justify-center transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-sky-800 text-white border-sky-900 shadow-md scale-105 ring-2 ring-amber-400'
                    : 'bg-slate-50 hover:bg-sky-50 text-slate-800 border-slate-200 hover:border-sky-300'
                }`}
              >
                <span>{letter}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Single Letter Card (Printable with Official Cliché) */}
        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4 sm:p-6 printable-document printable-sheet print:p-0 print:border-none print:shadow-none">
        {/* Official Header */}
        <OfficialHeader
          documentTitle={`دليل التدريب الصوتي والنطقي لحرف [ ${currentLetter.letter} ]`}
          subTitle={`مخرج وصفات وطرق نطق ${currentLetter.name} مع نماذج المواضع الثلاثة`}
          showStudentBar={false}
        />

        {/* Top Letter Profile Header */}
        <div className="bg-gradient-to-r from-sky-50 via-slate-50 to-sky-50 rounded-2xl p-4 border border-sky-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-sky-900 text-white flex items-center justify-center text-3xl font-black shadow-sm border border-sky-700 shrink-0">
              {currentLetter.letter}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="text-2xl font-black text-slate-900">
                  {currentLetter.name}
                </h2>
                <span className="text-xs font-bold bg-sky-100 text-sky-900 px-3 py-0.5 rounded-full border border-sky-200">
                  مخرج {currentLetter.classification}
                </span>
              </div>
              <div className="text-xs text-slate-600 max-w-xl font-medium">
                <EditableText suggestions={Object.values(ARABIC_LETTERS_MAP).map(info => info.articulationType)} label="وصف المخرج" value={currentLetter.articulationType} onSave={value => updateLetterDetails({ articulationType: value })} />
              </div>
            </div>
          </div>

          {/* Audio Quick Pronunciation */}
          <div className="flex items-center gap-2">
            
          </div>
        </div>

        {/* Articulation & Phonetic Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Mukhraj Detailed */}
          <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <BookOpen className="w-4 h-4 text-sky-800" />
              <h3 className="font-bold text-slate-900 text-sm">
                المخرج الصوتي الدقيق للحرف:
              </h3>
            </div>
            <div className="text-xs text-slate-700 leading-relaxed font-semibold">
              <EditableText suggestions={Object.values(ARABIC_LETTERS_MAP).map(info => info.articulationPoint)} label="المخرج الصوتي" value={currentLetter.articulationPoint} onSave={value => updateLetterDetails({ articulationPoint: value })} />
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-500 block mb-1">
                الحركات القصيرة مع الصوت:
              </span>
              <div className="flex items-center gap-2">
                {Object.entries(currentLetter.shortVowels).map(([vKey, vVal]) => (
                  <span
                    key={vKey}
                    className="flex-1 py-1.5 bg-white border border-slate-200 rounded-lg text-center font-bold text-sm text-sky-950"
                  >
                    {vVal}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Long Vowels */}
          <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-sm">
                المدود الصوتية الطويلة:
              </h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-semibold">
              تدريب الأوتار الصوتية على إطالة المجرى الصوتي لحرف [ {currentLetter.letter} ] بالمدود الثلاثة:
            </p>

            <div className="pt-2">
              <div className="flex items-center gap-2">
                {Object.entries(currentLetter.longVowels).map(([lKey, lVal]) => (
                  <span
                    key={lKey}
                    className="flex-1 py-2 bg-white border border-sky-200 rounded-lg text-center font-bold text-base text-sky-950 shadow-2xs"
                  >
                    {lVal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Tools Used Section: 1- Mirror & 2- Tongue Depressor */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-sky-800" />
            <h3 className="text-lg font-black text-slate-900">
              طرق استخدام الأدوات الأساسية لحرف [ {currentLetter.letter} ]
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tool 1: Mirror */}
            <div className="bg-sky-50/70 border-2 border-sky-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-700 text-white flex items-center justify-center font-bold shadow-xs">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-sky-950 text-base flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-sky-700" />
                    استخدام المرآة (التغذية الراجعة البصرية)
                  </h4>
                  <span className="text-[11px] text-sky-700 font-medium">
                    الضبط البصري الحركي ومطابقة وضعية النطق
                  </span>
                </div>
              </div>
              <div className="text-xs text-slate-700 leading-relaxed bg-white/80 p-3 rounded-xl border border-sky-100 font-medium">
                <EditableText label="إجراء المرآة" value={currentLetter.mirrorInstruction} onSave={value => updateLetterDetails({ mirrorInstruction: value })} />
              </div>
            </div>

            {/* Tool 2: Tongue Depressor */}
            <div className="bg-amber-50/70 border-2 border-amber-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-amber-950 text-base flex items-center gap-1.5">
                    <Wrench className="w-4 h-4 text-amber-700" />
                    استخدام خافض اللسان الطبي المعقم (التوجيه العضلي اللمسي)
                  </h4>
                  <span className="text-[11px] text-amber-700 font-medium">
                    تثبيت اللسان وتوجيهه لموضع المخرج الصحيح وعزل الأصوات البديلة
                  </span>
                </div>
              </div>
              <div className="text-xs text-slate-700 leading-relaxed bg-white/80 p-3 rounded-xl border border-amber-100 font-medium">
                <EditableText label="إجراء خافض اللسان" value={currentLetter.tongueDepressorInstruction} onSave={value => updateLetterDetails({ tongueDepressorInstruction: value })} />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Positions with 3 REAL Crisp Photos & Examples each (Total 9 Words) */}
        <div className="mb-8 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-sky-800" />
              <h3 className="text-lg font-black text-slate-900">
                نماذج مواضع الحرف الثلاثة (ثلاث كلمات واقعية لكل موضع مع إمكانية التعديل)
              </h3>
            </div>
            <span className="text-xs bg-sky-100 text-sky-950 font-black px-3 py-1 rounded-full shadow-xs">
              9 كلمات واقعية متكاملة بصور حقيقية
            </span>
          </div>

          {/* Beginning Position - 3 Words */}
          <div className="space-y-3 bg-sky-50/40 p-5 rounded-3xl border border-sky-100">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-base text-sky-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-sky-800 text-white text-xs flex items-center justify-center font-bold">1</span>
                أول الكلمة ({currentLetter.letter}) - 3 نماذج واقعية
              </h4>
              <span className="text-xs text-sky-800 font-bold">موقع الحرف في بداية الكلمة</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {currentLetter.examples.beginning.words.map((item, idx) => (
                <div key={idx} className="bg-white border-2 border-sky-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between">
                  <div>
                    <div className="relative h-44 bg-slate-100 overflow-hidden">
                      <img
                        src={item.imageUrl || undefined}
                        alt={item.word}
                        onLoad={e => { e.currentTarget.style.visibility = 'visible'; }}
                        onError={e => { e.currentTarget.style.visibility = 'hidden'; }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-3 right-3 bg-sky-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        أول الكلمة ({idx + 1})
                      </span>
                      {/* Edit Button directly on card */}
                      <button
                        onClick={() => handleOpenEditModal('beginning', 'أول الكلمة', idx, item)}
                        className="absolute top-3 left-3 bg-white/90 hover:bg-white text-sky-900 p-1.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer print:hidden"
                        title="تعديل الكلمة أو الصورة"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-4 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h5 className="text-2xl font-black text-slate-900">
                          {item.word}
                        </h5>
                        
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold block mb-0.5">
                          الجملة السياقية:
                        </span>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-slate-800">
                            {item.sentence}
                          </p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Position - 3 Words */}
          <div className="space-y-3 bg-slate-50 p-5 rounded-3xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-base text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-slate-800 text-white text-xs flex items-center justify-center font-bold">2</span>
                وسط الكلمة ({currentLetter.letter}) - 3 نماذج واقعية
              </h4>
              <span className="text-xs text-slate-700 font-bold">موقع الحرف في منتصف الكلمة</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {currentLetter.examples.middle.words.map((item, idx) => (
                <div key={idx} className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between">
                  <div>
                    <div className="relative h-44 bg-slate-100 overflow-hidden">
                      <img
                        src={item.imageUrl || undefined}
                        alt={item.word}
                        onLoad={e => { e.currentTarget.style.visibility = 'visible'; }}
                        onError={e => { e.currentTarget.style.visibility = 'hidden'; }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-3 right-3 bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        وسط الكلمة ({idx + 1})
                      </span>
                      {/* Edit Button */}
                      <button
                        onClick={() => handleOpenEditModal('middle', 'وسط الكلمة', idx, item)}
                        className="absolute top-3 left-3 bg-white/90 hover:bg-white text-slate-900 p-1.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer print:hidden"
                        title="تعديل الكلمة أو الصورة"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-4 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h5 className="text-2xl font-black text-slate-900">
                          {item.word}
                        </h5>
                        
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold block mb-0.5">
                          الجملة السياقية:
                        </span>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-slate-800">
                            {item.sentence}
                          </p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* End Position - 3 Words */}
          <div className="space-y-3 bg-amber-50/30 p-5 rounded-3xl border border-amber-100">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-base text-amber-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-amber-800 text-white text-xs flex items-center justify-center font-bold">3</span>
                آخر الكلمة ({currentLetter.letter}) - 3 نماذج واقعية
              </h4>
              <span className="text-xs text-amber-800 font-bold">موقع الحرف في نهاية الكلمة</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {currentLetter.examples.end.words.map((item, idx) => (
                <div key={idx} className="bg-white border-2 border-amber-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between">
                  <div>
                    <div className="relative h-44 bg-slate-100 overflow-hidden">
                      <img
                        src={item.imageUrl || undefined}
                        alt={item.word}
                        onLoad={e => { e.currentTarget.style.visibility = 'visible'; }}
                        onError={e => { e.currentTarget.style.visibility = 'hidden'; }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-3 right-3 bg-amber-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        آخر الكلمة ({idx + 1})
                      </span>
                      {/* Edit Button */}
                      <button
                        onClick={() => handleOpenEditModal('end', 'آخر الكلمة', idx, item)}
                        className="absolute top-3 left-3 bg-white/90 hover:bg-white text-amber-950 p-1.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer print:hidden"
                        title="تعديل الكلمة أو الصورة"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-4 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h5 className="text-2xl font-black text-slate-900">
                          {item.word}
                        </h5>
                        
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold block mb-0.5">
                          الجملة السياقية:
                        </span>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-slate-800">
                            {item.sentence}
                          </p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Practice Sentences Row */}
        <div className="bg-sky-50/50 p-5 rounded-2xl border border-sky-100 space-y-3 mb-8">
          <div className="flex items-center gap-2 border-b border-sky-200/80 pb-2">
            <Sparkles className="w-4 h-4 text-sky-800" />
            <h4 className="font-bold text-slate-900 text-sm">
              جمل التدريب والتعميم النطقي لحرف [ {currentLetter.letter} ]:
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentLetter.practiceSentences.map((sent, idx) => (
              <div
                key={idx}
                className="bg-white p-3.5 rounded-xl border border-sky-100 flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="text-xs font-bold text-slate-800 leading-relaxed">
                  <EditableText suggestions={ARABIC_LETTERS_MAP[selectedLetterKey].practiceSentences} label="جملة التدريب" value={sent} onSave={value => updateLetterDetails({ practiceSentences: currentLetter.practiceSentences.map((item, i) => i === idx ? value : item) })} onDelete={() => updateLetterDetails({ practiceSentences: currentLetter.practiceSentences.filter((_, i) => i !== idx) })} />
                </div>
                
              </div>
            ))}
          </div>
        </div>

        {/* Official Specialist Signature Row Only */}
        <div className="pt-8 border-t border-slate-300 flex justify-center text-xs text-center">
          <div className="space-y-2.5 max-w-sm w-full bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
            <span className="text-slate-600 font-bold block text-xs">أخصائي تدريبات نطق</span>
            <span className="text-base font-black text-sky-950 block">
              {SCHOOL_KLICHE.specialistName}
            </span>
            <div className="h-0.5 w-40 mx-auto bg-sky-700/40 my-2"></div>
            <span className="text-[11px] text-slate-500 font-medium">التوقيع</span>
          </div>
        </div>
      </div>

      {/* Edit Word & Image Modal */}
      {editingModal && (
        <EditWordModal
          isOpen={editingModal.isOpen}
          onClose={() => setEditingModal(null)}
          letter={editingModal.letter}
          positionLabel={editingModal.positionLabel}
          wordIndex={editingModal.wordIndex}
          initialItem={editingModal.initialItem}
          onSave={handleSaveWordItem}
        />
      )}
    </div>
  );
};

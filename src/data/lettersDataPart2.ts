import { ArabicLetterKey, LetterInfo } from '../types/speechTherapy';

export const LETTERS_PART_2: Record<string, LetterInfo> = {
  'ض': {
    letter: 'ض',
    name: 'حرف الضاد',
    articulationPoint: 'إحدى حافتي اللسان أو كلتيهما مع ما يحاذيها من الأضراس العليا مع استطالة صوتية واهتزاز الأوتار الصوتية.',
    articulationType: 'صوت رخو احتكاكي استطالي جانبي مجهور مفخم مطبق مستعلٍ.',
    classification: 'لثوي',
    mirrorInstruction: 'توجيه الطالب أمام المرآة لرؤية تلامس حافتي اللسان للأضراس العليا، مع إبقاء طرف اللسان حراً خلف الثنايا العليا دون أن يخرج أو يلتصق بشدة، وملاحظة تدفق الصوت الجانبي المستطيل.',
    tongueDepressorInstruction: 'يستخدم خافض اللسان للمس أضراس الفك العلوي لتحديد مكان ارتكاز حافة اللسان، ولمنع خروج طرف اللسان بين الأسنان كي لا ينقلب ظاءً.',
    clinicalTips: [
      'الضاد صوت مستطيل رخو وليس انفجارياً كالدال المفخمة.',
      'تدريب الطالب على حبس الهواء بالجانبين ثم تحريره برخاوة واستطالة.',
      'التأكد من عدم نطقها ظاءً بإبقاء طرف اللسان داخل الفم.'
    ],
    shortVowels: { fatha: 'ضَ', damma: 'ضُ', kasra: 'ضِ', sukoon: 'ضْ' },
    longVowels: { alif: 'ضَا', waw: 'ضُو', yaa: 'ضِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'ضِفْدَع',
            sentence: 'يَقْفِزُ الضِّفْدَعُ الأَخْضَرُ فِي بِرْكَةِ المَاءِ بِرَشَاقَةٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ضفدع أخضر حقيقي في الطبيعة'
          },
          {
            word: 'ضَوْء',
            sentence: 'يَنْتَشِرُ ضَوْءُ الشَّمْسِ الذَّهَبِيُّ فِي الصَّبَاحِ.',
            imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ضوء الشمس المشرق في الصباح'
          },
          {
            word: 'ضِرْس',
            sentence: 'يُنَظِّفُ الطَّالِبُ كُلَّ ضِرْسٍ بِالفُرْشَاةِ وَالمَعْجُونِ.',
            imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة أسنان وأضراس بيضاء صحية ونظيفة'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'خُضَار',
            sentence: 'تَنَاوُلُ الخُضَارِ الطَّازَجَةِ يُقَوِّي المَنَاعَةَ وَالبَدَنَ.',
            imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة خضار متنوعة طازجة وصحية'
          },
          {
            word: 'مَضْرِب',
            sentence: 'يُمْسِكُ اللَّاعِبُ مَضْرِبَ التَّنِسِ بِإِحْكَامٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مضرب كرة التنس'
          },
          {
            word: 'عَضَلَة',
            sentence: 'تَقْوَى عَضَلَةُ الجِسْمِ بِمُمَارَسَةِ الرِّيَاضَةِ اليَوْمِيَّةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة تمارين تقوية عضلات الجسم'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'أَرْض',
            sentence: 'تَهْطِلُ الأَمْطَارُ فَتَرْتَوِي الأَرْضُ وَتَخْضَرُّ.',
            imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة أرض خضراء ومروج طبيعية'
          },
          {
            word: 'بَيْض',
            sentence: 'وَضَعَتِ الدَّجَاجَةُ بَيْضاً طَازَجاً فِي المَزْرَعَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة بيض طازج في سلة قش'
          },
          {
            word: 'حَوْض',
            sentence: 'يَسْبَحُ السَّمَكُ المُلَوَّنُ فِي حَوْضِ المَاءِ النَّقِيِّ.',
            imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة حوض أسماك زينة ملون'
          }
        ]
      }
    },
    practiceSentences: [
      'ضَمَّتِ الأُمُّ طِفْلَهَا الصَّغِيرَ بِكُلِّ حَنَانٍ وَعَطْفٍ.',
      'أَضَاءَ المِصْبَاحُ الغُرْفَةَ بِضَوْءٍ أَبْيَضَ نَاصِعٍ.',
      'حَفِظَ الطَّالِبُ النَّجِيبُ سُورَةَ الضُّحَى تِلَاوَةً صَحِيحَةً.'
    ]
  },

  'ط': {
    letter: 'ط',
    name: 'حرف الطاء',
    articulationPoint: 'طرف اللسان مع أصول الثنايا العليا مع استعلاء أقصى اللسان وإطباقه نحو الحنك الأعلى.',
    articulationType: 'صوت انفجاري شديد مجهور مفخم مطبق مستعلٍ.',
    classification: 'أسناني',
    mirrorInstruction: 'مراقبة إطباق طرف اللسان القوي على أصول الأسنان العليا أمام المرآة، ورؤية امتلاء الفم بالتفخيم دون كز الشفتين.',
    tongueDepressorInstruction: 'يستخدم الخافض لتثبيت وسط اللسان ورفع أقصاه للخلف والشعور بالتفخيم لمنع تحول الطاء إلى تاء مرققة.',
    clinicalTips: [
      'أكثر اضطراب شيوعاً هو إبدال الطاء تاءً بسبب غياب التفخيم والإطباق.',
      'التدريب على التفخيم بالبدء بإنتاج صوت (طا) بامتلاء الفم والتثاؤب المصطنع.',
      'استخدام المقارنة السمعية والبصرية بين (ط) المفخمة و(ت) المرققة.'
    ],
    shortVowels: { fatha: 'طَ', damma: 'طُ', kasra: 'طِ', sukoon: 'طْ' },
    longVowels: { alif: 'طَا', waw: 'طُو', yaa: 'طِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'طَيَّارَة',
            sentence: 'تُحَلِّقُ الطَّيَّارَةُ الكَبِيرَةُ فَوْقَ السَّحَابِ الأَبْيَضِ.',
            imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة طائرة ركاب في السماء'
          },
          {
            word: 'طَمَاطِم',
            sentence: 'قَطَفَ المُزَارِعُ ثِمَارَ طَمَاطِمَ حَمْرَاءَ نَاضِجَةٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة طماطم حمراء طازجة'
          },
          {
            word: 'طَبِيب',
            sentence: 'يَفْحَصُ الطَّبِيبُ المَرِيضَ بِعِنَايَةٍ فِي العِيَادَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة طبيب حقيقي بسماعة الفحص'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'قِطَار',
            sentence: 'يَسِيرُ القِطَارُ السَّرِيعُ عَلَى السِّكَّةِ الحَدِيدِيَّةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة قطار حديث على السكة'
          },
          {
            word: 'بَطَّارِيَّة',
            sentence: 'وَضَعَ أَحْمَدُ بَطَّارِيَّةً جَدِيدَةً فِي سَاعَةِ الحَائِطِ.',
            imageUrl: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة بطاريات لتشغيل الأجهزة'
          },
          {
            word: 'مَطَر',
            sentence: 'يَهْطِلُ المَطَرُ الغَزِيرُ فَيَسْقِي الزَّرْعَ وَالشَّجَرَ.',
            imageUrl: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة قطرات المطر المتساقطة'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'قِطّ',
            sentence: 'يَلْعَبُ القِطُّ اللَّطِيفُ بِكُرَةِ الصُّوفِ الصَّغِيرَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة قط أليف جميل'
          },
          {
            word: 'بَطّ',
            sentence: 'يَسْبَحُ البَطُّ الأَبْيَضُ فِي البُحَيْرَةِ الهَادِئَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة بط يسبح في الماء'
          },
          {
            word: 'خَيْط',
            sentence: 'تَسْتَخْدِمُ الخَيَّاطَةُ خَيْطاً قَوِيّاً لِخِيَاطَةِ الثَّوْبِ.',
            imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة بكرات خيوط ملونة'
          }
        ]
      }
    },
    practiceSentences: [
      'طَارَ العُصْفُورُ الصَّغِيرُ فَوْقَ أَغْصَانِ الشَّجَرَةِ.',
      'طَبَخَتْ أُمِّي طَعَاماً شَهِيّاً وَلَذِيذاً لِلْغَدَاءِ.',
      'رَكِبَ الطُّلَّابُ حَافِلَةَ المَدْرَسَةِ بِنِظَامٍ وَانْضِبَاطٍ.'
    ]
  },

  'ظ': {
    letter: 'ظ',
    name: 'حرف الظاء',
    articulationPoint: 'طرف اللسان يخرج قليلاً بين الثنايا العليا والسفلى مع استعلاء أقصى اللسان وإطباقه.',
    articulationType: 'صوت رخو احتكاكي مجهور مفخم مطبق بين أسناني.',
    classification: 'أسناني',
    mirrorInstruction: 'مراقبة خروج طرف اللسان برفق شديد بين الأسنان أمام المرآة دون مبالغة، ورؤية التفخيم المصاحب للصوت.',
    tongueDepressorInstruction: 'يستخدم الخافض لمنع اللسان من التراجع للداخل حتى لا ينقلب الصوت ضاداً أو زاياً مفخمة، وضبط مسافة الخروج.',
    clinicalTips: [
      'التمييز السمعي والبصري بين الظاء والذال (التفخيم مقابل الترقيق).',
      'التمييز بين الظاء والضاد (الظاء يخرج فيها طرف اللسان، والضاد من حافة اللسان داخل الفم).',
      'توجيه الطالب لعدم الضغط بقوة بالأسنان على طرف اللسان.'
    ],
    shortVowels: { fatha: 'ظَ', damma: 'ظُ', kasra: 'ظِ', sukoon: 'ظْ' },
    longVowels: { alif: 'ظَا', waw: 'ظُو', yaa: 'ظِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'ظَرْف',
            sentence: 'وَضَعَ خَالِدٌ الرِّسَالَةَ فِي ظَرْفٍ أَبْيَضَ أَنِيقٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ظرف بريدي ورقي'
          },
          {
            word: 'ظَبْي',
            sentence: 'يَرْكُضُ الظَّبْيُ السَّرِيعُ فِي الصَّحْرَاءِ الشَّاسِعَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ظبي رشيق في الطبيعة'
          },
          {
            word: 'ظِلّ',
            sentence: 'جَلَسَ الأَوْلَادُ تَحْتَ ظِلِّ شَجَرَةِ النَّخِيلِ الوَارِفَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ظل شجرة على الأرض المشمسة'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'نَظَّارَة',
            sentence: 'يَرْتَدِي الجَدُّ نَظَّارَةً طِبِّيَّةً لِقِرَاءَةِ الكِتَابِ.',
            imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة نظارة طبية أنيقة'
          },
          {
            word: 'مِظَلَّة',
            sentence: 'فَتَحَ سَعِيدٌ المِظَلَّةَ لِيَحْتَمِيَ مِنْ قَطَرَاتِ المَطَرِ.',
            imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مظلة ملونة مفتوحة'
          },
          {
            word: 'عَظْم',
            sentence: 'يُعْطِي الوَلَدُ الكَلْبَ عَظْماً صَلْباً فِي الحَدِيقَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة عظم طعام للحيوانات الأليفة'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'حِفْظ',
            sentence: 'يَحْرِصُ الطَّالِبُ عَلَى حِفْظِ دُرُوسِهِ أَوَّلًا بِأَوَّلٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة طالب يدرس ويحفظ دروسه'
          },
          {
            word: 'اسْتِيقَاظ',
            sentence: 'الاسْتِيقَاظُ البَاكِرُ يَجْعَلُ الجِسْمَ نَشِيطاً وَصِحِّيّاً.',
            imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة استيقاظ في الصباح الباكر'
          },
          {
            word: 'وَعْظ',
            sentence: 'اسْتَمَعَ النَّاسُ إِلَى مَوْعِظَةِ خَطِيبِ الجُمُعَةِ بَخُشُوعٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة منبر ووعظ ديني في المسجد'
          }
        ]
      }
    },
    practiceSentences: [
      'ظَهَرَ الهِلَالُ الجَدِيدُ فِي سَمَاءِ المَسَاءِ الصَّافِيَةِ.',
      'حَافَظَ الطَّالِبُ عَلَى نَظَافَةِ صَفِّهِ وَمَدْرَسَتِهِ.',
      'ظَلَّ الأَطْفَالُ يَلْعَبُونَ بِمَرَحٍ فِي حَدِيقَةِ المَنْزِلِ.'
    ]
  },

  'ع': {
    letter: 'ع',
    name: 'حرف العين',
    articulationPoint: 'وسط الحلق من منطقة لسان المزمار وجدار البلعوم مع تراجع لسان المزمار للخلف.',
    articulationType: 'صوت متوسط رخو بين الشدة والرخاوة مجهور مرقق حلقي.',
    classification: 'حلقي',
    mirrorInstruction: 'توجيه الطالب أمام المرآة للشعور بحركة الحنجرة وانقباض البلعوم بوضع اليد على منتصف الرقبة، وملاحظة استقرار اللسان دون صعود.',
    tongueDepressorInstruction: 'يستخدم الخافض للضغط الخفيف على مؤخرة اللسان إذا ارتفع وسد التجويف الفموي بدلاً من حركة الحلق، لفتح مجرى الهواء الحلقي.',
    clinicalTips: [
      'أكثر الأخطاء تحويل العين إلى همزة (عصفور -> أصفور) أو خنق الصوت.',
      'محاكاة صوت التثاؤب العميق أو الغرغرة لفتح مخرج وسط الحلق.',
      'البدء بالصوت مع المدود السهلة مثل (عَا - عُو - عِي).'
    ],
    shortVowels: { fatha: 'عَ', damma: 'عُ', kasra: 'عِ', sukoon: 'عْ' },
    longVowels: { alif: 'عَا', waw: 'عُو', yaa: 'عِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'عَصِير',
            sentence: 'شَرِبَ عُمَرُ كَأْسَ عَصِيرِ بُرْتُقَالٍ طَازَجٍ وَلَذِيذٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة عصير برتقال طبيعي طازج'
          },
          {
            word: 'عَيْن',
            sentence: 'العَيْنُ نِعْمَةٌ عَظِيمَةٌ نَرَى بِهَا جَمَالَ الكَوْنِ.',
            imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة عين إنسان حقيقية صافية'
          },
          {
            word: 'عُصْفُور',
            sentence: 'يُغَرِّدُ العُصْفُورُ الجَمِيلُ فَوْقَ غُصْنِ الشَّجَرَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة عصفور ملون على الغصن'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'مِلْعَقَة',
            sentence: 'يَأْكُلُ الطِّفْلُ حَسَاءَهُ الشَّهِيَّ بِمِلْعَقَةٍ صَغِيرَةٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ملعقة طعام فضية'
          },
          {
            word: 'سَاعَة',
            sentence: 'تَدُقُّ السَّاعَةُ الجِدَارِيَّةُ مُعْلِنَةً حُلُولَ الصَّبَاحِ.',
            imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ساعة حائط كلاسيكية'
          },
          {
            word: 'شَمْعَة',
            sentence: 'تُضِيءُ الشَّمْعَةُ الصَّغِيرَةُ الظَّلَامَ بِنُورٍ دَافِئٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة شمعة مضيئة'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'مُرَبَّع',
            sentence: 'رَسَمَ الطَّالِبُ فِي دَفْتَرِهِ شَكْلَ مُرَبَّعٍ مُتَسَاوِي الأَضْلَاعِ.',
            imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة أشكال هندسية ومربعات'
          },
          {
            word: 'مُذِيع',
            sentence: 'يُقَدِّمُ المُذِيعُ نَشْرَةَ الأَخْبَارِ بِصَوْتٍ وَاضِحٍ وَفَصِيحٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مذيع أمام ميكروفون الاستوديو'
          },
          {
            word: 'شَارِع',
            sentence: 'يَعْبُرُ المُشَاةُ الشَّارِعَ مِنْ خَطِّ العُبُورِ المُخَصَّصِ.',
            imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة شارع مدينة منظم ونظيف'
          }
        ]
      }
    },
    practiceSentences: [
      'عَادَ عُمَرُ مِنَ المَدْرَسَةِ فَرِحاً بِنَجَاحِهِ الكَبِيرِ.',
      'يَرْعَى المُزَارِعُ أَرْضَهُ وَيَسْقِي نَبَاتَاتِهَا كُلَّ صَبَاحٍ.',
      'رَفَعَ الطَّالِبُ العَلَمَ فِي الطَّابُورِ الصَّبَاحِيِّ بِفَخْرٍ.'
    ]
  },

  'غ': {
    letter: 'غ',
    name: 'حرف الغين',
    articulationPoint: 'أدنى الحلق مما يلي الفم مع جذر اللسان واللهاة.',
    articulationType: 'صوت رخو احتكاكي مجهور مفخم مستعلٍ حلقي.',
    classification: 'حلقي',
    mirrorInstruction: 'توجيه الطالب أمام المرآة لرؤية تراجع جذر اللسان للخلف نحو الحنك الرخو مع ارتجاف خفيف مسموع دون خشونة مفرطة كالخاء.',
    tongueDepressorInstruction: 'يستخدم الخافض لدفع وسط اللسان برفق لأسفل لتسهيل صعود مؤخرة اللسان نحو أدنى الحلق.',
    clinicalTips: [
      'الفرق بين الغين والخاء هو الجهر (اهتزاز الحنجرة في الغين والهمس في الخاء).',
      'تدريب الطالب بالغرغرة بالماء لتحديد موضع ارتكاز الغين بدقة.',
      'منع تحول الغين إلى قاف أو خاء.'
    ],
    shortVowels: { fatha: 'غَ', damma: 'غُ', kasra: 'غِ', sukoon: 'غْ' },
    longVowels: { alif: 'غَا', waw: 'غُو', yaa: 'غِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'غَزَال',
            sentence: 'يَرْكُضُ الغَزَالُ الرَّشِيقُ بِسُرْعَةٍ فِي المُرُوجِ الخَضْرَاءِ.',
            imageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة غزال رشيق في البرية'
          },
          {
            word: 'غَيْمَة',
            sentence: 'تَسِيرُ الغَيْمَةُ البَيْضَاءُ فِي السَّمَاءِ الزَّرْقَاءِ الهَادِئَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة غيوم بيضاء في السماء'
          },
          {
            word: 'غُرَاب',
            sentence: 'يَقِفُ الغُرَابُ الأَسْوَدُ عَلَى قِمَّةِ الشَّجَرَةِ العَالِيَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة غراب حقيقي في الطبيعة'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'مَغْسَلَة',
            sentence: 'يَغْسِلُ الطِّفْلُ يَدَيْهِ بِالمَاءِ وَالصَّابُونِ عِنْدَ المَغْسَلَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مغسلة نظيفة في الحمام'
          },
          {
            word: 'بَبَّغَاء',
            sentence: 'يُقَلِّدُ البَبَّغَاءُ المُلَوَّنُ كَلِمَاتِ الإِنْسَانِ بِمَرَحٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ببغاء ملون جميل'
          },
          {
            word: 'مَغْنَاطِيس',
            sentence: 'يَجْذِبُ المَغْنَاطِيسُ القَوِيُّ المَسَامِيرَ الحَدِيدِيَّةَ الصَّغِيرَةَ.',
            imageUrl: 'https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مغناطيس يجذب المعادن'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'صَمْغ',
            sentence: 'يَسْتَخْدِمُ التِّلْمِيذُ الصَّمْغَ لِلَصْقِ الصُّوَرِ فِي الدَّفْتَرِ.',
            imageUrl: 'https://images.unsplash.com/photo-1585336261026-6b2169116816?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة صمغ لاصق للأعمال المدرسية'
          },
          {
            word: 'دِمَاغ',
            sentence: 'الدِّمَاغُ هُوَ المَسْؤُولُ عَنِ التَّفْكِيرِ وَالتَّعَلُّمِ وَالتَّذَكُّرِ.',
            imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة توضيحية لدماغ الإنسان'
          },
          {
            word: 'بَلَاغ',
            sentence: 'وَصَلَ البَلَاغُ الرَّسْمِيُّ إِلَى إِدَارَةِ المَدْرَسَةِ فِي الوَقْتِ المُحَدَّدِ.',
            imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة وثيقة وورقة رسمية'
          }
        ]
      }
    },
    practiceSentences: [
      'غَسَلَ غَسَّانُ يَدَيْهِ جَيِّداً قَبْلَ تَنَاوُلِ الطَّعَامِ.',
      'غَرَسَ المُعَلِّمُ فِي قُلُوبِ طُلَّابِهِ حُبَّ العِلْمِ وَالخَيْرِ.',
      'غَادَرَتِ الطَّيَّارَةُ المَطَارَ فِي غُرُوبِ الشَّمْسِ الجَمِيلِ.'
    ]
  },

  'ف': {
    letter: 'ف',
    name: 'حرف الفاء',
    articulationPoint: 'بطن الشفة السفلى مع أطراف الثنايا العليا.',
    articulationType: 'صوت رخو احتكاكي مهموس مرقق شفوي أسناني.',
    classification: 'شفوي',
    mirrorInstruction: 'توجيه الطالب أمام المرآة ليلاحظ ملامسة أطراف الأسنان العليا لبطن الشفة السفلى ورؤية تدفق تيار الهواء المستمر على ظهر اليد.',
    tongueDepressorInstruction: 'لا يحتاج خافض لسان غالباً؛ ويمكن استخدامه لتنبيه باطن الشفة السفلى باللمس لتحديد نقطة التقاء الأسنان بها.',
    clinicalTips: [
      'من أسهل الأصوات تعلماً بالمحاكاة البصرية المباشرة.',
      'وضع ورقة صغيرة أمام الفم لرؤية تطايرها بتدفق الهواء الاحتكاكي.',
      'تجنب قفل الشفتين معاً كي لا ينقلب الصوت باءً.'
    ],
    shortVowels: { fatha: 'فَ', damma: 'فُ', kasra: 'فِ', sukoon: 'فْ' },
    longVowels: { alif: 'فَا', waw: 'فُو', yaa: 'فِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'فَرَاوِلَة',
            sentence: 'يُحِبُّ الأَطْفَالُ تَنَاوُلَ الفَرَاوِلَةِ الحَمْرَاءِ الحُلْوَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة حبات فراولة طازجة ولذيذة'
          },
          {
            word: 'فِيل',
            sentence: 'الفِيلُ حَيَوَانٌ ضَخْمٌ يَمْتَلِكُ خُرْطُوماً طَوِيلًا وَقَوِيّاً.',
            imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة فيل ضخم في البرية'
          },
          {
            word: 'فَرَاشَة',
            sentence: 'تَطِيرُ الفَرَاشَةُ المُلَوَّنَةُ بَيْنَ الأَزْهَارِ العَطِرَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة فراشة ملونة على زهرة'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'تُفَّاح',
            sentence: 'تَنَاوَلَ التِّلْمِيذُ تُفَّاحَةً حَمْرَاءَ مُفِيدَةً لِلصِّحَّةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة تفاحة حمراء طازجة'
          },
          {
            word: 'ضِفْدَع',
            sentence: 'يَقْفِزُ الضِّفْدَعُ فِي المَاءِ بِخِفَّةٍ وَرَشَاقَةٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ضفدع في بركة ماء'
          },
          {
            word: 'عُصْفُور',
            sentence: 'يَبْنِي العُصْفُورُ عُشَّهُ الصَّغِيرَ مِنْ أَعْوَادِ القَشِّ.',
            imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة عصفور مغرد'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'هَاتِف',
            sentence: 'رَنَّ الهَاتِفُ فِي المَنْزِلِ فَرَدَّ عَلَيْهِ فَارِسٌ.',
            imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة هاتف ذكي حديث'
          },
          {
            word: 'خَرُوف',
            sentence: 'يَرْعَى الخَرُوفُ فِي المَرْعَى الأَخْضَرِ مَعَ القَطِيعِ.',
            imageUrl: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة خروف أبيض في المزرعة'
          },
          {
            word: 'سَيْف',
            sentence: 'السَّيْفُ العَرَبِيُّ رَمْزٌ لِلشَّجَاعَةِ وَالأَصَالَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة سيف عربي أصيل'
          }
        ]
      }
    },
    practiceSentences: [
      'فَتَحَ فَارِسٌ نَافِذَةَ الغُرْفَةِ لِيَدْخُلَ الهَوَاءُ النَّقِيُّ.',
      'فَرِحَ الفَائِزُ بِالجَائِزَةِ الأُولَى فِي مُسَابَقَةِ الإِلْقَاءِ.',
      'فَرَّقَ النَّسِيمُ العَلِيلُ أَوْرَاقَ الشَّجَرِ فِي فَصْلِ الرَّبِيعِ.'
    ]
  },

  'ق': {
    letter: 'ق',
    name: 'حرف القاف',
    articulationPoint: 'أقصى اللسان مع الحنك اللحمي (الرخو) خلف مخرج الكاف.',
    articulationType: 'صوت انفجاري شديد مجهور مفخم مستعلٍ لهوي/طبقي.',
    classification: 'لهوي',
    mirrorInstruction: 'توجيه الطالب أمام المرآة لرؤية انفتاح الفم وارتفاع مؤخرة اللسان لأعلى نقطة بالحنك الرخو دون تحريك مقدمة اللسان.',
    tongueDepressorInstruction: 'يستخدم خافض اللسان للضغط اللطيف على الثلث الأمامي والأوسط من اللسان لأسفل، وإجبار أقصى اللسان على الارتفاع والملامسة.',
    clinicalTips: [
      'أشهر اضطراب هو إبدال القاف كافاً (قلم -> كَلَم) بسبب غياب التفخيم وتراجع المخرج.',
      'استخدام تقنية الدفع الخلفي بالخافض لتعليم التفريق بين القاف والكاف.',
      'ممارسة تدريبات كتم الهواء في مؤخرة الحلق وإطلاقه فجأة بصوت مفخم قوي.'
    ],
    shortVowels: { fatha: 'قَ', damma: 'قُ', kasra: 'قِ', sukoon: 'قْ' },
    longVowels: { alif: 'قَا', waw: 'قُو', yaa: 'قِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'قَلَم',
            sentence: 'يَكْتُبُ الطَّالِبُ وَاجِبَاتِهِ المَدْرَسِيَّةَ بِقَلَمِ الحِبْرِ الأَزْرَقِ.',
            imageUrl: 'https://images.unsplash.com/photo-1585336261026-6b2169116816?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة قلم حبر للكتابة'
          },
          {
            word: 'قِطّ',
            sentence: 'يَمْشِي القِطُّ الأَبْيَضُ بِهُدُوءٍ فِي فِنَاءِ المَنْزِلِ.',
            imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة قط أليف لطيف'
          },
          {
            word: 'قَمَر',
            sentence: 'يُنِيرُ القَمَرُ المُمْتَلِئُ السَّمَاءَ فِي اللَّيْلَةِ الظَّلْمَاءِ.',
            imageUrl: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة قمر بدر مكتمل في السماء'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'بُرْتُقَال',
            sentence: 'يَعْصِرُ الوَلَدُ ثِمَارَ البُرْتُقَالِ الطَّازَجِ كُلَّ صَبَاحٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة برتقال طازج مقطع'
          },
          {
            word: 'صَقْر',
            sentence: 'يَمْتَلِكُ الصَّقْرُ بَصَراً حَادّاً وَيَطِيرُ فِي أَعَالِي الجِبَالِ.',
            imageUrl: 'https://images.unsplash.com/photo-1549608276-5786777e6587?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة صقر جارح وقوي'
          },
          {
            word: 'مِقَصّ',
            sentence: 'يَقُصُّ الطَّالِبُ الوَرَقَ المُقَوَّى بِمِقَصٍّ آمِنٍ لِلأَطْفَالِ.',
            imageUrl: 'https://images.unsplash.com/photo-1503792501406-2c40da09e1e2?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مقص للأعمال اليدوية'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'إِبْرِيق',
            sentence: 'صَبَّتِ الأُمُّ الشَّايَ الدَّافِئَ مِنْ إِبْرِيقٍ خَزَفِيٍّ جَمِيلٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة إبريق شاي كلاسيكي'
          },
          {
            word: 'طَرِيق',
            sentence: 'يَمْشِي السَّائِقُ بِحَذَرٍ فِي الطَّرِيقِ الجَبَلِيِّ المُمْتَدِّ.',
            imageUrl: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة طريق طويل وسط الطبيعة'
          },
          {
            word: 'وَرَق',
            sentence: 'تَتَسَاقَطُ أَوْرَاقُ الشَّجَرِ الصَّفْرَاءِ فِي فَصْلِ الخَرِيفِ.',
            imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة أوراق شجر طبيعية'
          }
        ]
      }
    },
    practiceSentences: [
      'قَرَأَ قَاسِمٌ قِصَّةً مُفِيدَةً عَنِ الصِّدْقِ وَالأَمَانَةِ.',
      'قَدِمَ القَائِدُ إِلَى الطَّلِيعَةِ وَشَجَّعَ الجَمِيعَ عَلَى التَّمَيُّزِ.',
      'قَطَعَ النَّجَّارُ الخَشَبَ بِدِقَّةٍ وَإِتْقَانٍ لِصُنْعِ الطَّاوِلَةِ.'
    ]
  },

  'ك': {
    letter: 'ك',
    name: 'حرف الكاف',
    articulationPoint: 'أقصى اللسان مع الحنك العظمي (الصلب) أسفل مخرج القاف قليلاً.',
    articulationType: 'صوت انفجاري شديد مهموس مرقق طبقي.',
    classification: 'طبقي',
    mirrorInstruction: 'توجيه الطالب أمام المرآة لملاحظة انطباق أقصى اللسان على الحنك الأعلى ثم انفصاله مع خروج دفقة هواء خفيفة (همس) على ظهر اليد.',
    tongueDepressorInstruction: 'يستخدم الخافض لتثبيت مقدمة اللسان لأسفل لمنع إخراج الكاف من الأسنان كتبديلها بالتاء (كتاب -> تباب).',
    clinicalTips: [
      'أشهر اضطراب في الطفولة هو التقديم (Fronting): استبدال الكاف بتاء (كورة -> تورة).',
      'تدريب الطفل وهو مستلقٍ على ظهره أو رأسه للخلف لتساعد الجاذبية رجوع اللسان لمخرج الكاف.',
      'تثبيت طرف اللسان خلف الأسنان السفلية بالخافض لفرض ارتفاع أقصى اللسان.'
    ],
    shortVowels: { fatha: 'كَ', damma: 'كُ', kasra: 'كِ', sukoon: 'كْ' },
    longVowels: { alif: 'كَا', waw: 'كُو', yaa: 'كِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'كِتَاب',
            sentence: 'يَقْرَأُ التِّلْمِيذُ كِتَاباً مُفِيداً فِي المَكْتَبَةِ المَدْرَسِيَّةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة كتاب مفتوح للقراءة'
          },
          {
            word: 'كُرَة',
            sentence: 'يَرْكُلُ اللَّاعِبُ الكُرَةَ بِقُوَّةٍ نَحْوَ المَرْمَى.',
            imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة كرة قدم كلاسيكية'
          },
          {
            word: 'كَلْب',
            sentence: 'الكَلْبُ الوَفِيُّ يَحْرُسُ مَزْرَعَةَ الأَغْنَامِ بِأَمَانَةٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة كلب لطيف وأليف'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'سَمَكَة',
            sentence: 'تَسْبَحُ السَّمَكَةُ الذَّهَبِيَّةُ فِي أَعْمَاقِ البَحْرِ الهَادِئِ.',
            imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة سمكة ملونة تسبح في الماء'
          },
          {
            word: 'مَكْتَب',
            sentence: 'يَجْلِسُ الطَّالِبُ أَمَامَ مَكْتَبِهِ الخَشَبِيِّ لِيَسْتَذْكِرَ دُرُوسَهُ.',
            imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مكتب دراسة منظم'
          },
          {
            word: 'مَرْكَب',
            sentence: 'يُبْحِرُ المَرْكَبُ الصَّغِيرُ فَوْقَ أَمْوَاجِ المَاءِ النَّقِيِّ.',
            imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة قارب ومركب في البحر'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'شُبَّاك',
            sentence: 'فَتَحَ كَرِيمٌ الشُّبَّاك لِيَتَنَفَّسَ هَوَاءَ الصَّبَاحِ العَلِيلَ.',
            imageUrl: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة نافذة وشباك مشمس'
          },
          {
            word: 'دِيك',
            sentence: 'يَصِيحُ الدِّيكُ بِصَوْتٍ عَالٍ مَعَ شُرُوقِ الشَّمْسِ كُلَّ يَوْمٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ديك ريفي ملون'
          },
          {
            word: 'بَنْك',
            sentence: 'يُودِعُ المُواطِنُ أَمْوَالَهُ فِي البَنْكِ بِأَمَانٍ وَاطْمِئْنَانٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مبنى بنك ومعاملات مالية'
          }
        ]
      }
    },
    practiceSentences: [
      'كَتَبَ كَمَالٌ كَلِمَاتٍ جَمِيلَةً فِي دَفْتَرِ الخَطِّ العَرَبِيِّ.',
      'شَكَرَ المُعَلِّمُ الطَّالِبَ عَلَى كَرَمِ أَخْلَاقِهِ وَتَفَوُّقِهِ.',
      'أَكَلَ الأَوْلَادُ كَعْكَةً لَذِيذَةً فِي حَفْلَةِ النَّجَاحِ.'
    ]
  },

  'ل': {
    letter: 'ل',
    name: 'حرف اللام',
    articulationPoint: 'أدنى حافة اللسان إلى منتهاها مع ما يحاذيها من لثة الأسنان العليا.',
    articulationType: 'صوت متوسط رخو بين الشدة والرخاوة مجهور مرقق (ومفخم في لفظ الجلالة) لثوي جانبي.',
    classification: 'لثوي',
    mirrorInstruction: 'توجيه الطالب أمام المرآة لرؤية صعود طرف اللسان العريض وملامسته للثة الثنايا العليا وتدفق الصوت من الجانبين.',
    tongueDepressorInstruction: 'يستخدم الخافض لتنبيه الحافة الأمامية للسان واللثة العليا باللمس، والتأكد من عدم رجوع اللسان للخلف.',
    clinicalTips: [
      'الاضطراب الشائع هو استبدال اللام بياء (ليمون -> ييمون) أو واو.',
      'تدريب الطالب على نطق مقطع (لا - لا - لا) مع رؤية حركة صعود وهبوط اللسان أمام المرآة.',
      'إبقاء الفم مفتوحاً بشكل مريح لعدم إشراك الشفتين في نطق اللام.'
    ],
    shortVowels: { fatha: 'لَ', damma: 'لُ', kasra: 'لِ', sukoon: 'لْ' },
    longVowels: { alif: 'لَا', waw: 'لُو', yaa: 'لِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'لَيْمُون',
            sentence: 'يَعْصِرُ الوَلَدُ حَبَّةَ لَيْمُونٍ حَامِضَةٍ فِي كَأْسِ المَاءِ.',
            imageUrl: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ليمون أصفر طازج'
          },
          {
            word: 'لُعْبَة',
            sentence: 'يَفْرَحُ الطِّفْلُ الصَّغِيرُ عِنْدَمَا يَحْصُلُ عَلَى لُعْبَةٍ جَدِيدَةٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة لعبة أطفال ملونة'
          },
          {
            word: 'لِسَان',
            sentence: 'اللِّسَانُ عُضْوٌ مُهِمٌّ لِلنُّطْقِ الفَصِيحِ وَتَذَوُّقِ الطَّعَامِ.',
            imageUrl: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة طفل يبتسم ابتسامة جميلة'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'قَلَم',
            sentence: 'يَكْتُبُ التِّلْمِيذُ الخَطَّ العَرَبِيَّ الجَمِيلَ بِقَلَمِهِ.',
            imageUrl: 'https://images.unsplash.com/photo-1585336261026-6b2169116816?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة قلم كتابة أنيق'
          },
          {
            word: 'حَلِيب',
            sentence: 'يَشْرَبُ الطَّالِبُ كَأْسَ حَلِيبٍ دَافِئٍ كُلَّ صَبَاحٍ لِصِحَّةِ عِظَامِهِ.',
            imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة كأس حليب أبيض طازج'
          },
          {
            word: 'عَلَم',
            sentence: 'يُرَفْرِفُ عَلَمُ المَمْلَكَةِ العَرَبِيَّةِ السَّعُودِيَّةِ شَامِخاً فِي السَّمَاءِ.',
            imageUrl: 'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة علم يرفرف بفخر'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'جَمَل',
            sentence: 'يَسِيرُ الجَمَلُ الصَّبُورُ فِي الصَّحْرَاءِ الشَّاسِعَةِ دُونَ كَلَلٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة جمل عربي أصيل في الصحراء'
          },
          {
            word: 'عَسَل',
            sentence: 'العَسَلُ الطَّبِيعِيُّ فِيهِ شِفَاءٌ وَطَعْمُهُ حُلْوٌ وَلَذِيذٌ.',
            imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة عسل طبيعي نقي في وعاء'
          },
          {
            word: 'بَصَل',
            sentence: 'تَقْطَعُ الأُمُّ البَصَلَ لإِعْدَادِ وَجْبَةِ الغَدَاءِ الشَّهِيَّةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة بصل طازج في المطبخ'
          }
        ]
      }
    },
    practiceSentences: [
      'لَعِبَ لُؤَيٌّ بِالكُرَةِ مَعَ أَصْدِقَائِهِ فِي المَلْعَبِ.',
      'لَبِسَ الطَّالِبُ زِيَّ المَدْرَسَةِ النَّظِيفَ وَالمُرَتَّبَ.',
      'أَكَلَ الأَطْفَالُ طَعَاماً صِحِّيّاً لَذِيذاً أَعَدَّتْهُ أُمُّهُمْ.'
    ]
  },

  'م': {
    letter: 'م',
    name: 'حرف الميم',
    articulationPoint: 'انطباق الشفتين معاً مع خروج غنة رنانة من الخيشوم (التجويف الأنفي).',
    articulationType: 'صوت متوسط رخو بين الشدة والرخاوة مجهور مرقق أغن شفوي خيشومي.',
    classification: 'شفوي',
    mirrorInstruction: 'توجيه الطالب أمام المرآة لرؤية انطباق الشفتين الكامل اللطيف، ووضع إصبعه على جانب الأنف للشعور بالاهتزاز الأنفي (الغنة).',
    tongueDepressorInstruction: 'لا يستدعي خافض لسان؛ اللسان يكون مسترخياً في قاع الفم.',
    clinicalTips: [
      'صوت الميم من أسهل الأصوات وأبكرها ظهوراً في التطور النطقي.',
      'في حالات الخنف المغلق يتحول الميم إلى باء (ماما -> بابا)، ويجب فحص مجرى الأنف.',
      'التدريب على الدندنة وإصدار صوت (ممممم) لتقوية الرنين الخيشومي السليم.'
    ],
    shortVowels: { fatha: 'مَ', damma: 'مُ', kasra: 'مِ', sukoon: 'مْ' },
    longVowels: { alif: 'مَا', waw: 'مُو', yaa: 'مِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'مَوْز',
            sentence: 'يَأْكُلُ الطِّفْلُ مَوْزاً أَصْفَرَ حُلْواً لِيَمُدَّهُ بِالطَّاقَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة موز أصفر طازج'
          },
          {
            word: 'مَسْجِد',
            sentence: 'يَذْهَبُ المُسْلِمُونَ إِلَى المَسْجِدِ لِأَدَاءِ الصَّلَوَاتِ فِي وَقْتِهَا.',
            imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مسجد ذي مئذنة وقبة جميلة'
          },
          {
            word: 'مِفْتَاح',
            sentence: 'يَفْتَحُ الرَّجُلُ بَابَ البَيْتِ بِمِفْتَاحٍ مَعْدِنِيٍّ صَغِيرٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مفاتيح معدنية'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'قَمَر',
            sentence: 'يَلْمَعُ القَمَرُ المُنِيرُ فِي سَمَاءِ اللَّيْلِ الهَادِئَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة قمر مضيء في السماء'
          },
          {
            word: 'شَمْس',
            sentence: 'تُشْرِقُ الشَّمْسُ الذَّهَبِيَّةُ كُلَّ صَبَاحٍ فَتَمْلَأُ الكَوْنَ دِفْئاً.',
            imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة شمس ساطعة في السماء'
          },
          {
            word: 'سَمَك',
            sentence: 'يَسْبَحُ السَّمَكُ المُلَوَّنُ بَيْنَ الشِّعَابِ المَرْجَانِيَّةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة أسماك ملونة في البحر'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'قَلَم',
            sentence: 'يَرْسُمُ الفَنَّانُ لَوْحَتَهُ بِقَلَمِ الرَّصَاصِ بِدِقَّةٍ وَإِبْدَاعٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1585336261026-6b2169116816?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة قلم رصاص وأقلام تلوين'
          },
          {
            word: 'لَحْم',
            sentence: 'أَعَدَّتِ الأُمُّ لَحْماً مَشْوِيّاً شَهِيّاً فِي وَجْبَةِ العَشَاءِ.',
            imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة وجبة طعام صحية ولذيذة'
          },
          {
            word: 'نَجْم',
            sentence: 'يَلْمَعُ نَجْمٌ بَرَّاقٌ فِي السَّمَاءِ الصَّافِيَةِ لَيْلًا.',
            imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة نجوم ساطعة في السماء ليلاً'
          }
        ]
      }
    },
    practiceSentences: [
      'مَشَى مَاجِدٌ مَعَ أُمِّهِ إِلَى حَدِيقَةِ الأَزْهَارِ الجَمِيلَةِ.',
      'مَسَحَ الطَّالِبُ السَّبُّورَةَ بِعِنَايَةٍ بَعْدَ انْتِهَاءِ الحِصَّةِ.',
      'تَعَلَّمَ التَّلَامِيذُ مَعْلُومَاتٍ مُفِيدَةً فِي دَرْسِ العُلُومِ اليَوْمَ.'
    ]
  },

  'ن': {
    letter: 'ن',
    name: 'حرف النون',
    articulationPoint: 'طرف اللسان مع لثة الثنايا العليا مع غنة تخرج من الخيشوم.',
    articulationType: 'صوت متوسط رخو بين الشدة والرخاوة مجهور مرقق أغن لثوي خيشومي.',
    classification: 'لثوي',
    mirrorInstruction: 'توجيه الطالب أمام المرآة لملاحظة ملامسة طرف اللسان للثة العليا، مع وضع الإصبع على جانب الأنف للشعور بالاهتزاز الخيشومي الصادر.',
    tongueDepressorInstruction: 'يستخدم الخافض لتنبيه نقطة التقاء طرف اللسان باللثة العليا ومنع تسطح اللسان.',
    clinicalTips: [
      'التفريق بين النون والدال (النون صوت أغن خيشومي بينما الدال انفجاري فموي).',
      'في حالة استبدال النون بدال (نار -> دار)، يتم فحص انسداد الأنف أو تدريب الطفل على فتح مجرى الخيشوم.',
      'استخدام تدريبات الغنة المستمرة (ننننن) لتقوية الرنين الأنفي الصحيح.'
    ],
    shortVowels: { fatha: 'نَ', damma: 'نُ', kasra: 'نِ', sukoon: 'نْ' },
    longVowels: { alif: 'نَا', waw: 'نُو', yaa: 'نِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'نَحْلَة',
            sentence: 'تَمْتَصُّ النَّحْلَةُ النَّشِيطَةُ رَحِيقَ الأَزْهَارِ لِتَصْنَعَ العَسَلَ.',
            imageUrl: 'https://images.unsplash.com/photo-1558907357-195c6c06a380?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة نحلة على زهرة تمتص الرحيق'
          },
          {
            word: 'نَمِر',
            sentence: 'النَّمِرُ حَيَوَانٌ سَرِيعٌ وَشُجَاعٌ يَعِيشُ فِي الغَابَاتِ.',
            imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة نمر حقيقي قوي في الطبيعة'
          },
          {
            word: 'نَجْم',
            sentence: 'يُضِيءُ النَّجْمُ السَّاطِعُ سَمَاءَ الكَوْنِ فِي اللَّيْلِ.',
            imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة نجوم لامعة في الفضاء'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'عِنَب',
            sentence: 'يَقْطِفُ المُزَارِعُ عَنَاقِيدَ عِنَبٍ حُلْوَةٍ وَطَازَجَةٍ مِنَ الكَرْمِ.',
            imageUrl: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة عنقود عنب طازج'
          },
          {
            word: 'أَرْنَب',
            sentence: 'يَأْكُلُ الأَرْنَبُ الأَبْيَضُ الجَزَرَ الطَّازَجَ فِي المَزْرَعَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة أرنب أبيض لطيف'
          },
          {
            word: 'مَنْزِل',
            sentence: 'يَعِيشُ سَعِيدٌ مَعَ أُسْرَتِهِ فِي مَنْزِلٍ جَمِيلٍ وَمُرِيحٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة منزل جميل وهادئ'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'عَيْن',
            sentence: 'العَيْنُ تُبْصِرُ الأَشْيَاءَ الجَمِيلَةَ مِنْ حَوْلِنَا بِوُضُوحٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة عين إنسان حقيقية'
          },
          {
            word: 'حِصَان',
            sentence: 'يَرْكُضُ الحِصَانُ الأَصِيلُ بِسُرْعَةٍ فِي المَيْدَانِ الوَاسِعِ.',
            imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة حصان عربي أصيل'
          },
          {
            word: 'سَفِينَة (سَفِين)',
            sentence: 'تُبْحِرُ السَّفِينَةُ العِمْلَاقَةُ فِي عَرْضِ البَحْرِ الهَادِئِ.',
            imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة سفينة تبحر في البحر'
          }
        ]
      }
    },
    practiceSentences: [
      'نَامَ نَاصِرٌ مُبَكِّراً لِيَسْتَيْقِظَ بِنَشَاطٍ لِمَدْرَسَتِهِ.',
      'نَظَّفَ الطُّلَّابُ فِنَاءَ المَدْرَسَةِ بِتَعَاوُنٍ وَمَحَبَّةٍ.',
      'نَجَحَ نَدِيمٌ فِي الاخْتِبَارِ بِتَفَوُّقٍ وَنَالَ شَهَادَةَ تَقْدِيرٍ.'
    ]
  },

  'هـ': {
    letter: 'هـ',
    name: 'حرف الهاء',
    articulationPoint: 'أقصى الحلق من الحنجرة مع انفراج الوترين الصوتيين وتدفق هواء الزفير بدون اهتزاز شديد.',
    articulationType: 'صوت رخو احتكاكي مهموس مرقق خفي حنجري.',
    classification: 'حلقي',
    mirrorInstruction: 'توجيه الطالب أمام المرآة لإصدار صوت الزفير ورؤية بخار الهواء يتكاثف على سطح المرآة (التنفس الدافئ).',
    tongueDepressorInstruction: 'يستخدم الخافض لضمان بقاء اللسان مسترخياً ومستقراً في قاع الفم وعدم رفعه لحجب الهواء.',
    clinicalTips: [
      'صوت الهاء صوت خفي يحتاج إلى تيار هواء زفيري منتظم وكافٍ.',
      'التدريب بمحاكاة التنهد بعد التعب أو الضحك (ها ها ها).',
      'وضع كف اليد أمام الفم للشعور بالهواء الساخن الخارج مع الهاء.'
    ],
    shortVowels: { fatha: 'هَـ', damma: 'هُـ', kasra: 'هِـ', sukoon: 'هْ' },
    longVowels: { alif: 'هَا', waw: 'هُو', yaa: 'هِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'هَدِيَّة',
            sentence: 'قَدَّمَ هِشَامٌ هَدِيَّةً رَائِعَةً لِصَدِيقِهِ فِي يَوْمِ مِيلَادِهِ.',
            imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة هدية مغلفة بشريط ملون'
          },
          {
            word: 'هَرَم',
            sentence: 'يَقِفُ الهَرَمُ الحَجَرِيُّ الضَّخْمُ شَامِخاً مُنْذُ آلافِ السِّنِينَ.',
            imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة هرم أثري في الصحراء'
          },
          {
            word: 'هِتَاف',
            sentence: 'عَلَا هِتَافُ الجُمْهُورِ المُشَجِّعِ لِفَرِيقِ المَدْرَسَةِ فِي المُبَارَاةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة تشجيع وهتاف رياضي في الملعب'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'فَهْد',
            sentence: 'الفَهْدُ أَسْرَعُ حَيَوَانٍ بَرِّيٍّ عَلَى وَجْهِ الأَرْضِ.',
            imageUrl: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة فهد صياد سريع في البرية'
          },
          {
            word: 'زَهْرَة',
            sentence: 'تَفُوحُ الزَّهْرَةُ الحَمْرَاءُ بِرَائِحَةٍ عَطِرَةٍ زَكِيَّةٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة زهرة متفتحة جميلة'
          },
          {
            word: 'نَهْر',
            sentence: 'تَجْرِي مِيَاهُ النَّهْرِ العَذْبَةِ بَيْنَ البَسَاتِينِ الخَضْرَاءِ.',
            imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة نهر طبيعي يجري بين الجبال'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'وَجْه',
            sentence: 'يَبْتَسِمُ الطِّفْلُ الصَّغِيرُ فَيَسْتَنِيرُ وَجْهُهُ بِالفَرَحِ.',
            imageUrl: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة وجه طفل مبتسم وسعيد'
          },
          {
            word: 'مِيَاه',
            sentence: 'المِيَاهُ النَّقِيَّةُ عُنْصُرٌ أَسَاسِيٌّ لِحَيَاةِ كُلِّ كَائِنٍ حَيٍّ.',
            imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مياه نقية متدفقة'
          },
          {
            word: 'فَوَاكِه',
            sentence: 'تَنَاوَلَ التَّلَامِيذُ فَاكِهَةً طَازَجَةً فِي حِصَّةِ النَّشَاطِ.',
            imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة سلة فواكه طازجة ومتنوعة'
          }
        ]
      }
    },
    practiceSentences: [
      'هَبَّ هَوَاءٌ عَلِيلٌ أَنْعَشَ الحُضُورَ فِي حَدِيقَةِ المَنْزِلِ.',
      'هَتَفَ هَاشِمٌ بِصَوْتٍ عَالٍ مُشَجِّعاً أَخَاهُ فِي السِّبَاقِ.',
      'سَاهَمَ أَهْلُ الحَيِّ فِي تَنْظِيفِ الحَدِيقَةِ العَامَّةِ بِنَشَاطٍ.'
    ]
  },

  'و': {
    letter: 'و',
    name: 'حرف الواو',
    articulationPoint: 'استدارة الشفتين وضمهما إلى الأمام مع ارتفاع أقصى اللسان دون انطباق الشفتين.',
    articulationType: 'صوت رخو مجهور مرقق لين شفوي شبه صامت.',
    classification: 'شفوي',
    mirrorInstruction: 'توجيه الطالب أمام المرآة لرؤية الاستدارة الدائرية للشفتين للأمام كفوهة البوق مع ترك فتحة صغيرة لمرور الهواء.',
    tongueDepressorInstruction: 'لا يحتاج خافض لسان؛ التركيز على الحركة العضلية الدائرية للشفاه.',
    clinicalTips: [
      'تدريب الطالب على النفخ لإطفاء شمعة أو صنع فقاعات صابون لتقوية استدارة الشفاه.',
      'التفريق بين الواو الساكنة المسبوقة بفتح (لينة) والواو المدية.',
      'التأكد من عدم فتح الشفتين بشكل مسطح عند النطق.'
    ],
    shortVowels: { fatha: 'وَ', damma: 'وُ', kasra: 'وِ', sukoon: 'وْ' },
    longVowels: { alif: 'وَا', waw: 'وُو', yaa: 'وِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'وَرْدَة',
            sentence: 'تَفُوحُ الوَرْدَةُ الجَمِيلَةُ فِي البُسْتَانِ بِرَائِحَةٍ عَطِرَةٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة وردة حمراء جورية'
          },
          {
            word: 'وِسَادَة',
            sentence: 'يَنَامُ الطِّفْلُ عَلَى وِسَادَةٍ قُطْنِيَّةٍ نَاعِمَةٍ وَمُرِيحَةٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة وسادة سرير مريحة'
          },
          {
            word: 'وَقْت',
            sentence: 'تُشِيرُ السَّاعَةُ إِلَى وَقْتِ بَدْءِ الحِصَّةِ الأُولَى.',
            imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ساعة تدل على الوقت'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'مَوْز',
            sentence: 'يُقَشِّرُ الوَلَدُ مَوْزَةً طَازَجَةً لِيَتَنَاوَلَهَا مَعَ الفُطُورِ.',
            imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة موز أصفر'
          },
          {
            word: 'ضَوْء',
            sentence: 'يَمْلَأُ ضَوْءُ الشَّمْسِ الغُرْفَةَ بِالنُّورِ وَالحَيَوِيَّةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة أشعة الشمس الذهبية'
          },
          {
            word: 'ثَوْب',
            sentence: 'يَلْبَسُ الرَّجُلُ ثَوْباً أَبْيَضَ نَاصِعاً فِي صَلَاةِ الجُمُعَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ثوب عربي أبيض'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'دَلْو',
            sentence: 'يَمْلَأُ المُزَارِعُ الدَّلْوَ بِالمَاءِ لِيَسْقِيَ أَشْجَارَ الحَدِيقَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة دلو ماء في المزرعة'
          },
          {
            word: 'جِرْو',
            sentence: 'يَلْعَبُ الجِرْوُ الصَّغِيرُ مَعَ الأَطْفَالِ فِي الحَدِيقَةِ بِمَرَحٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة جرو كلب صغير لطيف'
          },
          {
            word: 'غَزْو (صَحْو)',
            sentence: 'الجَوُّ اليَوْمَ صَحْوٌ وَالشَّمْسُ مُشْرِقَةٌ وَالسَّمَاءُ صَافِيَةٌ.',
            imageUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة سماء صافية وجو صحو'
          }
        ]
      }
    },
    practiceSentences: [
      'وَصَلَ وَلِيدٌ إِلَى المَدْرَسَةِ فِي الوَقْتِ المُحَدَّدِ تَمَاماً.',
      'وَضَعَتْ وَفَاءُ الوَرْدَةَ الحَمْرَاءَ فِي زُهْرِيَّةٍ زُجَاجِيَّةٍ.',
      'تَوَاصَلَ المُعَلِّمُ مَعَ أَوْلِيَاءِ الأُمُورِ لِمُتَابَعَةِ تَطَوُّرِ الطُّلَّابِ.'
    ]
  },

  'ي': {
    letter: 'ي',
    name: 'حرف الياء',
    articulationPoint: 'وسط اللسان مع ما يحاذيه من الحنك الأعلى الصلب دون ملامسة كاملة.',
    articulationType: 'صوت رخو مجهور مرقق لين شبه صامت غاري.',
    classification: 'غاري',
    mirrorInstruction: 'توجيه الطالب أمام المرآة لرؤية ارتفاع وسط اللسان نحو سقف الحلق مع ابتسامة خفيفة تباعد بين زاويتي الشفتين.',
    tongueDepressorInstruction: 'يستخدم الخافض لتنبيه وسط اللسان وملاحظة ارتفاعه دون التواء طرف اللسان للخلف.',
    clinicalTips: [
      'التمييز بين الياء واللام، وعدم استبدال الراء بالياء في حالات اللدغة الرائية.',
      'التدريب على حركات الابتسام العريض لتسهيل انسياب الصوت الصامت.',
      'التفريق بين الياء اللينة والياء المدية المشبعة.'
    ],
    shortVowels: { fatha: 'يَ', damma: 'يُ', kasra: 'يِ', sukoon: 'يْ' },
    longVowels: { alif: 'يَا', waw: 'يُو', yaa: 'يِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'يَد',
            sentence: 'يَغْسِلُ الطِّفْلُ يَدَيْهِ جَيِّداً بِالمَاءِ وَالصَّابُونِ قَبْلَ الأَكْلِ.',
            imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة يد إنسان نظيفة ومرفوعة'
          },
          {
            word: 'يَمَامَة',
            sentence: 'تَحُطُّ اليَمَامَةُ الوَدِيعَةُ فَوْقَ سُورِ المَنْزِلِ بِهُدُوءٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة حمامة ويمامة بيضاء'
          },
          {
            word: 'يَاقُوت',
            sentence: 'اليَاقُوتُ الأَحْمَرُ حَجَرٌ كَرِيمٌ نَادِرٌ وَشَدِيدُ الجَمَالِ.',
            imageUrl: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة حجر ياقوت كريم لامع'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'بَيْت',
            sentence: 'يَجْتَمِعُ أَفْرَادُ الأُسْرَةِ فِي البَيْتِ الدَّافِئِ كُلَّ مَسَاءٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة بيت جميل ومريح'
          },
          {
            word: 'فِيل',
            sentence: 'يَمْشِي الفِيلُ الضَّخْمُ مَعَ صِغَارِهِ فِي السَّهْلِ الأَخْضَرِ.',
            imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة فيل حقيقي في الطبيعة'
          },
          {
            word: 'طَيَّارَة',
            sentence: 'تُحَلِّقُ الطَّيَّارَةُ النَّفَّاثَةُ عَالِياً فَوْقَ السَّحَابِ.',
            imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة طائرة تطير في الجو'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'شَاي',
            sentence: 'شَرِبَ الضَّيْفُ كَأْسَ شَايٍ سَاخِنٍ بِنَكْهَةِ النَّعْنَاعِ.',
            imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة كأس شاي ساخن بالنعناع'
          },
          {
            word: 'كُرْسِيّ',
            sentence: 'يَجْلِسُ الطَّالِبُ عَلَى كُرْسِيٍّ مُرِيحٍ أَمَامَ شَاشَةِ الحَاسُوبِ.',
            imageUrl: 'https://images.unsplash.com/photo-1580481077195-c22ae2499d3e?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة كرسي دراسة ومكتب'
          },
          {
            word: 'جَدْي',
            sentence: 'يَقْفِزُ الجَدْيُ الصَّغِيرُ فِي المَزْرَعَةِ مَعَ أُمِّهِ المَاعِزِ.',
            imageUrl: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة جدي ماعز صغير ولطيف'
          }
        ]
      }
    },
    practiceSentences: [
      'يَرْسُمُ يَاسِرٌ لَوْحَةً فَائِقَةَ الجَمَالِ عَنْ جِبَالِ عَسِيرَ الشَّامِخَةِ.',
      'يَحْرِصُ يُوسُفُ عَلَى مُسَاعَدَةِ كِبَارِ السِّنِّ فِي حَيِّهِ.',
      'يُثْمِرُ التَّعَاوُنُ النَّاجِحُ بَيْنَ الأَهْلِ وَالمَدْرَسَةِ أَعْظَمَ النَّتَائِجِ.'
    ]
  }
};

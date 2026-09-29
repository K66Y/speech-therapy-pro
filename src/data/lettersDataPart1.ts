import { ArabicLetterKey, LetterInfo } from '../types/speechTherapy';

export const LETTERS_PART_1: Record<string, LetterInfo> = {
  'أ': {
    letter: 'أ',
    name: 'حرف الهمزة (الألف)',
    articulationPoint: 'أقصى الحلق مما يلي الصدر، مع انطباق الوترين الصوتين ثم انفراجهما فجأة.',
    articulationType: 'صوت انفجاري حنجري مجهور/مهموس شديد غير رنان مرقق.',
    classification: 'حلقي',
    mirrorInstruction: 'توجيه الطالب أمام المرآة لملاحظة انفتاح الفم الطبيعي واسترخاء اللسان في قاع الفم وعدم توتر عضلات الوجه، مع وضع يده على الحنجرة للشعور بالحبسة الهوائية.',
    tongueDepressorInstruction: 'يستخدم خافض اللسان للضغط اللطيف على منتصف اللسان إذا كان الطالب يرفعه ويحجب مجرى الهواء، لضمان استقرار اللسان في قاع الفم.',
    clinicalTips: [
      'التدريب على السعال الخفيف لإدراك آلية حبس الهواء في الحنجرة.',
      'البدء بالصوت ساكناً مسبوقاً بحركة مثل (أَ - إِ - أُ).',
      'الانتباه لعدم تحويل الهمزة إلى هاء أو إمالتها.'
    ],
    shortVowels: { fatha: 'أَ', damma: 'أُ', kasra: 'إِ', sukoon: 'أْ' },
    longVowels: { alif: 'آ (أَا)', waw: 'أُو', yaa: 'إِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'أَرْنَب',
            sentence: 'يَقْفِزُ الأَرْنَبُ فِي المَزْرَعَةِ بِسُرْعَةٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة أرنب حقيقي أبيض في الطبيعة'
          },
          {
            word: 'أَسَد',
            sentence: 'الأَسَدُ مَلِكُ الغَابَةِ شُجَاعٌ وَقَوِيٌّ.',
            imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة أسد قوي حقيقي في البرية'
          },
          {
            word: 'أُمِّي',
            sentence: 'أُمِّي هِيَ أَغْلَى مَا فِي حَيَاتِي.',
            imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة أم حنونة مع طفلها'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'فَأْر',
            sentence: 'يَبْحَثُ الفَأْرُ عَنْ قِطْعَةِ جُبْنٍ فِي الحَقْلِ.',
            imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة فأر حقيقي صغير في الطبيعة'
          },
          {
            word: 'كَأْس',
            sentence: 'شَرِبَ الطَّالِبُ كَأْسَ حَلِيبٍ طَازَجٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة كأس زجاجي صافٍ'
          },
          {
            word: 'رَأْس',
            sentence: 'يَحْمِي الخُوذَةُ رَأْسَ الرَّاكِبِ.',
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة رأس إنسان حقيقي'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'مَاء',
            sentence: 'شَرِبَ الطَّالِبُ كَأْسَ مَاءٍ بَارِدٍ وَنَقِيٍّ.',
            imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة كأس ماء نقي وصافٍ'
          },
          {
            word: 'سَمَاء',
            sentence: 'السَّمَاءُ زَرْقَاءُ صَافِيَةٌ بِلَا غُيُومٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة سماء زرقاء مشرقة'
          },
          {
            word: 'دَوَاء',
            sentence: 'أَخَذَ المَرِيضُ الدَّوَاءَ لِيَتَعَافَى.',
            imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة دواء علاجي منظم'
          }
        ]
      }
    },
    practiceSentences: [
      'أَكَلَ أَحْمَدُ التُّفَّاحَةَ فِي الصَّبَاحِ.',
      'قَرَأَ أَنَسٌ كِتَابَ القِرَاءَةِ بِإِتْقَانٍ.',
      'أَقْبَلَ أَمِيرٌ وَمَعَهُ أَلْعَابٌ جَمِيلَةٌ.'
    ]
  },

  'ب': {
    letter: 'ب',
    name: 'حرف الباء',
    articulationPoint: 'انطباق الشفتين معاً انطباقاً تاماً مع حبس الهواء ثم انفراجهما مصحوباً باهتزاز الأوتار الصامتة والصوتية.',
    articulationType: 'صوت انفجاري شفوي مجهور شديد مرقق مقلقل عند السكون.',
    classification: 'شفوي',
    mirrorInstruction: 'يجلس الطالب أمام المرآة ليشاهد إطباق الشفتين الكامل عند حبس الهواء ثم افتراقهما المفاجئ لإطلاق الصوت (ب)، والمقارنة بين شفتي أخصائي تدريبات نطق وشفتيه.',
    tongueDepressorInstruction: 'يمكن الاستعانة بخافض اللسان للتحقق من عدم تدخل اللسان بين الأسنان أو بين الشفتين أثناء النطق، والتأكد من بقاء اللسان مسترخياً في موضعه.',
    clinicalTips: [
      'وضع ورقة صغيرة أمام الفم لمشاهدة حركتها عند انفراج الشفتين في صوت الباء.',
      'وضع يد الطالب على حنجرة أخصائي تدريبات نطق للشعور بالاهتزاز الصوتي (الجهر).',
      'التدريب على نطق (أَبْ - إِبْ - أُبْ).'
    ],
    shortVowels: { fatha: 'بَ', damma: 'بُ', kasra: 'بِ', sukoon: 'بْ' },
    longVowels: { alif: 'بَا', waw: 'بُو', yaa: 'بِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'بُرْتُقَال',
            sentence: 'البُرْتُقَالُ فَاكِهَةٌ لَذِيذَةٌ وَمُفِيدَةٌ لِلصِّحَّةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة برتقال حقيقي طازج ومقطع'
          },
          {
            word: 'بَاب',
            sentence: 'فَتَحَ بَاسِمٌ بَابَ الفَصْلِ بِهُدُوءٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة باب خشبي أنيق'
          },
          {
            word: 'بَقَرَة',
            sentence: 'تَرْعَى البَقَرَةُ فِي الحَقْلِ الأَخْضَرِ.',
            imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة بقرة في المرعى الطبيعي'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'حَبْل',
            sentence: 'رَبَطَ الفَلَّاحُ الحِمَارَ بِحَبْلٍ مَتِينٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة حبل سميك ملفوف طبيعي'
          },
          {
            word: 'خُبْز',
            sentence: 'اشْتَرَى أَبِي خُبْزًا طَازَجًا مِنَ المَخْبَزِ.',
            imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة رغيف خبز ساخن ومحمص'
          },
          {
            word: 'جَبَل',
            sentence: 'صَعِدَ الرَّجُلُ قِمَّةَ الجَبَلِ العَالِي.',
            imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة جبل شامخ في الطبيعة'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'كَلْب',
            sentence: 'يَحْرُسُ الكَلْبُ البَيْتَ بِأَمَانَةٍ وَإِخْلَاصٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة كلب أليف حقيقي'
          },
          {
            word: 'عِنَب',
            sentence: 'قَطَفْنَا عِنَبًا حُلْوَ المَذَاقِ مِنَ الشَّجَرَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة عنقود عنب طازج'
          },
          {
            word: 'أَرْنَب',
            sentence: 'لَحِقَ الطِّفْلُ بِأَرْنَبٍ صَغِيرٍ سَرِيعٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة أرنب صغير'
          }
        ]
      }
    },
    practiceSentences: [
      'بَنَى بَاسِمٌ بَيْتًا جَدِيدًا قُرْبَ البُسْتَانِ.',
      'لَعِبَ بَدْرٌ بِالكُرَةِ فِي البَاحَةِ.',
      'بَاعَ بَشِيرٌ بَيْضًا وَبَصَلًا وَبُرْتُقَالًا.'
    ]
  },

  'ت': {
    letter: 'ت',
    name: 'حرف التاء',
    articulationPoint: 'التصاق طرف اللسان بأصول الثنايا العليا (لثة الأسنان العلوية) مع حبس الهواء ثم إطلاقه مصحوباً بهمس هواء خفيف.',
    articulationType: 'صوت انفجاري لثوي أسناني مهموس شديد مرقق.',
    classification: 'أسناني',
    mirrorInstruction: 'يراقب الطالب عبر المرآة صعود طرف لسانه وارتطامه بأصول الأسنان العلوية خلف اللثة دون خروج طرف اللسان بين الأسنان إطلاقاً لتجنب نطقها ثاء.',
    tongueDepressorInstruction: 'يوضع خافض اللسان مانعاً لخروج طرف اللسان بين الأسنان إذا كان الطالب ينطق التاء كصوت الثاء (لدغة لسانية)، ودفع طرف اللسان للأعلى جهة اللثة.',
    clinicalTips: [
      'التدريب على حبس الهواء باللسان ثم تحريره بهمس: (تْ.. تْ.. تْ).',
      'التمييز بين التاء والطاء (الطاء مفخمة ومستعلية والتاء مرققة ومنفتحة).',
      'استخدام شريط ورقي لملاحظة اندفاع الهواء الخفيف عند النطق.'
    ],
    shortVowels: { fatha: 'تَ', damma: 'تُ', kasra: 'تِ', sukoon: 'تْ' },
    longVowels: { alif: 'تَا', waw: 'تُو', yaa: 'تِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'تُفَّاح',
            sentence: 'التُّفَّاحُ الأَحْمَرُ حُلْوُ المَذَاقِ وَشَهِيٌّ.',
            imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة تفاح أحمر طازج'
          },
          {
            word: 'تَمْر',
            sentence: 'التَّمْرُ غِذَاءٌ صِحِّيٌّ وَمُبَارَكٌ.',
            imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة تمر سكري طازج'
          },
          {
            word: 'تِمْسَاح',
            sentence: 'التِّمْسَاحُ يَعِيشُ قُرْبَ ضِفَافِ الأَنْهَارِ.',
            imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة تمساح حقيقي'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'كِتَاب',
            sentence: 'قَرَأَ الطَّالِبُ كِتَابَ القِرَاءَةِ المَدْرَسِيَّ.',
            imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة كتاب مفتوح وقراءة حقيقية'
          },
          {
            word: 'دَفْتَر',
            sentence: 'كَتَبَ عُمَرُ وَاجِبَهُ فِي الدَّفْتَرِ المُرَتَّبِ.',
            imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة دفتر كتابة مدرسي'
          },
          {
            word: 'مِفْتَاح',
            sentence: 'فَتَحَ الحَارِسُ البَابَ بِالمِفْتَاحِ.',
            imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مفتاح معدني حقيقي'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'بَيْت',
            sentence: 'عَادَ الوَلَدُ إِلَى بَيْتِهِ سَعِيدًا بَعْدَ المَدْرَسَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة بيت حقيقي جميل'
          },
          {
            word: 'تُوت',
            sentence: 'أَكَلْنَا تُوتًا لَذِيذًا مِنَ البُسْتَانِ.',
            imageUrl: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة حبات توت بري طازج'
          },
          {
            word: 'زَيْت',
            sentence: 'وَضَعَتْ أُمِّي زَيْتَ الزَّيْتُونِ عَلَى الطَّعَامِ.',
            imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة قارورة زيت زيتون نقي'
          }
        ]
      }
    },
    practiceSentences: [
      'تَنَاوَلَتْ تَسْنِيمُ تَمْرًا وَتُفَّاحًا لَذِيذًا.',
      'كَتَبَتْ تَهَانِي دَرْسَ التَّارِيخِ بِدِقَّةٍ.',
      'تَطِيرُ الطَّائِرَاتُ فَوْقَ البُيُوتِ العَالِيَةِ.'
    ]
  },

  'ث': {
    letter: 'ث',
    name: 'حرف الثاء',
    articulationPoint: 'خروج طرف اللسان قليلاً بين الثنايا العليا والسفلى مع جريان مستمر للهواء بصوت احتكاكي مهموس.',
    articulationType: 'صوت احتكاكي بين أسناني مهموس رخو مرقق.',
    classification: 'أسناني',
    mirrorInstruction: 'يجلس الطالب أمام المرآة ليتأكد من خروج رأس طرف اللسان بشكل طفيف وظاهر بين أطراف الأسنان، ومقارنة ذلك بالمرآة مع نموذج أخصائي تدريبات نطق.',
    tongueDepressorInstruction: 'يمكن لمس أطراف الأسنان العلوية والسفلية بخافض اللسان لتنبيه الطالب حسياً بمكان بروز طرف اللسان بدقة دون عض مفرط.',
    clinicalTips: [
      'تدريب الطالب على النفخ الخفيف مع إبقاء طرف اللسان بارزاً.',
      'التفريق بين السين والثاء (في السين اللسان بالداخل، وفي الثاء اللسان يبرز للخارج).',
      'إلصاق ورقة رقيقة أمام الفم ليرى ارتعاشها المستمر بفعل الاحتكاك الهوائي.'
    ],
    shortVowels: { fatha: 'ثَ', damma: 'ثُ', kasra: 'ثِ', sukoon: 'ثْ' },
    longVowels: { alif: 'ثَا', waw: 'ثُو', yaa: 'ثِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'ثَعْلَب',
            sentence: 'الثَّعْلَبُ حَيَوَانٌ بَرِّيٌّ ذَكِيٌّ وَسَرِيعٌ.',
            imageUrl: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ثعلب بري في الغابة'
          },
          {
            word: 'ثَوْب',
            sentence: 'لَبِسَ سَعْدٌ ثَوْبًا أَبْيَضَ نَظِيفًا فِي العِيدِ.',
            imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ثوب أبيض أنيق'
          },
          {
            word: 'ثَلْج',
            sentence: 'تَسَاقَطَ الثَّلْجُ الأَبْيَضُ فَوْقَ قِمَمِ الجِبَالِ.',
            imageUrl: 'https://images.unsplash.com/photo-1517299321929-30a7082752d7?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ثلوج بيضاء في الطبيعة'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'مُثَلَّث',
            sentence: 'رَسَمَ الطَّالِبُ مُثَلَّثًا مُتَسَاوِيَ الأَضْلَاعِ بِالمِسْطَرَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة شكل مثلث هندسي'
          },
          {
            word: 'كُمَّثْرَى',
            sentence: 'الكُمَّثْرَى فَاكِهَةٌ طَيِّبَةُ الرَّائِحَةِ وَحُلْوَةٌ.',
            imageUrl: 'https://images.unsplash.com/photo-1514756331096-242fdeb7004a?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة كمثرى ناضجة وطازجة'
          },
          {
            word: 'عُثْمَان',
            sentence: 'عُثْمَانُ طَالِبٌ مُجْتَهِدٌ وَمُهَذَّبٌ.',
            imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة طالب مبتسم'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'أَثَاث',
            sentence: 'اشْتَرَى أَبِي أَثَاثًا جَدِيدًا لِغُرْفَةِ المَعِيشَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة أثاث منزلي فاخر'
          },
          {
            word: 'بَحْث',
            sentence: 'قَدَّمَ الطَّالِبُ بَحْثًا عِلْمِيًّا عَنِ النَّبَاتَاتِ.',
            imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة بحث علمي وكتب'
          },
          {
            word: 'حَدِيث',
            sentence: 'اسْتَمَعْنَا إِلَى حَدِيثٍ نَبَوِيٍّ شَرِيفٍ فِي الإِذَاعَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مجلس ومصحف وقراءة'
          }
        ]
      }
    },
    practiceSentences: [
      'ثَابِتٌ يَبْحَثُ عَنْ ثَلَاثَةِ ثِمَارٍ نَاضِجَةٍ.',
      'سَقَطَ الثَّلْجُ فِي الصَّبَاحِ البَاكِرِ.',
      'تَحَدَّثَ ثَامِرٌ بِحَدِيثٍ ثَمِينٍ وَمُفِيدٍ.'
    ]
  },

  'ج': {
    letter: 'ج',
    name: 'حرف الجيم',
    articulationPoint: 'وسط اللسان مع ما يقابله من الحنك الأعلى (الغار الصلب)، مع انحباس الصوت ثم انطلاقه باحتكاك خفيف مجهور.',
    articulationType: 'صوت انفجاري احتكاكي مركب وسط لساني شجري مجهور مرقق.',
    classification: 'غاري',
    mirrorInstruction: 'استخدام المرآة لملاحظة انطباق الفك مع فتح الشفتين بشكل مستدير خفيف، ورؤية وسط اللسان وهو يرتفع ليلامس قبة سقف الفم الصلب.',
    tongueDepressorInstruction: 'استخدام خافض اللسان لرفع وسط اللسان نحو قبة الحنك الأعلى إذا كان الطالب ينطقها دالاً أو كافاً، مع تثبيت طرف اللسان خلف القواطع السفلية.',
    clinicalTips: [
      'البدء بصوت (د) وتأخير المخرج تدريجياً لوسط الحنك، أو من صوت (ش) مع إضافة الجهر والاهتزاز الصوتي.',
      'التحقق من عدم تسرب الهواء كالدال النمطية (إبدال الجيم بالدال شائع جداً لدى طلاب الابتدائية).',
      'تدريب الطالب على لمس الحنجرة لاستشعار الاهتزاز الصوتي.'
    ],
    shortVowels: { fatha: 'جَ', damma: 'جُ', kasra: 'جِ', sukoon: 'جْ' },
    longVowels: { alif: 'جَا', waw: 'جُو', yaa: 'جِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'جَمَل',
            sentence: 'الجَمَلُ سَفِينَةُ الصَّحْرَاءِ يَصْبِرُ عَلَى العَطَشِ.',
            imageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة جمل عربي في الصحراء'
          },
          {
            word: 'جَزَر',
            sentence: 'الجَزَرُ الطَّازَجُ مُفِيدٌ لِصِحَّةِ العَيْنَيْنِ.',
            imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة جزر برتقالي طازج'
          },
          {
            word: 'جَرَس',
            sentence: 'دَقَّ جَرَسُ المَدْرَسَةِ مُعْلِنًا بَدْءَ الحِصَّةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة جرس مدرسي نحاسي'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'شَجَرَة',
            sentence: 'تَقِفُ العَصَافِيرُ فَوْقَ أَغْصَانِ الشَّجَرَةِ الخَضْرَاءِ.',
            imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة شجرة وارفة الظلال'
          },
          {
            word: 'مَسْجِد',
            sentence: 'يُؤَدِّي المُسْلِمُونَ الصَّلَاةَ فِي المَسْجِدِ الجَامِعِ.',
            imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مئذنة وقبة مسجد إسلامي'
          },
          {
            word: 'حَجَر',
            sentence: 'وَضَعَ البَنَّاءُ حَجَرًا قَوِيًّا فِي الجِدَارِ.',
            imageUrl: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة أحجار طبيعية صلبة'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'تَاج',
            sentence: 'يَلْبَسُ المَلِكُ تَاجًا ذَهَبِيًّا لَامِعًا.',
            imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة تاج ملكي ذهبي مرصع'
          },
          {
            word: 'دَجَاج',
            sentence: 'يَرْعَى الفَلَّاحُ الدَّجَاجَ فِي المَزْرَعَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة دجاج في مزرعة ريفية'
          },
          {
            word: 'بُرْج',
            sentence: 'بُرْجُ المَدِينَةِ يَرْتَفِعُ عَالِيًا نَحْوَ السَّمَاءِ.',
            imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة برج معماري شاهق'
          }
        ]
      }
    },
    practiceSentences: [
      'جَمَعَ جَابِرٌ الجَزَرَ الطَّازَجَ مِنَ الحَقْلِ.',
      'جَلَسَ جَمِيلٌ بِجَانِبِ الشَّاطِئِ الجَمِيلِ.',
      'نَجَحَ جَاسِمٌ فِي اخْتِبَارِ التَّعْلِيمِ بِجَدَارَةٍ.'
    ]
  },

  'ح': {
    letter: 'ح',
    name: 'حرف الحاء',
    articulationPoint: 'وسط الحلق من منطقة لسان المزمار، مع جريان سلس للهواء مع احتكاك واضح بدون اهتزاز الأوتار الصامتة.',
    articulationType: 'صوت احتكاكي حلقي مهموس رخو مرقق.',
    classification: 'حلقي',
    mirrorInstruction: 'توجيه الطالب أمام المرآة لرؤية تراجع قاعدة اللسان نحو الجدار الخلفي للحلق وفتح الفم باسترخاء، مع النفخ أمام المرآة لإظهار بخار النَفَس الدافئ المنبعث من الحلق.',
    tongueDepressorInstruction: 'يستخدم خافض اللسان للضغط اللطيف على ثلثي اللسان الأمامي لمنعه من الارتفاع وسد الفم، لفتح المجرى الحلقي للصوت.',
    clinicalTips: [
      'التدريب بواسطة تجربة بخار الفم على المرآة (مثل تدفئة اليدين في البرد "حْحْحْ").',
      'تدريب الحاء بعد التثاؤب أو شرب رشفة ماء دافئ.',
      'التأكد من التمييز بين الحاء والخاء (الخاء فيها شخير واحتكاك رخو، والحاء نقية ملساء).'
    ],
    shortVowels: { fatha: 'حَ', damma: 'حُ', kasra: 'حِ', sukoon: 'حْ' },
    longVowels: { alif: 'حَا', waw: 'حُو', yaa: 'حِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'حِصَان',
            sentence: 'الحِصَانُ العَرَبِيُّ الأَصِيلُ سَرِيعٌ وَرَشِيقٌ.',
            imageUrl: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة حصان عربي أصيل'
          },
          {
            word: 'حَلِيب',
            sentence: 'شَرِبَ حَمْزَةُ كَأْسَ حَلِيبٍ دَافِئٍ صَبَاحًا.',
            imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة كأس حليب طازج ناصع البياض'
          },
          {
            word: 'حَقِيبَة',
            sentence: 'رَتَّبَ الطَّالِبُ كُتُبَهُ دَاخِلَ الحَقِيبَةِ المَدْرَسِيَّةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة حقيبة ظهر مدرسية'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'سَحَاب',
            sentence: 'يَمْلَأُ السَّحَابُ الأَبْيَضُ السَّمَاءَ الزَّرْقَاءَ.',
            imageUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة سحاب أبيض طبيعي'
          },
          {
            word: 'بَحْر',
            sentence: 'سَافَرْنَا لِقَضَاءِ الإِجَازَةِ عَلَى شَاطِئِ البَحْرِ.',
            imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة شاطئ بحر أزرق وأمواج هادئة'
          },
          {
            word: 'لَحْم',
            sentence: 'طَبَخَتْ أُمِّي مَرَقَ اللَّحْمِ الشَّهِيَّ.',
            imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة لحم مطبوخ شهي'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'تِمْسَاح',
            sentence: 'يَعِيشُ التِّمْسَاحُ الضَّخْمُ فِي مِيَاهِ الأَنْهَارِ.',
            imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة تمساح في النهر'
          },
          {
            word: 'مِصْبَاح',
            sentence: 'يُنِيرُ المِصْبَاحُ غُرْفَةَ الدِّرَاسَةِ بِنُورٍ وَاضِحٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مصباح إضاءة منير'
          },
          {
            word: 'مِفْتَاح',
            sentence: 'فَتَحْنَا بَابَ المَنْزِلِ بِالمِفْتَاحِ.',
            imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مفتاح معدني'
          }
        ]
      }
    },
    practiceSentences: [
      'حَمَلَ حَامِدٌ حَقِيبَةَ الحِسَابِ فِي الصَّبَاحِ.',
      'فَرِحَ حَسَنٌ بِنَجَاحِ أَخِيهِ الصَّغِيرِ.',
      'شَرِبَ حَمْزَةُ حَلِيبًا حَارًّا مَعَ التَّمْرِ.'
    ]
  },

  'خ': {
    letter: 'خ',
    name: 'حرف الخاء',
    articulationPoint: 'أدنى الحلق مما يلي الفم مع الحنك اللحمي (الرخو)، مع تضييق المجرى وإحداث احتكاك خشن ومهموس.',
    articulationType: 'صوت احتكاكي طبقي حلقي مهموس رخو مفخم ومستعلٍ.',
    classification: 'حلقي',
    mirrorInstruction: 'توجيه الطالب أمام المرآة لملاحظة ارتفاع مؤخرة لسانه للأعلى وتقاربه مع سقف الحلق الرخو واللهاة، مع انفراج خفيف للشفتين دون ضم.',
    tongueDepressorInstruction: 'يستخدم خافض اللسان لملامسة سقف الحلق الرخو برفق لتنبيه الطالب لموضع الاحتكاك، أو خفض مقدمة اللسان لتمكين أقصى اللسان من الصعود.',
    clinicalTips: [
      'التدريب عبر محاكاة صوت التنحنح الخفيف بدون ماء أولاً.',
      'التركيز على تفخيم الصوت وارتفاع أقصى اللسان لعدم تحوله إلى حاء.',
      'تدريب الطالب على نطق المقطع الساكن: (أَخْ - إِخْ - أُخْ).'
    ],
    shortVowels: { fatha: 'خَ', damma: 'خُ', kasra: 'خِ', sukoon: 'خْ' },
    longVowels: { alif: 'خَا', waw: 'خُو', yaa: 'خِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'خَرُوف',
            sentence: 'يَرْعَى الخَرُوفُ فِي المَرْعَى الأَخْضَرِ الجَمِيلِ.',
            imageUrl: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة خروف صوفي في المرعى'
          },
          {
            word: 'خُبْز',
            sentence: 'الخُبْزُ الطَّازَجُ يُعْطِي الجِسْمَ طَاقَةً.',
            imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة أرغفة خبز طازجة'
          },
          {
            word: 'خِيَار',
            sentence: 'أَكَلَ خَالِدٌ خِيَارًا طَازَجًا فِي وَجْبَةِ الغَدَاءِ.',
            imageUrl: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة خيار أخضر طازج'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'نَخْلَة',
            sentence: 'تَحْمِلُ النَّخْلَةُ البَاسِقَةُ تَمْرًا سُكَّرِيًّا لَذِيذًا.',
            imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة نخلة باسقة ومثمرة'
          },
          {
            word: 'صَخْرَة',
            sentence: 'تَقِفُ الصَّخْرَةُ القَوِيَّةُ صَامِدَةً فِي الجَبَلِ.',
            imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة صخرة جبلية ضخمة'
          },
          {
            word: 'بُخَار',
            sentence: 'يَتَصَاعَدُ البُخَارُ مِنَ الإِبْرِيقِ السَّاخِنِ.',
            imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة بخار ماء دافئ'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'خَوْخ',
            sentence: 'قَطَفَ الطَّالِبُ ثَمَرَةَ خَوْخٍ نَاضِجَةٍ مِنَ البُسْتَانِ.',
            imageUrl: 'https://images.unsplash.com/photo-1595166667155-c42ca704e06f?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ثمرة خوخ طازجة'
          },
          {
            word: 'بِطِّيخ',
            sentence: 'البِطِّيخُ الأَحْمَرُ يُنْعِشُنَا فِي أَيَّامِ الصَّيْفِ.',
            imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة شريحة بطيخ أحمر'
          },
          {
            word: 'مَطْبَخ',
            sentence: 'تُعِدُّ أُمِّي الطَّعَامَ فِي المَطْبَخِ النَّظِيفِ.',
            imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مطبخ منزلي مرتب'
          }
        ]
      }
    },
    practiceSentences: [
      'خَرَجَ خَالِدٌ مَعَ أُخْتِهِ خَدِيجَةَ فِي رِحْلَةٍ.',
      'اشْتَرَى خَلِيلٌ خُبْزًا سَاخِنًا وَخَسًّا طَازَجًا.',
      'تَطْبُخُ خَوْلَةُ حَسَاءَ الخُضَارِ فِي المَطْبَخِ.'
    ]
  },

  'د': {
    letter: 'د',
    name: 'حرف الدال',
    articulationPoint: 'طرف اللسان العريض مع أصول الثنايا العليا، انحباس تام للهواء ثم انفجار مفاجئ مع جهر صوتي.',
    articulationType: 'صوت انفجاري لثوي أسناني مجهور شديد مرقق مقلقل.',
    classification: 'لثوي',
    mirrorInstruction: 'توجيه الطالب أمام المرآة لرؤية طرف اللسان وهو يلتصق بلثة الأسنان العليا تماماً ثم يرتد للأسفل مصدراً صوت (د)، مع لمس الحنجرة لاستشعار الاهتزاز.',
    tongueDepressorInstruction: 'يستخدم خافض اللسان لضبط طرف اللسان خلف الأسنان مباشرة ومنعه من الخروج بين الأسنان (حتى لا ينقلب ذالاً)، ولمس لثة الثنايا العليا.',
    clinicalTips: [
      'التفريق بين التاء والدال: التاء مهموسة باردة والدال مجهورة تهتز بها الأوتار الصوتية.',
      'التفريق بين الدال والضاد: الدال مرققة منفتحة والضاد مفخمة مطبقة.',
      'التدريب على مقاطع الإيقاع: (دَا - دُو - دِي).'
    ],
    shortVowels: { fatha: 'دَ', damma: 'دُ', kasra: 'دِ', sukoon: 'دْ' },
    longVowels: { alif: 'دَا', waw: 'دُو', yaa: 'دِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'دَرَّاجَة',
            sentence: 'رَكِبَ دَانِيَالُ دَرَّاجَتَهُ الجَدِيدَةَ فِي الحَدِيقَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة دراجة هوائية حديثة'
          },
          {
            word: 'دُبّ',
            sentence: 'يَعِيشُ الدُّبُّ القُطْبِيُّ فِي الأَمَاكِنِ البَارِدَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة دب في الثلج'
          },
          {
            word: 'دَفْتَر',
            sentence: 'يَكْتُبُ الطَّالِبُ دُرُوسَهُ فِي الدَّفْتَرِ.',
            imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة دفتر وقلم'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'هَدِيَّة',
            sentence: 'قَدَّمَ الطَّالِبُ هَدِيَّةً جَمِيلَةً لِمُعَلِّمِهِ تَقْدِيرًا لَهُ.',
            imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة علبة هدية مغلفة بشريط ملون'
          },
          {
            word: 'حَدِيقَة',
            sentence: 'تَنَزَّهْنَا فِي الحَدِيقَةِ العَامَّةِ بَيْنَ الأَزْهَارِ.',
            imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة حديقة خضراء وأزهار'
          },
          {
            word: 'صُنْدُوق',
            sentence: 'حَفِظَ الطِّفْلُ أَلْعَابَهُ دَاخِلَ الصُّنْدُوقِ.',
            imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة صندوق خشبي مرتب'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'قِرْد',
            sentence: 'يَتَسَلَّقُ القِرْدُ الأَشْجَارَ بِمَهَارَةٍ وَخِفَّةٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة قرد نشيط على شجرة'
          },
          {
            word: 'أَسَد',
            sentence: 'زَأَرَ الأَسَدُ بِصَوْتٍ قَوِيٍّ.',
            imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة أسد شجاع'
          },
          {
            word: 'وَلَد',
            sentence: 'يَجْتَهِدُ الوَلَدُ الصَّالِحُ فِي بِرِّ وَالِدَيْهِ.',
            imageUrl: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة طفل مهذب مبتسم'
          }
        ]
      }
    },
    practiceSentences: [
      'دَرَسَ دَاوُودُ دُرُوسَهُ بِجِدٍّ وَاجْتِهَادٍ.',
      'دَعَا دُرَيْدٌ أَصْدِقَاءَهُ لِزِيَارَةِ بَيْتِهِ.',
      'سَاعَدَ الأَبُ وَلَدَهُ فِي أَدَاءِ الوَاجِبِ.'
    ]
  },

  'ذ': {
    letter: 'ذ',
    name: 'حرف الذال',
    articulationPoint: 'خروج طرف اللسان بين الثنايا العليا والسفلى مع اهتزاز الأوتار الصوتية وجريان مستمر ومجهور للهواء.',
    articulationType: 'صوت احتكاكي بين أسناني مجهور رخو مرقق.',
    classification: 'أسناني',
    mirrorInstruction: 'يجلس الطالب أمام المرآة ليشاهد خروج طرف اللسان بدقة بين حافتي الأسنان مع مقارنة الاهتزاز الصوتي عن طريق وضع أصابعه على حنجرته.',
    tongueDepressorInstruction: 'يستخدم خافض اللسان لتوجيه طرف اللسان للخروج بين الأسنان إذا كان الطالب يستبدله بالدال أو الزاي (حيث يبقي لسانه بالداخل).',
    clinicalTips: [
      'المقارنة بين الثاء والذال: نفس المخرج البصري لكن الذال مجهور بصوت الحبال الصوتية.',
      'المقارنة بين الذال والدال: في الذال يبرز اللسان، وفي الدال اللسان مغلق خلف اللثة.',
      'التدريب على مقطع الذبذبة المستمر: (ذْذْذْذْ).'
    ],
    shortVowels: { fatha: 'ذَ', damma: 'ذُ', kasra: 'ذِ', sukoon: 'ذْ' },
    longVowels: { alif: 'ذَا', waw: 'ذُو', yaa: 'ذِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'ذِئْب',
            sentence: 'يَعِيشُ الذِّئْبُ الرَّمَادِيُّ فِي الجِبَالِ العَالِيَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ذئب بري رمادي'
          },
          {
            word: 'ذُرَة',
            sentence: 'الذُّرَةُ الصَّفْرَاءُ حُلْوَةٌ وَمَشْوِيَّةٌ لَذِيذَةٌ.',
            imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة كوز ذرة صفراء طازجة'
          },
          {
            word: 'ذُبَابَة',
            sentence: 'طَارَتِ الذُّبَابَةُ بَعِيدًا عَنِ النَّافِذَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة حشرة طائرة في الطبيعة'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'أُذُن',
            sentence: 'نَسْمَعُ الأَصْوَاتَ النَّقِيَّةَ بِأُذُنٍ سَلِيمَةٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة أذن بشرية وسماع'
          },
          {
            word: 'جَذْر',
            sentence: 'يَمْتَصُّ جَذْرُ الشَّجَرَةِ المَاءَ مِنَ التُّرْبَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة جذور شجرة في الأرض'
          },
          {
            word: 'بُذُور',
            sentence: 'زَرَعَ الفَلَّاحُ بُذُورَ القَمْحِ فِي الحَقْلِ.',
            imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة بذور نباتات زراعية'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'قُنْفُذ',
            sentence: 'يَحْمِي القُنْفُذُ نَفْسَهُ بِأَشْوَاكِهِ الحَادَّةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة قنفذ بأشواكه الطبيعية'
          },
          {
            word: 'لَذِيذ',
            sentence: 'هَذَا الطَّعَامُ صِحِّيٌّ وَلَذِيذٌ جِدًّا.',
            imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة طبق طعام شهي'
          },
          {
            word: 'تِلْمِيذ',
            sentence: 'يَسْتَمِعُ التِّلْمِيذُ النَّشِيطُ لِشَرْحِ المُعَلِّمِ.',
            imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة تلميذ يقرأ بنشاط'
          }
        ]
      }
    },
    practiceSentences: [
      'ذَهَبَ ذَكِيٌّ إِلَى مَكْتَبَةِ المَدْرَسَةِ لِلْقِرَاءَةِ.',
      'تَذَوَّقَ مُعَاذٌ طَعَامًا لَذِيذًا وَمُفِيدًا.',
      'أَذَاعَ المُذِيعُ نَشْرَةَ الأَخْبَارِ بِصَوْتٍ عَذْبٍ.'
    ]
  },

  'ر': {
    letter: 'ر',
    name: 'حرف الراء',
    articulationPoint: 'طرف اللسان مع ما يحاذيه من لثة الأسنان العليا، مع ارتعاد وارتطام خفيف وسريع لطرف اللسان مصحوباً بجهر صوتي وانحراف للهواء.',
    articulationType: 'صوت متوسط تكراري لثوي مجهور ذو انحراف (مرقق أو مفخم بحسب حركته).',
    classification: 'لثوي',
    mirrorInstruction: 'توجيه الطالب أمام المرآة لملاحظة انفراج الشفتين وتباعد الفكين قليلاً، ورؤية مقدمة طرف اللسان وهي ترتفع وتلامس نتوءات اللثة العلوية وتهتز بسرعة خاطفة (رفرفة اللسان).',
    tongueDepressorInstruction: 'استخدام خافض اللسان الطبي المعقم لتنبيه لثة الثنايا العليا باللمس، أو وضعه تحت جانبي اللسان لمساعدة الطالب على رفع طرف اللسان فقط دون الحواف إذا كان يعاني من اللدغة الرائية اليرائية أو الغينية.',
    clinicalTips: [
      'علاج اللدغة الرائية: البدء بصوت (د) أو (ت) السريع المتكرر (تْدْ تْدْ تْدْ) لتحفيز ارتعاد طرف اللسان.',
      'التدريب على صوت محرك السيارة (بْرْرْرْرْ) أو نفخ الهواء بقوة مع طرف لسان مرن غير مشدود.',
      'التأكد من سلامة الرابط اللساني وعدم وجود لجام لسان مشدود يمنع الرفع.'
    ],
    shortVowels: { fatha: 'رَ', damma: 'رُ', kasra: 'رِ', sukoon: 'رْ' },
    longVowels: { alif: 'رَا', waw: 'رُو', yaa: 'رِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'رُمَّان',
            sentence: 'الرُّمَّانُ فَاكِهَةٌ طَيِّبَةٌ حَبَّاتُهَا حَمْرَاءُ كَاليَاقُوتِ.',
            imageUrl: 'https://images.unsplash.com/photo-1541344999736-83eca872f242?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة رمان أحمر حقيقي طازج ومفتوح'
          },
          {
            word: 'رَجُل',
            sentence: 'سَاعَدَ الرَّجُلُ الطَّيِّبُ جَارَهُ الكَبِيرَ.',
            imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة رجل كريم الملامح'
          },
          {
            word: 'رِيشَة',
            sentence: 'رَسَمَ الفَنَّانُ لَوْحَةً جَمِيلَةً بِالرِّيشَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ريشة طائر ناعمة'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'كُرَة',
            sentence: 'لَعِبَ الطُّلَّابُ بِالكُرَةِ فِي مَلْعَبِ المَدْرَسَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة كرة قدم حقيقية على عشب الملعب'
          },
          {
            word: 'مَطَر',
            sentence: 'نَزَلَ المَطَرُ الخَيِّرُ فَرَوَى الأَرْضَ وَالزَّرْعَ.',
            imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة قطرات مطر طبيعية'
          },
          {
            word: 'جَرَس',
            sentence: 'رَنَّ جَرَسُ البَابِ فَأَسْرَعَ سَامِي لِيَفْتَحَ.',
            imageUrl: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة جرس نحاسي واضح'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'نَمِر',
            sentence: 'النَّمِرُ المُنَقَّطُ حَيَوَانٌ سَرِيعٌ وَشُجَاعٌ.',
            imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة نمر مخطط قوي'
          },
          {
            word: 'قَمَر',
            sentence: 'يَظْهَرُ القَمَرُ المُنِيرُ لَيْلًا فِي السَّمَاءِ الصَّافِيَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة بدر القمر مضيء في سماء الليل'
          },
          {
            word: 'مَطَار',
            sentence: 'هَبَطَتِ الطَّائِرَةُ بِسَلَامٍ فِي مَطَارِ المَدِينَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة طائرة ومطار سفر'
          }
        ]
      }
    },
    practiceSentences: [
      'رَسَمَ رَائِدٌ رَسْمَةً رَائِعَةً لِقَوْسِ قُزَحَ.',
      'رَكِبَ رَامِي قِطَارَ الرِّحْلَاتِ إِلَى الرِّيَاضِ.',
      'تَجْرِي مِيَاهُ الأَنْهَارِ بَيْنَ الأَشْجَارِ المُورِقَةِ.'
    ]
  },

  'ز': {
    letter: 'ز',
    name: 'حرف الزاي',
    articulationPoint: 'طرف اللسان فويق الثنايا السفلى مع مجرى ضيق للهواء باتجاه الثنايا العليا، واهتزاز الأوتار الصوتية مصدراً صفيراً مجهوراً.',
    articulationType: 'صوت احتكاكي صفيري أسناني مجهور رخو مرقق.',
    classification: 'أسناني',
    mirrorInstruction: 'يجلس الطالب أمام المرآة ليتأكد من تقارب الأسنان العليا والسفلى وابتسامة خفيفة للشفتين مع بقاء طرف اللسان في الداخل خلف القواطع السفلية.',
    tongueDepressorInstruction: 'يستخدم خافض اللسان لمنع طرف اللسان من التقدم بين الأسنان (إذا كان الطالب ينطق الزاي ذالاً)، وتثبيت رأس اللسان خلف الأسنان السفلية.',
    clinicalTips: [
      'تشبيه الصوت بطنين النحلة (زْزْزْزْ) لتعزيز الجهر والاهتزاز الصوتي.',
      'المقارنة بين السين والزاي عبر لمس الحنجرة: السين بارد وهادئ والزاي مهتز وقوي.',
      'ممارسة صوت الصفير المستمر مع حبس اللسان بالداخل.'
    ],
    shortVowels: { fatha: 'زَ', damma: 'زُ', kasra: 'زِ', sukoon: 'زْ' },
    longVowels: { alif: 'زَا', waw: 'زُو', yaa: 'زِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'زَرَافَة',
            sentence: 'الزَّرَافَةُ حَيَوَانٌ طَوِيلُ العُنُقِ يَتَغَذَّى عَلَى الأَوْرَاقِ.',
            imageUrl: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة زرافة طويلة العنق'
          },
          {
            word: 'زَيْتُون',
            sentence: 'شَجَرَةُ الزَّيْتُونِ مُبَارَكَةٌ وَثِمَارُهَا غَنِيَّةٌ بِالفَائِدَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1541256942802-7b2996458514?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ثمار زيتون خضراء'
          },
          {
            word: 'زَهْرَة',
            sentence: 'فَاحَتْ رَائِحَةُ الزَّهْرَةِ العَطِرَةِ فِي الحَدِيقَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة زهرة ملونة يانعة'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'مَوْز',
            sentence: 'المَوْزُ الأَصْفَرُ يُعْطِي الجِسْمَ طَاقَةً وَحَيَوِيَّةً.',
            imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة موز أصفر طازج'
          },
          {
            word: 'غَزَال',
            sentence: 'يَرْكُضُ الغَزَالُ الرَّشِيقُ بِخِفَّةٍ فِي السَّهْلِ.',
            imageUrl: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة غزال بري رشيق'
          },
          {
            word: 'جَزَر',
            sentence: 'اشْتَرَيْنَا جَزَرًا طَازَجًا لِإِعْدَادِ السَّلَطَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة جزر برتقالي'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'خُبْز',
            sentence: 'اشْتَرَى زِيَادٌ خُبْزًا سَاخِنًا مِنَ المَخْبَزِ.',
            imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة خبز طازج'
          },
          {
            word: 'أَرُزّ',
            sentence: 'طَبَخَتْ أُمِّي أَرُزًّا أَبْيَضَ شَهِيًّا.',
            imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة طبق أرز مطبوخ'
          },
          {
            word: 'كَنْز',
            sentence: 'العِلْمُ وَالأَدَبُ كَنْزٌ لَا يَفْنَى أَبَدًا.',
            imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة صندوق ذهبي وكنز'
          }
        ]
      }
    },
    practiceSentences: [
      'زَارَ زَاهِرٌ حَدِيقَةَ الأَزْهَارِ المَلِيئَةِ بِالوُرُودِ.',
      'زَرَعَ زَيْدٌ زَيْتُونًا فِي مَزْرَعَةِ جَدِّهِ.',
      'فَازَ فَرِيقُ المَدْرَسَةِ بِكَأْسِ المَرْكَزِ الأَوَّلِ.'
    ]
  },

  'س': {
    letter: 'س',
    name: 'حرف السين',
    articulationPoint: 'طرف اللسان مع ما بين الثنايا العليا والسفلى قريباً من أسفلها، مع إطلاق تيار هوائي احتكاكي صفيري مهموس غير مجهور.',
    articulationType: 'صوت احتكاكي صفيري أسناني مهموس رخو مرقق منفتح.',
    classification: 'أسناني',
    mirrorInstruction: 'توجيه الطالب أمام المرآة لملاحظة الابتسامة اللطيفة (انفراج الشفتين) وتطابق أطراف الأسنان، والتأكد التام من أن طرف اللسان مخفي بالكامل خلف الأسنان السفلية ولا يخرج إطلاقاً.',
    tongueDepressorInstruction: 'يستخدم خافض اللسان كحاجز حاسم يمنع طرف اللسان من البروز بين الأسنان (لعلاج اللدغة السينية البين-أسنانية)، أو لوضع أخدود طفيف بمنتصف اللسان لمرور الهواء.',
    clinicalTips: [
      'علاج اللدغة السينية (إبدال السين بالثاء أو خروج الهواء جانبياً كاللدغة الجانبية).',
      'تدريب الطالب على النفخ عبر مصاص عصير رفيع موجه نحو الأسنان المغلقة.',
      'وضع ظهر يد الطالب أمام فمه ليشعر ببرودة تيار الهواء المركز والرفيع المنبعث من السين.'
    ],
    shortVowels: { fatha: 'سَ', damma: 'سُ', kasra: 'سِ', sukoon: 'سْ' },
    longVowels: { alif: 'سَا', waw: 'سُو', yaa: 'سِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'سَيَّارَة',
            sentence: 'تَسِيرُ السَّيَّارَةُ بِهُدُوءٍ فِي شَوَارِعِ المَدِينَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة سيارة حديثة تسير في الطريق'
          },
          {
            word: 'سَمَكَة',
            sentence: 'تَسْبَحُ السَّمَكَةُ المُلَوَّنَةُ فِي مِيَاهِ البَحْرِ النَّقِيَّةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة سمكة ملونة تسبح في الماء'
          },
          {
            word: 'سَاعَة',
            sentence: 'تُشِيرُ السَّاعَةُ الجِدَارِيَّةُ إِلَى وَقْتِ صَلَاةِ الظُّهْرِ.',
            imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ساعة حائط دقيقة'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'مَسْجِد',
            sentence: 'يُصَلِّي سَعِيدٌ صَلَاةَ الجَمَاعَةِ فِي المَسْجِدِ.',
            imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مسجد كبير'
          },
          {
            word: 'مِسْطَرَة',
            sentence: 'سَطَّرَ الطَّالِبُ كَرَّاسَتَهُ بِالمِسْطَرَةِ بِنِظَامٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مسطرة مدرسية وقلم'
          },
          {
            word: 'جِسْر',
            sentence: 'تَعْبُرُ السَّيَّارَاتُ فَوْقَ الجِسْرِ الكَبِيرِ.',
            imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة جسر معلق فوق النهر'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'شَمْس',
            sentence: 'تُشْرِقُ الشَّمْسُ فِي الصَّبَاحِ فَتَمْلَأُ الدُّنْيَا نُورًا وَدِفْئًا.',
            imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة قرص الشمس مشرقاً'
          },
          {
            word: 'جَرَس',
            sentence: 'دَقَّ جَرَسُ الانْتِهَاءِ فَعَادَ الطُّلَّابُ لِمَنَازِلِهِمْ.',
            imageUrl: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة جرس مدرسي نحاسي'
          },
          {
            word: 'فَرَس',
            sentence: 'رَكِبَ الفَارِسُ الشُّجَاعُ فَرَسًا سَرِيعًا.',
            imageUrl: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة فرس عربي أصيل'
          }
        ]
      }
    },
    practiceSentences: [
      'سَافَرَ سَالِمٌ وَسَامِي إِلَى سَاحِلِ البَحْرِ.',
      'سَمِعَ سَعْدٌ صَوْتَ الجَرَسِ فَأَسْرَعَ لِلصَّفِّ.',
      'اشْتَرَتْ سَارَةُ فُسْتَانًا سَمَاوِيًّا سَاحِرًا.'
    ]
  },

  'ش': {
    letter: 'ش',
    name: 'حرف الشين',
    articulationPoint: 'وسط اللسان مع الحنك الأعلى الصلب مع تدوير وبروز الشفتين قليلاً، وجريان انتشار الهواء (التفشي).',
    articulationType: 'صوت احتكاكي تفشٍّ وسطي غاري مهموس رخو مرقق.',
    classification: 'غاري',
    mirrorInstruction: 'يراقب الطالب عبر المرآة بروز الشفتين للأمام وتدويرهما قليلاً (شكل البوق)، مع ارتفاع وسط اللسان نحو قبة الحنك دون التصاق، وتدفق الهواء الواسع.',
    tongueDepressorInstruction: 'يستخدم خافض اللسان لدفع طرف اللسان برفق للوراء إذا كان الطالب يقدمه للأمام وينطق الشين كصوت السين، وضمان ارتفاع منتصف اللسان.',
    clinicalTips: [
      'تشبيه الصوت بطلب الهدوء في الفصل أو المكتبة (شْشْشْشْ).',
      'تدريب حركة الشفتين الدائرية أمام المرآة أولاً كمدخل حركي سليم.',
      'التدريب على مقاطع: (شَا - شُو - شِي).'
    ],
    shortVowels: { fatha: 'شَ', damma: 'شُ', kasra: 'شِ', sukoon: 'شْ' },
    longVowels: { alif: 'شَا', waw: 'شُو', yaa: 'شِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'شَجَرَة',
            sentence: 'الشَّجَرَةُ تُعْطِينَا الثِّمَارَ اللَّذِيذَةَ وَالظِّلَّ الظَّلِيلَ.',
            imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة أشجار غابة خضراء وارفة'
          },
          {
            word: 'شَمْس',
            sentence: 'أَشْرَقَتِ الشَّمْسُ الذَّهَبِيَّةُ عَلَى السُّهُولِ.',
            imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة شمس دافئة مشرقة'
          },
          {
            word: 'شَمْعَة',
            sentence: 'أَضَاءَتِ الشَّمْعَةُ الصَّغِيرَةُ حَوْلَهَا بِهُدُوءٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة شمعة مضيئة'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'فَرَاشَة',
            sentence: 'تَطِيرُ الفَرَاشَةُ المُشْرِقَةُ بَيْنَ الأَزْهَارِ العَطِرَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1559253664-ca249d4608c6?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة فراشة ملونة حقيقية'
          },
          {
            word: 'خَشَب',
            sentence: 'صَنَعَ النَّجَّارُ كُرْسِيًّا مَتِينًا مِنَ الخَشَبِ.',
            imageUrl: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ألواح خشب طبيعي'
          },
          {
            word: 'مِشْمِش',
            sentence: 'قَطَفْنَا مِشْمِشًا بُرْتُقَالِيًّا حُلْوَ المَذَاقِ.',
            imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة حبات مشمش ناضجة'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'عُشّ',
            sentence: 'بَنَى العُصْفُورُ عُشًّا جَمِيلًا فَوْقَ الغُصْنِ العَالِي.',
            imageUrl: 'https://images.unsplash.com/photo-1544943910-4c1dc44a070a?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة عش عصفور حقيقي فيه بيض'
          },
          {
            word: 'رِيش',
            sentence: 'يُغَطِّي الرِّيشُ النَّاعِمُ جِسْمَ الطَّائِرِ.',
            imageUrl: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة ريش ناعم ملون'
          },
          {
            word: 'جَيْش',
            sentence: 'يَحْمِي الجَيْشُ البَاسِلُ حُدُودَ الوَطَنِ العَزِيزِ.',
            imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة جنود يحمون الوطن'
          }
        ]
      }
    },
    practiceSentences: [
      'شَاهَدَ شَادِي الشُّرُوقَ المُشْرِقَ فِي الشَّاطِئِ.',
      'شَرِبَ شَاكِرٌ عَصِيرَ المِشْمِشِ المُنْعِشَ.',
      'تَمْشِي الشَّاةُ فِي المَرْعَى مَعَ صِغَارِهَا.'
    ]
  },

  'ص': {
    letter: 'ص',
    name: 'حرف الصاد',
    articulationPoint: 'طرف اللسان فويق الثنايا السفلى مع استعلاء أقصى اللسان وإطباق طائفة من اللسان على قبة الحنك الأعلى (صفير مفخم).',
    articulationType: 'صوت احتكاكي صفيري أسناني مهموس رخو مفخم مطبق مستعلٍ.',
    classification: 'أسناني',
    mirrorInstruction: 'توجيه الطالب أمام المرآة لملاحظة انتفاخ جانبي اللسان وتجوف وسطه مع ارتفاع أقصاه، والتمييز البصري بين انفتاح الفم في السين واستدارة الفم المطبقة في الصاد.',
    tongueDepressorInstruction: 'يستخدم خافض اللسان للضغط اللطيف على وسط اللسان لإحداث التجويف الملعقي الضروري للتفخيم، وتنبيه الحنك الرخو للاستعلاء.',
    clinicalTips: [
      'تصحيح ترقيق الصاد وتحولها إلى سين (اللدغة التفخيمية).',
      'التدريب على ملء تجويف الفم بالهواء وتغليظ الصوت: (صَـ.. صُـ.. صِـ).',
      'الانتباه لعدم ضم الشفتين أثناء الصاد المفتوحة.'
    ],
    shortVowels: { fatha: 'صَ', damma: 'صُ', kasra: 'صِ', sukoon: 'صْ' },
    longVowels: { alif: 'صَا', waw: 'صُو', yaa: 'صِي' },
    examples: {
      beginning: {
        position: 'beginning',
        positionLabel: 'أول الكلمة',
        words: [
          {
            word: 'صَقْر',
            sentence: 'الصَّقْرُ طَائِرٌ جَارِحٌ قَوِيٌّ يَمْتَازُ بِحِدَّةِ البَصَرِ.',
            imageUrl: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة صقر جارح حقيقي'
          },
          {
            word: 'صَابُون',
            sentence: 'غَسَلَ الطِّفْلُ يَدَيْهِ بِالمَاءِ وَالصَّابُونِ لِلنَّظَافَةِ.',
            imageUrl: 'https://images.unsplash.com/photo-1607006314648-912f20668b5a?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة صابون نظافة يدوي'
          },
          {
            word: 'صُنْدُوق',
            sentence: 'وَضَعَ صَالِحٌ أَدَوَاتِهِ دَاخِلَ الصُّنْدُوقِ.',
            imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة صندوق خشبي'
          }
        ]
      },
      middle: {
        position: 'middle',
        positionLabel: 'وسط الكلمة',
        words: [
          {
            word: 'عَصِير',
            sentence: 'شَرِبَ صَابِرٌ كَأْسَ عَصِيرِ بُرْتُقَالٍ طَازَجٍ وَلَذِيذٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة كأس عصير برتقال طبيعي'
          },
          {
            word: 'بَصَل',
            sentence: 'قَطَّعَتِ الطَّاهِيَةُ البَصَلَ لإِعْدَادِ الطَّعَامِ.',
            imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة حبات بصل طازجة'
          },
          {
            word: 'حِصَان',
            sentence: 'يَجْرِي الحِصَانُ الأَصِيلُ فِي المَيْدَانِ.',
            imageUrl: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة حصان عربي قوي'
          }
        ]
      },
      end: {
        position: 'end',
        positionLabel: 'آخر الكلمة',
        words: [
          {
            word: 'قَفَص',
            sentence: 'فَتَحَ الوَلَدُ بَابَ القَفَصِ لِيُطْلِقَ العُصْفُورَ فِي الفَضَاءِ.',
            imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة قفص طيور تقليدي'
          },
          {
            word: 'مِقَصّ',
            sentence: 'قَصَّ التِّلْمِيذُ الوَرَقَ المُلَوَّنَ بِالمِقَصِّ بِحَذَرٍ.',
            imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة مقص أوراق مدرسي'
          },
          {
            word: 'قَمِيص',
            sentence: 'ارْتَدَى صُهَيْبٌ قَمِيصًا أَبْيَضَ نَاصِعًا.',
            imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80',
            imageAlt: 'صورة قميص أبيض أنيق'
          }
        ]
      }
    },
    practiceSentences: [
      'صَامَ صَابِرٌ يَوْمَ الخَمِيسِ احْتِسَابًا لِلأَجْرِ.',
      'صَنَعَ النَّجَّارُ صُنْدُوقًا صَلْبًا مِنَ الخَشَبِ.',
      'أَصْبَحَ الصَّبَاحُ صَافِيًا جَمِيلًا بِإِذْنِ اللهِ.'
    ]
  }
};

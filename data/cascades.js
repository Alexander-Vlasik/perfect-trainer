/**
 * 25+ Progressive Cascades (Multi-step mutation chains).
 * Each step mutates the context, shifting the speaker's timeline and tense.
 */

export const CASCADES = [
  {
    id: 'cascade_courier',
    title: 'Ожидание курьера',
    steps: [
      {
        mutation: 'Исходная ситуация (Камера сейчас, процесс длится)',
        ru: 'Я жду курьера уже два часа.',
        hint: 'wait for the courier',
        en: "I've been waiting for the courier for two hours.",
        verb: "have been waiting",
        acceptable: ["I have been waiting for the courier for two hours", "I've been waiting for the courier for 2 hours"],
        tense: 'present_perfect_continuous',
        tags: ['anchor-present-vs-past'],
        explanation: 'Камера сейчас: процесс начался 2 часа назад и длится прямо сейчас. Present Perfect Continuous.'
      },
      {
        mutation: '🔀 Сдвиг точки отсчёта в прошлое (добавлено событие)',
        ru: 'Я ждал курьера уже два часа, когда он наконец позвонил.',
        hint: 'when he finally called / wait for the courier',
        en: "I'd been waiting for the courier for two hours when he finally called.",
        verb: "had been waiting",
        acceptable: ["I had been waiting for the courier for two hours when he finally called", "When he finally called, I'd been waiting for the courier for two hours"],
        tense: 'past_perfect_continuous',
        tags: ['anchor-present-vs-past'],
        explanation: 'Камера прыгнула в прошлое (when he finally called). Процесс происходил ДО этой прошлой точки. Past Perfect Continuous.'
      },
      {
        mutation: '🔢 Добавлен счётчик раз (итог к прошлой точке)',
        ru: 'К тому моменту я уже трижды звонил в поддержку.',
        hint: 'by then / call support / three times',
        en: "By then I had called support three times.",
        verb: "had called",
        acceptable: ["By then I'd called support three times", "I had called support three times by then", "I'd called support 3 times by then"],
        tense: 'past_perfect_simple',
        tags: ['process-vs-count'],
        explanation: 'Счётчик количества раз (three times) фиксирует накопленный итог, а не процесс. Continuous блокируется. Past Perfect Simple.'
      },
      {
        mutation: '🔒 Закрытый период в прошлом (цепочка действий)',
        ru: 'Вчера я прождал курьера два часа и ушёл на работу.',
        hint: 'yesterday / wait for two hours / and leave for work',
        en: "Yesterday I waited for the courier for two hours and went to work.",
        verb: "waited",
        acceptable: ["Yesterday I waited for the courier for 2 hours and went to work", "I waited for the courier for two hours yesterday and went to work"],
        tense: 'past_simple',
        tags: ['open-vs-closed-period'],
        explanation: 'Слово yesterday и цепочка действий (waited and went) закрывают период в прошлом. Past Simple.'
      }
    ]
  },

  {
    id: 'cascade_laptop_stative',
    title: 'Рабочий ноутбук (Ловушка Stative have)',
    steps: [
      {
        mutation: 'Владение до настоящего момента (Stative lock)',
        ru: 'У меня этот ноутбук уже три года.',
        hint: 'have this laptop / for three years',
        en: "I've had this laptop for three years.",
        verb: "have had",
        acceptable: ["I have had this laptop for three years", "I've had this laptop for 3 years"],
        tense: 'present_perfect_simple',
        tags: ['stative-lock', 'have-idioms'],
        explanation: 'Глагол have в значении «владеть» — stative. Даже с for three years форма Continuous запрещена! Present Perfect Simple (have had).'
      },
      {
        mutation: '🔀 Сдвиг точки отсчёта в прошлое (ноутбук сломался)',
        ru: 'Он был у меня три года, когда внезапно сломался.',
        hint: 'have it / for three years / when it broke',
        en: "I'd had it for three years when it broke.",
        verb: "had had",
        acceptable: ["I had had it for three years when it broke", "When it broke, I'd had it for three years"],
        tense: 'past_perfect_simple',
        tags: ['stative-lock', 'anchor-present-vs-past'],
        explanation: 'Точка в прошлом (when it broke) + stative verb require Past Perfect Simple: had had (первый had вспомогательный, второй — 3-я форма).'
      },
      {
        mutation: '🔒 Прошлый закрытый период (уже избавился от него)',
        ru: 'Этот ноутбук был у меня три года, а потом я его продал.',
        hint: 'have this laptop / for three years / and then sell it',
        en: "I had this laptop for three years and then sold it.",
        verb: "had",
        acceptable: ["I had this laptop for 3 years and then sold it", "I had this laptop for three years and then I sold it"],
        tense: 'past_simple',
        tags: ['open-vs-closed-period'],
        explanation: 'Период полностью в прошлом и закрыт фактом продажи. Past Simple (had).'
      }
    ]
  },

  {
    id: 'cascade_server_fail',
    title: 'Сбой сервера и дебаггинг',
    steps: [
      {
        mutation: 'Процесс дебаггинга прямо сейчас',
        ru: 'Мы дебажим эту проблему с самого утра.',
        hint: 'debug this issue / since morning',
        en: "We've been debugging this issue since morning.",
        verb: "have been debugging",
        acceptable: ["We have been debugging this issue since morning", "We've been debugging this issue since the morning"],
        tense: 'present_perfect_continuous',
        tags: ['anchor-present-vs-past'],
        explanation: 'Процесс начался утром и всё ещё продолжается сейчас. Present Perfect Continuous.'
      },
      {
        mutation: '🔀 Точка в прошлом (нашли причину)',
        ru: 'Мы дебажили её уже четыре часа, когда наконец нашли ошибку.',
        hint: 'debug it / for four hours / when we finally found the bug',
        en: "We'd been debugging it for four hours when we finally found the bug.",
        verb: "had been debugging",
        acceptable: ["We had been debugging it for four hours when we finally found the bug", "We'd been debugging it for 4 hours when we finally found the bug"],
        tense: 'past_perfect_continuous',
        tags: ['anchor-present-vs-past'],
        explanation: 'Точка в прошлом (found the bug). Процесс шёл ДО неё. Past Perfect Continuous (had been debugging).'
      },
      {
        mutation: '✅ Факт успеха / результат сейчас (новость)',
        ru: 'Мы только что починили баг!',
        hint: 'just / fix the bug',
        en: "We've just fixed the bug!",
        verb: "have just fixed",
        acceptable: ["We have just fixed the bug", "We've just fixed the bug."],
        tense: 'present_perfect_simple',
        tags: ['anchor-present-vs-past'],
        explanation: 'Свежая новость, результат в настоящем: have just fixed. Present Perfect Simple.'
      },
      {
        mutation: '🔍 Вопрос о закрытых деталях в прошлом',
        ru: 'В котором часу вы его починили?',
        hint: 'what time / fix it',
        en: "What time did you fix it?",
        verb: "did you fix",
        acceptable: ["What time did you fix it", "At what time did you fix it"],
        tense: 'past_simple',
        tags: ['open-vs-closed-period'],
        explanation: 'Вопрос What time...? всегда спрашивает о конкретном закрытом моменте в прошлом → Past Simple (did you fix).'
      }
    ]
  },

  {
    id: 'cascade_sarah_berlin',
    title: 'Жизнь в Берлине (Открытый vs Закрытый период)',
    steps: [
      {
        mutation: 'Сара живёт там до сих пор (3-е лицо ед.ч.)',
        ru: 'Сара живёт в Берлине уже пять лет.',
        hint: 'Sarah / live in Berlin / for five years',
        en: "Sarah has been living in Berlin for five years.",
        verb: "has been living",
        acceptable: ["Sarah has lived in Berlin for five years", "Sarah has been living in Berlin for 5 years", "Sarah's been living in Berlin for five years"],
        tense: 'present_perfect_continuous',
        tags: ['agreement-3rd-person', 'anchor-present-vs-past'],
        explanation: 'Сара (3-е лицо) → has (не have!). Живёт до сих пор → Present Perfect (Continuous или Simple).'
      },
      {
        mutation: '🔀 Момент в прошлом (до переезда в Лондон)',
        ru: 'Она прожила в Берлине пять лет до того, как переехала в Лондон.',
        hint: 'live in Berlin / for five years / before she moved to London',
        en: "She had lived in Berlin for five years before she moved to London.",
        verb: "had lived",
        acceptable: ["She had lived in Berlin for 5 years before she moved to London", "She had been living in Berlin for five years before she moved to London"],
        tense: 'past_perfect_simple',
        tags: ['anchor-present-vs-past'],
        explanation: 'Точка в прошлом (before she moved). Период завершился ДО переезда. Past Perfect.'
      },
      {
        mutation: '🔒 Закрытый отрезок в прошлом (просто факт биографии)',
        ru: 'Она жила в Берлине с 2015 по 2020 год.',
        hint: 'live in Berlin / from 2015 to 2020',
        en: "She lived in Berlin from 2015 to 2020.",
        verb: "lived",
        acceptable: ["She lived in Berlin from 2015 to 2020"],
        tense: 'past_simple',
        tags: ['open-vs-closed-period'],
        explanation: 'Отрезок времени строго зафиксирован в прошлом (from... to...). Связи с настоящим нет. Past Simple (lived).'
      }
    ]
  },

  {
    id: 'cascade_alex_phone',
    title: 'Звонки и сообщения (Счёт vs Процесс)',
    steps: [
      {
        mutation: 'Алекс непрерывно звонит кому-то прямо сейчас',
        ru: 'Алекс звонит в банк уже полчаса.',
        hint: 'Alex / call the bank / for half an hour',
        en: "Alex has been calling the bank for half an hour.",
        verb: "has been calling",
        acceptable: ["Alex has been calling the bank for half an hour", "Alex's been calling the bank for half an hour"],
        tense: 'present_perfect_continuous',
        tags: ['agreement-3rd-person', 'process-vs-count'],
        explanation: 'Подлежащее Alex (он) → has. Процесс длится без остановки полчаса → Continuous.'
      },
      {
        mutation: '🔢 Алекс пересчитывает попытки за сегодня',
        ru: 'Он позвонил им уже четыре раза сегодня.',
        hint: 'call them / four times today',
        en: "He has called them four times today.",
        verb: "has called",
        acceptable: ["He's called them four times today", "He has called them 4 times today"],
        tense: 'present_perfect_simple',
        tags: ['process-vs-count', 'agreement-3rd-person'],
        explanation: 'Счётчик (four times) переключает внимание на количество завершённых попыток. Continuous невозможен. Present Perfect Simple.'
      },
      {
        mutation: '🔀 Момент в прошлом (когда заблокировали номер)',
        ru: 'Он звонил им четыре раза до того, как они заблокировали его номер.',
        hint: 'call them four times / before they blocked his number',
        en: "He had called them four times before they blocked his number.",
        verb: "had called",
        acceptable: ["He had called them 4 times before they blocked his number", "He'd called them four times before they blocked his number"],
        tense: 'past_perfect_simple',
        tags: ['anchor-present-vs-past', 'process-vs-count'],
        explanation: 'Счёт попыток ДО точки в прошлом (before they blocked). Past Perfect Simple (had called).'
      }
    ]
  },

  {
    id: 'cascade_know_friends',
    title: 'Знакомство (Stative know)',
    steps: [
      {
        mutation: 'Знакомство продолжается прямо сейчас',
        ru: 'Мы знаем друг друга уже десять лет.',
        hint: 'know each other / for ten years',
        en: "We've known each other for ten years.",
        verb: "have known",
        acceptable: ["We have known each other for ten years", "We've known each other for 10 years"],
        tense: 'present_perfect_simple',
        tags: ['stative-lock'],
        explanation: 'Глагол know — состояние (stative), continuous с ним запрещён категорически! Present Perfect Simple: have known.'
      },
      {
        mutation: '🔀 Момент встречи в прошлом',
        ru: 'Когда они встретились в 2021 году, они знали друг друга уже восемь лет.',
        hint: 'when they met in 2021 / know each other / for eight years',
        en: "When they met in 2021, they had known each other for eight years.",
        verb: "had known",
        acceptable: ["When they met in 2021, they'd known each other for eight years", "They had known each other for eight years when they met in 2021"],
        tense: 'past_perfect_simple',
        tags: ['stative-lock', 'anchor-present-vs-past'],
        explanation: 'Состояние продолжалось ДО момента встречи в 2021 году. Past Perfect Simple (had known).'
      },
      {
        mutation: '🔒 Первое знакомство как закрытое событие в прошлом',
        ru: 'Где вы впервые познакомились?',
        hint: 'where / first meet',
        en: "Where did you first meet?",
        verb: "did you first meet",
        acceptable: ["Where did you first meet", "Where did you meet for the first time"],
        tense: 'past_simple',
        tags: ['open-vs-closed-period'],
        explanation: 'Вопрос о закрытом разовом событии в прошлом. Past Simple.'
      }
    ]
  },

  {
    id: 'cascade_have_lunch_dynamic',
    title: 'Обед (Динамический have lunch)',
    steps: [
      {
        mutation: 'Действие в процессе в момент звонка в прошлом (Фон)',
        ru: 'Когда я пришёл в офис, они обедали.',
        hint: 'when I arrived / have lunch',
        en: "When I arrived at the office, they were having lunch.",
        verb: "were having",
        acceptable: ["When I arrived, they were having lunch", "They were having lunch when I arrived at the office"],
        tense: 'past_continuous',
        tags: ['in-progress-vs-prior', 'have-idioms'],
        explanation: 'have lunch — это активность/действие, а не владение! В сам момент прихода они были в процессе обеда. Past Continuous (were having).'
      },
      {
        mutation: '🔀 Действие завершилось ДО момента прихода',
        ru: 'Когда я пришёл в офис, они уже пообедали.',
        hint: 'when I arrived / already have lunch',
        en: "When I arrived at the office, they had already had lunch.",
        verb: "had already had",
        acceptable: ["They had already had lunch when I arrived at the office", "When I got to the office, they had already had lunch"],
        tense: 'past_perfect_simple',
        tags: ['anchor-present-vs-past', 'have-idioms'],
        explanation: 'Обед закончился ДО прихода. Двойное have: had (вспомогательный) + had (3-я форма). Past Perfect Simple.'
      },
      {
        mutation: 'Отсутствие обеда до текущего момента',
        ru: 'Я ещё не обедал сегодня.',
        hint: 'not have lunch / yet',
        en: "I haven't had lunch yet.",
        verb: "haven't had",
        acceptable: ["I have not had lunch yet", "I haven't had lunch yet"],
        tense: 'present_perfect_simple',
        tags: ['have-idioms', 'anchor-present-vs-past'],
        explanation: 'Период до настоящего момента (yet). Present Perfect: haven\'t had.'
      }
    ]
  },

  {
    id: 'cascade_reading_book',
    title: 'Чтение книги (Процесс vs Результат)',
    steps: [
      {
        mutation: 'Чтение длится всё утро',
        ru: 'Марк читает эту книгу всё утро.',
        hint: 'Mark / read this book / all morning',
        en: "Mark has been reading this book all morning.",
        verb: "has been reading",
        acceptable: ["Mark has been reading this book all morning", "Mark's been reading this book all morning"],
        tense: 'present_perfect_continuous',
        tags: ['agreement-3rd-person', 'process-vs-count'],
        explanation: 'Mark (3-е лицо) → has. Внимание на непрерывном процессе всё утро → Continuous.'
      },
      {
        mutation: '🔢 Внимание переключилось на количество прочитанных страниц',
        ru: 'Он прочитал уже пятьдесят страниц.',
        hint: 'read fifty pages / already',
        en: "He has already read fifty pages.",
        verb: "has already read",
        acceptable: ["He has already read 50 pages", "He's already read fifty pages", "He has read fifty pages already"],
        tense: 'present_perfect_simple',
        tags: ['process-vs-count', 'agreement-3rd-person'],
        explanation: '50 страниц — это готовый объём/результат. Continuous запрещён. Present Perfect Simple.'
      },
      {
        mutation: '✅ Книга прочитана полностью (новость)',
        ru: 'Он только что закончил её!',
        hint: 'just / finish it',
        en: "He has just finished it!",
        verb: "has just finished",
        acceptable: ["He's just finished it", "He has just finished it"],
        tense: 'present_perfect_simple',
        tags: ['anchor-present-vs-past'],
        explanation: 'Свежий результат в настоящем: have/has just done. Present Perfect Simple.'
      }
    ]
  },

  {
    id: 'cascade_broken_printer',
    title: 'Офисный принтер (Согласование и Неправильные формы)',
    steps: [
      {
        mutation: 'Свежая новость о поломке (принтер = it)',
        ru: 'Принтер сломался.',
        hint: 'the printer / break down',
        en: "The printer has broken down.",
        verb: "has broken down",
        acceptable: ["The printer has broken down", "The printer's broken down"],
        tense: 'present_perfect_simple',
        tags: ['agreement-3rd-person', 'irregular-forms'],
        explanation: 'Принтер (it) → has (не have!). 3-я форма глагола break — broken (не broke!). Present Perfect Simple.'
      },
      {
        mutation: '🔀 Момент в прошлом (когда мне понадобились документы)',
        ru: 'Принтер уже сломался, когда мне нужно было распечатать договор.',
        hint: 'the printer / already break down / when I needed to print the contract',
        en: "The printer had already broken down when I needed to print the contract.",
        verb: "had already broken down",
        acceptable: ["The printer had already broken down when I needed to print the contract"],
        tense: 'past_perfect_simple',
        tags: ['anchor-present-vs-past', 'irregular-forms'],
        explanation: 'Поломка произошла ДО того, как понадобился договор в прошлом. Past Perfect Simple (had broken).'
      },
      {
        mutation: '🔒 Дата поломки в прошлом',
        ru: 'Он сломался в прошлый вторник.',
        hint: 'it / break down / last Tuesday',
        en: "It broke down last Tuesday.",
        verb: "broke down",
        acceptable: ["It broke down last Tuesday"],
        tense: 'past_simple',
        tags: ['open-vs-closed-period', 'irregular-forms'],
        explanation: 'Якорь last Tuesday полностью закрывает период в прошлом → Past Simple (broke).'
      }
    ]
  },

  {
    id: 'cascade_exhausted_arrival',
    title: 'Усталость после работы (След процесса)',
    steps: [
      {
        mutation: 'Усталость прямо сейчас (камера в настоящем)',
        ru: 'Я очень устал сейчас, потому что работал весь день.',
        hint: 'I am exhausted now / because / work all day',
        en: "I am exhausted now because I have been working all day.",
        verb: "have been working",
        acceptable: ["I'm exhausted now because I've been working all day", "I am exhausted now because I've been working all day"],
        tense: 'present_perfect_continuous',
        tags: ['anchor-present-vs-past'],
        explanation: 'Текущее состояние (I am exhausted now) вызвано процессом до сейчас. Present Perfect Continuous (have been working).'
      },
      {
        mutation: '🔀 Усталость в прошлом (камера в прошлом — частая ошибка!)',
        ru: 'Я был без сил, когда пришёл домой, потому что работал весь день.',
        hint: 'I was exhausted when I got home / because / work all day',
        en: "I was exhausted when I got home because I had been working all day.",
        verb: "had been working",
        acceptable: ["I was exhausted when I got home because I'd been working all day", "Because I had been working all day, I was exhausted when I got home"],
        tense: 'past_perfect_continuous',
        tags: ['anchor-present-vs-past'],
        explanation: 'Внимание на якоря: I was exhausted, got home — всё в прошлом! Значит работа была ДО этой точки: had been working (не have!).'
      }
    ]
  },

  {
    id: 'cascade_driving_trip',
    title: 'Поездка за рулём (Процесс vs Точка сбоя)',
    steps: [
      {
        mutation: 'Водитель едет без остановки прямо сейчас',
        ru: 'Он едет за рулём уже пять часов.',
        hint: 'he / drive / for five hours',
        en: "He has been driving for five hours.",
        verb: "has been driving",
        acceptable: ["He has been driving for 5 hours", "He's been driving for five hours"],
        tense: 'present_perfect_continuous',
        tags: ['agreement-3rd-person', 'anchor-present-vs-past'],
        explanation: 'Он (he) → has. Процесс движения начался 5 часов назад и продолжается сейчас. Present Perfect Continuous.'
      },
      {
        mutation: '🔀 Момент в прошлом (когда закипел мотор)',
        ru: 'Он был за рулём уже пять часов, когда закипел мотор.',
        hint: 'drive for five hours / when the engine overheated',
        en: "He had been driving for five hours when the engine overheated.",
        verb: "had been driving",
        acceptable: ["He had been driving for 5 hours when the engine overheated", "When the engine overheated, he had been driving for five hours"],
        tense: 'past_perfect_continuous',
        tags: ['anchor-present-vs-past'],
        explanation: 'Момент в прошлом (overheated). До него непрерывно шёл процесс. Past Perfect Continuous.'
      },
      {
        mutation: '🔢 Подсчёт пройденного километража (итог)',
        ru: 'К тому моменту он проехал уже триста километров.',
        hint: 'drive three hundred kilometers / by then',
        en: "By then he had driven three hundred kilometers.",
        verb: "had driven",
        acceptable: ["By then he had driven 300 kilometers", "He had driven three hundred kilometers by then"],
        tense: 'past_perfect_simple',
        tags: ['process-vs-count', 'irregular-forms'],
        explanation: 'Счёт километров — завершённый результат. 3-я форма глагола drive — driven (не drove!). Past Perfect Simple.'
      }
    ]
  },

  {
    id: 'cascade_cooking_dinner',
    title: 'Приготовление ужина (Фон vs Предшествование)',
    steps: [
      {
        mutation: 'Процесс готовки прямо сейчас',
        ru: 'Она готовит ужин уже два часа.',
        hint: 'she / cook dinner / for two hours',
        en: "She has been cooking dinner for two hours.",
        verb: "has been cooking",
        acceptable: ["She has been cooking dinner for 2 hours", "She's been cooking dinner for two hours"],
        tense: 'present_perfect_continuous',
        tags: ['agreement-3rd-person', 'anchor-present-vs-past'],
        explanation: 'Она (she) → has. Процесс начался 2 часа назад и длится. Present Perfect Continuous.'
      },
      {
        mutation: '🔀 Действие в сам момент прихода гостей (Фон в прошлом)',
        ru: 'Когда пришли гости, она готовила ужин.',
        hint: 'when the guests arrived / cook dinner',
        en: "When the guests arrived, she was cooking dinner.",
        verb: "was cooking",
        acceptable: ["She was cooking dinner when the guests arrived"],
        tense: 'past_continuous',
        tags: ['in-progress-vs-prior'],
        explanation: 'В сам момент прихода гостей она стояла у плиты (фон в процессе). Past Continuous (was cooking).'
      },
      {
        mutation: '🔀 Действие завершилось ДО прихода гостей (Результат)',
        ru: 'Когда пришли гости, она уже приготовила ужин.',
        hint: 'when the guests arrived / already cook dinner',
        en: "When the guests arrived, she had already cooked dinner.",
        verb: "had already cooked",
        acceptable: ["She had already cooked dinner when the guests arrived"],
        tense: 'past_perfect_simple',
        tags: ['anchor-present-vs-past', 'in-progress-vs-prior'],
        explanation: 'Ужин был готов ДО прихода гостей. Past Perfect Simple (had cooked).'
      }
    ]
  },

  {
    id: 'cascade_learn_spanish',
    title: 'Изучение испанского (Открытый vs Закрытый период)',
    steps: [
      {
        mutation: 'Изучение продолжается прямо сейчас',
        ru: 'Они учат испанский уже три года.',
        hint: 'they / learn Spanish / for three years',
        en: "They have been learning Spanish for three years.",
        verb: "have been learning",
        acceptable: ["They have been learning Spanish for 3 years", "They've been learning Spanish for three years"],
        tense: 'present_perfect_continuous',
        tags: ['anchor-present-vs-past'],
        explanation: 'Длится до сих пор. Present Perfect Continuous.'
      },
      {
        mutation: '🔀 Момент переезда в Мадрид в прошлом',
        ru: 'Они учили испанский уже три года до того, как переехали в Мадрид.',
        hint: 'learn Spanish for three years / before they moved to Madrid',
        en: "They had been learning Spanish for three years before they moved to Madrid.",
        verb: "had been learning",
        acceptable: ["They had been learning Spanish for 3 years before they moved to Madrid"],
        tense: 'past_perfect_continuous',
        tags: ['anchor-present-vs-past'],
        explanation: 'Процесс длился до точки в прошлом (before they moved). Past Perfect Continuous.'
      },
      {
        mutation: '🔒 Закрытый прошлый эпизод',
        ru: 'В школе я учил испанский два года.',
        hint: 'at school / learn Spanish / for two years',
        en: "At school I learned Spanish for two years.",
        verb: "learned",
        acceptable: ["I learned Spanish for two years at school", "At school I learnt Spanish for two years"],
        tense: 'past_simple',
        tags: ['open-vs-closed-period'],
        explanation: 'Школьный период завершён. Past Simple (learned / learnt).'
      }
    ]
  },

  {
    id: 'cascade_have_shower_timing',
    title: 'Принятие душа (Динамический have a shower)',
    steps: [
      {
        mutation: 'Процесс в момент телефонного звонка в прошлом',
        ru: 'Когда зазвонил телефон, я принимал душ.',
        hint: 'when the phone rang / have a shower',
        en: "When the phone rang, I was having a shower.",
        verb: "was having",
        acceptable: ["I was having a shower when the phone rang"],
        tense: 'past_continuous',
        tags: ['have-idioms', 'in-progress-vs-prior'],
        explanation: 'have a shower — активность. В момент звонка телефон застал меня в процессе душа. Past Continuous.'
      },
      {
        mutation: '🔀 Действие завершилось ДО звонка',
        ru: 'Когда зазвонил телефон, я уже принял душ.',
        hint: 'when the phone rang / already have a shower',
        en: "When the phone rang, I had already had a shower.",
        verb: "had already had",
        acceptable: ["I had already had a shower when the phone rang"],
        tense: 'past_perfect_simple',
        tags: ['have-idioms', 'anchor-present-vs-past'],
        explanation: 'Душ был завершён ДО звонка. Двойное had had. Past Perfect Simple.'
      },
      {
        mutation: 'Связь с настоящим моментом (ещё не принимал)',
        ru: 'Я ещё не принимал душ сегодня.',
        hint: 'not have a shower / yet today',
        en: "I haven't had a shower yet today.",
        verb: "haven't had",
        acceptable: ["I have not had a shower yet today", "I haven't had a shower today yet"],
        tense: 'present_perfect_simple',
        tags: ['have-idioms', 'anchor-present-vs-past'],
        explanation: 'Открытый период до сейчас (yet today). Present Perfect Simple: haven\'t had.'
      }
    ]
  },

  {
    id: 'cascade_lose_passport',
    title: 'Потеря паспорта (Результат сейчас vs Прошлое)',
    steps: [
      {
        mutation: 'Результат актуален прямо сейчас (паспорта нет!)',
        ru: 'Я потерял паспорт и не могу вылететь.',
        hint: 'lose my passport / and cannot fly',
        en: "I have lost my passport and cannot fly.",
        verb: "have lost",
        acceptable: ["I've lost my passport and cannot fly", "I've lost my passport"],
        tense: 'present_perfect_simple',
        tags: ['anchor-present-vs-past'],
        explanation: 'Результат прямо сейчас: паспорт потерян в прошлом, но проблема существует в эту секунду. Present Perfect Simple.'
      },
      {
        mutation: '🔀 Момент в аэропорту в прошлом',
        ru: 'Когда я приехал в аэропорт, я обнаружил, что потерял паспорт.',
        hint: 'when I arrived at the airport / realize / lose my passport',
        en: "When I arrived at the airport, I realized that I had lost my passport.",
        verb: "had lost",
        acceptable: ["When I arrived at the airport, I realized I had lost my passport"],
        tense: 'past_perfect_simple',
        tags: ['anchor-present-vs-past'],
        explanation: 'Потеря произошла раньше момента обнаружения в аэропорту. Past Perfect Simple (had lost).'
      },
      {
        mutation: '🔒 Закрытое происшествие в прошлом (паспорт уже нашли)',
        ru: 'В прошлом году я потерял паспорт, но нашёл его через неделю.',
        hint: 'last year / lose my passport / but find it a week later',
        en: "Last year I lost my passport, but found it a week later.",
        verb: "lost",
        acceptable: ["Last year I lost my passport but found it a week later"],
        tense: 'past_simple',
        tags: ['open-vs-closed-period', 'irregular-forms'],
        explanation: 'Прошлогодний факт с завершением (нашёл через неделю). Никакой связи с сейчас нет. Past Simple (lost).'
      }
    ]
  }
];

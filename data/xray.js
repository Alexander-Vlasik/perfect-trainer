/**
 * 30+ "X-Ray of Meaning" tasks (EN -> Reality check).
 * Learner inspects an English sentence or minimal pair and identifies
 * what is actually true in the real-world timeline.
 */

export const XRAY_TASKS = [
  {
    id: 'xray_live_london',
    promptEn: 'A: "I\'ve lived in London for five years."\nB: "I lived in London for five years."',
    question: 'В чём разница в реальном положении говорящего?',
    options: [
      'В А человек живёт в Лондоне до сих пор; в B — уже съехал оттуда.',
      'В А человек жил там давно, а в B переехал только что.',
      'Обе фразы означают, что человек уже не живёт в Лондоне, но в A он скучает по нему.',
      'Разницы нет, это просто британский и американский варианты.'
    ],
    correctIndex: 0,
    tags: ['open-vs-closed-period', 'anchor-present-vs-past'],
    explanation: 'Present Perfect (have lived) связывает пятилетний период с настоящим моментом — человек живёт там сейчас. Past Simple (lived) закрывает период в прошлом — человек уже уехал.'
  },

  {
    id: 'xray_keys_lost',
    promptEn: '"I\'ve lost my keys." vs "I lost my keys yesterday."',
    question: 'Что мы можем сказать о наличии ключей прямо сейчас?',
    options: [
      'В первой фразе ключи всё ещё не найдены (проблема актуальна); во второй — они могли уже найтись.',
      'Во второй фразе ключей точно нет, а в первой их только что нашли.',
      'В обеих фразах ключи уже найдены.',
      'Первая фраза используется только в официальной речи.'
    ],
    correctIndex: 0,
    tags: ['anchor-present-vs-past', 'open-vs-closed-period'],
    explanation: 'Present Perfect (I\'ve lost) передаёт состояние на данный момент: ключей нет прямо сейчас. Past Simple (I lost yesterday) констатирует лишь прошлый факт — с тех пор ключи могли найтись.'
  },

  {
    id: 'xray_server_down',
    promptEn: 'When the lead engineer logged in:\n(1) "The server had crashed."\n(2) "The server crashed."',
    question: 'Какова хронология событий в предложении (1)?',
    options: [
      'Сервер упал ДО того, как инженер залогинился (он застал его уже лежащим).',
      'Сервер упал ровно в тот момент, когда инженер нажал кнопку входа.',
      'Сервер упал после того, как инженер залогинился и ввёл команду.',
      'Сервер начал падать, но инженер успел предотвратить сбой.'
    ],
    correctIndex: 0,
    tags: ['anchor-present-vs-past', 'in-progress-vs-prior'],
    explanation: 'Past Perfect (had crashed) показывает предпрошедшее действие: падение произошло ДО точки входа в систему (logged in).'
  },

  {
    id: 'xray_exhausted_running',
    promptEn: '"Paul was out of breath because he had been running."',
    question: 'Бежал ли Пол в тот момент, когда мы его увидели?',
    options: [
      'Скорее всего, он только что остановился, но виден физический след процесса (одышка).',
      'Он всё ещё бежал на полной скорости прямо мимо нас.',
      'Он вообще не бегал, а просто быстро шёл.',
      'Он собирался побежать через пару минут.'
    ],
    correctIndex: 0,
    tags: ['in-progress-vs-prior'],
    explanation: 'had been running (Past Perfect Continuous) описывает процесс, который шёл ДО момента наблюдения и оставил видимый результат/след (одышку). Если бы он бежал в сам момент, было бы was running.'
  },

  {
    id: 'xray_she_knows',
    promptEn: '"We had known each other for ten years when we started the project in 2020."',
    question: 'Можно ли в этой фразе сказать "had been knowing"?',
    options: [
      'Категорически нет: know — это глагол состояния (stative), у него нет формы Continuous.',
      'Да, это абсолютно равнозначные варианты.',
      'Да, если подчеркнуть, что знакомство было очень активным.',
      'Только если заменить had на have.'
    ],
    correctIndex: 0,
    tags: ['stative-lock'],
    explanation: 'Know — классический stative verb. Он не имеет формы Continuous ни в каком времени. Длительность до точки передаётся через Past Perfect Simple: had known.'
  },

  {
    id: 'xray_have_lunch_meeting',
    promptEn: '"When Mark arrived, we were having lunch." vs "When Mark arrived, we had had lunch."',
    question: 'Успел ли Марк поесть вместе с нами?',
    options: [
      'В первой фразе обед был в самом разгаре (он мог присоединиться); во второй — обед уже закончился.',
      'В первой фразе обед уже закончился; во второй — только начинался.',
      'В обеих фразах обед ещё не начинался.',
      'Вторая фраза грамматически ошибочна, потому что два had подряд нельзя ставить.'
    ],
    correctIndex: 0,
    tags: ['have-idioms', 'in-progress-vs-prior'],
    explanation: 'were having lunch = процесс в момент прихода (фон). had had lunch = действие завершилось ДО прихода (двойное had: had + V3 от have).'
  },

  {
    id: 'xray_paint_ceiling',
    promptEn: 'A: "He has painted the ceiling."\nB: "He has been painting the ceiling."',
    question: 'В каком случае потолок уже полностью покрашен?',
    options: [
      'Только в варианте A (Simple выражает завершённый результат).',
      'Только в варианте B (Continuous выражает большой объём работы).',
      'В обоих вариантах работа на 100% завершена.',
      'Ни в одном: обе фразы значат, что покраска ещё идёт.'
    ],
    correctIndex: 0,
    tags: ['process-vs-count'],
    explanation: 'Present Perfect Simple (has painted) фокусируется на завершённом результате (потолок готов). Continuous (has been painting) фокусируется на самом занятии — краска может быть на руках и одежде, а потолок не закончен.'
  },

  {
    id: 'xray_read_book_count',
    promptEn: '"I\'ve been reading all morning, and I\'ve read sixty pages."',
    question: 'Почему в первой части Continuous, а во второй — Simple?',
    options: [
      'В первой части измеряется длительность процесса (how long), а во второй — фиксируется конкретный объём (how much / many).',
      'Во второй части действие произошло раньше, чем в первой.',
      'Это случайный выбор автора, разницы нет.',
      'Continuous нельзя использовать со словом morning.'
    ],
    correctIndex: 0,
    tags: ['process-vs-count'],
    explanation: 'Золотое правило Мерфи: How long → Continuous (been reading all morning); How much / how many / how many times → Simple (have read sixty pages).'
  },

  {
    id: 'xray_this_morning',
    promptEn: 'Сейчас 19:00 вечера. Говорящий произносит: "I didn\'t drink any coffee this morning."',
    question: 'Почему здесь Past Simple, а не Present Perfect?',
    options: [
      'Потому что утро (this morning) к 19:00 уже полностью закончилось — период закрыт.',
      'Потому что отрицания с any никогда не используются в Present Perfect.',
      'Потому что кофе — неисчисляемое существительное.',
      'Здесь грубая ошибка, нужно было сказать "haven\'t drunk".'
    ],
    correctIndex: 0,
    tags: ['open-vs-closed-period'],
    explanation: 'Отрезок this morning в 19:00 уже является закрытым окном в прошлом. Present Perfect был бы уместен только до полудня, пока утро ещё длится.'
  },

  {
    id: 'xray_fail_issue',
    promptEn: '"The database had failed three times before we replaced the drive."',
    question: 'Почему здесь Past Perfect Simple (had failed), а не Continuous (had been failing)?',
    options: [
      'Потому что указан точный счёт событий (three times), что несовместимо с Continuous.',
      'Потому что fail — это stative verb.',
      'Потому что замена диска произошла до падения.',
      'Оба варианта с three times абсолютно допустимы.'
    ],
    correctIndex: 0,
    tags: ['process-vs-count'],
    explanation: 'Счётчик количества раз (three times, twice, five times) фиксирует дискретные завершённые эпизоды. Continuous с числом повторений не употребляется.'
  },

  {
    id: 'xray_waiting_arrival',
    promptEn: '"When I arrived at 12:00, she said she had been waiting since 10:00."',
    question: 'В каком временном отрезке находился процесс ожидания?',
    options: [
      'Строго между 10:00 и 12:00 (до момента прибытия).',
      'Она начала ждать в 12:00.',
      'Она ждёт прямо сейчас во время нашего разговора.',
      'Она не дождалась и ушла в 10:30.'
    ],
    correctIndex: 0,
    tags: ['anchor-present-vs-past'],
    explanation: 'Past Perfect Continuous (had been waiting) связывает начальную точку (since 10:00) с прошлой контрольной точкой (arrived at 12:00).'
  },

  {
    id: 'xray_shakespeare_novels',
    promptEn: 'A: "Shakespeare wrote many plays."\nB: "Stephen King has written many books."',
    question: 'Почему в A стоит Past Simple, а в B — Present Perfect?',
    options: [
      'Потому что жизнь Шекспира — закрытый период в истории, а Стивен Кинг жив и может написать ещё.',
      'Потому что Шекспир писал пьесы, а Кинг — романы.',
      'Потому что в B указано точное число книг.',
      'Это просто стилистическое предпочтение без грамматических правил.'
    ],
    correctIndex: 0,
    tags: ['open-vs-closed-period'],
    explanation: 'Для умерших людей жизненный период закрыт → Past Simple (wrote). Для живых авторов жизненный период открыт до настоящего → Present Perfect (has written).'
  },

  {
    id: 'xray_phone_ownership',
    promptEn: '"How long have you had this phone?"',
    question: 'Почему в этом вопросе используется had, а не been having?',
    options: [
      'Потому что have в значении владения — это stative verb, у него нет Continuous.',
      'Потому что вопрос задаётся о завершённом действии в прошлом.',
      'Потому что со словом phone continuous грамматически запрещён.',
      'Можно сказать и "have you been having", разницы нет.'
    ],
    correctIndex: 0,
    tags: ['stative-lock', 'have-idioms'],
    explanation: 'Владение вещью — стабильное состояние (stative). Continuous запрещён. Правильно: How long have you had...? (Present Perfect Simple).'
  },

  {
    id: 'xray_how_long_vs_when',
    promptEn: 'A: "When did you buy this car?"\nB: "How long have you had this car?"',
    question: 'В чём разница в том, ЧТО именно измеряет каждый вопрос?',
    options: [
      'А спрашивает о конкретном закрытом моменте покупки в прошлом; B измеряет отрезок владения от покупки до сейчас.',
      'А измеряет длительность, а B спрашивает о времени в прошлом.',
      'Оба вопроса значат в точности одно и то же.',
      'Вопрос B означает, что машина уже продана.'
    ],
    correctIndex: 0,
    tags: ['open-vs-closed-period', 'stative-lock'],
    explanation: 'When...? всегда требует Past Simple (точка в прошлом). How long...? для ситуации до настоящего требует Present Perfect (измерение отрезка времени).'
  },

  {
    id: 'xray_it_has_been_months',
    promptEn: '"It\'s been three months since I last saw Mark."',
    question: 'Что выражает конструкция "It\'s been ... since ..."?',
    options: [
      'Сколько времени прошло от момента последнего события в прошлом до настоящего момента.',
      'Что говорящий будет видеть Марка ещё три месяца.',
      'Что Марк уехал три месяца назад и уже вернулся.',
      'Это устаревшая форма, которую сегодня заменяют на Past Simple.'
    ],
    correctIndex: 0,
    tags: ['open-vs-closed-period'],
    explanation: 'It\'s been [период] since [Past Simple] — стандартная формула отсчёта времени от прошлого разового события (last saw) до момента речи (It has been 3 months).'
  },

  {
    id: 'xray_peeling_onions',
    promptEn: '"Why were her eyes red?" — "Because she had been peeling onions."',
    question: 'Чистила ли она лук в момент ответа на вопрос?',
    options: [
      'Нет, процесс уже завершился, но мы видим очевидный физический след процесса (красные глаза).',
      'Да, она продолжала чистить лук прямо во время разговора.',
      'Она только собиралась почистить лук.',
      'Здесь ошибка, нужно было сказать was peeling.'
    ],
    correctIndex: 0,
    tags: ['in-progress-vs-prior'],
    explanation: 'had been peeling (Past Perfect Continuous) объясняет причину состояния в прошлом через только что завершившийся процесс со следом.'
  }
];

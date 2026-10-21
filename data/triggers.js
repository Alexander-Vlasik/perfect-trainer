/**
 * 28 Spot-the-Trigger Blitz Tasks.
 * Trains System 1 instant reflex recognition of marker words without hesitation.
 */

export const TRIGGER_TASKS = [
  // --- 1. since / for (Начало и длительность) ---
  {
    id: 'trig_since_morning',
    marker: 'since 8:30 AM',
    markerCategory: 'since_for',
    markerLabel: 'Маркер: since + точка старта',
    contextRu: 'Рабочий день в разгаре. Процесс начался в 8:30 утра и продолжается прямо сейчас:',
    sentence: 'Sarah _____ on the quarterly report since 8:30 AM.',
    highlightedMarker: 'since 8:30 AM',
    options: [
      { text: 'has been working', isCorrect: true, feedback: '✅ Идеально! Маркер «since» + точное время старта задаёт открытый период, который длится прямо сейчас. Нужен Present Perfect Continuous.' },
      { text: 'worked', isCorrect: false, feedback: '❌ «worked» (Past Simple) закрывает действие в прошлом и не сочетается с предлогом since, связывающим прошлое с настоящим.' },
      { text: 'had worked', isCorrect: false, feedback: '❌ «had worked» (Past Perfect) требует якоря в прошлом («до того как...»), а здесь действие идёт до сегодняшней секунды.' },
      { text: 'is working', isCorrect: false, feedback: '❌ При указании точки отсчёта («since 8:30 AM») обычный Present Continuous грамматически запрещён!' }
    ],
    ruleExplanation: 'Слово «since» фиксирует точку старта открытого периода. Для динамических действий прямо сейчас требуется Present Perfect Continuous (have/has been doing).',
    tag: 'open-vs-closed-period',
    timeline: { anchor: 'present', aspect: 'continuous' }
  },
  {
    id: 'trig_for_hours_now',
    marker: 'for three hours',
    markerCategory: 'since_for',
    markerLabel: 'Маркер: for + длительность (до сих пор)',
    contextRu: 'Курьера всё ещё нет на месте. Человек стоит у двери и ждёт уже три часа:',
    sentence: 'I _____ for the courier for three hours, and I am still waiting.',
    highlightedMarker: 'for three hours',
    options: [
      { text: 'have been waiting', isCorrect: true, feedback: '✅ Точно! Длительность «for three hours» + факт «I am still waiting» = чистый Present Perfect Continuous.' },
      { text: 'waited', isCorrect: false, feedback: '❌ Past Simple означает, что ожидание закончилось в прошлом, а человек всё ещё ждёт!' },
      { text: 'had waited', isCorrect: false, feedback: '❌ Past Perfect уносит действие в предпрошлое, отрывая от настоящего момента.' },
      { text: 'am waiting', isCorrect: false, feedback: '❌ Нельзя использовать Present Continuous с предлогом «for» для указания накопленной длительности.' }
    ],
    ruleExplanation: 'Когда действие длится на протяжении отрезка («for ...») и продолжается в настоящем, используется Present Perfect Continuous.',
    tag: 'anchor-present-vs-past',
    timeline: { anchor: 'present', aspect: 'continuous' }
  },
  {
    id: 'trig_stative_know_since',
    marker: 'since childhood (Stative)',
    markerCategory: 'since_for',
    markerLabel: 'Маркер: since + глагол состояния',
    contextRu: 'Глагол know (знать) — глагол состояния. Мы знакомы с самого детства:',
    sentence: 'We _____ each other since childhood.',
    highlightedMarker: 'since childhood',
    options: [
      { text: 'have known', isCorrect: true, feedback: '✅ Блестяще! Глаголы состояния (know, have, be, understand) не имеют формы Continuous. Даже со словом «since» ставится Simple!' },
      { text: 'have been knowing', isCorrect: false, feedback: '🛑 Ловушка! Глагол «know» — stative verb. Формы «have been knowing» в английском языке не существует.' },
      { text: 'knew', isCorrect: false, feedback: '❌ Past Simple разорвал бы связь с настоящим («мы были знакомы, но больше не общаемся»).' },
      { text: 'know', isCorrect: false, feedback: '❌ Обычный Present Simple («know») не может сочетаться с предлогом «since».' }
    ],
    ruleExplanation: 'Глаголы состояния (know, understand, remember, have, be) блокируют Continuous. Со словом since используется Present Perfect Simple.',
    tag: 'stative-lock',
    timeline: { anchor: 'present', aspect: 'simple' }
  },
  {
    id: 'trig_stative_have_years',
    marker: 'for four years (Stative)',
    markerCategory: 'since_for',
    markerLabel: 'Маркер: for + владение (have)',
    contextRu: 'Ноутбук был куплен 4 года назад и до сих пор служит владельцу:',
    sentence: 'Alex _____ this laptop for four years.',
    highlightedMarker: 'for four years',
    options: [
      { text: 'has had', isCorrect: true, feedback: '✅ Верно! Have в значении «владеть» — глагол состояния. Нужен Present Perfect Simple (has had).' },
      { text: 'has been having', isCorrect: false, feedback: '🛑 «has been having» допустимо только для динамических фраз (having lunch, having a party), но не для обладания вещью!' },
      { text: 'had', isCorrect: false, feedback: '❌ «had» (Past Simple) означало бы, что ноутбука у него уже нет.' },
      { text: 'has', isCorrect: false, feedback: '❌ «has» без перфекта не передаёт длительность «for four years».' }
    ],
    ruleExplanation: 'Have в значении владения — Stative Verb. Длительность «for four years» требует Present Perfect Simple (have/has had).',
    tag: 'stative-lock',
    timeline: { anchor: 'present', aspect: 'simple' }
  },

  // --- 2. It's the first time / It was the first time (Порядковые) ---
  {
    id: 'trig_its_first_time',
    marker: "It's the first time...",
    markerCategory: 'first_time',
    markerLabel: "Маркер: It's the first time",
    contextRu: 'Человек впервые в жизни сел за руль электромобиля прямо сейчас:',
    sentence: "It's the first time Sarah _____ an electric car.",
    highlightedMarker: "It's the first time",
    options: [
      { text: 'has driven', isCorrect: true, feedback: "✅ Золотое правило Мерфи! После конструкции «It's the first time...» в английском языке ВСЕГДА используется Present Perfect Simple." },
      { text: 'drives', isCorrect: false, feedback: "❌ Калька с русского («она первый раз водит»). В английском после «It's the first time» Present Simple запрещён!" },
      { text: 'is driving', isCorrect: false, feedback: "❌ Несмотря на то, что это происходит сейчас, формула «It's the first time» требует только Present Perfect." },
      { text: 'had driven', isCorrect: false, feedback: "❌ «had driven» нужен был бы, если бы стояло «It WAS the first time...»." }
    ],
    ruleExplanation: "Формула «It is the first / second / third time...» в английском языке выражает накопленный опыт к настоящему и строго требует Present Perfect Simple.",
    tag: 'process-vs-count',
    timeline: { anchor: 'present', aspect: 'simple' }
  },
  {
    id: 'trig_it_was_first_time',
    marker: 'It was the first time...',
    markerCategory: 'first_time',
    markerLabel: 'Маркер: It was the first time',
    contextRu: 'Вспоминая прошлый отпуск в Японии: это был первый раз, когда Алекс попробовал фугу:',
    sentence: 'It was the first time Alex _____ authentic fugu.',
    highlightedMarker: 'It was the first time',
    options: [
      { text: 'had tasted', isCorrect: true, feedback: '✅ Идеально! Так как вводная фраза в прошлом («It WAS...»), счётчик опыта фиксируется до той точки → Past Perfect Simple.' },
      { text: 'has tasted', isCorrect: false, feedback: '❌ «has tasted» привязывает результат к настоящему, а здесь вся ситуация происходила в прошлом («It was»).' },
      { text: 'tasted', isCorrect: false, feedback: '❌ Конструкция «It was the first time» требует именно времени предпрошедшего опыта (Past Perfect).' },
      { text: 'was tasting', isCorrect: false, feedback: '❌ Continuous не используется со счётчиками опыта.' }
    ],
    ruleExplanation: 'Если вводная фраза в прошедшем времени («It was the first/second time...»), в придаточном предложении строго требуется Past Perfect Simple (had done).',
    tag: 'anchor-present-vs-past',
    timeline: { anchor: 'past', aspect: 'simple' }
  },
  {
    id: 'trig_its_second_time_crash',
    marker: "It's the second time...",
    markerCategory: 'first_time',
    markerLabel: "Маркер: It's the second time today",
    contextRu: 'Дежурный инженер фиксирует повторный сбой сервера за сегодняшний день:',
    sentence: "It's the second time the server _____ today.",
    highlightedMarker: "It's the second time",
    options: [
      { text: 'has crashed', isCorrect: true, feedback: "✅ Точно! «It's the second time... today» — фиксация счёта инцидентов к текущему моменту через Present Perfect Simple." },
      { text: 'crashes', isCorrect: false, feedback: '❌ Present Simple здесь невозможен.' },
      { text: 'crashed', isCorrect: false, feedback: '❌ Past Simple оторвал бы событие от сегодняшнего незавершённого дня.' },
      { text: 'had crashed', isCorrect: false, feedback: '❌ Якорь находится в настоящем («It is»), поэтому Past Perfect ошибочен.' }
    ],
    ruleExplanation: 'Счётчик повторений в настоящем («It\'s the 2nd/3rd time») требует Present Perfect Simple.',
    tag: 'process-vs-count',
    timeline: { anchor: 'present', aspect: 'simple' }
  },
  {
    id: 'trig_best_movie_ever',
    marker: 'This is the best... I have ever...',
    markerCategory: 'first_time',
    markerLabel: 'Маркер: Превосходная степень + ever',
    contextRu: 'Выходя из кинозала, зритель делится сильнейшим впечатлением за всю свою жизнь:',
    sentence: 'This is the most intriguing movie I _____ in years.',
    highlightedMarker: 'This is the most... in years',
    options: [
      { text: 'have seen', isCorrect: true, feedback: '✅ Превосходная степень («the most intriguing») в связке с жизненным опытом до сегодняшнего дня требует Present Perfect Simple!' },
      { text: 'saw', isCorrect: false, feedback: '❌ Past Simple не подчеркивает сравнение со всем накопленным жизненным опытом.' },
      { text: 'had seen', isCorrect: false, feedback: '❌ Требовалось бы только при «That WAS the most...».' },
      { text: 'see', isCorrect: false, feedback: '❌ Настоящее время здесь грамматически не согласуется с опытом просмотра.' }
    ],
    ruleExplanation: 'Конструкция «This is the best / worst / most ... I have ever done» требует Present Perfect Simple.',
    tag: 'process-vs-count',
    timeline: { anchor: 'present', aspect: 'simple' }
  },

  // --- 3. just / already / yet (Свежие результаты) ---
  {
    id: 'trig_just_news',
    marker: 'just (только что)',
    markerCategory: 'just_already_yet',
    markerLabel: 'Маркер: just (свежая новость)',
    contextRu: 'Письмо было отправлено буквально 5 секунд назад, результат актуален прямо сейчас:',
    sentence: 'I have _____ the invoice to accounting.',
    highlightedMarker: 'have ... sent (just)',
    options: [
      { text: 'just sent', isCorrect: true, feedback: '✅ Верно! Маркер «just» ставится между вспомогательным глаголом have/has и V3: «have just sent».' },
      { text: 'already send', isCorrect: false, feedback: '❌ После have требуется третья форма глагола (sent), а не первая (send).' },
      { text: 'just send', isCorrect: false, feedback: '❌ Нужна третья форма (Past Participle): sent.' },
      { text: 'yet sent', isCorrect: false, feedback: '❌ «yet» употребляется только в отрицаниях и вопросах, и ставится в конце предложения.' }
    ],
    ruleExplanation: 'Слово «just» выражает действие, совершённое только что. Ставится между have/has и третьей формой глагола (V3).',
    tag: 'anchor-present-vs-past',
    timeline: { anchor: 'present', aspect: 'simple' }
  },
  {
    id: 'trig_already_done',
    marker: 'already (раньше ожидаемого)',
    markerCategory: 'just_already_yet',
    markerLabel: 'Маркер: already (уже сделано)',
    contextRu: 'Начальник просит починить принтер, но Алекс справился с этим ещё до его просьбы:',
    sentence: "Don't worry about the printer, Alex _____ it.",
    highlightedMarker: 'already',
    options: [
      { text: 'has already fixed', isCorrect: true, feedback: '✅ Точно! Действие завершено раньше, чем ожидали, и результат налицо прямо сейчас. Present Perfect Simple.' },
      { text: 'already fixed', isCorrect: false, feedback: '❌ В стандартном английском (British / Murphy) для новости с результатом в настоящем обязателен перфект: «has already fixed».' },
      { text: 'had already fixed', isCorrect: false, feedback: '❌ Разговор происходит в настоящем («Don\'t worry»), якоря в прошлом нет.' },
      { text: 'is already fixing', isCorrect: false, feedback: '❌ «is fixing» означает, что он ещё копается в принтере, а принтер уже готов!' }
    ],
    ruleExplanation: 'Маркер «already» подчёркивает завершённость действия к настоящему моменту раньше ожидаемого срока.',
    tag: 'anchor-present-vs-past',
    timeline: { anchor: 'present', aspect: 'simple' }
  },
  {
    id: 'trig_not_yet_negative',
    marker: 'yet (в конце отрицания)',
    markerCategory: 'just_already_yet',
    markerLabel: 'Маркер: not ... yet',
    contextRu: 'Релиз всё ещё готовится, тестирование не завершено к текущей минуте:',
    sentence: 'The QA team _____ the new build yet.',
    highlightedMarker: 'yet',
    options: [
      { text: "hasn't approved", isCorrect: true, feedback: '✅ В яблочко! Маркер «yet» в конце предложения с отрицанием прямо требует Present Perfect Simple (hasn\'t / haven\'t approved).' },
      { text: "didn't approve", isCorrect: false, feedback: '❌ В классической грамматике «yet» требует Present Perfect, а не Past Simple.' },
      { text: "hadn't approved", isCorrect: false, feedback: '❌ Past Perfect потребовался бы только при согласовании с точкой в прошлом («by yesterday»).' },
      { text: "doesn't approve", isCorrect: false, feedback: '❌ Present Simple обозначает регулярное расписание, а не ожидаемый итог к этой минуте.' }
    ],
    ruleExplanation: 'Маркер «yet» ставится в конец отрицательных предложений и выражает ожидание того, что действие произойдёт к настоящему моменту.',
    tag: 'open-vs-closed-period',
    timeline: { anchor: 'present', aspect: 'simple' }
  },
  {
    id: 'trig_yet_question',
    marker: 'yet (в вопросе)',
    markerCategory: 'just_already_yet',
    markerLabel: 'Маркер: yet в вопросе',
    contextRu: 'Вопрос коллеге: пришёл ли курьер к текущей минуте?',
    sentence: '_____ the courier arrived yet?',
    highlightedMarker: 'arrived yet',
    options: [
      { text: 'Has', isCorrect: true, feedback: '✅ «Has the courier arrived yet?» — классический вопрос Present Perfect о наступлении ожидаемого факта к сей секунде.' },
      { text: 'Did', isCorrect: false, feedback: '❌ С «Did» глагол стоял бы в инфинитиве (arrive, а не arrived), и «yet» был бы неуместен.' },
      { text: 'Had', isCorrect: false, feedback: '❌ «Had» потребовало бы контекста прошедшего времени.' },
      { text: 'Is', isCorrect: false, feedback: '❌ С «Is» форма «arrived» образовала бы пассив («является ли курьер прибытым»).' }
    ],
    ruleExplanation: 'Вопросы с маркером «yet» на конце строятся во времени Present Perfect Simple (Have/Has + subject + V3 ... yet?).',
    tag: 'anchor-present-vs-past',
    timeline: { anchor: 'present', aspect: 'simple' }
  },

  // --- 4. so far / count vs how long (Итог vs Процесс) ---
  {
    id: 'trig_so_far_counter',
    marker: 'so far (на данный момент)',
    markerCategory: 'count_process',
    markerLabel: 'Маркер: so far (промежуточный итог)',
    contextRu: 'Рабочий день продолжается. К данному моменту отправлено 4 предложения клиентам:',
    sentence: 'We _____ four proposals so far today.',
    highlightedMarker: 'four proposals so far',
    options: [
      { text: 'have sent', isCorrect: true, feedback: '✅ Точно! Маркер «so far» (на данный момент) + счётчик «four proposals» = строгий Present Perfect Simple.' },
      { text: 'have been sending', isCorrect: false, feedback: '🛑 Ловушка! Continuous запрещён, когда указано конкретное число выполненных объектов (four proposals)!' },
      { text: 'sent', isCorrect: false, feedback: '❌ «sent» (Past Simple) оторвало бы действие от незавершённого сегодняшнего дня.' },
      { text: 'had sent', isCorrect: false, feedback: '❌ Нет точки в прошлом, период открыт прямо сейчас.' }
    ],
    ruleExplanation: 'Счётчики количества объектов (1, 2, 3...) в связке с «so far» или «today» требуют Present Perfect Simple. Continuous при подсчёте штук запрещён!',
    tag: 'process-vs-count',
    timeline: { anchor: 'present', aspect: 'simple' }
  },
  {
    id: 'trig_all_day_process',
    marker: 'all day (весь день напролёт)',
    markerCategory: 'count_process',
    markerLabel: 'Маркер: all day (непрерывный процесс)',
    contextRu: 'Человек валится с ног от усталости, потому что провёл весь день за уборкой:',
    sentence: 'I am exhausted because I _____ the house all day.',
    highlightedMarker: 'all day',
    options: [
      { text: 'have been cleaning', isCorrect: true, feedback: '✅ Идеально! Маркер «all day» подчёркивает непрерывный процесс и его видимый результат сейчас (усталость). Present Perfect Continuous.' },
      { text: 'have cleaned', isCorrect: false, feedback: '❌ Simple фокусируется на факте («дом чист»), а здесь важен видимый эффект изнурительного процесса (I am exhausted).' },
      { text: 'cleaned', isCorrect: false, feedback: '❌ Past Simple не объясняет текущее физическое состояние в настоящем.' },
      { text: 'had been cleaning', isCorrect: false, feedback: '❌ Результат актуален сейчас («I am exhausted»), а не в прошлом («I was exhausted»).' }
    ],
    ruleExplanation: 'Маркеры типа «all day», «all morning» подчёркивают длительность процесса, объясняющего текущее состояние. Требуется Present Perfect Continuous.',
    tag: 'process-vs-count',
    timeline: { anchor: 'present', aspect: 'continuous' }
  },
  {
    id: 'trig_how_many_times',
    marker: 'How many times...?',
    markerCategory: 'count_process',
    markerLabel: 'Маркер: How many times (счётчик раз)',
    contextRu: 'Вопрос о том, сколько раз за сегодня производился звонок:',
    sentence: 'How many times _____ technical support today?',
    highlightedMarker: 'How many times',
    options: [
      { text: 'have you called', isCorrect: true, feedback: '✅ Браво! Вопрос «How many times...?» интересуется количеством повторений, поэтому используется ТОЛЬКО Present Perfect Simple.' },
      { text: 'have you been calling', isCorrect: false, feedback: '🛑 Фатальная ошибка! Нельзя использовать Continuous с вопросом «How many times»!' },
      { text: 'did you call', isCorrect: false, feedback: '❌ В разговорном US допустимо, но по стандарту Murphy при незавершённом периоде («today») требуется Present Perfect.' },
      { text: 'had you called', isCorrect: false, feedback: '❌ Нет якоря в прошлом.' }
    ],
    ruleExplanation: 'Вопрос «How many times?» направлен на подсчёт результата. В отличие от «How long?», он никогда не употребляется с Continuous.',
    tag: 'process-vs-count',
    timeline: { anchor: 'present', aspect: 'simple' }
  },
  {
    id: 'trig_how_long_process',
    marker: 'How long...?',
    markerCategory: 'count_process',
    markerLabel: 'Маркер: How long (длительность процесса)',
    contextRu: 'Интересуемся, сколько времени длится процесс изучения языка:',
    sentence: 'How long _____ English grammar?',
    highlightedMarker: 'How long',
    options: [
      { text: 'have you been learning', isCorrect: true, feedback: '✅ Именно! Вопрос «How long...?» для динамических действий требует Present Perfect Continuous (have you been doing).' },
      { text: 'do you learn', isCorrect: false, feedback: '❌ Калька с русского («как долго ты учишь?»). В английском с вопросом о длительности до сейчас Present Simple невозможен!' },
      { text: 'are you learning', isCorrect: false, feedback: '❌ Present Continuous не может отвечать за накопленный период времени.' },
      { text: 'did you learn', isCorrect: false, feedback: '❌ «did you learn» означает, что обучение уже навсегда закончено.' }
    ],
    ruleExplanation: 'Вопрос «How long?» интересуется продолжительностью процесса, связывающего прошлое с настоящим, и требует Present Perfect Continuous.',
    tag: 'process-vs-count',
    timeline: { anchor: 'present', aspect: 'continuous' }
  },

  // --- 5. by the time / before (Предпрошедшее) ---
  {
    id: 'trig_by_the_time_result',
    marker: 'by the time + Past Simple',
    markerCategory: 'by_the_time',
    markerLabel: 'Маркер: by the time (к тому моменту как)',
    contextRu: 'Гости пришли на вокзал, но поезд ушёл ещё до их прибытия:',
    sentence: 'By the time we arrived at the platform, the express train _____.',
    highlightedMarker: 'By the time we arrived',
    options: [
      { text: 'had already left', isCorrect: true, feedback: '✅ Абсолютно верно! Действие завершилось ДО момента в прошлом («arrived»). Нужен Past Perfect Simple (had left).' },
      { text: 'has already left', isCorrect: false, feedback: '❌ «has left» привязал бы результат к настоящему, а поезд ушёл до момента в прошлом.' },
      { text: 'already left', isCorrect: false, feedback: '❌ Без вспомогательного had не выражается предшествование одного действия другому в прошлом.' },
      { text: 'was already leaving', isCorrect: false, feedback: '❌ Это означало бы, что он отходил прямо у них на глазах, а они увидели лишь пустые рельсы.' }
    ],
    ruleExplanation: 'Оборот «by the time + Past Simple» служит классическим сигналом для Past Perfect в главном предложении.',
    tag: 'anchor-present-vs-past',
    timeline: { anchor: 'past', aspect: 'simple' }
  },
  {
    id: 'trig_by_deadline_yesterday',
    marker: 'by 6 PM yesterday',
    markerCategory: 'by_the_time',
    markerLabel: 'Маркер: by + точное время в прошлом',
    contextRu: 'Отчёт был полностью готов и сдан до наступления 18:00 вчера:',
    sentence: 'By 6 PM yesterday, Sarah _____ the entire report.',
    highlightedMarker: 'By 6 PM yesterday',
    options: [
      { text: 'had finished', isCorrect: true, feedback: '✅ Точно! Предлог «by» с указанием точки в прошлом обозначает завершённость к дедлайну → Past Perfect Simple.' },
      { text: 'finished', isCorrect: false, feedback: '❌ «finished» использовалось бы с предлогом «at 6 PM» (ровно в 6), а «by» требует Past Perfect.' },
      { text: 'has finished', isCorrect: false, feedback: '❌ Слово «yesterday» категорически запрещает Present Perfect.' },
      { text: 'was finishing', isCorrect: false, feedback: '❌ «was finishing» обозначало бы незавершённый процесс ровно в 18:00.' }
    ],
    ruleExplanation: 'Предлог «by» в сочетании с временной точкой в прошлом («by 6 PM yesterday») требует Past Perfect Simple.',
    tag: 'anchor-present-vs-past',
    timeline: { anchor: 'past', aspect: 'simple' }
  },
  {
    id: 'trig_past_perf_cont_before',
    marker: 'had been doing... before',
    markerCategory: 'by_the_time',
    markerLabel: 'Маркер: процесс ДО момента в прошлом',
    contextRu: 'Машина сломалась посреди трассы, но до этой поломки водитель безостановочно ехал 4 часа:',
    sentence: 'When the engine broke down, they _____ for four hours without rest.',
    highlightedMarker: 'for four hours when the engine broke',
    options: [
      { text: 'had been driving', isCorrect: true, feedback: '✅ Блестяще! Длительный процесс продолжался на протяжении 4 часов ДО поломки в прошлом. Чистый Past Perfect Continuous.' },
      { text: 'were driving', isCorrect: false, feedback: '❌ Past Continuous не передаёт длительность ДО момента, а показывает действие прямо в момент поломки.' },
      { text: 'have been driving', isCorrect: false, feedback: '❌ Present Perfect привязал бы действие к сегодняшнему дню, а поломка произошла в прошлом.' },
      { text: 'drove', isCorrect: false, feedback: '❌ Past Simple не подчеркивает непрерывный предшествующий процесс.' }
    ],
    ruleExplanation: 'Если процесс длился на протяжении какого-то времени ДО наступления события в прошлом, используется Past Perfect Continuous (had been doing).',
    tag: 'in-progress-vs-prior',
    timeline: { anchor: 'past', aspect: 'continuous' }
  },
  {
    id: 'trig_before_he_arrived',
    marker: 'before + Past Simple',
    markerCategory: 'by_the_time',
    markerLabel: 'Маркер: действие завершилось before...',
    contextRu: 'Алекс трижды набрал номер начальника до того, как тот лично вошёл в офис:',
    sentence: 'Alex _____ technical support three times before the boss arrived.',
    highlightedMarker: 'before the boss arrived',
    options: [
      { text: 'had called', isCorrect: true, feedback: '✅ Верно! Накопленный счётчик звонков (three times) к моменту появления шефа в прошлом требует Past Perfect Simple.' },
      { text: 'has called', isCorrect: false, feedback: '❌ Появление начальника («arrived») отрезано в прошлом, Present Perfect не подходит.' },
      { text: 'had been calling', isCorrect: false, feedback: '🛑 Со счётчиками количества раз (three times) Continuous запрещён даже в Past Perfect!' },
      { text: 'was calling', isCorrect: false, feedback: '❌ Не сочетается со счётчиком количества раз.' }
    ],
    ruleExplanation: 'Счётчик количества раз до точки в прошлом требует Past Perfect Simple (had called), Continuous исключён.',
    tag: 'process-vs-count',
    timeline: { anchor: 'past', aspect: 'simple' }
  },

  // --- 6. yesterday / ago (Блокираторы: Past Simple) ---
  {
    id: 'trig_ago_blocker',
    marker: '... ago (Блокиратор)',
    markerCategory: 'closed_past',
    markerLabel: 'Маркер-блокиратор: ago',
    contextRu: 'Курьер передал коробку двадцать минут назад и уже уехал:',
    sentence: 'The courier _____ the parcel twenty minutes ago.',
    highlightedMarker: 'twenty minutes ago',
    options: [
      { text: 'delivered', isCorrect: true, feedback: '✅ Железное правило! Слово «ago» намертво отсекает событие в закрытое прошлое. Только Past Simple!' },
      { text: 'has delivered', isCorrect: false, feedback: '🛑 Грубейшая ошибка! Present Perfect НИКОГДА не употребляется со словом «ago»!' },
      { text: 'had delivered', isCorrect: false, feedback: '❌ Past Perfect требует второго действия в прошлом для сравнения («до того как...»).' },
      { text: 'was delivering', isCorrect: false, feedback: '❌ «ago» называет завершённый факт, а не процесс в развитии.' }
    ],
    ruleExplanation: 'Слово «ago» является абсолютным блокиратором Present Perfect. С ним используется строго Past Simple.',
    tag: 'open-vs-closed-period',
    timeline: { anchor: 'past', aspect: 'simple' }
  },
  {
    id: 'trig_yesterday_blocker',
    marker: 'yesterday (Блокиратор)',
    markerCategory: 'closed_past',
    markerLabel: 'Маркер-блокиратор: yesterday',
    contextRu: 'Вчерашний день полностью завершился, обсуждение состоялось вчера:',
    sentence: 'We _____ the new release with the client yesterday.',
    highlightedMarker: 'yesterday',
    options: [
      { text: 'discussed', isCorrect: true, feedback: '✅ Точно! «Yesterday» — маркер завершённого периода в прошлом. Используется только Past Simple.' },
      { text: 'have discussed', isCorrect: false, feedback: '🛑 Главная ловушка русскоязычных! В русском «мы обсудили» связывается с результатом, но в английском слово «yesterday» полностью запрещает Present Perfect!' },
      { text: 'had discussed', isCorrect: false, feedback: '❌ Без указания на предшествование другому прошлому событию Past Perfect избыточен.' },
      { text: 'were discussing', isCorrect: false, feedback: '❌ Без указания конкретного момента («at 3 PM») Past Continuous не используется для констатации факта.' }
    ],
    ruleExplanation: 'Слово «yesterday» отрезает действие от настоящего. Present Perfect строго запрещён грамматикой.',
    tag: 'open-vs-closed-period',
    timeline: { anchor: 'past', aspect: 'simple' }
  },
  {
    id: 'trig_last_week_closed',
    marker: 'last week (Блокиратор)',
    markerCategory: 'closed_past',
    markerLabel: 'Маркер-блокиратор: last week',
    contextRu: 'Ключи потерялись на прошлой неделе, но на следующий день их благополучно нашли:',
    sentence: 'Sarah _____ her office badge last week, but found it the next morning.',
    highlightedMarker: 'last week',
    options: [
      { text: 'lost', isCorrect: true, feedback: '✅ Факт в закрытом периоде «last week» + проблема уже решена («found it») = строгий Past Simple.' },
      { text: 'has lost', isCorrect: false, feedback: '❌ «has lost» означало бы, что бейдж потерян прямо сейчас и дверь заперта.' },
      { text: 'had lost', isCorrect: false, feedback: '❌ В связке последовательных событий прошлого («lost ..., but found ...») используется Past Simple.' },
      { text: 'was losing', isCorrect: false, feedback: '❌ Потеря — мгновенное событие.' }
    ],
    ruleExplanation: 'Если период закрыт («last week») и последствия устранены, используется Past Simple.',
    tag: 'open-vs-closed-period',
    timeline: { anchor: 'past', aspect: 'simple' }
  },
  {
    id: 'trig_in_year_historical',
    marker: 'in 2020 (Историческая дата)',
    markerCategory: 'closed_past',
    markerLabel: 'Маркер: in 2020 (закрытый год)',
    contextRu: 'Компания открыла новый филиал в 2020 году:',
    sentence: 'The founders _____ this startup in 2020.',
    highlightedMarker: 'in 2020',
    options: [
      { text: 'launched', isCorrect: true, feedback: '✅ Конкретная дата в прошлом («in 2020») требует Past Simple (launched).' },
      { text: 'have launched', isCorrect: false, feedback: '🛑 Год 2020 давно завершился. Present Perfect с конкретными годами в прошлом запрещён (в отличие от «since 2020»!).' },
      { text: 'had launched', isCorrect: false, feedback: '❌ Нет предпрошедшего контекста.' },
      { text: 'were launching', isCorrect: false, feedback: '❌ Обозначает факт основания, а не растянутый процесс.' }
    ],
    ruleExplanation: 'Предлог «in» с прошедшим годом («in 2020») требует Past Simple. Не путать с «since 2020», который связывает дату с настоящим!',
    tag: 'open-vs-closed-period',
    timeline: { anchor: 'past', aspect: 'simple' }
  },
  {
    id: 'trig_while_in_progress',
    marker: 'while (фон в прошлом)',
    markerCategory: 'closed_past',
    markerLabel: 'Маркер: while (действие в развитии)',
    contextRu: 'Сайт неожиданно упал прямо в тот момент, когда команда обедала:',
    sentence: 'The alert went off while we _____ lunch together.',
    highlightedMarker: 'while we ... lunch',
    options: [
      { text: 'were having', isCorrect: true, feedback: '✅ Отлично! Маркер «while» задаёт фоновое незавершённое действие в момент прерывания → Past Continuous.' },
      { text: 'had had', isCorrect: false, feedback: '❌ «had had» означало бы, что обед уже полностью завершился до сигнала тревоги.' },
      { text: 'have had', isCorrect: false, feedback: '❌ Сигнал прозвучал в прошлом («went off»), Present Perfect не подходит.' },
      { text: 'had', isCorrect: false, feedback: '❌ Для фонового процесса с «while» более естественен Past Continuous (were having).' }
    ],
    ruleExplanation: 'Слово «while» указывает на протяжённое фоновое действие в прошлом, во время которого произошло другое краткое событие (Past Continuous).',
    tag: 'in-progress-vs-prior',
    timeline: { anchor: 'past', aspect: 'continuous' }
  },
  {
    id: 'trig_at_exact_moment',
    marker: 'at 3:00 PM yesterday',
    markerCategory: 'closed_past',
    markerLabel: 'Маркер: в точную секунду прошлого',
    contextRu: 'Ровно в 15:00 вчера интервью шло полным ходом:',
    sentence: 'At 3:00 PM yesterday, Alex _____ a new candidate.',
    highlightedMarker: 'At 3:00 PM yesterday',
    options: [
      { text: 'was interviewing', isCorrect: true, feedback: '✅ Точная временная засечка в прошлом («at 3 PM yesterday») показывает процесс в самом разгаре → Past Continuous.' },
      { text: 'interviewed', isCorrect: false, feedback: '❌ «interviewed» означало бы, что он начал или закончил интервью ровно в 15:00.' },
      { text: 'had interviewed', isCorrect: false, feedback: '❌ Требовался бы предлог «by 3 PM» (уже провёл к 15:00).' },
      { text: 'has been interviewing', isCorrect: false, feedback: '❌ Слово «yesterday» несовместимо с настоящими перфектными временами.' }
    ],
    ruleExplanation: 'Точный момент в прошлом («at 3:00 PM yesterday») помещает камеру внутрь процесса, требуя Past Continuous.',
    tag: 'in-progress-vs-prior',
    timeline: { anchor: 'past', aspect: 'continuous' }
  }
];

/**
 * 31 Semantic Scenarios (Blueprints) for the Parametric Grammar Generator.
 * Combines subjects, verbs, objects, and time frames into natural English & Russian phrases.
 */

export const SUBJECTS_POOL = [
  { en: 'I', enMid: 'I', ruNom: 'Я', ruMid: 'я', ruGen: 'меня', gender: 'i', presForm: '1s', thirdPerson: false },
  { en: 'Sarah', enMid: 'Sarah', ruNom: 'Сара', ruMid: 'Сара', ruGen: 'Сары', gender: 'f', presForm: '3s', thirdPerson: true },
  { en: 'We', enMid: 'we', ruNom: 'Мы', ruMid: 'мы', ruGen: 'нас', gender: 'pl', presForm: '1pl', thirdPerson: false },
  { en: 'Alex', enMid: 'Alex', ruNom: 'Алекс', ruMid: 'Алекс', ruGen: 'Алекса', gender: 'm', presForm: '3s', thirdPerson: true },
  { en: 'They', enMid: 'they', ruNom: 'Они', ruMid: 'они', ruGen: 'них', gender: 'pl', presForm: '3pl', thirdPerson: false },
  { en: 'My brother', enMid: 'my brother', ruNom: 'Мой брат', ruMid: 'мой брат', ruGen: 'моего брата', gender: 'm', presForm: '3s', thirdPerson: true },
  { en: 'The team', enMid: 'the team', ruNom: 'Команда', ruMid: 'команда', ruGen: 'команды', gender: 'f', presForm: '3s', thirdPerson: true }
];

export const PLURAL_SUBJECTS = [
  { en: 'We', enMid: 'we', ruNom: 'Мы', ruMid: 'мы', ruGen: 'нас', gender: 'pl', presForm: '1pl', thirdPerson: false },
  { en: 'They', enMid: 'they', ruNom: 'Они', ruMid: 'они', ruGen: 'них', gender: 'pl', presForm: '3pl', thirdPerson: false }
];

export const BLUEPRINTS = [
  // --- 1. Dynamic Activities ---
  {
    id: 'wait_courier',
    category: 'activity',
    verbKey: 'wait',
    objectEn: 'for the courier',
    objectRu: 'курьера',
    hint: 'wait for the courier',
    compatibleFrames: ['open_duration', 'present_since', 'past_anchor_duration', 'closed_past_duration', 'frame_all_day', 'frame_ago']
  },
  {
    id: 'debug_server',
    category: 'activity',
    verbKey: 'debug',
    objectEn: 'this critical bug',
    objectRu: 'этот критический баг',
    hint: 'debug this critical bug',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'closed_past_duration', 'present_result', 'frame_just', 'frame_all_day', 'frame_by_deadline', 'frame_first_time_pres', 'frame_first_time_past']
  },
  {
    id: 'work_project',
    category: 'activity',
    verbKey: 'work',
    objectEn: 'on the new release',
    objectRu: 'над новым релизом',
    hint: 'work on the new release',
    compatibleFrames: ['open_duration', 'present_since', 'past_anchor_duration', 'closed_past_duration', 'frame_all_day', 'frame_ago']
  },
  {
    id: 'look_for_keys',
    category: 'activity',
    verbKey: 'look_for',
    objectEn: 'the car keys',
    objectRu: 'ключи от машины',
    hint: 'look for the car keys',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'closed_past_duration', 'present_result', 'frame_all_day']
  },
  {
    id: 'fix_printer',
    category: 'activity',
    verbKey: 'fix',
    objectEn: 'the office printer',
    objectRu: 'офисный принтер',
    hint: 'fix the office printer',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'present_result', 'frame_just', 'frame_by_deadline', 'frame_first_time_pres', 'frame_first_time_past', 'frame_ago']
  },
  {
    id: 'learn_english',
    category: 'activity',
    verbKey: 'learn',
    objectEn: 'English grammar',
    objectRu: 'английскую грамматику',
    hint: 'learn English grammar',
    compatibleFrames: ['open_duration', 'present_since', 'past_anchor_duration', 'closed_past_duration', 'frame_all_day']
  },
  {
    id: 'read_doc',
    category: 'activity',
    verbKey: 'read',
    objectEn: 'the API documentation',
    objectRu: 'документацию к API',
    hint: 'read the API documentation',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'present_result', 'frame_all_day', 'frame_just', 'frame_by_deadline']
  },
  {
    id: 'write_report',
    category: 'activity',
    verbKey: 'write',
    objectEn: 'the quarterly report',
    objectRu: 'квартальный отчёт',
    hint: 'write the quarterly report',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'present_result', 'frame_just', 'frame_by_deadline', 'frame_all_day', 'frame_ago']
  },
  {
    id: 'drive_car',
    category: 'activity',
    verbKey: 'drive',
    objectEn: 'without any rest',
    objectRu: 'без отдыха',
    hint: 'drive without any rest',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'closed_past_duration', 'frame_first_time_pres', 'frame_first_time_past']
  },
  {
    id: 'cook_dinner',
    category: 'activity',
    verbKey: 'cook',
    objectEn: 'dinner for everyone',
    objectRu: 'ужин для всех',
    hint: 'cook dinner for everyone',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'present_result', 'frame_just', 'frame_by_deadline', 'frame_first_time_pres', 'frame_first_time_past', 'frame_ago']
  },
  {
    id: 'clean_apartment',
    category: 'activity',
    verbKey: 'clean',
    objectEn: 'the apartment',
    objectRu: 'квартиру',
    hint: 'clean the apartment',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'present_result', 'frame_just', 'frame_all_day', 'frame_by_deadline', 'frame_ago']
  },
  {
    id: 'run_in_park',
    category: 'activity',
    verbKey: 'run',
    objectEn: 'in the park',
    objectRu: 'в парке',
    hint: 'run in the park',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'closed_past_duration', 'frame_ago']
  },
  {
    id: 'call_support',
    category: 'activity',
    verbKey: 'call',
    objectEn: 'technical support',
    objectRu: 'в техподдержку',
    hint: 'call technical support',
    compatibleFrames: ['present_count', 'past_anchor_count', 'open_duration', 'past_anchor_duration', 'frame_so_far']
  },
  {
    id: 'live_city',
    category: 'activity_living',
    verbKey: 'live',
    objectEn: 'in this city',
    objectRu: 'в этом городе',
    hint: 'live in this city',
    compatibleFrames: ['open_duration', 'present_since', 'past_anchor_duration', 'closed_past_years']
  },
  {
    id: 'watch_series',
    category: 'activity',
    verbKey: 'watch',
    objectEn: 'this detective show',
    objectRu: 'этот детективный сериал',
    hint: 'watch this detective show',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'frame_all_day']
  },

  // --- 2. Stative Verbs (Lock Continuous!) ---
  {
    id: 'know_each_other',
    category: 'stative_know',
    verbKey: 'know',
    objectEn: 'each other',
    objectRu: 'друг друга',
    onlyPlural: true,
    hint: 'know each other',
    compatibleFrames: ['stative_open_duration', 'stative_since', 'stative_past_anchor', 'closed_past_years']
  },
  {
    id: 'have_laptop',
    category: 'stative_have',
    verbKey: 'have_stative',
    objectEn: 'this laptop',
    objectRu: 'этот рабочий ноутбук',
    hint: 'have this laptop',
    compatibleFrames: ['stative_open_duration', 'stative_since', 'stative_past_anchor', 'closed_past_years']
  },
  {
    id: 'be_friends',
    category: 'stative_friends',
    verbKey: 'be',
    objectEn: 'close friends',
    objectRu: 'близкими друзьями',
    onlyPlural: true,
    hint: 'be close friends',
    compatibleFrames: ['stative_open_duration', 'stative_since', 'stative_past_anchor', 'closed_past_years']
  },
  {
    id: 'understand_problem',
    category: 'stative',
    verbKey: 'understand',
    objectEn: 'the core problem',
    objectRu: 'суть проблемы',
    hint: 'understand the core problem',
    compatibleFrames: ['stative_open_duration', 'stative_past_anchor']
  },
  {
    id: 'be_married',
    category: 'stative_married',
    verbKey: 'be',
    objectEn: 'happily married',
    objectRu: 'в счастливом браке',
    onlyPlural: true,
    hint: 'be happily married',
    compatibleFrames: ['stative_open_duration', 'stative_since', 'stative_past_anchor', 'closed_past_years']
  },

  // --- 3. Dynamic Have Expressions ---
  {
    id: 'have_lunch',
    category: 'have_idiom',
    verbKey: 'have_dynamic',
    objectEn: 'lunch with colleagues',
    objectRu: 'с коллегами',
    hint: 'have lunch with colleagues',
    compatibleFrames: ['past_moment_in_progress', 'present_result', 'past_anchor_result', 'closed_past_duration', 'frame_just', 'frame_ago']
  },
  {
    id: 'have_shower',
    category: 'have_idiom',
    verbKey: 'have_dynamic',
    objectEn: 'a warm shower',
    objectRu: 'тёплый душ',
    hint: 'have a warm shower',
    compatibleFrames: ['past_moment_in_progress', 'present_result', 'past_anchor_result', 'frame_just']
  },
  {
    id: 'have_meeting',
    category: 'have_idiom',
    verbKey: 'have_dynamic',
    objectEn: 'an urgent meeting',
    objectRu: 'срочную встречу',
    hint: 'have an urgent meeting',
    compatibleFrames: ['past_moment_in_progress', 'open_duration', 'past_anchor_duration', 'present_result', 'frame_just', 'frame_by_deadline']
  },
  {
    id: 'have_break',
    category: 'have_idiom',
    verbKey: 'have_dynamic',
    objectEn: 'a short coffee break',
    objectRu: 'перерыв на кофе',
    hint: 'have a short coffee break',
    compatibleFrames: ['past_moment_in_progress', 'present_result', 'past_anchor_result', 'frame_just']
  },

  // --- 4. Instant Results & Changes ---
  {
    id: 'lose_keys',
    category: 'result_keys',
    verbKey: 'lose',
    objectEn: 'the office keys',
    objectRu: 'ключи от офиса',
    hint: 'lose the office keys',
    compatibleFrames: ['present_result_lost', 'past_anchor_result_lost', 'closed_past_lost', 'frame_first_time_pres', 'frame_first_time_past']
  },
  {
    id: 'find_solution',
    category: 'result',
    verbKey: 'find',
    objectEn: 'the right solution',
    objectRu: 'верное решение',
    hint: 'find the right solution',
    compatibleFrames: ['present_result', 'past_anchor_result', 'frame_just', 'frame_by_deadline', 'frame_first_time_pres', 'frame_first_time_past']
  },
  {
    id: 'send_proposal',
    category: 'result',
    verbKey: 'send',
    objectEn: 'the project proposal',
    objectRu: 'предложение по проекту',
    hint: 'send the project proposal',
    compatibleFrames: ['present_result', 'past_anchor_result', 'present_count', 'frame_just', 'frame_so_far', 'frame_by_deadline', 'frame_ago']
  },
  {
    id: 'break_phone',
    category: 'result',
    verbKey: 'break',
    objectEn: 'the smartphone screen',
    objectRu: 'экран смартфона',
    hint: 'break the smartphone screen',
    compatibleFrames: ['present_result', 'past_anchor_result', 'frame_just', 'frame_first_time_pres', 'frame_first_time_past', 'frame_ago']
  },
  {
    id: 'prices_fall',
    category: 'result_event',
    verbKey: 'fall',
    subjectOverride: { en: 'Prices', enMid: 'prices', ruNom: 'Цены', ruMid: 'цены', ruGen: 'цен', gender: 'pl', presForm: '3pl', thirdPerson: false },
    objectEn: 'significantly',
    objectRu: 'заметно',
    hint: 'prices fall significantly',
    compatibleFrames: ['present_result', 'past_anchor_result', 'closed_past_event', 'frame_just']
  },
  {
    id: 'crash_database',
    category: 'result_event',
    verbKey: 'crash',
    subjectOverride: { en: 'The database', enMid: 'the database', ruNom: 'База данных', ruMid: 'база данных', ruGen: 'базы данных', gender: 'f', presForm: '3s', thirdPerson: true },
    objectEn: 'completely',
    objectRu: 'полностью',
    hint: 'the database crash completely',
    compatibleFrames: ['present_result', 'past_anchor_result', 'closed_past_event', 'frame_first_time_pres', 'frame_first_time_past']
  },
  {
    id: 'system_fail',
    category: 'result_event',
    verbKey: 'fail',
    subjectOverride: { en: 'The server', enMid: 'the server', ruNom: 'Сервер', ruMid: 'сервер', ruGen: 'сервера', gender: 'm', presForm: '3s', thirdPerson: true },
    objectEn: 'unexpectedly',
    objectRu: 'неожиданно',
    hint: 'the server fail unexpectedly',
    compatibleFrames: ['present_result', 'past_anchor_result', 'closed_past_event', 'frame_first_time_pres', 'frame_first_time_past']
  }
];

export const TIME_FRAMES = {
  // 1. since / for (Начало и длительность)
  open_duration: {
    tense: 'present_perfect_continuous',
    tag: 'anchor-present-vs-past',
    markerCategory: 'since_for',
    timeEn: 'for two hours already',
    timeRu: 'уже два часа',
    timePosition: 'end',
    explanation: 'Маркер «for two hours»: действие началось в прошлом и длится прямо сейчас. Нужен Present Perfect Continuous (have/has been doing).'
  },
  present_since: {
    tense: 'present_perfect_continuous',
    tag: 'open-vs-closed-period',
    markerCategory: 'since_for',
    timeEn: 'since early morning',
    timeRu: 'с самого утра',
    timePosition: 'end',
    explanation: 'Маркер «since» задаёт точку отсчёта открытого периода, длящегося прямо сейчас. Нужен Present Perfect Continuous.'
  },
  stative_open_duration: {
    tense: 'present_perfect_simple',
    tag: 'stative-lock',
    markerCategory: 'since_for',
    timeEn: 'for five years',
    timeRu: 'уже пять лет',
    timePosition: 'end',
    explanation: 'Глагол состояния (stative) даже при маркере «for 5 years» требует Simple: have/has known, have/has had, have/has been.'
  },
  stative_since: {
    tense: 'present_perfect_simple',
    tag: 'stative-lock',
    markerCategory: 'since_for',
    timeEn: 'since 2020',
    timeRu: 'с 2020 года',
    timePosition: 'end',
    explanation: 'Stative verb с маркером «since»: связь с настоящим передаётся через Present Perfect Simple (have/has known/had/been).'
  },

  // 2. It's the first time / It was the first time (Порядковые)
  frame_first_time_pres: {
    tense: 'present_perfect_simple',
    tag: 'process-vs-count',
    markerCategory: 'first_time',
    prefixEn: "It's the first time",
    prefixRu: 'Это первый раз, когда',
    timeEn: '',
    timeRu: '',
    explanation: "Золотое правило: формула «It is the first/second time...» в английском ВСЕГДА требует Present Perfect Simple (накопленный счётчик опыта к настоящему)."
  },
  frame_first_time_past: {
    tense: 'past_perfect_simple',
    tag: 'anchor-present-vs-past',
    markerCategory: 'first_time',
    prefixEn: "It was the first time",
    prefixRu: 'Это был первый раз, когда',
    timeEn: '',
    timeRu: '',
    explanation: "Формула «It was the first/second time...» фиксирует опыт ДО момента в прошлом → Past Perfect Simple (had done)."
  },

  // 3. just / already / yet (Свежие факты)
  present_result: {
    tense: 'present_perfect_simple',
    tag: 'anchor-present-vs-past',
    markerCategory: 'just_already_yet',
    timeEn: 'already',
    timeRu: 'уже',
    timePosition: 'mid',
    explanation: 'Маркер «already» (уже): действие завершено раньше ожидаемого срока, факт актуален прямо сейчас. Present Perfect Simple.'
  },
  frame_just: {
    tense: 'present_perfect_simple',
    tag: 'anchor-present-vs-past',
    markerCategory: 'just_already_yet',
    timeEn: 'just',
    timeRu: 'только что',
    timePosition: 'mid',
    explanation: 'Маркер «just» (только что): свежайшая новость к моменту речи → Present Perfect Simple (have/has just done).'
  },
  present_result_lost: {
    tense: 'present_perfect_simple',
    tag: 'anchor-present-vs-past',
    markerCategory: 'just_already_yet',
    timeEn: 'and cannot get in right now',
    timeRu: 'и прямо сейчас не может попасть внутрь',
    explanation: 'Результат сейчас: ключи потеряны, прямо сейчас дверь заперта. Present Perfect Simple (have/has lost).'
  },

  // 4. so far / счётчики vs all day (Итог / Процесс)
  present_count: {
    tense: 'present_perfect_simple',
    tag: 'process-vs-count',
    markerCategory: 'count_process',
    timeEn: 'three times today',
    timeRu: 'сегодня уже три раза',
    timePosition: 'end',
    explanation: 'Счётчик количества раз («three times») фиксирует число результатов, а не процесс! Continuous запрещён, нужен Present Perfect Simple (have/has done).'
  },
  past_anchor_count: {
    tense: 'past_perfect_simple',
    tag: 'process-vs-count',
    markerCategory: 'count_process',
    clauseEn: 'before the boss arrived',
    clauseRu: 'до того, как пришёл начальник',
    timeEn: 'three times',
    timeRu: 'уже три раза',
    explanation: 'Счёт до точки в прошлом: накопленный итог к моменту в прошлом требует Past Perfect Simple (had done).'
  },
  frame_so_far: {
    tense: 'present_perfect_simple',
    tag: 'process-vs-count',
    markerCategory: 'count_process',
    timeEn: 'so far',
    timeRu: 'к данному моменту',
    timePosition: 'end',
    explanation: 'Маркер «so far» (на данный момент / до сих пор) фиксирует промежуточный итог к настоящему → Present Perfect Simple.'
  },
  frame_all_day: {
    tense: 'present_perfect_continuous',
    tag: 'process-vs-count',
    markerCategory: 'count_process',
    timeEn: 'all day',
    timeRu: 'весь день',
    timePosition: 'end',
    explanation: 'Маркер «all day / all morning» подчёркивает непрерывный длительный процесс → Present Perfect Continuous (have/has been doing).'
  },

  // 5. by the time / before (Предпрошедшее)
  past_anchor_duration: {
    tense: 'past_perfect_continuous',
    tag: 'anchor-present-vs-past',
    markerCategory: 'by_the_time',
    clauseEn: 'when the electricity went out',
    clauseRu: 'когда отключилось электричество',
    timeEn: 'for two hours',
    timeRu: 'уже два часа',
    explanation: 'Камера в прошлом: процесс продолжался ДО конкретного момента в прошлом (when electricity went out). Нужен Past Perfect Continuous (had been doing).'
  },
  past_anchor_result: {
    tense: 'past_perfect_simple',
    tag: 'anchor-present-vs-past',
    markerCategory: 'by_the_time',
    clauseEn: 'by the time we arrived',
    clauseRu: 'к тому моменту, как мы пришли',
    timeEn: 'already',
    timeRu: 'уже',
    explanation: 'Маркер «by the time»: действие завершилось ДО точки в прошлом. Past Perfect Simple (had done).'
  },
  past_anchor_result_lost: {
    tense: 'past_perfect_simple',
    tag: 'anchor-present-vs-past',
    markerCategory: 'by_the_time',
    clauseEn: 'so the door was locked when we arrived',
    clauseRu: 'поэтому дверь была заперта, когда мы пришли',
    explanation: 'Ключи были потеряны ДО момента прихода. Past Perfect Simple (had lost).'
  },
  stative_past_anchor: {
    tense: 'past_perfect_simple',
    tag: 'stative-lock',
    markerCategory: 'by_the_time',
    clauseEn: 'when they started the company in 2021',
    clauseRu: 'когда они основали компанию в 2021 году',
    timeEn: 'for five years',
    timeRu: 'уже пять лет',
    explanation: 'Состояние длилось до момента в прошлом: для stative verb нужен Past Perfect Simple (had known/had had/had been).'
  },
  frame_by_deadline: {
    tense: 'past_perfect_simple',
    tag: 'anchor-present-vs-past',
    markerCategory: 'by_the_time',
    clauseEn: 'by 5 PM yesterday',
    clauseRu: 'к 17:00 вчера',
    timeEn: '',
    timeRu: '',
    explanation: 'Маркер «by» с точной точкой в прошлом («by 5 PM yesterday») задаёт дедлайн в прошлом → Past Perfect Simple.'
  },

  // 6. yesterday / ago (Блокираторы: Past Simple)
  closed_past_duration: {
    tense: 'past_simple',
    tag: 'open-vs-closed-period',
    markerCategory: 'closed_past',
    clauseEn: 'yesterday',
    clauseRu: 'вчера',
    timeEn: 'for two hours and then left',
    timeRu: 'два часа, а затем ушёл/ушла',
    explanation: 'Закрытый период в прошлом: вчерашнее действие полностью завершено и отрезано от настоящего. Нужен Past Simple.'
  },
  closed_past_years: {
    tense: 'past_simple',
    tag: 'open-vs-closed-period',
    markerCategory: 'closed_past',
    clauseEn: 'from 2015 to 2020',
    clauseRu: 'с 2015 по 2020 год',
    timeEn: 'from 2015 to 2020',
    timeRu: 'с 2015 по 2020 год',
    timePosition: 'end',
    explanation: 'Отрезок времени строго зафиксирован в прошлом (from 2015 to 2020) и закрыт. Нужен Past Simple.'
  },
  closed_past_event: {
    tense: 'past_simple',
    tag: 'open-vs-closed-period',
    markerCategory: 'closed_past',
    clauseEn: 'yesterday',
    clauseRu: 'вчера',
    timeEn: 'yesterday',
    timeRu: 'вчера',
    explanation: 'Маркер-блокиратор «yesterday»: закрытое разовое событие в прошлом. Нужен Past Simple.'
  },
  closed_past_lost: {
    tense: 'past_simple',
    tag: 'open-vs-closed-period',
    markerCategory: 'closed_past',
    clauseEn: 'last week',
    clauseRu: 'На прошлой неделе',
    timeEn: 'but found them the next day',
    timeRu: 'но нашёл их на следующий день',
    explanation: 'Закрытый эпизод в прошлом: ключи уже нашлись, проблема в прошлом. Past Simple (lost).'
  },
  past_moment_in_progress: {
    tense: 'past_continuous',
    tag: 'in-progress-vs-prior',
    markerCategory: 'closed_past',
    clauseEn: 'when I called',
    clauseRu: 'когда я позвонил',
    explanation: 'Действие происходило прямо в сам момент звонка (фон), а не ДО него. Нужен Past Continuous (was/were doing).'
  },
  frame_ago: {
    tense: 'past_simple',
    tag: 'open-vs-closed-period',
    markerCategory: 'closed_past',
    timeEn: 'two hours ago',
    timeRu: 'два часа назад',
    timePosition: 'end',
    explanation: 'Маркер «ago» (два часа назад) — абсолютный блокиратор Present Perfect. Действие оторвано от настоящего и требует Past Simple.'
  }
};

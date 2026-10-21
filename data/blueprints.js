/**
 * 30+ Semantic Scenarios (Blueprints) for the Parametric Grammar Generator.
 * Combines subjects, verbs, objects, and time frames into thousands of coherent variations.
 */

export const BLUEPRINTS = [
  // --- 1. Dynamic Activities ---
  {
    id: 'wait_courier',
    category: 'activity',
    verbKey: 'wait',
    objectEn: 'for the courier',
    objectRu: 'курьера',
    hint: 'wait for the courier',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'closed_past_duration', 'present_count']
  },
  {
    id: 'debug_server',
    category: 'activity',
    verbKey: 'debug',
    objectEn: 'this critical bug',
    objectRu: 'этот критический баг',
    hint: 'debug this critical bug',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'closed_past_duration', 'present_result']
  },
  {
    id: 'work_project',
    category: 'activity',
    verbKey: 'work',
    objectEn: 'on the new release',
    objectRu: 'над новым релизом',
    hint: 'work on the new release',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'closed_past_duration', 'present_since']
  },
  {
    id: 'look_for_keys',
    category: 'activity',
    verbKey: 'look_for',
    objectEn: 'the car keys',
    objectRu: 'ключи от машины',
    hint: 'look for the car keys',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'closed_past_duration', 'present_result']
  },
  {
    id: 'fix_printer',
    category: 'activity',
    verbKey: 'fix',
    objectEn: 'the office printer',
    objectRu: 'офисный принтер',
    hint: 'fix the office printer',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'present_result', 'present_count']
  },
  {
    id: 'learn_english',
    category: 'activity',
    verbKey: 'learn',
    objectEn: 'English grammar',
    objectRu: 'английскую грамматику',
    hint: 'learn English grammar',
    compatibleFrames: ['open_duration', 'present_since', 'past_anchor_duration', 'closed_past_duration']
  },
  {
    id: 'read_doc',
    category: 'activity',
    verbKey: 'read',
    objectEn: 'the API documentation',
    objectRu: 'документацию к API',
    hint: 'read the API documentation',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'present_count', 'present_result']
  },
  {
    id: 'write_report',
    category: 'activity',
    verbKey: 'write',
    objectEn: 'the quarterly report',
    objectRu: 'квартальный отчёт',
    hint: 'write the quarterly report',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'present_result', 'present_count']
  },
  {
    id: 'drive_car',
    category: 'activity',
    verbKey: 'drive',
    objectEn: 'without any rest',
    objectRu: 'без отдыха за рулём',
    hint: 'drive without any rest',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'closed_past_duration']
  },
  {
    id: 'cook_dinner',
    category: 'activity',
    verbKey: 'cook',
    objectEn: 'dinner for everyone',
    objectRu: 'ужин для всех',
    hint: 'cook dinner for everyone',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'present_result']
  },
  {
    id: 'clean_apartment',
    category: 'activity',
    verbKey: 'clean',
    objectEn: 'the apartment',
    objectRu: 'квартиру',
    hint: 'clean the apartment',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'present_result']
  },
  {
    id: 'run_in_park',
    category: 'activity',
    verbKey: 'run',
    objectEn: 'in the morning park',
    objectRu: 'в утреннем парке',
    hint: 'run in the morning park',
    compatibleFrames: ['open_duration', 'past_anchor_duration', 'closed_past_duration']
  },
  {
    id: 'call_support',
    category: 'activity',
    verbKey: 'call',
    objectEn: 'technical support',
    objectRu: 'в техподдержку',
    hint: 'call technical support',
    compatibleFrames: ['present_count', 'past_anchor_count', 'open_duration', 'past_anchor_duration']
  },
  {
    id: 'live_city',
    category: 'activity',
    verbKey: 'live',
    objectEn: 'in this neighborhood',
    objectRu: 'в этом районе',
    hint: 'live in this neighborhood',
    compatibleFrames: ['open_duration', 'present_since', 'past_anchor_duration', 'closed_past_duration']
  },
  {
    id: 'watch_series',
    category: 'activity',
    verbKey: 'watch',
    objectEn: 'this detective show',
    objectRu: 'этот детективный сериал',
    hint: 'watch this detective show',
    compatibleFrames: ['open_duration', 'present_count', 'past_anchor_duration']
  },

  // --- 2. Stative Verbs (Lock Continuous!) ---
  {
    id: 'know_each_other',
    category: 'stative',
    verbKey: 'know',
    objectEn: 'each other',
    objectRu: 'друг друга',
    hint: 'know each other',
    compatibleFrames: ['stative_open_duration', 'stative_since', 'stative_past_anchor', 'closed_past_duration']
  },
  {
    id: 'have_laptop',
    category: 'stative',
    verbKey: 'have_stative',
    objectEn: 'this laptop',
    objectRu: 'этот рабочий ноутбук',
    hint: 'have this laptop',
    compatibleFrames: ['stative_open_duration', 'stative_since', 'stative_past_anchor', 'closed_past_duration']
  },
  {
    id: 'be_friends',
    category: 'stative',
    verbKey: 'be',
    objectEn: 'close friends',
    objectRu: 'близкими друзьями',
    hint: 'be close friends',
    compatibleFrames: ['stative_open_duration', 'stative_since', 'stative_past_anchor']
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
    category: 'stative',
    verbKey: 'be',
    objectEn: 'happily married',
    objectRu: 'в счастливом браке',
    hint: 'be happily married',
    compatibleFrames: ['stative_open_duration', 'stative_since', 'stative_past_anchor']
  },
  {
    id: 'remember_details',
    category: 'stative',
    verbKey: 'remember',
    objectEn: 'every single detail',
    objectRu: 'каждую деталь',
    hint: 'remember every single detail',
    compatibleFrames: ['stative_open_duration', 'stative_past_anchor']
  },

  // --- 3. Dynamic Have Expressions (Continuous & Perfects Allowed!) ---
  {
    id: 'have_lunch',
    category: 'have_idiom',
    verbKey: 'have_dynamic',
    objectEn: 'lunch with colleagues',
    objectRu: 'обед с коллегами',
    hint: 'have lunch with colleagues',
    compatibleFrames: ['past_moment_in_progress', 'present_result', 'past_anchor_result', 'closed_past_duration']
  },
  {
    id: 'have_shower',
    category: 'have_idiom',
    verbKey: 'have_dynamic',
    objectEn: 'a warm shower',
    objectRu: 'тёплый душ',
    hint: 'have a warm shower',
    compatibleFrames: ['past_moment_in_progress', 'present_result', 'past_anchor_result']
  },
  {
    id: 'have_meeting',
    category: 'have_idiom',
    verbKey: 'have_dynamic',
    objectEn: 'an urgent meeting',
    objectRu: 'срочную встречу',
    hint: 'have an urgent meeting',
    compatibleFrames: ['past_moment_in_progress', 'open_duration', 'past_anchor_duration', 'present_result']
  },
  {
    id: 'have_break',
    category: 'have_idiom',
    verbKey: 'have_dynamic',
    objectEn: 'a short coffee break',
    objectRu: 'короткий перерыв на кофе',
    hint: 'have a short coffee break',
    compatibleFrames: ['past_moment_in_progress', 'present_result', 'past_anchor_result']
  },
  {
    id: 'have_party',
    category: 'have_idiom',
    verbKey: 'have_dynamic',
    objectEn: 'a birthday party',
    objectRu: 'вечеринку в честь дня рождения',
    hint: 'have a birthday party',
    compatibleFrames: ['closed_past_duration', 'past_moment_in_progress', 'past_anchor_result']
  },

  // --- 4. Instant Results & Changes ---
  {
    id: 'lose_keys',
    category: 'result',
    verbKey: 'lose',
    objectEn: 'the office keys',
    objectRu: 'ключи от офиса',
    hint: 'lose the office keys',
    compatibleFrames: ['present_result_lost', 'past_anchor_result_lost', 'closed_past_lost']
  },
  {
    id: 'find_solution',
    category: 'result',
    verbKey: 'find',
    objectEn: 'the right solution',
    objectRu: 'верное решение',
    hint: 'find the right solution',
    compatibleFrames: ['present_result', 'past_anchor_result', 'closed_past_duration']
  },
  {
    id: 'crash_database',
    category: 'result',
    verbKey: 'crash',
    objectEn: 'completely',
    objectRu: 'полностью',
    hint: 'crash completely',
    compatibleFrames: ['present_result', 'past_anchor_result', 'closed_past_duration']
  },
  {
    id: 'send_proposal',
    category: 'result',
    verbKey: 'send',
    objectEn: 'the project proposal',
    objectRu: 'предложение по проекту',
    hint: 'send the project proposal',
    compatibleFrames: ['present_result', 'past_anchor_result', 'present_count']
  },
  {
    id: 'prices_fall',
    category: 'result',
    verbKey: 'fall',
    objectEn: 'significantly',
    objectRu: 'заметно',
    hint: 'fall significantly',
    compatibleFrames: ['present_result', 'past_anchor_result', 'closed_past_duration']
  }
];

export const SUBJECTS_POOL = [
  { en: 'I', ru: 'Я', isPlural: false, thirdPerson: false },
  { en: 'Sarah', ru: 'Сара', isPlural: false, thirdPerson: true },
  { en: 'We', ru: 'Мы', isPlural: true, thirdPerson: false },
  { en: 'Alex', ru: 'Алекс', isPlural: false, thirdPerson: true },
  { en: 'They', ru: 'Они', isPlural: true, thirdPerson: false },
  { en: 'My brother', ru: 'Мой брат', isPlural: false, thirdPerson: true },
  { en: 'The team', ru: 'Команда', isPlural: false, thirdPerson: true }
];

export const TIME_FRAMES = {
  // Activity open duration -> Present Perfect Continuous
  open_duration: {
    tense: 'present_perfect_continuous',
    tag: 'anchor-present-vs-past',
    timeEn: 'for two hours already',
    timeRu: 'уже два часа',
    timePosition: 'end',
    explanation: 'Камера сейчас: действие началось в прошлом и длится до настоящего момента. Нужен Present Perfect Continuous (have/has been doing).'
  },
  present_since: {
    tense: 'present_perfect_continuous',
    tag: 'open-vs-closed-period',
    timeEn: 'since early morning',
    timeRu: 'с самого раннего утра',
    timePosition: 'end',
    explanation: 'Открытый период: точка отсчёта since задаёт начало процесса, который продолжается прямо сейчас.'
  },
  past_anchor_duration: {
    tense: 'past_perfect_continuous',
    tag: 'anchor-present-vs-past',
    clauseEn: 'when the electricity went out',
    clauseRu: 'когда отключилось электричество',
    timeEn: 'for two hours',
    timeRu: 'уже два часа',
    explanation: 'Камера в прошлом: процесс продолжался ДО конкретного момента в прошлом (when electricity went out). Нужен Past Perfect Continuous (had been doing).'
  },
  closed_past_duration: {
    tense: 'past_simple',
    tag: 'open-vs-closed-period',
    clauseEn: 'yesterday',
    clauseRu: 'вчера',
    timeEn: 'for two hours and then stopped',
    timeRu: 'два часа, а затем закончил(а/и)',
    explanation: 'Закрытый период в прошлом: вчерашнее действие полностью завершено и отрезано от настоящего. Нужен Past Simple.'
  },
  present_count: {
    tense: 'present_perfect_simple',
    tag: 'process-vs-count',
    timeEn: 'three times today',
    timeRu: 'уже три раза за сегодня',
    timePosition: 'end',
    explanation: 'Счётчик количества раз (three times) фиксирует накопленный итог, а не процесс! Continuous запрещён, нужен Present Perfect Simple (have/has done).'
  },
  past_anchor_count: {
    tense: 'past_perfect_simple',
    tag: 'process-vs-count',
    clauseEn: 'before the boss arrived',
    clauseRu: 'до того, как пришёл начальник',
    timeEn: 'three times',
    timeRu: 'уже три раза',
    explanation: 'Счёт до точки в прошлом: накопленный итог к моменту в прошлом требует Past Perfect Simple (had done).'
  },
  present_result: {
    tense: 'present_perfect_simple',
    tag: 'anchor-present-vs-past',
    timeEn: 'already',
    timeRu: 'уже',
    timePosition: 'mid',
    explanation: 'Свежая новость / результат в настоящем: действие завершено, важен факт прямо сейчас. Present Perfect Simple.'
  },
  past_anchor_result: {
    tense: 'past_perfect_simple',
    tag: 'anchor-present-vs-past',
    clauseEn: 'by the time we got there',
    clauseRu: 'к тому моменту, как мы туда добрались',
    timeEn: 'already',
    timeRu: 'уже',
    explanation: 'Действие завершилось ДО точки в прошлом. Past Perfect Simple (had done).'
  },
  past_moment_in_progress: {
    tense: 'past_continuous',
    tag: 'in-progress-vs-prior',
    clauseEn: 'when I called',
    clauseRu: 'когда я позвонил',
    explanation: 'Действие происходило прямо в сам момент звонка (фон), а не ДО него. Нужен Past Continuous (was/were doing).'
  },

  // Stative variations
  stative_open_duration: {
    tense: 'present_perfect_simple',
    tag: 'stative-lock',
    timeEn: 'for five years',
    timeRu: 'уже пять лет',
    timePosition: 'end',
    explanation: 'Глагол состояния (stative) даже при длительности for 5 years требует Simple: have/has known, have/has had, have/has been.'
  },
  stative_since: {
    tense: 'present_perfect_simple',
    tag: 'stative-lock',
    timeEn: 'since 2020',
    timeRu: 'с 2020 года',
    timePosition: 'end',
    explanation: 'Stative verb с предлогом since: связь с настоящим передаётся через Present Perfect Simple (have/has known/had/been).'
  },
  stative_past_anchor: {
    tense: 'past_perfect_simple',
    tag: 'stative-lock',
    clauseEn: 'when they decided to start a company in 2021',
    clauseRu: 'когда они решили основать компанию в 2021 году',
    timeEn: 'for five years',
    timeRu: 'уже пять лет',
    explanation: 'Состояние длилось до момента в прошлом: для stative verb нужен Past Perfect Simple (had known/had had/had been).'
  },

  // Result with lost keys
  present_result_lost: {
    tense: 'present_perfect_simple',
    tag: 'anchor-present-vs-past',
    timeEn: 'and cannot get in right now',
    timeRu: 'и не может / не могу попасть внутрь прямо сейчас',
    explanation: 'Результат сейчас: ключи потеряны, прямо сейчас дверь заперта. Present Perfect Simple (have/has lost).'
  },
  past_anchor_result_lost: {
    tense: 'past_perfect_simple',
    tag: 'anchor-present-vs-past',
    clauseEn: 'so the door was locked when we arrived',
    clauseRu: 'поэтому дверь была заперта, когда мы пришли',
    explanation: 'Ключи были потеряны ДО момента прихода. Past Perfect Simple (had lost).'
  },
  closed_past_lost: {
    tense: 'past_simple',
    tag: 'open-vs-closed-period',
    timeEn: 'last week, but found them the next day',
    timeRu: 'на прошлой неделе, но нашёл(а/и) их на следующий день',
    explanation: 'Закрытый эпизод в прошлом: ключи уже нашлись, проблема в прошлом. Past Simple (lost).'
  }
};

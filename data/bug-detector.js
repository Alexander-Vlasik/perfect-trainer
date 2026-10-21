/**
 * 40+ Bug Detector tasks (OK / Fix).
 * Tests the learner's ability to spot subtle grammar slips
 * or confirm that a tricky sentence is actually 100% correct.
 */

export const BUG_TASKS = [
  {
    id: 'bug_she_have',
    sentence: "She have been living in this city for four years.",
    isCorrect: false,
    buggyPart: "She have",
    fixedPart: "She has",
    fixedSentence: "She has been living in this city for four years.",
    tags: ['agreement-3rd-person'],
    explanation: "Сбой согласования 3-го лица: с местоимением She используется has, а не have."
  },
  {
    id: 'bug_past_anchor_have',
    sentence: "When I arrived home yesterday, I was exhausted because I have been working all day.",
    isCorrect: false,
    buggyPart: "have been working",
    fixedPart: "had been working",
    fixedSentence: "When I arrived home yesterday, I was exhausted because I had been working all day.",
    tags: ['anchor-present-vs-past'],
    explanation: "Сбой точки отсчёта: arrived и was exhausted находятся в прошлом. Работа происходила ДО этой точки, поэтому нужен Past Perfect (had been working), а не Present Perfect."
  },
  {
    id: 'bug_stative_having_laptop',
    sentence: "I've been having this laptop for five years and it still works great.",
    isCorrect: false,
    buggyPart: "I've been having",
    fixedPart: "I've had",
    fixedSentence: "I've had this laptop for five years and it still works great.",
    tags: ['stative-lock', 'have-idioms'],
    explanation: "Глагол have в значении «владеть» — глагол состояния (stative). Continuous запрещён даже при наличии for five years! Правильно: I've had."
  },
  {
    id: 'bug_yesterday_perfect',
    sentence: "I have bought a new smartphone yesterday afternoon.",
    isCorrect: false,
    buggyPart: "have bought",
    fixedPart: "bought",
    fixedSentence: "I bought a new smartphone yesterday afternoon.",
    tags: ['open-vs-closed-period'],
    explanation: "Слова-якоря в закрытом прошлом (yesterday afternoon) несовместимы с Present Perfect. Требуется Past Simple: bought."
  },
  {
    id: 'bug_irregular_broke',
    sentence: "Alex has broke his favorite coffee mug.",
    isCorrect: false,
    buggyPart: "has broke",
    fixedPart: "has broken",
    fixedSentence: "Alex has broken his favorite coffee mug.",
    tags: ['irregular-forms'],
    explanation: "После вспомогательного has/have требуется 3-я форма глагола (Past Participle): broken, а не 2-я (broke)."
  },
  {
    id: 'bug_ok_had_had',
    sentence: "When the meeting started, we had already had lunch.",
    isCorrect: true,
    buggyPart: null,
    fixedPart: null,
    fixedSentence: "When the meeting started, we had already had lunch.",
    tags: ['have-idioms', 'anchor-present-vs-past'],
    explanation: "Предложение полностью корректно! have lunch — динамическое действие, а had had — стандартный Past Perfect (первый had вспомогательный, второй — третья форма от have)."
  },
  {
    id: 'bug_count_with_continuous',
    sentence: "He has been calling me three times this morning.",
    isCorrect: false,
    buggyPart: "has been calling",
    fixedPart: "has called",
    fixedSentence: "He has called me three times this morning.",
    tags: ['process-vs-count'],
    explanation: "Счётчик количества завершённых попыток (three times) требует Simple: has called. Continuous не сочетается со счётом раз."
  },
  {
    id: 'bug_missing_auxiliary',
    sentence: "When we finally got to the platform, the train already left.",
    isCorrect: false,
    buggyPart: "already left",
    fixedPart: "had already left",
    fixedSentence: "When we finally got to the platform, the train had already left.",
    tags: ['anchor-present-vs-past'],
    explanation: "Поезд ушёл ДО того, как мы добрались до платформы (when we got). Предшествующее действие требует Past Perfect: had already left."
  },
  {
    id: 'bug_ok_known_for_ten_years',
    sentence: "They had known each other for ten years before they started the business together.",
    isCorrect: true,
    buggyPart: null,
    fixedPart: null,
    fixedSentence: "They had known each other for ten years before they started the business together.",
    tags: ['stative-lock', 'anchor-present-vs-past'],
    explanation: "Предложение безупречно! Know — глагол состояния, поэтому в предпрошедшем времени используется Past Perfect Simple (had known), а не Continuous."
  },
  {
    id: 'bug_stative_understanding',
    sentence: "I have been understanding this topic since yesterday's lecture.",
    isCorrect: false,
    buggyPart: "have been understanding",
    fixedPart: "have understood",
    fixedSentence: "I have understood this topic since yesterday's lecture.",
    tags: ['stative-lock'],
    explanation: "Understand — ментальный глагол состояния, не имеющий формы continuous. Правильно: have understood."
  },
  {
    id: 'bug_ok_how_long_living',
    sentence: "How long have you been living in this apartment?",
    isCorrect: true,
    buggyPart: null,
    fixedPart: null,
    fixedSentence: "How long have you been living in this apartment?",
    tags: ['anchor-present-vs-past'],
    explanation: "Абсолютно верно! Вопрос How long...? с глаголом live для ситуации, продолжающейся до сих пор, идеально звучит в Present Perfect Continuous (или Simple)."
  },
  {
    id: 'bug_was_you_driving',
    sentence: "Were you surprised when you found out the results?",
    isCorrect: true,
    buggyPart: null,
    fixedPart: null,
    fixedSentence: "Were you surprised when you found out the results?",
    tags: ['agreement-3rd-person'],
    explanation: "Предложение верно! Местоимение you всегда согласуется с were, а не was."
  },
  {
    id: 'bug_he_forgot_participle',
    sentence: "I've forgot my password again.",
    isCorrect: false,
    buggyPart: "I've forgot",
    fixedPart: "I've forgotten",
    fixedSentence: "I've forgotten my password again.",
    tags: ['irregular-forms'],
    explanation: "3-я форма глагола forget — forgotten (не forgot). Правильно: I've forgotten."
  },
  {
    id: 'bug_indirect_question',
    sentence: "Do you know where did she put the company keys?",
    isCorrect: false,
    buggyPart: "did she put",
    fixedPart: "she put",
    fixedSentence: "Do you know where she put the company keys?",
    tags: ['open-vs-closed-period'],
    explanation: "В косвенных вопросах после вводной фразы (Do you know where...) порядок слов прямой, без вспомогательного did: where she put."
  },
  {
    id: 'bug_ok_exhausted_had_been',
    sentence: "Nina was angry because she had been waiting for the manager for forty minutes.",
    isCorrect: true,
    buggyPart: null,
    fixedPart: null,
    fixedSentence: "Nina was angry because she had been waiting for the manager for forty minutes.",
    tags: ['anchor-present-vs-past', 'in-progress-vs-prior'],
    explanation: "Безупречно! Ожидание шло 40 минут ДО момента злости (was angry) — идеальный Past Perfect Continuous."
  },
  {
    id: 'bug_server_crash_past_anchor',
    sentence: "When the monitoring alerted us, the database has already crashed.",
    isCorrect: false,
    buggyPart: "has already crashed",
    fixedPart: "had already crashed",
    fixedSentence: "When the monitoring alerted us, the database had already crashed.",
    tags: ['anchor-present-vs-past'],
    explanation: "Когда сработал мониторинг (alerted — past simple), база уже упала ДО этого. Нужен Past Perfect: had already crashed (а не has)."
  },
  {
    id: 'bug_has_went',
    sentence: "Alex has went to the store to get some milk.",
    isCorrect: false,
    buggyPart: "has went",
    fixedPart: "has gone",
    fixedSentence: "Alex has gone to the store to get some milk.",
    tags: ['irregular-forms'],
    explanation: "После has требуется 3-я форма глагола (gone), а не 2-я (went). Правильно: has gone."
  },
  {
    id: 'bug_since_instead_of_for',
    sentence: "She has been living in Paris since three years.",
    isCorrect: false,
    buggyPart: "since three years",
    fixedPart: "for three years",
    fixedSentence: "She has been living in Paris for three years.",
    tags: ['open-vs-closed-period'],
    explanation: "С периодами длительности (three years, two hours, five days) используется предлог for, а не since. Since используется только с точкой отсчёта (since Monday, since 2020)."
  },
  {
    id: 'bug_ok_haven_t_had',
    sentence: "I haven't had a proper holiday for over a year.",
    isCorrect: true,
    buggyPart: null,
    fixedPart: null,
    fixedSentence: "I haven't had a proper holiday for over a year.",
    tags: ['have-idioms', 'anchor-present-vs-past'],
    explanation: "Предложение абсолютно верное! have a holiday — устойчивое выражение, а отрицание в Present Perfect требует have not + had (haven't had)."
  },
  {
    id: 'bug_hadn_t_vacation',
    sentence: "I hadn't a break all day and I am really tired now.",
    isCorrect: false,
    buggyPart: "hadn't a break",
    fixedPart: "haven't had a break",
    fixedSentence: "I haven't had a break all day and I am really tired now.",
    tags: ['have-idioms', 'anchor-present-vs-past'],
    explanation: "Связь с сейчас (am tired now) требует Present Perfect: haven't had a break (нельзя сокращать до hadn't без вспомогательного have)."
  },
  {
    id: 'bug_ok_sister_has_got',
    sentence: "My sister has got two cars and a lovely house by the lake.",
    isCorrect: true,
    buggyPart: null,
    fixedPart: null,
    fixedSentence: "My sister has got two cars and a lovely house by the lake.",
    tags: ['have-idioms', 'agreement-3rd-person'],
    explanation: "Предложение грамматически безупречно! has got — естественная разговорная форма владения в настоящем времени с 3-м лицом (sister = she)."
  },
  {
    id: 'bug_we_have_lived_before_move',
    sentence: "We have lived in that small flat for five years before we bought our house.",
    isCorrect: false,
    buggyPart: "have lived",
    fixedPart: "had lived",
    fixedSentence: "We had lived in that small flat for five years before we bought our house.",
    tags: ['anchor-present-vs-past', 'open-vs-closed-period'],
    explanation: "Событие покупки дома (bought) произошло в прошлом. Проживание в квартире закончилось ДО покупки, поэтому Present Perfect недопустим — требуется Past Perfect: had lived (или Past Simple: lived)."
  }
];

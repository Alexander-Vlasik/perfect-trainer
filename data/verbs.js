/**
 * Natural Russian conjugations and English verb forms.
 */

export const VERBS = {
  // --- Stative verbs ---
  know: {
    base: 'know',
    past: 'knew',
    participle: 'known',
    ing: 'knowing',
    third: 'knows',
    isStative: true,
    ruPres: { '1s': 'знаю', '1pl': 'знаем', '3s': 'знает', '3pl': 'знают' },
    ruPastImp: { m: 'знал', f: 'знала', pl: 'знали' },
    ruPastPerf: { m: 'узнал', f: 'узнала', pl: 'узнали' }
  },
  be: {
    base: 'be',
    past: 'was/were',
    pastSingular: 'was',
    pastPlural: 'were',
    participle: 'been',
    ing: 'being',
    third: 'is',
    isStative: true,
    ruPres: { '1s': '', '1pl': '', '3s': '', '3pl': '' },
    ruPastImp: { m: 'был', f: 'была', pl: 'были' },
    ruPastPerf: { m: 'побыл', f: 'побыла', pl: 'побыли' }
  },
  have_stative: {
    base: 'have',
    past: 'had',
    participle: 'had',
    ing: 'having',
    third: 'has',
    isStative: true,
    ruPres: { '1s': 'есть', '1pl': 'есть', '3s': 'есть', '3pl': 'есть' },
    ruPastImp: { m: 'был', f: 'была', pl: 'были' },
    ruPastPerf: { m: 'был', f: 'была', pl: 'были' }
  },
  understand: {
    base: 'understand',
    past: 'understood',
    participle: 'understood',
    ing: 'understanding',
    third: 'understands',
    isStative: true,
    ruPres: { '1s': 'понимаю', '1pl': 'понимаем', '3s': 'понимает', '3pl': 'понимают' },
    ruPastImp: { m: 'понимал', f: 'понимала', pl: 'понимали' },
    ruPastPerf: { m: 'понял', f: 'поняла', pl: 'поняли' }
  },
  remember: {
    base: 'remember',
    past: 'remembered',
    participle: 'remembered',
    ing: 'remembering',
    third: 'remembers',
    isStative: true,
    ruPres: { '1s': 'помню', '1pl': 'помним', '3s': 'помнит', '3pl': 'помнят' },
    ruPastImp: { m: 'помнил', f: 'помнила', pl: 'помнили' },
    ruPastPerf: { m: 'вспомнил', f: 'вспомнила', pl: 'вспомнили' }
  },

  // --- Dynamic have expressions ---
  have_dynamic: {
    base: 'have',
    past: 'had',
    participle: 'had',
    ing: 'having',
    third: 'has',
    isStative: false,
    ruPres: { '1s': 'провожу', '1pl': 'проводим', '3s': 'проводит', '3pl': 'проводят' },
    ruPastImp: { m: 'проводил', f: 'проводила', pl: 'проводили' },
    ruPastPerf: { m: 'провёл', f: 'провела', pl: 'провели' }
  },

  // --- Dynamic Activities ---
  wait: {
    base: 'wait',
    past: 'waited',
    participle: 'waited',
    ing: 'waiting',
    third: 'waits',
    isStative: false,
    ruPres: { '1s': 'жду', '1pl': 'ждём', '3s': 'ждёт', '3pl': 'ждут' },
    ruPastImp: { m: 'ждал', f: 'ждала', pl: 'ждали' },
    ruPastPerf: { m: 'прождал', f: 'прождала', pl: 'прождали' }
  },
  work: {
    base: 'work',
    past: 'worked',
    participle: 'worked',
    ing: 'working',
    third: 'works',
    isStative: false,
    ruPres: { '1s': 'работаю', '1pl': 'работаем', '3s': 'работает', '3pl': 'работают' },
    ruPastImp: { m: 'работал', f: 'работала', pl: 'работали' },
    ruPastPerf: { m: 'поработал', f: 'поработала', pl: 'поработали' }
  },
  live: {
    base: 'live',
    past: 'lived',
    participle: 'lived',
    ing: 'living',
    third: 'lives',
    isStative: false,
    ruPres: { '1s': 'живу', '1pl': 'живём', '3s': 'живёт', '3pl': 'живут' },
    ruPastImp: { m: 'жил', f: 'жила', pl: 'жили' },
    ruPastPerf: { m: 'прожил', f: 'прожила', pl: 'прожили' }
  },
  look_for: {
    base: 'look for',
    verbOnly: 'look',
    particle: 'for',
    past: 'looked for',
    participle: 'looked for',
    ing: 'looking for',
    third: 'looks for',
    isStative: false,
    ruPres: { '1s': 'ищу', '1pl': 'ищем', '3s': 'ищет', '3pl': 'ищут' },
    ruPastImp: { m: 'искал', f: 'искала', pl: 'искали' },
    ruPastPerf: { m: 'поискал', f: 'поискала', pl: 'поискали' }
  },
  fix: {
    base: 'fix',
    past: 'fixed',
    participle: 'fixed',
    ing: 'fixing',
    third: 'fixes',
    isStative: false,
    ruPres: { '1s': 'чиню', '1pl': 'чиним', '3s': 'чинит', '3pl': 'чинят' },
    ruPastImp: { m: 'чинил', f: 'чинила', pl: 'чинили' },
    ruPastPerf: { m: 'починил', f: 'починила', pl: 'починили' }
  },
  debug: {
    base: 'debug',
    past: 'debugged',
    participle: 'debugged',
    ing: 'debugging',
    third: 'debugs',
    isStative: false,
    ruPres: { '1s': 'дебажу', '1pl': 'дебажим', '3s': 'дебажит', '3pl': 'дебажат' },
    ruPastImp: { m: 'дебажил', f: 'дебажила', pl: 'дебажили' },
    ruPastPerf: { m: 'отладил', f: 'отладила', pl: 'отладили' }
  },
  read: {
    base: 'read',
    past: 'read',
    participle: 'read',
    ing: 'reading',
    third: 'reads',
    isStative: false,
    ruPres: { '1s': 'читаю', '1pl': 'читаем', '3s': 'читает', '3pl': 'читают' },
    ruPastImp: { m: 'читал', f: 'читала', pl: 'читали' },
    ruPastPerf: { m: 'прочитал', f: 'прочитала', pl: 'прочитали' }
  },
  write: {
    base: 'write',
    past: 'wrote',
    participle: 'written',
    ing: 'writing',
    third: 'writes',
    isStative: false,
    ruPres: { '1s': 'пишу', '1pl': 'пишем', '3s': 'пишет', '3pl': 'пишут' },
    ruPastImp: { m: 'писал', f: 'писала', pl: 'писали' },
    ruPastPerf: { m: 'написал', f: 'написала', pl: 'написали' }
  },
  learn: {
    base: 'learn',
    past: 'learned',
    altPast: 'learnt',
    participle: 'learned',
    altParticiple: 'learnt',
    ing: 'learning',
    third: 'learns',
    isStative: false,
    ruPres: { '1s': 'учу', '1pl': 'учим', '3s': 'учит', '3pl': 'учат' },
    ruPastImp: { m: 'учил', f: 'учила', pl: 'учили' },
    ruPastPerf: { m: 'выучил', f: 'выучила', pl: 'выучили' }
  },
  drive: {
    base: 'drive',
    past: 'drove',
    participle: 'driven',
    ing: 'driving',
    third: 'drives',
    isStative: false,
    ruPres: { '1s': 'еду за рулём', '1pl': 'едем за рулём', '3s': 'едет за рулём', '3pl': 'едут за рулём' },
    ruPastImp: { m: 'был за рулём', f: 'была за рулём', pl: 'были за рулём' },
    ruPastPerf: { m: 'проехал за рулём', f: 'проехала за рулём', pl: 'проехали за рулём' }
  },
  cook: {
    base: 'cook',
    past: 'cooked',
    participle: 'cooked',
    ing: 'cooking',
    third: 'cooks',
    isStative: false,
    ruPres: { '1s': 'готовлю', '1pl': 'готовим', '3s': 'готовит', '3pl': 'готовят' },
    ruPastImp: { m: 'готовил', f: 'готовила', pl: 'готовили' },
    ruPastPerf: { m: 'приготовил', f: 'приготовила', pl: 'приготовили' }
  },
  clean: {
    base: 'clean',
    past: 'cleaned',
    participle: 'cleaned',
    ing: 'cleaning',
    third: 'cleans',
    isStative: false,
    ruPres: { '1s': 'убираю', '1pl': 'убираем', '3s': 'убирает', '3pl': 'убирают' },
    ruPastImp: { m: 'убирал', f: 'убирала', pl: 'убирали' },
    ruPastPerf: { m: 'убрал', f: 'убрала', pl: 'убрали' }
  },
  run: {
    base: 'run',
    past: 'ran',
    participle: 'run',
    ing: 'running',
    third: 'runs',
    isStative: false,
    ruPres: { '1s': 'бегаю', '1pl': 'бегаем', '3s': 'бегает', '3pl': 'бегают' },
    ruPastImp: { m: 'бегал', f: 'бегала', pl: 'бегали' },
    ruPastPerf: { m: 'пробежал', f: 'пробежала', pl: 'пробежали' }
  },
  call: {
    base: 'call',
    past: 'called',
    participle: 'called',
    ing: 'calling',
    third: 'calls',
    isStative: false,
    ruPres: { '1s': 'звоню', '1pl': 'звоним', '3s': 'звонит', '3pl': 'звонят' },
    ruPastImp: { m: 'звонил', f: 'звонила', pl: 'звонили' },
    ruPastPerf: { m: 'позвонил', f: 'позвонила', pl: 'позвонили' }
  },
  lose: {
    base: 'lose',
    past: 'lost',
    participle: 'lost',
    ing: 'losing',
    third: 'loses',
    isStative: false,
    ruPres: { '1s': 'теряю', '1pl': 'теряем', '3s': 'теряет', '3pl': 'теряют' },
    ruPastImp: { m: 'терял', f: 'теряла', pl: 'теряли' },
    ruPastPerf: { m: 'потерял', f: 'потеряла', pl: 'потеряли' }
  },
  find: {
    base: 'find',
    past: 'found',
    participle: 'found',
    ing: 'finding',
    third: 'finds',
    isStative: false,
    ruPres: { '1s': 'нахожу', '1pl': 'находим', '3s': 'находит', '3pl': 'находят' },
    ruPastImp: { m: 'находил', f: 'находила', pl: 'находили' },
    ruPastPerf: { m: 'нашёл', f: 'нашла', pl: 'нашли' }
  },
  break: {
    base: 'break',
    past: 'broke',
    participle: 'broken',
    ing: 'breaking',
    third: 'breaks',
    isStative: false,
    ruPres: { '1s': 'ломаю', '1pl': 'ломаем', '3s': 'ломает', '3pl': 'ломают' },
    ruPastImp: { m: 'ломал', f: 'ломала', pl: 'ломали' },
    ruPastPerf: { m: 'сломал', f: 'сломала', pl: 'сломали' }
  },
  crash: {
    base: 'crash',
    past: 'crashed',
    participle: 'crashed',
    ing: 'crashing',
    third: 'crashes',
    isStative: false,
    ruPres: { '1s': 'падаю', '1pl': 'падаем', '3s': 'падает', '3pl': 'падают' },
    ruPastImp: { m: 'падал', f: 'падала', pl: 'падали' },
    ruPastPerf: { m: 'упал', f: 'упала', pl: 'упали' }
  },
  fail: {
    base: 'fail',
    past: 'failed',
    participle: 'failed',
    ing: 'failing',
    third: 'fails',
    isStative: false,
    ruPres: { '1s': 'сбою', '1pl': 'сбоим', '3s': 'сбоит', '3pl': 'сбоят' },
    ruPastImp: { m: 'сбоил', f: 'сбоила', pl: 'сбоили' },
    ruPastPerf: { m: 'отказал', f: 'отказала', pl: 'отказали' }
  },
  send: {
    base: 'send',
    past: 'sent',
    participle: 'sent',
    ing: 'sending',
    third: 'sends',
    isStative: false,
    ruPres: { '1s': 'отправляю', '1pl': 'отправляем', '3s': 'отправляет', '3pl': 'отправляют' },
    ruPastImp: { m: 'отправлял', f: 'отправляла', pl: 'отправляли' },
    ruPastPerf: { m: 'отправил', f: 'отправила', pl: 'отправили' }
  },
  watch: {
    base: 'watch',
    past: 'watched',
    participle: 'watched',
    ing: 'watching',
    third: 'watches',
    isStative: false,
    ruPres: { '1s': 'смотрю', '1pl': 'смотрим', '3s': 'смотрит', '3pl': 'смотрят' },
    ruPastImp: { m: 'смотрел', f: 'смотрела', pl: 'смотрели' },
    ruPastPerf: { m: 'посмотрел', f: 'посмотрела', pl: 'посмотрели' }
  },
  fall: {
    base: 'fall',
    past: 'fell',
    participle: 'fallen',
    ing: 'falling',
    third: 'falls',
    isStative: false,
    ruPres: { '1s': 'падаю', '1pl': 'падаем', '3s': 'падает', '3pl': 'падают' },
    ruPastImp: { m: 'падал', f: 'падала', pl: 'падали' },
    ruPastPerf: { m: 'упал', f: 'упала', pl: 'упали' }
  }
};

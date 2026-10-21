/**
 * Dictionary of common regular & irregular verbs with stative flags
 * and inflections for accurate conjugation and diagnostics.
 */

export const VERBS = {
  // Stative / State verbs
  know: {
    base: 'know',
    past: 'knew',
    participle: 'known',
    ing: 'knowing',
    third: 'knows',
    isStative: true,
    ru: 'знать'
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
    ru: 'быть / находиться'
  },
  have_stative: {
    base: 'have',
    past: 'had',
    participle: 'had',
    ing: 'having',
    third: 'has',
    isStative: true,
    ru: 'иметь / владеть'
  },
  understand: {
    base: 'understand',
    past: 'understood',
    participle: 'understood',
    ing: 'understanding',
    third: 'understands',
    isStative: true,
    ru: 'понимать'
  },
  believe: {
    base: 'believe',
    past: 'believed',
    participle: 'believed',
    ing: 'believing',
    third: 'believes',
    isStative: true,
    ru: 'верить'
  },
  remember: {
    base: 'remember',
    past: 'remembered',
    participle: 'remembered',
    ing: 'remembering',
    third: 'remembers',
    isStative: true,
    ru: 'помнить'
  },

  // Dynamic have expressions
  have_dynamic: {
    base: 'have',
    past: 'had',
    participle: 'had',
    ing: 'having',
    third: 'has',
    isStative: false,
    ru: 'проводить / принимать'
  },

  // Dynamic / Activity verbs
  wait: {
    base: 'wait',
    past: 'waited',
    participle: 'waited',
    ing: 'waiting',
    third: 'waits',
    isStative: false,
    ru: 'ждать'
  },
  work: {
    base: 'work',
    past: 'worked',
    participle: 'worked',
    ing: 'working',
    third: 'works',
    isStative: false,
    ru: 'работать'
  },
  live: {
    base: 'live',
    past: 'lived',
    participle: 'lived',
    ing: 'living',
    third: 'lives',
    isStative: false,
    ru: 'жить'
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
    ru: 'искать'
  },
  fix: {
    base: 'fix',
    past: 'fixed',
    participle: 'fixed',
    ing: 'fixing',
    third: 'fixes',
    isStative: false,
    ru: 'чинить'
  },
  debug: {
    base: 'debug',
    past: 'debugged',
    participle: 'debugged',
    ing: 'debugging',
    third: 'debugs',
    isStative: false,
    ru: 'дебажить / отлаживать'
  },
  read: {
    base: 'read',
    past: 'read',
    participle: 'read',
    ing: 'reading',
    third: 'reads',
    isStative: false,
    ru: 'читать'
  },
  write: {
    base: 'write',
    past: 'wrote',
    participle: 'written',
    ing: 'writing',
    third: 'writes',
    isStative: false,
    ru: 'писать'
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
    ru: 'учить / изучать'
  },
  drive: {
    base: 'drive',
    past: 'drove',
    participle: 'driven',
    ing: 'driving',
    third: 'drives',
    isStative: false,
    ru: 'вести машину / ехать за рулем'
  },
  cook: {
    base: 'cook',
    past: 'cooked',
    participle: 'cooked',
    ing: 'cooking',
    third: 'cooks',
    isStative: false,
    ru: 'готовить'
  },
  clean: {
    base: 'clean',
    past: 'cleaned',
    participle: 'cleaned',
    ing: 'cleaning',
    third: 'cleans',
    isStative: false,
    ru: 'убирать'
  },
  run: {
    base: 'run',
    past: 'ran',
    participle: 'run',
    ing: 'running',
    third: 'runs',
    isStative: false,
    ru: 'бежать'
  },
  call: {
    base: 'call',
    past: 'called',
    participle: 'called',
    ing: 'calling',
    third: 'calls',
    isStative: false,
    ru: 'звонить'
  },
  lose: {
    base: 'lose',
    past: 'lost',
    participle: 'lost',
    ing: 'losing',
    third: 'loses',
    isStative: false,
    ru: 'терять'
  },
  find: {
    base: 'find',
    past: 'found',
    participle: 'found',
    ing: 'finding',
    third: 'finds',
    isStative: false,
    ru: 'находить'
  },
  break: {
    base: 'break',
    past: 'broke',
    participle: 'broken',
    ing: 'breaking',
    third: 'breaks',
    isStative: false,
    ru: 'ломать(ся)'
  },
  crash: {
    base: 'crash',
    past: 'crashed',
    participle: 'crashed',
    ing: 'crashing',
    third: 'crashes',
    isStative: false,
    ru: 'падать / разбиваться / сбоить'
  },
  fail: {
    base: 'fail',
    past: 'failed',
    participle: 'failed',
    ing: 'failing',
    third: 'fails',
    isStative: false,
    ru: 'падать / отказывать'
  },
  send: {
    base: 'send',
    past: 'sent',
    participle: 'sent',
    ing: 'sending',
    third: 'sends',
    isStative: false,
    ru: 'отправлять'
  },
  arrive: {
    base: 'arrive',
    past: 'arrived',
    participle: 'arrived',
    ing: 'arriving',
    third: 'arrives',
    isStative: false,
    ru: 'прибывать / приезжать'
  },
  leave: {
    base: 'leave',
    past: 'left',
    participle: 'left',
    ing: 'leaving',
    third: 'leaves',
    isStative: false,
    ru: 'уходить / покидать'
  },
  start: {
    base: 'start',
    past: 'started',
    participle: 'started',
    ing: 'starting',
    third: 'starts',
    isStative: false,
    ru: 'начинать(ся)'
  },
  finish: {
    base: 'finish',
    past: 'finished',
    participle: 'finished',
    ing: 'finishing',
    third: 'finishes',
    isStative: false,
    ru: 'заканчивать(ся)'
  },
  drink: {
    base: 'drink',
    past: 'drank',
    participle: 'drunk',
    ing: 'drinking',
    third: 'drinks',
    isStative: false,
    ru: 'пить'
  },
  eat: {
    base: 'eat',
    past: 'ate',
    participle: 'eaten',
    ing: 'eating',
    third: 'eats',
    isStative: false,
    ru: 'есть'
  },
  see: {
    base: 'see',
    past: 'saw',
    participle: 'seen',
    ing: 'seeing',
    third: 'sees',
    isStative: true,
    ru: 'видеть'
  },
  fall: {
    base: 'fall',
    past: 'fell',
    participle: 'fallen',
    ing: 'falling',
    third: 'falls',
    isStative: false,
    ru: 'падать'
  },
  rise: {
    base: 'rise',
    past: 'rose',
    participle: 'risen',
    ing: 'rising',
    third: 'rises',
    isStative: false,
    ru: 'расти / подниматься'
  },
  forget: {
    base: 'forget',
    past: 'forgot',
    participle: 'forgotten',
    ing: 'forgetting',
    third: 'forgets',
    isStative: false,
    ru: 'забывать'
  },
  watch: {
    base: 'watch',
    past: 'watched',
    participle: 'watched',
    ing: 'watching',
    third: 'watches',
    isStative: false,
    ru: 'смотреть'
  },
  play: {
    base: 'play',
    past: 'played',
    participle: 'played',
    ing: 'playing',
    third: 'plays',
    isStative: false,
    ru: 'играть'
  }
};

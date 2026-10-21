import { VERBS } from './data/verbs.js';
import { BLUEPRINTS } from './data/blueprints.js';
import { CASCADES } from './data/cascades.js';
import { XRAY_TASKS } from './data/xray.js';
import { BUG_TASKS } from './data/bug-detector.js';
import { Conjugator } from './engine/conjugator.js';
import { CardGenerator } from './engine/generator.js';
import { Checker } from './engine/checker.js';

console.log('🧪 Starting Perfect System 1 self-tests...');

// 1. Data Integrity checks
console.log(`Checking data: ${Object.keys(VERBS).length} verbs, ${BLUEPRINTS.length} blueprints, ${CASCADES.length} cascades, ${XRAY_TASKS.length} xray tasks, ${BUG_TASKS.length} bug tasks.`);

if (BLUEPRINTS.length < 25) throw new Error('Too few blueprints!');
if (CASCADES.length < 10) throw new Error('Too few cascades!');
if (XRAY_TASKS.length < 10) throw new Error('Too few xray tasks!');
if (BUG_TASKS.length < 10) throw new Error('Too few bug tasks!');

// 2. Conjugator tests
console.log('Testing conjugator...');
const conj1 = Conjugator.conjugate('wait', 'Sarah', 'present_perfect_continuous');
console.log('Sarah wait PPC:', conj1.verbPhrase);
if (!conj1.verbPhrase.includes('has been waiting')) {
  throw new Error(`Expected 'has been waiting', got ${conj1.verbPhrase}`);
}

const conj2 = Conjugator.conjugate('know', 'They', 'present_perfect_continuous');
console.log('They know (stative) PPC -> PPS fallback:', conj2.verbPhrase);
if (!conj2.verbPhrase.includes('have known')) {
  throw new Error(`Expected 'have known' fallback for stative, got ${conj2.verbPhrase}`);
}

const conj3 = Conjugator.conjugate('break', 'He', 'past_perfect_simple');
console.log('He break PPS:', conj3.verbPhrase);
if (!conj3.verbPhrase.includes('had broken')) {
  throw new Error(`Expected 'had broken', got ${conj3.verbPhrase}`);
}

// 3. Generator test
console.log('Testing generator batch of 100 cards...');
for (let i = 0; i < 100; i++) {
  const card = CardGenerator.generateCard();
  if (!card.targetSentence || !card.targetVerbPhrase || !card.russianPrompt) {
    throw new Error(`Card generation returned incomplete card: ${JSON.stringify(card)}`);
  }
}
console.log('100 cards generated cleanly!');

// 4. Checker tests
console.log('Testing checker diagnostics...');
const testCard = {
  subject: 'Sarah',
  tense: 'present_perfect_continuous',
  targetSentence: 'Sarah has been waiting for the courier for two hours.',
  targetVerbPhrase: 'has been waiting',
  acceptableAnswers: ["Sarah's been waiting for the courier for two hours"],
  tags: ['anchor-present-vs-past', 'agreement-3rd-person']
};

// 4a. Exact match with contraction
const checkExact = Checker.evaluate("Sarah's been waiting for the courier for two hours", testCard, false);
if (!checkExact.isCorrect) throw new Error('Failed contraction match');

// 4b. Agreement diagnosis: "have" instead of "has"
const checkAgreement = Checker.evaluate("Sarah have been waiting for the courier for two hours", testCard, false);
console.log('Agreement test diagnosis:', checkAgreement.diagnosis);
if (checkAgreement.isCorrect || !checkAgreement.diagnosis.includes('has')) {
  throw new Error('Agreement diagnosis failed');
}

// 4c. Stative diagnosis
const stativeCard = {
  subject: 'We',
  tense: 'present_perfect_simple',
  targetSentence: 'We have known each other for ten years.',
  targetVerbPhrase: 'have known',
  tags: ['stative-lock']
};
const checkStative = Checker.evaluate('We have been knowing each other for ten years', stativeCard, false);
console.log('Stative test diagnosis:', checkStative.diagnosis);
if (checkStative.isCorrect || !checkStative.diagnosis.includes('Stative Verb')) {
  throw new Error('Stative diagnosis failed');
}

// 4d. Irregular form test: "broke" instead of "broken"
const brokeCard = {
  subject: 'Alex',
  tense: 'present_perfect_simple',
  targetSentence: 'Alex has broken his phone.',
  targetVerbPhrase: 'has broken',
  tags: ['irregular-forms']
};
const checkBroke = Checker.evaluate('Alex has broke his phone', brokeCard, false);
console.log('Irregular test diagnosis:', checkBroke.diagnosis);
if (checkBroke.isCorrect || !checkBroke.diagnosis.includes('причастия')) {
  throw new Error('Irregular form diagnosis failed');
}

console.log('🎉 ALL ENGINE & DIAGNOSTIC TESTS PASSED SUCCESSFULLY!');

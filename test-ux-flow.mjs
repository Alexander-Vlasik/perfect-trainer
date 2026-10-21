import { Checker } from './engine/checker.js';
import { CASCADES } from './data/cascades.js';

console.log('🧪 Starting End-to-End UI/UX flow verification...');

const cascade = CASCADES[0]; // Courier cascade
const step1 = cascade.steps[0];
const card1 = {
  subject: 'I',
  targetSentence: step1.en,
  targetVerbPhrase: step1.verb,
  acceptableAnswers: step1.acceptable,
  tense: step1.tense,
  tags: step1.tags,
  explanation: step1.explanation
};

// Case A: User types just the verb phrase
const resA = Checker.evaluate('have been waiting', card1, true);
console.log('Case A: "have been waiting" ->', resA.isCorrect ? '✅ PASS' : '❌ FAIL');
if (!resA.isCorrect) throw new Error('Case A failed');

// Case B: User types with subject "I have been waiting"
const resB = Checker.evaluate('I have been waiting', card1, true);
console.log('Case B: "I have been waiting" ->', resB.isCorrect ? '✅ PASS' : '❌ FAIL');
if (!resB.isCorrect) throw new Error('Case B failed');

// Case C: User types with contraction "I've been waiting"
const resC = Checker.evaluate("I've been waiting", card1, true);
console.log('Case C: "I\'ve been waiting" ->', resC.isCorrect ? '✅ PASS' : '❌ FAIL');
if (!resC.isCorrect) throw new Error('Case C failed');

// Case D: User types full sentence
const resD = Checker.evaluate("I've been waiting for the courier for two hours.", card1, true);
console.log('Case D: Full sentence ->', resD.isCorrect ? '✅ PASS' : '❌ FAIL');
if (!resD.isCorrect) throw new Error('Case D failed');

// Case E: User makes an error (Past anchor on Step 2)
const step2 = cascade.steps[1];
const card2 = {
  subject: 'I',
  targetSentence: step2.en,
  targetVerbPhrase: step2.verb,
  acceptableAnswers: step2.acceptable,
  tense: step2.tense,
  tags: step2.tags,
  explanation: step2.explanation
};

const resE = Checker.evaluate('have been waiting', card2, true);
console.log('Case E (Mistake detection): isCorrect =', resE.isCorrect, '(expected false)');
console.log('Case E diagnosis:', resE.diagnosis);
console.log('Case E correction:', resE.correction);

if (resE.isCorrect) throw new Error('Case E should be incorrect!');
if (!resE.diagnosis.includes('Сбой точки отсчёта')) throw new Error('Case E diagnosis failed!');

console.log('🎉 ALL UI/UX AND DIAGNOSTIC FLOWS VERIFIED SUCCESSFULLY!');

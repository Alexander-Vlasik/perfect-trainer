import { BLUEPRINTS, SUBJECTS_POOL, TIME_FRAMES } from '../data/blueprints.js';
import { VERBS } from '../data/verbs.js';
import { Conjugator } from './conjugator.js';

export class CardGenerator {
  /**
   * Generates a single random card.
   * If targetTag is provided, prioritizes blueprints and timeframes matching that tag.
   */
  static generateCard(targetTag = null) {
    // 1. Pick a blueprint
    let eligibleBlueprints = BLUEPRINTS;
    if (targetTag) {
      const filtered = BLUEPRINTS.filter(b => 
        b.compatibleFrames.some(f => TIME_FRAMES[f] && TIME_FRAMES[f].tag === targetTag)
      );
      if (filtered.length > 0) {
        eligibleBlueprints = filtered;
      }
    }
    const bp = eligibleBlueprints[Math.floor(Math.random() * eligibleBlueprints.length)];

    // 2. Pick a compatible time frame
    let eligibleFrames = bp.compatibleFrames.map(f => ({ frameKey: f, ...TIME_FRAMES[f] })).filter(f => f.tense);
    if (targetTag) {
      const tagFiltered = eligibleFrames.filter(f => f.tag === targetTag);
      if (tagFiltered.length > 0) {
        eligibleFrames = tagFiltered;
      }
    }
    const frame = eligibleFrames[Math.floor(Math.random() * eligibleFrames.length)];

    // 3. Pick a subject
    // Randomize: sometimes 3rd person singular (he/she/Alex/Sarah/My brother) to train agreement
    const subject = SUBJECTS_POOL[Math.floor(Math.random() * SUBJECTS_POOL.length)];

    // 4. Conjugate the verb
    const isMidAdverb = frame.timePosition === 'mid' && frame.timeEn;
    const adverb = isMidAdverb ? frame.timeEn : '';
    const conjugation = Conjugator.conjugate(bp.verbKey, subject.en, frame.tense, 'affirmative', adverb);

    // 5. Build English sentence
    let targetSentence = '';
    let targetVerbPhrase = conjugation.verbPhrase;

    // Build sentence parts depending on frame structure
    if (frame.clauseEn && frame.clauseEn.startsWith('when')) {
      // e.g. "When the electricity went out, Sarah had been waiting for the courier for two hours."
      const timePart = frame.timeEn ? ` ${frame.timeEn}` : '';
      targetSentence = `${frame.clauseEn}, ${subject.en} ${conjugation.verbPhrase} ${bp.objectEn}${timePart}.`;
    } else if (frame.clauseEn && frame.clauseEn.startsWith('before')) {
      targetSentence = `${subject.en} ${conjugation.verbPhrase} ${bp.objectEn} ${frame.timeEn || ''} ${frame.clauseEn}.`.replace(/\s+/g, ' ');
    } else if (frame.clauseEn && frame.clauseEn.startsWith('by the time')) {
      targetSentence = `${frame.clauseEn}, ${subject.en} ${conjugation.verbPhrase} ${bp.objectEn}.`;
    } else {
      const endPart = frame.timePosition === 'end' && frame.timeEn ? ` ${frame.timeEn}` : '';
      targetSentence = `${subject.en} ${conjugation.verbPhrase} ${bp.objectEn}${endPart}.`;
    }

    // 6. Build Russian translation prompt
    let russianPrompt = '';
    const subjRu = subject.ru;
    const objRu = bp.objectRu;
    
    if (frame.clauseRu) {
      if (frame.clauseRu.startsWith('когда') || frame.clauseRu.startsWith('к тому')) {
        russianPrompt = `${frame.clauseRu}, ${subjRu} ${frame.timeRu || ''} ${this.ruActionDesc(bp.verbKey, frame.tense)} ${objRu}.`;
      } else {
        russianPrompt = `${subjRu} ${frame.timeRu || ''} ${this.ruActionDesc(bp.verbKey, frame.tense)} ${objRu} ${frame.clauseRu}.`;
      }
    } else {
      russianPrompt = `${subjRu} ${frame.timeRu || ''} ${this.ruActionDesc(bp.verbKey, frame.tense)} ${objRu}.`;
    }
    // Clean up spaces
    russianPrompt = russianPrompt.replace(/\s+/g, ' ').replace(' ,', ',');

    // 7. Collect tags
    const tags = [frame.tag];
    if (subject.thirdPerson) {
      tags.push('agreement-3rd-person');
    }
    if (VERBS[bp.verbKey].isStative) {
      tags.push('stative-lock');
    }

    // 8. Acceptable answers
    const acceptable = [...conjugation.alternatives];

    return {
      id: `gen_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      mode: 'builder',
      subject: subject.en,
      verbKey: bp.verbKey,
      tense: frame.tense,
      tags: Array.from(new Set(tags)),
      russianPrompt: russianPrompt.trim(),
      englishHint: bp.hint,
      targetSentence: targetSentence.trim(),
      targetVerbPhrase: targetVerbPhrase.trim(),
      acceptableAnswers: acceptable,
      explanation: frame.explanation,
      timeline: {
        anchor: frame.tense.startsWith('present') ? 'present' : 'past',
        aspect: frame.tense.includes('continuous') ? 'continuous' : 'simple'
      }
    };
  }

  static ruActionDesc(verbKey, tense) {
    const v = VERBS[verbKey];
    if (!v) return 'делает';
    if (tense === 'present_perfect_continuous') {
      return `(уже) ${v.ru}`;
    }
    if (tense === 'past_perfect_continuous') {
      return `(до этого) ${v.ru}`;
    }
    if (tense === 'present_perfect_simple') {
      return `(уже сделал / имеет факт)`;
    }
    if (tense === 'past_perfect_simple') {
      return `(уже к тому моменту сделал / имел)`;
    }
    if (tense === 'past_continuous') {
      return `(в тот самый момент) ${v.ru}`;
    }
    return v.ru;
  }
}

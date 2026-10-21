import { BLUEPRINTS, PLURAL_SUBJECTS, SUBJECTS_POOL, TIME_FRAMES } from '../data/blueprints.js';
import { VERBS } from '../data/verbs.js';
import { Conjugator } from './conjugator.js';

export class CardGenerator {
  /**
   * Generates a single coherent, naturally translated grammar practice card.
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
    let subject = bp.subjectOverride;
    if (!subject) {
      const pool = bp.onlyPlural ? PLURAL_SUBJECTS : SUBJECTS_POOL;
      subject = pool[Math.floor(Math.random() * pool.length)];
    }

    // 4. Conjugate the verb in English
    const isMidAdverb = frame.timePosition === 'mid' && frame.timeEn;
    const adverb = isMidAdverb ? frame.timeEn : '';
    const conjugation = Conjugator.conjugate(bp.verbKey, subject.en, frame.tense, 'affirmative', adverb);

    // 5. Build English sentence
    let targetSentence = '';
    const targetVerbPhrase = conjugation.verbPhrase;

    if (frame.clauseEn && frame.clauseEn.startsWith('when')) {
      const timePart = frame.timeEn ? ` ${frame.timeEn}` : '';
      targetSentence = `${this.capitalize(frame.clauseEn)}, ${subject.enMid} ${conjugation.verbPhrase} ${bp.objectEn}${timePart}.`;
    } else if (frame.clauseEn && frame.clauseEn.startsWith('before')) {
      targetSentence = `${subject.en} ${conjugation.verbPhrase} ${bp.objectEn} ${frame.timeEn || ''} ${frame.clauseEn}.`;
    } else if (frame.clauseEn && frame.clauseEn.startsWith('by the time')) {
      targetSentence = `${this.capitalize(frame.clauseEn)}, ${subject.enMid} ${conjugation.verbPhrase} ${bp.objectEn}.`;
    } else if (frame.frameKey === 'closed_past_duration') {
      targetSentence = `Yesterday ${subject.enMid} ${conjugation.verbPhrase} ${bp.objectEn} for two hours and then left.`;
    } else if (frame.frameKey === 'closed_past_event') {
      targetSentence = `Yesterday ${subject.enMid} ${conjugation.verbPhrase} ${bp.objectEn}.`;
    } else if (frame.frameKey === 'closed_past_lost') {
      targetSentence = `Last week ${subject.enMid} ${conjugation.verbPhrase} ${bp.objectEn}, but found them the next day.`;
    } else if (frame.frameKey === 'present_result_lost') {
      targetSentence = `${subject.en} ${conjugation.verbPhrase} ${bp.objectEn} and cannot get in right now.`;
    } else if (frame.frameKey === 'past_anchor_result_lost') {
      targetSentence = `${subject.en} ${conjugation.verbPhrase} ${bp.objectEn}, so the door was locked when we arrived.`;
    } else if (frame.frameKey === 'closed_past_years') {
      targetSentence = `${subject.en} ${conjugation.verbPhrase} ${bp.objectEn} from 2015 to 2020.`;
    } else {
      const endPart = frame.timePosition === 'end' && frame.timeEn ? ` ${frame.timeEn}` : '';
      targetSentence = `${subject.en} ${conjugation.verbPhrase} ${bp.objectEn}${endPart}.`;
    }
    targetSentence = targetSentence.replace(/\s+/g, ' ').replace(' ,', ',');

    // 6. Build natural, fluent Russian prompt
    const russianPrompt = this.buildNaturalRussianPrompt(bp, subject, frame);

    // 7. Collect tags
    const tags = [frame.tag];
    if (subject.thirdPerson) {
      tags.push('agreement-3rd-person');
    }
    if (VERBS[bp.verbKey]?.isStative) {
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

  /**
   * Generates authentic, grammatically correct Russian phrasing for any scene.
   */
  static buildNaturalRussianPrompt(bp, subject, frame) {
    const v = VERBS[bp.verbKey] || {};
    const g = subject.gender || 'm';
    const isPlural = g === 'pl';
    const subjNom = subject.ruNom;
    const subjMid = subject.ruMid || subject.ruLower || subject.ruNom;
    const subjGen = subject.ruGen || subject.ruNom;
    const objRu = bp.objectRu || '';

    // Verb inflections
    const genderKey = (g === 'f') ? 'f' : (g === 'pl' ? 'pl' : 'm');
    const pastImp = v.ruPastImp ? (v.ruPastImp[genderKey] || v.ruPastImp.m) : 'делал';
    const pastPerf = v.ruPastPerf ? (v.ruPastPerf[genderKey] || v.ruPastPerf.m) : 'сделал';

    const presKey = subject.presForm || (isPlural ? '3pl' : '3s');
    const presVerb = v.ruPres ? (v.ruPres[presKey] || v.ruPres['3s'] || '') : '';

    // A. Special: Stative Have (have_laptop)
    if (bp.id === 'have_laptop') {
      if (frame.frameKey === 'stative_open_duration' || frame.frameKey === 'stative_since') {
        return `У ${subjGen} ${objRu} ${frame.timeRu}.`;
      }
      if (frame.frameKey === 'stative_past_anchor') {
        return `${this.capitalize(frame.clauseRu)}, у ${subjGen} был ${objRu} ${frame.timeRu}.`;
      }
      if (frame.frameKey === 'closed_past_years') {
        return `С 2015 по 2020 год у ${subjGen} был ${objRu}.`;
      }
    }

    // B. Special: Stative Be (be_friends, be_married)
    if (bp.id === 'be_friends') {
      if (frame.frameKey === 'stative_open_duration' || frame.frameKey === 'stative_since') {
        return `${subjNom} близкие друзья ${frame.timeRu}.`;
      }
      if (frame.frameKey === 'stative_past_anchor') {
        return `${this.capitalize(frame.clauseRu)}, ${subjMid} были близкими друзьями ${frame.timeRu}.`;
      }
      if (frame.frameKey === 'closed_past_years') {
        return `${subjNom} были близкими друзьями ${frame.timeRu}.`;
      }
    }

    if (bp.id === 'be_married') {
      if (frame.frameKey === 'stative_open_duration' || frame.frameKey === 'stative_since') {
        return `${subjNom} в счастливом браке ${frame.timeRu}.`;
      }
      if (frame.frameKey === 'stative_past_anchor') {
        return `${this.capitalize(frame.clauseRu)}, ${subjMid} были в счастливом браке ${frame.timeRu}.`;
      }
      if (frame.frameKey === 'closed_past_years') {
        return `${subjNom} были в счастливом браке ${frame.timeRu}.`;
      }
    }

    // C. Special: Stative know (know_each_other)
    if (bp.id === 'know_each_other') {
      const knowPres = subject.presForm === '1pl' ? 'знаем' : 'знают';
      if (frame.frameKey === 'stative_open_duration' || frame.frameKey === 'stative_since') {
        return `${subjNom} ${knowPres} друг друга ${frame.timeRu}.`;
      }
      if (frame.frameKey === 'stative_past_anchor') {
        return `${this.capitalize(frame.clauseRu)}, ${subjMid} знали друг друга ${frame.timeRu}.`;
      }
      if (frame.frameKey === 'closed_past_years') {
        return `${subjNom} знали друг друга ${frame.timeRu}.`;
      }
    }

    // D. Special: Stative understand (understand_problem)
    if (bp.id === 'understand_problem') {
      if (frame.frameKey === 'stative_open_duration') {
        return `${subjNom} ${presVerb} ${objRu} ${frame.timeRu}.`;
      }
      if (frame.frameKey === 'stative_past_anchor') {
        return `${this.capitalize(frame.clauseRu)}, ${subjMid} ${pastImp} ${objRu} ${frame.timeRu}.`;
      }
    }

    // E. Dynamic Have Idioms (have_lunch, have_shower, have_meeting, have_break)
    if (bp.id === 'have_lunch') {
      const pastLunchImp = isPlural ? 'обедали' : (g === 'f' ? 'обедала' : 'обедал');
      const pastLunchPerf = isPlural ? 'пообедали' : (g === 'f' ? 'пообедала' : 'пообедал');
      if (frame.frameKey === 'past_moment_in_progress') {
        return `${this.capitalize(frame.clauseRu)}, ${subjMid} ${pastLunchImp} с коллегами.`;
      }
      if (frame.frameKey === 'present_result') {
        return `${subjNom} уже ${pastLunchPerf} с коллегами.`;
      }
      if (frame.frameKey === 'past_anchor_result') {
        return `${this.capitalize(frame.clauseRu)}, ${subjMid} уже ${pastLunchPerf} с коллегами.`;
      }
      if (frame.frameKey === 'closed_past_duration') {
        const leftWord = isPlural ? 'ушли' : (g === 'f' ? 'ушла' : 'ушёл');
        return `Вчера ${subjMid} ${pastLunchImp} с коллегами два часа, а затем ${leftWord}.`;
      }
    }

    if (bp.id === 'have_shower') {
      const pastShowerImp = isPlural ? 'принимали' : (g === 'f' ? 'принимала' : 'принимал');
      const pastShowerPerf = isPlural ? 'приняли' : (g === 'f' ? 'приняла' : 'принял');
      if (frame.frameKey === 'past_moment_in_progress') {
        return `${this.capitalize(frame.clauseRu)}, ${subjMid} ${pastShowerImp} тёплый душ.`;
      }
      if (frame.frameKey === 'present_result') {
        return `${subjNom} уже ${pastShowerPerf} тёплый душ.`;
      }
      if (frame.frameKey === 'past_anchor_result') {
        return `${this.capitalize(frame.clauseRu)}, ${subjMid} уже ${pastShowerPerf} тёплый душ.`;
      }
    }

    if (bp.id === 'have_meeting') {
      const pastMeetImp = isPlural ? 'проводили' : (g === 'f' ? 'проводила' : 'проводил');
      const pastMeetPerf = isPlural ? 'провели' : (g === 'f' ? 'провела' : 'провёл');
      if (frame.frameKey === 'past_moment_in_progress') {
        return `${this.capitalize(frame.clauseRu)}, ${subjMid} ${pastMeetImp} срочную встречу.`;
      }
      if (frame.frameKey === 'open_duration') {
        return `${subjNom} ${presVerb} срочную встречу уже два часа.`;
      }
      if (frame.frameKey === 'past_anchor_duration') {
        return `${this.capitalize(frame.clauseRu)}, ${subjMid} ${pastMeetImp} срочную встречу уже два часа.`;
      }
      if (frame.frameKey === 'present_result') {
        return `${subjNom} уже ${pastMeetPerf} срочную встречу.`;
      }
    }

    if (bp.id === 'have_break') {
      const pastBreakImp = isPlural ? 'были' : (g === 'f' ? 'была' : 'был');
      const pastBreakPerf = isPlural ? 'сделали' : (g === 'f' ? 'сделала' : 'сделал');
      if (frame.frameKey === 'past_moment_in_progress') {
        return `${this.capitalize(frame.clauseRu)}, ${subjMid} ${pastBreakImp} на перерыве на кофе.`;
      }
      if (frame.frameKey === 'present_result') {
        return `${subjNom} уже ${pastBreakPerf} перерыв на кофе.`;
      }
      if (frame.frameKey === 'past_anchor_result') {
        return `${this.capitalize(frame.clauseRu)}, ${subjMid} уже ${pastBreakPerf} перерыв на кофе.`;
      }
    }

    // F. Lost keys
    if (bp.id === 'lose_keys') {
      if (frame.frameKey === 'present_result_lost') {
        const cannotEnter = isPlural ? 'не могут попасть внутрь' : (g === 'i' ? 'не могу попасть внутрь' : 'не может попасть внутрь');
        return `${subjNom} ${pastPerf} ключи от офиса и прямо сейчас ${cannotEnter}.`;
      }
      if (frame.frameKey === 'past_anchor_result_lost') {
        return `${subjNom} ${pastPerf} ключи от офиса, поэтому дверь была заперта, когда мы пришли.`;
      }
      if (frame.frameKey === 'closed_past_lost') {
        const foundWord = isPlural ? 'нашли' : (g === 'f' ? 'нашла' : 'нашёл');
        return `На прошлой неделе ${subjMid} ${pastPerf} ключи от офиса, но на следующий день ${foundWord} их.`;
      }
    }

    // G. Event Results (prices_fall, crash_database, system_fail)
    if (bp.category === 'result_event') {
      if (frame.frameKey === 'present_result') {
        return `${subjNom} уже ${objRu} ${pastPerf}.`;
      }
      if (frame.frameKey === 'past_anchor_result') {
        return `${this.capitalize(frame.clauseRu)}, ${subjMid} уже ${objRu} ${pastPerf}.`;
      }
      if (frame.frameKey === 'closed_past_event') {
        return `Вчера ${subjMid} ${objRu} ${pastPerf}.`;
      }
    }

    // H. General Dynamic Activities & Results
    switch (frame.frameKey) {
      case 'open_duration':
      case 'present_since':
        return `${subjNom} ${presVerb} ${objRu} ${frame.timeRu}.`;

      case 'past_anchor_duration':
        return `${this.capitalize(frame.clauseRu)}, ${subjMid} ${pastImp} ${objRu} ${frame.timeRu}.`;

      case 'past_moment_in_progress':
        return `${this.capitalize(frame.clauseRu)}, ${subjMid} ${pastImp} ${objRu}.`;

      case 'present_count':
        return `${subjNom} сегодня уже три раза ${pastImp} ${objRu}.`;

      case 'past_anchor_count':
        return `${subjNom} уже три раза ${pastImp} ${objRu} ${frame.clauseRu}.`;

      case 'present_result':
        return `${subjNom} уже ${pastPerf} ${objRu}.`;

      case 'past_anchor_result':
        return `${this.capitalize(frame.clauseRu)}, ${subjMid} уже ${pastPerf} ${objRu}.`;

      case 'closed_past_duration': {
        const leftWord = isPlural ? 'ушли' : (g === 'f' ? 'ушла' : 'ушёл');
        return `Вчера ${subjMid} ${pastImp} ${objRu} два часа, а затем ${leftWord}.`;
      }

      case 'closed_past_years':
        return `${subjNom} ${pastImp} ${objRu} ${frame.timeRu}.`;

      case 'closed_past_event':
        return `Вчера ${subjMid} ${pastPerf} ${objRu}.`;

      default:
        return `${subjNom} ${presVerb} ${objRu} ${frame.timeRu || ''}.`;
    }
  }

  static capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

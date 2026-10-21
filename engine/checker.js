import { Conjugator } from './conjugator.js';

export class Checker {
  /**
   * Evaluates user input against target sentence and alternative phrases.
   * Tolerant and smart: accepts verb-only, subject+verb, and full sentences.
   *
   * @param {string} userInput - The string entered by the user
   * @param {object} card - The card object
   * @param {boolean} verbOnlyMode - Hint whether user chose quick mode (never penalizes for full sentence)
   * @returns {object} { isCorrect, diagnosis, matchedAnswer, feedbackTag, correction, userInput }
   */
  static evaluate(userInput, card, verbOnlyMode = false) {
    if (!userInput || !userInput.trim()) {
      return {
        isCorrect: false,
        userInput: '',
        diagnosis: '⚠️ Ответ не введён. Введи глагол (например, have been waiting) или всё предложение.',
        feedbackTag: 'empty',
        correction: card.targetVerbPhrase || card.targetSentence
      };
    }

    const rawInput = userInput.trim();
    const normInput = Conjugator.normalize(rawInput);
    const expInput = Conjugator.normalize(Conjugator.expandContractions(normInput));

    // Best display correction: show both short verb and full sentence for maximum clarity
    const primaryVerb = card.targetVerbPhrase || '';
    const primarySentence = card.targetSentence || '';
    const displayCorrection = primaryVerb ? `${primaryVerb}  (целиком: "${primarySentence}")` : primarySentence;

    // Build comprehensive pool of all acceptable variants
    const acceptable = new Set();

    // 1. Verb phrase variants
    if (primaryVerb) {
      Conjugator.getEquivalents(primaryVerb).forEach(eq => acceptable.add(eq));
    }

    // 2. Full sentence variants
    if (primarySentence) {
      Conjugator.getEquivalents(primarySentence).forEach(eq => acceptable.add(eq));
    }

    // 3. Subject + verb phrase variants (e.g. "I have been waiting", "I've been waiting")
    if (card.subject && primaryVerb) {
      const subjVerbFull = `${card.subject} ${primaryVerb}`;
      Conjugator.getEquivalents(subjVerbFull).forEach(eq => acceptable.add(eq));

      // Subject with contracted auxiliary
      const is3rd = Conjugator.isThirdPersonSingular(card.subject);
      if (primaryVerb.startsWith('have ')) {
        const contracted = `${card.subject}'ve ${primaryVerb.slice(5)}`;
        Conjugator.getEquivalents(contracted).forEach(eq => acceptable.add(eq));
      } else if (primaryVerb.startsWith('has ')) {
        const contracted = `${card.subject}'s ${primaryVerb.slice(4)}`;
        Conjugator.getEquivalents(contracted).forEach(eq => acceptable.add(eq));
      } else if (primaryVerb.startsWith('had ')) {
        const contracted = `${card.subject}'d ${primaryVerb.slice(4)}`;
        Conjugator.getEquivalents(contracted).forEach(eq => acceptable.add(eq));
      }
    }

    // 4. Extra acceptable answers from card data
    if (card.acceptableAnswers && Array.isArray(card.acceptableAnswers)) {
      card.acceptableAnswers.forEach(ans => {
        Conjugator.getEquivalents(ans).forEach(eq => acceptable.add(eq));
      });
    }

    // Direct match check across all equivalents
    for (const cand of acceptable) {
      if (normInput === cand || expInput === cand) {
        return {
          isCorrect: true,
          userInput: rawInput,
          diagnosis: '✅ Идеально! Форма и время выбраны безупречно.',
          matchedAnswer: cand,
          feedbackTag: null,
          correction: displayCorrection
        };
      }
    }

    // Input with leading subject stripped (e.g. user typed "I have been waiting" when checking against verb phrase)
    const strippedSubjectInput = this.stripLeadingSubject(normInput, card.subject);
    const expStrippedInput = Conjugator.normalize(Conjugator.expandContractions(strippedSubjectInput));
    for (const cand of acceptable) {
      if (strippedSubjectInput === cand || expStrippedInput === cand) {
        return {
          isCorrect: true,
          userInput: rawInput,
          diagnosis: '✅ Идеально! Форма выбрана верно.',
          matchedAnswer: cand,
          feedbackTag: null,
          correction: displayCorrection
        };
      }
    }

    // Substring match: if user wrote a full sentence or extra words, and it contains the exact correct verb group
    if (primaryVerb) {
      const expVerb = Conjugator.normalize(Conjugator.expandContractions(primaryVerb));
      const normVerb = Conjugator.normalize(primaryVerb);
      if (expInput.includes(expVerb) || normInput.includes(normVerb)) {
        // Ensure no 3rd person agreement clash in the rest of input
        const agreementBad = this.hasAgreementClash(expInput, card.subject);
        if (!agreementBad) {
          return {
            isCorrect: true,
            userInput: rawInput,
            diagnosis: '✅ Верно! Глагольная конструкция выбрана абсолютно точно.',
            matchedAnswer: primaryVerb,
            feedbackTag: null,
            correction: displayCorrection
          };
        }
      }
    }

    // Run structural error diagnostics
    const diagnosisResult = this.diagnoseError(normInput, expInput, card);

    return {
      isCorrect: false,
      userInput: rawInput,
      diagnosis: diagnosisResult.message,
      feedbackTag: diagnosisResult.tag,
      correction: displayCorrection
    };
  }

  static stripLeadingSubject(text, subject) {
    if (!text) return '';
    let res = text.trim();
    const commonSubjs = ['i', 'you', 'we', 'they', 'he', 'she', 'it'];
    if (subject) commonSubjs.push(subject.trim().toLowerCase());

    for (const s of commonSubjs) {
      if (res.startsWith(`${s} `)) {
        res = res.slice(s.length + 1).trim();
        break;
      }
    }
    return res;
  }

  static hasAgreementClash(text, subject) {
    if (!subject) return false;
    const is3rd = Conjugator.isThirdPersonSingular(subject);
    const s = subject.trim().toLowerCase();
    // e.g. "she have been"
    if (is3rd && new RegExp(`\\b${s}\\s+(have|have been)\\b`).test(text)) {
      return true;
    }
    // e.g. "i has been"
    if (!is3rd && new RegExp(`\\b${s}\\s+(has|has been)\\b`).test(text)) {
      return true;
    }
    return false;
  }

  /**
   * Diagnostic engine to pinpoint the conceptual/mechanical root of the mistake.
   */
  static diagnoseError(normInput, expInput, card) {
    const is3rd = Conjugator.isThirdPersonSingular(card.subject);
    const text = expInput;

    // 1. Agreement: 3rd person singular with have instead of has
    if (is3rd && /\b(have|have been)\b/.test(text) && !/\b(has|has been)\b/.test(text)) {
      return {
        tag: 'agreement-3rd-person',
        message: `⚡ Сбой согласования (3-е лицо): с подлежащим «${card.subject}» (он / она / оно) нужен «has», а не «have».`
      };
    }

    // 2. Agreement: I / we / they with has instead of have
    if (!is3rd && /\b(has|has been)\b/.test(text) && !/\b(have|have been)\b/.test(text)) {
      return {
        tag: 'agreement-3rd-person',
        message: `⚡ Сбой согласования: с местоимением «${card.subject}» используется «have», а не «has».`
      };
    }

    // 3. Anchor confusion: used have/has when Past Perfect (had) is required
    if ((card.tense === 'past_perfect_simple' || card.tense === 'past_perfect_continuous') &&
        /\b(have|has|have been|has been)\b/.test(text) && !/\bhad\b/.test(text)) {
      return {
        tag: 'anchor-present-vs-past',
        message: '🧭 Сбой точки отсчёта: ситуация привязана к моменту в прошлом (прошлый якорь). Нужен Past Perfect («had»), а не Present Perfect («have/has»).'
      };
    }

    // 4. Anchor confusion: used had when Present Perfect (have/has) is required
    if ((card.tense === 'present_perfect_simple' || card.tense === 'present_perfect_continuous') &&
        /\b(had|had been)\b/.test(text) && !/\b(have|has)\b/.test(text)) {
      return {
        tag: 'anchor-present-vs-past',
        message: '🧭 Сбой точки отсчёта: действие связано с настоящим моментом (сейчас), прошлого якоря нет. Нужен Present Perfect («have/has»), а не «had».'
      };
    }

    // 5. Stative verb in Continuous (e.g. been knowing, been having a car/phone, been being)
    if (/\bbeen (knowing|having|being|understanding|believing|remembering|seeing)\b/.test(text)) {
      return {
        tag: 'stative-lock',
        message: '🛑 Ловушка глагола состояния (Stative Verb): глаголы состояния (know, have [владение], be, understand) не используются в Continuous даже при указании длительности! Нужен Simple Perfect (have/had known, have/had had).'
      };
    }

    // 6. Count / repetition used with Continuous
    if (/\b(three times|twice|several times|how many)\b/.test(text) && /\bbeen \w+ing\b/.test(text)) {
      return {
        tag: 'process-vs-count',
        message: '🔢 Ловушка счёта: когда указано количество раз или готовый результат (three times / how many), это итог, а не процесс — нужен Simple Perfect, а не Continuous!'
      };
    }

    // 7. Closed past anchor used with Present Perfect
    if (/\b(yesterday|last (year|week|night|month)|in 20\d\d|ago|when i was a child)\b/.test(text) &&
        /\b(have|has) (been|\w+ed|\w+en)\b/.test(text)) {
      return {
        tag: 'open-vs-closed-period',
        message: '🔒 Ловушка закрытого периода: слова-якоря в прошлом (yesterday, ago, in 2021) отрезают действие от настоящего — Present Perfect с ними запрещён! Нужен Past Simple.'
      };
    }

    // 8. 2nd form (Past Simple) used instead of 3rd form (Participle) with have/has/had
    if (/\b(have|has|had) (broke|wrote|went|saw|fell|drove|ran|drank|ate)\b/.test(text)) {
      return {
        tag: 'irregular-forms',
        message: '🔤 Ошибка формы причастия: после have/has/had требуется третья форма глагола (V3 / Past Participle: broken, written, gone, seen, fallen, driven, run, drunk, eaten), а не вторая.'
      };
    }

    // 9. Missing auxiliary verb
    if (/\b(i|he|she|they|we) been \w+ing\b/.test(text)) {
      return {
        tag: 'missing-auxiliary',
        message: '⚙️ Пропущен вспомогательный глагол: перед «been doing» обязательно нужен have, has или had!'
      };
    }

    // Default guidance based on card tense
    return {
      tag: card.tags && card.tags[0] ? card.tags[0] : 'general',
      message: card.explanation || `Проверь форму времени. Ожидалось время: ${this.humanTenseName(card.tense)}.`
    };
  }

  static humanTenseName(tense) {
    const names = {
      present_perfect_simple: 'Present Perfect Simple (have/has + V3)',
      present_perfect_continuous: 'Present Perfect Continuous (have/has been + -ing)',
      past_perfect_simple: 'Past Perfect Simple (had + V3)',
      past_perfect_continuous: 'Past Perfect Continuous (had been + -ing)',
      past_simple: 'Past Simple (did / V2)',
      past_continuous: 'Past Continuous (was/were + -ing)'
    };
    return names[tense] || tense;
  }
}

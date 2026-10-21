import { VERBS } from '../data/verbs.js';

export class Conjugator {
  /**
   * Determine if the subject is 3rd person singular.
   */
  static isThirdPersonSingular(subject) {
    if (!subject) return false;
    const s = subject.trim().toLowerCase();
    const thirdSingulars = ['he', 'she', 'it', 'alex', 'sarah', 'my brother', 'my sister', 'the team', 'the server', 'john', 'anna', 'mark', 'the courier', 'the bus', 'the company'];
    if (thirdSingulars.includes(s)) return true;
    if (s.startsWith('the ') && !s.endsWith('s')) return true;
    if (s.startsWith('my ') && !s.endsWith('s') && !s.includes('parents') && !s.includes('friends')) return true;
    return false;
  }

  /**
   * Normalize input text: lowercases, trims whitespace, standardizes punctuation and contractions.
   */
  static normalize(text) {
    if (!text) return '';
    let norm = text.trim().toLowerCase();
    // remove end period/question mark/exclamation
    norm = norm.replace(/[.?!]+$/, '');
    // normalize spaces
    norm = norm.replace(/\s+/g, ' ');
    // normalize curly apostrophes
    norm = norm.replace(/’/g, "'");
    return norm;
  }

  /**
   * Expand common contractions into full words for uniform comparison.
   */
  static expandContractions(text) {
    let s = text;
    s = s.replace(/\bi'm\b/g, 'i am');
    s = s.replace(/\byou're\b/g, 'you are');
    s = s.replace(/\bwe're\b/g, 'we are');
    s = s.replace(/\bthey're\b/g, 'they are');
    s = s.replace(/\bhe's\b/g, 'he is'); // or he has depending on context
    s = s.replace(/\bshe's\b/g, 'she is');
    s = s.replace(/\bit's\b/g, 'it is');
    s = s.replace(/\bi've\b/g, 'i have');
    s = s.replace(/\byou've\b/g, 'you have');
    s = s.replace(/\bwe've\b/g, 'we have');
    s = s.replace(/\bthey've\b/g, 'they have');
    s = s.replace(/\bi'd\b/g, 'i had'); // or would
    s = s.replace(/\byou'd\b/g, 'you had');
    s = s.replace(/\bwe'd\b/g, 'we had');
    s = s.replace(/\bthey'd\b/g, 'they had');
    s = s.replace(/\bhe'd\b/g, 'he had');
    s = s.replace(/\bshe'd\b/g, 'she had');
    s = s.replace(/\bit'd\b/g, 'it had');
    s = s.replace(/\bhaven't\b/g, 'have not');
    s = s.replace(/\bhasn't\b/g, 'has not');
    s = s.replace(/\bhadn't\b/g, 'had not');
    s = s.replace(/\bdidn't\b/g, 'did not');
    s = s.replace(/\bwasn't\b/g, 'was not');
    s = s.replace(/\bweren't\b/g, 'were not');
    s = s.replace(/\bdon't\b/g, 'do not');
    s = s.replace(/\bdoesn't\b/g, 'does not');
    return s;
  }

  /**
   * Produce a set of normalized equivalence strings for a given target sentence.
   */
  static getEquivalents(text) {
    const list = new Set();
    const raw = this.normalize(text);
    list.add(raw);
    const expanded = this.normalize(this.expandContractions(raw));
    list.add(expanded);

    // Number word replacements (e.g. "two" <-> "2", "three" <-> "3")
    const withDigits = expanded
      .replace(/\bone\b/g, '1')
      .replace(/\btwo\b/g, '2')
      .replace(/\bthree\b/g, '3')
      .replace(/\bfour\b/g, '4')
      .replace(/\bfive\b/g, '5');
    list.add(this.normalize(withDigits));

    const withWords = raw
      .replace(/\b1\b/g, 'one')
      .replace(/\b2\b/g, 'two')
      .replace(/\b3\b/g, 'three')
      .replace(/\b4\b/g, 'four')
      .replace(/\b5\b/g, 'five');
    list.add(this.normalize(withWords));

    return Array.from(list);
  }

  /**
   * Conjugates a verb key into a specific tense and polarity.
   * Returns: { fullPhrase, verbOnlyPhrase, alternatives }
   */
  static conjugate(verbKey, subject, tense, form = 'affirmative', adverb = '') {
    const verb = VERBS[verbKey];
    if (!verb) {
      throw new Error(`Verb key not found in dictionary: ${verbKey}`);
    }

    const is3rd = this.isThirdPersonSingular(subject);
    const isI = subject.trim().toLowerCase() === 'i';
    let verbPhrase = '';
    const alts = [];

    // Helper for adverb placement
    const advStr = adverb ? ` ${adverb}` : '';

    switch (tense) {
      case 'present_perfect_simple': {
        const aux = is3rd ? 'has' : 'have';
        const auxContracted = is3rd ? "'s" : "'ve";
        const part = verb.participle;
        if (form === 'affirmative') {
          if (adverb) {
            verbPhrase = `${aux} ${adverb} ${part}`;
            alts.push(`${subject}${auxContracted} ${adverb} ${part}`);
          } else {
            verbPhrase = `${aux} ${part}`;
            alts.push(`${subject}${auxContracted} ${part}`);
          }
        } else if (form === 'negative') {
          verbPhrase = `${aux} not ${part}`;
          alts.push(`${aux}n't ${part}`);
        } else if (form === 'question') {
          verbPhrase = `${aux} ${subject} ${part}`;
        }
        break;
      }

      case 'present_perfect_continuous': {
        if (verb.isStative) {
          // Statives fall back to simple
          return this.conjugate(verbKey, subject, 'present_perfect_simple', form, adverb);
        }
        const aux = is3rd ? 'has' : 'have';
        const auxContracted = is3rd ? "'s" : "'ve";
        const ing = verb.ing;
        if (form === 'affirmative') {
          verbPhrase = `${aux} been ${ing}`;
          alts.push(`${subject}${auxContracted} been ${ing}`);
        } else if (form === 'negative') {
          verbPhrase = `${aux} not been ${ing}`;
          alts.push(`${aux}n't been ${ing}`);
        } else if (form === 'question') {
          verbPhrase = `${aux} ${subject} been ${ing}`;
        }
        break;
      }

      case 'past_perfect_simple': {
        const aux = 'had';
        const auxContracted = "'d";
        const part = verb.participle;
        if (form === 'affirmative') {
          if (adverb) {
            verbPhrase = `had ${adverb} ${part}`;
            alts.push(`${subject}${auxContracted} ${adverb} ${part}`);
          } else {
            verbPhrase = `had ${part}`;
            alts.push(`${subject}${auxContracted} ${part}`);
          }
        } else if (form === 'negative') {
          verbPhrase = `had not ${part}`;
          alts.push(`hadn't ${part}`);
        } else if (form === 'question') {
          verbPhrase = `had ${subject} ${part}`;
        }
        break;
      }

      case 'past_perfect_continuous': {
        if (verb.isStative) {
          // Statives fall back to simple
          return this.conjugate(verbKey, subject, 'past_perfect_simple', form, adverb);
        }
        const ing = verb.ing;
        if (form === 'affirmative') {
          verbPhrase = `had been ${ing}`;
          alts.push(`${subject}'d been ${ing}`);
        } else if (form === 'negative') {
          verbPhrase = `had not been ${ing}`;
          alts.push(`hadn't been ${ing}`);
        } else if (form === 'question') {
          verbPhrase = `had ${subject} been ${ing}`;
        }
        break;
      }

      case 'past_simple': {
        if (verb.base === 'be') {
          const wasOrWere = isI || is3rd ? 'was' : 'were';
          if (form === 'affirmative') {
            verbPhrase = wasOrWere;
          } else if (form === 'negative') {
            verbPhrase = `${wasOrWere} not`;
            alts.push(wasOrWere === 'was' ? "wasn't" : "weren't");
          } else if (form === 'question') {
            verbPhrase = `${wasOrWere} ${subject}`;
          }
        } else {
          const past = verb.past;
          if (form === 'affirmative') {
            verbPhrase = past;
            if (verb.altPast) alts.push(verb.altPast);
          } else if (form === 'negative') {
            verbPhrase = `did not ${verb.base}`;
            alts.push(`didn't ${verb.base}`);
          } else if (form === 'question') {
            verbPhrase = `did ${subject} ${verb.base}`;
          }
        }
        break;
      }

      case 'past_continuous': {
        const wasOrWere = isI || is3rd ? 'was' : 'were';
        const ing = verb.ing;
        if (form === 'affirmative') {
          verbPhrase = `${wasOrWere} ${ing}`;
        } else if (form === 'negative') {
          verbPhrase = `${wasOrWere} not ${ing}`;
          alts.push(wasOrWere === 'was' ? `wasn't ${ing}` : `weren't ${ing}`);
        } else if (form === 'question') {
          verbPhrase = `${wasOrWere} ${subject} ${ing}`;
        }
        break;
      }

      default:
        throw new Error(`Unsupported tense: ${tense}`);
    }

    return {
      verbPhrase: verbPhrase.trim(),
      alternatives: alts
    };
  }
}

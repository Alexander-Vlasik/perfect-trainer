/**
 * SRS and System 1 Mastery Tracker.
 * Tracks skill reliability without time pressure.
 * Reinforces pathways based on error tags.
 */

const STORAGE_KEY = 'perfect_trainer_progress_v1';

export const SKILL_TAGS = {
  'anchor-present-vs-past': {
    title: 'Точка отсчёта (have vs had)',
    desc: 'Выбор Present vs Past Perfect по привязке к сейчас или прошлому моменту'
  },
  'agreement-3rd-person': {
    title: 'Согласование 3-го лица (has/have)',
    desc: 'Автоматический выбор has/have, was/were в зависимости от he/she/it'
  },
  'open-vs-closed-period': {
    title: 'Открытый vs закрытый период',
    desc: 'Различие открытых периодов (today, since) и закрытых якорей (yesterday, in 2021)'
  },
  'stative-lock': {
    title: 'Глаголы состояния (Stative lock)',
    desc: 'Запрет Continuous для know, have (владение), be, understand'
  },
  'have-idioms': {
    title: 'Конструкции с have / have got',
    desc: 'have lunch/party (активность) vs have a car (состояние); haven\'t had, had had'
  },
  'process-vs-count': {
    title: 'Процесс vs Счёт / Результат',
    desc: 'Continuous при how long/duration vs Simple при three times/how many'
  },
  'in-progress-vs-prior': {
    title: 'В момент vs До момента',
    desc: 'Различие was doing (в сам момент) и had been doing (до момента в прошлом)'
  },
  'irregular-forms': {
    title: 'Неправильные формы (V2 vs V3)',
    desc: 'broken, written, gone, fallen, seen vs broke, wrote, went, fell, saw'
  }
};

export class SRSManager {
  constructor() {
    this.state = this.loadState();
  }

  loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Could not load progress from localStorage:', e);
    }

    // Default state
    const tags = {};
    Object.keys(SKILL_TAGS).forEach(t => {
      tags[t] = {
        attempts: 0,
        correct: 0,
        streak: 0,
        mastery: 0, // 0 to 100%
        lastTrained: null
      };
    });

    return {
      version: 1,
      totalAnswered: 0,
      totalCorrect: 0,
      currentStreak: 0,
      bestStreak: 0,
      tags: tags,
      history: []
    };
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save progress to localStorage:', e);
    }
  }

  recordResult(tag, isCorrect) {
    this.state.totalAnswered += 1;
    if (isCorrect) {
      this.state.totalCorrect += 1;
      this.state.currentStreak += 1;
      if (this.state.currentStreak > this.state.bestStreak) {
        this.state.bestStreak = this.state.currentStreak;
      }
    } else {
      this.state.currentStreak = 0;
    }

    if (tag && this.state.tags[tag]) {
      const t = this.state.tags[tag];
      t.attempts += 1;
      t.lastTrained = Date.now();

      if (isCorrect) {
        t.correct += 1;
        t.streak += 1;
        // Calm accuracy boosts mastery
        t.mastery = Math.min(100, Math.round(t.mastery + 10 + (t.streak * 2)));
      } else {
        t.streak = 0;
        // Mistake lowers mastery and flags tag for more practice
        t.mastery = Math.max(0, Math.round(t.mastery - 15));
      }
    }

    this.saveState();
  }

  getOverallMastery() {
    const tagKeys = Object.keys(this.state.tags);
    if (!tagKeys.length) return 0;
    const sum = tagKeys.reduce((acc, k) => acc + (this.state.tags[k].mastery || 0), 0);
    return Math.round(sum / tagKeys.length);
  }

  getWeakestTags(count = 3) {
    const list = Object.keys(this.state.tags).map(k => ({
      tag: k,
      ...this.state.tags[k]
    }));
    // Sort by mastery ascending, then by attempts
    list.sort((a, b) => a.mastery - b.mastery || a.attempts - b.attempts);
    return list.slice(0, count).map(item => item.tag);
  }

  exportJSON() {
    return JSON.stringify(this.state, null, 2);
  }

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.tags) {
        this.state = parsed;
        this.saveState();
        return true;
      }
    } catch (e) {
      console.error('Import failed:', e);
    }
    return false;
  }

  resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    this.state = this.loadState();
  }
}

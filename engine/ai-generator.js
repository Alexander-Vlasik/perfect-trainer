/**
 * Optional AI generator for continuous on-demand card expansion
 * using Google Gemini API (Bring Your Own Key - BYOK).
 * Works offline if no API key is provided.
 */

const API_KEY_STORAGE = 'perfect_trainer_gemini_api_key';

export class AIGenerator {
  static getApiKey() {
    return localStorage.getItem(API_KEY_STORAGE) || '';
  }

  static setApiKey(key) {
    if (!key) {
      localStorage.removeItem(API_KEY_STORAGE);
    } else {
      localStorage.setItem(API_KEY_STORAGE, key.trim());
    }
  }

  static isConfigured() {
    return Boolean(this.getApiKey());
  }

  /**
   * Generates a new 4-step progressive cascade targeted at specific weak tags.
   */
  static async generateCustomCascade(targetTags = ['anchor-present-vs-past']) {
    const key = this.getApiKey();
    if (!key) {
      throw new Error('API ключ не настроен. Открой настройки и введи свой ключ Gemini API (Google AI Studio).');
    }

    const prompt = `
Ты опытный методист английской грамматики по курсу Murphy (English Grammar in Use).
Создай один 4-шаговый прогрессивный каскад (мутацию контекста) на тему Present Perfect vs Past Perfect vs Past Simple.
Слабые темы ученика: ${targetTags.join(', ')}.

Формат ответа СТРОГО в формате JSON без markdown обёрток:
{
  "id": "custom_${Date.now()}",
  "title": "Краткое название сцены",
  "steps": [
    {
      "mutation": "Описание смены контекста",
      "ru": "Русское предложение для перевода",
      "hint": "подсказка ключевых слов",
      "en": "Эталонное английское предложение",
      "verb": "только глагольный узел",
      "acceptable": ["вариант 1", "вариант 2"],
      "tense": "одно из: present_perfect_continuous | past_perfect_continuous | present_perfect_simple | past_perfect_simple | past_simple | past_continuous",
      "tags": ["${targetTags[0]}"],
      "explanation": "Объяснение смены геометрии времени"
    }
  ]
}
Каскад должен содержать ровно 4 логически связанных шага одной истории.
`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(key)}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7
        }
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errBody}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidate) {
      throw new Error('Пустой ответ от Gemini API.');
    }

    const parsed = JSON.parse(candidate);
    return parsed;
  }
}

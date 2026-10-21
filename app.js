import { CardGenerator } from './engine/generator.js';
import { Checker } from './engine/checker.js';
import { SRSManager, SKILL_TAGS } from './engine/srs.js';
import { AIGenerator } from './engine/ai-generator.js';
import { CASCADES } from './data/cascades.js';
import { XRAY_TASKS } from './data/xray.js';
import { BUG_TASKS } from './data/bug-detector.js';

class App {
  constructor() {
    this.srs = new SRSManager();
    this.activeMode = 'cascades'; // cascades | builder | xray | bug_detector
    
    // State for Cascade mode
    this.currentCascadeIndex = 0;
    this.currentCascadeStepIndex = 0;
    this.cascadeStepResults = [];
    
    // State for current card
    this.currentCard = null;
    this.isFeedbackVisible = false;
    this.feedbackShownAt = 0;
    this.verbOnlyMode = true;
    this.focusWeak = false;

    // DOM Elements
    this.dom = {
      valMastery: document.getElementById('val-mastery'),
      valStreak: document.getElementById('val-streak'),
      valTotal: document.getElementById('val-total'),
      badgeMode: document.getElementById('badge-mode'),
      badgeTag: document.getElementById('badge-tag'),
      cascadeHistory: document.getElementById('cascade-history'),
      labelMutation: document.getElementById('label-mutation'),
      promptRu: document.getElementById('prompt-ru'),
      promptScaffold: document.getElementById('prompt-scaffold'),
      areaTextInput: document.getElementById('area-text-input'),
      userTextInput: document.getElementById('user-text-input'),
      inlineVerdictBanner: document.getElementById('inline-verdict-banner'),
      areaOptions: document.getElementById('area-options'),
      areaBugActions: document.getElementById('area-bug-actions'),
      btnBugOk: document.getElementById('btn-bug-ok'),
      btnBugFix: document.getElementById('btn-bug-fix'),
      btnHint: document.getElementById('btn-hint'),
      btnSkip: document.getElementById('btn-skip'),
      btnSubmit: document.getElementById('btn-submit'),
      feedbackBox: document.getElementById('feedback-box'),
      feedbackTitle: document.getElementById('feedback-title'),
      feedbackDiagnosis: document.getElementById('feedback-diagnosis'),
      feedbackTarget: document.getElementById('feedback-target'),
      timelineSvg: document.getElementById('timeline-svg'),
      btnNext: document.getElementById('btn-next'),
      modalDashboard: document.getElementById('modal-dashboard'),
      modalSettings: document.getElementById('modal-settings'),
      dashboardSkillsGrid: document.getElementById('dashboard-skills-grid'),
      btnOpenDashboard: document.getElementById('btn-open-dashboard'),
      btnCloseDashboard: document.getElementById('btn-close-dashboard'),
      btnCloseDashboardAction: document.getElementById('btn-close-dashboard-action'),
      btnResetProgress: document.getElementById('btn-reset-progress'),
      btnOpenSettings: document.getElementById('btn-open-settings'),
      btnCloseSettings: document.getElementById('btn-close-settings'),
      btnSaveSettings: document.getElementById('btn-save-settings'),
      btnToggleTheme: document.getElementById('btn-toggle-theme'),
      inpApiKey: document.getElementById('inp-api-key'),
      btnExportJson: document.getElementById('btn-export-json'),
      btnImportJson: document.getElementById('btn-import-json'),
      fileImportInput: document.getElementById('file-import-input'),
      chkFocusWeak: document.getElementById('chk-focus-weak'),
      chkVerbOnly: document.getElementById('chk-verb-only'),
      verbModeContainer: document.getElementById('verb-mode-container')
    };

    this.init();
  }

  init() {
    this.setupListeners();
    this.updateHeaderStats();
    this.loadCard();
  }

  setupListeners() {
    // Mode navigation
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeMode = tab.dataset.mode;
        this.loadCard();
      });
    });

    // Switches
    this.dom.chkFocusWeak.addEventListener('change', (e) => {
      this.focusWeak = e.target.checked;
      this.loadCard();
    });

    this.dom.chkVerbOnly.addEventListener('change', (e) => {
      this.verbOnlyMode = e.target.checked;
      this.updateScaffoldDisplay();
    });

    // Actions
    this.dom.btnSubmit.addEventListener('click', () => this.handleSubmit());
    this.dom.btnNext.addEventListener('click', (e) => {
      e.preventDefault();
      const elapsed = Date.now() - (this.feedbackShownAt || 0);
      if (elapsed < 500) return;
      this.handleNext();
    });
    this.dom.btnSkip.addEventListener('click', () => this.handleSkip());
    this.dom.btnHint.addEventListener('click', () => this.showHint());

    // Enter in input field
    this.dom.userTextInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isFeedbackVisible) {
          this.handleSubmit();
        }
      }
    });

    // Bug buttons
    this.dom.btnBugOk.addEventListener('click', () => this.handleBugAnswer(true));
    this.dom.btnBugFix.addEventListener('click', () => this.handleBugAnswer(false));

    // Keyboard navigation
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));

    // Modals
    this.dom.btnOpenDashboard.addEventListener('click', () => this.openDashboard());
    this.dom.btnCloseDashboard.addEventListener('click', () => this.closeDashboard());
    this.dom.btnCloseDashboardAction.addEventListener('click', () => this.closeDashboard());
    this.dom.btnResetProgress.addEventListener('click', () => {
      if (confirm('Сбросить весь накопленный прогресс и серии?')) {
        this.srs.resetProgress();
        this.updateHeaderStats();
        this.renderDashboardSkills();
      }
    });

    this.dom.btnOpenSettings.addEventListener('click', () => this.openSettings());
    this.dom.btnCloseSettings.addEventListener('click', () => this.closeSettings());
    this.dom.btnSaveSettings.addEventListener('click', () => {
      AIGenerator.setApiKey(this.dom.inpApiKey.value);
      this.closeSettings();
    });

    // Theme toggle
    this.dom.btnToggleTheme.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
    });

    // Export / Import
    this.dom.btnExportJson.addEventListener('click', () => {
      const blob = new Blob([this.srs.exportJSON()], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `perfect_system1_progress_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    });

    this.dom.btnImportJson.addEventListener('click', () => {
      this.dom.fileImportInput.click();
    });

    this.dom.fileImportInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          if (this.srs.importJSON(evt.target.result)) {
            alert('Прогресс успешно загружен!');
            this.updateHeaderStats();
            this.renderDashboardSkills();
          } else {
            alert('Ошибка чтения JSON файла.');
          }
        };
        reader.readAsText(file);
      }
    });
  }

  handleKeyDown(e) {
    // If modal open, Escape closes it
    if (e.key === 'Escape') {
      this.closeDashboard();
      this.closeSettings();
      return;
    }

    // Number keys 1-4 in multiple choice modes
    if (!this.isFeedbackVisible && (this.activeMode === 'xray' || (this.activeMode === 'bug_detector' && this.currentCard.isFixPhase))) {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 4) {
        const optBtn = document.querySelector(`.option-btn[data-index="${num - 1}"]`);
        if (optBtn) {
          optBtn.click();
          return;
        }
      }
    }

    // Enter key
    if (e.key === 'Enter') {
      e.preventDefault();
      if (this.isFeedbackVisible) {
        // Prevent accidental skip if Enter was pressed within 500ms
        const elapsed = Date.now() - (this.feedbackShownAt || 0);
        if (elapsed < 500) {
          return;
        }
        this.handleNext();
      } else if (this.activeMode !== 'xray' && !this.currentCard?.isFixPhase) {
        this.handleSubmit();
      }
    }
  }

  updateHeaderStats() {
    this.dom.valMastery.textContent = `${this.srs.getOverallMastery()}%`;
    this.dom.valStreak.textContent = this.srs.state.currentStreak;
    this.dom.valTotal.textContent = this.srs.state.totalAnswered;
  }

  loadCard() {
    this.isFeedbackVisible = false;
    this.dom.feedbackBox.style.display = 'none';
    this.dom.btnSubmit.style.display = 'flex';
    this.dom.userTextInput.value = '';
    this.dom.userTextInput.disabled = false;
    this.dom.userTextInput.className = 'text-input';
    if (this.dom.inlineVerdictBanner) {
      this.dom.inlineVerdictBanner.style.display = 'none';
      this.dom.inlineVerdictBanner.innerHTML = '';
    }

    // Show/hide verb mode toggle
    if (this.activeMode === 'cascades' || this.activeMode === 'builder') {
      this.dom.verbModeContainer.style.display = 'flex';
    } else {
      this.dom.verbModeContainer.style.display = 'none';
    }

    // Determine target tag if focusing on weak points
    let targetTag = null;
    if (this.focusWeak) {
      const weakList = this.srs.getWeakestTags(1);
      if (weakList.length > 0) targetTag = weakList[0];
    }

    switch (this.activeMode) {
      case 'cascades':
        this.loadCascadeCard();
        break;
      case 'builder':
        this.loadBuilderCard(targetTag);
        break;
      case 'xray':
        this.loadXRayCard(targetTag);
        break;
      case 'bug_detector':
        this.loadBugDetectorCard();
        break;
    }

    this.updateBadges();
    this.updateScaffoldDisplay();
  }

  loadCascadeCard() {
    const cascade = CASCADES[this.currentCascadeIndex % CASCADES.length];
    const step = cascade.steps[this.currentCascadeStepIndex];

    this.currentCard = {
      mode: 'cascades',
      cascadeTitle: cascade.title,
      mutation: step.mutation,
      russianPrompt: step.ru,
      englishHint: step.hint,
      targetSentence: step.en,
      targetVerbPhrase: step.verb,
      acceptableAnswers: step.acceptable,
      tense: step.tense,
      tags: step.tags,
      explanation: step.explanation,
      timeline: {
        anchor: step.tense.startsWith('present') ? 'present' : 'past',
        aspect: step.tense.includes('continuous') ? 'continuous' : 'simple'
      }
    };

    // Render cascade history
    this.dom.cascadeHistory.style.display = 'flex';
    this.dom.cascadeHistory.innerHTML = '';
    
    // Header for cascade
    const titleRow = document.createElement('div');
    titleRow.style.fontWeight = '700';
    titleRow.style.color = 'var(--primary)';
    titleRow.style.fontSize = '0.85rem';
    titleRow.textContent = `Сценарий: ${cascade.title} (Шаг ${this.currentCascadeStepIndex + 1} из ${cascade.steps.length})`;
    this.dom.cascadeHistory.appendChild(titleRow);

    for (let i = 0; i < this.currentCascadeStepIndex; i++) {
      const prev = cascade.steps[i];
      const wasCorrect = this.cascadeStepResults[i] !== false;
      const row = document.createElement('div');
      row.className = wasCorrect ? 'history-item done' : 'history-item reviewed';
      row.innerHTML = `<span>${wasCorrect ? '✅' : '💡'}</span> <span><b>${prev.en}</b> (${prev.ru})</span>`;
      this.dom.cascadeHistory.appendChild(row);
    }

    this.dom.labelMutation.textContent = step.mutation;
    this.dom.promptRu.textContent = step.ru;
    
    this.dom.areaTextInput.style.display = 'block';
    this.dom.areaOptions.style.display = 'none';
    this.dom.areaBugActions.style.display = 'none';
    this.dom.userTextInput.focus();
  }

  loadBuilderCard(targetTag) {
    this.dom.cascadeHistory.style.display = 'none';
    this.currentCard = CardGenerator.generateCard(targetTag);

    this.dom.labelMutation.textContent = '🎲 Параметрический генератор фраз';
    this.dom.promptRu.textContent = this.currentCard.russianPrompt;

    this.dom.areaTextInput.style.display = 'block';
    this.dom.areaOptions.style.display = 'none';
    this.dom.areaBugActions.style.display = 'none';
    this.dom.userTextInput.focus();
  }

  loadXRayCard(targetTag) {
    this.dom.cascadeHistory.style.display = 'none';
    this.dom.btnSubmit.style.display = 'none'; // Handled via option click

    let taskPool = XRAY_TASKS;
    if (targetTag) {
      const filtered = XRAY_TASKS.filter(t => t.tags.includes(targetTag));
      if (filtered.length > 0) taskPool = filtered;
    }
    const task = taskPool[Math.floor(Math.random() * taskPool.length)];

    this.currentCard = {
      mode: 'xray',
      task: task,
      tags: task.tags,
      explanation: task.explanation,
      timeline: { anchor: 'present', aspect: 'simple' }
    };

    this.dom.labelMutation.textContent = '🔍 Анализ скрытого смысла английской формы';
    this.dom.promptRu.textContent = task.promptEn;
    this.dom.promptScaffold.textContent = task.question;

    this.dom.areaTextInput.style.display = 'none';
    this.dom.areaBugActions.style.display = 'none';
    this.dom.areaOptions.style.display = 'flex';
    this.dom.areaOptions.innerHTML = '';

    task.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.dataset.index = idx;
      btn.innerHTML = `<span class="option-num">${idx + 1}</span> <span>${opt}</span>`;
      btn.addEventListener('click', () => this.handleXRayAnswer(idx));
      this.dom.areaOptions.appendChild(btn);
    });
  }

  loadBugDetectorCard() {
    this.dom.cascadeHistory.style.display = 'none';
    this.dom.btnSubmit.style.display = 'none'; // Direct buttons

    const task = BUG_TASKS[Math.floor(Math.random() * BUG_TASKS.length)];

    this.currentCard = {
      mode: 'bug_detector',
      task: task,
      tags: task.tags,
      isFixPhase: false,
      explanation: task.explanation,
      timeline: { anchor: 'present', aspect: 'simple' }
    };

    this.dom.labelMutation.textContent = '🛠️ Детектор багов вычитки (OK или Ошибка)';
    this.dom.promptRu.textContent = `"${task.sentence}"`;
    this.dom.promptScaffold.textContent = 'Определи: предложение полностью грамматически корректно, или в нём есть ошибка?';

    this.dom.areaTextInput.style.display = 'none';
    this.dom.areaOptions.style.display = 'none';
    this.dom.areaBugActions.style.display = 'grid';
  }

  updateBadges() {
    const modeNames = {
      cascades: '🔄 Каскады',
      builder: '✍️ Конструктор',
      xray: '🔍 Рентген',
      bug_detector: '🛠️ Детектор багов'
    };
    this.dom.badgeMode.textContent = modeNames[this.activeMode] || 'Тренировка';

    if (this.currentCard?.tags && this.currentCard.tags[0]) {
      const tagInfo = SKILL_TAGS[this.currentCard.tags[0]];
      this.dom.badgeTag.textContent = tagInfo ? tagInfo.title : this.currentCard.tags[0];
    } else {
      this.dom.badgeTag.textContent = 'Общий навык';
    }
  }

  updateScaffoldDisplay() {
    if (this.activeMode === 'xray') return;

    if (this.activeMode === 'cascades' || this.activeMode === 'builder') {
      const hint = this.currentCard?.englishHint || '';
      if (this.verbOnlyMode) {
        this.dom.promptScaffold.textContent = `✍️ Введи глагол (например, have been waiting) или всё предложение целиком. Подсказка: (${hint})`;
        this.dom.userTextInput.placeholder = 'Введи глагол (например: have been waiting) или I\'ve been waiting...';
      } else {
        this.dom.promptScaffold.textContent = `✍️ Введи всё предложение целиком (или только глагол). Подсказка: (${hint})`;
        this.dom.userTextInput.placeholder = 'Введи предложение целиком...';
      }
    }
  }

  handleSubmit() {
    if (this.isFeedbackVisible) return;
    const input = this.dom.userTextInput.value;
    const res = Checker.evaluate(input, this.currentCard, this.verbOnlyMode);
    
    // Record step result in cascade mode
    if (this.activeMode === 'cascades') {
      this.cascadeStepResults[this.currentCascadeStepIndex] = res.isCorrect;
    }

    this.showFeedback(res.isCorrect, res.diagnosis, res.correction, res.feedbackTag, res.userInput);
  }

  handleXRayAnswer(selectedIndex) {
    if (this.isFeedbackVisible) return;
    const task = this.currentCard.task;
    const isCorrect = selectedIndex === task.correctIndex;
    const diag = isCorrect
      ? '✅ Абсолютно точно! Ты безупречно считал(а) хронологию и ракурс ситуации.'
      : `❌ Не совсем так. Верный ответ: "${task.options[task.correctIndex]}".`;
    this.showFeedback(isCorrect, diag, task.options[task.correctIndex], this.currentCard.tags[0], `Вариант ${selectedIndex + 1}`);
  }

  handleBugAnswer(userClaimedOk) {
    if (this.isFeedbackVisible) return;
    const task = this.currentCard.task;
    const isCorrect = userClaimedOk === task.isCorrect;

    let diag = '';
    if (isCorrect) {
      diag = task.isCorrect
        ? '✅ Верно! Это предложение действительно на 100% грамматически корректно.'
        : `✅ Отличный глаз! Здесь действительно ошибка: «${task.buggyPart}» → правильно: «${task.fixedPart}».`;
    } else {
      diag = task.isCorrect
        ? '❌ В предложении не было ошибки — оно грамматически полностью корректно!'
        : `❌ Здесь была ловушка! Ошибка в части: «${task.buggyPart}» → нужно: «${task.fixedPart}».`;
    }

    const userLabel = userClaimedOk ? 'Предложение OK' : 'Есть ошибка';
    this.showFeedback(isCorrect, diag, task.fixedSentence, this.currentCard.tags[0], userLabel);
  }

  showFeedback(isCorrect, diagnosis, targetSentence, errorTag, userInput = '') {
    this.isFeedbackVisible = true;
    this.feedbackShownAt = Date.now();
    this.dom.btnSubmit.style.display = 'none';

    // Disable text input and apply bold visual outline
    this.dom.userTextInput.disabled = true;
    this.dom.userTextInput.className = `text-input ${isCorrect ? 'is-correct' : 'is-incorrect'}`;

    // Render prominent inline verdict banner right under the input
    if (this.dom.inlineVerdictBanner) {
      this.dom.inlineVerdictBanner.style.display = 'flex';
      this.dom.inlineVerdictBanner.className = `inline-verdict-banner ${isCorrect ? 'correct' : 'incorrect'}`;
      
      if (isCorrect) {
        this.dom.inlineVerdictBanner.innerHTML = `
          <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 1.15rem; font-weight: 700; color: var(--success);">
            <span>✅</span> <span>ВЕРНО!</span>
          </div>
          <div style="font-size: 0.95rem; color: var(--text-main);">
            Принятый ответ: <span class="badge-target-good">${userInput || this.currentCard.targetVerbPhrase || 'Идеально'}</span>
          </div>
        `;
      } else {
        this.dom.inlineVerdictBanner.innerHTML = `
          <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 1.15rem; font-weight: 700; color: var(--danger);">
            <span>❌</span> <span>ОШИБКА В ОТВЕТЕ</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.95rem;">
            <div>Твой ввод: <span class="badge-user-bad">${userInput || '(пусто)'}</span></div>
            <div>Как правильно: <span class="badge-target-good">${targetSentence}</span></div>
          </div>
        `;
      }
    }

    // Record SRS
    const primaryTag = errorTag || (this.currentCard.tags && this.currentCard.tags[0]);
    this.srs.recordResult(primaryTag, isCorrect);
    this.updateHeaderStats();

    // Feedback container style
    this.dom.feedbackBox.className = `feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
    this.dom.feedbackTitle.textContent = isCorrect ? '🎉 Превосходно!' : '💡 Разбор геометрии времени:';
    this.dom.feedbackDiagnosis.textContent = diagnosis;

    if (this.currentCard.explanation && !diagnosis.includes(this.currentCard.explanation)) {
      this.dom.feedbackDiagnosis.textContent += `\n${this.currentCard.explanation}`;
    }

    this.dom.feedbackTarget.textContent = `Эталон: ${targetSentence}`;
    this.dom.feedbackBox.style.display = 'flex';

    // Draw timeline
    this.renderTimeline(this.currentCard.timeline);

    // Scroll feedback into view smoothly
    this.dom.feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    this.dom.userTextInput.blur();

    // Focus next button safely after cooldown to prevent synthetic Enter click
    setTimeout(() => {
      if (this.isFeedbackVisible) {
        this.dom.btnNext.focus();
      }
    }, 600);
  }

  renderTimeline(timeline) {
    const svg = this.dom.timelineSvg;
    svg.innerHTML = '';

    const isPastAnchor = timeline?.anchor === 'past';
    const isContinuous = timeline?.aspect === 'continuous';

    // Main line
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '40');
    line.setAttribute('y1', '30');
    line.setAttribute('x2', '460');
    line.setAttribute('y2', '30');
    line.setAttribute('stroke', '#64748b');
    line.setAttribute('stroke-width', '2');
    svg.appendChild(line);

    // NOW point
    const nowCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    nowCircle.setAttribute('cx', '440');
    nowCircle.setAttribute('cy', '30');
    nowCircle.setAttribute('r', '5');
    nowCircle.setAttribute('fill', '#38bdf8');
    svg.appendChild(nowCircle);

    const nowText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    nowText.setAttribute('x', '440');
    nowText.setAttribute('y', '50');
    nowText.setAttribute('text-anchor', 'middle');
    nowText.setAttribute('fill', '#94a3b8');
    nowText.setAttribute('font-size', '11');
    nowText.textContent = 'NOW (сейчас)';
    svg.appendChild(nowText);

    // Past Anchor point
    if (isPastAnchor) {
      const pastCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      pastCircle.setAttribute('cx', '260');
      pastCircle.setAttribute('cy', '30');
      pastCircle.setAttribute('r', '5');
      pastCircle.setAttribute('fill', '#f59e0b');
      svg.appendChild(pastCircle);

      const pastText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      pastText.setAttribute('x', '260');
      pastText.setAttribute('y', '50');
      pastText.setAttribute('text-anchor', 'middle');
      pastText.setAttribute('fill', '#f59e0b');
      pastText.setAttribute('font-size', '11');
      pastText.textContent = 'Точка в прошлом';
      svg.appendChild(pastText);
    }

    // Action span / ray
    const actionRay = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const startX = 80;
    const endX = isPastAnchor ? 260 : 440;

    if (isContinuous) {
      // Wave / squiggly line for continuous
      let d = `M ${startX} 30`;
      for (let x = startX; x < endX; x += 15) {
        d += ` Q ${x + 4} 20, ${x + 8} 30 T ${Math.min(endX, x + 15)} 30`;
      }
      actionRay.setAttribute('d', d);
      actionRay.setAttribute('fill', 'none');
      actionRay.setAttribute('stroke', '#a855f7');
      actionRay.setAttribute('stroke-width', '3');
    } else {
      // Straight highlighted segment with arrow for simple
      actionRay.setAttribute('d', `M ${startX} 30 L ${endX} 30`);
      actionRay.setAttribute('stroke', '#10b981');
      actionRay.setAttribute('stroke-width', '4');
    }
    svg.appendChild(actionRay);
  }

  handleNext() {
    if (this.activeMode === 'cascades') {
      const cascade = CASCADES[this.currentCascadeIndex % CASCADES.length];
      if (this.currentCascadeStepIndex < cascade.steps.length - 1) {
        this.currentCascadeStepIndex += 1;
      } else {
        // Cascade finished, move to next cascade
        this.currentCascadeIndex += 1;
        this.currentCascadeStepIndex = 0;
        this.cascadeStepResults = [];
      }
    }
    this.loadCard();
  }

  handleSkip() {
    this.handleNext();
  }

  showHint() {
    const hint = this.currentCard?.explanation || 'Обрати внимание на то, где стоит точка отсчёта и продолжается ли действие.';
    alert(`💡 Подсказка:\n\n${hint}`);
  }

  openDashboard() {
    this.renderDashboardSkills();
    this.dom.modalDashboard.classList.add('open');
  }

  closeDashboard() {
    this.dom.modalDashboard.classList.remove('open');
  }

  renderDashboardSkills() {
    const grid = this.dom.dashboardSkillsGrid;
    grid.innerHTML = '';

    Object.entries(SKILL_TAGS).forEach(([tagKey, info]) => {
      const stats = this.srs.state.tags[tagKey] || { mastery: 0, streak: 0, attempts: 0 };
      const row = document.createElement('div');
      row.className = 'skill-row';
      row.innerHTML = `
        <div class="skill-header">
          <span class="skill-title">${info.title}</span>
          <span style="font-weight: 700; color: var(--primary);">${stats.mastery}% (серия: ${stats.streak})</span>
        </div>
        <div class="skill-progress-bar">
          <div class="skill-progress-fill" style="width: ${stats.mastery}%;"></div>
        </div>
        <small style="color: var(--text-dim); font-size: 0.75rem;">${info.desc}</small>
      `;
      grid.appendChild(row);
    });
  }

  openSettings() {
    this.dom.inpApiKey.value = AIGenerator.getApiKey();
    this.dom.modalSettings.classList.add('open');
  }

  closeSettings() {
    this.dom.modalSettings.classList.remove('open');
  }
}

// Launch app
window.addEventListener('DOMContentLoaded', () => {
  new App();
});

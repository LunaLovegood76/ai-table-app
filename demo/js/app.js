z/**
 * 钉钉 AI 表格学习产品 — 主应用逻辑
 * 包含路由、状态管理、UI 渲染、游戏化系统
 */

/* ============ 状态管理 ============ */
const DEFAULT_STATE = {
  userName: '学澜',
  totalXP: 0,
  streak: 1,
  lastStudyDate: new Date().toDateString(),
  completedLessons: [],
  perfectLessons: [],
  earnedBadges: [],
  speedComplete: false
};

function loadState() {
  try {
    const saved = localStorage.getItem('ai_table_learn_state');
    if (saved) {
      return { ...DEFAULT_STATE, ...JSON.parse(saved) };
    }
  } catch (error) { /* ignore */ }
  return { ...DEFAULT_STATE };
}

function saveState(state) {
  localStorage.setItem('ai_table_learn_state', JSON.stringify(state));
}

let appState = loadState();
let currentPage = 'path';

/* ============ 工具函数 ============ */
function getCurrentRank(xp) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.minXP) rank = r;
  }
  return rank;
}

function getNextRank(xp) {
  for (const r of RANKS) {
    if (xp < r.minXP) return r;
  }
  return null;
}

function checkNewBadges() {
  const newBadges = [];
  for (const badge of BADGES) {
    if (!appState.earnedBadges.includes(badge.id) && badge.condition(appState)) {
      appState.earnedBadges.push(badge.id);
      newBadges.push(badge);
    }
  }
  return newBadges;
}

function updateStreak() {
  const today = new Date().toDateString();
  if (appState.lastStudyDate !== today) {
    const lastDate = new Date(appState.lastStudyDate);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      appState.streak += 1;
    } else if (diffDays > 1) {
      appState.streak = 1;
    }
    appState.lastStudyDate = today;
    saveState(appState);
  }
}

function getNextLessonId() {
  for (const level of COURSES.levels) {
    if (!level.unlocked) continue;
    for (const lesson of level.lessons) {
      if (!appState.completedLessons.includes(lesson.id)) {
        return lesson.id;
      }
    }
  }
  return null;
}

function checkAndUnlockLevels() {
  for (let i = 1; i < COURSES.levels.length; i++) {
    const previousLevel = COURSES.levels[i - 1];
    const allPreviousCompleted = previousLevel.lessons.every(
      lesson => appState.completedLessons.includes(lesson.id)
    );
    if (allPreviousCompleted && previousLevel.unlocked) {
      COURSES.levels[i].unlocked = true;
    }
  }
}

function getLessonStatus(lessonId) {
  if (appState.completedLessons.includes(lessonId)) return 'completed';
  const nextId = getNextLessonId();
  if (lessonId === nextId) return 'current';
  return 'locked';
}

function showConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);
  const colors = ['#58CC02', '#1CB0F6', '#FF9600', '#FF4B4B', '#A560E8', '#FFC800'];
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 2 + 's';
    piece.style.animationDuration = (2 + Math.random() * 2) + 's';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    piece.style.width = (6 + Math.random() * 8) + 'px';
    piece.style.height = (6 + Math.random() * 8) + 'px';
    container.appendChild(piece);
  }
  setTimeout(() => container.remove(), 4000);
}

/* ============ 页面渲染 ============ */
function render() {
  updateStreak();
  checkAndUnlockLevels();
  const app = document.getElementById('app');
  const rank = getCurrentRank(appState.totalXP);

  app.innerHTML = `
    <div class="phone-frame">
      <div class="phone-screen">
        <div class="top-bar">
          <div class="top-bar-logo" onclick="navigateTo('path')">
            <span class="logo-icon"><i data-lucide="table-2"></i></span> AI表格学堂
          </div>
          <div class="top-bar-stats">
            <div class="stat-item" onclick="showStreakModal()">
              <span class="stat-icon streak-fire"><i data-lucide="flame"></i></span>
              <span class="stat-value">${appState.streak}</span>
            </div>
            <div class="stat-item">
              <span class="stat-icon xp-value"><i data-lucide="star"></i></span>
              <span class="stat-value xp-value">${appState.totalXP}</span>
            </div>
            <div class="stat-item">
              <span class="stat-icon"><i data-lucide="${rank.icon}"></i></span>
            </div>
          </div>
        </div>

        <div class="main-content" id="page-content"></div>

        <div class="bottom-nav">
          <div class="nav-item ${currentPage === 'path' ? 'active' : ''}" onclick="navigateTo('path')">
            <span class="nav-icon"><i data-lucide="book-open"></i></span>
            <span>学习</span>
          </div>
          <div class="nav-item ${currentPage === 'profile' ? 'active' : ''}" onclick="navigateTo('profile')">
            <span class="nav-icon"><i data-lucide="user"></i></span>
            <span>我的</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const pageContent = document.getElementById('page-content');
  switch (currentPage) {
    case 'path': renderPathPage(pageContent); break;
    case 'profile': renderProfilePage(pageContent); break;
    case 'lesson': break;
    default: renderPathPage(pageContent);
  }
}

function navigateTo(page, scrollToLessonId) {
  currentPage = page;
  render();
  if (scrollToLessonId) {
    // 延迟一帧等 DOM 渲染完成后滚动
    requestAnimationFrame(() => {
      const el = document.getElementById('lesson-node-' + scrollToLessonId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  } else {
    window.scrollTo(0, 0);
  }
}

/* ============ 课程路径页 ============ */
function renderPathPage(container) {
  let html = `
    <div class="path-header">
      <h2>钉钉 AI 表格学习之旅</h2>
      <p>像玩游戏一样，轻松掌握 AI 表格</p>
    </div>
  `;

  for (const level of COURSES.levels) {
    const completedCount = level.lessons.filter(l => appState.completedLessons.includes(l.id)).length;
    const totalCount = level.lessons.length;

    html += `<div class="level-section">`;
    html += `
      <div class="level-header" style="background: ${level.color}">
        <span class="level-icon"><i data-lucide="${level.icon}"></i></span>
        <div class="level-info">
          <h3>${level.title}</h3>
          <p>${level.subtitle} · ${totalCount} 课</p>
        </div>
        <span class="level-progress">${completedCount}/${totalCount}</span>
      </div>
    `;

    html += `<div class="lesson-path">`;
    const lessons = level.lessons;
    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];
      const status = level.unlocked ? getLessonStatus(lesson.id) : 'locked';
      const statusClass = status;
      const offsets = [0, 50, 80, 50, 0, -50, -80, -50];
      const offset = offsets[i % offsets.length];

      if (i > 0) {
        /* 竖线连接器已移除 */
      }

      html += `<div class="lesson-row" style="transform: translateX(${offset}px)">`;
      html += `<div style="display:flex;flex-direction:column;align-items:center">`;

      if (status === 'completed') {
        html += `<div class="lesson-node completed" id="lesson-node-${lesson.id}" onclick="startLesson('${lesson.id}', true)"><span class="lesson-check"><i data-lucide="check"></i></span></div>`;
      } else if (status === 'current') {
        html += `<div class="lesson-node current" id="lesson-node-${lesson.id}" onclick="startLesson('${lesson.id}')"><i data-lucide="${lesson.icon}"></i></div>`;
      } else {
        html += `<div class="lesson-node locked" id="lesson-node-${lesson.id}"><span class="lock-icon"><i data-lucide="lock"></i></span></div>`;
      }

      html += `<div class="lesson-label ${status === 'completed' ? 'completed-label' : ''}">${lesson.title}</div>`;
      html += `</div></div>`;
    }
    html += `</div></div>`;
  }

  container.innerHTML = html;
}

/* ============ 学习页面 ============ */
let lessonState = {};

function startLesson(lessonId, isReview) {
  const level = COURSES.levels.find(l => l.lessons.some(ls => ls.id === lessonId));
  const lesson = level.lessons.find(l => l.id === lessonId);
  if (!lesson || !lesson.questions) {
    if (!level.unlocked) {
      showModal('课程锁定', '请先完成前面的课程来解锁此级别！');
      return;
    }
    showModal('敬请期待', '该课程内容正在制作中，请先体验 L1 入门篇的课程！');
    return;
  }

  lessonState = {
    lessonId,
    lesson,
    currentStep: 0,
    totalSteps: lesson.cards.length + lesson.questions.length,
    correctCount: 0,
    totalQuestions: lesson.questions.length,
    selectedAnswer: null,
    answered: false,
    startTime: Date.now(),
    matchAnswers: {},
    orderItems: null,
    isReview: !!isReview
  };

  currentPage = 'lesson';
  renderLessonStep();
}

function renderLessonStep() {
  const app = document.getElementById('app');
  const { lesson, currentStep, totalSteps } = lessonState;
  const progress = ((currentStep) / totalSteps) * 100;

  const isCard = currentStep < lesson.cards.length;
  const cardOrQuestion = isCard
    ? lesson.cards[currentStep]
    : lesson.questions[currentStep - lesson.cards.length];

  let contentHtml = '';

  if (isCard) {
    contentHtml = renderKnowledgeCard(cardOrQuestion);
  } else {
    contentHtml = renderQuestion(cardOrQuestion, currentStep - lesson.cards.length);
  }

  app.innerHTML = `
    <div class="phone-frame">
      <div class="phone-screen">
        <div class="top-bar" style="background:var(--white);border-bottom:2px solid var(--gray-100)">
          <div class="top-bar-logo" style="visibility:hidden">.</div>
          <div style="display:flex;align-items:center;gap:16px;flex:1;padding:0 20px">
            <button class="lesson-close" onclick="exitLesson()"><i data-lucide="x"></i></button>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width:${progress}%"></div>
            </div>
          </div>
          <div class="top-bar-stats" style="visibility:hidden">.</div>
        </div>
        <div class="main-content" style="padding:20px;padding-bottom:${lessonState.answered ? '140px' : '100px'}">
          <div class="lesson-page">${contentHtml}</div>
        </div>
        ${isCard ? `
          <div class="check-area">
            <button class="action-btn btn-primary" onclick="nextStep()">继续</button>
          </div>
        ` : ''}
        ${!isCard && !lessonState.answered ? `
          <div class="check-area">
            <button class="action-btn ${lessonState.selectedAnswer !== null ? 'btn-check' : 'btn-disabled'}"
                    onclick="${lessonState.selectedAnswer !== null ? 'checkAnswer()' : ''}"
                    ${lessonState.selectedAnswer === null ? 'disabled' : ''}>
              检查答案
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function renderKnowledgeCard(card) {
  let html = `<div class="knowledge-card"><h3><i data-lucide="book-open" class="card-title-icon"></i> ${card.title}</h3>`;

  if (card.comparison) {
    html += `<table class="comparison-table">
      <tr><th>特性</th><th>Excel</th><th>AI 表格</th></tr>`;
    for (const row of card.comparison) {
      html += `<tr><td><strong>${row.feature}</strong></td><td>${row.excel}</td><td>${row.ai}</td></tr>`;
    }
    html += `</table>`;
  }

  if (card.content) {
    html += `<div class="card-content">${card.content.replace(/\n/g, '<br>')}</div>`;
  }

  if (card.highlight) {
    html += `<div class="highlight-box"><i data-lucide="lightbulb" class="highlight-icon"></i> ${card.highlight}</div>`;
  }

  html += `</div>`;
  return html;
}

function renderQuestion(question, questionIndex) {
  let html = `<div class="question-card">`;

  const typeBadges = {
    single: ['单选题', 'badge-single'],
    multi: ['多选题', 'badge-multi'],
    truefalse: ['判断题', 'badge-truefalse'],
    match: ['匹配题', 'badge-match'],
    order: ['排序题', 'badge-order'],
    simulate: ['模拟操作题', 'badge-simulate']
  };
  const [badgeText, badgeClass] = typeBadges[question.type] || ['题目', 'badge-single'];
  html += `<span class="question-type-badge ${badgeClass}">${badgeText}</span>`;
  html += `<h3>${question.question}</h3>`;

  switch (question.type) {
    case 'single':
      html += renderSingleChoice(question);
      break;
    case 'multi':
      html += renderMultiChoice(question);
      break;
    case 'truefalse':
      html += renderTrueFalse(question);
      break;
    case 'match':
      html += renderMatch(question, questionIndex);
      break;
    case 'order':
      html += renderOrder(question, questionIndex);
      break;
    case 'simulate':
      html += renderSimulate(question, questionIndex);
      break;
  }

  html += `</div>`;
  return html;
}

function renderMultiChoice(question) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  if (!lessonState.multiSelected) lessonState.multiSelected = [];
  const selected = lessonState.multiSelected;

  let html = `<div class="multi-hint"><i data-lucide="lightbulb" class="hint-icon"></i> 本题为多选题，请选择所有正确答案</div>`;
  html += `<div class="options-list">`;
  for (let i = 0; i < question.options.length; i++) {
    let extraClass = '';
    if (lessonState.answered) {
      if (question.correctIndices.includes(i)) extraClass = 'correct';
      else if (selected.includes(i)) extraClass = 'incorrect';
    } else if (selected.includes(i)) {
      extraClass = 'selected';
    }
    html += `
      <button class="option-btn multi-option ${extraClass}"
              onclick="${!lessonState.answered ? `toggleMultiAnswer(${i})` : ''}"
              ${lessonState.answered ? 'disabled' : ''}>
        <span class="option-letter multi-letter">${selected.includes(i) ? '<i data-lucide="check" style="width:16px;height:16px"></i>' : letters[i]}</span>
        <span>${question.options[i]}</span>
      </button>`;
  }
  html += `</div>`;
  return html;
}

function toggleMultiAnswer(index) {
  if (lessonState.answered) return;
  if (!lessonState.multiSelected) lessonState.multiSelected = [];
  const idx = lessonState.multiSelected.indexOf(index);
  if (idx > -1) {
    lessonState.multiSelected.splice(idx, 1);
  } else {
    lessonState.multiSelected.push(index);
  }
  // 至少选了一个才能提交
  lessonState.selectedAnswer = lessonState.multiSelected.length > 0 ? 'multi' : null;
  renderLessonStep();
}

function renderSingleChoice(question) {
  const letters = ['A', 'B', 'C', 'D'];
  let html = `<div class="options-list">`;
  for (let i = 0; i < question.options.length; i++) {
    let extraClass = '';
    if (lessonState.answered) {
      if (i === question.correctIndex) extraClass = 'correct';
      else if (i === lessonState.selectedAnswer) extraClass = 'incorrect';
    } else if (i === lessonState.selectedAnswer) {
      extraClass = 'selected';
    }
    html += `
      <button class="option-btn ${extraClass}"
              onclick="${!lessonState.answered ? `selectAnswer(${i})` : ''}"
              ${lessonState.answered ? 'disabled' : ''}>
        <span class="option-letter">${letters[i]}</span>
        <span>${question.options[i]}</span>
      </button>`;
  }
  html += `</div>`;
  return html;
}

function renderTrueFalse(question) {
  let trueClass = '', falseClass = '';
  if (lessonState.answered) {
    if (question.correct === true) trueClass = 'correct';
    else trueClass = lessonState.selectedAnswer === true ? 'incorrect' : '';
    if (question.correct === false) falseClass = 'correct';
    else falseClass = lessonState.selectedAnswer === false ? 'incorrect' : '';
  } else {
    if (lessonState.selectedAnswer === true) trueClass = 'selected';
    if (lessonState.selectedAnswer === false) falseClass = 'selected';
  }

  return `
    <div class="tf-options">
      <button class="tf-btn tf-true ${trueClass}"
              onclick="${!lessonState.answered ? 'selectAnswer(true)' : ''}"
              ${lessonState.answered ? 'disabled' : ''}>
        <i data-lucide="circle-check" class="tf-icon"></i> 正确
      </button>
      <button class="tf-btn tf-false ${falseClass}"
              onclick="${!lessonState.answered ? 'selectAnswer(false)' : ''}"
              ${lessonState.answered ? 'disabled' : ''}>
        <i data-lucide="circle-x" class="tf-icon"></i> 错误
      </button>
    </div>`;
}

function renderMatch(question, questionIndex) {
  if (!lessonState.matchAnswers[questionIndex]) {
    lessonState.matchAnswers[questionIndex] = {};
  }
  const answers = lessonState.matchAnswers[questionIndex];
  const rightOptions = [...new Set(question.pairs.map(p => p.right))];

  let html = `<div class="match-container">`;
  for (let i = 0; i < question.pairs.length; i++) {
    const pair = question.pairs[i];
    let rowClass = '';
    if (lessonState.answered) {
      rowClass = answers[i] === pair.right ? 'correct' : 'incorrect';
    }
    const currentValue = answers[i] || '';
    const displayText = currentValue || '点击选择...';
    const hasValue = currentValue ? 'has-value' : '';
    const disabled = lessonState.answered ? 'disabled' : '';

    html += `
      <div class="match-row ${rowClass}">
        <div class="match-left">${pair.left}</div>
        <span class="match-arrow">→</span>
        <div class="match-trigger ${hasValue} ${disabled}"
             onclick="${!lessonState.answered ? `toggleMatchDropdown(${questionIndex}, ${i})` : ''}"
             id="match-trigger-${questionIndex}-${i}">
          <span>${displayText}</span>
        </div>
      </div>`;
  }
  html += `</div>`;
  // 存储选项供下拉面板使用
  if (!window._matchOptions) window._matchOptions = {};
  window._matchOptions[questionIndex] = rightOptions;
  return html;
}

function toggleMatchDropdown(questionIndex, pairIndex) {
  if (lessonState.answered) return;
  // 关闭已有的下拉
  closeMatchDropdown();

  const trigger = document.getElementById(`match-trigger-${questionIndex}-${pairIndex}`);
  const row = trigger.closest('.match-row');
  const rightOptions = window._matchOptions[questionIndex];
  const answers = lessonState.matchAnswers[questionIndex] || {};
  const currentValue = answers[pairIndex] || '';

  // 创建遮罩
  const overlay = document.createElement('div');
  overlay.className = 'match-overlay';
  overlay.onclick = closeMatchDropdown;
  document.body.appendChild(overlay);

  // 创建下拉面板
  const dropdown = document.createElement('div');
  dropdown.className = 'match-dropdown';
  dropdown.id = 'active-match-dropdown';
  for (const opt of rightOptions) {
    const item = document.createElement('div');
    item.className = `match-dropdown-item ${opt === currentValue ? 'selected' : ''}`;
    item.textContent = opt;
    item.onclick = (e) => {
      e.stopPropagation();
      selectMatchAnswer(questionIndex, pairIndex, opt);
      closeMatchDropdown();
      // 更新触发按钮显示
      const t = document.getElementById(`match-trigger-${questionIndex}-${pairIndex}`);
      if (t) {
        t.querySelector('span').textContent = opt;
        t.classList.add('has-value');
      }
    };
    dropdown.appendChild(item);
  }
  row.appendChild(dropdown);
}

function closeMatchDropdown() {
  const existing = document.getElementById('active-match-dropdown');
  if (existing) existing.remove();
  const overlay = document.querySelector('.match-overlay');
  if (overlay) overlay.remove();
}

function renderOrder(question, questionIndex) {
  if (!lessonState.orderItems) {
    const shuffled = question.items.map((item, idx) => ({ text: item, origIdx: idx }));
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    lessonState.orderItems = shuffled;
  }

  let html = `<div class="order-list" id="order-list">`;
  for (let i = 0; i < lessonState.orderItems.length; i++) {
    const item = lessonState.orderItems[i];
    let itemClass = '';
    if (lessonState.answered) {
      itemClass = item.origIdx === question.correctOrder[i] ? 'correct' : 'incorrect';
    }
    html += `
      <div class="order-item ${itemClass}"
           draggable="${!lessonState.answered}"
           ondragstart="dragStart(event, ${i})"
           ondragover="dragOver(event)"
           ondragenter="dragEnter(event)"
           ondragleave="dragLeave(event)"
           ondrop="drop(event, ${i})">
        <span class="order-num">${i + 1}</span>
        <span>${item.text}</span>
        ${!lessonState.answered ? '<span class="drag-handle"><i data-lucide="grip-vertical"></i></span>' : ''}
      </div>`;
  }
  html += `</div>`;
  return html;
}

function renderSimulate(question, questionIndex) {
  if (!lessonState.simStep) lessonState.simStep = 0;
  const currentStep = lessonState.simStep;
  const totalSteps = question.steps.length;
  const allDone = currentStep >= totalSteps;

  let html = `<div class="sim-container">`;

  // 步骤进度
  html += `<div class="sim-progress">`;
  for (let i = 0; i < totalSteps; i++) {
    html += `<div class="sim-step-dot ${i < currentStep ? 'done' : ''} ${i === currentStep ? 'active' : ''}">
      ${i < currentStep ? '<i data-lucide="check" style="width:14px;height:14px"></i>' : i + 1}
    </div>`;
    if (i < totalSteps - 1) {
      html += `<div class="sim-step-line ${i < currentStep ? 'done' : ''}"></div>`;
    }
  }
  html += `</div>`;

  // 当前步骤提示
  if (!allDone && !lessonState.answered) {
    const step = question.steps[currentStep];
    html += `<div class="sim-instruction">
      <span class="sim-instruction-icon"><i data-lucide="pointer"></i></span>
      <span>第 ${currentStep + 1} 步：${step.instruction}</span>
    </div>`;
  }

  if (allDone && !lessonState.answered) {
    html += `<div class="sim-instruction sim-success">
      <span class="sim-instruction-icon"><i data-lucide="circle-check-big"></i></span>
      <span>操作完成！点击「检查答案」提交</span>
    </div>`;
  }

  // 模拟界面
  html += `<div class="sim-interface">`;
  html += `<div class="sim-toolbar">${question.interfaceTitle || '模拟操作区'}</div>`;
  html += `<div class="sim-body">`;

  for (let i = 0; i < question.areas.length; i++) {
    const area = question.areas[i];
    const isClickable = !allDone && !lessonState.answered;
    const isDone = area.stepIndex !== undefined && area.stepIndex < currentStep;
    const isActive = area.stepIndex === currentStep;

    html += `<div class="sim-area ${isDone ? 'sim-area-done' : ''} ${isActive ? 'sim-area-active' : ''} ${isClickable ? 'sim-area-clickable' : ''}"
                 onclick="${isClickable ? `handleSimClick(${questionIndex}, ${i})` : ''}"
                 style="${area.style || ''}">
      <span class="sim-area-icon">${area.icon ? '<i data-lucide="' + area.icon + '"></i>' : ''}</span>
      <span class="sim-area-label">${area.label}</span>
      ${isDone ? '<span class="sim-area-check"><i data-lucide="check"></i></span>' : ''}
    </div>`;
  }

  html += `</div></div></div>`;
  return html;
}

function handleSimClick(questionIndex, areaIndex) {
  if (lessonState.answered) return;
  const questionIdx = lessonState.currentStep - lessonState.lesson.cards.length;
  const question = lessonState.lesson.questions[questionIdx];
  const currentStep = lessonState.simStep || 0;

  if (currentStep >= question.steps.length) return;

  const step = question.steps[currentStep];
  const area = question.areas[areaIndex];

  if (area.id === step.targetAreaId) {
    // 正确点击
    lessonState.simStep = currentStep + 1;
    if (lessonState.simStep >= question.steps.length) {
      lessonState.selectedAnswer = 'simulate';
      lessonState.simCorrect = true;
    }
    renderLessonStep();
  } else {
    // 错误点击 — 闪烁提示
    const el = document.querySelectorAll('.sim-area')[areaIndex];
    if (el) {
      el.classList.add('sim-area-wrong');
      setTimeout(() => el.classList.remove('sim-area-wrong'), 600);
    }
  }
}

/* ============ 交互处理 ============ */
function selectAnswer(answer) {
  if (lessonState.answered) return;
  lessonState.selectedAnswer = answer;
  renderLessonStep();
}

function selectMatchAnswer(questionIndex, pairIndex, value) {
  if (!lessonState.matchAnswers[questionIndex]) {
    lessonState.matchAnswers[questionIndex] = {};
  }
  lessonState.matchAnswers[questionIndex][pairIndex] = value;

  const question = lessonState.lesson.questions[questionIndex];
  const answers = lessonState.matchAnswers[questionIndex];
  const allFilled = question.pairs.every((_, i) => answers[i] && answers[i] !== '');
  lessonState.selectedAnswer = allFilled ? 'match' : null;

  const checkBtn = document.querySelector('.check-area .action-btn');
  if (checkBtn) {
    if (allFilled) {
      checkBtn.className = 'action-btn btn-check';
      checkBtn.onclick = checkAnswer;
      checkBtn.disabled = false;
    } else {
      checkBtn.className = 'action-btn btn-disabled';
      checkBtn.disabled = true;
    }
  }
}

let draggedIndex = null;
function dragStart(event, index) { draggedIndex = index; event.target.classList.add('dragging'); }
function dragOver(event) { event.preventDefault(); }
function dragEnter(event) { event.target.closest('.order-item')?.classList.add('drag-over'); }
function dragLeave(event) { event.target.closest('.order-item')?.classList.remove('drag-over'); }
function drop(event, targetIndex) {
  event.preventDefault();
  document.querySelectorAll('.order-item').forEach(el => el.classList.remove('drag-over', 'dragging'));
  if (draggedIndex === null || draggedIndex === targetIndex) return;
  const items = lessonState.orderItems;
  const [moved] = items.splice(draggedIndex, 1);
  items.splice(targetIndex, 0, moved);
  draggedIndex = null;
  lessonState.selectedAnswer = 'order';
  renderLessonStep();
}

function checkAnswer() {
  if (lessonState.answered) return;
  lessonState.answered = true;

  const questionIndex = lessonState.currentStep - lessonState.lesson.cards.length;
  const question = lessonState.lesson.questions[questionIndex];
  let isCorrect = false;

  switch (question.type) {
    case 'single':
      isCorrect = lessonState.selectedAnswer === question.correctIndex;
      break;
    case 'multi':
      const sel = [...(lessonState.multiSelected || [])].sort();
      const cor = [...question.correctIndices].sort();
      isCorrect = sel.length === cor.length && sel.every((v, i) => v === cor[i]);
      break;
    case 'truefalse':
      isCorrect = lessonState.selectedAnswer === question.correct;
      break;
    case 'match':
      const answers = lessonState.matchAnswers[questionIndex];
      isCorrect = question.pairs.every((pair, i) => answers[i] === pair.right);
      break;
    case 'order':
      isCorrect = lessonState.orderItems.every((item, i) => item.origIdx === question.correctOrder[i]);
      break;
    case 'simulate':
      isCorrect = lessonState.simCorrect === true;
      break;
  }

  if (isCorrect) lessonState.correctCount++;

  renderLessonStep();

  const explanation = question.explanation || (isCorrect ? '回答正确！' : '再想想哦~');
  showFeedback(isCorrect, explanation);
}

function showFeedback(isCorrect, explanation) {
  const existing = document.querySelector('.feedback-bar');
  if (existing) existing.remove();

  const feedbackHtml = `
    <div class="feedback-bar ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}">
      <span class="feedback-icon"><i data-lucide="${isCorrect ? 'party-popper' : 'refresh-cw'}"></i></span>
      <div class="feedback-text">
        <div class="feedback-title">${isCorrect ? '太棒了！' : '没关系，继续加油！'}</div>
        <div class="feedback-explanation">${explanation}</div>
      </div>
      <button class="btn-continue" onclick="nextStep()">继续</button>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', feedbackHtml);
}

function nextStep() {
  const existing = document.querySelector('.feedback-bar');
  if (existing) existing.remove();

  lessonState.currentStep++;
  lessonState.selectedAnswer = null;
  lessonState.answered = false;
  lessonState.orderItems = null;
  lessonState.multiSelected = [];
  lessonState.simCorrect = null;
  lessonState.simStep = 0;

  if (lessonState.currentStep >= lessonState.totalSteps) {
    completeLesson();
  } else {
    renderLessonStep();
    window.scrollTo(0, 0);
  }
}

function completeLesson() {
  const { lesson, correctCount, totalQuestions, startTime } = lessonState;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 100;
  const isPerfect = accuracy === 100;
  const timeSpent = Math.round((Date.now() - startTime) / 1000);
  const isSpeed = timeSpent < 60;

  let xpEarned = lesson.xpReward || 10;
  if (isPerfect) xpEarned += 5;

  if (!appState.completedLessons.includes(lesson.id)) {
    appState.completedLessons.push(lesson.id);
    appState.totalXP += xpEarned;
  }

  if (isPerfect && (!appState.perfectLessons || !appState.perfectLessons.includes(lesson.id))) {
    if (!appState.perfectLessons) appState.perfectLessons = [];
    appState.perfectLessons.push(lesson.id);
  }

  if (isSpeed) appState.speedComplete = true;

  updateStreak();
  checkAndUnlockLevels();
  const newBadges = checkNewBadges();
  saveState(appState);

  showConfetti();
  renderCompletePage(lesson, xpEarned, accuracy, newBadges);
}

function renderCompletePage(lesson, xpEarned, accuracy, newBadges) {
  const app = document.getElementById('app');
  let badgesHtml = '';
  if (newBadges.length > 0) {
    badgesHtml = `<div class="complete-badges">`;
    for (const badge of newBadges) {
      badgesHtml += `
        <div class="badge-item new-badge">
          <span class="badge-icon"><i data-lucide="${badge.icon}"></i></span>
          <span class="badge-name">${badge.name}</span>
        </div>`;
    }
    badgesHtml += `</div>`;
  }

  app.innerHTML = `
    <div class="phone-frame">
      <div class="phone-screen">
        <div class="main-content" style="padding:20px;padding-top:100px">
          <div class="lesson-complete">
        <div class="complete-icon"><i data-lucide="party-popper"></i></div>
        <h2>课程完成！</h2>
        <p class="complete-subtitle">${lesson.title}</p>
        <div class="complete-stats">
          <div class="complete-stat">
            <span class="stat-number xp-earned">+${xpEarned}</span>
            <span class="stat-label">经验值</span>
          </div>
          <div class="complete-stat">
            <span class="stat-number accuracy-stat">${accuracy}%</span>
            <span class="stat-label">正确率</span>
          </div>
          <div class="complete-stat">
            <span class="stat-number streak-fire"><i data-lucide="flame" style="width:18px;height:18px;display:inline"></i> ${appState.streak}</span>
            <span class="stat-label">连续天数</span>
          </div>
        </div>
        ${badgesHtml}
        <button class="action-btn btn-primary" onclick="navigateToNextLesson()" style="margin-top:16px">
          继续学习
        </button>
      </div>
        </div>
      </div>
    </div>`;
}

function navigateToNextLesson() {
  const nextId = getNextLessonId();
  navigateTo('path', nextId);
}

function exitLesson() {
  const existing = document.querySelector('.feedback-bar');
  if (existing) existing.remove();
  currentPage = 'path';
  render();
}

/* ============ 个人中心页面 — 微信读书风格 ============ */
function renderProfilePage(container) {
  const rank = getCurrentRank(appState.totalXP);
  const nextRank = getNextRank(appState.totalXP);
  const completedCount = appState.completedLessons.length;
  const totalLessons = COURSES.levels.reduce((sum, l) => sum + l.lessons.length, 0);
  const perfectCount = appState.perfectLessons ? appState.perfectLessons.length : 0;
  const earnedCount = appState.earnedBadges.length;

  let progressPercent = 100;
  if (nextRank) {
    progressPercent = ((appState.totalXP - rank.minXP) / (nextRank.minXP - rank.minXP)) * 100;
  }

  const studyMinutes = completedCount * 12;
  const studyHours = Math.floor(studyMinutes / 60);
  const studyMins = studyMinutes % 60;

  let currentLevel = 'L1 入门篇';
  for (const level of COURSES.levels) {
    if (level.unlocked) {
      const levelCompleted = level.lessons.every(l => appState.completedLessons.includes(l.id));
      if (!levelCompleted) {
        currentLevel = level.title;
        break;
      }
    }
  }

  container.innerHTML = `
    <div class="profile-page-v2">
      <div class="profile-header">
        <div class="avatar-circle">${appState.userName.charAt(0)}</div>
        <div class="avatar-info">
          <div class="avatar-name">${appState.userName}</div>
          <div style="margin-top:6px;">
            <span class="badge-entry" onclick="openBadgeWall()">
              <i data-lucide="award"></i>
              <span>${earnedCount}</span>
            </span>
          </div>
        </div>
      </div>

      <div class="p-card">
        <div class="p-card-row">
          <div class="icon-circle" style="background:var(--icon-gold-bg);">
            <i data-lucide="shield" style="color:var(--icon-gold-fg);"></i>
          </div>
          <div class="p-card-label">${rank.name}</div>
          <div class="p-card-value">
            <div><span class="num-primary">${appState.totalXP}</span> <span class="num-unit">XP</span></div>
          </div>
        </div>
        <div class="rank-progress">
          <div class="rank-progress-bar">
            <div class="rank-progress-fill" style="width:${Math.min(progressPercent, 100)}%;"></div>
          </div>
          <div class="rank-progress-text">
            <span>${rank.name} ${rank.minXP} XP</span>
            <span>${nextRank ? nextRank.name + ' ' + nextRank.minXP + ' XP' : '已满级'}</span>
          </div>
        </div>
      </div>

      <div class="p-card-group">
        <div class="p-card">
          <div class="p-card-row">
            <div class="icon-circle" style="background:var(--icon-orange-bg);">
              <i data-lucide="flame" style="color:var(--icon-orange-fg);"></i>
            </div>
            <div>
              <div class="p-card-label">连续打卡</div>
              <div class="num-sub">连续 ${appState.streak} 天</div>
            </div>
          </div>
        </div>
        <div class="p-card">
          <div class="p-card-row">
            <div class="icon-circle" style="background:var(--icon-pink-bg);">
              <i data-lucide="heart" style="color:var(--icon-pink-fg);"></i>
            </div>
            <div>
              <div class="p-card-label">满分课程</div>
              <div class="num-sub">${perfectCount} 课满分</div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-card" style="margin-top:8px;">
        <div class="p-card-row">
          <div class="icon-circle" style="background:var(--icon-pink-bg);">
            <i data-lucide="clock" style="color:var(--icon-pink-fg);"></i>
          </div>
          <div class="p-card-label">学习时长</div>
          <div class="p-card-value">
            <div><span class="num-primary">${studyHours}</span> <span class="num-unit">小时</span> <span class="num-primary">${studyMins}</span> <span class="num-unit">分钟</span></div>
          </div>
        </div>
      </div>

      <div class="grid-2x2">
        <div class="grid-cell">
          <div class="icon-circle" style="background:var(--icon-green-bg);">
            <i data-lucide="play-circle" style="color:var(--icon-green-fg);"></i>
          </div>
          <div>
            <div class="grid-cell-label">在学</div>
            <div class="grid-cell-sub">${currentLevel}</div>
          </div>
        </div>
        <div class="grid-cell">
          <div class="icon-circle" style="background:var(--icon-blue-bg);">
            <i data-lucide="check-circle" style="color:var(--icon-blue-fg);"></i>
          </div>
          <div>
            <div class="grid-cell-label">已完成</div>
            <div class="grid-cell-sub">累计 ${completedCount} 课</div>
          </div>
        </div>
        <div class="grid-cell">
          <div class="icon-circle" style="background:var(--icon-purple-bg);">
            <i data-lucide="star" style="color:var(--icon-purple-fg);"></i>
          </div>
          <div>
            <div class="grid-cell-label">总经验</div>
            <div class="grid-cell-sub">${appState.totalXP} XP</div>
          </div>
        </div>
        <div class="grid-cell">
          <div class="icon-circle" style="background:var(--icon-teal-bg);">
            <i data-lucide="zap" style="color:var(--icon-teal-fg);"></i>
          </div>
          <div>
            <div class="grid-cell-label">总课程</div>
            <div class="grid-cell-sub">${totalLessons} 课</div>
          </div>
        </div>
      </div>

      <div class="p-card" style="margin-top:8px;">
        <div class="p-card-row" style="cursor:pointer;" onclick="openBadgeWall()">
          <div class="icon-circle" style="background:var(--icon-indigo-bg);">
            <i data-lucide="award" style="color:var(--icon-indigo-fg);"></i>
          </div>
          <div class="p-card-label">勋章</div>
          <div class="p-card-value">
            <div><span class="num-primary">${earnedCount}</span> <span class="num-unit">枚</span></div>
            <div class="num-sub">共 ${BADGES.length} 枚可获得</div>
          </div>
        </div>
      </div>

      <div style="margin:20px 16px 0;">
        <button class="action-btn" style="background:var(--red);color:white;box-shadow:0 4px 0 #CC3333;width:100%"
                onclick="resetProgress()">
          重置学习进度
        </button>
      </div>
    </div>`;

  ensureBadgeWallOverlay();
}

/* ============ 勋章墙弹窗 ============ */
function ensureBadgeWallOverlay() {
  if (document.getElementById('badgeWallOverlay')) return;

  const earnedBadgeIds = appState.earnedBadges;
  const totalBadges = BADGES.length;
  const earnedCount = earnedBadgeIds.length;

  const badgeCategories = [
    { title: '习惯养成 · 连续打卡', shape: 'shield', badges: BADGES.filter(b => b.id.startsWith('streak') || b.description.includes('连续')) },
    { title: '课程里程碑', shape: 'hex', badges: BADGES.filter(b => b.id.startsWith('complete') || b.description.includes('完成')) },
    { title: '累计成就 · 经验值', shape: 'circle', badges: BADGES.filter(b => b.id.startsWith('xp') || b.description.includes('经验') || b.description.includes('XP')) }
  ];

  const categorizedIds = badgeCategories.flatMap(c => c.badges.map(b => b.id));
  const uncategorized = BADGES.filter(b => !categorizedIds.includes(b.id));
  if (uncategorized.length > 0) {
    badgeCategories.push({ title: '特殊成就', shape: 'diamond', badges: uncategorized });
  }

  let categoriesHtml = '';
  for (const category of badgeCategories) {
    if (category.badges.length === 0) continue;
    let badgesHtml = '';
    for (const badge of category.badges) {
      const earned = earnedBadgeIds.includes(badge.id);
      const tier = earned ? 'gold' : 'bronze';
      const cellClass = earned ? '' : ' unearned';
      badgesHtml += `
        <div class="bw-badge-cell${cellClass}">
          <div class="badge-frame shape-${category.shape} tier-${tier}">
            <div class="badge-outer"></div>
            <div class="badge-inner">
              <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/${earned ? 'Trophy' : 'Locked'}/Color/${earned ? 'trophy' : 'locked'}_color.svg" alt="${badge.name}">
            </div>
          </div>
          <span class="bw-badge-name">${badge.name}</span>
          <span class="bw-badge-desc">${badge.description}</span>
          ${earned ? '' : '<div class="badge-progress-wrap"><div class="badge-progress"><div class="badge-progress-fill progress-' + tier + '" style="width:30%"></div></div></div>'}
        </div>`;
    }
    categoriesHtml += `
      <div class="category-card">
        <div class="category-title">${category.title}</div>
        <div class="badge-grid">${badgesHtml}</div>
      </div>`;
  }

  const particles = Array.from({length: 12}, () => '<span class="wall-particle"></span>').join('');

  const overlay = document.createElement('div');
  overlay.className = 'badge-wall-overlay';
  overlay.id = 'badgeWallOverlay';
  overlay.innerHTML = `
    <div class="badge-wall-container">
      <div class="wall-sticky-bar" id="wallStickyBar">
        <button class="sticky-back" onclick="closeBadgeWall()">
          <i data-lucide="chevron-left"></i>
        </button>
        <div class="sticky-title">我的勋章</div>
      </div>
      <div class="wall-header-wrap">
        <div class="wall-particles">${particles}</div>
        <button class="wall-back-btn" onclick="closeBadgeWall()">
          <i data-lucide="chevron-left"></i>
        </button>
        <div class="wall-header">
          <h2>我的勋章</h2>
          <div class="wall-stats">
            <span class="stat-earned">${earnedCount}</span>
            <span class="stat-sep">/</span>
            <span class="stat-total">${totalBadges}</span>
          </div>
          <div class="wall-subtitle">已收集 ${earnedCount} 枚勋章，继续加油！</div>
        </div>
      </div>
      ${categoriesHtml}
    </div>`;

  document.body.appendChild(overlay);
  refreshIcons();

  const wallContainer = overlay.querySelector('.badge-wall-container');
  const wallStickyBar = document.getElementById('wallStickyBar');
  const wallBackBtn = overlay.querySelector('.wall-back-btn');
  if (wallContainer && wallStickyBar && wallBackBtn) {
    wallContainer.addEventListener('scroll', () => {
      const backBtnBottom = wallBackBtn.offsetTop + wallBackBtn.offsetHeight - wallContainer.scrollTop;
      if (backBtnBottom < 0) {
        wallStickyBar.classList.add('visible');
      } else {
        wallStickyBar.classList.remove('visible');
      }
    });
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeBadgeWall();
  });
}

function openBadgeWall() {
  const existing = document.getElementById('badgeWallOverlay');
  if (existing) existing.remove();
  ensureBadgeWallOverlay();

  const overlay = document.getElementById('badgeWallOverlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  const container = overlay.querySelector('.badge-wall-container');
  if (container) container.scrollTop = 0;
  const stickyBar = document.getElementById('wallStickyBar');
  if (stickyBar) stickyBar.classList.remove('visible');
  refreshIcons();
}

function closeBadgeWall() {
  const overlay = document.getElementById('badgeWallOverlay');
  if (!overlay) return;
  const stickyBar = document.getElementById('wallStickyBar');
  if (stickyBar) stickyBar.classList.remove('visible');
  overlay.classList.remove('active');
  overlay.classList.add('closing');
  setTimeout(() => {
    overlay.classList.remove('closing');
    document.body.style.overflow = '';
  }, 200);
}

/* ============ 弹窗 ============ */
function showModal(title, message) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  overlay.innerHTML = `
    <div class="modal-content">
      <h3>${title}</h3>
      <p>${message}</p>
      <button class="action-btn btn-primary" onclick="this.closest('.modal-overlay').remove()">知道了</button>
    </div>`;
  document.body.appendChild(overlay);
}

function showStreakModal() {
  showModal(`连续学习 ${appState.streak} 天`, `太棒了！保持每天学习的习惯，你的连续天数会越来越长！\n\n连续 3 天 → 三日连续徽章\n连续 7 天 → 一周达人徽章`);
}

function resetProgress() {
  if (confirm('确定要重置所有学习进度吗？此操作不可撤销。')) {
    localStorage.removeItem('ai_table_learn_state');
    appState = { ...DEFAULT_STATE };
    navigateTo('path');
  }
}

/* ============ Lucide 图标刷新 ============ */
function refreshIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// 劫持原始 render / renderLessonStep，在渲染后刷新图标
const _origRender = render;
render = function() { _origRender(); refreshIcons(); };
const _origRenderLesson = renderLessonStep;
renderLessonStep = function() { _origRenderLesson(); refreshIcons(); };

// feedback 插入后也需要刷新
const _origShowFeedback = showFeedback;
showFeedback = function(a, b) { _origShowFeedback(a, b); refreshIcons(); };

/* ============ 初始化 ============ */
document.addEventListener('DOMContentLoaded', () => {
  render();
});

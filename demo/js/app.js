/**
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
      <div class="nav-item ${currentPage === 'leaderboard' ? 'active' : ''}" onclick="navigateTo('leaderboard')">
        <span class="nav-icon"><i data-lucide="trophy"></i></span>
        <span>排行榜</span>
      </div>
      <div class="nav-item ${currentPage === 'profile' ? 'active' : ''}" onclick="navigateTo('profile')">
        <span class="nav-icon"><i data-lucide="user"></i></span>
        <span>我的</span>
      </div>
    </div>
  `;

  const pageContent = document.getElementById('page-content');
  switch (currentPage) {
    case 'path': renderPathPage(pageContent); break;
    case 'leaderboard': renderLeaderboardPage(pageContent); break;
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
  // 插画数据
  let sceneIlluIndex = 0;
  const levelIllustrations = {
    'l1': 'assets/kawaii/level-l1-sprout.svg',
    'l2': 'assets/kawaii/level-l2-wrench.svg',
    'l3': 'assets/kawaii/level-l3-ai-bot.svg',
    'l4': 'assets/kawaii/level-l4-lightning.svg',
    'l5': 'assets/kawaii/level-l5-architect.svg'
  };
  const sceneIllustrations = [
    'assets/kawaii/savy-love.svg',
    'assets/kawaii/savy-reading.svg',
    'assets/kawaii/savy-coffee.svg',
    'assets/kawaii/savy-trophy.svg',
    'assets/kawaii/savy-rocket.svg',
    'assets/kawaii/savy-chart.svg',
    'assets/kawaii/savy-wink.svg',
    'assets/kawaii/savy-yawn.svg',
    'assets/kawaii/savy-gaze.svg',
    'assets/kawaii/savy-angry.svg'
  ];

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

      // 插画逻辑
      let showIllustration = false;
      let illustrationSrc = '';
      let illustrationSide = 'left';

      if (i === 2 && levelIllustrations[level.id]) {
        showIllustration = true;
        illustrationSrc = levelIllustrations[level.id];
        illustrationSide = offset >= 0 ? 'left' : 'right';
      } else if (i >= 5 && (i - 5) % 4 === 0) {
        showIllustration = true;
        illustrationSrc = sceneIllustrations[sceneIlluIndex % sceneIllustrations.length];
        illustrationSide = offset >= 0 ? 'left' : 'right';
        sceneIlluIndex++;
      }

      // 判断当前 Level 是否已解锁
      const isLevelUnlocked = level.unlocked;

      if (showIllustration) {
        const lockedClass = isLevelUnlocked ? '' : ' illustration-locked';
        const clickHandler = isLevelUnlocked ? ' onclick="showUnlockedIllustrationCheer()"' : ' onclick="showLockedIllustrationHint()"';
        const pointerStyle = 'cursor:pointer;';
        html += `<div class="lesson-row illustration-row" style="transform: translateX(${offset}px)">
          <div class="level-scene-illustration ${illustrationSide}${lockedClass}"${clickHandler} style="${pointerStyle}">
            <img src="${illustrationSrc}" alt="scene" class="scene-illustration-img">
          </div>
          <div style="display:flex;flex-direction:column;align-items:center">`;
      } else {
        html += `<div class="lesson-row" style="transform: translateX(${offset}px)">`;
        html += `<div style="display:flex;flex-direction:column;align-items:center">`;
      }

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
    <div class="main-content" style="padding-bottom:${lessonState.answered ? '140px' : '100px'}">
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
    <div class="main-content" style="padding-top:100px">
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

/* ============ 排行榜页面 ============ */
function renderLeaderboardPage(container) {
  const allUsers = [...FAKE_LEADERBOARD];
  allUsers.push({ name: appState.userName + '（我）', xp: appState.totalXP, avatar: 'user-check', isMe: true });
  allUsers.sort((a, b) => b.xp - a.xp);

  let html = `
    <div class="leaderboard-page">
      <h2><i data-lucide="trophy" class="section-title-icon"></i> 本周排行榜</h2>
      <div class="league-badge">
        <span class="league-icon"><i data-lucide="medal"></i></span>
        <span class="league-name">新手联赛</span>
      </div>
      <div class="leaderboard-list">`;

  for (let i = 0; i < allUsers.length; i++) {
    const user = allUsers[i];
    const isTop3 = i < 3;
    html += `
      <div class="lb-row ${user.isMe ? 'is-me' : ''} ${isTop3 ? 'top-3' : ''}">
        <span class="lb-rank">${i + 1}</span>
        <span class="lb-avatar"><i data-lucide="${user.avatar || 'user'}"></i></span>
        <span class="lb-name">${user.name}</span>
        <span class="lb-xp">${user.xp} XP</span>
      </div>`;
  }

  html += `</div></div>`;
  container.innerHTML = html;
}

/* ============ 个人中心页面 ============ */
function renderProfilePage(container) {
  const rank = getCurrentRank(appState.totalXP);
  const nextRank = getNextRank(appState.totalXP);
  const completedCount = appState.completedLessons.length;
  const totalLessons = COURSES.levels.reduce((sum, l) => sum + l.lessons.length, 0);

  let progressPercent = 100;
  let progressLabel = '已满级';
  if (nextRank) {
    progressPercent = ((appState.totalXP - rank.minXP) / (nextRank.minXP - rank.minXP)) * 100;
    progressLabel = `${nextRank.minXP - appState.totalXP} XP 升级到 ${nextRank.name}`;
  }

  let badgesHtml = '';
  for (const badge of BADGES) {
    const earned = appState.earnedBadges.includes(badge.id);
    badgesHtml += `
      <div class="badge-cell ${earned ? 'earned' : 'unearned'}" title="${badge.description}">
        <span class="bc-icon"><i data-lucide="${badge.icon}"></i></span>
        <span class="bc-name">${badge.name}</span>
      </div>`;
  }

  container.innerHTML = `
    <div class="profile-page">
      <div class="profile-avatar"><i data-lucide="user-circle"></i></div>
      <div class="profile-name">${appState.userName}</div>
      <div class="profile-rank" style="color:${rank.color}"><i data-lucide="${rank.icon}" style="width:18px;height:18px;display:inline"></i> ${rank.name}</div>

      <div class="xp-progress-bar">
        <div class="xp-progress-fill" style="width:${Math.min(progressPercent, 100)}%;background:${rank.color}"></div>
      </div>
      <div class="rank-info">
        <span>${appState.totalXP} XP</span>
        <span>${progressLabel}</span>
      </div>

      <div class="profile-stats-grid" style="margin-top:20px">
        <div class="profile-stat-card">
          <span class="ps-icon"><i data-lucide="flame"></i></span>
          <span class="ps-value">${appState.streak}</span>
          <span class="ps-label">连续天数</span>
        </div>
        <div class="profile-stat-card">
          <span class="ps-icon"><i data-lucide="star"></i></span>
          <span class="ps-value">${appState.totalXP}</span>
          <span class="ps-label">总经验值</span>
        </div>
        <div class="profile-stat-card">
          <span class="ps-icon"><i data-lucide="book-open"></i></span>
          <span class="ps-value">${completedCount}</span>
          <span class="ps-label">已完成课程</span>
        </div>
        <div class="profile-stat-card">
          <span class="ps-icon"><i data-lucide="award"></i></span>
          <span class="ps-value">${appState.earnedBadges.length}</span>
          <span class="ps-label">获得徽章</span>
        </div>
      </div>

      <div class="profile-section">
        <h3><i data-lucide="award" class="section-title-icon"></i> 成就徽章</h3>
        <div class="badges-grid">${badgesHtml}</div>
      </div>

      <div style="margin-top:20px">
        <button class="action-btn" style="background:var(--red);color:white;box-shadow:0 4px 0 #CC3333;width:100%"
                onclick="resetProgress()">
          重置学习进度
        </button>
      </div>
    </div>`;
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

function showLockedIllustrationHint() {
  showModal('🔒 鸭鸭还在等你', '想解锁这个可爱的鸭鸭，就在学习路线上继续前进吧 💪');
}

const DUCK_CHEER_QUOTES = [
  '🌟 "千里之行，始于足下。" —— 你已经迈出了最重要的一步！',
  '🎬 "生活就像一盒巧克力，你永远不知道下一颗是什么味道。" —— 《阿甘正传》',
  '📖 "不积跬步，无以至千里。" —— 每一次学习都在积累你的力量！',
  '🌈 "只要你肯努力，全世界都会为你让路。"',
  '🎯 "成功不是终点，失败也不是终结，唯有继续前行的勇气才最重要。" —— 丘吉尔',
  '🚀 "To infinity and beyond!" —— 《玩具总动员》巴斯光年',
  '💪 "你比你想象的更勇敢，比你看起来更强大。" —— 《小熊维尼》',
  '🌻 "每一个优秀的人，都有一段沉默的时光。" —— 你正在默默变强！',
  '⭐ "星光不问赶路人，时光不负有心人。" —— 你的努力终将闪耀！',
  '🎵 "Let it go, let it go!" —— 放下焦虑，享受学习的快乐吧！',
  '🏆 "我不是天生的赢家，但我可以成为不断进步的人。"',
  '📚 "书山有路勤为径，学海无涯苦作舟。" —— 但有鸭鸭陪你就不苦啦！',
  '🌸 "所有的努力都不会被辜负，时间会给你最好的答案。"',
  '🎪 "After all, tomorrow is another day!" —— 《乱世佳人》斯嘉丽',
  '🔥 "你今天的坚持，是明天的底气。" —— 继续加油！',
  '🐣 "慢慢来，比较快。" —— 学习不急，扎实最重要！',
  '🌊 "乘风破浪会有时，直挂云帆济沧海。" —— 李白也在为你加油！',
  '💎 "每个人都是自己人生的主角。" —— 你的故事正在精彩上演！',
  '🎭 "Do, or do not. There is no try." —— 《星球大战》尤达大师',
  '🍀 "越努力，越幸运。" —— 你的好运正在路上！',
  '🌙 "今天的你，比昨天的你更厉害了！" —— 这就是进步的意义',
  '🎈 "人生没有白走的路，每一步都算数。"',
  '🦋 "破茧成蝶需要时间，但你一定会飞起来的！"',
  '🏔️ "山再高，往上攀，总能登顶；路再长，走下去，定能到达。"',
  '🎸 "Yesterday is history, tomorrow is a mystery, but today is a gift." —— 《功夫熊猫》乌龟大师',
  '🌞 "你的笑容就是最好的正能量，继续保持！"',
  '🍎 "Stay hungry, stay foolish." —— 乔布斯说的，保持好奇心！',
  '🎯 "不要因为走得太远，而忘记为什么出发。" —— 你的初心很棒！',
  '🌺 "种一棵树最好的时间是十年前，其次是现在。" —— 你正在种下知识的种子！',
  '🎪 "It always seems impossible until it is done." —— 曼德拉'
];

function showUnlockedIllustrationCheer() {
  const randomQuote = DUCK_CHEER_QUOTES[Math.floor(Math.random() * DUCK_CHEER_QUOTES.length)];
  const message = randomQuote + '\n\n🦆 你的前进路上，欢乐鸭鸭都会一直陪伴你 💛';
  showModal('🦆 鸭鸭想对你说', message);
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

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
  speedComplete: false,
  previousStreak: 0,
  streakBrokenShown: false,
  milestoneShown: [],
  unlockedEmotions: []
};

/* ============ 表情稀有度系统 ============ */
const EMOTION_RARITY = {
  'savy-celebrate': { rarity: 'common',    label: '普通', color: '#AFAFAF', name: '庆祝' },
  'savy-sad':       { rarity: 'common',    label: '普通', color: '#AFAFAF', name: '伤心' },
  'savy-happy':     { rarity: 'common',    label: '普通', color: '#AFAFAF', name: '开心' },
  'savy-thinking':  { rarity: 'common',    label: '普通', color: '#AFAFAF', name: '思考' },
  'savy-pleading':  { rarity: 'rare',      label: '稀有', color: '#58CC02', name: '撒娇' },
  'savy-cheer':     { rarity: 'rare',      label: '稀有', color: '#58CC02', name: '加油' },
  'savy-facepalm':  { rarity: 'rare',      label: '稀有', color: '#58CC02', name: '无语' },
  'savy-flip':      { rarity: 'rare',      label: '稀有', color: '#58CC02', name: '翻车' },
  'savy-eureka':    { rarity: 'rare',      label: '稀有', color: '#58CC02', name: '灵感' },
  'savy-surprised': { rarity: 'epic',      label: '史诗', color: '#1CB0F6', name: '惊讶' },
  'savy-cool':      { rarity: 'epic',      label: '史诗', color: '#1CB0F6', name: '耍酷' },
  'savy-pretend-fine': { rarity: 'epic',   label: '史诗', color: '#1CB0F6', name: '强颜欢笑' },
  'savy-graduation':{ rarity: 'legendary', label: '传说', color: '#A560E8', name: '毕业' },
  'savy-boss':      { rarity: 'mythic',    label: '神话', color: '#FFC800', name: '大佬' }
};

function getEmotionKeyFromSrc(src) {
  const match = src.match(/savy-[\w-]+/);
  return match ? match[0].replace('.svg', '') : null;
}

function checkEmotionUnlock(emotionKey) {
  if (!emotionKey || !EMOTION_RARITY[emotionKey]) return;
  if (EMOTION_RARITY[emotionKey].rarity === 'common') return;
  if (!appState.unlockedEmotions) appState.unlockedEmotions = [];
  if (appState.unlockedEmotions.includes(emotionKey)) return;
  appState.unlockedEmotions.push(emotionKey);
  saveState(appState);
  setTimeout(() => showEmotionUnlockModal(emotionKey), 800);
}

function showEmotionUnlockModal(emotionKey) {
  const info = EMOTION_RARITY[emotionKey];
  if (!info) return;
  SoundManager.playBadge();
  const overlay = document.createElement('div');
  overlay.className = 'emotion-unlock-overlay';
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  overlay.innerHTML = `
    <div class="emotion-unlock-modal rarity-${info.rarity}">
      <div class="emotion-unlock-sparkle"></div>
      <div class="emotion-unlock-badge">${info.label}</div>
      <div class="emotion-unlock-mascot">
        <img src="assets/kawaii/${emotionKey}.svg" alt="${info.name}">
      </div>
      <h3 class="emotion-unlock-title">解锁新表情！</h3>
      <p class="emotion-unlock-name">${info.name}</p>
      <p class="emotion-unlock-rarity" style="color:${info.color}">${info.label}表情</p>
      <button class="streak-modal-btn" onclick="this.closest('.emotion-unlock-overlay').remove()">太棒了鸭！</button>
    </div>`;
  document.body.appendChild(overlay);
  if (info.rarity === 'legendary' || info.rarity === 'mythic') showConfetti();
}

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
      appState.previousStreak = appState.streak;
      appState.streak = 1;
      appState.streakBrokenShown = false;
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

  const isProfilePage = currentPage === 'profile';
  app.innerHTML = `
    ${!isProfilePage ? `
    <div class="top-bar">
      <div class="top-bar-logo" onclick="navigateTo('path')" style="color:#333;">
        HappyDuck AI
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
    ` : ''}

    <div class="main-content ${isProfilePage ? 'no-top-bar' : ''}" id="page-content"></div>

    <div class="bottom-nav">
      <div class="nav-item ${currentPage === 'path' ? 'active' : ''}" onclick="navigateTo('path')">
        <span class="nav-icon"><i data-lucide="book-open"></i></span>
      </div>
      <div class="nav-item ${currentPage === 'profile' ? 'active' : ''}" onclick="navigateTo('profile')">
        <span class="nav-icon"><i data-lucide="user"></i></span>
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
  document.body.classList.toggle('page-profile', page === 'profile');
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
    'L1': 'assets/kawaii/level-l1-sprout.svg',
    'L2': 'assets/kawaii/level-l2-wrench.svg',
    'L3': 'assets/kawaii/level-l3-ai-bot.svg',
    'L4': 'assets/kawaii/level-l4-lightning.svg',
    'L5': 'assets/kawaii/level-l5-architect.svg'
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
    'assets/kawaii/savy-angry.svg',
    'assets/kawaii/savy-surprised.svg',
    'assets/kawaii/savy-cool.svg',
    'assets/kawaii/savy-cheer.svg',
    'assets/kawaii/savy-graduation.svg',
    'assets/kawaii/savy-eureka.svg',
    'assets/kawaii/savy-boss.svg'
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
      <div class="level-divider-header">
        <div class="level-divider-line"></div>
        <div class="level-divider-title" style="color: ${level.color}">
          <span class="level-divider-name">${level.title}</span>
          <span class="level-divider-sub">${level.subtitle} · ${totalCount} 课</span>
        </div>
        <div class="level-divider-line"></div>
      </div>
    `;

    html += `<div class="lesson-path">`;
    const lessons = level.lessons;
    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];
      const status = level.unlocked ? getLessonStatus(lesson.id) : 'locked';
      const statusClass = status;
      const isMobile = window.innerWidth <= 600;
      const baseOffsets = [0, 50, 80, 50, 0, -50, -80, -50];
      const offsets = isMobile ? baseOffsets.map(v => Math.round(v * 0.55)) : baseOffsets;
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
        html += `<div class="lesson-node completed" id="lesson-node-${lesson.id}" onclick="startLesson('${lesson.id}', true)" style="background:${level.color};border-color:${level.color};box-shadow:0 4px 0 ${level.color}99"><span class="lesson-check"><i data-lucide="check"></i></span></div>`;
      } else if (status === 'current') {
        html += `<div class="lesson-node current level-pulse-${level.id}" id="lesson-node-${lesson.id}" onclick="startLesson('${lesson.id}')" style="border-color:${level.color}"><i data-lucide="${lesson.icon}" style="color:${level.color}"></i></div>`;
      } else {
        html += `<div class="lesson-node locked" id="lesson-node-${lesson.id}" onclick="showLockedLessonTooltip('${lesson.id}')"><span class="lock-icon"><i data-lucide="lock"></i></span></div>`;
      }

      html += `<div class="lesson-label ${status === 'completed' ? 'completed-label' : ''}" style="${status !== 'locked' ? 'color:' + level.color : ''}">${lesson.title}</div>`;
      html += `</div></div>`;
    }
    html += `</div></div>`;
  }

  container.innerHTML = html;

  // 为每个 level 注入专属脉冲动画（颜色跟随主题色）
  let dynamicStyle = document.getElementById('level-pulse-style');
  if (!dynamicStyle) {
    dynamicStyle = document.createElement('style');
    dynamicStyle.id = 'level-pulse-style';
    document.head.appendChild(dynamicStyle);
  }
  let pulseCSS = '';
  for (const level of COURSES.levels) {
    const color = level.color || '#58CC02';
    // 将 hex 颜色转为 rgba
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    pulseCSS += `
      @keyframes pulse-${level.id} {
        0%, 100% { box-shadow: 0 0 0 8px rgba(${r},${g},${b},0.15); }
        50% { box-shadow: 0 0 0 14px rgba(${r},${g},${b},0.08); }
      }
      .level-pulse-${level.id} { animation: pulse-${level.id} 2s infinite; }
    `;
  }
  dynamicStyle.textContent = pulseCSS;

  // 吸顶 Level 条
  let stickyBar = document.getElementById('sticky-level-bar');
  if (!stickyBar) {
    stickyBar = document.createElement('div');
    stickyBar.id = 'sticky-level-bar';
    stickyBar.className = 'sticky-level-bar';
    document.body.appendChild(stickyBar);
  }

  const levelSections = container.querySelectorAll('.level-section');
  const levelDividers = container.querySelectorAll('.level-divider-header');

  const stickyObserver = new IntersectionObserver((entries) => {
    let currentVisible = null;
    levelSections.forEach((section, idx) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < 80 && rect.bottom > 80) {
        currentVisible = idx;
      }
    });

    if (currentVisible !== null) {
      const level = COURSES.levels[currentVisible];
      const divider = levelDividers[currentVisible];
      const nameEl = divider ? divider.querySelector('.level-divider-name') : null;
      const subEl = divider ? divider.querySelector('.level-divider-sub') : null;
      const completedCount = level ? level.lessons.filter(l => appState.completedLessons.includes(l.id)).length : 0;
      const totalCount = level ? level.lessons.length : 0;
      stickyBar.style.background = level ? level.color : '#58CC02';
      stickyBar.innerHTML = '<div class="level-info"><h3>' + (nameEl ? nameEl.textContent : '') + '</h3><p>' + (subEl ? subEl.textContent : '') + '</p></div>' +
        '<span class="level-progress">' + completedCount + '/' + totalCount + '</span>';
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  }, { threshold: [0, 0.1, 0.5, 1] });

  levelSections.forEach(section => stickyObserver.observe(section));

  // 也用 scroll 事件作为补充
  window.removeEventListener('scroll', handleStickyScroll);
  window.addEventListener('scroll', handleStickyScroll);

  // 回到顶部按钮
  let backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top-btn';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i data-lucide="arrow-up"></i>';
    backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(backToTopBtn);
  }

  window.removeEventListener('scroll', handleBackToTopScroll);
  window.addEventListener('scroll', handleBackToTopScroll);
}

function handleBackToTopScroll() {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;
  if (window.scrollY > window.innerHeight) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
  refreshIcons();
}

function handleStickyScroll() {
  const stickyBar = document.getElementById('sticky-level-bar');
  if (!stickyBar) return;
  const sections = document.querySelectorAll('.level-section');
  const dividers = document.querySelectorAll('.level-divider-header');
  let currentVisible = null;

  sections.forEach((section, idx) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < 80 && rect.bottom > 80) {
      currentVisible = idx;
    }
  });

  if (currentVisible !== null) {
    const level = COURSES.levels[currentVisible];
    const divider = dividers[currentVisible];
    const nameEl = divider ? divider.querySelector('.level-divider-name') : null;
    const subEl = divider ? divider.querySelector('.level-divider-sub') : null;
    const completedCount = level ? level.lessons.filter(l => appState.completedLessons.includes(l.id)).length : 0;
    const totalCount = level ? level.lessons.length : 0;
    stickyBar.style.background = level ? level.color : '#58CC02';
    stickyBar.innerHTML = '<div class="level-info"><h3>' + (nameEl ? nameEl.textContent : '') + '</h3><p>' + (subEl ? subEl.textContent : '') + '</p></div>' +
      '<span class="level-progress">' + completedCount + '/' + totalCount + '</span>';
    stickyBar.classList.add('visible');
  } else {
    stickyBar.classList.remove('visible');
  }
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
    levelColor: level.color || '#58CC02',
    currentStep: 0,
    totalSteps: lesson.cards.length + lesson.questions.length,
    correctCount: 0,
    totalQuestions: lesson.questions.length,
    selectedAnswer: null,
    answered: false,
    startTime: Date.now(),
    matchAnswers: {},
    orderItems: null,
    isReview: !!isReview,
    consecutiveCorrect: 0,
    consecutiveWrong: 0
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

  const levelColor = lessonState.levelColor || '#58CC02';
  app.innerHTML = `
    <div class="lesson-top-nav">
      <div class="progress-bar-container" style="flex:1">
        <div class="progress-bar-fill ${lessonState.isReview ? 'review-fill' : ''}" style="width:${progress}%;background:${levelColor}"></div>
      </div>
      <button class="lesson-close" onclick="exitLesson()"><i data-lucide="x"></i></button>
    </div>
    <div class="lesson-main-content" style="padding-bottom:${lessonState.answered ? '140px' : '100px'};--level-color:${levelColor}">
      <div class="lesson-page">${contentHtml}</div>
    </div>
    ${isCard ? `
      <div class="check-area" style="--level-color:${levelColor}">
        <button class="action-btn btn-primary" onclick="nextStep()">继续</button>
      </div>
    ` : ''}
    ${!isCard && !lessonState.answered ? `
      <div class="check-area" style="--level-color:${levelColor}">
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
  let html = `<div class="knowledge-card"><div class="card-mascot"><img src="assets/kawaii/savy-happy.svg" class="card-mascot-img" alt="mascot"></div><h3><i data-lucide="book-open" class="card-title-icon"></i> ${card.title}</h3>`;

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

  if (isCorrect) {
    lessonState.correctCount++;
    lessonState.consecutiveCorrect++;
    lessonState.consecutiveWrong = 0;
  } else {
    lessonState.consecutiveWrong++;
    lessonState.consecutiveCorrect = 0;
  }

  renderLessonStep();

  const explanation = question.explanation || (isCorrect ? '回答正确！' : '再想想哦~');
  showFeedback(isCorrect, explanation, questionIndex);
}

function showFeedback(isCorrect, explanation, questionIndex) {
  if (isCorrect) { SoundManager.playCorrect(); } else { SoundManager.playIncorrect(); }
  const existing = document.querySelector('.feedback-bar');
  if (existing) existing.remove();

  let mascotSrc, feedbackTitle;
  const cc = lessonState.consecutiveCorrect;
  const cw = lessonState.consecutiveWrong;

  if (isCorrect) {
    if (cc >= 5) {
      mascotSrc = 'assets/kawaii/savy-cool.svg';
      feedbackTitle = '太强了鸭！闭着眼都会！😎';
    } else if (cc >= 3) {
      mascotSrc = 'assets/kawaii/savy-cheer.svg';
      feedbackTitle = '冲鸭！连对 ' + cc + ' 题！🔥';
    } else if (cw === 0 && questionIndex > 0 && lessonState.consecutiveCorrect === 1) {
      // 刚从连错中恢复（上一轮 consecutiveWrong > 0 已被清零，但 questionIndex > 0 说明不是第一题）
      mascotSrc = 'assets/kawaii/savy-celebrate.svg';
      feedbackTitle = '答对了鸭！🎉';
    } else {
      mascotSrc = 'assets/kawaii/savy-celebrate.svg';
      feedbackTitle = '答对了鸭！🎉';
    }
  } else {
    if (questionIndex === 0) {
      mascotSrc = 'assets/kawaii/savy-flip.svg';
      feedbackTitle = '救命！这才第一题鸭…🍳';
    } else if (cw >= 3) {
      mascotSrc = 'assets/kawaii/savy-facepalm.svg';
      feedbackTitle = '哎鸭…看看解析再试试？';
    } else if (cw >= 2) {
      mascotSrc = 'assets/kawaii/savy-pleading.svg';
      feedbackTitle = '别有鸭力，你可以的！🥺';
    } else {
      mascotSrc = 'assets/kawaii/savy-sad.svg';
      feedbackTitle = '没关系鸭，再来一次～';
    }
  }

  const emotionKey = getEmotionKeyFromSrc(mascotSrc);
  const rarityInfo = emotionKey ? EMOTION_RARITY[emotionKey] : null;
  const rarityClass = rarityInfo ? ' rarity-' + rarityInfo.rarity : '';

  const feedbackHtml = `
    <div class="feedback-bar ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}${rarityClass}">
      <img src="${mascotSrc}" class="feedback-mascot" alt="mascot">
      <div class="feedback-text">
        <div class="feedback-title">${feedbackTitle}</div>
        <div class="feedback-explanation">${explanation}</div>
      </div>
      <button class="btn-continue" onclick="nextStep()">继续</button>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', feedbackHtml);
  checkEmotionUnlock(emotionKey);
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

  const rankBeforeComplete = getCurrentRank(appState.totalXP - xpEarned);
  updateStreak();
  checkAndUnlockLevels();
  const newBadges = checkNewBadges();
  saveState(appState);

  SoundManager.playComplete();
  if (newBadges.length > 0) { setTimeout(() => SoundManager.playBadge(), 400); }
  const rankAfterComplete = getCurrentRank(appState.totalXP);
  if (rankAfterComplete.name !== rankBeforeComplete.name) { setTimeout(() => SoundManager.playLevelUp(), 800); }
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

  let completeTitle, completeMascot;
  if (accuracy === 100) {
    completeTitle = '满分通关！你是最棒的鸭！💯';
    completeMascot = 'assets/kawaii/savy-cool.svg';
  } else if (accuracy >= 80) {
    completeTitle = '太棒了鸭！又学会了新技能！🎓';
    completeMascot = 'assets/kawaii/savy-celebrate.svg';
  } else {
    completeTitle = '课程完成鸭！继续加油！💪';
    completeMascot = 'assets/kawaii/savy-cheer.svg';
  }

  app.innerHTML = `
    <div class="main-content" style="padding-top:100px">
      <div class="lesson-complete">
        <div class="complete-mascot" style="margin-bottom:12px"><img src="${completeMascot}" alt="savy" style="width:80px;height:80px"></div>
        <h2>${completeTitle}</h2>
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
  // 复习模式直接退出，不弹挽留浮层
  if (lessonState.isReview) {
    doExitLesson();
    return;
  }
  // 已经到最后一步（完成页），直接退出
  if (lessonState.currentStep >= lessonState.totalSteps) {
    doExitLesson();
    return;
  }
  // 弹出挽留浮层
  showExitConfirm();
}

function showExitConfirm() {
  const levelColor = lessonState.levelColor || '#58CC02';
  const progressPercent = (lessonState.currentStep / lessonState.totalSteps) * 100;

  const overlay = document.createElement('div');
  overlay.className = 'exit-overlay';
  overlay.id = 'exit-confirm-overlay';
  overlay.onclick = (e) => { if (e.target === overlay) closeExitConfirm(); };

  const sheet = document.createElement('div');
  sheet.className = 'exit-sheet';
  sheet.innerHTML = `
    <div class="exit-sheet-handle"></div>
    <div class="exit-sheet-savy">
      <img src="assets/kawaii/savy-pleading.svg" alt="savy">
    </div>
    <div class="exit-sheet-title">别走嘛，只差几步就完成了！</div>
    <div class="exit-sheet-progress">
      <span>当前进度：${lessonState.currentStep} / ${lessonState.totalSteps}</span>
      <div class="exit-progress-bar">
        <div class="exit-progress-fill" style="width:${progressPercent}%;background:${levelColor}"></div>
      </div>
    </div>
    <div class="exit-sheet-buttons">
      <button class="action-btn btn-primary exit-btn-continue" style="background:${levelColor};border-color:${levelColor}" onclick="closeExitConfirm()">继续努力</button>
      <button class="action-btn exit-btn-quit" onclick="doExitLesson()">放弃本次学习</button>
    </div>
  `;

  overlay.appendChild(sheet);
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.add('show');
    sheet.classList.add('show');
  });
}

function closeExitConfirm() {
  const overlay = document.getElementById('exit-confirm-overlay');
  if (!overlay) return;
  const sheet = overlay.querySelector('.exit-sheet');
  overlay.classList.remove('show');
  if (sheet) sheet.classList.remove('show');
  setTimeout(() => overlay.remove(), 350);
}

function doExitLesson() {
  const overlay = document.getElementById('exit-confirm-overlay');
  if (overlay) overlay.remove();
  const existing = document.querySelector('.feedback-bar');
  if (existing) existing.remove();
  currentPage = 'path';
  render();
}

/* ============ 个人中心页面（微信读书风格） ============ */
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
      if (!levelCompleted) { currentLevel = level.title; break; }
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
              <i data-lucide="award"></i> <span>${earnedCount}</span>
            </span>
          </div>
        </div>
      </div>

      <div class="p-card">
        <div class="p-card-row">
          <div class="icon-circle" style="background:var(--icon-gold-bg);"><i data-lucide="shield" style="color:var(--icon-gold-fg);"></i></div>
          <div class="p-card-label">${rank.name}</div>
          <div class="p-card-value"><div><span class="num-primary">${appState.totalXP}</span> <span class="num-unit">XP</span></div></div>
        </div>
        <div class="rank-progress">
          <div class="rank-progress-bar"><div class="rank-progress-fill" style="width:${Math.min(progressPercent, 100)}%;"></div></div>
          <div class="rank-progress-text">
            <span>${rank.name} ${rank.minXP} XP</span>
            <span>${nextRank ? nextRank.name + ' ' + nextRank.minXP + ' XP' : '已满级'}</span>
          </div>
        </div>
      </div>

      <div class="p-card-group">
        <div class="p-card">
          <div class="p-card-row">
            <div class="icon-circle" style="background:var(--icon-orange-bg);"><i data-lucide="flame" style="color:var(--icon-orange-fg);"></i></div>
            <div><div class="p-card-label">连续打卡</div><div class="num-sub">连续 ${appState.streak} 天</div></div>
          </div>
        </div>
        <div class="p-card">
          <div class="p-card-row">
            <div class="icon-circle" style="background:var(--icon-pink-bg);"><i data-lucide="heart" style="color:var(--icon-pink-fg);"></i></div>
            <div><div class="p-card-label">满分课程</div><div class="num-sub">${perfectCount} 课满分</div></div>
          </div>
        </div>
      </div>

      <div class="p-card" style="margin-top:8px;">
        <div class="p-card-row">
          <div class="icon-circle" style="background:var(--icon-pink-bg);"><i data-lucide="clock" style="color:var(--icon-pink-fg);"></i></div>
          <div class="p-card-label">学习时长</div>
          <div class="p-card-value"><div><span class="num-primary">${studyHours}</span> <span class="num-unit">小时</span> <span class="num-primary">${studyMins}</span> <span class="num-unit">分钟</span></div></div>
        </div>
      </div>

      <div class="grid-2x2">
        <div class="grid-cell">
          <div class="icon-circle" style="background:var(--icon-green-bg);"><i data-lucide="play-circle" style="color:var(--icon-green-fg);"></i></div>
          <div><div class="grid-cell-label">在学</div><div class="grid-cell-sub">${currentLevel}</div></div>
        </div>
        <div class="grid-cell">
          <div class="icon-circle" style="background:var(--icon-blue-bg);"><i data-lucide="check-circle" style="color:var(--icon-blue-fg);"></i></div>
          <div><div class="grid-cell-label">已完成</div><div class="grid-cell-sub">累计 ${completedCount} 课</div></div>
        </div>
        <div class="grid-cell">
          <div class="icon-circle" style="background:var(--icon-purple-bg);"><i data-lucide="star" style="color:var(--icon-purple-fg);"></i></div>
          <div><div class="grid-cell-label">总经验</div><div class="grid-cell-sub">${appState.totalXP} XP</div></div>
        </div>
        <div class="grid-cell">
          <div class="icon-circle" style="background:var(--icon-teal-bg);"><i data-lucide="zap" style="color:var(--icon-teal-fg);"></i></div>
          <div><div class="grid-cell-label">总课程</div><div class="grid-cell-sub">${totalLessons} 课</div></div>
        </div>
      </div>

      <div class="p-card" style="margin-top:8px;">
        <div class="p-card-row" style="cursor:pointer;" onclick="openBadgeWall()">
          <div class="icon-circle" style="background:var(--icon-indigo-bg);"><i data-lucide="award" style="color:var(--icon-indigo-fg);"></i></div>
          <div class="p-card-label">勋章</div>
          <div class="p-card-value">
            <div><span class="num-primary">${earnedCount}</span> <span class="num-unit">枚</span></div>
            <div class="num-sub">共 ${BADGES.length} 枚可获得</div>
          </div>
        </div>
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
    { title: '习惯养成 · 连续打卡', shape: 'shield', badges: BADGES.filter(b => b.id.startsWith('streak') || (b.description && b.description.includes('连续'))) },
    { title: '课程里程碑', shape: 'hex', badges: BADGES.filter(b => b.id.startsWith('complete') || b.id.endsWith('_complete') || (b.description && b.description.includes('完成'))) },
    { title: '累计成就 · 经验值', shape: 'circle', badges: BADGES.filter(b => b.id.startsWith('xp') || (b.description && (b.description.includes('经验') || b.description.includes('XP')))) }
  ];
  const categorizedIds = badgeCategories.flatMap(c => c.badges.map(b => b.id));
  const uncategorized = BADGES.filter(b => !categorizedIds.includes(b.id));
  if (uncategorized.length > 0) badgeCategories.push({ title: '特殊成就', shape: 'diamond', badges: uncategorized });

  let categoriesHtml = '';
  for (const category of badgeCategories) {
    if (category.badges.length === 0) continue;
    let badgesHtml = '';
    for (const badge of category.badges) {
      const earned = earnedBadgeIds.includes(badge.id);
      const tier = earned ? 'gold' : 'bronze';
      const iconHtml = earned
        ? '<i data-lucide="' + badge.icon + '" style="width:36px;height:36px;"></i>'
        : '<i data-lucide="lock" style="width:28px;height:28px;opacity:0.5;"></i>';
      badgesHtml += '<div class="bw-badge-cell' + (earned ? '' : ' unearned') + '">' +
        '<div class="badge-frame shape-' + category.shape + ' tier-' + tier + '">' +
          '<div class="badge-outer"></div>' +
          '<div class="badge-inner">' + iconHtml + '</div>' +
        '</div>' +
        '<span class="bw-badge-name">' + badge.name + '</span>' +
        '<span class="bw-badge-desc">' + badge.description + '</span>' +
        (earned ? '' : '<div class="badge-progress-wrap"><div class="badge-progress"><div class="badge-progress-fill progress-' + tier + '" style="width:30%"></div></div></div>') +
      '</div>';
    }
    categoriesHtml += '<div class="category-card"><div class="category-title">' + category.title + '</div><div class="badge-grid">' + badgesHtml + '</div></div>';
  }

  const particles = Array.from({length: 12}, () => '<span class="wall-particle"></span>').join('');
  const overlay = document.createElement('div');
  overlay.className = 'badge-wall-overlay';
  overlay.id = 'badgeWallOverlay';
  overlay.innerHTML =
    '<div class="badge-wall-container">' +
      '<div class="wall-sticky-bar" id="wallStickyBar">' +
        '<button class="sticky-back" onclick="closeBadgeWall()"><i data-lucide="chevron-left"></i></button>' +
        '<div class="sticky-title">我的勋章</div>' +
      '</div>' +
      '<div class="wall-header-wrap">' +
        '<div class="wall-particles">' + particles + '</div>' +
        '<button class="wall-back-btn" onclick="closeBadgeWall()"><i data-lucide="chevron-left"></i></button>' +
        '<div class="wall-header">' +
          '<h2>我的勋章</h2>' +
          '<div class="wall-stats"><span class="stat-earned">' + earnedCount + '</span><span class="stat-sep">/</span><span class="stat-total">' + totalBadges + '</span></div>' +
          '<div class="wall-subtitle">已收集 ' + earnedCount + ' 枚勋章，继续加油！</div>' +
        '</div>' +
      '</div>' +
      categoriesHtml +
    '</div>';

  document.body.appendChild(overlay);
  refreshIcons();

  const wallContainer = overlay.querySelector('.badge-wall-container');
  const wallStickyBar = document.getElementById('wallStickyBar');
  const wallBackBtn = overlay.querySelector('.wall-back-btn');
  if (wallContainer && wallStickyBar && wallBackBtn) {
    wallContainer.addEventListener('scroll', () => {
      const btnRect = wallBackBtn.getBoundingClientRect();
      const containerRect = wallContainer.getBoundingClientRect();
      const backBtnBottom = btnRect.bottom - containerRect.top;
      wallStickyBar.classList.toggle('visible', backBtnBottom < 0);
    });
  }
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeBadgeWall(); });
}

function openBadgeWall() {
  const existing = document.getElementById('badgeWallOverlay');
  if (existing) existing.remove();
  ensureBadgeWallOverlay();
  const overlay = document.getElementById('badgeWallOverlay');
  document.body.style.overflow = 'hidden';
  const container = overlay.querySelector('.badge-wall-container');
  if (container) container.scrollTop = 0;
  const stickyBar = document.getElementById('wallStickyBar');
  if (stickyBar) stickyBar.classList.remove('visible');
  refreshIcons();
  // 等浏览器渲染初始 translateX(100%) 后再触发动画
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add('active');
    });
  });
}

function closeBadgeWall() {
  const overlay = document.getElementById('badgeWallOverlay');
  if (!overlay) return;
  const stickyBar = document.getElementById('wallStickyBar');
  if (stickyBar) stickyBar.classList.remove('visible');
  overlay.classList.remove('active');
  overlay.classList.add('closing');
  setTimeout(() => { overlay.classList.remove('closing'); document.body.style.overflow = ''; }, 200);
}

/* ============ 弹窗 ============ */
function showModal(title, message) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  overlay.innerHTML = `
    <div class="modal-content">
      <button class="modal-close-btn" onclick="this.closest('.modal-overlay').remove()">&times;</button>
      <h3>${title}</h3>
      <p>${message}</p>
      <button class="action-btn btn-primary" onclick="this.closest('.modal-overlay').remove()">知道了</button>
    </div>`;
  document.body.appendChild(overlay);
}


function showLockedLessonTooltip(lessonId) {
  let lessonData = null;
  let levelData = null;
  for (const level of COURSES.levels) {
    for (const lesson of level.lessons) {
      if (lesson.id === lessonId) {
        lessonData = lesson;
        levelData = level;
        break;
      }
    }
    if (lessonData) break;
  }
  if (!lessonData) return;

  const firstCard = lessonData.cards && lessonData.cards[0];
  const briefContent = firstCard
    ? (firstCard.highlight || firstCard.content || '').replace(/<[^>]*>/g, '').substring(0, 60)
    : '';

  const overlay = document.createElement('div');
  overlay.className = 'locked-tooltip-overlay';
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  overlay.innerHTML = `
    <div class="locked-tooltip">
      <button class="modal-close-btn" onclick="this.closest('.locked-tooltip-overlay').remove()">&times;</button>
      <div class="tooltip-lock"><i data-lucide="lock"></i></div>
      <div class="tooltip-title">${lessonData.title}</div>
      ${briefContent ? '<div class="tooltip-desc">' + briefContent + '</div>' : ''}
      <div class="tooltip-status">\u672a\u89e3\u9501</div>
      <div class="tooltip-hint">\u5b8c\u6210\u4ee5\u4e0a\u5168\u90e8\u7b49\u7ea7\u624d\u53ef\u4ee5\u89e3\u9501\u54e6\uff01</div>
    </div>`;
  document.body.appendChild(overlay);
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function showLockedIllustrationHint() {
  showModal('🔒 鸭鸭还在等你', '想解锁这个可爱的鸭鸭，就在学习路线上继续前进吧 💪');
}

const DUCK_CHEER_QUOTES = [
  '"千里之行，始于足下。" —— 你已经迈出了最重要的一步！',
  '"生活就像一盒巧克力，你永远不知道下一颗是什么味道。" —— 《阿甘正传》',
  '"不积跬步，无以至千里。" —— 每一次学习都在积累你的力量！',
  '"只要你肯努力，全世界都会为你让路。"',
  '"成功不是终点，失败也不是终结，唯有继续前行的勇气才最重要。" —— 丘吉尔',
  '"To infinity and beyond!" —— 《玩具总动员》巴斯光年',
  '"你比你想象的更勇敢，比你看起来更强大。" —— 《小熊维尼》',
  '"每一个优秀的人，都有一段沉默的时光。" —— 你正在默默变强！',
  '"星光不问赶路人，时光不负有心人。" —— 你的努力终将闪耀！',
  '"Let it go, let it go!" —— 放下焦虑，享受学习的快乐吧！',
  '"我不是天生的赢家，但我可以成为不断进步的人。"',
  '"书山有路勤为径，学海无涯苦作舟。" —— 但有鸭鸭陪你就不苦啦！',
  '"所有的努力都不会被辜负，时间会给你最好的答案。"',
  '"After all, tomorrow is another day!" —— 《乱世佳人》斯嘉丽',
  '"你今天的坚持，是明天的底气。" —— 继续加油！',
  '"慢慢来，比较快。" —— 学习不急，扎实最重要！',
  '"乘风破浪会有时，直挂云帆济沧海。" —— 李白也在为你加油！',
  '"每个人都是自己人生的主角。" —— 你的故事正在精彩上演！',
  '"Do, or do not. There is no try." —— 《星球大战》尤达大师',
  '"越努力，越幸运。" —— 你的好运正在路上！',
  '"今天的你，比昨天的你更厉害了！" —— 这就是进步的意义',
  '"人生没有白走的路，每一步都算数。"',
  '"破茧成蝶需要时间，但你一定会飞起来的！"',
  '"山再高，往上攀，总能登顶；路再长，走下去，定能到达。"',
  '"Yesterday is history, tomorrow is a mystery, but today is a gift." —— 《功夫熊猫》乌龟大师',
  '"你的笑容就是最好的正能量，继续保持！"',
  '"Stay hungry, stay foolish." —— 乔布斯说的，保持好奇心！',
  '"不要因为走得太远，而忘记为什么出发。" —— 你的初心很棒！',
  '"种一棵树最好的时间是十年前，其次是现在。" —— 你正在种下知识的种子！',
  '"It always seems impossible until it is done." —— 曼德拉'
];

function showUnlockedIllustrationCheer() {
  const randomQuote = DUCK_CHEER_QUOTES[Math.floor(Math.random() * DUCK_CHEER_QUOTES.length)];
  const message = randomQuote + '<br><br>你的前进路上，欢乐鸭鸭都会一直陪伴你 💛';
  showModal('鸭鸭想对你说', message);
}
/* ============ 连续打卡情感化 ============ */
const STREAK_MILESTONES = [
  { days: 3,   mascot: 'savy-cheer.svg',      title: '🔥 三天连续鸭！',  subtitle: '好的开始是成功的一半！冲鸭！💪',              confetti: false, glow: false },
  { days: 7,   mascot: 'savy-celebrate.svg',   title: '🔥 一周达人鸭！',  subtitle: '连续 7 天，太棒了鸭！',                      confetti: true,  glow: false },
  { days: 14,  mascot: 'savy-cool.svg',        title: '🔥 两周坚持鸭！',  subtitle: '习惯正在养成，继续冲鸭！',                    confetti: true,  glow: false },
  { days: 30,  mascot: 'savy-trophy.svg',      title: '🏆 月度传奇鸭！',  subtitle: '连续 30 天！你是真正的学习达人鸭！',          confetti: true,  glow: true },
  { days: 60,  mascot: 'savy-boss.svg',        title: '🏆 双月之星鸭！',  subtitle: '60 天不间断，这份毅力令人敬佩鸭！',          confetti: true,  glow: true },
  { days: 100, mascot: 'savy-graduation.svg',  title: '🚀 百日传说鸭！',  subtitle: '100 天连续学习！你已经超越了 99% 的人鸭！',  confetti: true,  glow: true },
  { days: 365, mascot: 'savy-love.svg',        title: '💎 年度王者鸭！',  subtitle: '整整一年！你就是传说鸭！',                    confetti: true,  glow: true },
];

/** 在 app 初始化时检测断签/里程碑，延迟弹出弹窗 */
function checkStreakEvents() {
  if (appState.previousStreak > 1 && !appState.streakBrokenShown) {
    setTimeout(() => {
      SoundManager.playStreakBreak();
      showStreakBrokenModal(appState.previousStreak);
      appState.streakBrokenShown = true;
      saveState(appState);
    }, 600);
    return;
  }

  if (!appState.milestoneShown) appState.milestoneShown = [];
  const milestone = STREAK_MILESTONES.find(
    m => appState.streak >= m.days && !appState.milestoneShown.includes(m.days)
  );
  if (milestone) {
    setTimeout(() => {
      SoundManager.playMilestone();
      showStreakMilestoneModal(milestone);
      appState.milestoneShown.push(milestone.days);
      saveState(appState);
    }, 600);
  }
}

/** 断签弹窗 */
function showStreakBrokenModal(previousDays) {
  const overlay = document.createElement('div');
  overlay.className = 'streak-modal-overlay';
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  overlay.innerHTML = `
    <div class="streak-modal streak-broken">
      <div class="streak-modal-mascot">
        <img src="assets/kawaii/savy-pleading.svg" alt="savy pleading">
      </div>
      <h3 class="streak-modal-title">哎鸭，连续记录断了…</h3>
      <p class="streak-modal-subtitle">你之前已经连续学习了 <strong>${previousDays} 天</strong>！</p>
      <p class="streak-modal-desc">没关系鸭，重新开始也很棒！今天学一课就能重新冲鸭！🔥</p>
      <div class="streak-modal-counter">
        <span class="streak-fire-icon">🔥</span>
        <span class="streak-counter-num">1</span>
      </div>
      <button class="streak-modal-btn" onclick="this.closest('.streak-modal-overlay').remove()">重新冲鸭！💪</button>
    </div>`;
  document.body.appendChild(overlay);
}

/** 里程碑庆祝弹窗 */
function showStreakMilestoneModal(milestone) {
  const overlay = document.createElement('div');
  overlay.className = 'streak-modal-overlay';
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  overlay.innerHTML = `
    <div class="streak-modal streak-milestone${milestone.glow ? ' streak-glow' : ''}">
      <div class="streak-modal-mascot">
        <img src="assets/kawaii/${milestone.mascot}" alt="savy milestone">
      </div>
      <h3 class="streak-modal-title">${milestone.title}</h3>
      <p class="streak-modal-subtitle">${milestone.subtitle}</p>
      <div class="streak-modal-counter">
        <span class="streak-fire-icon">🔥</span>
        <span class="streak-counter-num">${milestone.days}</span>
      </div>
      <button class="streak-modal-btn" onclick="this.closest('.streak-modal-overlay').remove()">继续学习！</button>
    </div>`;
  document.body.appendChild(overlay);
  if (milestone.confetti) showConfetti();
}

/** 顶栏 streak 点击弹窗（展示当前连续天数） */
function showStreakModal() {
  const currentMilestone = [...STREAK_MILESTONES].reverse().find(m => appState.streak >= m.days);
  const nextMilestone = STREAK_MILESTONES.find(m => appState.streak < m.days);
  const mascot = currentMilestone ? currentMilestone.mascot : 'savy-happy.svg';
  const progressText = nextMilestone
    ? `距离下一个里程碑（${nextMilestone.days} 天）还差 ${nextMilestone.days - appState.streak} 天`
    : '你已经达成了所有里程碑！🎉';

  const overlay = document.createElement('div');
  overlay.className = 'streak-modal-overlay';
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  overlay.innerHTML = `
    <div class="streak-modal streak-info">
      <button class="modal-close-btn" onclick="this.closest('.streak-modal-overlay').remove()">&times;</button>
      <div class="streak-modal-mascot">
        <img src="assets/kawaii/${mascot}" alt="savy streak">
      </div>
      <h3 class="streak-modal-title">🔥 连续学习</h3>
      <div class="streak-modal-counter streak-counter-large">
        <span class="streak-fire-icon">🔥</span>
        <span class="streak-counter-num">${appState.streak}</span>
        <span class="streak-counter-label">天</span>
      </div>
      <p class="streak-modal-subtitle">${progressText}</p>
      <button class="streak-modal-btn" onclick="this.closest('.streak-modal-overlay').remove()">知道了</button>
    </div>`;
  document.body.appendChild(overlay);
}


/* ============ 音效系统 (Web Audio API) ============ */
const SoundManager = {
  enabled: true,
  audioContext: null,

  init() {
    if (this.audioContext) return;
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      this.enabled = false;
    }
  },

  _playNote(freq, duration, type, startTime, gainValue) {
    if (!this.enabled || !this.audioContext) return;
    const ctx = this.audioContext;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(gainValue || 0.3, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);
  },

  playCorrect() {
    this.init();
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    this._playNote(523, 0.15, 'sine', now, 0.25);
    this._playNote(659, 0.2, 'sine', now + 0.12, 0.25);
  },

  playIncorrect() {
    this.init();
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    this._playNote(330, 0.15, 'sine', now, 0.2);
    this._playNote(262, 0.25, 'sine', now + 0.12, 0.2);
  },

  playComplete() {
    this.init();
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    this._playNote(523, 0.2, 'sine', now, 0.25);
    this._playNote(659, 0.2, 'sine', now + 0.18, 0.25);
    this._playNote(784, 0.35, 'sine', now + 0.36, 0.3);
  },

  playBadge() {
    this.init();
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    for (let i = 0; i < 4; i++) {
      this._playNote(1319, 0.08, 'triangle', now + i * 0.1, 0.15);
    }
    this._playNote(1568, 0.3, 'triangle', now + 0.4, 0.2);
  },

  playLevelUp() {
    this.init();
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    this._playNote(262, 0.2, 'square', now, 0.15);
    this._playNote(330, 0.2, 'square', now + 0.2, 0.15);
    this._playNote(392, 0.2, 'square', now + 0.4, 0.15);
    this._playNote(523, 0.4, 'square', now + 0.6, 0.2);
  },

  playMilestone() {
    this.init();
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    this._playNote(392, 0.2, 'sine', now, 0.25);
    this._playNote(494, 0.2, 'sine', now + 0.2, 0.25);
    this._playNote(587, 0.3, 'sine', now + 0.4, 0.25);
    this._playNote(1319, 0.4, 'triangle', now + 0.7, 0.15);
  },

  playStreakBreak() {
    this.init();
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    this._playNote(392, 0.25, 'sine', now, 0.2);
    this._playNote(294, 0.35, 'sine', now + 0.2, 0.15);
  }
};

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
  checkStreakEvents();
});

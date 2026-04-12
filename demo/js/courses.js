/**
 * 钉钉 AI 表格学习产品 — 课程数据
 * L1 入门篇 8 课 + L2-L5 级别引用
 */

var COURSES = {
  levels: [
    {
      id: 'L1',
      title: 'L1 · 初识 AI 表格',
      subtitle: '入门篇',
      color: '#58CC02',
      icon: 'sprout',
      unlocked: true,
      lessons: [
        {
          id: 'L1-1',
          title: 'AI 表格是什么？',
          icon: 'play-circle',
          xpReward: 10,
          cards: [
            {
              type: 'knowledge',
              title: '告别 Excel，拥抱 AI 表格',
              content: '钉钉 AI 表格是一款<strong>在线可视化数据库</strong>，不是传统电子表格。\n\n和 Excel 相比，AI 表格具有<strong>多人实时协作</strong>和<strong>丰富的字段类型</strong>两大核心优势。',
              highlight: 'Excel 是电子表格，AI 表格是在线数据库'
            },
            {
              type: 'knowledge',
              title: 'AI 表格 vs Excel',
              content: '让我们来看看两者的核心差异：',
              comparison: [
                { feature: '协作方式', excel: '单人编辑，文件传来传去', ai: '多人实时协作' },
                { feature: '数据类型', excel: '纯文本和数字', ai: '34种丰富字段类型' },
                { feature: '数据关联', excel: '手写 VLOOKUP 公式', ai: '可视化关联，点击即用' },
                { feature: '展示方式', excel: '只有表格', ai: '表格/看板/日历/甘特图' },
                { feature: 'AI 能力', excel: '无', ai: '100+ AI 智能场景' }
              ]
            }
          ],
          questions: [
            {
              type: 'single',
              question: '钉钉 AI 表格的本质是什么？',
              options: ['在线可视化数据库', '升级版 Excel', '文档编辑器', '项目管理工具'],
              correctIndex: 0,
              explanation: 'AI 表格本质上是一个在线可视化数据库，而非传统电子表格。'
            },
            {
              type: 'single',
              question: '以下哪项是 AI 表格相比 Excel 的核心优势？',
              options: ['文件体积更小', '支持宏编程', '可视化数据关联', '离线编辑更方便'],
              correctIndex: 2,
              explanation: 'AI 表格支持可视化数据关联，无需像 Excel 那样手写 VLOOKUP 公式。'
            },
            {
              type: 'match',
              question: '将以下特性与对应产品匹配：',
              pairs: [
                { left: '单人编辑，文件传来传去', right: 'Excel' },
                { left: '多人实时协作', right: 'AI 表格' },
                { left: '100+ AI 智能场景', right: 'AI 表格' },
                { left: '手写 VLOOKUP 公式', right: 'Excel' }
              ]
            },
            {
              type: 'truefalse',
              question: 'AI 表格支持多人同时在线编辑同一张表格。',
              correct: true,
              explanation: '没错！和 Excel 不同，AI 表格天然支持多人实时协作。'
            }
          ]
        },
        {
          id: 'L1-2',
          title: '认识操作界面',
          icon: 'map',
          xpReward: 10,
          cards: [
            {
              type: 'knowledge',
              title: '五大核心区域',
              content: 'AI 表格界面由<strong>5 个核心区域</strong>组成：\n\n<strong>(1) 顶部导航栏</strong> — 表格名称、分享、设置\n<strong>(2) 左侧边栏</strong> — 数据表列表、视图切换\n<strong>(3) 工具栏</strong> — 筛选、排序、分组等操作\n<strong>(4) 字段标题行</strong> — 每列的"字段名"和类型\n<strong>(5) 数据区域</strong> — 每行是一条"记录"',
              highlight: '记住：列是字段，行是记录'
            }
          ],
          questions: [
            {
              type: 'single',
              question: '在 AI 表格中，每一行数据被称为什么？',
              options: ['字段', '记录', '视图', '数据表'],
              correctIndex: 1,
              explanation: '在 AI 表格中，每一行数据被称为"记录"。'
            },
            {
              type: 'single',
              question: '字段标题行位于界面的哪个位置？',
              options: ['顶部导航栏', '左侧边栏', '数据区域上方', '底部状态栏'],
              correctIndex: 2,
              explanation: 'AI 表格的字段标题行位于数据区域上方，显示每列的字段名和类型。'
            },
            {
              type: 'match',
              question: '将界面区域与其功能匹配：',
              pairs: [
                { left: '左侧边栏', right: '数据表列表和视图切换' },
                { left: '工具栏', right: '筛选、排序、分组' },
                { left: '字段标题行', right: '列名和字段类型' },
                { left: '数据区域', right: '每行一条记录' }
              ]
            },
            {
              type: 'truefalse',
              question: '在 AI 表格中，"字段"和"记录"分别对应"行"和"列"。',
              correct: false,
              explanation: '正好相反！在 AI 表格中，"字段"对应"列"，"记录"对应"行"。'
            }
          ]
        },
        {
          id: 'L1-3',
          title: '创建第一张表',
          icon: 'layers',
          xpReward: 10,
          cards: [
            {
              type: 'knowledge',
              title: '多种创建方式',
              content: '创建 AI 表格有多种方式：\n\n\u2022 <strong>空白创建</strong> — 从零开始搭建\n\u2022 <strong>导入 Excel / CSV</strong> — 快速迁移已有数据\n\u2022 <strong>模板创建</strong> — 使用官方模板快速开始\n\u2022 <strong>AI 创建</strong> — 用自然语言描述需求自动生成\n\u2022 <strong>从钉钉文档创建</strong> — 直接在文档中插入',
              highlight: '推荐新手从模板开始体验'
            },
            {
              type: 'knowledge',
              title: '数据表管理',
              content: '一个 AI 表格可以包含<strong>多个数据表</strong>，类似 Excel 的 Sheet。\n\n每个数据表是独立的数据集合，可以相互关联。\n\n<strong>注意：数据表之间可以建立关联关系。</strong>',
              highlight: '一个表格可以有多个数据表'
            }
          ],
          questions: [
            {
              type: 'single',
              question: '以下哪种方式不能创建 AI 表格？',
              options: ['空白创建', '导入 Excel', '使用模板', '从 Word 文档直接转换'],
              correctIndex: 3,
              explanation: 'AI 表格支持空白创建、导入 Excel/CSV、模板创建等，但不支持从 Word 文档直接转换。'
            },
            {
              type: 'order',
              question: '请按正确顺序排列创建表格的步骤：',
              items: ['打开钉钉 AI 表格', '选择"新建表格"', '选择创建方式', '开始编辑数据'],
              correctOrder: [0, 1, 2, 3]
            },
            {
              type: 'truefalse',
              question: '一个 AI 表格只能包含一个数据表。',
              correct: false,
              explanation: '一个 AI 表格可以包含多个数据表，类似 Excel 的多个 Sheet。'
            },
            {
              type: 'single',
              question: 'AI 表格的数据表之间可以建立什么关系？',
              options: ['只能独立存在', '只能合并', '可以建立关联关系', '无法同时存在'],
              correctIndex: 2,
              explanation: 'AI 表格的数据表之间可以通过关联字段建立关联关系。'
            }
          ]
        },
        {
          id: 'L1-4',
          title: '把 Excel 搬进来',
          icon: 'upload',
          xpReward: 10,
          cards: [
            {
              type: 'knowledge',
              title: '导入 Excel 到 AI 表格',
              content: 'AI 表格支持一键导入 Excel 文件！\n\n直接将 AI 表格当作 Excel 的升级版来使用。\n\n<strong>导入注意事项：</strong>\n\u2022 Excel 中的合并单元格会被自动拆分\n\u2022 复杂公式可能需要手动调整\n\u2022 Excel 中的图表不会被导入\n\u2022 支持 .xlsx 和 .xls 格式',
              highlight: '导入后建议检查数据格式'
            }
          ],
          questions: [
            {
              type: 'single',
              question: '导入 Excel 时，合并单元格会怎样处理？',
              options: ['保持合并状态', '自动拆分', '直接删除', '转为图片'],
              correctIndex: 1,
              explanation: 'Excel 中的合并单元格导入 AI 表格后会被自动拆分。'
            },
            {
              type: 'truefalse',
              question: '导入 Excel 后，原有的图表也会一起导入。',
              correct: false,
              explanation: '导入 Excel 时，图表不会被导入，只有数据会被导入到 AI 表格中。'
            },
            {
              type: 'single',
              question: 'AI 表格支持导入以下哪种格式的文件？',
              options: ['.doc', '.ppt', '.xlsx', '.pdf'],
              correctIndex: 2,
              explanation: 'AI 表格支持导入 .xlsx 和 .xls 格式的 Excel 文件。'
            }
          ]
        },
        {
          id: 'L1-5',
          title: '添加第一条数据',
          icon: 'file-text',
          xpReward: 10,
          cards: [
            {
              type: 'knowledge',
              title: '记录 = 一行数据',
              content: '在 AI 表格中，每一行就是一条<strong>记录</strong>。\n\n<strong>添加记录的方式：</strong>\n\u2022 点击底部<strong>+</strong> 按钮添加新行\n\u2022 在"记录详情页"中填写\n\u2022 通过表单收集数据\n\n<strong>记录详情页：</strong>点击行首展开，可以看到该记录的所有字段信息。',
              highlight: '每条记录都有独立的详情页'
            }
          ],
          questions: [
            {
              type: 'single',
              question: '在 AI 表格中，"记录"指的是什么？',
              options: ['一列数据', '一行数据', '一个单元格', '一个数据表'],
              correctIndex: 1,
              explanation: '在 AI 表格中，每一行数据就是一条记录。'
            },
            {
              type: 'single',
              question: '以下哪种方式不能添加新记录？',
              options: ['点击 + 按钮', '通过表单收集', '拖拽文件到表格', '在记录详情页填写'],
              correctIndex: 2,
              explanation: '添加记录可以通过点击 + 按钮、表单收集或记录详情页填写。'
            },
            {
              type: 'truefalse',
              question: '每条记录都有独立的详情页，可以查看所有字段信息。',
              correct: true,
              explanation: '点击行首即可展开记录详情页，查看该记录的所有字段信息。'
            }
          ]
        },
        {
          id: 'L1-6',
          title: '认识字段类型',
          icon: 'database',
          xpReward: 10,
          cards: [
            {
              type: 'knowledge',
              title: '丰富的字段类型',
              content: 'AI 表格提供<strong>34 种基础字段类型</strong>：\n\n<strong>常用字段：</strong>\n\u2022 文本 — 输入任意文字\n\u2022 数字 — 数值和计算\n\u2022 单选 — 从预设选项中选一个\n\u2022 多选 — 可选多个选项\n\u2022 日期 — 日期和时间\n\u2022 人员 — 关联组织成员\n\u2022 附件 — 上传文件和图片\n\u2022 公式 — 自动计算结果',
              highlight: '字段类型决定了这一列能存什么数据'
            },
            {
              type: 'knowledge',
              title: 'AI 字段 — 智能新体验',
              content: 'AI 表格独有的<strong>100+ AI 智能场景</strong>：\n\n\u2022 AI 自动分类标签\n\u2022 AI 智能摘要提取\n\u2022 AI 情感分析\n\u2022 AI 翻译\n\u2022 AI 审查合同\n\nAI 字段让数据处理变得前所未有的简单！',
              highlight: '一个字段就能调用 AI 能力'
            }
          ],
          questions: [
            {
              type: 'single',
              question: 'AI 表格提供多少种基础字段类型？',
              options: ['10 种', '20 种', '34 种', '50 种'],
              correctIndex: 2,
              explanation: 'AI 表格提供 34 种基础字段类型，覆盖各种数据场景。'
            },
            {
              type: 'match',
              question: '将字段类型与其用途匹配：',
              pairs: [
                { left: '单选字段', right: '从预设选项中选一个' },
                { left: '人员字段', right: '关联组织成员' },
                { left: '公式字段', right: '自动计算结果' },
                { left: '附件字段', right: '上传文件和图片' }
              ]
            },
            {
              type: 'truefalse',
              question: 'AI 字段可以自动对数据进行分类和摘要提取。',
              correct: true,
              explanation: 'AI 字段支持自动分类、摘要提取、情感分析等 AI 智能场景。'
            },
            {
              type: 'single',
              question: '"主字段"有什么特殊之处？',
              options: ['可以随意删除', '可以隐藏', '不可删除和隐藏', '只能是数字类型'],
              correctIndex: 2,
              explanation: '主字段是首列，不可删除和隐藏，是每条记录的标识。'
            }
          ]
        },
        {
          id: 'L1-7',
          title: '换个方式看数据',
          icon: 'share-2',
          xpReward: 10,
          cards: [
            {
              type: 'knowledge',
              title: '多视图 — AI 表格的超能力',
              content: '<strong>同一份数据，多种展示方式：</strong>\n\n\u2022 <strong>表格视图</strong> — 经典行列展示\n\u2022 <strong>看板视图</strong> — 按状态分组的卡片墙\n\u2022 <strong>日历视图</strong> — 按日期展示的日历\n\u2022 <strong>甘特图</strong> — 项目时间线管理\n\u2022 <strong>画册视图</strong> — 图片为主的卡片展示\n\n切换视图不会改变底层数据！',
              highlight: '"视图"只是数据的不同展示方式'
            }
          ],
          questions: [
            {
              type: 'single',
              question: '切换视图后，底层数据会发生变化吗？',
              options: ['会改变', '不会改变', '部分改变', '需要手动同步'],
              correctIndex: 1,
              explanation: '视图只是数据的展示方式，切换视图不会改变底层数据。'
            },
            {
              type: 'match',
              question: '将视图类型与其适用场景匹配：',
              pairs: [
                { left: '看板视图', right: '按状态分组管理任务' },
                { left: '日历视图', right: '按日期查看日程安排' },
                { left: '甘特图', right: '项目时间线管理' },
                { left: '画册视图', right: '图片为主的展示' }
              ]
            },
            {
              type: 'truefalse',
              question: '每个数据表只能有一个视图。',
              correct: false,
              explanation: '每个数据表可以创建多个视图，从不同角度展示同一份数据。'
            },
            {
              type: 'single',
              question: '哪种视图最适合管理项目进度？',
              options: ['表格视图', '画册视图', '甘特图', '日历视图'],
              correctIndex: 2,
              explanation: '甘特图以时间线形式展示任务，最适合管理项目进度。'
            }
          ]
        },
        {
          id: 'L1-8',
          title: 'L1 毕业挑战',
          icon: 'award',
          xpReward: 50,
          isChallenge: true,
          cards: [
            {
              type: 'knowledge',
              title: '恭喜来到 L1 毕业挑战！',
              content: '你已经学完了 AI 表格入门篇的所有知识！\n\n接下来是 <strong>6 道综合题</strong>，全部答对可获得 7 颗星！\n\n完成挑战可获得 <strong>50 XP</strong> 经验值奖励！',
              highlight: '加油，你一定可以的！'
            }
          ],
          questions: [
            {
              type: 'single',
              question: '将 Excel 文件导入 AI 表格时，以下哪项描述是正确的？',
              options: ['图表会一起导入', '导入后 Excel 原文件会被删除', '合并单元格会被自动拆分', '只支持最新版 Excel'],
              correctIndex: 2,
              explanation: 'AI 表格导入 .xlsx/.xls 格式的 Excel 文件时，合并单元格会被自动拆分。'
            },
            {
              type: 'single',
              question: '在 AI 表格中，"字段"和"记录"分别对应什么？',
              options: ['行和列', '列和行', '表和行', '视图和表'],
              correctIndex: 1,
              explanation: '字段 = 列（规定数据类型），记录 = 行（一条数据）。'
            },
            {
              type: 'single',
              question: '以下哪种视图适合展示图片为主的内容？',
              options: ['表格视图', '看板视图', '画册视图', '甘特图'],
              correctIndex: 2,
              explanation: '画册视图以图片为主的卡片形式展示数据，适合图片内容。'
            },
            {
              type: 'truefalse',
              question: 'AI 表格的主字段可以被删除或隐藏。',
              correct: false,
              explanation: '主字段是首列，不可删除和隐藏，是每条记录的唯一标识。'
            },
            {
              type: 'single',
              question: '以下哪项不是 AI 表格相比 Excel 的优势？',
              options: ['多人实时协作', '丰富的字段类型', 'AI 智能场景', '支持 VBA 宏编程'],
              correctIndex: 3,
              explanation: 'VBA 是 Excel 的特有功能，AI 表格不支持 VBA，但提供了更强大的 AI 能力。'
            },
            {
              type: 'match',
              question: '将以下概念与其含义匹配：',
              pairs: [
                { left: '字段', right: '列，规定数据类型' },
                { left: '记录', right: '行，一条数据' },
                { left: '视图', right: '数据的展示方式' },
                { left: '数据表', right: '独立的数据集合' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'L2',
      title: 'L2 · 数据操作大师',
      subtitle: '基础篇',
      color: '#1CB0F6',
      icon: 'type',
      unlocked: false,
      lessons: L2_LESSONS
    },
    {
      id: 'L3',
      title: 'L3 · AI 智能助手',
      subtitle: '进阶篇',
      color: '#FF9600',
      icon: 'palette',
      unlocked: false,
      lessons: l3Nodes
    },
    {
      id: 'L4',
      title: 'L4 · 自动化专家',
      subtitle: '高级篇',
      color: '#FF4B4B',
      icon: 'settings',
      unlocked: false,
      lessons: l4Nodes
    },
    {
      id: 'L5',
      title: 'L5 · 应用搭建师',
      subtitle: '专家篇',
      color: '#A560E8',
      icon: 'building',
      unlocked: false,
      lessons: l5Nodes
    }
  ]
};

const BADGES = [
  { id: 'first_lesson', name: '初学者', icon: 'rocket', description: '完成第一课', condition: (state) => state.completedLessons.length >= 1 },
  { id: 'l1_complete', name: 'L1 毕业生', icon: 'flag', description: '完成 L1 全部课程', condition: (state) => { const l1Lessons = COURSES.levels[0].lessons.map(l => l.id); return l1Lessons.every(id => state.completedLessons.includes(id)); }},
  { id: 'l2_complete', name: 'L2 毕业生', icon: 'flag', description: '完成 L2 全部课程', condition: (state) => { const l2Lessons = COURSES.levels[1].lessons.map(l => l.id); return l2Lessons.every(id => state.completedLessons.includes(id)); }},
  { id: 'lesson_10', name: '十课达人', icon: 'star', description: '累计完成 10 课', condition: (state) => state.completedLessons.length >= 10 },
  { id: 'lesson_20', name: '学霸之路', icon: 'star', description: '累计完成 20 课', condition: (state) => state.completedLessons.length >= 20 },
  { id: 'l3_complete', name: 'L3 毕业生', icon: 'flag', description: '完成 L3 全部课程', condition: (state) => { const l3Lessons = COURSES.levels[2].lessons.map(l => l.id); return l3Lessons.every(id => state.completedLessons.includes(id)); }},
  { id: 'xp_1000', name: '千分学霸', icon: 'gem', description: '累计获得 1000 XP', condition: (state) => state.totalXP >= 1000 },
  { id: 'l4_complete', name: 'L4 毕业生', icon: 'flag', description: '完成 L4 全部课程', condition: (state) => { const l4Lessons = COURSES.levels[3].lessons.map(l => l.id); return l4Lessons.every(id => state.completedLessons.includes(id)); }},
  { id: 'lesson_30', name: '三十课大师', icon: 'crown', description: '累计完成 30 课', condition: (state) => state.completedLessons.length >= 30 },
  { id: 'l5_complete', name: 'L5 毕业生', icon: 'flag', description: '完成 L5 全部课程', condition: (state) => { const l5Lessons = COURSES.levels[4].lessons.map(l => l.id); return l5Lessons.every(id => state.completedLessons.includes(id)); }},
  { id: 'all_complete', name: '全课程大师', icon: 'trophy', description: '完成 L1-L5 全部课程', condition: (state) => { const allLessons = COURSES.levels.flatMap(level => level.lessons.map(l => l.id)); return allLessons.every(id => state.completedLessons.includes(id)); }},
  { id: 'xp_2000', name: '学神降临', icon: 'gem', description: '累计获得 2000 XP', condition: (state) => state.totalXP >= 2000 },
  { id: 'perfect_score', name: '完美答题', icon: 'target', description: '任意一课全部答对', condition: (state) => state.perfectLessons && state.perfectLessons.length > 0 },
  { id: 'streak_3', name: '三日连续', icon: 'flame', description: '连续学习 3 天', condition: (state) => state.streak >= 3 },
  { id: 'streak_7', name: '一周达人', icon: 'zap', description: '连续学习 7 天', condition: (state) => state.streak >= 7 },
  { id: 'xp_100', name: '百分新秀', icon: 'star', description: '累计获得 100 XP', condition: (state) => state.totalXP >= 100 },
  { id: 'xp_500', name: '五百强者', icon: 'star', description: '累计获得 500 XP', condition: (state) => state.totalXP >= 500 },
  { id: 'speed_demon', name: '闪电通关', icon: 'timer', description: '60秒内完成一课', condition: (state) => state.speedComplete }
];

const RANKS = [
  { name: '青铜学员', icon: 'shield', minXP: 0, color: '#CD7F32' },
  { name: '白银学员', icon: 'shield', minXP: 100, color: '#C0C0C0' },
  { name: '黄金学员', icon: 'shield', minXP: 300, color: '#FFD700' },
  { name: '铂金学员', icon: 'shield', minXP: 600, color: '#E5E4E2' },
  { name: '钻石学员', icon: 'shield', minXP: 1000, color: '#B9F2FF' },
  { name: '大师学员', icon: 'shield', minXP: 2000, color: '#A560E8' }
];

const FAKE_LEADERBOARD = [
  { name: '小明', xp: 320, avatar: 'user' },
  { name: '小红', xp: 280, avatar: 'user' },
  { name: '张三', xp: 245, avatar: 'user' },
  { name: '李四', xp: 210, avatar: 'user' },
  { name: '王五', xp: 190, avatar: 'user' },
  { name: '赵六', xp: 175, avatar: 'user' },
  { name: '孙七', xp: 150, avatar: 'user' },
  { name: '周八', xp: 130, avatar: 'user' },
  { name: '吴九', xp: 110, avatar: 'user' },
  { name: '郑十', xp: 95, avatar: 'user' }
];

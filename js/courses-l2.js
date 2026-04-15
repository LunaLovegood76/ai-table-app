/**
 * 钉钉 AI 表格学习产品 — L2 基础篇
 * L2 基础篇 15 课 + 毕业挑战
 */

var L2_LESSONS = [
  /* ========== L2-1 文本与数字字段 ========== */
  {
    id: 'L2-1',
    title: '文本与数字字段',
    icon: 'type',
    xpReward: 15,
    cards: [
      {
        type: 'knowledge',
        title: '文本字段 — 最基础的字段',
        content: '<strong>文本字段</strong>是 AI 表格中最常用的字段类型。\n\n<strong>换行技巧：</strong>按 <code>Shift + Enter</code> 可以在单元格内换行。\n\n<strong>展开编辑：</strong>点击单元格右侧的展开按钮，可以在更大的编辑区域中编辑长文本。',
        highlight: '换行快捷键：Shift + Enter'
      },
      {
        type: 'knowledge',
        title: '数字字段 — 支持表达式',
        content: '<strong>数字字段的特殊能力：</strong>\n\n数字字段不仅能存储数字，还支持简单的数学表达式：\n\u2022 <strong>整数和小数</strong>：如 1,000,000\n\u2022 <strong>负数</strong>：如 -100\n\u2022 <strong>表达式计算</strong>：输入 11*3 自动计算结果\n\u2022 <strong>百分比格式</strong>：可设置为百分比显示',
        highlight: '输入 392/4 会自动计算为 98'
      },
      {
        type: 'knowledge',
        title: '货币字段 — 专业的金额展示',
        content: '<strong>货币字段</strong>可以展示为 ¥1,240.88、$99.00 等专业格式。\n\n支持 <strong>25+ 种货币符号</strong>，包括人民币(¥)、美元($)、欧元(\u20ac)、英镑(\u00a3)、日元(J\u00a5)等。\n\n货币字段本质上是数字字段的一种特殊显示格式。',
        highlight: '货币字段支持"千分位"自动格式化'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '在文本字段中如何换行？',
        options: ['直接按 Enter', 'Shift + Enter', 'Ctrl + Enter', 'Alt + Enter'],
        correctIndex: 1,
        explanation: '在 AI 表格的文本字段中，按 Shift + Enter 可以换行，直接按 Enter 会确认输入。'
      },
      {
        type: 'truefalse',
        question: '在数字字段中输入 392/4，会自动计算为 98。',
        correct: true,
        explanation: '数字字段支持简单的数学表达式，输入除法表达式会自动计算结果。'
      },
      {
        type: 'single',
        question: '关于货币字段，以下哪项描述是正确的？',
        options: ['只支持人民币', '只能显示整数，不支持小数', '支持 25+ 种货币符号', '不支持千分位格式'],
        correctIndex: 2,
        explanation: '货币字段支持25+种货币符号，如"¥1,240.88"自动带千分位。'
      },
      {
        type: 'match',
        question: '将字段类型与其特点匹配：',
        pairs: [
          { left: '文本字段', right: '支持换行和展开编辑' },
          { left: '数字字段', right: '支持表达式自动计算' },
          { left: '货币字段', right: '专业金额格式 ¥1,240.88' }
        ]
      }
    ]
  },

  /* ========== L2-2 日期与人员字段 ========== */
  {
    id: 'L2-2',
    title: '日期与人员字段',
    icon: 'calendar',
    xpReward: 15,
    cards: [
      {
        type: 'knowledge',
        title: '日期字段 — 时间管理利器',
        content: '<strong>日期字段支持多种格式：</strong>\n\n<strong>日期格式：</strong>年/月/日、月/日/年等多种国际格式\n\n<strong>到期提醒：</strong>可以设置到期提醒，在截止日期前自动通知\n\u2022 支持精确到分钟的时间设置\n\u2022 可设置为 5月10日、3月01日等格式\n\u2022 支持 9:00 这样的时间格式',
        highlight: '到期提醒功能让你不再错过 deadline'
      },
      {
        type: 'knowledge',
        title: '人员字段 — 关联团队成员',
        content: '<strong>人员字段</strong>可以关联钉钉组织内的成员。\n\n<strong>两种模式：</strong>\n\u2022 <strong>单人模式</strong> — 只能选择一个人（如：负责人）\n\u2022 <strong>多人模式</strong> — 可选择多个人（如：参与者）\n\n<strong>扩展信息：</strong>人员字段可以自动显示成员的部门、职位等信息。',
        highlight: '人员字段直接关联钉钉通讯录'
      },
      {
        type: 'knowledge',
        title: '系统字段 — 自动记录',
        content: '<strong>系统字段</strong>由系统自动填写，无需手动输入：\n\n\u2022 <strong>创建人</strong> — 自动记录谁创建了这条记录\n\u2022 <strong>创建时间</strong> — 自动记录创建的时间\n\u2022 <strong>更新人</strong> — 自动记录最后修改者\n\u2022 <strong>最后更新时间</strong> — 自动记录最后修改时间',
        highlight: '系统字段自动追踪数据变更'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '日期字段的"到期提醒"功能有什么作用？',
        options: ['自动删除过期数据', '在截止日期前自动通知', '自动延长截止日期', '自动标记为已完成'],
        correctIndex: 1,
        explanation: '到期提醒功能会在截止日期前自动发送通知，帮助你不错过重要时间节点。'
      },
      {
        type: 'truefalse',
        question: '人员字段只能选择一个人，不支持多人选择。',
        correct: false,
        explanation: '人员字段支持单人和多人两种模式，多人模式可以选择多个成员。'
      },
      {
        type: 'match',
        question: '将系统字段与其功能匹配：',
        pairs: [
          { left: '创建人', right: '自动记录谁创建了记录' },
          { left: '创建时间', right: '自动记录创建的时间' },
          { left: '更新人', right: '自动记录最后修改者' },
          { left: '最后更新时间', right: '自动记录最后修改时间' }
        ]
      },
      {
        type: 'single',
        question: '以下哪种字段需要手动填写？',
        options: ['创建人', '创建时间', '人员字段', '最后更新时间'],
        correctIndex: 2,
        explanation: '创建人、创建时间、最后更新时间都是系统自动填写的，只有人员字段需要手动选择。'
      }
    ]
  },

  /* ========== L2-3 选择类字段 ========== */
  {
    id: 'L2-3',
    title: '选择类字段',
    icon: 'list-checks',
    xpReward: 15,
    cards: [
      {
        type: 'knowledge',
        title: '单选 vs 多选',
        content: '<strong>单选字段：</strong>从预设选项中只能选择一个（如：任务状态）\n\n<strong>多选字段：</strong>可以同时选择多个选项（如：技能标签）\n\n<strong>选项管理：</strong>\n\u2022 支持自定义选项颜色\n\u2022 支持批量编辑选项\n\u2022 支持跨表同步选项',
        highlight: '单选适合"状态"，多选适合"标签"'
      },
      {
        type: 'knowledge',
        title: '选项的高级功能',
        content: '<strong>颜色标记：</strong>每个选项可以设置不同的颜色，让数据一目了然。\n\n<strong>批量编辑：</strong>可以一次性添加、修改或删除多个选项。\n\n<strong>跨表同步：</strong>单选/多选字段的选项可以同步到其他数据表，保持选项一致性。',
        highlight: '跨表同步让多个表的选项保持一致'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '以下哪种场景最适合使用"多选字段"？',
        options: ['任务状态（待办/进行中/已完成）', '项目优先级（高/中/低）', '员工技能标签', '性别（男/女）'],
        correctIndex: 2,
        explanation: '员工可能有多个技能标签，适合用多选字段。状态、优先级、性别通常只有一个值，适合单选。'
      },
      {
        type: 'truefalse',
        question: '单选字段的选项可以设置不同的颜色。',
        correct: true,
        explanation: '单选和多选字段都支持为每个选项设置不同的颜色，让数据更直观。'
      },
      {
        type: 'single',
        question: '选择类字段的"跨表同步"功能是什么意思？',
        options: ['自动复制数据到其他表', '选项列表可以同步到其他数据表', '自动合并多个表的数据', '自动备份选项设置'],
        correctIndex: 1,
        explanation: '跨表同步是指单选/多选字段的选项列表可以同步到其他数据表，保持选项一致性。'
      },
      {
        type: 'match',
        question: '将场景与适合的字段类型匹配：',
        pairs: [
          { left: '任务状态', right: '单选字段' },
          { left: '项目标签', right: '多选字段' },
          { left: '负责人', right: '人员字段' }
        ]
      }
    ]
  },

  /* ========== L2-4 附件与图片字段 ========== */
  {
    id: 'L2-4',
    title: '附件与图片字段',
    icon: 'image',
    xpReward: 15,
    cards: [
      {
        type: 'knowledge',
        title: '附件字段 — 文件管理中心',
        content: '<strong>附件字段</strong>可以上传各种文件到记录中。\n\n<strong>上传方式：</strong>拖拽上传、点击上传、粘贴上传\n\n<strong>预览功能：</strong>支持在线预览图片、PDF、Office 文档等\n\n<strong>容量限制：</strong>\n\u2022 每个附件字段最多 100 个文件\n\u2022 单个文件最大 3GB\n\u2022 附件可以作为画册视图的封面',
        highlight: '附件字段让每条记录都能携带文件'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '附件字段单个文件的大小上限是多少？',
        options: ['100MB', '500MB', '1GB', '3GB'],
        correctIndex: 3,
        explanation: '附件字段支持上传最大 3GB 的单个文件。'
      },
      {
        type: 'truefalse',
        question: '附件字段的图片可以作为画册视图的封面。',
        correct: true,
        explanation: '画册视图可以使用附件字段中的图片作为卡片封面，非常适合图片管理场景。'
      },
      {
        type: 'single',
        question: '每个附件字段最多可以上传多少个文件？',
        options: ['10个', '50个', '100个', '无限制'],
        correctIndex: 2,
        explanation: '每个附件字段最多可以上传 100 个文件。'
      }
    ]
  },

  /* ========== L2-5 筛选数据 ========== */
  {
    id: 'L2-5',
    title: '筛选数据',
    icon: 'filter',
    xpReward: 15,
    cards: [
      {
        type: 'knowledge',
        title: '筛选 — 快速找到目标数据',
        content: '<strong>筛选功能</strong>可以根据条件快速过滤数据。\n\n<strong>筛选逻辑：</strong>\n\u2022 <strong>AND（且）</strong>— 同时满足所有条件\n\u2022 <strong>OR（或）</strong>— 满足任意一个条件\n\n<strong>条件组：</strong>支持最多 2 层嵌套的条件组，实现复杂筛选逻辑。',
        highlight: '筛选只影响当前视图的显示'
      },
      {
        type: 'knowledge',
        title: '筛选的作用范围',
        content: '<strong>重要：</strong>筛选只影响当前视图的数据显示，不会删除或修改原始数据。\n\n不同视图可以设置不同的筛选条件，互不影响。\n\n筛选条件可以保存在视图中，下次打开自动生效。',
        highlight: '筛选不会删除数据，只是隐藏不符合条件的记录'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '筛选条件组最多支持几层嵌套？',
        options: ['1层', '2层', '3层', '无限制'],
        correctIndex: 1,
        explanation: '筛选条件组最多支持 2 层嵌套，可以实现较复杂的筛选逻辑。'
      },
      {
        type: 'truefalse',
        question: '设置筛选条件后，不符合条件的数据会被永久删除。',
        correct: false,
        explanation: '筛选只是隐藏不符合条件的记录，不会删除任何数据。取消筛选后数据会重新显示。'
      },
      {
        type: 'single',
        question: '如果要找出"状态为进行中"且"负责人是小明"的任务，应该用什么逻辑？',
        options: ['OR（或）', 'AND（且）', 'NOT（非）', 'XOR（异或）'],
        correctIndex: 1,
        explanation: '需要同时满足两个条件，应该使用 AND（且）逻辑。'
      },
      {
        type: 'match',
        question: '将筛选逻辑与其含义匹配：',
        pairs: [
          { left: 'AND（且）', right: '同时满足所有条件' },
          { left: 'OR（或）', right: '满足任意一个条件' }
        ]
      }
    ]
  },

  /* ========== L2-6 排序与分组 ========== */
  {
    id: 'L2-6',
    title: '排序与分组',
    icon: 'arrow-up-down',
    xpReward: 15,
    cards: [
      {
        type: 'knowledge',
        title: '排序 — 让数据井然有序',
        content: '<strong>排序功能</strong>可以按指定字段对数据进行升序或降序排列。\n\n<strong>多条件排序：</strong>支持设置多个排序条件，按优先级逐层排序。\n\n例如：先按"优先级"降序，再按"创建时间"升序。\n\n<strong>注意：</strong>排序仅在当前视图生效，不影响其他视图。',
        highlight: '多条件排序按优先级逐层生效'
      },
      {
        type: 'knowledge',
        title: '分组 — 数据分类展示',
        content: '<strong>分组功能</strong>可以按字段值将数据分类展示。\n\n<strong>分组层数：</strong>最多支持 3 层分组。\n\n例如：第一层按"部门"分组，第二层按"状态"分组。\n\n<strong>注意：</strong>分组仅在当前视图生效。',
        highlight: '分组最多支持 3 层嵌套'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '分组功能最多支持几层？',
        options: ['1层', '2层', '3层', '5层'],
        correctIndex: 2,
        explanation: '分组功能最多支持 3 层嵌套分组。'
      },
      {
        type: 'truefalse',
        question: '排序设置会影响所有视图的数据展示。',
        correct: false,
        explanation: '排序仅在当前视图生效，不影响其他视图的数据展示。'
      },
      {
        type: 'single',
        question: '如果要先按优先级排序，再按时间排序，应该怎么设置？',
        options: ['只设置时间排序', '只设置优先级排序', '设置多条件排序，优先级在前', '无法实现'],
        correctIndex: 2,
        explanation: '使用多条件排序，将优先级设为第一排序条件，时间设为第二排序条件。'
      },
      {
        type: 'match',
        question: '将功能与其特点匹配：',
        pairs: [
          { left: '排序', right: '按字段值升序或降序排列' },
          { left: '分组', right: '按字段值分类展示数据' },
          { left: '筛选', right: '隐藏不符合条件的记录' }
        ]
      }
    ]
  },

  /* ========== L2-7 用颜色标记数据 ========== */
  {
    id: 'L2-7',
    title: '用颜色标记数据',
    icon: 'paintbrush',
    xpReward: 15,
    cards: [
      {
        type: 'knowledge',
        title: '填色 — 让重要数据一目了然',
        content: '<strong>填色功能</strong>可以根据条件自动为记录添加背景色。\n\n<strong>4 种填色方式：</strong>\n\u2022 按单选字段的选项颜色填色\n\u2022 按条件规则自动填色\n\u2022 手动为单条记录填色\n\u2022 按字段值渐变填色\n\n<strong>限制：</strong>最多可设置 20 个填色条件。\n\n<strong>优先级：</strong>当多个条件同时满足时，排在前面的条件优先生效。',
        highlight: '填色让数据状态一目了然'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '填色功能最多可以设置多少个条件？',
        options: ['5个', '10个', '20个', '无限制'],
        correctIndex: 2,
        explanation: '填色功能最多可以设置 20 个条件。'
      },
      {
        type: 'truefalse',
        question: '当多个填色条件同时满足时，所有颜色会叠加显示。',
        correct: false,
        explanation: '当多个条件同时满足时，排在前面的条件优先生效，不会叠加显示。'
      },
      {
        type: 'single',
        question: '以下哪种不是 AI 表格的填色方式？',
        options: ['按单选字段颜色', '按条件规则', '按公式计算', '手动填色'],
        correctIndex: 2,
        explanation: 'AI 表格支持按单选字段颜色、按条件规则、手动填色和按字段值渐变填色，不支持按公式计算填色。'
      }
    ]
  },

  /* ========== L2-8 看板视图实战 ========== */
  {
    id: 'L2-8',
    title: '看板视图实战',
    icon: 'columns-3',
    xpReward: 15,
    cards: [
      {
        type: 'knowledge',
        title: '看板视图 — 任务管理神器',
        content: '<strong>看板视图</strong>将数据按分组展示为卡片墙，非常适合任务管理。\n\n<strong>分组依据：</strong>可以按单选、多选、人员等字段分组。\n\n<strong>拖拽操作：</strong>直接拖拽卡片到不同列，即可改变该记录的字段值。\n\n<strong>卡片配置：</strong>可以自定义卡片上显示哪些字段信息。',
        highlight: '拖拽卡片即可改变任务状态'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '看板视图中，拖拽卡片到另一列会发生什么？',
        options: ['复制一条新记录', '删除原记录', '改变该记录的分组字段值', '什么都不会发生'],
        correctIndex: 2,
        explanation: '拖拽卡片到另一列会自动改变该记录的分组字段值，比如将任务状态从"待办"改为"进行中"。'
      },
      {
        type: 'truefalse',
        question: '看板视图只能按单选字段分组。',
        correct: false,
        explanation: '看板视图可以按单选、多选、人员等多种字段类型进行分组。'
      },
      {
        type: 'single',
        question: '以下哪种场景最适合使用看板视图？',
        options: ['查看项目时间线', '管理任务状态流转', '展示图片集', '查看日程安排'],
        correctIndex: 1,
        explanation: '看板视图最适合管理任务状态流转，通过拖拽卡片即可改变任务状态。'
      }
    ]
  },

  /* ========== L2-9 日历视图实战 ========== */
  {
    id: 'L2-9',
    title: '日历视图实战',
    icon: 'calendar-days',
    xpReward: 15,
    cards: [
      {
        type: 'knowledge',
        title: '日历视图 — 时间维度管理',
        content: '<strong>日历视图</strong>将数据按日期展示在日历上。\n\n<strong>必要条件：</strong>数据表中需要有日期字段。\n\n<strong>开始/结束日期：</strong>可以设置开始日期和结束日期，显示时间跨度。\n\n<strong>时间尺度切换：</strong>支持月视图、周视图、日视图三种尺度。',
        highlight: '日历视图让日程安排一目了然'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '日历视图支持哪些时间尺度？',
        options: ['只有月视图', '月和周', '月、周、日', '月、周、日、年'],
        correctIndex: 2,
        explanation: '日历视图支持月视图、周视图和日视图三种时间尺度切换。'
      },
      {
        type: 'truefalse',
        question: '使用日历视图必须有日期字段。',
        correct: true,
        explanation: '日历视图需要基于日期字段来展示数据，没有日期字段无法使用日历视图。'
      },
      {
        type: 'single',
        question: '如果要在日历上显示任务的时间跨度，需要设置什么？',
        options: ['只设置开始日期', '只设置结束日期', '设置开始日期和结束日期', '设置持续时间'],
        correctIndex: 2,
        explanation: '要显示时间跨度，需要同时设置开始日期和结束日期字段。'
      }
    ]
  },

  /* ========== L2-10 甘特图视图 ========== */
  {
    id: 'L2-10',
    title: '甘特图视图',
    icon: 'gantt-chart',
    xpReward: 15,
    cards: [
      {
        type: 'knowledge',
        title: '甘特图 — 项目管理利器',
        content: '<strong>甘特图</strong>以时间线形式展示任务进度。\n\n<strong>核心要素：</strong>\n\u2022 <strong>开始日期</strong>和<strong>结束日期</strong> — 定义任务时间范围\n\u2022 <strong>里程碑</strong> — 标记关键节点\n\u2022 <strong>颜色</strong> — 按字段值区分不同类型的任务\n\n<strong>交互操作：</strong>可以直接拖拽调整任务的时间范围。',
        highlight: '甘特图是项目经理的最爱'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '甘特图中的"里程碑"是什么？',
        options: ['一种任务类型', '标记关键时间节点', '一种颜色标记', '任务的负责人'],
        correctIndex: 1,
        explanation: '里程碑用于标记项目中的关键时间节点，如"需求评审完成"、"上线日期"等。'
      },
      {
        type: 'truefalse',
        question: '甘特图中可以直接拖拽调整任务的时间范围。',
        correct: true,
        explanation: '甘特图支持直接拖拽操作，可以快速调整任务的开始和结束时间。'
      },
      {
        type: 'single',
        question: '使用甘特图至少需要哪些字段？',
        options: ['只需要任务名称', '任务名称和负责人', '开始日期和结束日期', '只需要一个日期字段'],
        correctIndex: 2,
        explanation: '甘特图需要开始日期和结束日期两个字段来定义任务的时间范围。'
      }
    ]
  },

  /* ========== L2-11 画册视图 ========== */
  {
    id: 'L2-11',
    title: '画册视图',
    icon: 'gallery-horizontal',
    xpReward: 15,
    cards: [
      {
        type: 'knowledge',
        title: '画册视图 — 图片展示专家',
        content: '<strong>画册视图</strong>以图片卡片的形式展示数据。\n\n<strong>封面来源：</strong>使用附件字段中的图片作为卡片封面。\n\n<strong>显示模式：</strong>\n\u2022 <strong>裁剪模式</strong> — 图片填满卡片区域，可能裁剪边缘\n\u2022 <strong>适应模式</strong> — 完整显示图片，可能有留白\n\n适合产品目录、素材管理、人员档案等场景。',
        highlight: '画册视图让数据变得赏心悦目'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '画册视图的封面图片来自哪个字段？',
        options: ['文本字段', '链接字段', '附件字段', '图片URL字段'],
        correctIndex: 2,
        explanation: '画册视图使用附件字段中的图片作为卡片封面。'
      },
      {
        type: 'truefalse',
        question: '画册视图的"裁剪模式"会完整显示图片。',
        correct: false,
        explanation: '裁剪模式会让图片填满卡片区域，可能裁剪边缘。要完整显示图片应使用"适应模式"。'
      },
      {
        type: 'single',
        question: '以下哪种场景最适合使用画册视图？',
        options: ['项目进度管理', '产品目录展示', '财务数据分析', '日程安排'],
        correctIndex: 1,
        explanation: '画册视图以图片卡片形式展示，最适合产品目录、素材管理等以图片为主的场景。'
      }
    ]
  },

  /* ========== L2-12 表单收集数据 ========== */
  {
    id: 'L2-12',
    title: '表单收集数据',
    icon: 'clipboard-list',
    xpReward: 15,
    cards: [
      {
        type: 'knowledge',
        title: '表单 — 在线问卷收集数据',
        content: '<strong>表单</strong>本质上是在线问卷，收集的数据自动汇入 AI 表格。\n\n<strong>创建方式：</strong>\n\u2022 新建表单\n\u2022 基于已有数据表创建\n\u2022 从左侧边栏创建\n\n<strong>分享方式：</strong>链接分享、二维码分享\n\n<strong>填写范围：</strong>组织内、仅受邀人、互联网公开',
        highlight: '表单收集的数据自动进入表格'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '表单收集的数据会存储在哪里？',
        options: ['单独的表单数据库', '自动汇入 AI 表格', '发送到邮箱', '保存为 Excel 文件'],
        correctIndex: 1,
        explanation: '表单收集的数据会自动汇入关联的 AI 表格数据表中。'
      },
      {
        type: 'truefalse',
        question: '表单只能通过链接分享，不支持二维码。',
        correct: false,
        explanation: '表单支持链接分享和二维码分享两种方式。'
      },
      {
        type: 'single',
        question: '以下哪种不是表单的填写范围选项？',
        options: ['组织内', '仅受邀人', '互联网公开', '仅管理员'],
        correctIndex: 3,
        explanation: '表单的填写范围包括组织内、仅受邀人和互联网公开三种，没有"仅管理员"选项。'
      }
    ]
  },

  /* ========== L2-13 表单进阶 ========== */
  {
    id: 'L2-13',
    title: '表单进阶',
    icon: 'file-input',
    xpReward: 15,
    cards: [
      {
        type: 'knowledge',
        title: '明细表 — 一次填写多条数据',
        content: '<strong>表单明细表</strong>允许填写者在一次提交中填写多条记录。\n\n适用场景：\n\u2022 批量报名（一次提交多人信息）\n\u2022 订单录入（一次提交多个商品）\n\u2022 考勤记录（一次提交多天数据）',
        highlight: '明细表 = 一次填写，多条提交'
      },
      {
        type: 'knowledge',
        title: '预填默认值',
        content: '<strong>预填默认值</strong>可以在表单链接中预设某些字段的值。\n\n填写者打开表单时，这些字段已经自动填好，减少重复输入。\n\n常用于：固定部门、固定活动名称等场景。',
        highlight: '预填默认值减少填写者的重复输入'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '表单明细表的作用是什么？',
        options: ['美化表单样式', '一次提交多条记录', '限制填写次数', '自动审核数据'],
        correctIndex: 1,
        explanation: '表单明细表允许填写者在一次提交中填写多条记录，适合批量数据录入。'
      },
      {
        type: 'truefalse',
        question: '预填默认值可以减少填写者的重复输入。',
        correct: true,
        explanation: '预填默认值在表单链接中预设字段值，填写者打开时已自动填好，减少重复输入。'
      },
      {
        type: 'single',
        question: '以下哪种场景最适合使用表单明细表？',
        options: ['单人报名', '批量订单录入', '意见反馈', '满意度调查'],
        correctIndex: 1,
        explanation: '批量订单录入需要一次提交多条商品记录，最适合使用表单明细表。'
      }
    ]
  },

  /* ========== L2-14 分享与协同 ========== */
  {
    id: 'L2-14',
    title: '分享与协同',
    icon: 'share-2',
    xpReward: 15,
    cards: [
      {
        type: 'knowledge',
        title: '视图分享 — 精准共享数据',
        content: '<strong>视图分享</strong>可以将单个视图独立分享给他人。\n\n<strong>核心特点：</strong>\n\u2022 每个视图可以独立分享，互不影响\n\u2022 分享后数据实时更新\n\u2022 可以控制查看者的权限（只读/可编辑）\n\n<strong>分享方式：</strong>生成分享链接，发送给需要查看的人。',
        highlight: '视图分享让协作更精准'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '关于视图分享，以下哪项描述是正确的？',
        options: ['分享后数据是静态快照', '每个视图可以独立分享', '分享会暴露所有数据表', '只能分享给组织内成员'],
        correctIndex: 1,
        explanation: '每个视图可以独立分享，分享后数据实时更新，不会暴露其他视图或数据表。'
      },
      {
        type: 'truefalse',
        question: '分享视图后，查看者看到的数据会实时更新。',
        correct: true,
        explanation: '视图分享后，数据是实时同步的，原表数据变化会自动反映在分享的视图中。'
      },
      {
        type: 'single',
        question: '视图分享可以控制哪些权限？',
        options: ['只能设置只读', '只读或可编辑', '只能设置可编辑', '无法控制权限'],
        correctIndex: 1,
        explanation: '视图分享可以控制查看者的权限，支持只读和可编辑两种模式。'
      }
    ]
  },

  /* ========== L2-15 L2 毕业挑战 ========== */
  {
    id: 'L2-15',
    title: 'L2 毕业挑战',
    icon: 'award',
    xpReward: 50,
    isChallenge: true,
    cards: [
      {
        type: 'knowledge',
        title: '恭喜来到 L2 毕业挑战！',
        content: '你已经掌握了 AI 表格的核心操作技能！\n\n接下来是 <strong>6 道综合题</strong>，考验你对基础篇知识的掌握程度。\n\n完成挑战可获得 <strong>50 XP</strong> 经验值奖励！',
        highlight: '基础篇大考验，加油！'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '在数字字段中输入"100*3+50"，结果是什么？',
        options: ['显示文本"100*3+50"', '自动计算为 350', '报错', '显示为 0'],
        correctIndex: 1,
        explanation: '数字字段支持数学表达式，输入"100*3+50"会自动计算为 350。'
      },
      {
        type: 'single',
        question: '以下哪种视图最适合管理产品图片库？',
        options: ['表格视图', '看板视图', '画册视图', '甘特图'],
        correctIndex: 2,
        explanation: '画册视图以图片卡片形式展示数据，最适合管理产品图片库。'
      },
      {
        type: 'truefalse',
        question: '筛选、排序、分组都只在当前视图生效，不影响其他视图。',
        correct: true,
        explanation: '筛选、排序、分组都是视图级别的设置，只在当前视图生效，不影响其他视图。'
      },
      {
        type: 'single',
        question: '表单收集的数据存储在哪里？',
        options: ['云端服务器', '关联的 AI 表格数据表', '填写者的本地设备', '邮箱附件'],
        correctIndex: 1,
        explanation: '表单收集的数据会自动汇入关联的 AI 表格数据表中。'
      },
      {
        type: 'match',
        question: '将视图类型与最佳使用场景匹配：',
        pairs: [
          { left: '看板视图', right: '任务状态管理' },
          { left: '日历视图', right: '日程安排' },
          { left: '甘特图', right: '项目进度管理' },
          { left: '画册视图', right: '图片素材管理' }
        ]
      },
      {
        type: 'single',
        question: '关于填色功能，以下哪项是正确的？',
        options: ['最多设置 5 个条件', '最多设置 20 个条件', '条件数量无限制', '只能手动填色'],
        correctIndex: 1,
        explanation: '填色功能最多可以设置 20 个条件，当多个条件同时满足时，排在前面的优先生效。'
      }
    ]
  }
];

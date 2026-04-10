/**
 * 钉钉 AI 表格学习产品 — L3 进阶篇
 * L3 进阶篇 10 课 + 毕业挑战
 */

const L3_LESSONS = [
  /* ========== L3-1 AI 字段初体验 ========== */
  {
    id: 'L3-1',
    title: 'AI 字段初体验',
    icon: 'sparkles',
    xpReward: 20,
    cards: [
      {
        type: 'knowledge',
        title: 'AI 字段是什么？',
        content: '<strong>AI 字段</strong>是 AI 表格独有的智能字段类型。\n\n<strong>工作原理：</strong>你编写一段提示词（Prompt），AI 会根据同一行其他字段的数据自动生成结果。\n\n<strong>创建方式：</strong>\n\u2022 添加字段时选择"AI 字段"\n\u2022 编写提示词，引用其他字段\n\u2022 选择输出类型（文本/数字/单选等）',
        highlight: 'AI 字段 = 提示词 + 引用字段 + 输出类型'
      },
      {
        type: 'knowledge',
        title: 'AI 字段的输出类型',
        content: '<strong>AI 字段支持多种输出类型：</strong>\n\n\u2022 <strong>文本输出</strong> — 生成文字描述、摘要、翻译等\n\u2022 <strong>数字输出</strong> — 生成评分、计数等数值\n\u2022 <strong>单选输出</strong> — 自动分类到预设选项\n\u2022 <strong>多选输出</strong> — 自动打多个标签\n\n<strong>动态更新：</strong>当引用的字段数据变化时，AI 字段会自动重新计算。',
        highlight: 'AI 字段会随数据变化自动更新'
      }
    ],
    questions: [
      {
        type: 'single',
        question: 'AI 字段的工作原理是什么？',
        options: ['手动输入数据', '根据提示词和引用字段自动生成结果', '从外部数据库导入', '随机生成数据'],
        correctIndex: 1,
        explanation: 'AI 字段根据你编写的提示词，结合同一行其他字段的数据，自动生成结果。'
      },
      {
        type: 'truefalse',
        question: 'AI 字段的输出只能是文本类型。',
        correct: false,
        explanation: 'AI 字段支持文本、数字、单选、多选等多种输出类型。'
      },
      {
        type: 'single',
        question: '当引用的字段数据发生变化时，AI 字段会怎样？',
        options: ['保持不变', '自动重新计算', '显示错误', '需要手动刷新'],
        correctIndex: 1,
        explanation: 'AI 字段具有动态更新能力，当引用的字段数据变化时会自动重新计算。'
      },
      {
        type: 'match',
        question: '将 AI 字段的输出类型与适用场景匹配：',
        pairs: [
          { left: '文本输出', right: '生成摘要或翻译' },
          { left: '数字输出', right: '自动评分' },
          { left: '单选输出', right: '自动分类' },
          { left: '多选输出', right: '自动打标签' }
        ]
      }
    ]
  },

  /* ========== L3-2 AI 审合同 ========== */
  {
    id: 'L3-2',
    title: 'AI 审合同',
    icon: 'brain',
    xpReward: 20,
    cards: [
      {
        type: 'knowledge',
        title: '用 AI 字段审查合同',
        content: '<strong>实战场景：</strong>上传合同附件，让 AI 自动审查关键条款。\n\n<strong>操作步骤：</strong>\n\u2022 (1) 创建附件字段，上传合同文件\n\u2022 (2) 创建 AI 字段，引用附件字段\n\u2022 (3) 编写提示词：如"请审查这份合同，列出关键条款和风险点"\n\u2022 (4) AI 自动分析并输出审查结果',
        highlight: 'AI + 附件字段 = 智能文档审查'
      },
      {
        type: 'knowledge',
        title: '提示词编写技巧',
        content: '<strong>好的提示词应该：</strong>\n\n\u2022 <strong>明确任务</strong> — 清楚说明要 AI 做什么\n\u2022 <strong>指定格式</strong> — 告诉 AI 输出什么格式\n\u2022 <strong>给出示例</strong> — 提供期望的输出样例\n\u2022 <strong>设定角色</strong> — 如"你是一位资深法务专家"\n\n提示词越具体，AI 输出质量越高。',
        highlight: '提示词 = 任务 + 格式 + 示例 + 角色'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '用 AI 审查合同时，合同文件应该放在什么字段？',
        options: ['文本字段', '附件字段', '链接字段', '公式字段'],
        correctIndex: 1,
        explanation: '合同文件需要上传到附件字段，然后 AI 字段引用附件字段进行分析。'
      },
      {
        type: 'truefalse',
        question: '编写 AI 字段的提示词时，越简单越好。',
        correct: false,
        explanation: '提示词越具体、越详细，AI 的输出质量越高。好的提示词应包含任务、格式、示例等要素。'
      },
      {
        type: 'single',
        question: '以下哪个不是好的提示词要素？',
        options: ['明确任务', '指定输出格式', '使用模糊描述', '给出示例'],
        correctIndex: 2,
        explanation: '好的提示词应该具体明确，避免使用模糊描述。'
      }
    ]
  },

  /* ========== L3-3 AI 识别发票 ========== */
  {
    id: 'L3-3',
    title: 'AI 识别发票',
    icon: 'file-search',
    xpReward: 20,
    cards: [
      {
        type: 'knowledge',
        title: '多 AI 字段提取发票信息',
        content: '<strong>实战场景：</strong>上传发票图片，用多个 AI 字段分别提取不同信息。\n\n<strong>字段设计：</strong>\n\u2022 AI 字段 1 — 提取发票号码（数字输出）\n\u2022 AI 字段 2 — 提取开票日期（文本输出）\n\u2022 AI 字段 3 — 提取金额（数字输出）\n\u2022 AI 字段 4 — 识别发票类型（单选输出）\n\n每个 AI 字段负责提取一项信息，分工明确。',
        highlight: '多个 AI 字段配合，实现结构化信息提取'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '提取发票金额时，AI 字段的输出类型应该选什么？',
        options: ['文本输出', '数字输出', '单选输出', '多选输出'],
        correctIndex: 1,
        explanation: '金额是数值，应该选择数字输出类型，方便后续计算和统计。'
      },
      {
        type: 'truefalse',
        question: '一条记录只能有一个 AI 字段。',
        correct: false,
        explanation: '一条记录可以有多个 AI 字段，每个 AI 字段负责不同的分析任务。'
      },
      {
        type: 'single',
        question: '识别发票类型（增值税专票/普票等）时，最适合用什么输出类型？',
        options: ['文本输出', '数字输出', '单选输出', '附件输出'],
        correctIndex: 2,
        explanation: '发票类型是有限的分类，使用单选输出可以自动归类到预设选项中。'
      }
    ]
  },

  /* ========== L3-4 AI 助理 ========== */
  {
    id: 'L3-4',
    title: 'AI 助理',
    icon: 'scan-text',
    xpReward: 20,
    cards: [
      {
        type: 'knowledge',
        title: 'AI 助理 — 你的智能搭档',
        content: '<strong>AI 助理</strong>是 AI 表格内置的对话式 AI 工具。\n\n<strong>核心能力：</strong>\n\u2022 用对话方式搭建表格结构\n\u2022 自动创建自动化工作流\n\u2022 生成仪表盘和图表\n\u2022 回答关于 AI 表格的使用问题\n\n<strong>快捷键：</strong>按 <code>Ctrl + /</code> 快速唤起 AI 助理。',
        highlight: '按 Ctrl + / 随时唤起 AI 助理'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '唤起 AI 助理的快捷键是什么？',
        options: ['Ctrl + A', 'Ctrl + /', 'Ctrl + Shift + A', 'Alt + A'],
        correctIndex: 1,
        explanation: '按 Ctrl + / 可以快速唤起 AI 助理。'
      },
      {
        type: 'truefalse',
        question: 'AI 助理可以帮你自动创建自动化工作流。',
        correct: true,
        explanation: 'AI 助理支持用对话方式创建自动化工作流，无需手动配置。'
      },
      {
        type: 'match',
        question: '将 AI 助理的能力与场景匹配：',
        pairs: [
          { left: '对话搭建', right: '用自然语言创建表格结构' },
          { left: '自动化创建', right: '用对话方式配置工作流' },
          { left: '仪表盘生成', right: '自动创建数据图表' }
        ]
      }
    ]
  },

  /* ========== L3-5 AI 生成公式 ========== */
  {
    id: 'L3-5',
    title: 'AI 生成公式',
    icon: 'calendar-check',
    xpReward: 20,
    cards: [
      {
        type: 'knowledge',
        title: '用自然语言生成公式',
        content: '<strong>AI 生成公式</strong>让你不用记住复杂的函数语法。\n\n<strong>使用方式：</strong>\n\u2022 (1) 创建公式字段\n\u2022 (2) 点击"AI 生成公式"标签页\n\u2022 (3) 用自然语言描述你想要的计算逻辑\n\u2022 (4) AI 自动生成对应的公式\n\u2022 (5) 确认无误后点击"采纳"\n\n例如：输入"计算两个日期之间的天数"，AI 会自动生成 DATEDIF 公式。',
        highlight: '用自然语言描述需求，AI 自动写公式'
      }
    ],
    questions: [
      {
        type: 'single',
        question: 'AI 生成公式的入口在哪里？',
        options: ['AI 助理对话框', '公式字段的"AI 生成公式"标签页', '工具栏的 AI 按钮', '右键菜单'],
        correctIndex: 1,
        explanation: '在创建或编辑公式字段时，切换到"AI 生成公式"标签页即可使用。'
      },
      {
        type: 'truefalse',
        question: 'AI 生成的公式需要手动点击"采纳"才会生效。',
        correct: true,
        explanation: 'AI 生成公式后，你需要确认无误后点击"采纳"，公式才会应用到字段中。'
      },
      {
        type: 'single',
        question: '以下哪种描述最适合用 AI 生成公式？',
        options: ['帮我写个公式', '计算[销售额]字段的累计总和', '做个计算', '算一下数据'],
        correctIndex: 1,
        explanation: '描述越具体，AI 生成的公式越准确。应该明确指出要计算的字段和计算逻辑。'
      }
    ]
  },

  /* ========== L3-6 公式字段入门 ========== */
  {
    id: 'L3-6',
    title: '公式字段入门',
    icon: 'wand-2',
    xpReward: 20,
    cards: [
      {
        type: 'knowledge',
        title: '公式字段基础语法',
        content: '<strong>公式字段</strong>可以引用其他字段进行自动计算。\n\n<strong>核心语法：</strong>\n\u2022 <strong>引用字段：</strong>用方括号 <code>[字段名]</code> 引用\n\u2022 <strong>运算符：</strong>支持 +、-、*、/ 等数学运算\n\u2022 <strong>文本拼接：</strong>用 <code>&</code> 符号拼接文本\n\n<strong>示例：</strong>\n\u2022 <code>[单价] * [数量]</code> — 计算总价\n\u2022 <code>[姓] & [名]</code> — 拼接全名',
        highlight: '用 [字段名] 引用其他字段的值'
      },
      {
        type: 'knowledge',
        title: '常用函数速览',
        content: '<strong>AI 表格支持丰富的函数：</strong>\n\n\u2022 <strong>IF(条件, 真值, 假值)</strong> — 条件判断\n\u2022 <strong>SUM(字段)</strong> — 求和\n\u2022 <strong>DATEDIF(开始, 结束, 单位)</strong> — 日期差\n\u2022 <strong>TEXTJOIN(分隔符, 忽略空值, 文本...)</strong> — 文本合并\n\u2022 <strong>TEXT(值, 格式)</strong> — 格式化显示',
        highlight: 'IF 函数是最常用的条件判断函数'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '在公式中引用字段的正确语法是什么？',
        options: ['{字段名}', '(字段名)', '[字段名]', '<字段名>'],
        correctIndex: 2,
        explanation: '在 AI 表格的公式中，使用方括号 [字段名] 来引用其他字段的值。'
      },
      {
        type: 'truefalse',
        question: '公式字段可以用 & 符号拼接文本。',
        correct: true,
        explanation: '在公式中，使用 & 符号可以拼接多个文本值，如 [姓] & [名] 拼接为全名。'
      },
      {
        type: 'single',
        question: '要计算"如果[分数]>=60显示及格，否则显示不及格"，应该用什么函数？',
        options: ['SUM', 'IF', 'DATEDIF', 'TEXT'],
        correctIndex: 1,
        explanation: 'IF 函数用于条件判断：IF([分数]>=60, "及格", "不及格")。'
      },
      {
        type: 'match',
        question: '将函数与其功能匹配：',
        pairs: [
          { left: 'IF', right: '条件判断' },
          { left: 'SUM', right: '求和计算' },
          { left: 'DATEDIF', right: '计算日期差' },
          { left: 'TEXTJOIN', right: '合并多个文本' }
        ]
      }
    ]
  },

  /* ========== L3-7 函数实践 ========== */
  {
    id: 'L3-7',
    title: '函数实践',
    icon: 'clipboard-list',
    xpReward: 20,
    cards: [
      {
        type: 'knowledge',
        title: '实用函数案例',
        content: '<strong>案例 1：多条件判断</strong>\n<code>IFS([分数]>=90, "优秀", [分数]>=80, "良好", [分数]>=60, "及格", true, "不及格")</code>\n\n<strong>案例 2：错误处理</strong>\n<code>IFERROR([总价]/[数量], 0)</code>\n当除数为 0 时返回 0，避免报错。\n\n<strong>案例 3：日期计算</strong>\n<code>DATEDIF([入职日期], TODAY(), "Y")</code>\n计算员工工龄（年数）。',
        highlight: 'IFERROR 是处理公式错误的好帮手'
      },
      {
        type: 'knowledge',
        title: '文本处理函数',
        content: '<strong>常用文本函数：</strong>\n\n\u2022 <strong>FIND(查找文本, 源文本)</strong> — 查找文本位置\n\u2022 <strong>TEXTJOIN(", ", true, [标签1], [标签2])</strong> — 合并多个标签\n\u2022 <strong>TEXT([日期], "YYYY年MM月")</strong> — 格式化日期显示\n\u2022 <strong>LEN([文本])</strong> — 计算文本长度',
        highlight: '文本函数让数据展示更灵活'
      }
    ],
    questions: [
      {
        type: 'single',
        question: 'IFERROR 函数的作用是什么？',
        options: ['判断是否为空', '处理公式计算错误', '查找错误数据', '删除错误记录'],
        correctIndex: 1,
        explanation: 'IFERROR 函数在公式计算出错时返回指定的替代值，避免显示错误信息。'
      },
      {
        type: 'truefalse',
        question: 'IFS 函数可以实现多条件判断，比嵌套 IF 更简洁。',
        correct: true,
        explanation: 'IFS 函数支持多个条件判断，比嵌套多层 IF 函数更加简洁易读。'
      },
      {
        type: 'single',
        question: '要计算员工从入职到今天的工龄（年数），应该用什么公式？',
        options: ['TODAY() - [入职日期]', 'DATEDIF([入职日期], TODAY(), "Y")', 'YEAR(TODAY()) - YEAR([入职日期])', 'LEN([入职日期])'],
        correctIndex: 1,
        explanation: 'DATEDIF 函数可以精确计算两个日期之间的差值，"Y"参数表示按年计算。'
      },
      {
        type: 'match',
        question: '将函数与其用途匹配：',
        pairs: [
          { left: 'IFERROR', right: '处理除零等计算错误' },
          { left: 'IFS', right: '多条件分级判断' },
          { left: 'FIND', right: '查找文本中的关键词位置' },
          { left: 'TEXT', right: '格式化日期或数字显示' }
        ]
      }
    ]
  },

  /* ========== L3-8 公式排错 ========== */
  {
    id: 'L3-8',
    title: '公式排错',
    icon: 'file-input',
    xpReward: 20,
    cards: [
      {
        type: 'knowledge',
        title: '12 种公式错误代码',
        content: '<strong>常见错误代码及含义：</strong>\n\n\u2022 <strong>#ERROR!</strong> — 公式语法错误\n\u2022 <strong>#VALUE!</strong> — 参数类型不匹配\n\u2022 <strong>#DIV/0!</strong> — 除数为零\n\u2022 <strong>#REF!</strong> — 引用的字段已被删除\n\u2022 <strong>#NAME?</strong> — 函数名拼写错误\n\u2022 <strong>#NULL!</strong> — 引用的字段值为空',
        highlight: '看到错误代码不要慌，对照排查即可'
      },
      {
        type: 'knowledge',
        title: '排错技巧',
        content: '<strong>公式排错三步法：</strong>\n\n\u2022 (1) <strong>看错误代码</strong> — 确定错误类型\n\u2022 (2) <strong>检查引用字段</strong> — 确认字段名是否正确、字段是否存在\n\u2022 (3) <strong>用 IFERROR 兜底</strong> — 对可能出错的公式包裹 IFERROR\n\n<strong>技巧：</strong>复杂公式可以拆分成多个简单公式字段，逐步排查。',
        highlight: 'IFERROR 是公式排错的终极武器'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '公式显示 #DIV/0! 错误，最可能的原因是什么？',
        options: ['函数名拼写错误', '除数为零', '引用字段被删除', '语法错误'],
        correctIndex: 1,
        explanation: '#DIV/0! 表示除数为零，可以用 IFERROR 函数来处理这种情况。'
      },
      {
        type: 'truefalse',
        question: '公式显示 #REF! 错误，说明引用的字段已被删除。',
        correct: true,
        explanation: '#REF! 错误表示公式引用的字段已被删除或不存在，需要修正引用。'
      },
      {
        type: 'single',
        question: '处理公式错误的最佳实践是什么？',
        options: ['删除公式字段', '忽略错误', '用 IFERROR 包裹公式', '改用文本字段'],
        correctIndex: 2,
        explanation: '用 IFERROR 包裹可能出错的公式，在出错时返回友好的替代值。'
      },
      {
        type: 'match',
        question: '将错误代码与其含义匹配：',
        pairs: [
          { left: '#ERROR!', right: '公式语法错误' },
          { left: '#VALUE!', right: '参数类型不匹配' },
          { left: '#DIV/0!', right: '除数为零' },
          { left: '#NAME?', right: '函数名拼写错误' }
        ]
      }
    ]
  },

  /* ========== L3-9 单向关联 ========== */
  {
    id: 'L3-9',
    title: '单向关联',
    icon: 'table-properties',
    xpReward: 20,
    cards: [
      {
        type: 'knowledge',
        title: '跨表关联 — 数据库的核心能力',
        content: '<strong>单向关联</strong>可以在一个数据表中引用另一个数据表的记录。\n\n<strong>核心概念：</strong>\n\u2022 关联字段显示被关联表的<strong>主字段</strong>值\n\u2022 支持关联<strong>多条记录</strong>（多选模式）\n\u2022 关联关系是<strong>单向的</strong>，只在当前表显示\n\n<strong>限制：</strong>单向关联不支持跨 AI 表格（只能在同一个 AI 表格内的数据表之间关联）。',
        highlight: '单向关联 = 在 A 表中引用 B 表的记录'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '单向关联字段显示的是被关联表的什么内容？',
        options: ['所有字段', '主字段的值', '第一条记录', '记录数量'],
        correctIndex: 1,
        explanation: '单向关联字段默认显示被关联表的主字段值。'
      },
      {
        type: 'truefalse',
        question: '单向关联支持跨不同 AI 表格进行关联。',
        correct: false,
        explanation: '单向关联只能在同一个 AI 表格内的数据表之间建立，不支持跨 AI 表格关联。'
      },
      {
        type: 'single',
        question: '单向关联和双向关联的主要区别是什么？',
        options: ['单向关联更快', '单向关联只在一个表显示关联关系', '单向关联支持更多记录', '没有区别'],
        correctIndex: 1,
        explanation: '单向关联只在当前表显示关联关系，双向关联会在两个表中同时显示。'
      }
    ]
  },

  /* ========== L3-10 双向关联 ========== */
  {
    id: 'L3-10',
    title: '双向关联',
    icon: 'award',
    xpReward: 20,
    cards: [
      {
        type: 'knowledge',
        title: '双向关联 — 自动互联',
        content: '<strong>双向关联</strong>会在两个数据表中同时创建关联字段。\n\n<strong>核心特点：</strong>\n\u2022 在 A 表关联 B 表的记录后，B 表也会自动显示与 A 表的关联\n\u2022 <strong>联动删除：</strong>删除一端的关联，另一端也会自动解除\n\u2022 双向关联和单向关联可以<strong>互相转换</strong>',
        highlight: '双向关联 = 两个表自动互相引用'
      },
      {
        type: 'knowledge',
        title: '查找引用 — 跨表取值',
        content: '<strong>查找引用字段</strong>可以通过关联关系，获取被关联表中其他字段的值。\n\n<strong>使用场景：</strong>\n\u2022 订单表关联了客户表，通过查找引用获取客户的电话、地址\n\u2022 项目表关联了人员表，通过查找引用获取负责人的部门\n\n查找引用必须基于已有的关联字段才能使用。',
        highlight: '查找引用 = 通过关联关系跨表取值'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '双向关联的"联动删除"是什么意思？',
        options: ['删除记录时关联表的记录也被删除', '删除一端的关联关系，另一端自动解除', '删除字段时关联字段也被删除', '无法删除双向关联'],
        correctIndex: 1,
        explanation: '联动删除是指删除一端的关联关系时，另一端的关联也会自动解除。'
      },
      {
        type: 'truefalse',
        question: '双向关联和单向关联可以互相转换。',
        correct: true,
        explanation: '双向关联和单向关联可以根据需要互相转换，灵活调整关联方式。'
      },
      {
        type: 'single',
        question: '查找引用字段的前提条件是什么？',
        options: ['需要有公式字段', '需要有已建立的关联字段', '需要有 AI 字段', '无需任何前提'],
        correctIndex: 1,
        explanation: '查找引用必须基于已有的关联字段（单向或双向）才能使用。'
      },
      {
        type: 'match',
        question: '将关联类型与其特点匹配：',
        pairs: [
          { left: '单向关联', right: '只在一个表显示关联' },
          { left: '双向关联', right: '两个表自动互相引用' },
          { left: '查找引用', right: '通过关联跨表取值' }
        ]
      }
    ]
  }
];

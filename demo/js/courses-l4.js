/**
 * 钉钉 AI 表格学习产品 — L4 高级篇
 * L4 高级篇 8 课（含毕业挑战）
 */

const L4_LESSONS = [
  /* ========== L4-1 自动化是什么 ========== */
  {
    id: 'L4-1',
    title: '自动化是什么',
    icon: 'workflow',
    xpReward: 25,
    cards: [
      {
        type: 'knowledge',
        title: '自动化工作流 — 让表格自己干活',
        content: '<strong>自动化工作流</strong>可以在满足特定条件时，自动执行预设的操作。\n\n<strong>核心概念：</strong>\n\u2022 <strong>触发条件</strong> — 什么时候执行（如：新增记录时、字段值变更时）\n\u2022 <strong>执行动作</strong> — 执行什么操作（如：发消息、创建待办）\n\n<strong>8 种触发条件：</strong>新增记录、更新记录、删除记录、到达指定时间、字段值变更、按钮点击、Webhook 触发、定时触发。',
        highlight: '自动化 = 触发条件 + 执行动作'
      },
      {
        type: 'knowledge',
        title: '创建自动化的 3 种方式',
        content: '<strong>方式 1：</strong>从工具栏的"自动化"入口手动创建\n\n<strong>方式 2：</strong>使用 AI 助理对话式创建（推荐新手）\n\n<strong>方式 3：</strong>从模板库选择预设的自动化模板\n\n创建后可以随时开启/关闭自动化流程。',
        highlight: '推荐新手用 AI 助理对话式创建'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '自动化工作流由哪两部分组成？',
        options: ['字段和记录', '触发条件和执行动作', '视图和筛选', '公式和函数'],
        correctIndex: 1,
        explanation: '自动化工作流由"触发条件"（什么时候执行）和"执行动作"（执行什么操作）两部分组成。'
      },
      {
        type: 'truefalse',
        question: 'AI 表格的自动化支持 8 种触发条件。',
        correct: true,
        explanation: '支持新增记录、更新记录、删除记录、到达指定时间、字段值变更、按钮点击、Webhook 触发、定时触发共 8 种。'
      },
      {
        type: 'single',
        question: '以下哪种不是创建自动化的方式？',
        options: ['从工具栏手动创建', '用 AI 助理对话创建', '从模板库选择', '用公式字段创建'],
        correctIndex: 3,
        explanation: '公式字段用于计算，不能创建自动化。自动化可以通过工具栏、AI 助理或模板库创建。'
      },
      {
        type: 'match',
        question: '将触发条件与适用场景匹配：',
        pairs: [
          { left: '新增记录时', right: '新订单自动通知' },
          { left: '字段值变更时', right: '状态变更自动提醒' },
          { left: '到达指定时间时', right: '到期自动提醒' },
          { left: '按钮点击时', right: '手动触发审批' }
        ]
      }
    ]
  },

  /* ========== L4-2 到期自动提醒 ========== */
  {
    id: 'L4-2',
    title: '到期自动提醒',
    icon: 'mail',
    xpReward: 25,
    cards: [
      {
        type: 'knowledge',
        title: '实战：到期自动发送提醒',
        content: '<strong>场景：</strong>任务到期前自动发送钉钉消息提醒负责人。\n\n<strong>配置步骤：</strong>\n\u2022 (1) 触发条件：选择"到达记录中的时间时"\n\u2022 (2) 选择日期字段（如"截止日期"）\n\u2022 (3) 设置提前量（如提前 1 天）\n\u2022 (4) 执行动作：发送钉钉消息\n\u2022 (5) 选择接收人（如"负责人"字段）',
        highlight: '到期提醒是最常用的自动化场景'
      },
      {
        type: 'knowledge',
        title: '消息卡片形式',
        content: '<strong>自动化发送的消息支持卡片形式：</strong>\n\n\u2022 卡片标题和内容可以引用记录中的字段值\n\u2022 支持添加操作按钮（如"查看详情"、"标记完成"）\n\u2022 消息卡片比纯文本消息更美观、更有交互性',
        highlight: '消息卡片支持添加操作按钮'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '到期自动提醒应该选择什么触发条件？',
        options: ['新增记录时', '字段值变更时', '到达记录中的时间时', '定时触发'],
        correctIndex: 2,
        explanation: '"到达记录中的时间时"触发条件可以在指定日期字段的时间到达时自动触发。'
      },
      {
        type: 'truefalse',
        question: '自动化发送的钉钉消息支持添加操作按钮。',
        correct: true,
        explanation: '消息卡片支持添加操作按钮，如"查看详情"、"标记完成"等，增强交互性。'
      },
      {
        type: 'single',
        question: '如果要在截止日期前 1 天发送提醒，应该怎么设置？',
        options: ['设置触发时间为截止日期', '设置提前量为 1 天', '设置延迟 1 天执行', '手动每天检查'],
        correctIndex: 1,
        explanation: '在触发条件中设置提前量为 1 天，系统会在截止日期前 1 天自动发送提醒。'
      },
      {
        type: 'match',
        question: '将自动化配置步骤排序：',
        pairs: [
          { left: '第一步', right: '选择触发条件' },
          { left: '第二步', right: '配置触发参数' },
          { left: '第三步', right: '选择执行动作' },
          { left: '第四步', right: '配置动作参数' }
        ]
      }
    ]
  },

  /* ========== L4-3 自动发消息 ========== */
  {
    id: 'L4-3',
    title: '自动发消息',
    icon: 'check-circle',
    xpReward: 25,
    cards: [
      {
        type: 'knowledge',
        title: '3 种发送身份',
        content: '<strong>自动化发消息支持 3 种发送身份：</strong>\n\n\u2022 <strong>以表格助理身份</strong> — 消息显示为"AI 表格助理"发送\n\u2022 <strong>以触发人身份</strong> — 消息显示为触发自动化的人发送\n\u2022 <strong>以指定人身份</strong> — 消息显示为指定的人发送\n\n不同身份适用于不同场景。',
        highlight: '选择合适的发送身份很重要'
      },
      {
        type: 'knowledge',
        title: '变量引用',
        content: '<strong>消息内容中可以引用记录字段的值：</strong>\n\n使用变量引用符号 <strong>\u2295</strong> 可以在消息模板中插入字段值。\n\n例如：\n"任务【\u2295任务名称】已到期，请【\u2295负责人】尽快处理。"\n\n发送时会自动替换为实际的字段值。',
        highlight: '用 \u2295 符号引用字段值，消息更智能'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '自动化发消息支持几种发送身份？',
        options: ['1种', '2种', '3种', '5种'],
        correctIndex: 2,
        explanation: '支持以表格助理身份、以触发人身份、以指定人身份共 3 种发送身份。'
      },
      {
        type: 'truefalse',
        question: '自动化消息中可以引用记录字段的值作为消息内容。',
        correct: true,
        explanation: '使用变量引用符号可以在消息模板中插入字段值，发送时自动替换为实际值。'
      },
      {
        type: 'single',
        question: '如果希望消息看起来像是负责人自己发的，应该选择什么身份？',
        options: ['表格助理身份', '触发人身份', '指定人身份', '匿名身份'],
        correctIndex: 2,
        explanation: '选择"以指定人身份"发送，可以让消息显示为指定的人发送的。'
      },
      {
        type: 'match',
        question: '将发送身份与适用场景匹配：',
        pairs: [
          { left: '表格助理身份', right: '系统通知类消息' },
          { left: '触发人身份', right: '操作人发起的通知' },
          { left: '指定人身份', right: '以领导名义发通知' }
        ]
      }
    ]
  },

  /* ========== L4-4 自动创建待办 ========== */
  {
    id: 'L4-4',
    title: '自动创建待办',
    icon: 'clipboard-check',
    xpReward: 25,
    cards: [
      {
        type: 'knowledge',
        title: '自动创建待办和日程',
        content: '<strong>自动化可以自动创建钉钉待办和日程：</strong>\n\n\u2022 <strong>创建待办</strong> — 自动在钉钉待办中创建任务\n\u2022 <strong>创建日程</strong> — 自动在钉钉日历中创建日程\n\n<strong>任务 ID 管理：</strong>创建的待办会生成唯一的任务 ID，可以用于后续的完成、重启、删除操作。',
        highlight: '自动化打通了 AI 表格和钉钉待办'
      },
      {
        type: 'knowledge',
        title: '待办的生命周期管理',
        content: '<strong>自动化可以管理待办的完整生命周期：</strong>\n\n\u2022 <strong>创建</strong> — 新增记录时自动创建待办\n\u2022 <strong>完成</strong> — 状态变为"已完成"时自动完成待办\n\u2022 <strong>重启</strong> — 状态回退时自动重启待办\n\u2022 <strong>删除</strong> — 记录删除时自动删除待办',
        highlight: '表格状态和待办状态自动同步'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '自动化创建的待办会出现在哪里？',
        options: ['AI 表格内部', '钉钉待办', '邮箱', '日历'],
        correctIndex: 1,
        explanation: '自动化创建的待办会出现在钉钉待办中，实现 AI 表格和钉钉待办的打通。'
      },
      {
        type: 'truefalse',
        question: '自动化可以在记录状态变更时自动完成对应的待办。',
        correct: true,
        explanation: '通过配置自动化，可以在记录状态变为"已完成"时自动完成对应的钉钉待办。'
      },
      {
        type: 'single',
        question: '以下哪个不是待办的生命周期操作？',
        options: ['创建', '完成', '转发', '删除'],
        correctIndex: 2,
        explanation: '待办的生命周期包括创建、完成、重启和删除，不包括转发。'
      },
      {
        type: 'match',
        question: '将表格操作与待办操作匹配：',
        pairs: [
          { left: '新增记录', right: '自动创建待办' },
          { left: '状态改为已完成', right: '自动完成待办' },
          { left: '删除记录', right: '自动删除待办' },
          { left: '状态回退', right: '自动重启待办' }
        ]
      }
    ]
  },

  /* ========== L4-5 自动发起审批 ========== */
  {
    id: 'L4-5',
    title: '自动发起审批',
    icon: 'git-branch',
    xpReward: 25,
    cards: [
      {
        type: 'knowledge',
        title: '自动化对接 OA 审批',
        content: '<strong>自动化可以自动发起钉钉 OA 审批：</strong>\n\n\u2022 (1) 选择已有的审批模板\n\u2022 (2) 将表格字段与审批表单字段进行匹配\n\u2022 (3) 触发时自动填写审批表单并发起\n\n<strong>审批状态回写：</strong>审批通过/拒绝后，可以自动将结果回写到表格中。',
        highlight: '表格数据自动填入审批表单'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '自动发起审批时，表格字段和审批表单字段需要怎么处理？',
        options: ['自动匹配', '手动进行字段匹配', '不需要匹配', '只能用相同字段名'],
        correctIndex: 1,
        explanation: '需要手动将表格字段与审批表单字段进行匹配，确保数据正确填入。'
      },
      {
        type: 'truefalse',
        question: '审批通过后，结果可以自动回写到 AI 表格中。',
        correct: true,
        explanation: '自动化支持审批状态回写，审批通过或拒绝后可以自动更新表格中的对应字段。'
      },
      {
        type: 'single',
        question: '自动发起审批的前提条件是什么？',
        options: ['需要有公式字段', '需要有已创建的审批模板', '需要有 AI 字段', '不需要任何前提'],
        correctIndex: 1,
        explanation: '自动发起审批需要先在钉钉 OA 中创建好审批模板，然后在自动化中选择该模板。'
      },
      {
        type: 'match',
        question: '将自动化审批的步骤排序：',
        pairs: [
          { left: '第一步', right: '选择审批模板' },
          { left: '第二步', right: '匹配字段' },
          { left: '第三步', right: '配置触发条件' },
          { left: '第四步', right: '设置状态回写' }
        ]
      }
    ]
  },

  /* ========== L4-6 条件分支与循环 ========== */
  {
    id: 'L4-6',
    title: '条件分支与循环',
    icon: 'shield',
    xpReward: 25,
    cards: [
      {
        type: 'knowledge',
        title: '条件分支 — if-else 逻辑',
        content: '<strong>条件分支</strong>让自动化可以根据不同条件执行不同操作。\n\n<strong>示例：</strong>\n\u2022 如果金额 > 10000 → 发送给总监审批\n\u2022 如果金额 <= 10000 → 发送给经理审批\n\n类似编程中的 if-else 逻辑。',
        highlight: '条件分支让自动化更智能'
      },
      {
        type: 'knowledge',
        title: '循环节点与查找记录',
        content: '<strong>循环节点：</strong>可以对多条记录逐一执行操作。\n\n<strong>查找记录：</strong>在自动化中查找符合条件的记录，用于后续操作。\n\n<strong>计量规则：</strong>自动化执行有次数限制，循环节点中的每次迭代都会消耗一次执行次数。',
        highlight: '循环节点的每次迭代都消耗执行次数'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '自动化中的条件分支类似编程中的什么概念？',
        options: ['for 循环', 'if-else 判断', '函数调用', '变量赋值'],
        correctIndex: 1,
        explanation: '条件分支类似编程中的 if-else 判断，根据不同条件执行不同的操作。'
      },
      {
        type: 'truefalse',
        question: '循环节点中的每次迭代都会消耗一次自动化执行次数。',
        correct: true,
        explanation: '自动化有执行次数限制，循环节点中的每次迭代都会消耗一次执行次数，需要注意用量。'
      },
      {
        type: 'single',
        question: '"查找记录"节点的作用是什么？',
        options: ['删除符合条件的记录', '查找符合条件的记录用于后续操作', '创建新记录', '修改记录字段'],
        correctIndex: 1,
        explanation: '"查找记录"节点可以在自动化流程中查找符合条件的记录，供后续节点使用。'
      },
      {
        type: 'match',
        question: '将自动化节点与其功能匹配：',
        pairs: [
          { left: '条件分支', right: '根据条件走不同路径' },
          { left: '循环节点', right: '对多条记录逐一操作' },
          { left: '查找记录', right: '查找符合条件的记录' }
        ]
      }
    ]
  },

  /* ========== L4-7 高级权限入门 ========== */
  {
    id: 'L4-7',
    title: '高级权限入门',
    icon: 'users',
    xpReward: 25,
    cards: [
      {
        type: 'knowledge',
        title: '文档权限 vs 高级权限',
        content: '<strong>文档权限：</strong>控制谁能访问整个 AI 表格（可阅读/可编辑/可管理）。\n\n<strong>高级权限：</strong>在文档权限基础上，进一步控制表格内部的数据访问。\n\n<strong>4 种默认角色：</strong>\n\u2022 <strong>管理员</strong> — 完全控制\n\u2022 <strong>编辑者</strong> — 可编辑数据\n\u2022 <strong>只读者</strong> — 只能查看\n\u2022 <strong>无权限</strong> — 无法访问\n\n还可以创建<strong>自定义角色</strong>，精细控制权限。',
        highlight: '高级权限 = 文档权限 + 表格内部权限'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '高级权限和文档权限的关系是什么？',
        options: ['完全相同', '高级权限是文档权限的进一步细化', '互相独立', '高级权限替代文档权限'],
        correctIndex: 1,
        explanation: '高级权限是在文档权限基础上，进一步控制表格内部的数据访问权限。'
      },
      {
        type: 'truefalse',
        question: 'AI 表格的高级权限支持创建自定义角色。',
        correct: true,
        explanation: '除了 4 种默认角色外，还可以创建自定义角色，精细控制不同用户的权限。'
      },
      {
        type: 'single',
        question: '以下哪个不是 AI 表格的默认角色？',
        options: ['管理员', '编辑者', '审批者', '只读者'],
        correctIndex: 2,
        explanation: 'AI 表格的 4 种默认角色是管理员、编辑者、只读者和无权限，没有"审批者"角色。'
      },
      {
        type: 'match',
        question: '将角色与其权限匹配：',
        pairs: [
          { left: '管理员', right: '完全控制所有功能' },
          { left: '编辑者', right: '可编辑数据' },
          { left: '只读者', right: '只能查看数据' },
          { left: '无权限', right: '无法访问' }
        ]
      }
    ]
  },

  /* ========== L4-8 行列权限实战（毕业挑战） ========== */
  {
    id: 'L4-8',
    title: '行列权限实战',
    icon: 'shield-check',
    xpReward: 30,
    isChallenge: true,
    cards: [
      {
        type: 'knowledge',
        title: 'L4 毕业挑战 — 行列权限',
        content: '<strong>行权限（记录权限）：</strong>控制用户能看到/编辑哪些记录。\n例如：销售只能看到自己负责的客户记录。\n\n<strong>列权限（字段权限）：</strong>控制用户能看到/编辑哪些字段。\n例如：普通员工看不到"薪资"字段。\n\n<strong>权限预览：</strong>管理员可以切换到不同角色的视角，预览该角色看到的数据。',
        highlight: '行权限控制记录，列权限控制字段'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '如果要让销售只能看到自己负责的客户，应该设置什么权限？',
        options: ['文档权限', '字段权限', '记录权限（行权限）', '视图权限'],
        correctIndex: 2,
        explanation: '记录权限（行权限）可以根据条件控制用户能看到哪些记录，如"负责人=当前用户"。'
      },
      {
        type: 'single',
        question: '如果要隐藏"薪资"字段不让普通员工看到，应该设置什么？',
        options: ['记录权限', '字段权限（列权限）', '删除该字段', '使用筛选隐藏'],
        correctIndex: 1,
        explanation: '字段权限（列权限）可以控制不同角色能否看到或编辑特定字段。'
      },
      {
        type: 'truefalse',
        question: '管理员可以通过"权限预览"功能查看其他角色看到的数据。',
        correct: true,
        explanation: '权限预览功能让管理员可以切换到不同角色的视角，验证权限设置是否正确。'
      },
      {
        type: 'match',
        question: '将权限类型与其控制范围匹配：',
        pairs: [
          { left: '文档权限', right: '控制谁能访问整个表格' },
          { left: '行权限', right: '控制能看到哪些记录' },
          { left: '列权限', right: '控制能看到哪些字段' }
        ]
      },
      {
        type: 'single',
        question: '以下关于高级权限的描述，哪项是错误的？',
        options: ['支持自定义角色', '行权限和列权限可以组合使用', '高级权限会覆盖文档权限', '支持权限预览功能'],
        correctIndex: 2,
        explanation: '高级权限是在文档权限基础上的进一步细化，不会覆盖文档权限，两者是叠加关系。'
      }
    ]
  }
];

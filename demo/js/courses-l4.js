/**
 * 钉钉 AI 表格学习产品 — L4 高级篇
 * L4 高级篇 10 课（含毕业挑战）
 */

var l4Nodes = [
  { id: "L4-1", title: "自动化是什么", icon: "zap", xpReward: 25,
    cards: [
      { type: "knowledge", title: "自动化工作流", content: "<strong>自动化</strong>可以让 AI 表格在满足条件时自动执行操作。\n\n<strong>核心逻辑：</strong>当 <strong>触发条件</strong> 满足时 \u2192 自动执行 <strong>动作</strong>\n\n<strong>常见触发条件：</strong>\n\u2022 新增记录时\n\u2022 记录更新时\n\u2022 定时触发（每天/每周/每月）\n\u2022 按钮点击时\n\n<strong>常见动作：</strong>\n\u2022 发送消息通知\n\u2022 创建待办/日程\n\u2022 发起审批\n\u2022 更新记录\n\u2022 调用 Webhook", highlight: "触发条件 + 动作 = 自动化工作流" },
      { type: "knowledge", title: "创建自动化的 3 种方式", content: "<strong>方式 1：从模板创建</strong>\n\u2022 系统提供常用自动化模板，一键使用\n\n<strong>方式 2：自定义创建</strong>\n\u2022 手动选择触发条件和动作，灵活组合\n\n<strong>方式 3：AI 创建</strong>\n\u2022 用自然语言描述需求，AI 自动生成自动化流程", highlight: "模板 / 自定义 / AI \u2014 3 种创建方式" }
    ],
    questions: [
      { type: "single", question: "自动化的核心逻辑是什么？", options: ["手动执行操作", "当触发条件满足时自动执行动作", "定时备份数据", "自动创建表格"], correctIndex: 1, explanation: "自动化的核心逻辑是：当触发条件满足时，自动执行动作。" },
      { type: "truefalse", question: "自动化只能通过手动配置创建，不支持 AI 创建。", correct: false, explanation: "自动化支持 3 种创建方式：模板创建、自定义创建和 AI 创建。" },
      { type: "match", question: "将触发条件与适用场景匹配：", pairs: [{ left: "新增记录时", right: "新任务自动通知" }, { left: "记录更新时", right: "状态变更自动提醒" }, { left: "定时触发", right: "每天检查到期任务" }, { left: "按钮点击时", right: "手动触发审批" }] },
      { type: "single", question: "以下哪个不是自动化的常见动作？", options: ["发送消息通知", "创建待办", "自动设计表格结构", "发起审批"], correctIndex: 2, explanation: "自动设计表格结构不是自动化的动作。" },
      { type: "truefalse", question: "自动化可以通过 Webhook 与外部系统对接。", correct: true, explanation: "调用 Webhook 是自动化支持的动作之一。" },
      { type: "single", question: "从模板创建自动化的优势是什么？", options: ["更灵活", "一键使用，快速上手", "功能更强大", "不需要权限"], correctIndex: 1, explanation: "模板创建的优势是一键使用，快速上手。" },
      { type: "order", question: "请按正确顺序排列自动化的配置步骤：", items: ["选择触发条件", "设置筛选条件（可选）", "选择要执行的动作", "配置动作参数"], correctOrder: [0, 1, 2, 3] },
      { type: "single", question: "定时触发支持哪些频率？", options: ["只支持每天", "每天/每周/每月", "只支持每月", "只支持每小时"], correctIndex: 1, explanation: "定时触发支持每天、每周、每月等频率。" },
      { type: "single", question: "用 AI 创建自动化时需要做什么？", options: ["编写代码", "用自然语言描述需求", "画流程图", "填写表单"], correctIndex: 1, explanation: "AI 创建方式只需用自然语言描述需求即可。" },
      { type: "truefalse", question: "一个自动化流程中只能有一个动作。", correct: false, explanation: "一个自动化流程可以包含多个动作。" }
    ]
  },

  { id: "L4-2", title: "到期自动提醒", icon: "bell", xpReward: 25,
    cards: [
      { type: "knowledge", title: "实战：到期自动发送提醒", content: "<strong>场景：</strong>任务到期前自动提醒负责人。\n\n<strong>配置步骤：</strong>\n\u2022 (1) 触发条件：<strong>定时触发</strong>，每天检查一次\n\u2022 (2) 筛选条件：截止日期 = 明天 且 状态 \u2260 已完成\n\u2022 (3) 动作：发送钉钉消息给负责人\n\n<strong>进阶：</strong>可以设置多级提醒，如提前 3 天、提前 1 天、当天分别提醒。", highlight: "定时触发 + 筛选条件 + 发消息 = 到期提醒" },
      { type: "knowledge", title: "消息卡片形式", content: "<strong>自动化发送的消息支持多种形式：</strong>\n\n\u2022 <strong>纯文本消息</strong> \u2014 简单的文字通知\n\u2022 <strong>消息卡片</strong> \u2014 带有标题、内容、按钮的富文本卡片\n\u2022 <strong>变量引用</strong> \u2014 消息中可以插入字段值，如 {任务名称}、{截止日期}", highlight: "消息卡片 + 变量引用 = 专业通知" }
    ],
    questions: [
      { type: "single", question: "到期自动提醒通常使用什么触发条件？", options: ["新增记录时", "记录更新时", "定时触发", "按钮点击时"], correctIndex: 2, explanation: "到期提醒通常使用定时触发，每天检查一次。" },
      { type: "truefalse", question: "自动化消息中可以插入字段值作为变量。", correct: true, explanation: "消息中可以使用变量引用，插入字段值如 {任务名称}、{截止日期} 等。" },
      { type: "single", question: "如何实现提前 3 天提醒？", options: ["设置触发条件为3天后", "设置筛选条件为截止日期=3天后", "手动提前3天发消息", "无法实现"], correctIndex: 1, explanation: "通过筛选条件设置截止日期=3天后，配合定时触发即可。" },
      { type: "match", question: "将消息形式与其特点匹配：", pairs: [{ left: "纯文本消息", right: "简单的文字通知" }, { left: "消息卡片", right: "带标题、内容、按钮的富文本" }, { left: "变量引用", right: "插入字段值如任务名称" }] },
      { type: "single", question: "到期提醒的筛选条件通常包含什么？", options: ["只看截止日期", "截止日期=明天 且 状态不等于已完成", "所有记录", "只看已完成的"], correctIndex: 1, explanation: "需要同时筛选截止日期和状态，避免已完成的任务也收到提醒。" },
      { type: "truefalse", question: "消息卡片比纯文本消息更适合正式场景。", correct: true, explanation: "消息卡片带有标题、内容、按钮，更加美观专业。" },
      { type: "single", question: "如何实现多级提醒？", options: ["创建一个自动化即可", "创建多个自动化，分别设置不同的筛选条件", "无法实现", "手动发送"], correctIndex: 1, explanation: "可以创建多个自动化，分别设置不同的筛选条件。" },
      { type: "order", question: "请按正确顺序排列到期提醒的配置步骤：", items: ["设置定时触发", "配置筛选条件", "设置发送消息动作", "插入变量引用"], correctOrder: [0, 1, 2, 3] },
      { type: "single", question: "变量引用的语法格式是什么？", options: ["[字段名]", "{字段名}", "@字段名", "#字段名"], correctIndex: 1, explanation: "在自动化消息中使用 {字段名} 的格式来引用字段值。" },
      { type: "single", question: "以下哪种场景不适合用到期提醒？", options: ["任务截止提醒", "合同到期提醒", "实时数据监控", "会议前提醒"], correctIndex: 2, explanation: "实时数据监控需要持续监测，不适合用定时触发的到期提醒。" }
    ]
  },

  { id: "L4-3", title: "自动发消息", icon: "send", xpReward: 25,
    cards: [
      { type: "knowledge", title: "3 种发送身份", content: "<strong>自动化发消息支持 3 种发送身份：</strong>\n\n\u2022 <strong>AI 表格助手</strong> \u2014 以系统身份发送\n\u2022 <strong>流程创建人</strong> \u2014 以创建自动化的人的身份发送\n\u2022 <strong>指定人员</strong> \u2014 以表格中某个人员字段的值作为发送者\n\n<strong>发送目标：</strong>个人、钉钉群、部门", highlight: "3 种身份 + 3 种目标 = 灵活的消息发送" },
      { type: "knowledge", title: "变量引用", content: "<strong>消息内容支持丰富的变量引用：</strong>\n\n\u2022 <strong>字段变量</strong> \u2014 {任务名称}、{负责人}、{截止日期}\n\u2022 <strong>系统变量</strong> \u2014 当前时间、触发人\n\u2022 <strong>格式化</strong> \u2014 支持换行、加粗等富文本格式", highlight: "字段变量 + 系统变量 = 个性化消息" }
    ],
    questions: [
      { type: "single", question: "自动化发消息支持几种发送身份？", options: ["1 种", "2 种", "3 种", "5 种"], correctIndex: 2, explanation: "支持 AI 表格助手、流程创建人、指定人员 3 种发送身份。" },
      { type: "truefalse", question: "自动化消息可以发送到钉钉群。", correct: true, explanation: "自动化消息支持发送给个人、钉钉群和部门。" },
      { type: "match", question: "将发送身份与适用场景匹配：", pairs: [{ left: "AI 表格助手", right: "系统通知类消息" }, { left: "流程创建人", right: "以管理员身份发送" }, { left: "指定人员", right: "以负责人身份发送" }] },
      { type: "single", question: "消息中的 {负责人} 属于什么类型的变量？", options: ["系统变量", "字段变量", "公式变量", "环境变量"], correctIndex: 1, explanation: "{负责人} 是字段变量。" },
      { type: "truefalse", question: "自动化消息只支持纯文本格式。", correct: false, explanation: "自动化消息支持富文本格式，包括换行、加粗等。" },
      { type: "single", question: "以下哪个不是自动化消息的发送目标？", options: ["个人", "钉钉群", "部门", "外部邮箱"], correctIndex: 3, explanation: "自动化消息支持发送给个人、钉钉群和部门，不直接支持外部邮箱。" },
      { type: "single", question: "以 AI 表格助手身份发送适合什么场景？", options: ["私人消息", "系统通知类消息", "客户沟通", "团队讨论"], correctIndex: 1, explanation: "AI 表格助手是系统身份，适合发送通知类消息。" },
      { type: "order", question: "请按正确顺序排列自动发消息的配置步骤：", items: ["选择触发条件", "选择发送身份", "设置发送目标", "编写消息内容并插入变量"], correctOrder: [0, 1, 2, 3] },
      { type: "single", question: "如何让消息内容包含当前记录的任务名称？", options: ["手动输入", "在消息中插入 {任务名称} 变量", "用公式计算", "无法实现"], correctIndex: 1, explanation: "在消息内容中插入 {任务名称} 字段变量即可。" },
      { type: "truefalse", question: "同一个自动化流程可以同时发送消息给多个目标。", correct: true, explanation: "可以在一个自动化流程中添加多个发送消息的动作。" }
    ]
  },

  { id: "L4-4", title: "自动创建待办", icon: "check-square", xpReward: 25,
    cards: [
      { type: "knowledge", title: "自动创建待办和日程", content: "<strong>创建待办：</strong>\n\u2022 标题、内容支持变量引用\n\u2022 可指定执行人（人员字段）\n\u2022 可设置截止时间（日期字段）\n\n<strong>创建日程：</strong>\n\u2022 自动在钉钉日历中创建日程\n\u2022 可设置开始/结束时间\n\u2022 可添加参与人", highlight: "自动化 \u2192 钉钉待办 / 日程" },
      { type: "knowledge", title: "待办的生命周期管理", content: "<strong>待办状态联动：</strong>\n\u2022 表格中任务状态变为已完成 \u2192 自动完成对应的钉钉待办\n\u2022 钉钉待办被完成 \u2192 可以反向更新表格中的状态\n\n<strong>最佳实践：</strong>\n\u2022 用新增记录触发创建待办\n\u2022 用记录更新触发完成待办", highlight: "表格状态 <-> 待办状态 双向联动" }
    ],
    questions: [
      { type: "single", question: "自动化创建的待办会出现在哪里？", options: ["只在表格中", "钉钉待办中", "只在邮箱中", "只在日历中"], correctIndex: 1, explanation: "自动化创建的待办会出现在钉钉待办中。" },
      { type: "truefalse", question: "自动化可以同时创建待办和日程。", correct: true, explanation: "自动化支持创建钉钉待办和日程两种类型。" },
      { type: "single", question: "待办的执行人通常来自表格中的什么字段？", options: ["文本字段", "人员字段", "数字字段", "日期字段"], correctIndex: 1, explanation: "待办的执行人通常引用表格中的人员字段。" },
      { type: "match", question: "将自动化动作与钉钉功能匹配：", pairs: [{ left: "创建待办", right: "钉钉待办列表" }, { left: "创建日程", right: "钉钉日历" }, { left: "发送消息", right: "钉钉聊天" }, { left: "发起审批", right: "钉钉 OA 审批" }] },
      { type: "single", question: "如何实现表格状态变为已完成时自动完成待办？", options: ["手动操作", "创建自动化：记录更新（状态=已完成）\u2192 完成待办", "用公式实现", "无法实现"], correctIndex: 1, explanation: "创建自动化，触发条件为记录更新且状态=已完成，动作为完成对应的钉钉待办。" },
      { type: "truefalse", question: "待办标题支持使用变量引用。", correct: true, explanation: "待办的标题和内容都支持变量引用。" },
      { type: "single", question: "创建待办时，截止时间通常引用什么字段？", options: ["文本字段", "人员字段", "日期字段", "数字字段"], correctIndex: 2, explanation: "待办的截止时间通常引用表格中的日期字段。" },
      { type: "single", question: "以下哪个触发条件最适合新任务自动创建待办？", options: ["定时触发", "新增记录时", "记录更新时", "按钮点击时"], correctIndex: 1, explanation: "新任务创建时自动生成待办，最适合用新增记录时作为触发条件。" },
      { type: "order", question: "请按正确顺序排列待办生命周期：", items: ["新增记录触发创建待办", "执行人在钉钉中查看待办", "执行人完成任务", "表格状态更新为已完成"], correctOrder: [0, 1, 2, 3] },
      { type: "single", question: "自动创建日程时，可以设置哪些信息？", options: ["只能设置标题", "标题、开始/结束时间、参与人", "只能设置时间", "只能设置参与人"], correctIndex: 1, explanation: "创建日程时可以设置标题、开始/结束时间、参与人等完整信息。" }
    ]
  },

  { id: "L4-5", title: "自动发起审批", icon: "clipboard-check", xpReward: 25,
    cards: [
      { type: "knowledge", title: "自动化对接 OA 审批", content: "<strong>配置步骤：</strong>\n\u2022 (1) 选择触发条件（如：新增记录、按钮点击）\n\u2022 (2) 选择审批模板\n\u2022 (3) 映射表格字段到审批表单字段\n\u2022 (4) 设置审批人\n\n<strong>审批结果回写：</strong>\n\u2022 审批通过/拒绝后，可以自动更新表格中的状态字段\n\u2022 实现审批流程与数据管理的闭环", highlight: "表格数据 \u2192 OA 审批 \u2192 结果回写" }
    ],
    questions: [
      { type: "single", question: "自动发起审批需要先做什么？", options: ["创建数据表", "选择审批模板", "添加字段", "创建视图"], correctIndex: 1, explanation: "自动发起审批需要先选择一个钉钉 OA 审批模板。" },
      { type: "truefalse", question: "审批通过后可以自动更新表格中的状态字段。", correct: true, explanation: "审批结果可以回写到表格，实现闭环。" },
      { type: "single", question: "映射表格字段到审批表单字段是什么意思？", options: ["复制表格", "将表格中的字段值自动填入审批表单对应的字段", "删除字段", "创建新字段"], correctIndex: 1, explanation: "字段映射是将表格中的字段值自动填入审批表单对应的字段。" },
      { type: "match", question: "将审批流程步骤与其作用匹配：", pairs: [{ left: "选择审批模板", right: "确定审批表单结构" }, { left: "字段映射", right: "自动填入审批表单" }, { left: "设置审批人", right: "指定谁来审批" }, { left: "结果回写", right: "更新表格状态" }] },
      { type: "single", question: "以下哪个触发条件适合提交报销自动发起审批？", options: ["定时触发", "新增记录时或按钮点击时", "记录删除时", "字段修改时"], correctIndex: 1, explanation: "提交报销可以用新增记录时自动触发，或用按钮点击时手动触发。" },
      { type: "truefalse", question: "自动化发起的审批和手动发起的审批效果相同。", correct: true, explanation: "自动化发起的审批和手动发起的效果相同。" },
      { type: "single", question: "审批结果回写的意义是什么？", options: ["节省存储空间", "实现审批流程与数据管理的闭环", "加快审批速度", "减少审批人数"], correctIndex: 1, explanation: "审批结果回写可以自动更新表格状态，实现完整闭环。" },
      { type: "order", question: "请按正确顺序排列自动审批的配置步骤：", items: ["选择触发条件", "选择审批模板", "映射字段", "设置审批人"], correctOrder: [0, 1, 2, 3] },
      { type: "single", question: "如果审批被拒绝，自动化可以做什么？", options: ["什么都不能做", "可以自动更新表格状态为已拒绝", "自动删除记录", "自动重新提交"], correctIndex: 1, explanation: "审批被拒绝后，可以通过结果回写自动更新表格中的状态字段。" },
      { type: "single", question: "自动化审批最大的优势是什么？", options: ["审批更快", "避免手动重复填写审批表单，实现数据自动流转", "不需要审批人", "可以跳过审批"], correctIndex: 1, explanation: "自动化审批通过字段映射避免重复填写，通过结果回写实现数据自动流转。" }
    ]
  },

  { id: "L4-6", title: "条件分支与循环", icon: "git-branch", xpReward: 25,
    cards: [
      { type: "knowledge", title: "条件分支", content: "<strong>条件分支</strong>让自动化根据不同条件执行不同动作。\n\n<strong>示例：</strong>\n\u2022 如果金额 > 10000 \u2192 发送给总监审批\n\u2022 如果金额 <= 10000 \u2192 发送给经理审批\n\n<strong>支持多分支：</strong>可以设置多个条件，每个条件对应不同的动作。", highlight: "条件分支 = 自动化中的 if-else" },
      { type: "knowledge", title: "循环节点与查找记录", content: "<strong>循环节点：</strong>对查找到的多条记录逐一执行动作\n\n<strong>查找记录：</strong>在自动化中查找满足条件的记录，可以设置筛选条件、排序方式", highlight: "查找记录 + 循环 = 批量处理" }
    ],
    questions: [
      { type: "single", question: "条件分支在自动化中的作用是什么？", options: ["创建新记录", "根据不同条件执行不同动作", "删除记录", "修改字段"], correctIndex: 1, explanation: "条件分支让自动化根据不同条件执行不同的动作。" },
      { type: "truefalse", question: "条件分支只支持两个分支（是/否）。", correct: false, explanation: "条件分支支持多分支。" },
      { type: "single", question: "循环节点的作用是什么？", options: ["重复执行一个动作", "对查找到的多条记录逐一执行动作", "创建循环引用", "无限循环"], correctIndex: 1, explanation: "循环节点对查找到的多条记录逐一执行动作。" },
      { type: "match", question: "将自动化节点与其功能匹配：", pairs: [{ left: "条件分支", right: "根据条件走不同路径" }, { left: "循环节点", right: "逐一处理多条记录" }, { left: "查找记录", right: "查找满足条件的数据" }] },
      { type: "single", question: "金额>10000发给总监，否则发给经理需要用什么节点？", options: ["循环节点", "条件分支", "查找记录", "延时节点"], correctIndex: 1, explanation: "这是典型的条件分支场景。" },
      { type: "truefalse", question: "查找记录节点可以设置筛选条件和排序方式。", correct: true, explanation: "查找记录支持设置筛选条件和排序方式。" },
      { type: "single", question: "查找所有即将到期的任务逐一发送提醒需要哪两个节点？", options: ["条件分支+循环", "查找记录+循环", "查找记录+条件分支", "循环+延时"], correctIndex: 1, explanation: "先用查找记录找到即将到期的任务，再用循环节点逐一发送提醒。" },
      { type: "order", question: "请按正确顺序排列批量提醒的自动化流程：", items: ["定时触发", "查找即将到期的记录", "循环遍历每条记录", "发送提醒消息"], correctOrder: [0, 1, 2, 3] },
      { type: "single", question: "以下哪种场景需要同时使用条件分支和循环？", options: ["简单的消息通知", "查找所有任务，根据优先级分别发送不同级别的提醒", "创建一条待办", "更新一个字段"], correctIndex: 1, explanation: "先查找并循环所有任务，再根据优先级（条件分支）发送不同级别的提醒。" },
      { type: "single", question: "查找记录的结果可以用于什么？", options: ["只能查看", "后续动作中引用查找到的记录字段值", "只能导出", "只能删除"], correctIndex: 1, explanation: "查找记录的结果可以在后续动作中引用。" }
    ]
  },

  { id: "L4-7", title: "高级权限入门", icon: "shield", xpReward: 30,
    cards: [
      { type: "knowledge", title: "文档权限 vs 高级权限", content: "<strong>文档权限（基础）：</strong>\n\u2022 控制谁能访问整个表格文档\n\u2022 分为：可管理、可编辑、可查看\n\u2022 所有人看到的数据相同\n\n<strong>高级权限：</strong>\n\u2022 控制不同角色能看到/编辑哪些数据表、记录、字段、视图\n\u2022 实现同一张表格，不同人看到不同数据\n\u2022 需要手动开启", highlight: "文档权限管大门，高级权限管房间" },
      { type: "knowledge", title: "5 种权限类型", content: "<strong>高级权限可以精细控制 5 个维度：</strong>\n\n\u2022 <strong>数据表权限</strong> \u2014 控制能否看到/编辑某个数据表\n\u2022 <strong>记录权限</strong> \u2014 控制能看到哪些行（如：只看自己创建的记录）\n\u2022 <strong>字段权限</strong> \u2014 控制能看到/编辑哪些列\n\u2022 <strong>视图权限</strong> \u2014 控制能看到哪些视图\n\u2022 <strong>仪表盘权限</strong> \u2014 控制能看到哪些仪表盘", highlight: "表、行、列、视图、仪表盘 \u2014 5 维精细控制" }
    ],
    questions: [
      { type: "single", question: "文档权限和高级权限的核心区别是什么？", options: ["没有区别", "文档权限控制整体访问，高级权限控制数据维度的精细访问", "高级权限更简单", "文档权限更强大"], correctIndex: 1, explanation: "文档权限控制谁能访问整个文档，高级权限控制不同角色能看到/编辑哪些具体数据。" },
      { type: "truefalse", question: "高级权限默认是开启的。", correct: false, explanation: "高级权限需要手动开启，默认使用的是文档权限。" },
      { type: "single", question: "高级权限可以精细控制几个维度？", options: ["2 个", "3 个", "4 个", "5 个"], correctIndex: 3, explanation: "高级权限可以控制数据表、记录、字段、视图、仪表盘 5 个维度。" },
      { type: "match", question: "将权限类型与其控制对象匹配：", pairs: [{ left: "数据表权限", right: "控制能否看到某个数据表" }, { left: "记录权限", right: "控制能看到哪些行" }, { left: "字段权限", right: "控制能看到哪些列" }, { left: "视图权限", right: "控制能看到哪些视图" }] },
      { type: "single", question: "如何实现不同人看到不同数据？", options: ["创建多个表格", "使用高级权限的记录权限", "使用筛选器", "无法实现"], correctIndex: 1, explanation: "通过高级权限的记录权限，可以实现不同角色只看到自己相关的记录。" },
      { type: "truefalse", question: "开启高级权限后，文档权限就失效了。", correct: false, explanation: "开启高级权限后，文档权限仍然有效，两者共同作用。" },
      { type: "single", question: "记录权限可以实现什么效果？", options: ["隐藏整个数据表", "只看自己创建的记录", "隐藏某些字段", "控制视图访问"], correctIndex: 1, explanation: "记录权限可以控制用户只能看到自己创建的记录、自己负责的记录等。" },
      { type: "single", question: "字段权限可以实现什么效果？", options: ["隐藏整个数据表", "隐藏某些行", "隐藏敏感列如薪资字段", "控制视图访问"], correctIndex: 2, explanation: "字段权限可以隐藏敏感列，如薪资、身份证号等。" },
      { type: "order", question: "请按从大到小排列权限控制的粒度：", items: ["数据表权限", "视图权限", "记录权限（行）", "字段权限（列）"], correctOrder: [0, 1, 2, 3] },
      { type: "single", question: "以下哪个场景最适合使用高级权限？", options: ["个人笔记", "团队共享的项目管理表，不同角色看不同数据", "简单的待办清单", "临时数据收集"], correctIndex: 1, explanation: "团队共享且需要不同角色看不同数据的场景最适合使用高级权限。" }
    ]
  },

  { id: "L4-8", title: "角色与成员管理", icon: "users", xpReward: 30,
    cards: [
      { type: "knowledge", title: "4 种默认角色", content: "<strong>AI 表格高级权限提供 4 种默认角色：</strong>\n\n\u2022 <strong>所有者</strong> \u2014 最高权限，可管理所有设置和数据\n\u2022 <strong>管理者</strong> \u2014 可管理数据和部分设置，不能删除表格\n\u2022 <strong>编辑者</strong> \u2014 可编辑数据，不能修改表格结构\n\u2022 <strong>查看者</strong> \u2014 只能查看数据，不能做任何修改\n\n<strong>注意：</strong>默认角色的权限是预设的，不可修改。", highlight: "所有者 > 管理者 > 编辑者 > 查看者" },
      { type: "knowledge", title: "自定义角色", content: "<strong>自定义角色可以灵活配置权限：</strong>\n\n\u2022 <strong>免费版</strong> \u2014 最多 3 个自定义角色\n\u2022 <strong>企业版</strong> \u2014 最多 50 个自定义角色\n\u2022 <strong>旗舰版</strong> \u2014 最多 100 个自定义角色\n\n<strong>成员分配：</strong>\n\u2022 可以将个人、部门、群组分配到角色\n\u2022 一个成员可以属于多个角色\n\u2022 多角色时权限取并集（拥有所有角色的权限之和）", highlight: "自定义角色 + 灵活分配 = 精细权限管理" },
      { type: "knowledge", title: "默认角色设置", content: "<strong>默认角色决定了新成员的初始权限：</strong>\n\n\u2022 当新成员通过链接或被邀请加入时，会自动获得默认角色\n\u2022 可以在高级权限设置中修改默认角色\n\u2022 建议将默认角色设置为权限较低的角色（如查看者），再根据需要手动调整" }
    ],
    questions: [
      { type: "single", question: "AI 表格高级权限有几种默认角色？", options: ["2 种", "3 种", "4 种", "5 种"], correctIndex: 2, explanation: "有所有者、管理者、编辑者、查看者 4 种默认角色。" },
      { type: "match", question: "将默认角色与其权限匹配：", pairs: [{ left: "所有者", right: "最高权限，可管理所有设置" }, { left: "管理者", right: "可管理数据和部分设置" }, { left: "编辑者", right: "可编辑数据，不能修改结构" }, { left: "查看者", right: "只能查看，不能修改" }] },
      { type: "truefalse", question: "默认角色的权限可以修改。", correct: false, explanation: "默认角色的权限是预设的，不可修改。如需自定义权限，请创建自定义角色。" },
      { type: "single", question: "免费版最多可以创建几个自定义角色？", options: ["1 个", "3 个", "10 个", "50 个"], correctIndex: 1, explanation: "免费版最多 3 个自定义角色。" },
      { type: "single", question: "一个成员属于多个角色时，权限如何计算？", options: ["取最低权限", "取最高权限", "取并集（所有角色权限之和）", "随机选择"], correctIndex: 2, explanation: "多角色时权限取并集，即拥有所有角色的权限之和。" },
      { type: "truefalse", question: "可以将整个部门分配到一个角色。", correct: true, explanation: "成员分配支持个人、部门、群组。" },
      { type: "single", question: "建议将默认角色设置为什么？", options: ["所有者", "管理者", "编辑者", "权限较低的角色如查看者"], correctIndex: 3, explanation: "建议将默认角色设置为权限较低的角色，再根据需要手动调整。" },
      { type: "single", question: "旗舰版最多可以创建几个自定义角色？", options: ["10 个", "50 个", "100 个", "无限制"], correctIndex: 2, explanation: "旗舰版最多 100 个自定义角色。" },
      { type: "order", question: "请按权限从高到低排列默认角色：", items: ["所有者", "管理者", "编辑者", "查看者"], correctOrder: [0, 1, 2, 3] },
      { type: "single", question: "新成员通过链接加入时会获得什么角色？", options: ["所有者", "管理者", "默认角色（可在设置中修改）", "没有角色"], correctIndex: 2, explanation: "新成员会自动获得默认角色。" }
    ]
  },

  { id: "L4-9", title: "行列权限实战", icon: "lock", xpReward: 30,
    cards: [
      { type: "knowledge", title: "记录权限（行权限）实战", content: "<strong>记录权限的常见配置：</strong>\n\n\u2022 <strong>查看全部记录</strong> \u2014 可以看到所有行\n\u2022 <strong>只看自己创建的</strong> \u2014 只能看到自己创建的记录\n\u2022 <strong>只看自己负责的</strong> \u2014 只能看到人员字段包含自己的记录\n\u2022 <strong>按条件筛选</strong> \u2014 根据字段值决定能看到哪些记录\n\n<strong>编辑权限同理：</strong>可以分别控制查看和编辑的范围。", highlight: "行权限 = 不同人看到不同行" },
      { type: "knowledge", title: "字段权限（列权限）实战", content: "<strong>字段权限的 3 种状态：</strong>\n\n\u2022 <strong>可编辑</strong> \u2014 可以查看和修改该字段\n\u2022 <strong>只读</strong> \u2014 可以查看但不能修改\n\u2022 <strong>隐藏</strong> \u2014 完全看不到该字段\n\n<strong>典型场景：</strong>\n\u2022 薪资字段 \u2014 对普通员工隐藏\n\u2022 审批状态 \u2014 对普通用户只读\n\u2022 备注字段 \u2014 对所有人可编辑", highlight: "列权限 = 可编辑 / 只读 / 隐藏" },
      { type: "knowledge", title: "权限交集与并集", content: "<strong>权限计算规则：</strong>\n\n\u2022 <strong>同一角色内</strong>：记录权限和字段权限取<strong>交集</strong>（必须同时满足行和列的权限）\n\u2022 <strong>多个角色之间</strong>：权限取<strong>并集</strong>（拥有所有角色的权限之和）\n\n<strong>示例：</strong>角色 A 可以看字段 X，角色 B 可以看字段 Y，同时拥有 A 和 B 的成员可以看到 X 和 Y。", highlight: "角色内取交集，角色间取并集" }
    ],
    questions: [
      { type: "single", question: "记录权限可以实现以下哪种效果？", options: ["隐藏某些字段", "不同人看到不同行", "控制视图访问", "隐藏数据表"], correctIndex: 1, explanation: "记录权限控制不同角色能看到哪些行。" },
      { type: "match", question: "将字段权限状态与其效果匹配：", pairs: [{ left: "可编辑", right: "可以查看和修改" }, { left: "只读", right: "可以查看但不能修改" }, { left: "隐藏", right: "完全看不到" }] },
      { type: "single", question: "薪资字段对普通员工应该设置什么权限？", options: ["可编辑", "只读", "隐藏", "不设置"], correctIndex: 2, explanation: "薪资是敏感信息，对普通员工应该隐藏。" },
      { type: "truefalse", question: "同一角色内，记录权限和字段权限取并集。", correct: false, explanation: "同一角色内取交集，必须同时满足行和列的权限才能访问。" },
      { type: "single", question: "多个角色之间的权限如何计算？", options: ["取交集", "取并集", "取最低", "随机"], correctIndex: 1, explanation: "多个角色之间的权限取并集。" },
      { type: "single", question: "只看自己负责的记录需要表格中有什么字段？", options: ["文本字段", "人员字段", "数字字段", "日期字段"], correctIndex: 1, explanation: "需要有人员字段来标识负责人，系统才能判断哪些记录属于当前用户。" },
      { type: "truefalse", question: "记录权限可以分别控制查看范围和编辑范围。", correct: true, explanation: "记录权限可以分别设置查看和编辑的范围。" },
      { type: "single", question: "角色 A 可看字段 X，角色 B 可看字段 Y，同时拥有 A 和 B 的成员能看到什么？", options: ["只能看 X", "只能看 Y", "X 和 Y 都能看", "什么都看不到"], correctIndex: 2, explanation: "多角色取并集，所以可以看到 X 和 Y。" },
      { type: "order", question: "请按权限从高到低排列字段权限状态：", items: ["可编辑", "只读", "隐藏"], correctOrder: [0, 1, 2] },
      { type: "single", question: "审批状态字段对普通用户应该设置什么权限？", options: ["可编辑", "只读", "隐藏", "不设置"], correctIndex: 1, explanation: "审批状态由系统或审批人修改，普通用户只需查看，设置为只读。" },
      { type: "single", question: "以下哪种记录权限配置最安全？", options: ["查看全部记录", "只看自己创建的", "按条件筛选", "取决于具体场景"], correctIndex: 3, explanation: "没有绝对最安全的配置，需要根据具体业务场景选择合适的权限。" }
    ]
  },

  { id: "L4-10", title: "毕业挑战：权限方案设计", icon: "award", xpReward: 50,
    cards: [
      { type: "knowledge", title: "综合实战：设计权限方案", content: "<strong>场景：公司项目管理表</strong>\n\n需要满足以下需求：\n\u2022 项目经理 \u2014 可以看到所有项目，编辑所有字段\n\u2022 开发人员 \u2014 只能看到自己参与的项目，不能看到预算字段\n\u2022 客户 \u2014 只能看到自己公司的项目，只能看到进度和状态字段\n\u2022 老板 \u2014 可以看到所有项目和所有字段，但不能编辑\n\n<strong>思考：</strong>需要创建几个角色？每个角色的记录权限和字段权限分别怎么设置？", highlight: "综合运用所学知识，设计完整的权限方案" },
      { type: "knowledge", title: "权限设计最佳实践", content: "<strong>权限设计原则：</strong>\n\n\u2022 <strong>最小权限原则</strong> \u2014 只给必要的权限，不多给\n\u2022 <strong>默认角色从低开始</strong> \u2014 默认角色设为查看者\n\u2022 <strong>先规划再实施</strong> \u2014 先画出角色-权限矩阵，再配置\n\u2022 <strong>定期审查</strong> \u2014 定期检查权限设置是否合理\n\u2022 <strong>测试验证</strong> \u2014 配置完成后用权限预览功能验证效果", highlight: "最小权限 + 先规划 + 定期审查" }
    ],
    questions: [
      { type: "single", question: "最小权限原则是什么意思？", options: ["给最少的人权限", "只给必要的权限，不多给", "不给任何权限", "给最高权限"], correctIndex: 1, explanation: "最小权限原则是只给用户完成工作所必需的权限，不多给。" },
      { type: "match", question: "将角色与其权限需求匹配：", pairs: [{ left: "项目经理", right: "看所有项目，编辑所有字段" }, { left: "开发人员", right: "只看自己参与的项目，隐藏预算" }, { left: "客户", right: "只看自己公司的项目，只看进度和状态" }, { left: "老板", right: "看所有项目和字段，不能编辑" }] },
      { type: "single", question: "上述场景需要创建几个自定义角色？", options: ["2 个", "3 个", "4 个", "5 个"], correctIndex: 2, explanation: "需要 4 个角色：项目经理、开发人员、客户、老板。" },
      { type: "single", question: "开发人员的记录权限应该怎么设置？", options: ["查看全部记录", "只看自己创建的", "只看人员字段包含自己的记录", "隐藏所有记录"], correctIndex: 2, explanation: "开发人员只看自己参与的项目，应设置为只看人员字段包含自己的记录。" },
      { type: "single", question: "老板角色的字段权限应该怎么设置？", options: ["所有字段可编辑", "所有字段只读", "隐藏所有字段", "部分可编辑部分只读"], correctIndex: 1, explanation: "老板可以看到所有字段但不能编辑，所以所有字段设为只读。" },
      { type: "truefalse", question: "配置完权限后应该用权限预览功能验证效果。", correct: true, explanation: "权限预览可以模拟不同角色看到的效果，确保配置正确。" },
      { type: "single", question: "客户角色的预算字段应该设置什么权限？", options: ["可编辑", "只读", "隐藏", "不设置"], correctIndex: 2, explanation: "客户只能看到进度和状态字段，预算字段应该隐藏。" },
      { type: "single", question: "默认角色建议设置为什么？", options: ["项目经理", "编辑者", "查看者", "所有者"], correctIndex: 2, explanation: "建议默认角色设为权限较低的查看者，再根据需要调整。" },
      { type: "order", question: "请按正确顺序排列权限设计步骤：", items: ["分析业务需求", "规划角色和权限矩阵", "在系统中配置角色和权限", "用权限预览验证效果"], correctOrder: [0, 1, 2, 3] },
      { type: "single", question: "如果开发人员同时也是某个项目的项目经理，他的权限会怎样？", options: ["只有开发人员权限", "只有项目经理权限", "两个角色权限的并集", "需要手动选择"], correctIndex: 2, explanation: "多角色取并集，所以他同时拥有开发人员和项目经理的权限。" },
      { type: "truefalse", question: "权限设计完成后就不需要再调整了。", correct: false, explanation: "应该定期审查权限设置是否合理，根据业务变化及时调整。" }
    ]
  }
];

// 导出 L4 课程数据
if (typeof module !== "undefined" && module.exports) {
  module.exports = { l4Nodes };
}

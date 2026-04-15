/**
 * 钉钉 AI 表格学习产品 — L5 专家篇
 * L5 专家篇 8 课（含毕业挑战）
 * 节点顺序：一表一号Agent → 数据连接中心 → 跨表格数据同步 → 仪表盘入门 → 图表配置实战 → 仪表盘AI分析 → 应用模式入门 → 搭建第一个应用
 */

var l5Nodes = [
  { id: "L5-1", title: "一表一号 Agent", icon: "bot", xpReward: 35,
    cards: [
      { type: "knowledge", title: "什么是一表一号 Agent", content: "<strong>一表一号 Agent</strong> 是 AI 表格内置的智能助手，可以通过自然语言与表格数据交互。\n\n<strong>核心能力：</strong>\n\u2022 <strong>自然语言查询</strong> \u2014 用中文提问，AI 自动查询数据\n\u2022 <strong>数据分析</strong> \u2014 自动生成统计、趋势分析\n\u2022 <strong>操作执行</strong> \u2014 通过对话新增、修改记录\n\u2022 <strong>报表生成</strong> \u2014 自动生成数据报告", highlight: "用自然语言与表格数据对话" },
      { type: "knowledge", title: "Agent 的使用场景", content: "<strong>典型场景：</strong>\n\n\u2022 <strong>快速查询</strong> \u2014 \u201c本月销售额最高的前5名是谁？\u201d\n\u2022 <strong>数据录入</strong> \u2014 \u201c帮我新增一条任务：标题是XXX，负责人是XXX\u201d\n\u2022 <strong>批量操作</strong> \u2014 \u201c把所有已过期的任务状态改为已关闭\u201d\n\u2022 <strong>数据分析</strong> \u2014 \u201c按部门统计本季度的项目完成率\u201d", highlight: "查询 + 录入 + 批量操作 + 分析" }
    ],
    questions: [
      { type: "single", question: "一表一号 Agent 的核心交互方式是什么？", options: ["拖拽操作", "自然语言对话", "编写代码", "填写表单"], correctIndex: 1, explanation: "一表一号 Agent 通过自然语言对话与表格数据交互。" },
      { type: "truefalse", question: "一表一号 Agent 只能查询数据，不能修改数据。", correct: false, explanation: "Agent 不仅能查询，还能通过对话新增、修改记录。" },
      { type: "match", question: "将 Agent 能力与示例匹配：", pairs: [{ left: "自然语言查询", right: "本月销售额最高的前5名" }, { left: "数据录入", right: "帮我新增一条任务" }, { left: "批量操作", right: "把已过期任务改为已关闭" }, { left: "数据分析", right: "按部门统计完成率" }] },
      { type: "single", question: "以下哪个不是 Agent 的核心能力？", options: ["自然语言查询", "数据分析", "自动设计表格结构", "操作执行"], correctIndex: 2, explanation: "自动设计表格结构不是 Agent 的核心能力。" },
      { type: "truefalse", question: "Agent 可以自动生成数据报告。", correct: true, explanation: "Agent 支持报表生成，可以自动生成数据报告。" },
      { type: "single", question: "如何让 Agent 帮你查询数据？", options: ["编写 SQL", "用自然语言提问", "手动筛选", "导出数据"], correctIndex: 1, explanation: "直接用中文提问即可，Agent 会自动理解并查询。" },
      { type: "single", question: "Agent 可以执行批量操作吗？", options: ["不可以", "可以，通过自然语言描述批量操作", "只能逐条操作", "需要编写脚本"], correctIndex: 1, explanation: "Agent 支持通过自然语言描述批量操作。" },
      { type: "order", question: "请按正确顺序排列使用 Agent 的步骤：", items: ["打开一表一号 Agent", "用自然语言描述需求", "Agent 理解并执行操作", "确认操作结果"], correctOrder: [0, 1, 2, 3] },
      { type: "single", question: "Agent 最适合什么场景？", options: ["复杂的表格结构设计", "快速查询和操作数据", "管理用户权限", "设计仪表盘样式"], correctIndex: 1, explanation: "Agent 最适合快速查询和操作数据的场景。" },
      { type: "truefalse", question: "使用 Agent 需要学习特殊的查询语法。", correct: false, explanation: "Agent 使用自然语言交互，不需要学习特殊语法。" },
      { type: "single", question: "Agent 生成的数据分析结果可以用于什么？", options: ["只能查看", "可以用于决策参考和报告", "只能导出为PDF", "只能分享给管理员"], correctIndex: 1, explanation: "Agent 生成的分析结果可以用于决策参考和报告。" },
      { type: "single", question: "以下哪种提问方式最适合 Agent？", options: ["查询ID为12345的记录", "本月销售额超过10万的客户有哪些", "SELECT * FROM table", "用正则匹配数据"], correctIndex: 1, explanation: "Agent 使用自然语言，用日常表达提问效果最好。" }
    ]
  },

  { id: "L5-2", title: "数据连接中心", icon: "link", xpReward: 35,
    cards: [
      { type: "knowledge", title: "数据连接中心概述", content: "<strong>数据连接中心</strong>可以将外部数据源连接到 AI 表格。\n\n<strong>支持的数据源：</strong>\n\u2022 <strong>钉钉内部</strong> \u2014 审批数据、考勤数据、日志数据等\n\u2022 <strong>外部数据库</strong> \u2014 MySQL、PostgreSQL 等\n\u2022 <strong>第三方应用</strong> \u2014 通过 API 对接\n\u2022 <strong>Excel/CSV</strong> \u2014 导入外部文件", highlight: "打通数据孤岛，汇聚多源数据" },
      { type: "knowledge", title: "数据同步方式", content: "<strong>同步方式：</strong>\n\n\u2022 <strong>手动同步</strong> \u2014 点击按钮手动拉取最新数据\n\u2022 <strong>定时同步</strong> \u2014 设置定时任务自动同步\n\u2022 <strong>实时同步</strong> \u2014 数据变更时自动同步（部分数据源支持）\n\n<strong>注意：</strong>连接的外部数据在表格中为只读，不能直接编辑。", highlight: "手动 / 定时 / 实时 三种同步方式" }
    ],
    questions: [
      { type: "single", question: "数据连接中心的主要作用是什么？", options: ["美化表格", "将外部数据源连接到 AI 表格", "管理用户权限", "创建自动化"], correctIndex: 1, explanation: "数据连接中心用于将外部数据源连接到 AI 表格。" },
      { type: "truefalse", question: "数据连接中心只支持钉钉内部数据。", correct: false, explanation: "除了钉钉内部数据，还支持外部数据库、第三方应用和 Excel/CSV。" },
      { type: "match", question: "将数据源类型与示例匹配：", pairs: [{ left: "钉钉内部", right: "审批数据、考勤数据" }, { left: "外部数据库", right: "MySQL、PostgreSQL" }, { left: "第三方应用", right: "通过 API 对接" }, { left: "文件导入", right: "Excel、CSV" }] },
      { type: "single", question: "连接的外部数据在表格中是什么状态？", options: ["可以自由编辑", "只读，不能直接编辑", "可以删除但不能修改", "完全不可见"], correctIndex: 1, explanation: "连接的外部数据在表格中为只读。" },
      { type: "truefalse", question: "数据连接中心支持定时自动同步。", correct: true, explanation: "支持手动同步、定时同步和实时同步三种方式。" },
      { type: "single", question: "以下哪些不是数据同步的方式？", options: ["手动同步", "按小时同步", "定时同步", "实时同步"], correctIndex: 3, explanation: "数据连接中心支持手动同步、按小时同步和定时同步三种方式，没有实时同步。" },
      { type: "single", question: "数据连接中心解决了什么问题？", options: ["表格美化", "数据孤岛问题", "权限管理", "公式计算"], correctIndex: 1, explanation: "数据连接中心打通数据孤岛，汇聚多源数据。" },
      { type: "order", question: "请按正确顺序排列数据连接的配置步骤：", items: ["选择数据源类型", "配置连接参数", "选择要同步的数据", "设置同步方式"], correctOrder: [0, 1, 2, 3] },
      { type: "single", question: "钉钉内部可以连接哪些数据？", options: ["只有审批数据", "审批、考勤、日志等多种数据", "只有考勤数据", "只有通讯录"], correctIndex: 1, explanation: "钉钉内部支持连接审批数据、考勤数据、日志数据等多种数据。" },
      { type: "truefalse", question: "所有数据源都支持实时同步。", correct: false, explanation: "实时同步只有部分数据源支持。" },
      { type: "single", question: "如果需要每天自动更新外部数据，应该选择什么同步方式？", options: ["手动同步", "定时同步", "实时同步", "不需要同步"], correctIndex: 1, explanation: "定时同步可以设置每天自动拉取最新数据。" },
      { type: "single", question: "数据连接中心与跨表格数据同步的区别是什么？", options: ["没有区别", "数据连接中心连接外部数据源，跨表格同步在AI表格之间同步", "跨表格同步更强大", "数据连接中心只支持Excel"], correctIndex: 1, explanation: "数据连接中心连接外部数据源到AI表格，跨表格数据同步是在AI表格之间同步数据。" }
    ]
  },

  { id: "L5-3", title: "跨表格数据同步", icon: "refresh-cw", xpReward: 35,
    cards: [
      { type: "knowledge", title: "跨表格数据同步", content: "<strong>跨表格数据同步</strong>可以在不同的 AI 表格文档之间同步数据。\n\n<strong>核心概念：</strong>\n\u2022 <strong>源表格</strong> \u2014 数据的来源表格\n\u2022 <strong>目标表格</strong> \u2014 接收数据的表格\n\u2022 <strong>同步规则</strong> \u2014 定义哪些数据需要同步\n\n<strong>同步方式：</strong>\n\u2022 单向同步：源表格 \u2192 目标表格\n\u2022 支持字段映射：源表格的字段对应目标表格的字段", highlight: "跨文档的数据流转" },
      { type: "knowledge", title: "同步场景与限制", content: "<strong>典型场景：</strong>\n\u2022 总部汇总各分公司的数据\n\u2022 项目数据同步到汇报表\n\u2022 多个团队的数据汇总到管理看板\n\n<strong>注意事项：</strong>\n\u2022 同步的数据在目标表格中为只读\n\u2022 需要对源表格有查看权限\n\u2022 支持设置筛选条件，只同步部分数据", highlight: "汇总 + 汇报 + 管理看板" }
    ],
    questions: [
      { type: "single", question: "跨表格数据同步的方向是什么？", options: ["双向同步", "单向同步：源表格到目标表格", "随机同步", "手动复制"], correctIndex: 1, explanation: "跨表格数据同步是单向的，从源表格同步到目标表格。" },
      { type: "truefalse", question: "同步到目标表格的数据可以直接编辑。", correct: false, explanation: "同步的数据在目标表格中为只读。" },
      { type: "match", question: "将概念与其含义匹配：", pairs: [{ left: "源表格", right: "数据的来源" }, { left: "目标表格", right: "接收数据的表格" }, { left: "同步规则", right: "定义哪些数据需要同步" }, { left: "字段映射", right: "源字段对应目标字段" }] },
      { type: "single", question: "以下哪个是跨表格数据同步的典型场景？", options: ["个人笔记", "总部汇总各分公司的数据", "设计表格样式", "管理用户权限"], correctIndex: 1, explanation: "总部汇总各分公司数据是典型的跨表格同步场景。" },
      { type: "truefalse", question: "跨表格数据同步需要对源表格有查看权限。", correct: true, explanation: "需要对源表格有查看权限才能同步数据。" },
      { type: "single", question: "跨表格同步支持筛选条件吗？", options: ["不支持", "支持，可以只同步部分数据", "只支持全量同步", "只支持按时间筛选"], correctIndex: 1, explanation: "支持设置筛选条件，只同步满足条件的数据。" },
      { type: "single", question: "字段映射的作用是什么？", options: ["删除字段", "将源表格的字段对应到目标表格的字段", "创建新字段", "修改字段类型"], correctIndex: 1, explanation: "字段映射定义源表格的字段如何对应到目标表格的字段。" },
      { type: "order", question: "请按正确顺序排列跨表格同步的配置步骤：", items: ["选择源表格", "设置筛选条件", "配置字段映射", "开始同步"], correctOrder: [0, 1, 2, 3] },
      { type: "single", question: "跨表格同步与数据连接中心的区别是什么？", options: ["没有区别", "跨表格同步在AI表格之间，数据连接中心连接外部数据源", "跨表格同步更快", "数据连接中心只支持钉钉数据"], correctIndex: 1, explanation: "跨表格同步在AI表格文档之间同步，数据连接中心连接外部数据源。" },
      { type: "truefalse", question: "跨表格同步支持双向同步。", correct: false, explanation: "跨表格数据同步是单向的。" },
      { type: "single", question: "多个团队的数据汇总到管理看板属于什么场景？", options: ["数据连接", "跨表格数据同步", "自动化", "高级权限"], correctIndex: 1, explanation: "多个团队的数据汇总到管理看板是典型的跨表格同步场景。" },
      { type: "single", question: "如果源表格的数据更新了，目标表格会怎样？", options: ["不会变化", "自动同步更新", "需要手动复制", "目标表格会被删除"], correctIndex: 1, explanation: "源表格数据更新后，目标表格会自动同步更新。" }
    ]
  },

  { id: "L5-4", title: "仪表盘入门", icon: "bar-chart-2", xpReward: 35,
    cards: [
      { type: "knowledge", title: "仪表盘 \u2014 数据可视化利器", content: "<strong>仪表盘</strong>可以将表格数据转化为直观的图表和报表。\n\n<strong>核心能力：</strong>\n\u2022 支持 <strong>19 种图表组件</strong>（柱状图、折线图、饼图、指标卡等）\n\u2022 支持多个数据源（跨数据表汇总）\n\u2022 支持 <strong>AI 一键生成</strong>仪表盘\n\n<strong>创建方式：</strong>点击左侧边栏的\u201c+\u201d按钮，选择\u201c仪表盘\u201d即可创建。", highlight: "19 种组件 + AI 一键生成" },
      { type: "knowledge", title: "常用图表组件", content: "<strong>数据展示类：</strong>\n\u2022 柱状图、条形图、折线图、面积图\n\u2022 饼图、环形图、漏斗图\n\u2022 散点图、雷达图\n\n<strong>统计指标类：</strong>\n\u2022 指标卡、统计数字、进度图\n\u2022 排行榜、倒计时\n\n<strong>辅助类：</strong>\n\u2022 文本、透视表、视图组件", highlight: "选择合适的图表类型是关键" }
    ],
    questions: [
      { type: "single", question: "仪表盘支持多少种图表组件？", options: ["5 种", "10 种", "19 种", "30 种"], correctIndex: 2, explanation: "仪表盘支持 19 种图表组件。" },
      { type: "truefalse", question: "仪表盘只能使用一个数据表作为数据源。", correct: false, explanation: "仪表盘支持多个数据源，可以跨数据表汇总。" },
      { type: "match", question: "将图表类型与其用途匹配：", pairs: [{ left: "柱状图", right: "对比不同类别的数值" }, { left: "折线图", right: "展示数据趋势变化" }, { left: "饼图", right: "展示占比分布" }, { left: "指标卡", right: "突出显示关键数字" }] },
      { type: "single", question: "如何创建仪表盘？", options: ["在数据表中创建", "点击左侧边栏+按钮选择仪表盘", "通过自动化创建", "导入模板"], correctIndex: 1, explanation: "点击左侧边栏的+按钮，选择仪表盘即可创建。" },
      { type: "truefalse", question: "仪表盘支持 AI 一键生成。", correct: true, explanation: "仪表盘支持 AI 一键生成功能。" },
      { type: "single", question: "展示销售额随时间变化的趋势应该用什么图表？", options: ["饼图", "折线图", "指标卡", "雷达图"], correctIndex: 1, explanation: "折线图最适合展示数据随时间变化的趋势。" },
      { type: "single", question: "展示各部门业绩占比应该用什么图表？", options: ["柱状图", "折线图", "饼图", "散点图"], correctIndex: 2, explanation: "饼图最适合展示占比分布。" },
      { type: "single", question: "指标卡的作用是什么？", options: ["展示趋势", "突出显示关键数字", "展示占比", "展示排名"], correctIndex: 1, explanation: "指标卡用于突出显示关键数字，如总销售额、完成率等。" },
      { type: "order", question: "请按正确顺序排列创建仪表盘的步骤：", items: ["点击+创建仪表盘", "选择数据源", "添加图表组件", "配置图表参数"], correctOrder: [0, 1, 2, 3] },
      { type: "single", question: "透视表组件的作用是什么？", options: ["展示图片", "多维度交叉分析数据", "展示地图", "播放视频"], correctIndex: 1, explanation: "透视表可以进行多维度交叉分析数据。" },
      { type: "truefalse", question: "仪表盘中的图表数据会随表格数据自动更新。", correct: true, explanation: "仪表盘中的图表数据会随表格数据实时更新。" },
      { type: "single", question: "漏斗图最适合展示什么？", options: ["时间趋势", "占比分布", "转化流程（如销售漏斗）", "数据对比"], correctIndex: 2, explanation: "漏斗图最适合展示转化流程，如销售漏斗。" }
    ]
  },

  { id: "L5-5", title: "图表配置实战", icon: "sliders", xpReward: 35,
    cards: [
      { type: "knowledge", title: "图表配置要素", content: "<strong>配置一个图表需要 3 个要素：</strong>\n\n\u2022 <strong>数据源</strong> \u2014 选择哪个数据表的数据\n\u2022 <strong>维度（X 轴）</strong> \u2014 按什么分类（如：部门、月份、状态）\n\u2022 <strong>指标（Y 轴）</strong> \u2014 统计什么数值（如：计数、求和、平均值）\n\n<strong>高级配置：</strong>\n\u2022 筛选条件 \u2014 只展示满足条件的数据\n\u2022 排序方式 \u2014 按指标值升序/降序\n\u2022 颜色分组 \u2014 用不同颜色区分子类别", highlight: "数据源 + 维度 + 指标 = 一个图表" },
      { type: "knowledge", title: "常用统计方式", content: "<strong>指标的统计方式：</strong>\n\n\u2022 <strong>计数</strong> \u2014 统计记录数量\n\u2022 <strong>求和</strong> \u2014 对数值字段求和\n\u2022 <strong>平均值</strong> \u2014 计算平均值\n\u2022 <strong>最大值/最小值</strong> \u2014 找出极值\n\u2022 <strong>去重计数</strong> \u2014 统计不重复的值的数量", highlight: "计数 / 求和 / 平均值 / 最大最小 / 去重" }
    ],
    questions: [
      { type: "single", question: "配置一个图表需要哪 3 个要素？", options: ["标题、颜色、大小", "数据源、维度、指标", "字体、背景、边框", "名称、描述、标签"], correctIndex: 1, explanation: "配置图表需要数据源、维度（X轴）和指标（Y轴）。" },
      { type: "match", question: "将配置要素与其含义匹配：", pairs: [{ left: "数据源", right: "选择哪个数据表" }, { left: "维度（X轴）", right: "按什么分类" }, { left: "指标（Y轴）", right: "统计什么数值" }, { left: "筛选条件", right: "只展示部分数据" }] },
      { type: "single", question: "统计每个部门的人数应该用什么统计方式？", options: ["求和", "计数", "平均值", "最大值"], correctIndex: 1, explanation: "统计人数用计数。" },
      { type: "truefalse", question: "图表的维度就是 X 轴的分类依据。", correct: true, explanation: "维度决定了数据按什么分类展示。" },
      { type: "single", question: "计算每个部门的平均销售额应该用什么统计方式？", options: ["计数", "求和", "平均值", "最小值"], correctIndex: 2, explanation: "计算平均销售额用平均值。" },
      { type: "single", question: "颜色分组的作用是什么？", options: ["美化图表", "用不同颜色区分子类别", "隐藏数据", "排序数据"], correctIndex: 1, explanation: "颜色分组用不同颜色区分子类别，如按产品线分色。" },
      { type: "truefalse", question: "图表支持设置筛选条件，只展示部分数据。", correct: true, explanation: "可以设置筛选条件，只展示满足条件的数据。" },
      { type: "order", question: "请按正确顺序排列图表配置步骤：", items: ["选择图表类型", "选择数据源", "设置维度和指标", "配置筛选和排序"], correctOrder: [0, 1, 2, 3] },
      { type: "single", question: "去重计数的作用是什么？", options: ["统计所有记录数", "统计不重复的值的数量", "删除重复记录", "合并重复数据"], correctIndex: 1, explanation: "去重计数统计不重复的值的数量。" },
      { type: "single", question: "按月份展示销售趋势，维度应该选什么？", options: ["销售额", "月份", "产品名称", "客户名称"], correctIndex: 1, explanation: "维度是分类依据，按月份展示趋势应选月份作为维度。" },
      { type: "match", question: "将统计方式与适用场景匹配：", pairs: [{ left: "计数", right: "统计订单数量" }, { left: "求和", right: "计算总销售额" }, { left: "平均值", right: "计算平均客单价" }, { left: "最大值", right: "找出最高销售额" }] },
      { type: "single", question: "如何让柱状图按销售额从高到低排列？", options: ["修改维度", "设置排序方式为降序", "修改颜色", "修改数据源"], correctIndex: 1, explanation: "设置排序方式为按指标值降序即可。" }
    ]
  },

  { id: "L5-6", title: "仪表盘 AI 分析", icon: "cpu", xpReward: 35,
    cards: [
      { type: "knowledge", title: "AI 一键生成仪表盘", content: "<strong>AI 生成仪表盘：</strong>\n\n\u2022 用自然语言描述需求，AI 自动生成完整仪表盘\n\u2022 示例：\u201c帮我生成一个销售数据分析仪表盘\u201d\n\u2022 AI 会自动选择合适的图表类型和配置\n\n<strong>AI 分析能力：</strong>\n\u2022 自动识别数据特征和趋势\n\u2022 生成数据洞察和建议\n\u2022 支持追问和调整", highlight: "自然语言 \u2192 完整仪表盘" },
      { type: "knowledge", title: "AI 数据洞察", content: "<strong>AI 可以自动发现：</strong>\n\n\u2022 <strong>异常值</strong> \u2014 哪些数据明显偏离正常范围\n\u2022 <strong>趋势变化</strong> \u2014 数据是上升还是下降\n\u2022 <strong>关联关系</strong> \u2014 哪些指标之间有关联\n\u2022 <strong>排名变化</strong> \u2014 各类别的排名变动情况\n\n<strong>使用方式：</strong>在仪表盘中点击 AI 分析按钮，或直接提问。", highlight: "AI 自动发现数据背后的故事" }
    ],
    questions: [
      { type: "single", question: "AI 生成仪表盘的交互方式是什么？", options: ["拖拽组件", "用自然语言描述需求", "编写代码", "选择模板"], correctIndex: 1, explanation: "用自然语言描述需求，AI 自动生成完整仪表盘。" },
      { type: "truefalse", question: "AI 生成的仪表盘不能修改。", correct: false, explanation: "AI 生成的仪表盘可以手动调整和修改。" },
      { type: "match", question: "将 AI 分析能力与其发现匹配：", pairs: [{ left: "异常值检测", right: "数据明显偏离正常范围" }, { left: "趋势分析", right: "数据上升还是下降" }, { left: "关联分析", right: "指标之间的关联关系" }, { left: "排名分析", right: "各类别排名变动" }] },
      { type: "single", question: "AI 数据洞察可以发现什么？", options: ["只能发现错误", "异常值、趋势变化、关联关系等", "只能生成图表", "只能导出数据"], correctIndex: 1, explanation: "AI 可以发现异常值、趋势变化、关联关系、排名变化等。" },
      { type: "truefalse", question: "AI 分析支持追问和调整。", correct: true, explanation: "可以对 AI 的分析结果追问和调整。" },
      { type: "single", question: "如何触发 AI 分析？", options: ["手动计算", "在仪表盘中点击 AI 分析按钮或直接提问", "导出数据后分析", "编写公式"], correctIndex: 1, explanation: "在仪表盘中点击 AI 分析按钮，或直接提问。" },
      { type: "single", question: "AI 生成仪表盘时会自动做什么？", options: ["只创建空白仪表盘", "自动选择合适的图表类型和配置", "只添加标题", "只添加一个图表"], correctIndex: 1, explanation: "AI 会自动选择合适的图表类型和配置。" },
      { type: "order", question: "请按正确顺序排列 AI 生成仪表盘的步骤：", items: ["用自然语言描述需求", "AI 分析数据特征", "AI 选择图表类型", "生成完整仪表盘"], correctOrder: [0, 1, 2, 3] },
      { type: "single", question: "AI 分析发现某月销售额突然下降，这属于什么类型的发现？", options: ["异常值检测", "趋势分析", "关联分析", "排名分析"], correctIndex: 0, explanation: "销售额突然下降属于异常值检测。" },
      { type: "truefalse", question: "AI 只能生成仪表盘，不能分析已有的仪表盘。", correct: false, explanation: "AI 既能生成仪表盘，也能分析已有仪表盘中的数据。" },
      { type: "single", question: "AI 分析的最大优势是什么？", options: ["图表更美观", "自动发现人工难以察觉的数据规律", "运行速度更快", "不需要数据"], correctIndex: 1, explanation: "AI 分析可以自动发现人工难以察觉的数据规律和洞察。" },
      { type: "single", question: "以下哪种描述最适合让 AI 生成仪表盘？", options: ["生成一个图表", "帮我生成一个包含销售趋势、部门对比和关键指标的销售分析仪表盘", "做个报表", "分析数据"], correctIndex: 1, explanation: "描述越具体，AI 生成的仪表盘越符合需求。" }
    ]
  },

  { id: "L5-7", title: "应用模式入门", icon: "layout", xpReward: 35,
    cards: [
      { type: "knowledge", title: "什么是应用模式", content: "<strong>应用模式</strong>可以将 AI 表格转化为一个独立的应用界面。\n\n<strong>与表格模式的区别：</strong>\n\u2022 <strong>表格模式</strong> \u2014 看到的是行列数据，适合数据管理\n\u2022 <strong>应用模式</strong> \u2014 看到的是卡片/列表/看板等界面，适合业务使用\n\n<strong>应用模式的优势：</strong>\n\u2022 更友好的用户界面\n\u2022 可以自定义布局和样式\n\u2022 适合非技术人员使用\n\u2022 可以独立分享", highlight: "表格 \u2192 应用，数据管理 \u2192 业务使用" },
      { type: "knowledge", title: "应用模式的组件", content: "<strong>应用模式支持多种页面组件：</strong>\n\n\u2022 <strong>列表页</strong> \u2014 展示记录列表\n\u2022 <strong>详情页</strong> \u2014 展示单条记录详情\n\u2022 <strong>表单页</strong> \u2014 用于数据录入\n\u2022 <strong>看板页</strong> \u2014 按状态分组展示\n\u2022 <strong>仪表盘页</strong> \u2014 数据可视化展示\n\u2022 <strong>日历页</strong> \u2014 按日期展示", highlight: "列表 + 详情 + 表单 + 看板 + 仪表盘 + 日历" }
    ],
    questions: [
      { type: "single", question: "应用模式与表格模式的核心区别是什么？", options: ["数据不同", "应用模式提供更友好的业务界面", "应用模式数据更多", "没有区别"], correctIndex: 1, explanation: "应用模式提供卡片/列表/看板等更友好的业务界面。" },
      { type: "truefalse", question: "应用模式适合非技术人员使用。", correct: true, explanation: "应用模式界面更友好，适合非技术人员使用。" },
      { type: "match", question: "将页面组件与其用途匹配：", pairs: [{ left: "列表页", right: "展示记录列表" }, { left: "详情页", right: "展示单条记录详情" }, { left: "表单页", right: "数据录入" }, { left: "看板页", right: "按状态分组展示" }] },
      { type: "single", question: "应用模式可以独立分享吗？", options: ["不可以", "可以", "只能分享给管理员", "需要付费"], correctIndex: 1, explanation: "应用模式可以独立分享。" },
      { type: "single", question: "按状态分组展示任务应该用什么页面？", options: ["列表页", "详情页", "表单页", "看板页"], correctIndex: 3, explanation: "看板页按状态分组展示，最适合任务管理。" },
      { type: "truefalse", question: "应用模式的数据和表格模式是同一份数据。", correct: true, explanation: "应用模式和表格模式共享同一份数据，只是展示方式不同。" },
      { type: "single", question: "数据录入应该用什么页面？", options: ["列表页", "详情页", "表单页", "仪表盘页"], correctIndex: 2, explanation: "表单页专门用于数据录入。" },
      { type: "order", question: "请按正确顺序排列搭建应用的步骤：", items: ["创建数据表和字段", "切换到应用模式", "选择页面组件", "配置页面布局和样式"], correctOrder: [0, 1, 2, 3] },
      { type: "single", question: "日历页最适合展示什么类型的数据？", options: ["财务数据", "带日期的任务或日程", "用户列表", "产品目录"], correctIndex: 1, explanation: "日历页按日期展示，最适合任务或日程类数据。" },
      { type: "single", question: "应用模式的最大优势是什么？", options: ["数据更安全", "将数据管理工具转化为业务应用", "运行速度更快", "支持更多字段类型"], correctIndex: 1, explanation: "应用模式将数据管理工具转化为面向业务的应用。" },
      { type: "truefalse", question: "应用模式只支持列表页和详情页两种组件。", correct: false, explanation: "应用模式支持列表页、详情页、表单页、看板页、仪表盘页、日历页等多种组件。" },
      { type: "single", question: "以下哪种场景最适合使用应用模式？", options: ["个人数据分析", "给客户提供一个友好的项目进度查看界面", "临时数据记录", "公式调试"], correctIndex: 1, explanation: "给客户提供友好界面是应用模式的典型场景。" }
    ]
  },

  { id: "L5-8", title: "毕业挑战：搭建第一个应用", icon: "award", xpReward: 60,
    cards: [
      { type: "knowledge", title: "综合实战：搭建项目管理应用", content: "<strong>目标：</strong>搭建一个完整的项目管理应用\n\n<strong>需要用到的能力：</strong>\n\u2022 <strong>数据连接</strong> \u2014 连接钉钉审批数据\n\u2022 <strong>跨表格同步</strong> \u2014 汇总多个团队的数据\n\u2022 <strong>仪表盘</strong> \u2014 创建项目进度看板\n\u2022 <strong>AI 分析</strong> \u2014 自动生成项目报告\n\u2022 <strong>应用模式</strong> \u2014 搭建面向团队的应用界面\n\u2022 <strong>Agent</strong> \u2014 用自然语言查询项目状态", highlight: "综合运用 L5 所有知识" },
      { type: "knowledge", title: "应用搭建最佳实践", content: "<strong>搭建原则：</strong>\n\n\u2022 <strong>先规划后实施</strong> \u2014 先想清楚需要哪些页面和功能\n\u2022 <strong>数据驱动</strong> \u2014 先设计好数据结构，再搭建界面\n\u2022 <strong>用户视角</strong> \u2014 从使用者的角度设计界面\n\u2022 <strong>迭代优化</strong> \u2014 先搭建最小可用版本，再逐步完善\n\u2022 <strong>善用 AI</strong> \u2014 让 AI 帮你加速搭建过程", highlight: "规划 \u2192 数据 \u2192 界面 \u2192 迭代" }
    ],
    questions: [
      { type: "single", question: "搭建应用的第一步应该是什么？", options: ["直接开始搭建", "先规划需要哪些页面和功能", "先选择颜色", "先邀请用户"], correctIndex: 1, explanation: "先规划后实施，想清楚需要哪些页面和功能。" },
      { type: "match", question: "将 L5 能力与其在项目管理应用中的作用匹配：", pairs: [{ left: "数据连接", right: "连接钉钉审批数据" }, { left: "跨表格同步", right: "汇总多个团队数据" }, { left: "仪表盘", right: "创建项目进度看板" }, { left: "应用模式", right: "搭建面向团队的界面" }] },
      { type: "truefalse", question: "搭建应用应该先设计好数据结构，再搭建界面。", correct: true, explanation: "数据驱动原则：先设计好数据结构，再搭建界面。" },
      { type: "single", question: "最小可用版本的意思是什么？", options: ["功能最少的版本", "先搭建核心功能，再逐步完善", "最小的界面", "最少的数据"], correctIndex: 1, explanation: "最小可用版本是先搭建核心功能，确保可用，再逐步完善。" },
      { type: "single", question: "项目进度看板应该用什么来实现？", options: ["纯文本", "仪表盘", "公式", "自动化"], correctIndex: 1, explanation: "仪表盘可以将项目数据可视化，创建进度看板。" },
      { type: "order", question: "请按正确顺序排列搭建应用的步骤：", items: ["规划功能和页面", "设计数据结构", "搭建应用界面", "测试和迭代优化"], correctOrder: [0, 1, 2, 3] },
      { type: "single", question: "如何让团队成员用自然语言查询项目状态？", options: ["编写查询脚本", "使用一表一号 Agent", "导出数据", "手动查询"], correctIndex: 1, explanation: "一表一号 Agent 支持用自然语言查询数据。" },
      { type: "truefalse", question: "搭建应用时应该从使用者的角度设计界面。", correct: true, explanation: "用户视角原则：从使用者的角度设计界面。" },
      { type: "single", question: "汇总多个团队的数据应该用什么功能？", options: ["手动复制", "跨表格数据同步", "公式计算", "自动化"], correctIndex: 1, explanation: "跨表格数据同步可以汇总多个团队的数据。" },
      { type: "single", question: "AI 在应用搭建中可以帮助什么？", options: ["只能生成图表", "加速搭建过程，如AI生成仪表盘、AI分析数据", "只能写公式", "只能发消息"], correctIndex: 1, explanation: "AI 可以帮助生成仪表盘、分析数据等，加速搭建过程。" },
      { type: "match", question: "将搭建原则与其含义匹配：", pairs: [{ left: "先规划后实施", right: "想清楚再动手" }, { left: "数据驱动", right: "先设计数据结构" }, { left: "用户视角", right: "从使用者角度设计" }, { left: "迭代优化", right: "先搭建最小可用版本" }] },
      { type: "single", question: "完成 L5 专家篇后，你掌握了哪些能力？", options: ["只会基础操作", "Agent对话、数据连接、跨表同步、仪表盘、AI分析、应用搭建", "只会创建表格", "只会设置权限"], correctIndex: 1, explanation: "L5 专家篇涵盖了 Agent、数据连接、跨表同步、仪表盘、AI分析和应用搭建等高级能力。" }
    ]
  }
];

// 导出 L5 课程数据
if (typeof module !== "undefined" && module.exports) {
  module.exports = { l5Nodes };
}

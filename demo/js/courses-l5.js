/**
 * 钉钉 AI 表格学习产品 — L5 专家篇
 * L5 专家篇 8 课（含毕业挑战）
 */

const L5_LESSONS = [
  /* ========== L5-1 仪表盘入门 ========== */
  {
    id: 'L5-1',
    title: '仪表盘入门',
    icon: 'bot',
    xpReward: 30,
    cards: [
      {
        type: 'knowledge',
        title: '仪表盘 — 数据可视化利器',
        content: '<strong>仪表盘</strong>可以将表格数据转化为直观的图表和报表。\n\n<strong>核心能力：</strong>\n\u2022 支持 <strong>19 种图表组件</strong>（柱状图、折线图、饼图、指标卡等）\n\u2022 支持多个数据源（跨数据表汇总）\n\u2022 支持 <strong>AI 一键生成</strong>仪表盘\n\n<strong>创建方式：</strong>点击左侧边栏的"+"按钮，选择"仪表盘"即可创建。',
        highlight: '19 种组件 + AI 一键生成'
      },
      {
        type: 'knowledge',
        title: '常用图表组件',
        content: '<strong>数据展示类：</strong>\n\u2022 柱状图、条形图、折线图、面积图\n\u2022 饼图、环形图、漏斗图\n\u2022 散点图、雷达图\n\n<strong>统计指标类：</strong>\n\u2022 指标卡、统计数字、进度图\n\u2022 排行榜、倒计时\n\n<strong>辅助类：</strong>\n\u2022 文本、透视表、视图组件',
        highlight: '选择合适的图表类型是关键'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '仪表盘支持多少种图表组件？',
        options: ['5种', '10种', '19种', '30种'],
        correctIndex: 2,
        explanation: '仪表盘支持 19 种图表组件，涵盖数据展示、统计指标和辅助类组件。'
      },
      {
        type: 'truefalse',
        question: '仪表盘支持 AI 一键生成。',
        correct: true,
        explanation: '可以用 AI 助理描述需求，AI 会自动选择合适的图表类型并生成仪表盘。'
      },
      {
        type: 'single',
        question: '以下哪种不是仪表盘的图表组件？',
        options: ['柱状图', '饼图', '甘特图', '指标卡'],
        correctIndex: 2,
        explanation: '甘特图是视图类型，不是仪表盘组件。仪表盘组件包括柱状图、饼图、指标卡等。'
      },
      {
        type: 'match',
        question: '将图表类型与适用场景匹配：',
        pairs: [
          { left: '柱状图', right: '对比不同类别的数值' },
          { left: '折线图', right: '展示数据随时间的变化趋势' },
          { left: '饼图', right: '展示各部分占总体的比例' },
          { left: '指标卡', right: '突出显示关键数字' }
        ]
      }
    ]
  },

  /* ========== L5-2 图表配置实战 ========== */
  {
    id: 'L5-2',
    title: '图表配置实战',
    icon: 'plug',
    xpReward: 30,
    cards: [
      {
        type: 'knowledge',
        title: 'XY 轴图表配置',
        content: '<strong>柱状图、折线图等 XY 轴图表的配置：</strong>\n\n\u2022 <strong>横轴（X轴）</strong>— 通常是分类字段（如：月份、部门）\n\u2022 <strong>纵轴（Y轴）</strong>— 通常是数值字段（如：销售额、数量）\n\u2022 <strong>分组</strong>— 按字段值分组显示（如：按产品类型分色）\n\u2022 <strong>聚合方式</strong>— 求和、计数、平均值、最大值、最小值等',
        highlight: '横轴放分类，纵轴放数值'
      },
      {
        type: 'knowledge',
        title: '自定义样式',
        content: '<strong>图表样式可以自定义：</strong>\n\n\u2022 颜色主题和配色方案\n\u2022 标签显示（数值、百分比）\n\u2022 图例位置（上方、下方、左侧、右侧）\n\u2022 坐标轴范围和刻度\n\u2022 数据排序方式',
        highlight: '好的图表样式让数据更易读'
      }
    ],
    questions: [
      {
        type: 'single',
        question: 'XY 轴图表中，横轴通常放什么类型的字段？',
        options: ['数值字段', '分类字段', '日期字段', '公式字段'],
        correctIndex: 1,
        explanation: '横轴（X轴）通常放分类字段，如月份、部门、产品类型等。'
      },
      {
        type: 'truefalse',
        question: '图表的聚合方式只支持求和。',
        correct: false,
        explanation: '图表支持多种聚合方式，包括求和、计数、平均值、最大值、最小值等。'
      },
      {
        type: 'single',
        question: '如果要按产品类型分色显示销售数据，应该怎么配置？',
        options: ['设置横轴为产品类型', '设置纵轴为产品类型', '设置分组为产品类型', '设置筛选为产品类型'],
        correctIndex: 2,
        explanation: '使用"分组"功能，按产品类型分组，图表会自动用不同颜色区分不同产品。'
      },
      {
        type: 'match',
        question: '将图表配置项与其作用匹配：',
        pairs: [
          { left: '横轴', right: '设置分类维度' },
          { left: '纵轴', right: '设置数值指标' },
          { left: '分组', right: '按字段值分色显示' },
          { left: '聚合方式', right: '求和/计数/平均值等' }
        ]
      }
    ]
  },

  /* ========== L5-3 仪表盘 AI 分析 ========== */
  {
    id: 'L5-3',
    title: '仪表盘 AI 分析',
    icon: 'refresh-cw',
    xpReward: 30,
    cards: [
      {
        type: 'knowledge',
        title: 'AI 智能分析图表',
        content: '<strong>仪表盘的 AI 分析能力：</strong>\n\n\u2022 <strong>单图表 AI 分析</strong>— 对单个图表进行智能解读，自动发现数据趋势和异常\n\u2022 <strong>AI 智能总结</strong>— 对整个仪表盘进行综合分析，生成数据洞察报告\n\u2022 <strong>定时推送</strong>— 设置定时任务，自动将仪表盘推送给指定人员',
        highlight: 'AI 帮你发现数据中的隐藏规律'
      },
      {
        type: 'knowledge',
        title: '仪表盘分享与推送',
        content: '<strong>分享方式：</strong>\n\u2022 生成分享链接，发送给需要查看的人\n\u2022 支持设置查看权限\n\n<strong>定时推送：</strong>\n\u2022 通过自动化流程定时发送仪表盘\n\u2022 支持推送到钉钉群、个人消息\n\u2022 可以设置推送频率（每天/每周/每月）',
        highlight: '定时推送让数据报告自动送达'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '仪表盘的 AI 智能总结功能可以做什么？',
        options: ['自动创建图表', '对整个仪表盘进行综合分析', '自动修改数据', '自动删除异常数据'],
        correctIndex: 1,
        explanation: 'AI 智能总结可以对整个仪表盘进行综合分析，自动生成数据洞察报告。'
      },
      {
        type: 'truefalse',
        question: '仪表盘支持定时自动推送给指定人员。',
        correct: true,
        explanation: '可以通过自动化流程设置定时推送，将仪表盘自动发送到钉钉群或个人消息。'
      },
      {
        type: 'single',
        question: '以下哪个不是仪表盘定时推送支持的频率？',
        options: ['每天', '每周', '每月', '每小时'],
        correctIndex: 3,
        explanation: '仪表盘定时推送支持每天、每周、每月等频率，不支持每小时推送。'
      },
      {
        type: 'match',
        question: '将仪表盘功能与其作用匹配：',
        pairs: [
          { left: '单图表 AI 分析', right: '解读单个图表的数据趋势' },
          { left: 'AI 智能总结', right: '综合分析整个仪表盘' },
          { left: '定时推送', right: '自动发送数据报告' }
        ]
      }
    ]
  },

  /* ========== L5-4 应用模式入门 ========== */
  {
    id: 'L5-4',
    title: '应用模式入门',
    icon: 'bar-chart-3',
    xpReward: 30,
    cards: [
      {
        type: 'knowledge',
        title: '全新应用模式',
        content: '<strong>应用模式</strong>可以将 AI 表格打造成一个独立的业务应用。\n\n<strong>4 大区域：</strong>\n\u2022 <strong>顶部导航</strong>— 应用名称和全局操作\n\u2022 <strong>左侧菜单</strong>— 页面导航\n\u2022 <strong>内容区域</strong>— 页面主体内容\n\u2022 <strong>右侧面板</strong>— 辅助信息展示\n\n<strong>页面和页面组：</strong>可以创建多个页面，并用页面组进行分类管理。',
        highlight: '应用模式 = 把表格变成业务应用'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '应用模式的界面由几个核心区域组成？',
        options: ['2个', '3个', '4个', '5个'],
        correctIndex: 2,
        explanation: '应用模式界面由顶部导航、左侧菜单、内容区域和右侧面板 4 个核心区域组成。'
      },
      {
        type: 'truefalse',
        question: '应用模式支持创建多个页面并用页面组分类管理。',
        correct: true,
        explanation: '应用模式支持创建多个页面，并可以用页面组进行分类管理，构建完整的应用导航。'
      },
      {
        type: 'single',
        question: '应用模式的本质是什么？',
        options: ['一种新的视图类型', '将 AI 表格打造成独立的业务应用', '一种数据导出方式', '一种权限管理工具'],
        correctIndex: 1,
        explanation: '应用模式可以将 AI 表格打造成一个独立的业务应用，拥有完整的界面和导航。'
      },
      {
        type: 'match',
        question: '将应用模式的区域与其功能匹配：',
        pairs: [
          { left: '顶部导航', right: '应用名称和全局操作' },
          { left: '左侧菜单', right: '页面导航' },
          { left: '内容区域', right: '页面主体内容' },
          { left: '右侧面板', right: '辅助信息展示' }
        ]
      }
    ]
  },

  /* ========== L5-5 搭建第一个应用 ========== */
  {
    id: 'L5-5',
    title: '搭建第一个应用',
    icon: 'settings',
    xpReward: 30,
    cards: [
      {
        type: 'knowledge',
        title: '应用搭建实战',
        content: '<strong>搭建应用的核心步骤：</strong>\n\n\u2022 (1) <strong>添加组件</strong>— 在页面中添加视图、仪表盘、表单等组件\n\u2022 (2) <strong>配置布局</strong>— 调整组件的大小和位置\n\u2022 (3) <strong>设置导航</strong>— 创建页面和页面组，配置左侧菜单\n\u2022 (4) <strong>预览测试</strong>— 在预览模式下测试应用效果\n\u2022 (5) <strong>发布分享</strong>— 发布应用并分享给团队成员',
        highlight: '添加组件 → 配置布局 → 预览 → 发布'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '应用搭建的第一步通常是什么？',
        options: ['发布应用', '添加组件', '设置权限', '创建数据表'],
        correctIndex: 1,
        explanation: '搭建应用的第一步是在页面中添加视图、仪表盘、表单等组件。'
      },
      {
        type: 'truefalse',
        question: '应用搭建完成后需要先预览测试再发布。',
        correct: true,
        explanation: '建议在发布前先在预览模式下测试应用效果，确保一切正常后再发布分享。'
      },
      {
        type: 'order',
        question: '请按正确顺序排列应用搭建步骤：',
        items: ['添加组件', '配置布局', '预览测试', '发布分享'],
        correctOrder: [0, 1, 2, 3]
      },
      {
        type: 'single',
        question: '应用页面中可以添加哪些组件？',
        options: ['只能添加表格视图', '只能添加仪表盘', '视图、仪表盘、表单等多种组件', '只能添加文本'],
        correctIndex: 2,
        explanation: '应用页面支持添加视图、仪表盘、表单等多种组件，灵活组合。'
      }
    ]
  },

  /* ========== L5-6 一表一号 Agent ========== */
  {
    id: 'L5-6',
    title: '一表一号 Agent',
    icon: 'brain',
    xpReward: 30,
    cards: [
      {
        type: 'knowledge',
        title: '一表一号 — 群消息智能收集',
        content: '<strong>一表一号 Agent</strong>可以将 AI 表格变成钉钉群中的智能助理。\n\n<strong>核心能力：</strong>\n\u2022 <strong>群消息收集</strong>— 自动收集群内的消息到表格\n\u2022 <strong>@触发</strong>— @机器人时触发特定操作\n\u2022 <strong>静默收集</strong>— 不打扰群成员，后台自动收集\n\u2022 <strong>正则触发</strong>— 消息匹配特定格式时自动触发',
        highlight: '让钉钉群消息自动流入 AI 表格'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '一表一号 Agent 的核心功能是什么？',
        options: ['发送群消息', '自动收集群消息到表格', '管理群成员', '创建群聊'],
        correctIndex: 1,
        explanation: '一表一号 Agent 可以自动收集钉钉群内的消息到 AI 表格中。'
      },
      {
        type: 'truefalse',
        question: '"静默收集"模式会在群里发送通知消息。',
        correct: false,
        explanation: '静默收集模式不会打扰群成员，在后台自动收集消息，不发送任何通知。'
      },
      {
        type: 'single',
        question: '以下哪种触发方式可以根据消息格式自动触发？',
        options: ['@触发', '静默收集', '正则触发', '定时触发'],
        correctIndex: 2,
        explanation: '正则触发可以根据消息是否匹配特定格式（正则表达式）来自动触发操作。'
      },
      {
        type: 'match',
        question: '将触发方式与其特点匹配：',
        pairs: [
          { left: '@触发', right: '@机器人时触发操作' },
          { left: '静默收集', right: '后台自动收集不打扰' },
          { left: '正则触发', right: '消息匹配特定格式时触发' }
        ]
      }
    ]
  },

  /* ========== L5-7 数据连接中心 ========== */
  {
    id: 'L5-7',
    title: '数据连接中心',
    icon: 'layout-dashboard',
    xpReward: 30,
    cards: [
      {
        type: 'knowledge',
        title: '数据连接中心 — 打通数据孤岛',
        content: '<strong>数据连接中心</strong>可以将外部数据源同步到 AI 表格。\n\n<strong>4 大数据源类型：</strong>\n\u2022 <strong>钉钉生态</strong>— 通讯录、考勤、审批、日程等\n\u2022 <strong>三方平台</strong>— 简道云、金数据、轻流等\n\u2022 <strong>阿里云服务</strong>— 云资源管理、费用管理等\n\u2022 <strong>其他数据源</strong>— 农产品价格等行业数据\n\n<strong>同步标识：</strong>同步的数据会显示闪电标识，表示数据来自外部。\n\n<strong>解除同步：</strong>可以随时解除同步关系，数据会保留但不再自动更新。',
        highlight: '数据连接中心打通钉钉生态和三方平台'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '数据连接中心支持几大类数据源？',
        options: ['2类', '3类', '4类', '6类'],
        correctIndex: 2,
        explanation: '数据连接中心支持钉钉生态、三方平台、阿里云服务和其他数据源共 4 大类。'
      },
      {
        type: 'truefalse',
        question: '解除数据同步后，已同步的数据会被删除。',
        correct: false,
        explanation: '解除同步后，已同步的数据会保留在表格中，但不再自动更新。'
      },
      {
        type: 'single',
        question: '同步的数据在表格中会显示什么标识？',
        options: ['星号标识', '闪电标识', '锁定标识', '云朵标识'],
        correctIndex: 1,
        explanation: '同步的数据会显示闪电标识，表示数据来自外部数据源。'
      },
      {
        type: 'match',
        question: '将数据源类型与示例匹配：',
        pairs: [
          { left: '钉钉生态', right: '通讯录、考勤、审批' },
          { left: '三方平台', right: '简道云、金数据' },
          { left: '阿里云服务', right: '云资源管理、费用管理' }
        ]
      }
    ]
  },

  /* ========== L5-8 跨表格数据同步（毕业挑战） ========== */
  {
    id: 'L5-8',
    title: '跨表格数据同步',
    icon: 'award',
    xpReward: 50,
    isChallenge: true,
    cards: [
      {
        type: 'knowledge',
        title: 'L5 毕业挑战 — 跨表格数据同步',
        content: '<strong>跨表格数据同步</strong>可以在不同的 AI 表格之间同步数据。\n\n<strong>核心特点：</strong>\n\u2022 支持将一个 AI 表格的数据同步到另一个 AI 表格\n\u2022 同步数据量上限为 <strong>20,000 行</strong>\n\u2022 该功能为<strong>企业版专享</strong>功能\n\n<strong>注意：</strong>跨表格同步和数据表内的关联不同，它是在不同 AI 表格文件之间同步数据。',
        highlight: '跨表格同步上限 20,000 行，企业版专享'
      }
    ],
    questions: [
      {
        type: 'single',
        question: '跨表格数据同步的行数上限是多少？',
        options: ['5,000行', '10,000行', '20,000行', '无限制'],
        correctIndex: 2,
        explanation: '跨表格数据同步支持最多 20,000 行数据。'
      },
      {
        type: 'truefalse',
        question: '跨表格数据同步是所有版本都可以使用的功能。',
        correct: false,
        explanation: '跨表格数据同步是企业版专享功能，免费版和标准版不支持。'
      },
      {
        type: 'single',
        question: '跨表格同步和数据表内关联的区别是什么？',
        options: ['没有区别', '跨表格同步是在不同 AI 表格文件之间同步', '关联更强大', '同步更快'],
        correctIndex: 1,
        explanation: '数据表内关联是在同一个 AI 表格内的数据表之间建立关系，跨表格同步是在不同 AI 表格文件之间同步数据。'
      },
      {
        type: 'match',
        question: '将以下概念与其范围匹配：',
        pairs: [
          { left: '单向关联', right: '同一 AI 表格内的数据表之间' },
          { left: '双向关联', right: '同一 AI 表格内的数据表之间' },
          { left: '跨表格同步', right: '不同 AI 表格文件之间' }
        ]
      },
      {
        type: 'single',
        question: '恭喜你完成了全部课程！以下哪项是 AI 表格最强大的能力？',
        options: ['替代 Excel', '数据存储', '将数据、AI、自动化、应用融为一体', '文件管理'],
        correctIndex: 2,
        explanation: 'AI 表格最强大的能力是将数据管理、AI 智能、自动化工作流和应用搭建融为一体，打造完整的业务解决方案。'
      }
    ]
  }
];

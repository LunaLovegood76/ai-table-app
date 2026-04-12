/**
 * 钉钉 AI 表格学习产品 — L3 进阶篇
 * L3 进阶篇 15 课（含毕业挑战）
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
        content: '<strong>AI 字段</strong>是基于 AI 生成内容的特殊字段类型。\n\n<strong>核心能力：</strong>\n\u2022 根据指令和引用其他字段来<strong>自动生成内容</strong>\n\u2022 具有<strong>动态更新</strong>能力 — 引用字段变化时自动重新运行\n\u2022 能分析文档、图片、视频等多种内容\n\n<strong>两种创建方式：</strong>\n\u2022 从 <strong>AI 字段中心</strong>选择预置字段（推荐新手）\n\u2022 基于<strong>自定义指令</strong>创建 AI 字段',
        highlight: 'AI 字段 = 让每一行数据都有专属 AI 助手'
      },
      {
        type: 'knowledge',
        title: 'AI 字段的输出类型',
        content: 'AI 字段支持 <strong>6 种输出类型</strong>：\n\n\u2022 <strong>文本</strong> — 最常用，生成文字描述、摘要等\n\u2022 <strong>数字</strong> — 提取或计算数值\n\u2022 <strong>单选/多选</strong> — 自动分类打标签\n\u2022 <strong>货币</strong> — 提取金额信息\n\u2022 <strong>图片</strong> — AI 生成图片\n\u2022 <strong>视频</strong> — AI 生成视频\n\n选择合适的输出类型，可以让 AI 结果直接参与后续的筛选、排序和统计。',
        highlight: '6 种输出：文本、数字、单选/多选、货币、图片、视频'
      }
    ],
    questions: [
      { type: 'single', question: 'AI 字段的核心能力是什么？', options: ['手动输入数据', '根据指令自动生成内容', '导入 Excel 数据', '发送消息通知'], correctIndex: 1, explanation: 'AI 字段能根据指令和引用其他字段来自动生成内容，是 AI 表格最强大的能力之一。' },
      { type: 'truefalse', question: 'AI 字段在引用的字段内容更新时会自动重新运行。', correct: true, explanation: 'AI 字段具有动态更新能力，当引用的字段发生内容变化时，会自动触发重新运行。' },
      { type: 'single', question: 'AI 字段支持多少种输出类型？', options: ['3 种', '4 种', '6 种', '10 种'], correctIndex: 2, explanation: 'AI 字段支持文本、数字、单选/多选、货币、图片、视频共 6 种输出类型。' },
      { type: 'match', question: '将 AI 字段输出类型与适用场景匹配：', pairs: [{ left: '文本', right: '生成摘要、描述等文字内容' }, { left: '单选/多选', right: '自动分类打标签' }, { left: '数字', right: '提取或计算数值' }, { left: '货币', right: '提取金额信息' }] },
      { type: 'single', question: '以下哪种不是 AI 字段的输出类型？', options: ['文本', '图片', '日期', '货币'], correctIndex: 2, explanation: '日期不是 AI 字段的直接输出类型。如需 AI 生成日期，可使用专门的"AI 生成日期"字段。' },
      { type: 'truefalse', question: 'AI 字段必须引用至少一个同一行的其他字段才能运行。', correct: true, explanation: 'AI 字段必须引用至少一个同一行的其他字段来进行内容生成，且该字段不为空时才能触发运行。' },
      { type: 'single', question: '创建 AI 字段有哪两种方式？', options: ['导入和导出', 'AI 字段中心选择预置字段 或 自定义指令创建', '复制和粘贴', '公式和函数'], correctIndex: 1, explanation: '可以从 AI 字段中心选择预置字段（推荐新手），也可以基于自定义指令创建 AI 字段。' },
      { type: 'single', question: '当 AI 字段运行失败时，可以怎么处理？', options: ['只能删除重建', '在字段菜单中批量重新运行', '必须联系客服', '无法处理'], correctIndex: 1, explanation: '运行失败时，单元格会显示错误图标，可以在字段菜单中对运行失败的 AI 字段批量重新运行。' }
    ]
  },

  /* ========== L3-2 AI 审合同 ========== */
  {
    id: 'L3-2',
    title: 'AI 审合同',
    icon: 'file-check',
    xpReward: 20,
    cards: [
      { type: 'knowledge', title: '用 AI 字段审查合同', content: '<strong>场景：</strong>法务团队需要审查大量合同，逐份阅读耗时巨大。\n\n<strong>解决方案：</strong>\n\u2022 创建一个 AI 字段，引用"合同附件"字段\n\u2022 编写提示词：<em>"请审查该合同，列出以下风险点：付款条款、违约责任、知识产权归属、保密条款"</em>\n\u2022 AI 会自动逐份审查，输出结构化的风险分析报告', highlight: 'AI 审合同 = 批量审查 + 结构化输出' },
      { type: 'knowledge', title: '提示词编写技巧', content: '<strong>好的提示词 = 好的 AI 输出</strong>\n\n<strong>6 大技巧：</strong>\n\u2022 (1) <strong>详尽描述任务</strong> — 提供越多上下文越好\n\u2022 (2) <strong>说明边界</strong> — 明确"做"和"不做"\n\u2022 (3) <strong>加入示例</strong> — 帮助 AI 理解正确格式\n\u2022 (4) <strong>分步骤操作</strong> — 复杂指令拆成多步\n\u2022 (5) <strong>插入字段变量</strong> — 使用"插入字段"功能\n\u2022 (6) <strong>条件逻辑</strong> — 对特定字段存在时输出额外说明', highlight: '提示词越精确，AI 输出越准确' }
    ],
    questions: [
      { type: 'single', question: 'AI 审合同的核心原理是什么？', options: ['手动逐份阅读', '用 AI 字段引用合同附件并编写审查提示词', '导出合同到 Word 审查', '用公式分析合同'], correctIndex: 1, explanation: '创建 AI 字段引用合同附件字段，编写审查提示词，AI 会自动逐份审查并输出结构化报告。' },
      { type: 'truefalse', question: '编写 AI 字段提示词时，越简短越好。', correct: false, explanation: '恰恰相反，提示词应该详尽描述任务和背景信息，提供越多上下文越好。' },
      { type: 'single', question: '以下哪个不是提示词编写的推荐技巧？', options: ['加入示例', '分步骤操作', '使用模糊描述', '插入字段变量'], correctIndex: 2, explanation: '应该使用精确描述而非模糊描述。' },
      { type: 'match', question: '将提示词技巧与其作用匹配：', pairs: [{ left: '加入示例', right: '帮助 AI 理解正确输出格式' }, { left: '说明边界', right: '降低错误输出风险' }, { left: '分步骤操作', right: '确保输出有条理' }, { left: '插入字段变量', right: '引用当前行的字段内容' }] },
      { type: 'single', question: '提示词中的"条件逻辑"是指什么？', options: ['使用 IF 公式', '对特定字段存在时输出额外说明', '设置筛选条件', '创建自动化流程'], correctIndex: 1, explanation: '提示词中可以包含条件逻辑，例如"如果合同金额超过 100 万，请额外分析担保条款"。' },
      { type: 'truefalse', question: 'AI 字段可以分析附件中的文档内容。', correct: true, explanation: 'AI 字段能查看当前记录中的内容，分析相关文档、图片、视频等。' },
      { type: 'single', question: '如何在提示词中引用其他字段的内容？', options: ['直接输入字段名', '使用"插入字段"功能插入字段名字变量', '用 @ 符号', '用 # 符号'], correctIndex: 1, explanation: '应该使用"插入字段"功能来插入字段名字变量。' },
      { type: 'order', question: '请按正确顺序排列 AI 审合同的操作步骤：', items: ['上传合同到附件字段', '创建 AI 字段并引用附件字段', '编写审查提示词', 'AI 自动输出审查报告'], correctOrder: [0, 1, 2, 3] }
    ]
  },

  /* ========== L3-3 AI 识别发票 ========== */
  {
    id: 'L3-3',
    title: 'AI 识别发票',
    icon: 'scan',
    xpReward: 20,
    cards: [
      { type: 'knowledge', title: '多 AI 字段提取发票信息', content: '<strong>场景：</strong>财务需要从大量发票图片中提取关键信息。\n\n<strong>方案：</strong>为同一张发票图片创建多个 AI 字段，分别提取不同信息：\n\u2022 AI 字段 1 → 提取<strong>发票号码</strong>（输出：文本）\n\u2022 AI 字段 2 → 提取<strong>开票金额</strong>（输出：货币）\n\u2022 AI 字段 3 → 提取<strong>开票日期</strong>（输出：文本）\n\u2022 AI 字段 4 → 判断<strong>发票类型</strong>（输出：单选）\n\n每个 AI 字段都引用同一个"发票图片"附件字段。', highlight: '一张图片 + 多个 AI 字段 = 结构化数据提取' }
    ],
    questions: [
      { type: 'single', question: '从发票图片中提取金额信息，AI 字段应选择什么输出类型？', options: ['文本', '数字', '货币', '单选'], correctIndex: 2, explanation: '提取金额信息应选择"货币"输出类型，可以直接参与后续的求和、统计等计算。' },
      { type: 'truefalse', question: '一个附件字段只能被一个 AI 字段引用。', correct: false, explanation: '同一个附件字段可以被多个 AI 字段引用，每个 AI 字段提取不同的信息。' },
      { type: 'single', question: '判断发票类型（增值税专票/普票），AI 字段应选择什么输出类型？', options: ['文本', '数字', '单选', '货币'], correctIndex: 2, explanation: '发票类型是固定的几种分类，选择"单选"输出类型最合适。' },
      { type: 'match', question: '将发票信息与推荐的 AI 字段输出类型匹配：', pairs: [{ left: '发票号码', right: '文本' }, { left: '开票金额', right: '货币' }, { left: '发票类型', right: '单选' }, { left: '税率', right: '数字' }] },
      { type: 'single', question: '为什么要用多个 AI 字段而不是一个？', options: ['一个 AI 字段无法处理图片', '多个字段可以分别设置不同的输出类型，便于后续统计', '系统限制只能用多个', '没有区别'], correctIndex: 1, explanation: '多个 AI 字段可以分别设置不同的输出类型，让提取的数据直接参与筛选、排序和统计。' },
      { type: 'truefalse', question: 'AI 字段可以识别图片中的文字信息。', correct: true, explanation: 'AI 字段能分析图片内容，包括识别图片中的文字、数字等信息。' },
      { type: 'single', question: 'AI 字段批量运行时，免费版和付费版有什么区别？', options: ['没有区别', '免费版不能批量运行', '免费版进入共享通道排队，付费版进入专享高速通道', '付费版不需要排队'], correctIndex: 2, explanation: '免费版用户进入共享通道排队，企业版和旗舰版用户进入专享高速通道。' },
      { type: 'single', question: '如何将 AI 字段还原为普通字段？', options: ['删除后重建', '双击字段标题，点击右上角图标选择"切换回常规字段"', '无法还原', '联系管理员'], correctIndex: 1, explanation: '双击字段标题，在字段设置弹窗中点击右上角图标，选择"切换回常规字段"即可还原。' }
    ]
  },

  /* ========== L3-4 AI 听记总结 ========== */
  {
    id: 'L3-4',
    title: 'AI 听记总结',
    icon: 'mic',
    xpReward: 20,
    cards: [
      { type: 'knowledge', title: 'AI 听记总结 — 会议纪要自动生成', content: '<strong>AI 听记总结</strong>能自动提取钉钉"AI 听记"中的会议录音，智能生成摘要。\n\n<strong>适用场景：</strong>\n\u2022 会议纪要归档\n\u2022 访谈记录整理\n\u2022 培训内容总结\n\n<strong>使用方式：</strong>只需填入一个 AI 听记的分享链接，AI 就能把长达一小时的会议浓缩成几百字的核心要点。', highlight: '一个链接 → AI 自动生成会议摘要' },
      { type: 'knowledge', title: '配置与使用', content: '<strong>添加步骤：</strong>\n\u2022 (1) 点击 + 添加字段\n\u2022 (2) 在"AI 字段"分组中选择 <strong>AI 听记总结</strong>\n\u2022 (3) 选择一个<strong>链接字段</strong>作为听记链接来源\n\u2022 (4) 可勾选<strong>自动更新</strong>，链接变化时自动重新生成\n\n<strong>注意事项：</strong>\n\u2022 来源字段必须填写钉钉 AI 听记的官方分享链接\n\u2022 操作者必须对该听记链接拥有访问权限\n\u2022 其他平台的链接暂不支持', highlight: '仅支持钉钉 AI 听记的分享链接' }
    ],
    questions: [
      { type: 'single', question: 'AI 听记总结字段的数据来源是什么？', options: ['手动输入文字', '上传音频文件', '钉钉 AI 听记的分享链接', '录音转文字'], correctIndex: 2, explanation: 'AI 听记总结需要填入钉钉 AI 听记的官方分享链接。' },
      { type: 'truefalse', question: 'AI 听记总结支持其他平台（如腾讯会议）的录音链接。', correct: false, explanation: '目前仅支持钉钉 AI 听记的分享链接。' },
      { type: 'single', question: '配置 AI 听记总结时，需要选择什么类型的字段作为来源？', options: ['文本字段', '附件字段', '链接字段', '数字字段'], correctIndex: 2, explanation: '需要选择一个链接字段作为听记链接的来源。' },
      { type: 'truefalse', question: '勾选"自动更新"后，当听记内容更新时摘要会自动重新生成。', correct: true, explanation: '勾选自动更新后，链接变化或听记内容更新时，摘要会自动重新生成。' },
      { type: 'single', question: '如果操作者没有听记链接的访问权限，AI 能生成总结吗？', options: ['可以，AI 有特殊权限', '不能，操作者必须有访问权限', '可以，但内容不完整', '需要管理员授权'], correctIndex: 1, explanation: '操作表格的用户必须对该 AI 听记链接拥有访问权限。' },
      { type: 'match', question: '将 AI 听记总结的配置项与其作用匹配：', pairs: [{ left: '字段名称', right: '自定义该列的标题' }, { left: '选择听记链接字段', right: '指定链接来源' }, { left: '自动更新', right: '链接变化时自动重新生成' }] },
      { type: 'single', question: '"允许引用字段为空"选项的作用是什么？', options: ['允许 AI 自动填充', '来源为空时保持空白而不报错', '允许删除链接', '允许多个链接'], correctIndex: 1, explanation: '勾选后，如果来源单元格没有填入链接，AI 字段会保持空白而不会报错。' },
      { type: 'single', question: '以下哪个不是 AI 听记总结的适用场景？', options: ['会议纪要归档', '访谈记录整理', '实时语音翻译', '培训内容总结'], correctIndex: 2, explanation: 'AI 听记总结用于事后生成摘要，不支持实时语音翻译。' }
    ]
  },

  /* ========== L3-5 AI 听记信息提取 ========== */
  {
    id: 'L3-5',
    title: 'AI 听记信息提取',
    icon: 'list-checks',
    xpReward: 20,
    cards: [
      { type: 'knowledge', title: 'AI 听记信息提取 — 精准抓取关键信息', content: '如果 AI 听记总结不够精准，<strong>AI 听记信息提取</strong>可以从听记中提取<strong>特定信息</strong>。\n\n<strong>可提取的信息类型：</strong>\n\u2022 <strong>待办事项</strong> — 会议中提到的行动项\n\u2022 <strong>人名</strong> — 参会人员和提及的人\n\u2022 <strong>日期</strong> — 提到的截止时间、里程碑\n\u2022 <strong>决策结论</strong> — 会议达成的共识\n\u2022 <strong>数据指标</strong> — 提到的数字和指标\n\n与"AI 听记总结"的区别：总结是生成概要，信息提取是精准抓取特定字段。', highlight: '总结 = 概要 | 信息提取 = 精准抓取' }
    ],
    questions: [
      { type: 'single', question: 'AI 听记信息提取和 AI 听记总结的区别是什么？', options: ['没有区别', '总结生成概要，信息提取精准抓取特定字段', '信息提取更快', '总结更准确'], correctIndex: 1, explanation: 'AI 听记总结生成整体概要，AI 听记信息提取则精准抓取特定信息。' },
      { type: 'truefalse', question: 'AI 听记信息提取可以从会议录音中提取待办事项。', correct: true, explanation: 'AI 听记信息提取可以从听记中提取待办事项、人名、日期、决策结论等。' },
      { type: 'match', question: '将可提取的信息类型与示例匹配：', pairs: [{ left: '待办事项', right: '下周完成方案初稿' }, { left: '人名', right: '张经理、李总' }, { left: '日期', right: '下周五截止' }, { left: '决策结论', right: '确定采用方案 B' }] },
      { type: 'single', question: '以下哪种场景更适合用"AI 听记信息提取"？', options: ['了解会议大致内容', '提取会议中提到的所有截止日期', '生成会议纪要', '分享会议概要'], correctIndex: 1, explanation: '需要精准提取特定信息时，应使用 AI 听记信息提取。' },
      { type: 'truefalse', question: 'AI 听记信息提取和 AI 听记总结使用的数据来源相同。', correct: true, explanation: '两者都使用钉钉 AI 听记的分享链接作为数据来源。' },
      { type: 'single', question: '如果想同时获取会议总结和待办事项，应该怎么做？', options: ['只用一个 AI 字段', '分别创建 AI 听记总结和 AI 听记信息提取两个字段', '手动整理', '无法实现'], correctIndex: 1, explanation: '可以为同一个听记链接创建多个 AI 字段。' },
      { type: 'single', question: 'AI 听记信息提取可以提取以下哪种信息？', options: ['参会人的表情', '会议中提到的数据指标', '参会人的心情', '会议室的温度'], correctIndex: 1, explanation: 'AI 听记信息提取可以提取待办事项、人名、日期、决策结论、数据指标等。' },
      { type: 'single', question: '以下哪个说法是正确的？', options: ['信息提取只能提取一种类型的信息', '信息提取可以根据提示词提取多种类型的信息', '信息提取不需要链接字段', '信息提取只支持文本输出'], correctIndex: 1, explanation: '通过编写不同的提示词，AI 听记信息提取可以提取多种类型的信息。' }
    ]
  },

  /* ========== L3-6 AI 生成日期 ========== */
  {
    id: 'L3-6',
    title: 'AI 生成日期',
    icon: 'calendar-clock',
    xpReward: 20,
    cards: [
      { type: 'knowledge', title: 'AI 生成日期 — 让表格读懂文字中的时间', content: '<strong>AI 生成日期</strong>能从文本中智能提取或推算日期。\n\n<strong>三种能力：</strong>\n\u2022 <strong>识别明确日期</strong> — "2025年10月1日" → 2025/10/01\n\u2022 <strong>理解口语时间</strong> — "下周五"、"月底" → 自动计算具体日期\n\u2022 <strong>推算日期</strong> — "生效后30天" → 自动计算截止日期\n\n<strong>三步上手：</strong>\n\u2022 (1) 添加 AI 生成日期字段\n\u2022 (2) 选择包含日期信息的文字列\n\u2022 (3) 编写提示词告诉 AI 找什么日期', highlight: '文字变日期：明确日期 + 口语时间 + 推算日期' },
      { type: 'comparison', title: '传统方式 vs AI 生成日期', headers: ['场景', '传统方式', 'AI 生成日期'], rows: [['"客户说下周五再联系"', '掏出日历查下周五是几号', '自动填入具体日期'], ['"合同有效期一年"', '心算加一年', '自动计算到期日'], ['"截止时间：Oct 15th"', '手动改成统一格式', '自动转换为标准日期']] }
    ],
    questions: [
      { type: 'single', question: 'AI 生成日期字段可以处理以下哪种文本？', options: ['只能处理标准日期格式', '只能处理中文日期', '能处理口语化时间如"下周五"、"月底"', '只能处理英文日期'], correctIndex: 2, explanation: 'AI 生成日期能理解口语化时间并自动计算具体日期。' },
      { type: 'truefalse', question: 'AI 生成日期可以根据"合同生效后30天"自动计算截止日期。', correct: true, explanation: 'AI 生成日期支持推算日期，能根据条件逻辑自动计算出具体日期。' },
      { type: 'single', question: '配置 AI 生成日期时，第二步需要做什么？', options: ['编写提示词', '选择包含日期信息的文字列', '设置日期格式', '选择时区'], correctIndex: 1, explanation: '第二步是告诉 AI 看哪里 — 选择包含日期信息的文字列。' },
      { type: 'match', question: '将文本内容与 AI 生成日期的处理能力匹配：', pairs: [{ left: '"2025年10月1日"', right: '识别明确日期' }, { left: '"下周五再联系"', right: '理解口语时间' }, { left: '"生效后30天"', right: '推算日期' }, { left: '"Oct 15th"', right: '识别明确日期' }] },
      { type: 'single', question: '如果一段话里有两个日期，AI 会怎么处理？', options: ['随机选一个', '两个都提取', '取决于提示词的指令', '报错'], correctIndex: 2, explanation: '取决于提示词。可以写"提取最早的日期"或"提取截止日期"来指定。' },
      { type: 'truefalse', question: 'AI 生成日期的结果可以用来设置自动化提醒。', correct: true, explanation: 'AI 填好的日期和普通日期字段一样，可以用来设置日历视图、甘特图或自动化提醒。' },
      { type: 'single', question: '如果 AI 填的日期不对，最可能的原因是什么？', options: ['AI 版本太低', '原文本含糊不清或提示词不够精确', '网络问题', '字段类型错误'], correctIndex: 1, explanation: '日期不对通常是因为原文本含糊不清，可以尝试优化提示词。' },
      { type: 'order', question: '请按正确顺序排列 AI 生成日期的配置步骤：', items: ['添加 AI 生成日期字段', '选择包含日期信息的文字列', '编写提示词告诉 AI 找什么日期', 'AI 自动填入标准日期'], correctOrder: [0, 1, 2, 3] }
    ]
  },

  /* ========== L3-7 AI 助理 ========== */
  {
    id: 'L3-7',
    title: 'AI 助理',
    icon: 'bot',
    xpReward: 20,
    cards: [
      { type: 'knowledge', title: 'AI 助理 — 你的智能搭档', content: '<strong>AI 助理</strong>是 AI 表格内置的对话式智能助手。\n\n<strong>核心能力：</strong>\n\u2022 <strong>自然语言操作</strong> — 用中文描述需求，AI 自动执行\n\u2022 <strong>数据分析</strong> — "帮我统计本月销售额最高的产品"\n\u2022 <strong>生成公式</strong> — "帮我写一个计算环比增长率的公式"\n\u2022 <strong>创建视图</strong> — "帮我创建一个按部门分组的看板视图"\n\u2022 <strong>生成仪表盘</strong> — "帮我做一个销售数据的可视化报表"\n\n<strong>唤起方式：</strong>点击右下角的 AI 助理按钮即可开始对话。', highlight: 'AI 助理 = 用说话的方式操作表格' }
    ],
    questions: [
      { type: 'single', question: 'AI 助理的核心特点是什么？', options: ['只能查看数据', '用自然语言描述需求，AI 自动执行', '只能生成公式', '只能创建视图'], correctIndex: 1, explanation: 'AI 助理支持用自然语言描述需求，AI 会自动理解并执行。' },
      { type: 'truefalse', question: 'AI 助理可以帮你生成仪表盘。', correct: true, explanation: 'AI 助理可以根据自然语言描述生成仪表盘。' },
      { type: 'match', question: '将 AI 助理的能力与示例指令匹配：', pairs: [{ left: '数据分析', right: '统计本月销售额最高的产品' }, { left: '生成公式', right: '写一个计算环比增长率的公式' }, { left: '创建视图', right: '创建按部门分组的看板视图' }, { left: '生成仪表盘', right: '做一个销售数据的可视化报表' }] },
      { type: 'single', question: '如何唤起 AI 助理？', options: ['按快捷键 Ctrl+A', '点击右下角的 AI 助理按钮', '双击表格标题', '在地址栏输入命令'], correctIndex: 1, explanation: '点击右下角的 AI 助理按钮即可开始对话。' },
      { type: 'truefalse', question: 'AI 助理只能回答问题，不能直接修改表格数据。', correct: false, explanation: 'AI 助理不仅能回答问题，还能直接执行操作。' },
      { type: 'single', question: '以下哪个不是 AI 助理的能力？', options: ['数据分析', '生成公式', '自动发送邮件', '创建视图'], correctIndex: 2, explanation: '自动发送邮件是自动化工作流的能力，不是 AI 助理的直接功能。' },
      { type: 'single', question: 'AI 助理和 AI 字段的区别是什么？', options: ['没有区别', 'AI 助理是对话式交互，AI 字段是自动化批量处理', 'AI 字段更智能', 'AI 助理只能用一次'], correctIndex: 1, explanation: 'AI 助理是对话式交互，适合一次性操作；AI 字段是自动化批量处理。' },
      { type: 'single', question: '以下哪种场景最适合使用 AI 助理？', options: ['每行数据都需要 AI 分析', '临时查询"本月销售总额是多少"', '每行发票都需要提取金额', '每行合同都需要审查'], correctIndex: 1, explanation: '临时性的查询和操作适合用 AI 助理，批量处理每行数据则适合用 AI 字段。' }
    ]
  },

  /* ========== L3-8 AI 生成公式 ========== */
  {
    id: 'L3-8',
    title: 'AI 生成公式',
    icon: 'wand',
    xpReward: 20,
    cards: [
      { type: 'knowledge', title: '用自然语言生成公式', content: '不会写公式？让 AI 帮你写。\n\n<strong>使用方式：</strong>\n\u2022 在公式字段中点击 <strong>AI 生成</strong>按钮\n\u2022 用自然语言描述需求，如："计算每个订单的利润率"\n\u2022 AI 会自动生成对应的公式\n\n<strong>适用场景：</strong>\n\u2022 不熟悉公式语法的新手\n\u2022 复杂的多条件计算\n\u2022 需要快速验证计算逻辑', highlight: '描述需求 → AI 自动生成公式' }
    ],
    questions: [
      { type: 'single', question: 'AI 生成公式的入口在哪里？', options: ['AI 助理对话框', '公式字段中的 AI 生成按钮', '设置菜单', '右键菜单'], correctIndex: 1, explanation: '在公式字段中点击 AI 生成按钮即可。' },
      { type: 'truefalse', question: '使用 AI 生成公式需要先学会公式语法。', correct: false, explanation: 'AI 生成公式的核心价值就是让不会写公式的人也能通过自然语言描述来生成公式。' },
      { type: 'single', question: '以下哪种描述最适合用来让 AI 生成公式？', options: ['SUM(利润)', '计算每个订单的利润率，利润率=利润/收入*100%', '公式', '算一下'], correctIndex: 1, explanation: '描述越具体越好，包含计算逻辑和字段名称。' },
      { type: 'match', question: '将自然语言描述与适用场景匹配：', pairs: [{ left: '"计算环比增长率"', right: '复杂的多条件计算' }, { left: '"如果状态是已完成就显示绿色"', right: '条件判断' }, { left: '"统计每个部门的人数"', right: '聚合统计' }] },
      { type: 'truefalse', question: 'AI 生成的公式可以直接使用，不需要检查。', correct: false, explanation: 'AI 生成的公式建议检查一下是否符合预期。' },
      { type: 'single', question: 'AI 生成公式和 AI 字段有什么区别？', options: ['没有区别', 'AI 生成公式是帮你写公式代码，AI 字段是 AI 直接生成内容', 'AI 字段更快', 'AI 生成公式更准确'], correctIndex: 1, explanation: 'AI 生成公式是帮你编写公式代码（结果确定性高），AI 字段是 AI 直接生成内容（结果有一定随机性）。' },
      { type: 'single', question: '以下哪种场景不适合用 AI 生成公式？', options: ['计算利润率', '生成合同摘要', '统计部门人数', '计算日期差'], correctIndex: 1, explanation: '生成合同摘要需要 AI 理解文本内容，应该用 AI 字段。' },
      { type: 'single', question: 'AI 生成公式最大的优势是什么？', options: ['速度快', '降低公式使用门槛，不会写公式也能用', '不需要字段', '自动更新'], correctIndex: 1, explanation: 'AI 生成公式最大的优势是降低使用门槛。' }
    ]
  },

  /* ========== L3-9 公式字段入门 ========== */
  {
    id: 'L3-9',
    title: '公式字段入门',
    icon: 'sigma',
    xpReward: 20,
    cards: [
      { type: 'knowledge', title: '公式字段基础语法', content: '<strong>公式字段</strong>可以对同一行的其他字段进行计算。\n\n<strong>基础语法：</strong>\n\u2022 引用字段：<code>{字段名}</code>\n\u2022 四则运算：<code>+</code> <code>-</code> <code>*</code> <code>/</code>\n\u2022 字符串拼接：<code>{姓} & {名}</code>\n\u2022 条件判断：<code>IF({分数}>=60, "及格", "不及格")</code>\n\n<strong>注意：</strong>公式字段是只读的，结果由公式自动计算，不能手动编辑。', highlight: '公式 = 自动计算，结果只读' },
      { type: 'knowledge', title: '常用函数速览', content: '<strong>数学函数：</strong>SUM、AVERAGE、MAX / MIN、ROUND\n\n<strong>文本函数：</strong>LEN、LEFT / RIGHT / MID、CONCATENATE\n\n<strong>日期函数：</strong>TODAY、YEAR / MONTH / DAY、DATETIME_DIFF', highlight: '数学 + 文本 + 日期 = 三大函数类别' }
    ],
    questions: [
      { type: 'single', question: '公式中如何引用其他字段？', options: ['直接写字段名', '用 {字段名} 花括号包裹', '用 [字段名] 方括号包裹', '用 @字段名'], correctIndex: 1, explanation: '公式中引用字段使用花括号语法：{字段名}。' },
      { type: 'truefalse', question: '公式字段的结果可以手动修改。', correct: false, explanation: '公式字段是只读的，结果由公式自动计算。' },
      { type: 'single', question: '以下哪个公式可以实现条件判断？', options: ['SUM({分数})', 'IF({分数}>=60, "及格", "不及格")', 'MAX({分数})', 'LEN({分数})'], correctIndex: 1, explanation: 'IF 函数用于条件判断。' },
      { type: 'match', question: '将函数与其功能匹配：', pairs: [{ left: 'SUM', right: '求和' }, { left: 'LEN', right: '文本长度' }, { left: 'TODAY', right: '今天日期' }, { left: 'ROUND', right: '四舍五入' }] },
      { type: 'single', question: '字符串拼接使用什么运算符？', options: ['+', '&', '*', '||'], correctIndex: 1, explanation: '字符串拼接使用 & 运算符。' },
      { type: 'single', question: '计算两个日期之间的天数差，应该用什么函数？', options: ['DAY', 'DATETIME_DIFF', 'TODAY', 'MONTH'], correctIndex: 1, explanation: 'DATETIME_DIFF 函数用于计算两个日期之间的差值。' },
      { type: 'truefalse', question: 'AVERAGE 函数可以计算一组数字的平均值。', correct: true, explanation: 'AVERAGE 函数用于计算平均值。' },
      { type: 'single', question: '以下哪个不是文本处理函数？', options: ['LEN', 'LEFT', 'SUM', 'MID'], correctIndex: 2, explanation: 'SUM 是数学函数（求和），不是文本处理函数。' }
    ]
  },

  /* ========== L3-10 函数实践 ========== */
  {
    id: 'L3-10',
    title: '函数实践',
    icon: 'code',
    xpReward: 20,
    cards: [
      { type: 'knowledge', title: '实用函数案例', content: '<strong>案例 1：计算工龄</strong>\n<code>DATETIME_DIFF(TODAY(), {入职日期}, "years")</code>\n\n<strong>案例 2：自动生成编号</strong>\n<code>"PRJ-" & {自动编号}</code>\n\n<strong>案例 3：条件标记</strong>\n<code>IF({进度}=100, "已完成", IF({进度}>50, "进行中", "待开始"))</code>', highlight: '嵌套 IF = 多条件判断' },
      { type: 'knowledge', title: '文本处理函数', content: '<strong>案例 4：提取手机号前三位</strong>\n<code>LEFT({手机号}, 3)</code>\n\n<strong>案例 5：隐藏手机号中间四位</strong>\n<code>LEFT({手机号}, 3) & "****" & RIGHT({手机号}, 4)</code>\n\n<strong>案例 6：判断文本是否包含关键词</strong>\n<code>IF(FIND("紧急", {标题}) > 0, "紧急", "普通")</code>', highlight: 'LEFT + RIGHT + & = 文本拼接利器' }
    ],
    questions: [
      { type: 'single', question: '计算员工工龄应该用什么函数？', options: ['SUM', 'DATETIME_DIFF', 'AVERAGE', 'COUNT'], correctIndex: 1, explanation: '使用 DATETIME_DIFF(TODAY(), {入职日期}, "years") 可以计算工龄。' },
      { type: 'truefalse', question: 'IF 函数可以嵌套使用，实现多条件判断。', correct: true, explanation: 'IF 函数可以嵌套，如 IF(条件1, 值1, IF(条件2, 值2, 值3))。' },
      { type: 'single', question: '提取手机号后四位应该用什么函数？', options: ['LEFT({手机号}, 4)', 'RIGHT({手机号}, 4)', 'MID({手机号}, 4)', 'LEN({手机号})'], correctIndex: 1, explanation: 'RIGHT 函数从右侧截取指定长度的文本。' },
      { type: 'match', question: '将公式与其功能匹配：', pairs: [{ left: 'LEFT({手机号}, 3)', right: '提取前三位' }, { left: 'RIGHT({手机号}, 4)', right: '提取后四位' }, { left: 'LEN({文本})', right: '计算文本长度' }, { left: 'FIND("紧急", {标题})', right: '查找关键词位置' }] },
      { type: 'single', question: '隐藏手机号中间四位的公式是什么？', options: ['LEFT({手机号}, 3) & "****" & RIGHT({手机号}, 4)', 'MID({手机号}, 4, 4)', 'REPLACE({手机号}, 4, 4, "****")', 'LEN({手机号})'], correctIndex: 0, explanation: '用 LEFT 取前三位 + "****" + RIGHT 取后四位。' },
      { type: 'truefalse', question: 'FIND 函数找不到关键词时会返回 0。', correct: true, explanation: 'FIND 函数在找不到目标文本时返回 0。' },
      { type: 'single', question: '以下哪个公式可以自动生成"PRJ-001"格式的编号？', options: ['SUM("PRJ-", {编号})', '"PRJ-" & {自动编号}', 'IF("PRJ", {编号})', 'LEFT("PRJ", {编号})'], correctIndex: 1, explanation: '使用 & 运算符拼接固定前缀和自动编号字段。' },
      { type: 'single', question: 'IF({进度}=100, "已完成", IF({进度}>50, "进行中", "待开始")) 中，进度为 30 时结果是什么？', options: ['已完成', '进行中', '待开始', '报错'], correctIndex: 2, explanation: '进度 30 不满足 =100，也不满足 >50，所以走到最后的"待开始"。' }
    ]
  },

  /* ========== L3-11 公式排错 ========== */
  {
    id: 'L3-11',
    title: '公式排错',
    icon: 'bug',
    xpReward: 20,
    cards: [
      { type: 'knowledge', title: '常见公式错误代码', content: 'AI 表格公式出错时会显示错误代码：\n\n\u2022 <strong>#ERROR</strong> — 通用错误\n\u2022 <strong>#VALUE</strong> — 值类型不匹配\n\u2022 <strong>#DIV/0</strong> — 除以零\n\u2022 <strong>#REF</strong> — 引用无效\n\u2022 <strong>#NAME</strong> — 函数名拼写错误\n\u2022 <strong>#NULL</strong> — 空值错误\n\u2022 <strong>#NUM</strong> — 数值超出范围\n\u2022 <strong>#TYPE</strong> — 参数类型错误', highlight: '看懂错误代码 = 快速定位问题' },
      { type: 'knowledge', title: '排错技巧', content: '<strong>排错三步法：</strong>\n\u2022 (1) <strong>看错误代码</strong> — 确定错误类型\n\u2022 (2) <strong>检查引用字段</strong> — 字段名是否正确、字段是否存在\n\u2022 (3) <strong>简化公式</strong> — 把复杂公式拆成小段逐一测试\n\n<strong>常见坑：</strong>\n\u2022 字段名包含空格或特殊字符\n\u2022 日期字段和文本字段混用\n\u2022 除法运算未处理分母为零的情况', highlight: '看代码 → 查引用 → 简化测试' }
    ],
    questions: [
      { type: 'single', question: '#DIV/0 错误表示什么？', options: ['函数名拼写错误', '除以零', '引用无效', '值类型不匹配'], correctIndex: 1, explanation: '#DIV/0 表示公式中出现了除以零的情况。' },
      { type: 'truefalse', question: '#NAME 错误通常是因为函数名拼写错误。', correct: true, explanation: '#NAME 错误表示公式中使用了系统无法识别的函数名，通常是拼写错误。' },
      { type: 'single', question: '公式排错的第一步应该做什么？', options: ['删除公式重写', '看错误代码确定错误类型', '联系客服', '换一个函数'], correctIndex: 1, explanation: '排错第一步是看错误代码，确定错误类型，然后有针对性地修复。' },
      { type: 'match', question: '将错误代码与其含义匹配：', pairs: [{ left: '#DIV/0', right: '除以零' }, { left: '#REF', right: '引用无效' }, { left: '#NAME', right: '函数名拼写错误' }, { left: '#VALUE', right: '值类型不匹配' }] },
      { type: 'single', question: '如何避免除以零的错误？', options: ['不使用除法', '用 IF 判断分母是否为零', '用 SUM 替代除法', '忽略错误'], correctIndex: 1, explanation: '用 IF({分母}=0, 0, {分子}/{分母}) 来避免除以零。' },
      { type: 'truefalse', question: '把复杂公式拆成小段逐一测试是有效的排错方法。', correct: true, explanation: '简化公式是排错三步法的第三步，可以快速定位问题出在哪一段。' },
      { type: 'single', question: '以下哪个不是常见的公式"坑"？', options: ['字段名包含空格', '日期和文本混用', '使用了太多函数', '分母为零未处理'], correctIndex: 2, explanation: '使用多少函数不是问题，常见的坑是字段名特殊字符、类型混用和分母为零。' },
      { type: 'single', question: '#REF 错误最可能的原因是什么？', options: ['函数名拼写错误', '引用的字段被删除或不存在', '除以零', '值类型不匹配'], correctIndex: 1, explanation: '#REF 表示引用无效，通常是因为引用的字段被删除或字段名写错了。' }
    ]
  },

  /* ========== L3-12 单向关联 ========== */
  {
    id: 'L3-12',
    title: '单向关联',
    icon: 'link',
    xpReward: 20,
    cards: [
      { type: 'knowledge', title: '跨表关联 — 数据库的核心能力', content: '<strong>单向关联</strong>可以在一个数据表中引用另一个数据表的记录。\n\n<strong>核心概念：</strong>\n\u2022 <strong>关联字段</strong> — 建立两个数据表之间的引用关系\n\u2022 <strong>单向</strong> — 只在当前表显示关联，被关联的表不会自动显示反向引用\n\n<strong>使用场景：</strong>\n\u2022 订单表关联客户表\n\u2022 任务表关联项目表\n\u2022 员工表关联部门表', highlight: '单向关联 = 在 A 表引用 B 表的记录' }
    ],
    questions: [
      { type: 'single', question: '单向关联的作用是什么？', options: ['合并两个表', '在一个表中引用另一个表的记录', '删除重复数据', '自动同步数据'], correctIndex: 1, explanation: '单向关联可以在一个数据表中引用另一个数据表的记录。' },
      { type: 'truefalse', question: '单向关联会在被关联的表中自动显示反向引用。', correct: false, explanation: '单向关联只在当前表显示关联，被关联的表不会自动显示反向引用。如需双向显示，应使用双向关联。' },
      { type: 'single', question: '以下哪个场景适合使用单向关联？', options: ['计算销售额', '订单表关联客户表', '设置筛选条件', '创建仪表盘'], correctIndex: 1, explanation: '订单表关联客户表是典型的单向关联场景。' },
      { type: 'match', question: '将关联场景与数据表匹配：', pairs: [{ left: '订单表 → 客户表', right: '查看订单对应的客户信息' }, { left: '任务表 → 项目表', right: '查看任务属于哪个项目' }, { left: '员工表 → 部门表', right: '查看员工所在部门' }] },
      { type: 'single', question: '单向关联和双向关联的区别是什么？', options: ['没有区别', '单向只在一个表显示，双向在两个表都显示', '单向更快', '双向更安全'], correctIndex: 1, explanation: '单向关联只在当前表显示关联关系，双向关联会在两个表中都自动显示。' },
      { type: 'truefalse', question: '一个数据表可以同时关联多个其他数据表。', correct: true, explanation: '一个数据表可以创建多个关联字段，分别关联不同的数据表。' },
      { type: 'single', question: '创建单向关联时，需要选择什么？', options: ['公式类型', '要关联的目标数据表', '筛选条件', '排序方式'], correctIndex: 1, explanation: '创建单向关联时，需要选择要关联的目标数据表。' },
      { type: 'single', question: '单向关联建立后，如果被关联表的记录被删除，关联字段会怎样？', options: ['自动填充新数据', '显示为空或无效引用', '自动删除当前记录', '不受影响'], correctIndex: 1, explanation: '被关联的记录删除后，关联字段会显示为空或无效引用。' }
    ]
  },

  /* ========== L3-13 双向关联 ========== */
  {
    id: 'L3-13',
    title: '双向关联',
    icon: 'arrow-left-right',
    xpReward: 20,
    cards: [
      { type: 'knowledge', title: '双向关联 — 自动互联', content: '<strong>双向关联</strong>会在两个数据表中同时创建关联字段。\n\n<strong>与单向关联的区别：</strong>\n\u2022 单向：只在 A 表看到 B 表的引用\n\u2022 双向：A 表和 B 表<strong>互相</strong>看到对方的引用\n\n当你在 A 表关联了 B 表的某条记录，B 表也会自动显示与 A 表的关联。', highlight: '双向关联 = 两个表自动互相引用' },
      { type: 'knowledge', title: '查找引用 — 跨表取值', content: '<strong>查找引用</strong>可以通过已建立的关联字段，从被关联的表中取出特定字段的值。\n\n<strong>使用前提：</strong>必须先建立关联字段（单向或双向）\n\n<strong>示例：</strong>\n\u2022 订单表关联了客户表 → 用查找引用取出客户的"联系电话"\n\u2022 任务表关联了项目表 → 用查找引用取出项目的"截止日期"', highlight: '查找引用 = 通过关联跨表取值' }
    ],
    questions: [
      { type: 'single', question: '双向关联和单向关联的核心区别是什么？', options: ['速度不同', '双向关联会在两个表中都自动显示关联', '双向关联更安全', '没有区别'], correctIndex: 1, explanation: '双向关联会在两个数据表中同时创建关联字段，互相看到对方的引用。' },
      { type: 'truefalse', question: '双向关联建立后，在 A 表关联 B 表的记录，B 表会自动显示与 A 表的关联。', correct: true, explanation: '这正是双向关联的核心特点 — 两个表自动互相引用。' },
      { type: 'single', question: '查找引用的前提条件是什么？', options: ['需要有公式字段', '需要有已建立的关联字段', '需要有 AI 字段', '无需任何前提'], correctIndex: 1, explanation: '查找引用必须基于已有的关联字段（单向或双向）才能使用。' },
      { type: 'match', question: '将关联类型与其特点匹配：', pairs: [{ left: '单向关联', right: '只在一个表显示关联' }, { left: '双向关联', right: '两个表自动互相引用' }, { left: '查找引用', right: '通过关联跨表取值' }] },
      { type: 'single', question: '订单表关联了客户表，想在订单表中显示客户的联系电话，应该用什么？', options: ['公式字段', '查找引用', 'AI 字段', '筛选'], correctIndex: 1, explanation: '通过查找引用，可以从被关联的客户表中取出"联系电话"字段的值。' },
      { type: 'truefalse', question: '查找引用只能用于双向关联，不能用于单向关联。', correct: false, explanation: '查找引用可以基于单向关联或双向关联使用，只要有关联字段即可。' },
      { type: 'single', question: '以下哪种场景最适合使用双向关联？', options: ['只需要在订单表看到客户信息', '需要在订单表和客户表中互相查看关联记录', '只需要统计数据', '只需要筛选数据'], correctIndex: 1, explanation: '需要在两个表中互相查看关联记录时，应使用双向关联。' },
      { type: 'single', question: '关联字段和查找引用的关系是什么？', options: ['没有关系', '关联字段是基础，查找引用是在关联基础上跨表取值', '查找引用可以替代关联字段', '关联字段更高级'], correctIndex: 1, explanation: '关联字段建立两个表之间的引用关系，查找引用则在此基础上从被关联表中取出特定字段的值。' }
    ]
  },

  /* ========== L3-14 自定义详情页 ========== */
  {
    id: 'L3-14',
    title: '自定义详情页',
    icon: 'layout',
    xpReward: 20,
    cards: [
      { type: 'knowledge', title: '自定义详情页 — 像搭积木一样组织页面', content: '<strong>记录详情页</strong>是查看和编辑单条数据的核心界面。\n\n<strong>自定义能力：</strong>\n\u2022 通过<strong>拖拽组件</strong>自由规划信息层级与排列方式\n\u2022 支持<strong>标签页分组</strong>，将大量信息分门别类\n\u2022 可设置<strong>页面标题</strong>、<strong>题头图</strong>和<strong>操作按钮</strong>\n\u2022 字段排列和分组会自动同步到<strong>新记录提交页</strong>\n\n<strong>打开方式：</strong>展开记录 → 右上角点击"自定义"。', highlight: '拖拽组件 + 标签页 = 专业的数据展示界面' },
      { type: 'knowledge', title: '标签页与填写页', content: '<strong>标签页：</strong>\n\u2022 适合将大量信息分门别类\n\u2022 每个标签页最多 <strong>20 个标签</strong>\n\u2022 支持自定义标签名称、拖拽排序、设置外观\n\n<strong>自定义填写页：</strong>\n\u2022 填写页是"添加记录"时的录入界面\n\u2022 可以独立自定义布局，与详情页互相独立\n\u2022 高频字段放顶部，低频字段放下方\n\n<strong>在应用中复用：</strong>详情页设计可同步到 AI 表格应用的列表组件。', highlight: '详情页和填写页可以独立自定义' }
    ],
    questions: [
      { type: 'single', question: '自定义详情页的核心操作方式是什么？', options: ['编写代码', '拖拽组件自由规划布局', '导入模板', '使用公式'], correctIndex: 1, explanation: '自定义详情页通过拖拽组件来自由规划信息层级与排列方式。' },
      { type: 'truefalse', question: '每个标签页最多可以有 20 个标签。', correct: true, explanation: '标签页支持最多 20 个标签，可以自由编辑标签名称和拖拽排序。' },
      { type: 'single', question: '如何打开自定义详情页面板？', options: ['在设置菜单中', '展开记录后点击右上角"自定义"', '右键菜单', '双击字段标题'], correctIndex: 1, explanation: '先展开一条记录的详情页，然后点击右上角的"自定义"按钮。' },
      { type: 'match', question: '将详情页配置项与其功能匹配：', pairs: [{ left: '页面标题', right: '选定字段作为详情页顶部标题' }, { left: '题头图', right: '选择图片字段作为页面头图' }, { left: '操作按钮', right: '固定按钮字段在详情页上方' }, { left: '标签页', right: '将信息分门别类展示' }] },
      { type: 'single', question: '自定义详情页的字段排列会影响什么？', options: ['只影响详情页', '会自动同步到新记录提交页', '会影响表格视图', '会影响所有视图'], correctIndex: 1, explanation: '详情页中的字段排列和分组方式会自动同步到新记录提交页。' },
      { type: 'truefalse', question: '填写页的布局配置与详情页互相独立，修改一侧不会影响另一侧。', correct: true, explanation: '填写页和详情页的布局配置是独立的，可以分别自定义。' },
      { type: 'single', question: '在 AI 表格应用中，详情页样式如何同步？', options: ['手动复制', '首次打开列表组件时自动拉取源数据表的设计', '无法同步', '需要导出导入'], correctIndex: 1, explanation: '首次打开应用中的列表组件时，系统会自动拉取源数据表的自定义详情页样式。' },
      { type: 'single', question: '哪些角色有权限自定义详情页？', options: ['所有人', '未开启高级权限时，可编辑或可管理权限的成员', '只有所有者', '只有管理员'], correctIndex: 1, explanation: '未开启高级权限时，拥有可编辑或可管理权限的成员都可以操作；开启高级权限后，仅可管理权限的成员可操作。' }
    ]
  },

  /* ========== L3-15 L3 毕业挑战 ========== */
  {
    id: 'L3-15',
    title: 'L3 毕业挑战',
    icon: 'award',
    xpReward: 50,
    isChallenge: true,
    cards: [
      { type: 'knowledge', title: 'L3 毕业挑战 — 综合实战', content: '恭喜你学完了 L3 进阶篇的全部内容。\n\n<strong>L3 知识回顾：</strong>\n\u2022 <strong>AI 字段</strong> — 6 种输出类型、提示词编写、审合同、识别发票\n\u2022 <strong>AI 听记</strong> — 总结、信息提取\n\u2022 <strong>AI 生成日期</strong> — 从文本智能提取/推算日期\n\u2022 <strong>AI 助理</strong> — 对话式智能操作\n\u2022 <strong>公式</strong> — 基础语法、常用函数、排错技巧\n\u2022 <strong>关联</strong> — 单向关联、双向关联、查找引用\n\u2022 <strong>自定义详情页</strong> — 拖拽布局、标签页分组\n\n准备好了吗？挑战开始。', highlight: '综合 AI + 公式 + 关联 + 详情页的终极挑战' }
    ],
    questions: [
      { type: 'single', question: 'AI 字段支持哪 6 种输出类型？', options: ['文本、数字、日期、货币、图片、视频', '文本、数字、单选/多选、货币、图片、视频', '文本、数字、单选、多选、公式、链接', '文本、数字、日期、人员、图片、附件'], correctIndex: 1, explanation: 'AI 字段支持文本、数字、单选/多选、货币、图片、视频共 6 种输出类型。' },
      { type: 'single', question: '以下哪种 AI 能力适合"从会议录音中提取所有待办事项"？', options: ['AI 字段', 'AI 听记总结', 'AI 听记信息提取', 'AI 生成日期'], correctIndex: 2, explanation: 'AI 听记信息提取可以精准抓取特定信息，如待办事项、人名、日期等。' },
      { type: 'match', question: '将场景与最佳工具匹配：', pairs: [{ left: '批量审查合同风险', right: 'AI 字段' }, { left: '临时查询销售总额', right: 'AI 助理' }, { left: '从文本提取截止日期', right: 'AI 生成日期' }, { left: '生成会议摘要', right: 'AI 听记总结' }] },
      { type: 'single', question: '公式 IF({金额}>10000, "大额", IF({金额}>1000, "中额", "小额")) 中，金额为 500 时结果是什么？', options: ['大额', '中额', '小额', '报错'], correctIndex: 2, explanation: '500 不满足 >10000，也不满足 >1000，所以走到最后的"小额"。' },
      { type: 'truefalse', question: '查找引用可以在没有关联字段的情况下使用。', correct: false, explanation: '查找引用必须基于已有的关联字段（单向或双向）才能使用。' },
      { type: 'single', question: '自定义详情页中，标签页最多支持多少个标签？', options: ['5 个', '10 个', '20 个', '无限制'], correctIndex: 2, explanation: '每个标签页最多支持 20 个标签。' },
      { type: 'single', question: 'AI 生成公式和 AI 字段的本质区别是什么？', options: ['没有区别', 'AI 生成公式输出确定性代码，AI 字段输出有随机性的内容', 'AI 字段更快', 'AI 生成公式更智能'], correctIndex: 1, explanation: 'AI 生成公式是帮你编写公式代码（结果确定性高），AI 字段是 AI 直接生成内容（结果有一定随机性）。' },
      { type: 'order', question: '请按正确顺序排列"用 AI 字段审查合同"的步骤：', items: ['上传合同到附件字段', '创建 AI 字段并引用附件', '编写审查提示词', 'AI 输出结构化报告'], correctOrder: [0, 1, 2, 3] },
      { type: 'single', question: '以下哪个说法是错误的？', options: ['AI 听记总结和信息提取使用相同的数据来源', '双向关联会在两个表中都显示关联', '公式字段的结果可以手动修改', '查找引用需要先建立关联字段'], correctIndex: 2, explanation: '公式字段是只读的，结果由公式自动计算，不能手动修改。' },
      { type: 'single', question: '恭喜通关 L3。以下哪项最能概括 L3 的核心主题？', options: ['数据录入', 'AI 智能 + 公式计算 + 跨表关联 + 页面定制', '权限管理', '自动化工作流'], correctIndex: 1, explanation: 'L3 进阶篇的核心主题是 AI 智能能力、公式计算、跨表关联和页面定制。' }
    ]
  }
];
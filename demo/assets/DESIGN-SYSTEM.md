# AI 表格学堂 — 设计规范 (Design System)

> 风格定位：多邻国 (Duolingo) 可爱游戏化风格
> 技术栈：纯 HTML + CSS + Vanilla JS

---

## 🎨 品牌色彩体系

### 主色 (Primary)
| 色值 | CSS 变量 | 用途 |
|------|---------|------|
| `#58CC02` | `--green` | 品牌主色、正确反馈、主按钮 |
| `#46A302` | `--green-dark` | 按钮 3D 阴影、hover 状态 |
| `#6EE722` | — | 渐变高光（角色身体顶部） |
| `#4CAF00` | — | 渐变暗部（角色身体底部） |

### 功能色 (Functional)
| 色值 | CSS 变量 | 用途 |
|------|---------|------|
| `#1CB0F6` | `--blue` | 信息提示、思考状态、链接 |
| `#1899D6` | `--blue-dark` | 蓝色按钮阴影 |
| `#FF9600` | `--orange` | 连续学习天数、警告 |
| `#FF4B4B` | `--red` | 错误反馈、生命值 |
| `#A560E8` | `--purple` | 高级功能、特殊成就 |
| `#FFC800` | `--xp-gold` | 经验值、金币、排行榜 |

### 辅助色 (Accent) — 参考 Catppuccin Latte
| 色值 | 用途 |
|------|------|
| `#FF6B8A` | 腮红、可爱装饰元素 |
| `#5BC0EB` | 泪珠、水元素 |
| `#FFD54F` | 伤心状态角色主色 |
| `#E74144` | 舌头、嘴巴内部 |

### 中性色 (Neutral)
| 色值 | CSS 变量 | 用途 |
|------|---------|------|
| `#F7F7F7` | `--gray-50` | 页面背景 |
| `#E5E5E5` | `--gray-100` | 分割线、边框 |
| `#CDCDCD` | `--gray-200` | 禁用按钮背景 |
| `#AFAFAF` | `--gray-300` | 禁用文字 |
| `#777777` | `--gray-400` | 次要文字 |
| `#4B4B4B` | `--gray-500` | 正文文字 |
| `#3C3C3C` | `--gray-600` | 标题文字 |
| `#1a1a2e` | — | 角色五官（眼睛、嘴巴） |

---

## 🔤 字体规范

### 主字体
- **Nunito** (Google Fonts) — 圆润可爱，多邻国同款
- 降级：`-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif`

### 字重使用
| 字重 | 用途 |
|------|------|
| `400` | 正文内容 |
| `600` | 次要标签 |
| `700` | 卡片标题、列表项 |
| `800` | 页面标题、按钮文字、数字 |
| `900` | 超大标题（极少使用） |

### 字号规范
| 场景 | 字号 |
|------|------|
| 页面大标题 | `28px` |
| 区块标题 | `22px` |
| 卡片标题 | `18-20px` |
| 正文 | `15-16px` |
| 辅助文字 | `13-14px` |
| 徽章/标签 | `11-12px` |

---

## 📐 间距与圆角

### 圆角
| CSS 变量 | 值 | 用途 |
|---------|-----|------|
| `--radius` | `16px` | 卡片、模态框 |
| `--radius-sm` | `12px` | 按钮、列表项 |
| `--radius-xs` | `8px` | 小标签、输入框 |
| — | `50%` | 头像、圆形按钮 |
| — | `18px` | 角色身体圆角 |

### 间距
| 场景 | 值 |
|------|-----|
| 页面内边距 | `20-24px` |
| 卡片内边距 | `24-28px` |
| 元素间距（紧凑） | `8-10px` |
| 元素间距（标准） | `12-16px` |
| 区块间距 | `24-32px` |

---

## 🎭 吉祥物角色体系

### 表格小精灵 (Table Buddy) — 自制 Kawaii 风格
| 文件名 | 状态 | 颜色 | 使用场景 |
|--------|------|------|---------|
| `table-buddy-happy.svg` | 开心 | 绿色 `#58CC02` | 默认状态、欢迎页 |
| `table-buddy-sad.svg` | 伤心 | 黄色 `#FFD54F` | 答错题目 |
| `table-buddy-celebrate.svg` | 庆祝 | 绿色 `#58CC02` | 答对、完成课程 |
| `table-buddy-thinking.svg` | 思考 | 蓝色 `#1CB0F6` | 知识卡片展示 |

### Lingo 角色资源（来自 duolingo-clone 开源项目）
| 文件名 | 描述 | 推荐用途 |
|--------|------|---------|
| `mascot.svg` | 绿色猫头鹰（开心） | 首页 hero、课程路径 |
| `mascot_sad.svg` | 黄色猫头鹰（伤心） | 退出挽留弹窗 |
| `mascot_bad.svg` | 猫头鹰（不满） | 连续答错 |
| `hero.svg` | 大尺寸 hero 图 | 落地页 |
| `heart.svg` | 红色心形 | 生命值图标 |
| `finish.svg` | 完成庆祝 | 课程完成页 |
| `points.svg` | 积分图标 | XP 展示 |
| `leaderboard.svg` | 排行榜图标 | 排行榜页面 |
| `learn.svg` | 学习图标 | 学习路径页面 |
| `quests.svg` | 任务图标 | 每日任务 |
| `boy/girl/man/woman/robot/zombie.svg` | 角色头像 | 用户头像选择 |

---

## 🔘 按钮规范

### 3D 立体按钮（多邻国标志性设计）
```css
.btn-primary {
  background: var(--green);
  color: white;
  box-shadow: 0 4px 0 var(--green-dark);  /* 3D 底部阴影 */
  border: none;
  border-radius: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:active {
  box-shadow: none;
  transform: translateY(4px);  /* 按下效果 */
}
```

### 按钮状态
| 状态 | 背景色 | 阴影色 |
|------|--------|--------|
| 主要 (Primary) | `--green` | `--green-dark` |
| 信息 (Info) | `--blue` | `--blue-dark` |
| 危险 (Danger) | `--red` | `#CC3333` |
| 禁用 (Disabled) | `--gray-200` | `--gray-300` |

---

## ✨ 动画规范

### 核心动画
| 名称 | 用途 | 时长 |
|------|------|------|
| `bounceIn` | 完成图标弹入 | `0.6s` |
| `popIn` | 徽章、元素弹出 | `0.4s` |
| `slideUp` | 底部反馈栏滑入 | `0.3s` |
| `fadeIn` | 遮罩层淡入 | `0.2s` |
| `scaleIn` | 模态框缩放弹入 | `0.3s` |
| `confettiFall` | 纸屑下落 | `3s` |
| `glow` | 新徽章发光 | `1.5s infinite` |
| `simShake` | 答错时抖动 | `0.4s` |

### canvas-confetti（推荐替换现有纸屑动画）
```html
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
```
```javascript
// 课程完成时的庆祝效果
confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

// 连续答对的星星效果
confetti({ particleCount: 30, spread: 50, shapes: ['star'], colors: ['#FFC800', '#58CC02', '#1CB0F6'] });
```

---

## 📦 资源引用方式

### CDN 资源
```html
<!-- 字体 -->
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">

<!-- 图标 -->
<script src="https://unpkg.com/lucide@latest"></script>

<!-- 纸屑动画 -->
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
```

### 本地资源
```
demo/assets/
├── mascots/          # Lingo 开源角色 SVG（16个）
│   ├── mascot.svg
│   ├── mascot_sad.svg
│   ├── mascot_bad.svg
│   ├── hero.svg
│   ├── heart.svg
│   ├── finish.svg
│   └── ...
└── kawaii/            # 自制表格小精灵 SVG（4个）
    ├── table-buddy-happy.svg
    ├── table-buddy-sad.svg
    ├── table-buddy-celebrate.svg
    └── table-buddy-thinking.svg
```

---

## 🎯 角色使用场景映射

| 场景 | 推荐角色 | 文件 |
|------|---------|------|
| 首页/欢迎 | 表格小精灵（开心） | `kawaii/table-buddy-happy.svg` |
| 知识卡片 | 表格小精灵（思考） | `kawaii/table-buddy-thinking.svg` |
| 答对题目 | 表格小精灵（庆祝） | `kawaii/table-buddy-celebrate.svg` |
| 答错题目 | 表格小精灵（伤心） | `kawaii/table-buddy-sad.svg` |
| 课程完成 | Lingo 完成图 | `mascots/finish.svg` |
| 退出挽留 | Lingo 伤心猫头鹰 | `mascots/mascot_sad.svg` |
| 排行榜 | Lingo 排行榜图标 | `mascots/leaderboard.svg` |
| 生命值 | Lingo 心形 | `mascots/heart.svg` |

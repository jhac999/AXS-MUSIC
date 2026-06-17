# AXS Music Demand WebForm 🎵

**AXS 音乐工业化生产体系 - 核心前端入口 (Step 1)**

![AXS MUSIC STUDIO](https://img.shields.io/badge/AXS-MUSIC_STUDIO-818cf8?style=for-the-badge) 
![Version](https://img.shields.io/badge/Version-1.0-blueviolet?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-HTML5_|_CSS3_|_VanillaJS-050505?style=for-the-badge)

## 📌 项目介绍 (Overview)
这是一个专为**工业化 AI 音乐生产流水线**打造的“沉浸式智能需求参数采集单”。
通过极其深度的交互体验（基于 Web 原生的玻璃拟态和赛博发光动画），它不仅能向客户索取专业的音乐参数（配器、情绪、调性、转调要求），**更核心的功能在于它能一键将客户的需求“翻译”并“降维拆解”为高度结构化的【AI 提示词参数卡】。**

该表单是 AXS MUSIC STUDIO 七步标准 SOP 中的 **“入料区”**。它的产出将直接成为后续多模态分析、专家引擎派发的基础指令。

---

## 🚀 核心特性 (Features)

- **极客级暗黑 UI**：抛弃传统枯燥的接单表格。我们使用了沉浸式的双栏变体/居中弹性布局，搭配深渊黑画布（`--canvas-deep: #000000`）和动态紫蓝色极光背景，瞬间拉满专业信任度。
- **动态 Glitch Logo**：自带极轻微“粒子通道错位”发光动画的 AXS Logo，低调而科幻。
- **工业级音乐解构**：内置《调性与和声系统》，甚至能让客户指定“仅副歌升调”或“使用借用和弦/副属和弦”。
- **多模型生成矩阵**：点击“提交”后，系统不仅会拼接参数，还会自动附加我们设定的多引擎分配指令（主力 Suno 4首 / Udio 3首 / Mureka 3首）。
- **一键复制交付**：内嵌专属的终端 Console 弹窗体验，支持一键将参数卡复制，发送给下游的 A&R 或者大语言模型提示词专家。

---

## 📂 项目结构 (Structure)

为了保持最高强度的可读性与可维护性，我们严格遵循了现代前端的解耦架构：

```text
AXS_Demand_WebForm/
├── index.html                  # 纯净的 DOM 标签结构
├── css/
│   └── style.css               # 设计令牌、动画特效与响应式媒体查询
├── js/
│   └── app.js                  # 表单捕获逻辑与 Prompt 参数拼接核心
├── guide_prompts/
│   └── Skill_全球参考曲目精准检索.md # 配套的大模型专家库辅助挂件
└── README.md                   # 您正在阅读的文件
```

---

## 🛠 快速上手 (Usage)

1. **直接运行**：本项目纯静态（Vanilla 架构，不依赖任何 Node 环境或构建工具）。直接双击 `index.html` 即可在浏览器中体验极致视效。
2. **移动端支持**：已编写完美的 `@media (max-width: 768px)` 响应式查询，手机端 Logo 自动置顶居中，表单撑满屏幕，流畅度极高。
3. **如何对接后端/AI**：
   表单底部的 `codeOutput` 容器输出了全量 Prompt 字符串。您可以写一个 Python 爬虫或调用 ChatGPT API，拦截 `app.js` 最后生成的 `template` 变量直接发送给大模型。

---

## 🧠 背后方法论 (The Philosophy)
本项目深刻践行了 AXS 内部的四大核心思维模型：
- **解构引擎**：用近百个选择题，把“我要一首好听的歌”解构为了机器听得懂的原子动作。
- **模块化组装**：本表单仅作为 `Node 1` 存在，它与下方的 `guide_prompts` 专家独立运作。

---
> *© 2026 AXS MUSIC STUDIO. All rights reserved. 拒绝黑盒，重塑音乐生产力。*

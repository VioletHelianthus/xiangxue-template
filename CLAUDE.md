# Xiangxue Game UI Project

这是一个使用 [xiangxue](https://github.com/VioletHelianthus/xiangxue) 工具链的游戏 UI 项目模板，backend 为 Cocos2d-x。

## 首次使用

如果项目根目录没有 `xiangxue-cocos.exe`（或 `xiangxue-cocos`），说明环境尚未初始化。请运行 `/setup-project` 完成初始化，或告诉我"帮我配置项目"。

## 初始化完成后

### 目录结构
- `pages/` — Vue 页面，每个文件生成一个 .csd
- `assets/` — UI 图片资源
- `components/` — 项目自定义复合组件
- `output/csd/` — 生成的 .csd 文件（拷贝到引擎项目使用）
- `converter.json` — 设计分辨率和预设配置

### 常用命令（在 frontend/ 下执行）
- `bun run dev` — 浏览器预览，可切换分辨率
- `bun run build` — 一键生成：pages/*.vue → output/csd/*.csd
- `bun run render` — 仅 SSR（Vue → HTML）
- `bun run convert` — 仅转换（HTML → .csd）

### 编写规则
- 每个有意义的节点写 `data-name`
- 只用 inline style（不用 CSS class）
- Root 元素用 `width:100%; height:100%`
- 引擎控件用 Vue 组件（CocosButton 等），不用 HTML 原生标签
- ListView 的动态 item 独立成 Vue 文件

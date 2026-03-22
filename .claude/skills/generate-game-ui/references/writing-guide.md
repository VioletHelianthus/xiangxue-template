# Vue UI 页面编写指南

## 核心规则

### 每个 Vue 文件 = 一个 .csd
一个 Vue 文件经 SSR 渲染后生成一个 HTML，再转换为一个 Cocos .csd 文件。文件名即 .csd 名。

### data-name 是必须的
每个有意义的节点都要写 `data-name`。这是引擎里程序员用来查找节点的名称。不写会 fallback 为标签名或 class 名，不利于代码端使用。

```html
<!-- 好 -->
<div data-name="hpRow" style="...">
<!-- 坏 -->
<div style="...">
```

### 只有三种 HTML 标签直接映射引擎类型
- `<div>` → Layout/Panel（容器）
- `<img>` → ImageView（图片）
- `<span>`/`<p>`/`<label>`/`<h1>`-`<h6>` → Text（文本）

其他 HTML 标签（`<button>`、`<input>`、`<progress>` 等）不会映射为引擎控件。它们会变成 Layout。要生成引擎控件，必须使用 Vue 组件（如 `<CocosButton>`）。

### overflow:scroll 自动识别
`<div style="overflow:scroll">` 会被识别为 ScrollView，这是唯一保留的 CSS→引擎控件映射。

## 布局

### 用 CSS flex 布局
```html
<div data-name="row" style="display:flex;flex-direction:row;gap:8px;align-items:center">
```

支持的 flex 属性：
- flex-direction: row | column
- justify-content: flex-start | center | flex-end | space-between | space-around
- align-items: flex-start | center | flex-end | stretch
- flex-grow / flex-shrink / flex-basis
- flex-wrap: wrap | nowrap
- gap

### 用百分比实现响应式
```html
<!-- root 用 100% 填满设计分辨率 -->
<div data-name="root" style="width:100%;height:100%;display:flex;flex-direction:column">
  <!-- 固定高度头部 -->
  <div data-name="header" style="width:100%;height:80px">...</div>
  <!-- 弹性内容区 -->
  <div data-name="content" style="width:100%;flex:1">...</div>
  <!-- 固定高度底部 -->
  <div data-name="footer" style="width:100%;height:60px">...</div>
</div>
```

Converter 用 Taffy 在设计分辨率下将百分比和 flex 解算为绝对像素坐标。

### 支持的 CSS 视觉属性
- `transform: scale(x,y) rotate(deg)` → Scale + Rotation
- `opacity: 0-1` → Alpha
- `visibility: hidden` → VisibleForFrame=False
- `z-index: N` → ZOrder
- `color: #RGB` → CColor（文本前景色）
- `background-color: rgba(...)` → Panel 背景色

## 组件使用约束

### 容器组件不能加 wrapper div
Vue 组件的模板 = 引擎节点结构。容器组件（ListView、ScrollView、PageView）的 slot 内容直接成为子节点。

```html
<!-- 正确：子节点直接在 ListView 里 -->
<CocosListView name="list" ...>
  <div data-name="item1">...</div>
  <div data-name="item2">...</div>
</CocosListView>

<!-- 错误：wrapper div 会变成多余的 Panel 节点 -->
<CocosListView name="list" ...>
  <div class="inner-wrapper">  <!-- 这个会变成引擎里真实的节点！ -->
    <div data-name="item1">...</div>
  </div>
</CocosListView>
```

### 叶子组件的内部结构被忽略
Button、ProgressBar、TextField 等是叶子组件。Converter 只读取它们的 data-widget 属性和文本内容，忽略 SSR 渲染出的内部 HTML 结构（图片、样式 div 等）。这些内部结构仅用于浏览器预览。

### ListView 的动态 item 独立成组件
动态列表的 item 应该是独立的 Vue 文件 → 独立 .csd。ListView 中用 `<CocosProjectNode>` 引用。

```
pages/
  BagPanel.vue     → BagPanel.csd（ListView 里放 ProjectNode 引用 BagItem.csd）
  BagItem.vue      → BagItem.csd（item 模板）
```

代码端 clone ProjectNode 填充数据，工具不干预运行时逻辑。

## 组件注册

所有 Cocos 组件通过 `components/index.ts` 全局注册，Vue 页面中直接使用，无需 import。

```vue
<template>
  <div data-name="root" style="width:100%;height:100%">
    <CocosButton name="btn" width="200px" height="50px">Click</CocosButton>
  </div>
</template>

<script setup lang="ts">
// 组件已全局注册，无需 import
</script>
```

## 命名规范

- `data-name` 用 camelCase：`hpBar`、`attackBtn`、`skillList`
- Vue 文件名用 PascalCase：`BattleHUD.vue`、`BagItem.vue`
- 生成的 .csd 名与 Vue 文件名一致：`BattleHUD.csd`

# Cocos 组件参考

## 基础元素（HTML 原生标签，直接使用）

这些不是 Vue 组件，直接写 HTML 标签即可。Converter 自动识别。

### 容器 — `<div>`
```html
<div data-name="panel" style="width:100%;height:200px;display:flex;flex-direction:row;gap:8px">
  <!-- 子节点 -->
</div>
```
- `data-name` — 节点名称（必须，引擎里用这个名字找节点）
- 所有 CSS flex 属性生效：flex-direction, justify-content, align-items, gap, flex-grow, flex-wrap 等
- 支持：width, height（px 或 %）、padding、margin、position、opacity、visibility、z-index、transform (scale/rotate)、color、background-color

### 图片 — `<img>`
```html
<img data-name="icon" src="icons/sword.png" style="width:64px;height:64px" />
```

### 文本 — `<span>` / `<p>` / `<label>` / `<h1>`-`<h6>`
```html
<span data-name="title" style="height:24px;color:#ffe082">Hello World</span>
```
- 文本内容直接写在标签内
- `color` 映射为引擎文本颜色

---

## Cocos 组件（Vue 组件，需 import）

以下组件输出 `data-widget` 标记，converter 识别为对应的 Cocos 控件类型。

### CocosButton
三态按钮，对应 Cocos ButtonObjectData。

```html
<CocosButton name="startBtn"
  normal="btn_normal.png"
  pressed="btn_pressed.png"
  disabled="btn_disabled.png"
  width="160px" height="52px" font-size="16px">
  Start Game
</CocosButton>
```

| Prop | 类型 | 必须 | 默认值 | 说明 |
|---|---|---|---|---|
| name | string | 是 | — | 节点名 |
| normal | string | 否 | — | 常态贴图路径 |
| pressed | string | 否 | — | 按下态贴图路径 |
| disabled | string | 否 | — | 禁用态贴图路径 |
| width | string | 否 | 120px | 宽度 |
| height | string | 否 | 40px | 高度 |
| fontSize | string | 否 | 14px | 文字大小 |

Slot 内容作为按钮文字。

### ProgressBar
进度条，对应 Cocos LoadingBarObjectData。

```html
<ProgressBar name="hpBar" :value="850" :max="1000" color="green" width="200px" height="22px" />
```

| Prop | 类型 | 必须 | 默认值 | 说明 |
|---|---|---|---|---|
| name | string | 是 | — | 节点名 |
| value | number | 是 | — | 当前值 |
| max | number | 否 | 100 | 最大值 |
| color | 'green'\|'red'\|'blue'\|'yellow' | 否 | green | 填充颜色 |
| width | string | 否 | 200px | 宽度 |
| height | string | 否 | 24px | 高度 |

### CocosSlider
滑动条，对应 Cocos SliderObjectData。

```html
<CocosSlider name="volume" :percent="75" bar="bar.png" ball="ball.png" width="200px" height="30px" />
```

| Prop | 类型 | 必须 | 默认值 | 说明 |
|---|---|---|---|---|
| name | string | 是 | — | 节点名 |
| percent | number | 否 | 50 | 百分比 0-100 |
| bar | string | 否 | — | 滑轨贴图 |
| ball | string | 否 | — | 滑块贴图 |
| progress | string | 否 | — | 进度填充贴图 |
| width | string | 否 | 200px | 宽度 |
| height | string | 否 | 30px | 高度 |

### CocosCheckBox
复选框，对应 Cocos CheckBoxObjectData。

```html
<CocosCheckBox name="muteToggle" :checked="false" width="40px" height="40px" />
```

| Prop | 类型 | 必须 | 默认值 | 说明 |
|---|---|---|---|---|
| name | string | 是 | — | 节点名 |
| checked | boolean | 否 | false | 是否选中 |
| bgNormal | string | 否 | — | 背景常态贴图 |
| bgPressed | string | 否 | — | 背景按下贴图 |
| bgDisabled | string | 否 | — | 背景禁用贴图 |
| crossNormal | string | 否 | — | 勾选标记常态贴图 |
| crossDisabled | string | 否 | — | 勾选标记禁用贴图 |

### CocosTextField
输入框，对应 Cocos TextFieldObjectData。

```html
<CocosTextField name="nameInput" placeholder="Enter name" max-length="20" width="200px" height="36px" />
```

| Prop | 类型 | 必须 | 默认值 | 说明 |
|---|---|---|---|---|
| name | string | 是 | — | 节点名 |
| text | string | 否 | '' | 初始文本 |
| placeholder | string | 否 | '' | 占位提示 |
| maxLength | number | 否 | — | 最大长度 |
| password | boolean | 否 | false | 密码模式 |
| width | string | 否 | 200px | 宽度 |
| height | string | 否 | 36px | 高度 |
| fontSize | string | 否 | 16px | 字号 |

### CocosScrollView
滚动容器，对应 Cocos ScrollViewObjectData。

```html
<CocosScrollView name="contentScroll" direction="vertical" width="100%" height="400px">
  <!-- 子节点 -->
</CocosScrollView>
```

| Prop | 类型 | 必须 | 默认值 | 说明 |
|---|---|---|---|---|
| name | string | 是 | — | 节点名 |
| direction | 'vertical'\|'horizontal'\|'both' | 否 | vertical | 滚动方向 |
| bounce | boolean | 否 | true | 弹性 |
| innerWidth | string | 否 | — | 内容区宽度 |
| innerHeight | string | 否 | — | 内容区高度 |
| width | string | 否 | 300px | 宽度 |
| height | string | 否 | 400px | 高度 |

Slot 内容作为滚动区域子节点。

### CocosListView
列表容器，对应 Cocos ListViewObjectData。

```html
<CocosListView name="skillList" direction="vertical" :item-margin="8" width="100%" height="300px">
  <CocosProjectNode name="itemTemplate" file="SkillItem.csd" width="100%" height="64px" />
</CocosListView>
```

| Prop | 类型 | 必须 | 默认值 | 说明 |
|---|---|---|---|---|
| name | string | 是 | — | 节点名 |
| direction | 'vertical'\|'horizontal' | 否 | vertical | 排列方向 |
| itemMargin | number | 否 | 0 | 项间距(px) |
| gravity | string | 否 | — | 对齐方式 |
| width | string | 否 | 300px | 宽度 |
| height | string | 否 | 400px | 高度 |

**重要**：ListView 的动态 item 应作为独立 Vue 组件 → 独立 .csd。在 ListView 中用 CocosProjectNode 引用。代码端 clone 该 ProjectNode 填充数据。

### CocosPageView
翻页容器，对应 Cocos PageViewObjectData。

```html
<CocosPageView name="guide" direction="horizontal" width="100%" height="400px">
  <!-- 每个直接子节点是一页 -->
</CocosPageView>
```

| Prop | 类型 | 必须 | 默认值 |
|---|---|---|---|
| name | string | 是 | — |
| direction | 'horizontal'\|'vertical' | 否 | horizontal |
| width | string | 否 | 300px |
| height | string | 否 | 400px |

### CocosSprite
精灵图，对应 Cocos SpriteObjectData（区别于 ImageView：Sprite 用于直接渲染纹理）。

```html
<CocosSprite name="avatar" texture="characters/hero.png" width="128px" height="128px" />
```

| Prop | 类型 | 必须 | 默认值 |
|---|---|---|---|
| name | string | 是 | — |
| texture | string | 是 | — |
| width | string | 否 | 64px |
| height | string | 否 | 64px |

### CocosTextBMFont
位图字体文本，对应 Cocos TextBMFontObjectData。

```html
<CocosTextBMFont name="score" text="99999" fnt-file="fonts/score.fnt" font-size="32px" />
```

| Prop | 类型 | 必须 | 默认值 |
|---|---|---|---|
| name | string | 是 | — |
| text | string | 是 | — |
| fntFile | string | 是 | — |
| width | string | 否 | auto |
| height | string | 否 | auto |
| fontSize | string | 否 | 24px |

### CocosTextAtlas
图集数字，对应 Cocos TextAtlasObjectData。用于纯数字显示（如金币、分数）。

```html
<CocosTextAtlas name="coinCount" text="12345" atlas-file="fonts/numbers.png"
  :char-width="20" :char-height="28" start-char="." />
```

| Prop | 类型 | 必须 | 默认值 |
|---|---|---|---|
| name | string | 是 | — |
| text | string | 是 | — |
| atlasFile | string | 是 | — |
| charWidth | number | 是 | — |
| charHeight | number | 是 | — |
| startChar | string | 否 | '.' |

### CocosProjectNode
引用另一个 .csd 文件，对应 Cocos ProjectNodeObjectData。

```html
<CocosProjectNode name="statusBar" file="StatusBar.csd" width="100%" height="80px" />
```

| Prop | 类型 | 必须 | 默认值 |
|---|---|---|---|
| name | string | 是 | — |
| file | string | 是 | — |
| width | string | 否 | 100px |
| height | string | 否 | 100px |

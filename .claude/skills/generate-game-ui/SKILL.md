---
name: generate-game-ui
description: Generate game UI as Vue pages for the xiangxue converter pipeline. Use this skill whenever the user wants to create a game UI screen, convert a design mockup to engine assets, write Vue pages with Cocos components, or create .csd files from HTML/CSS. Also trigger when the user mentions UI design, game interface, Cocos Studio, or wants to preview UI at different resolutions.
---

# Generate Game UI

Create Vue page files that will be converted to game engine UI assets (Cocos .csd files) via the xiangxue pipeline.

## Workflow

1. Understand what the user wants — a description, a mockup image, or a reference to existing UI
2. Design the node tree structure (what panels, what controls, parent-child relationships)
3. Decide which elements are separate .csd files (especially ListView items)
4. Write the Vue page(s)
5. Help the user preview and iterate

## Before Writing

Read the reference docs to understand available components and constraints:
- `references/cocos-components.md` — All available components with props
- `references/writing-guide.md` — Rules and patterns for writing Vue pages

## Key Rules (quick reference)

1. Every meaningful node needs `data-name`
2. Only `<div>`, `<img>`, `<span>` (and similar text tags) map to engine types directly
3. Engine controls (Button, Slider, ProgressBar, etc.) require Vue components
4. Root element should use `width:100%;height:100%` with flex layout
5. ListView items → separate Vue files → separate .csd files
6. No wrapper divs inside container components (ListView, ScrollView)

## Writing the Vue Page

Structure the page as:
```vue
<template>
  <div data-name="root" style="width:100%;height:100%;display:flex;flex-direction:column">
    <!-- UI content here -->
  </div>
</template>

<script setup lang="ts">
// Components are globally registered, no imports needed
</script>
```

Use inline `style` attributes (not CSS classes) — the converter only reads inline styles.

## Output Files

Place Vue files in the project's `pages/` directory:
- One Vue file per screen/panel that needs its own .csd
- Separate Vue files for ListView item templates

## Build Commands

After writing the Vue files, the user runs:
```bash
cd frontend
bun run build    # renders all pages and converts to .csd
bun run dev      # preview in browser with resolution switching
```

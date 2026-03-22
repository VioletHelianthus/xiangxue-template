---
name: setup-project
description: Initialize a xiangxue game UI project from this template. Use when the user has just cloned this template and needs to set up their development environment, or when they say "setup", "initialize", "configure", "get started", or ask how to begin using this project. This includes compiling the CLI, copying components, installing dependencies, and configuring Claude Code.
---

# Setup Project

Initialize a xiangxue game UI project with Cocos2d-x backend.

## Prerequisites Check

Before starting, verify these are available:

1. **Rust toolchain** — `rustc --version` and `cargo --version`
2. **Bun** — `bun --version`
3. **Git** — `git --version`

If any are missing, tell the user what to install and stop.

## Setup Steps

Execute these steps in order. If any step fails, stop and help the user fix it before continuing.

### Step 1: Clone dependencies

The project needs two xiangxue repos as siblings:

```bash
# From the project's parent directory
cd ..

# Clone xiangxue core (needed for @xiangxue/preview and the Rust crate)
git clone https://github.com/VioletHelianthus/xiangxue.git xiangxue-core
# If already exists, pull latest
cd xiangxue-core && git pull && cd ..

# Clone xiangxue-cocos2d (backend + components)
git clone https://github.com/VioletHelianthus/xiangxue-cocos2d.git xiangxue-cocos
# If already exists, pull latest
cd xiangxue-cocos && git pull && cd ..
```

Expected directory layout after this step:
```
parent/
  xiangxue-core/       ← core library
  xiangxue-cocos/      ← cocos backend
  my-project/          ← this project (the template)
```

### Step 2: Build the CLI

```bash
cd ../xiangxue-cocos
cargo build --release
```

Copy the binary into the project:
```bash
# Windows
cp target/release/xiangxue-cocos.exe ../my-project/

# Linux/macOS
cp target/release/xiangxue-cocos ../my-project/
```

Verify: `./xiangxue-cocos --help` or `./xiangxue-cocos.exe --help` should not error.

### Step 3: Sync Vue components

Copy the latest Cocos components from the backend repo:

```bash
cd my-project
rm -rf frontend/src/components
cp -r ../xiangxue-cocos/frontend/src/components frontend/src/components
```

### Step 4: Install frontend dependencies

```bash
cd frontend
bun install
```

### Step 5: Configure converter.json

Edit `converter.json` in the project root to match the game's design resolution:

```json
{
  "designResolution": {
    "width": 640,
    "height": 960
  },
  "presets": [
    { "label": "640×960", "width": 640, "height": 960 }
  ]
}
```

Ask the user:
- What is the game's design resolution? (e.g., 1280×720 for landscape, 640×960 for portrait)
- What device resolutions should be in the preset list?

### Step 6: Initialize Claude Code environment

Create CLAUDE.md if it doesn't exist:

```markdown
# [Project Name]

Game UI project using xiangxue + Cocos2d-x backend.

## Commands

- `cd frontend && bun run dev` — Preview in browser
- `cd frontend && bun run build` — Generate all .csd files
- `cd frontend && bun run render` — SSR only (Vue → HTML)
- `cd frontend && bun run convert` — Convert only (HTML → .csd)

## Directory Structure

- `pages/` — Vue pages, each becomes a .csd
- `assets/` — UI images and resources
- `components/` — Project-specific composite components
- `output/csd/` — Generated .csd files
- `converter.json` — Design resolution config

## Rules

- Every node needs `data-name`
- Use inline styles only (no CSS classes)
- Root element: `width:100%; height:100%`
- ListView items → separate Vue files
```

Copy the generate-game-ui skill from xiangxue-dev if available:

```bash
mkdir -p .claude/skills
cp -r ../xiangxue-dev/.claude/skills/generate-game-ui .claude/skills/ 2>/dev/null || true
```

### Step 7: Verify

Run the full pipeline to confirm everything works:

```bash
cd frontend
bun run build
```

This should render `pages/HelloWorld.vue` → `output/html/HelloWorld.html` → `output/csd/HelloWorld.csd`.

Check the output:
```bash
cat ../output/csd/HelloWorld.csd
```

Should contain valid XML with `<GameProjectFile>` and `<ObjectData>` elements.

### Step 8: Clean up and start

Remove the example page:
```bash
rm ../pages/HelloWorld.vue
rm ../output/html/HelloWorld.html
rm ../output/csd/HelloWorld.csd
```

Tell the user: "Project is ready. Create Vue pages in `pages/`, preview with `bun run dev`, build with `bun run build`. The .csd files will appear in `output/csd/`."

## Troubleshooting

- **`bun install` fails on `@xiangxue/preview`**: Check that `xiangxue-core` is cloned as a sibling directory. The path in package.json is `file:../../xiangxue-core/frontend`.
- **`bun run convert` fails**: Check that `xiangxue-cocos.exe` (or `xiangxue-cocos` on Linux/Mac) exists in the project root.
- **CLI can't find `converter.json`**: The CLI searches upward from cwd. Make sure converter.json is in the project root and you're running from `frontend/`.
- **Components not found in Vue**: Run Step 3 again to re-sync components. Make sure `frontend/src/components/index.ts` exists.

/**
 * Wrapper script to invoke xiangxue-cocos CLI from frontend/scripts context.
 * Resolves paths relative to project root (frontend/..).
 */
import { execFileSync } from 'child_process'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '../..')

const exe = resolve(projectRoot, process.platform === 'win32' ? 'xiangxue-cocos.exe' : 'xiangxue-cocos')
const inputDir = resolve(projectRoot, 'output/html')
const outputDir = resolve(projectRoot, 'output/csd')

try {
  execFileSync(exe, ['--emit', inputDir, '-o', outputDir], {
    cwd: projectRoot,
    stdio: 'inherit',
  })
} catch (e) {
  process.exit(1)
}

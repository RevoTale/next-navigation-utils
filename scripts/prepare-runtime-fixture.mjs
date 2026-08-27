// biome-ignore-all lint/correctness/noNodejsModules: This build script runs in Node.
import { execFileSync } from 'node:child_process'
import { copyFile, mkdir, readdir, rename, rm } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const packageArchivePattern = /^next-navigation-utils-.*\.tgz$/
const projectDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const runtimeDirectory = join(projectDirectory, 'next-app-runtime')
const fixtureFiles = [
  ['next-app-mock/next.config.mjs', 'next.config.mjs'],
  ['next-app-mock/package.json', 'package.json'],
  ['next-app-mock/jsconfig.runtime.json', 'jsconfig.json'],
  ['compatibility/compatibility-types.tsx', 'compatibility-types.tsx'],
  ['compatibility/commonjs.cjs', 'commonjs.cjs'],
  ['compatibility/tsconfig.json', 'tsconfig.types.json'],
  ['next-app-mock/src/app/page.module.css', 'src/app/page.module.css'],
]

const getPnpmCommand = () => {
  if (process.platform === 'win32') {
    return 'pnpm.cmd'
  }
  return 'pnpm'
}

const pnpmCommand = getPnpmCommand()

const runPnpm = (...arguments_) =>
  execFileSync(pnpmCommand, arguments_, {
    cwd: projectDirectory,
    stdio: 'inherit',
  })

await rm(runtimeDirectory, { force: true, recursive: true })
runPnpm('exec', 'tsc', '-p', 'next-app-mock/tsconfig.runtime.json')
await mkdir(join(runtimeDirectory, 'src/app'), { recursive: true })

await Promise.all(
  fixtureFiles.map(([source, destination]) =>
    copyFile(join(projectDirectory, source), join(runtimeDirectory, destination)),
  ),
)

runPnpm('--config.ignore-scripts=true', 'pack', '--pack-destination', runtimeDirectory)

const archives = (await readdir(runtimeDirectory)).filter(file => packageArchivePattern.test(file))

if (archives.length !== 1) {
  throw new Error(`Expected one package archive, found ${archives.length}`)
}

await rename(
  join(runtimeDirectory, archives[0]),
  join(runtimeDirectory, 'next-navigation-utils.tgz'),
)

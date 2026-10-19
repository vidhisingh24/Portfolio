import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * After the normal build, render the app to static HTML (src/entry-server.jsx)
 * and put it inside #root, so the hero and its photo show before JavaScript
 * loads. If anything goes wrong it only logs a warning: the site then works
 * exactly as before (rendered in the browser).
 */
const prerender = () => {
  let config
  return {
    name: 'prerender-html',
    apply: 'build',
    configResolved(resolved) {
      config = resolved
    },
    async closeBundle() {
      if (config.build.ssr) return
      const outDir = path.resolve(config.root, config.build.outDir)
      const ssrDir = path.resolve(config.root, 'node_modules/.prerender')
      try {
        await build({
          configFile: config.configFile,
          logLevel: 'warn',
          build: { ssr: 'src/entry-server.jsx', outDir: ssrDir, emptyOutDir: true, copyPublicDir: false },
        })
        const entry = fs.readdirSync(ssrDir).find((f) => /^entry-server\.(m?js)$/.test(f))
        const { render } = await import(`${pathToFileURL(path.join(ssrDir, entry)).href}?t=${Date.now()}`)
        const file = path.join(outDir, 'index.html')
        const html = fs.readFileSync(file, 'utf8')
        if (!html.includes('<div id="root"></div>')) throw new Error('#root placeholder not found')
        fs.writeFileSync(file, html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`))
        config.logger.info('prerender: wrote static HTML into index.html')
      } catch (err) {
        config.logger.warn(`prerender skipped: ${err.message}`)
      } finally {
        fs.rmSync(ssrDir, { recursive: true, force: true })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerender()],
  define: {
    // Shown as "last updated" on the Now card; refreshed on every deploy
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
})

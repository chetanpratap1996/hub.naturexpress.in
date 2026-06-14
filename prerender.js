import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

async function prerender() {
  console.log('Starting prerendering...')
  try {
    const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
    const { render } = await import('./dist-ssr/entry-server.js')
    
    const url = '/'
    const appHtml = render(url)
    
    const html = template.replace(`<!--app-html-->`, appHtml)
    fs.writeFileSync(toAbsolute('dist/index.html'), html)
    console.log('Pre-rendered index.html successfully.')
    
    const date = new Date().toISOString().split('T')[0]
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://hub.naturexpress.in/</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`
    fs.writeFileSync(toAbsolute('dist/sitemap.xml'), sitemap)
    console.log('Sitemap generated successfully.')
  } catch (err) {
    console.error('Prerendering failed:', err)
    process.exit(1)
  }
}

prerender()

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

async function prerender() {
  console.log('Starting prerendering for Skills Hub & Agency routes...')
  try {
    const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
    const { render } = await import('./dist-ssr/entry-server.js')
    
    // Prerender Home (/)
    const homeHtml = render('/')
    const finalHomeHtml = template.replace(`<!--app-html-->`, homeHtml)
    fs.writeFileSync(toAbsolute('dist/index.html'), finalHomeHtml)
    console.log('Pre-rendered dist/index.html (Skills Hub) successfully.')
    
    // Prerender Agency (/agency)
    const agencyHtml = render('/agency')
    const finalAgencyHtml = template.replace(`<!--app-html-->`, agencyHtml)
    const agencyDir = toAbsolute('dist/agency')
    if (!fs.existsSync(agencyDir)) {
      fs.mkdirSync(agencyDir, { recursive: true })
    }
    fs.writeFileSync(path.join(agencyDir, 'index.html'), finalAgencyHtml)
    console.log('Pre-rendered dist/agency/index.html (Agency Services) successfully.')
    
    // Prerender Admin (/admin)
    const adminHtml = render('/admin')
    const finalAdminHtml = template.replace(`<!--app-html-->`, adminHtml)
    const adminDir = toAbsolute('dist/admin')
    if (!fs.existsSync(adminDir)) {
      fs.mkdirSync(adminDir, { recursive: true })
    }
    fs.writeFileSync(path.join(adminDir, 'index.html'), finalAdminHtml)
    console.log('Pre-rendered dist/admin/index.html (Sales CRM) successfully.')
    
    // Generate Sitemap
    const date = new Date().toISOString().split('T')[0]
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://hub.naturexpress.in/</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://hub.naturexpress.in/agency</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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

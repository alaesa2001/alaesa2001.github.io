export const dynamic = "force-static";

const stylesheet = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>XML Sitemap | Alae-Eddine Sahbou</title>
        <style>
          *{box-sizing:border-box}body{margin:0;background:#f4f3ed;color:#171a16;font-family:Inter,Arial,sans-serif}.wrap{width:min(1180px,calc(100% - 32px));margin:auto;padding:64px 0 80px}.eyebrow{color:#6b8f23;font:700 12px ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase}h1{max-width:800px;margin:16px 0 12px;font-size:clamp(42px,7vw,82px);line-height:.95;letter-spacing:-.06em}p{margin:0 0 38px;color:#62665e;font-size:17px;line-height:1.6}.card{overflow:hidden;border:1px solid #cfcdc2;border-radius:18px;background:#fff}.summary{display:flex;justify-content:space-between;gap:20px;padding:20px 24px;border-bottom:1px solid #dedcd3;font:700 12px ui-monospace,monospace;text-transform:uppercase}.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse}th,td{padding:16px 20px;border-bottom:1px solid #eceae3;text-align:left}th{background:#f8f7f2;color:#73776e;font:700 11px ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase}td{font-size:14px}a{color:#171a16;text-decoration:none;word-break:break-word}a:hover{color:#6b8f23}.meta{white-space:nowrap;color:#72766d;font:12px ui-monospace,monospace}tr:last-child td{border-bottom:0}@media(max-width:700px){.wrap{padding-top:40px}th,td{padding:14px 16px}.priority{display:none}}
        </style>
      </head>
      <body>
        <main class="wrap">
          <div class="eyebrow">Search engine index</div>
          <h1>XML Sitemap</h1>
          <p>This sitemap helps search engines discover the portfolio and all published engineering articles.</p>
          <section class="card">
            <div class="summary"><span>Alae-Eddine Sahbou</span><span><xsl:value-of select="count(sm:urlset/sm:url)"/> URLs</span></div>
            <div class="table-wrap">
              <table>
                <thead><tr><th>URL</th><th>Last updated</th><th>Frequency</th><th class="priority">Priority</th></tr></thead>
                <tbody>
                  <xsl:for-each select="sm:urlset/sm:url">
                    <tr>
                      <td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
                      <td class="meta"><xsl:value-of select="sm:lastmod"/></td>
                      <td class="meta"><xsl:value-of select="sm:changefreq"/></td>
                      <td class="meta priority"><xsl:value-of select="sm:priority"/></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`;

export async function GET() {
  return new Response(stylesheet, {
    headers: {
      "Content-Type": "text/xsl; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

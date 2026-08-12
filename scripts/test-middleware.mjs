/**
 * Ad-hoc verification of the compiled Vercel edge middleware.
 * Calls the production-built .vercel/output/functions/_middleware.func
 * directly with simulated crawler requests.
 */
import middleware from '../.vercel/output/functions/_middleware.func/middleware.mjs';

const cases = [
  { name: 'GPTBot /', ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2', url: 'https://sugarlite.top/' },
  { name: 'GPTBot /en/guide/blood-sugar-management', ua: 'GPTBot/1.0', url: 'https://sugarlite.top/en/guide/blood-sugar-management' },
  { name: 'ClaudeBot /ja', ua: 'ClaudeBot/1.0', url: 'https://sugarlite.top/ja' },
  { name: 'PerplexityBot /zh-Hant/faq', ua: 'PerplexityBot/1.0', url: 'https://sugarlite.top/zh-Hant/faq' },
  { name: 'CCBot /blog/what-is-hba1c', ua: 'CCBot/2.0 (https://commoncrawl.org/faq/)', url: 'https://sugarlite.top/blog/what-is-hba1c' },
  { name: '?llms=1 /', ua: 'curl/8.0', url: 'https://sugarlite.top/?llms=1' },
  { name: 'legacy /zh/foo (redirected path)', ua: 'GPTBot/1.0', url: 'https://sugarlite.top/zh/guide/diabetic-diet' },
  { name: 'Chrome UA / (should pass through)', ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', url: 'https://sugarlite.top/' },
  { name: 'Googlebot / (should pass through)', ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', url: 'https://sugarlite.top/' },
  { name: 'GPTBot /icon.png (asset passthrough)', ua: 'GPTBot/1.0', url: 'https://sugarlite.top/icon.png' },
  { name: 'GPTBot /robots.txt (passthrough)', ua: 'GPTBot/1.0', url: 'https://sugarlite.top/robots.txt' },
  { name: 'GPTBot /en/blog/ (EN blog)', ua: 'GPTBot/1.0', url: 'https://sugarlite.top/en/blog/' },
  { name: 'GPTBot /blog/what-is-hba1c (article passthrough)', ua: 'GPTBot/1.0', url: 'https://sugarlite.top/blog/what-is-hba1c' },
  { name: 'GPTBot /en/blog/normal-blood-sugar-chart (article passthrough)', ua: 'GPTBot/1.0', url: 'https://sugarlite.top/en/blog/normal-blood-sugar-chart' },
];

let failures = 0;
for (const c of cases) {
  try {
    const req = new Request(c.url, { headers: { 'user-agent': c.ua } });
    const res = await middleware(req, {});
    const text = await res.text();
    const isAiPage = text.includes('ai-note');
    console.log(`[${isAiPage ? 'AI ' : 'PASSTHRU'}] ${c.name}  -> status=${res.status}`);
    if (isAiPage) {
      const canonical = (text.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
      const h1 = (text.match(/<h1>([^<]+)<\/h1>/) || [])[1];
      const lang = (text.match(/<html lang="([^"]+)"/) || [])[1];
      const hasLlmsLink = text.includes('llms-full.txt');
      const hasHreflang = text.includes('hreflang="en"') && text.includes('hreflang="ja"');
      console.log(`   canonical=${canonical} lang=${lang} h1=${h1} llmsLink=${hasLlmsLink} hreflang=${hasHreflang}`);
      if (!canonical || !h1 || !hasLlmsLink || !hasHreflang) failures++;
    }
    // Assets and article pages always pass through, even for AI crawlers.
    const isAsset = /\.(png|txt|js|css|jpg|webp|avif|svg|xml)$/.test(c.url);
    const isArticle = /\/blog\/[^/]+\/?$/.test(c.url);
    const wantsAi = /GPTBot|ClaudeBot|PerplexityBot|CCBot|llms=1/.test(c.ua + c.url) && !isAsset && !isArticle;
    if (wantsAi && !isAiPage) failures++;
    if (!wantsAi && isAiPage) failures++;
  } catch (e) {
    // Pass-through to /_render is expected to fail outside Vercel.
    const passThrough = /_render/.test(String(e.message));
    console.log(`[PASSTHRU] ${c.name}  -> next() called (${passThrough ? 'expected outside-Vercel fetch error' : 'ERROR: ' + e.message.slice(0, 80)})`);
    if (!passThrough) failures++;
  }
}
console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);

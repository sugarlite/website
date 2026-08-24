import { buildBlogFeed } from '@/lib/feed';
import { getPageMeta } from '@/i18n/meta';
import type { APIContext } from 'astro';

export async function GET(_context: APIContext) {
  const meta = getPageMeta('blog', 'zh');
  return buildBlogFeed({ lang: 'zh', title: meta.title, description: meta.description });
}

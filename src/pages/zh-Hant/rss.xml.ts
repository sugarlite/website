import { buildBlogFeed } from '@/lib/feed';
import { getPageMeta } from '@/i18n/meta';

export async function GET() {
  const meta = getPageMeta('blog', 'zh-Hant');
  return buildBlogFeed({ lang: 'zh-Hant', title: meta.title, description: meta.description });
}

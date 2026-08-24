import { buildBlogFeed } from '@/lib/feed';
import { getPageMeta } from '@/i18n/meta';

export async function GET() {
  const meta = getPageMeta('blog', 'en');
  return buildBlogFeed({ lang: 'en', title: meta.title, description: meta.description });
}

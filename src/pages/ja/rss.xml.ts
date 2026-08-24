import { buildBlogFeed } from '@/lib/feed';
import { getPageMeta } from '@/i18n/meta';

export async function GET() {
  const meta = getPageMeta('blog', 'ja');
  return buildBlogFeed({ lang: 'ja', title: meta.title, description: meta.description });
}

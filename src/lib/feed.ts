import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { getLocalizedPath, LANG_TO_HTML_LANG, SITE } from '@/i18n/routing';
import type { Language } from '@/types';

interface FeedContext {
  lang: Language;
  title: string;
  description: string;
}

/**
 * Shared RSS feed builder for /rss.xml (zh) and /{lang}/rss.xml.
 * Items come from the blog content collection for the given locale.
 *
 * NOTE: Astro's glob loader lowercases entry ids (github-slugger), so
 * `-zh-Hant` files get ids ending in `-zh-hant`. Compare case-insensitively.
 */
export async function buildBlogFeed(context: FeedContext) {
  const { lang } = context;
  const suffix = `-${lang}`.toLowerCase();
  const posts = await getCollection(
    'blog',
    (entry: CollectionEntry<'blog'>) => entry.id.toLowerCase().endsWith(suffix)
  );

  const items = posts
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(`${post.data.pubDate}T00:00:00+08:00`),
      link: getLocalizedPath(lang, `blog/${post.id.replace(new RegExp(`-${lang}$`, 'i'), '')}`),
      categories: [post.data.keywords],
    }))
    // Deterministic order: newest first
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: context.title,
    description: context.description,
    site: SITE,
    items,
    customData: `<language>${LANG_TO_HTML_LANG[lang]}</language>`,
  });
}

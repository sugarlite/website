import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string(),
    updatedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    excerpt: z.string(),
    cover: z.string().optional(),
    ogImage: z.string().optional(),
    relatedSlugs: z.array(z.string()).default([]),
  }),
});

export const collections = {
  blog: blogCollection,
};

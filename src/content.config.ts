import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    type: z.enum(['seo', 'conversion', 'nicho']),
    keywords: z.array(z.string()),
    readingTime: z.string(),
    ctaText: z.string(),
    ctaLink: z.string(),
    relatedSlugs: z.array(z.string()).optional(),
    coverImage: z.string(),
    ogImage: z.string().optional(),
  }),
});

export const collections = { blog };

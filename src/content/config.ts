import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    longDescription: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()),
    type: z.string(),
    link: z.string().url().optional(),
    github: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { projects };

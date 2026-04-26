import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://vertexnova.github.io',
  integrations: [sitemap(), mdx()],
  redirects: {
    '/learn': '/notes',
    '/learn/learn_files/cheatsheet': '/notes/references/ml-stack-reference',
    '/notes/learn_files/cheatsheet': '/notes/references/ml-stack-reference',
  },
});

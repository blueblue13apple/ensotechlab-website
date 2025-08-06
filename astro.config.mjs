import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static'; // ★ここを 'static' に変更★

// https://astro.build/config
export default defineConfig({
  output: 'static', // ★ここを 'static' に変更★
  adapter: vercel({
    // Vercelに静的出力としてデプロイ
  }),
  integrations: []
});
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // Vercelアダプターをインポート

// https://astro.build/config
export default defineConfig({
  output: 'server', // Vercelデプロイ用に 'server' に設定
  adapter: vercel(), // Vercelアダプターを使用
  integrations: [],
});
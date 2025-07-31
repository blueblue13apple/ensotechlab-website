import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // Import vercel adapter

// https://astro.build/config
export default defineConfig({
  output: 'server', // Server-side rendering
  adapter: vercel({
    // Add Node.js runtime option here
    edge: false, // Set to true if you want to use Edge Functions, otherwise false for Serverless Functions
    node: "20.x" // Explicitly specify Node.js version for Serverless Functions
  }),
  integrations: []
});
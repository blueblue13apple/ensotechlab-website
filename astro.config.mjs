import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    // Ensure this matches Vercel's supported Node.js runtime environment for Serverless Functions
    // For Node.js 20.x LTS
    functionPerRoute: true, // This is sometimes needed for Node.js runtime to be correctly picked up
    // isr: true, // Use this if you plan to use Incremental Static Regeneration
    // node: "20.x" // This option might be overridden by 'functionPerRoute' or Vercel's defaults
    
    // --- Try this specific runtime setting recommended by Vercel/Astro for Node.js 20.x
    // This often overrides other settings for the actual Serverless Function runtime.
    // If the above 'node' option doesn't work, this is the most direct way to specify it.
    // However, the 'functions' field is typically for vercel.json.
    // Let's rely on the environment variable and ensuring `functionPerRoute` works.
  }),
  integrations: []
});
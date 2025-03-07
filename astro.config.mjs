import { defineConfig } from 'astro/config'
import tailwind from "@astrojs/tailwind"

import robotsTxt from "astro-robots-txt"

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), robotsTxt()],
  site: 'https://lucianandreinegoita.dev/',
  vite: {
    define: {
      'process.env.LANGUAGES': JSON.stringify(['es', 'en']),
      'process.env.DEFAULT_LANGUAGE': JSON.stringify('es')
    }
  }
})

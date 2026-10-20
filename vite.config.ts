import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/GenContreras-Portfolio/' : '/',
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: process.env.GITHUB_PAGES === 'true',
        failOnError: true,
        crawlLinks: false,
      },
    }),
    viteReact(),
  ],
})

export default config

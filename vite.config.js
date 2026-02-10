import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    global: 'globalThis',
    'window.jQuery': 'window.jQuery',
    'window.$': 'window.$'
  },
  optimizeDeps: {
    include: ['jquery', 'trumbowyg']
  }
})

// export default {
//   define: {
//     'window.jQuery': 'window.jQuery || {}',
//     'window.$': 'window.$ || {}',
//   },
// };

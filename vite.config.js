import { defineConfig } from 'vite'

export default defineConfig({
  base: '/wpe/2023-08-27/',
  build: {
    target: "esnext",
    lib: {
      entry: 'index.html',
      formats: [ 'es' ],
    },
    esbuild: {
      supported: {
        'top-level-await': true // Browsers can handle top-level-await features
      }
    }
  }

})
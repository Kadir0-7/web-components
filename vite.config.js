import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    
  plugins: [
    VitePWA({
 registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
         
      },
      strategies: 'injectManifest',
     injectManifest: {
      filename: './sw.js',
          globPatterns: ['**/*.html'],
        },
      
    }),
  ],
});

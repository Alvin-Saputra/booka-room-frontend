import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';

export default defineConfig({
  plugins: [
    HstVue(),
  ],
  // Arahkan ke file setup yang baru saja kita buat
  setupFile: './src/histoire.setup.js', 
});
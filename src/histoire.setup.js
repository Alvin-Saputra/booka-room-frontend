import { defineSetupVue3 } from '@histoire/plugin-vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// 1. Import CSS Vuetify
import 'vuetify/styles'; 

// 2. Import file CSS global Anda tempat Tailwind berada (sesuaikan path-nya!)
import './assets/main.css'; 

// Inisialisasi Vuetify
const vuetify = createVuetify({
  components,
  directives,
});

// Daftarkan ke instance Vue milik Histoire
export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(vuetify);
});
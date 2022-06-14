import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    projectId: 'm4b59d',
    baseUrl: 'http://localhost:19006',
  },
});

import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 20000,
  video: false,
  e2e: {
    baseUrl: 'http://nextjs:3000',
    supportFile: false,
  },
})

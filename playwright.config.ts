import { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'http://google.com/',
    browserName: 'chromium',
    headless: false,
  },
  reporter: [ ['junit', { outputFile: 'results.xml' }] ],
};
export default config;
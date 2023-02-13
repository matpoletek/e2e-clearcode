const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://clearcodehq.github.io/qa-intern-test/#/home',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

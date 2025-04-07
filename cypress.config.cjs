const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: "cypress/support/e2e.ts",
    fixturesFolder: "cypress/fixtures",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});

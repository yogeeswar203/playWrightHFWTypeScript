const report = require("multiple-cucumber-html-reporter/lib/generate-report");

report.generate({
  jsonDir: "src/test-results", // Directory where the JSON file is generated
  reportPath: "src/test-results/reports", // Where the final HTML will be saved
  reportName: "Playwright Automation Execution Report",
  pageTitle: "Test Report",
  displayDuration: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "latest",
    },
    device: "Local Test Machine",
    platform: {
      name: "Windows",
      version: "11",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "OrangeHRM Hybrid Framework" },
      { label: "Release", value: "1.0" },
      { label: "Execution Time", value: new Date().toLocaleString() }
    ],
  },
});
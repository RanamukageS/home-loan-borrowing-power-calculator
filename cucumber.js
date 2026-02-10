module.exports = {
  default: {
    require: ['features/step_definitions/**/*.js', 'features/support/**/*.js'],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html',
      'junit:reports/cucumber-report.xml'
    ],
    timeout: 60000
  },
  chrome: {
    require: ['features/step_definitions/**/*.js', 'features/support/**/*.js'],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html',
      'junit:reports/cucumber-report.xml'
    ],
    timeout: 60000
  }
};

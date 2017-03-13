const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const promiseMatchers = require('@pietvanzoen/jasmine-promise-matchers');

// Custom reporter
if (!global.wallaby) {
  jasmine.getEnv().clearReporters();
  jasmine.getEnv().addReporter(new SpecReporter({
    spec: {
      displayPending: true
    },
    summary: {
      displayPending: false
    }
  }));
}

beforeEach(function() {
  promiseMatchers.install(jasmine);
});

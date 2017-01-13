module.exports = function() {
  return {
    files: ['lib/**/*', 'test/_helpers/**/*','test/build/**/*'],
    tests: ['test/**/*.spec.js'],
    testFramework: 'jasmine',
    setup: function() {
      require('./test/_helpers/setup')
    },
    env: {
      type: 'node',
      // runner: 'path/to/your/node/executable'
    }
  };
};

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    reporters: ['progress', 'kjhtml', 'junit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeCustom: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--cap-add=SYS_ADMIN'] //evil hack for bamboo
      },
      ChromeDebug: {
        base: 'Chrome',
        flags: ['--remote-debugging-port=9229']
      }
    },
    singleRun: false,
    junitReporter: {
        outputDir: 'target', // results will be saved as $outputDir/$browserName.xml
        outputFile: 'angular-report.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
        suite: '', // suite will become the package name attribute in xml testsuite element
        useBrowserName: false, // add browser name to report and classes names
    }
  });
};

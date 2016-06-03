var fs = require('fs');
var path = require('path');
var REGEX_TEST = /\-test\.js$/;

function findTests(dir) {
  var tests = [];
  fs.readdirSync(dir).forEach(function (file) {
    file = path.resolve(dir, file);
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      tests = tests.concat(findTests(file));
    } else if (REGEX_TEST.test(file)) {
      tests.push(file);
    }
  });
  return tests;
}

var tests = findTests(path.resolve(process.cwd(), 'lib'));

module.exports = function(config) {
  var conf = {
    basePath: '',

    frameworks: ['mocha'],

    files: tests,

    preprocessors: {},

    reporters: ['dots'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Firefox'],

    captureTimeout: 60000,

    singleRun: true,

    webpack: {
      cache: true,
      devtool: 'source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      }
    },

    webpackServer: {
      stats: {
        colors: true
      }
    }
  };

  tests.forEach(function (test) {
    conf.preprocessors[test] = ['webpack', 'sourcemap'];
  });

  config.set(conf);
};

'use strict';
angular.module('main')
.constant('Config', {

  // gulp environment: injects environment vars
  // https://github.com/mwaylabs/generator-m-ionic#gulp-environment
  ENV: {
    /*inject-env*/
    'parse': {
      'appId': '8372292964',
      'serverUrl': 'https://latinoism.herokuapp.com/parse'
    },
    'push': {
      'appId': '142F6-DB8A9',
      'googleProjectNumber': '491285450192'
    },
    'admob': {
      'interstitialForAndroid': 'ca-app-pub-6295754308520131~1534483004',
      'interstitialForiOS': 'ca-app-pub-6295754308520131~1255281402',
      'bannerId': null
    },
    'gaTrackingId': 'UA-88091831-1',
    'theme': 'nearme',
    'unit': 'mi',
    'mapType': 'normal',
    'statusBarColor': '#1b68ea'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  // https://github.com/mwaylabs/generator-m-ionic#gulp-build-vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});

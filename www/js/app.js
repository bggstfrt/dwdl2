// Ionic Starter App

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'starter.components'])

.run(function($ionicPlatform, $rootScope, GeoTools) {
      var instagramCliendID = '4e86eabba7484ba28e4fe6af77d6ca68';
      $rootScope.config = {
        appVersion: '0.1',
        serverHost: 'http://dev-test.asuscomm.com:3000',
        instagramCliendID: instagramCliendID


      };
      GeoTools.init();

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // Init Geo data
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

      .state('tab.location', {
        url: '/location',
        views: {
          'tab-location': {
            templateUrl: 'templates/tab-location.html',
            controller: 'LocationCtrl'
          }
        }
      })

      .state('tab.lists', {
        url: '/lists',
        views: {
          'tab-lists': {
            templateUrl: 'templates/tab-lists.html',
            controller: 'ListsCtrl'
          }
        }
      })
      .state('tab.lists-details', {
        url: '/places/:placeId',
        views: {
          'tab-lists': {
            templateUrl: 'templates/tab-details.html',
            controller: 'DetailsCtrl'
          }
        }
      })

      .state('tab.plus', {
        url: '/plus',
        views: {
          'tab-plus': {
            templateUrl: 'templates/tab-plus.html',
            controller: 'PlusCtrl'
          }
        }
      })
      .state('tab.ring', {
        url: '/ring',
        views: {
          'tab-ring': {
            templateUrl: 'templates/tab-ring.html',
            controller: 'RingCtrl'
          }
        }
      })
      .state('tab.search', {
        url: '/search',
        views: {
          'tab-search': {
            templateUrl: 'templates/tab-search.html',
            controller: 'SearchCtrl'
          }
        }
      })


      .state('tab.intro', {
        url: '/intro',
        views: {
          'tab-intro': {
            templateUrl: 'templates/tab-intro.html',
            controller: 'IntroCtrl'
          }
        }
      })
      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/intro');

});

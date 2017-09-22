angular.module('MyApp', ['ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'satellizer', 'ngMaterial', 'nvd3'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {
    /**
     * App routes
     */

     var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
       var deferred = $q.defer();
       if ($auth.isAuthenticated()) {
         deferred.reject();
       } else {
         deferred.resolve();
       }
       return deferred.promise;
     }];

     var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
       var deferred = $q.defer();
       if ($auth.isAuthenticated()) {
         deferred.resolve();
       } else {
         $location.path('/login');
       }
       return deferred.promise;
     }];

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'partials/home.html',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('home.patients', {
        url: 'patients',
        controller: 'PatientsCtrl',
        templateUrl: 'partials/patients.html',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('home.plans', {
        url: 'plans',
        controller: 'PlansCtrl',
        templateUrl: 'partials/plans.html',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('home.statistics', {
        url: 'statistics',
        controller: 'StatisticsCtrl',
        templateUrl: 'partials/statistics.html',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl'
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      });
    $urlRouterProvider.otherwise('/login');

  });

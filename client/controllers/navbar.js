angular.module('MyApp')
  .controller('NavbarCtrl', function($scope, $auth) {
    console.log('NavbarCtrl');
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
  });

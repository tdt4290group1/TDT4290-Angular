angular.module('MyApp')
  .controller('HomeCtrl', function($scope, $http, $mdSidenav, $state) {
    $scope.data = {};
    $scope.data.sideBarOpen = true;
    $scope.toggleLeft = function() {
      $scope.data.sideBarOpen = !$scope.data.sideBarOpen;
    }
    $scope.goToState = function(name) {
      $state.go(name);
    }
  });

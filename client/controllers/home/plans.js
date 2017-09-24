angular.module('MyApp')
  .controller('PlansCtrl', function($scope, $http, $mdSidenav, $state, Account, $auth, $rootScope) {
    console.log('PlansCtrl');
    $scope.data = {
      plans: []
    }
    updatePlans();
    $scope.goToState = function(name) {
      $state.go(name);
    }

    function updatePlans() {
      Account.getPlans().success(function(result) {
        console.log(result);
        $scope.data.plans = result;
      }).catch(function(err) {
        console.log(err);
      });
    }

    $rootScope.$on('updatePlans',updatePlans);

  });

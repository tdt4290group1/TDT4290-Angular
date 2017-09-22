angular.module('MyApp')
  .controller('LoginCtrl', function($scope, $location, $auth, toastr, $http, $state) {
    $scope.data = {
      username: '',
      password: ''
    }

    $scope.login = function() {

      $http.post(baseUrl + '/obtain-auth-token/', {
        username: $scope.data.username,
        password: $scope.data.password
      }).success(function(response) {
        $auth.setToken(response.token);
        $state.go('home.patients');
      }).catch(function(err) {
        console.log(err);
      })

    };
  });

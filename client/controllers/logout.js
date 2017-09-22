angular.module('MyApp')
  .controller('LogoutCtrl', function($location, $auth, toastr) {
    if (!$auth.isAuthenticated()) {
      $location.path('/login');
      return;
    }
    $auth.logout()
      .then(function() {
        toastr.info('You have been logged out');
        $location.path('/login');
      });
  });

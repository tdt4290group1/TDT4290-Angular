angular.module('MyApp')
  .factory('Account', function($http) {
    return {
      getProfile: function() {
        return $http.get(baseUrl + '/api/me');
      },
      addPlan: function(data) {
        return $http.post(baseUrl + '/api/instructor/general-plan/', data);
      },
      getPlans: function() {
        return $http.get(baseUrl + '/api/instructor/general-plan/');
      }
    };
  });

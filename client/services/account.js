angular.module('MyApp')
  .factory('Account', function($http) {
    return {
      getProfile: function() {
        return $http.get(baseUrl + '/api/me');
      },
      updateProfile: function(profileData) {
        return $http.put(baseUrl + '/api/me', profileData);
      }
    };
  });

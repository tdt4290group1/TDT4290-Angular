angular.module('MyApp')
  .factory('Account', function($http) {

    var api = {
      getPatients: 'http://kek.science.no/api/patients',
      getPlans: 'http://kek.science.no/api/plans',
      getStatistics: 'http://kek.science.no/api/plans'
    }

    return {
      getPatients: function() {
        return $http.get(api.getPatients);
      },
      addPlan: function(data) {
        return $http.post(baseUrl + '/api/instructor/general-plan/', data);
      },
      getPlans: function() {
        return $http.get(baseUrl + '/api/instructor/general-plan/');
      }
    };
  });

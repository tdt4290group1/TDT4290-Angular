angular.module('MyApp')
  .controller('PatientsCtrl', function($scope, $http, $mdSidenav) {
    console.log('PatientsCtrl');
    $scope.name = '';
    $scope.data = {
      users: [{
        id: '123456',
        name: 'Dosage Dosagesen',
        newName: 'Dosage Dosagesen',
        plan: 'SteroidMaxMe'
      }]
    }
  });

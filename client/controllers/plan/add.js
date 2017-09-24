angular.module('MyApp')
  .controller('AddPlanCtrl', function($scope, $http, $mdSidenav, $state, Account, $auth, $mdDialog, $rootScope) {
    console.log('AddPlanCtrl');
    $scope.data = {
      title: '',
      comment: '',
      length: null,
      weekInterval: 5,
      fromWeek: 1,
      toWeek: 5,
      maxHeight: 60,
      heightDifference: 0.25
    }
    // keys based on fromWeek for each plan interval
    $scope.planLines = {};

    $scope.addPlan = function() {
      if (!$scope.data.title) {
        return showPopup('Plan title not provided!', 'Please provide a plan title.', function() {});
      }
      if (!$scope.data.comment) {
        return showPopup('Plan description not provided!', 'Please provide a plan description.', function() {});
      }
      if (!$scope.data.length) {
        return showPopup('Plan length not provided!', 'Please provide a plan length.', function() {});
      }
      // save current lines
      $scope.planLines[$scope.data.fromWeek] = $scope.dataSet[1].values;
      var dosages = getDosages();
      if (!dosages.valid) {
        console.log(8);
        return;
      }

      Account.addPlan({
        title: $scope.data.title,
        comment: $scope.data.comment,
        dosages: dosages.dosages
      }).success(function(result) {
        console.log(result);
        $rootScope.$broadcast('updatePlans');
        $state.go('home.plans');
      }).catch(function(err) {
        console.log(err);
        showPopup('Could not add plan!', 'All required fields not provided.', function() {});
      })
    }




    $scope.goToState = function(name) {
      $state.go(name);
    }

    $scope.next = function() {
      var planLine = null;
      // save current plan line
      $scope.planLines[$scope.data.fromWeek] = $scope.dataSet[1].values;
      // add to new from week and to week
      $scope.data.fromWeek += $scope.data.weekInterval;
      $scope.data.toWeek += $scope.data.weekInterval;
      // if plan line for new fromWeek exists, use these values, if not generate new
      if ($scope.planLines[$scope.data.fromWeek]) {
        planLine = $scope.planLines[$scope.data.fromWeek];
      } else {
        // get ending height for plan
        var lastIntervalHeight = $scope.dataSet[1].values[$scope.dataSet[1].values.length-1].y;
        planLine = generatePlanLine(lastIntervalHeight, $scope.data.toWeek, 1, $scope.data.fromWeek);
      }
      var dataSet = [{
         key: 'mg',
         color: 'transparent',
         values: generateGrid($scope.data.maxHeight, $scope.data.heightDifference, $scope.data.toWeek, 1, $scope.data.fromWeek)
       },{
         key: 'Current plan',
         color: '#1F77B4',
         values: planLine
       }];
       if ($scope.data.length && $scope.data.fromWeek <= $scope.data.length && $scope.data.toWeek >= $scope.data.length) {
         dataSet.push({
           key: 'plan end',
           color: '#FF0000',
           values: [{
             x: $scope.data.length,
             y: 0,
             series: 2
           },{
             x: $scope.data.length,
             y: $scope.data.maxHeight,
             series: 2
           }]
         });
       }
      $scope.dataSet = dataSet;
    }

    $scope.previous = function() {
      var planLine = null;
      // save current plan line
      $scope.planLines[$scope.data.fromWeek] = $scope.dataSet[1].values;
      // add to new from week and to week
      $scope.data.fromWeek -= $scope.data.weekInterval;
      $scope.data.toWeek -= $scope.data.weekInterval;
      // if plan line for new fromWeek exists, use these values, if not generate new
      if ($scope.planLines[$scope.data.fromWeek]) {
        planLine = $scope.planLines[$scope.data.fromWeek];
      } else {
        planLine = generatePlanLine($scope.data.maxHeight, $scope.data.toWeek, 1, $scope.data.fromWeek);
      }
      var dataSet = [{
         key: 'mg',
         color: 'transparent',
         values: generateGrid($scope.data.maxHeight, $scope.data.heightDifference, $scope.data.toWeek, 1, $scope.data.fromWeek)
       },{
         key: 'Current plan',
         color: '#1F77B4',
         values: planLine
       }];
      if ($scope.data.length && $scope.data.fromWeek <= $scope.data.length && $scope.data.toWeek >= $scope.data.length) {
        dataSet.push({
          key: 'plan end',
          color: '#FF0000',
          values: [{
            x: $scope.data.length,
            y: 0,
            series: 2
          },{
            x: $scope.data.length,
            y: $scope.data.maxHeight,
            series: 2
          }]
        });
      }
      $scope.dataSet = dataSet;
    }

    $scope.dataSet = [{
       key: 'mg',
       color: 'transparent',
       values: generateGrid($scope.data.maxHeight, $scope.data.heightDifference, $scope.data.toWeek, 1, $scope.data.fromWeek)
     },{
       key: 'Current plan',
       color: '#1F77B4',
       values: generatePlanLine($scope.data.maxHeight, $scope.data.toWeek, 1, $scope.data.fromWeek)
     }];
     $scope.options = {
                chart: {
                  //tooltips events
                  lines: {
                    dispatch: {
                        chartClick: function(e) {
                        },
                        elementClick: function(e) {
                          if (e.point.series == 0) {
                            var firstYValue = null;
                            var newValues = $scope.dataSet[1].values;
                            for (var i = 0; i < newValues.length; i++) {
                              if (firstYValue && newValues[i].y != firstYValue) {
                                break;
                              }
                              if (newValues[i].x >= e.point.x && (newValues[i].y == firstYValue || firstYValue == null)) {
                                if (!firstYValue) {
                                  firstYValue = parseFloat('' + newValues[i].y +'');
                                }
                                newValues[i].y = parseFloat('' + e.point.y +'');
                              }

                            }

                            $scope.dataSet[1].values = newValues;
                            $scope.$apply();
                          }
                        },
                        elementMouseout: function(e) {console.log(1);}
                    }
                  },
                  dispatch: {
                      chartClick: function(e) {console.log(1);}
                  },
                    type: 'lineWithFocusChart',
                    height: 2000,
                    width: 1000,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 40
                    },
                    duration: 50,
                    xAxis: {
                        axisLabel: 'Week',
                        tickFormat: function(d){
                            return d3.format(',f')(d);
                        }
                    },
                    x2Axis: {
                        tickFormat: function(d){
                            return d3.format(',f')(d);
                        }
                    },
                    yAxis: {
                        axisLabel: 'mg',
                        tickFormat: function(d){
                            return d3.format(',.2f')(d);
                        },
                        rotateYLabel: false
                    },
                    y2Axis: {
                        tickFormat: function(d){
                            return d3.format(',.2f')(d);
                        }
                    },
                    tooltip: {
                      contentGenerator: function(e) {  return ' Week: <b>'+e.point.x+'</b> <br>Dosage: <b>' +e.point.y+' mg</b>'; }
                    }
                }
            };


      function getDosages() {
        $scope.planLines[$scope.data.fromWeek] = $scope.dataSet[1].values;
        var keys = Object.keys($scope.planLines);
        var weekArray = [];
        for (var i = 0; i < keys.length; i++) {
          weekArray = weekArray.concat($scope.planLines[keys[i]]);
        }
        if (weekArray.length < $scope.data.length) {
          showPopup('Not enough dosages!', 'Please provide dosages for all ' + $scope.data.length + ' weeks.', function() {});
          return {dosages: [], valid: false};
        }
        var dosages = [];
        for (var i = 0; i < $scope.data.length; i++) {
          dosages.push({
            offset: i*7 + ' 00:00:00.000000',
            amount: weekArray[i].y
          });
        }
        return {dosages: dosages, valid: true};

      }

      function generatePlanLine(maxHeight=60, maxWidth=52, widthDifference=1, startPoint=5) {
        var numberOfColumns = startPoint+ (maxWidth-startPoint) + 1;
        var values = [];
        for (var i = startPoint; i < numberOfColumns; i++) {
          values.push({
            x: i,
            y: maxHeight,
            series: 1
          });
        };
        return values;
      }

      function generateGrid(maxHeight=60, heightDifference=0.25, maxWidth=52, widthDifference=1, startPoint=5) {
        var numberOfColumns = startPoint + (maxWidth-startPoint);
        var values = [];
        // total number of rows
        var rowNumber = 0;
        // total number of cols
        var columnNumber = 0;
        var currentHeight = 0;
        for (var i = maxHeight; i > -1; i-=heightDifference) {
          // partall
          if (i % (heightDifference*2) == 0) {
            for (var j = startPoint; j < numberOfColumns; j++) {
              values.push({x: j, y: i, series: 0});
            }
            values.push({x: numberOfColumns, y: i, series: 0});
          // oddetall
          } else {
            for (var j = numberOfColumns; j > startPoint-1; j--) {
              values.push({x: j, y: i, series: 0})
            }
          }
        }
        return values;
      }

      function showPopup(title, message, cb) {
        var alert = $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title(title)
          .content(message)
          .ariaLabel('Alert Dialog Demo')
          .ok('Ok');
        $mdDialog.show(alert).then(cb);
      };
  });

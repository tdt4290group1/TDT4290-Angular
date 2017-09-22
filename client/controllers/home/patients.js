angular.module('MyApp')
  .controller('PatientsCtrl', function($scope, $http, $mdSidenav) {
    console.log('PatientsCtrl');
    $scope.data = {
      users: [{
        id: '123456',
        name: 'Dosage Dosagesen',
        newName: 'Dosage Dosagesen',
        plan: 'SteroidMaxMe'
      }]
    }
    $scope.options = {
               chart: {
                 //tooltips events
                 lines: {
                   dispatch: {
                       chartClick: function(e) {console.log(1);},
                       elementClick: function(e) {console.log(1);},
                       elementMouseout: function(e) {console.log(1);}
                   }
                 },
                 dispatch: {
                     chartClick: function(e) {console.log(1);}
                 },
                   type: 'lineWithFocusChart',
                   height: 450,
                   width: 1000,
                   margin : {
                       top: 20,
                       right: 20,
                       bottom: 60,
                       left: 40
                   },
                   duration: 50,
                   xAxis: {
                       axisLabel: 'X Axis',
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
                       axisLabel: 'Y Axis',
                       tickFormat: function(d){
                           return d3.format(',.2f')(d);
                       },
                       rotateYLabel: false
                   },
                   y2Axis: {
                       tickFormat: function(d){
                           return d3.format(',.2f')(d);
                       }
                   }
               }
           };

           function generateGrid(maxHeight, heightDifference, maxWidth, widthDifference) {
             var numberOfRows = maxHeight/heightDifference;
             var numberOfColumns = maxWidth/widthDifference;
             var values = [];
             // total number of rows
             var rowNumber = 0;
             // total number of cols
             var columnNumber = 0;
             while (rowNumber < numberOfRows) {

             }
           }

           $scope.dataSet = [{
             key: '',
             values: [
               {
               x: 0,
               y: 1,
               series: 0
             },
             {
             x: 1,
             y: 1,
             series: 0
              },
              {
              x: 2,
              y: 1,
              series: 0
               },
               {
               x: 2,
               y: 0,
               series: 0
                },
                {
                x: 1,
                y: 0,
                series: 0
                 },
                 {
                 x: 1,
                 y: 1,
                 series: 0
                  },
                  {
                  x: 0,
                  y: 1,
                  series: 0
                   },
                   {
                   x: 0,
                   y: 0,
                   series: 0
                    },
                    {
                    x: 1,
                    y: 0,
                    series: 0
                     }
              ]
           }]
           console.log($scope.dataSet);

           /* Random Data Generator (took from nvd3.org) */
           function generateData() {
               return stream_layers(3,10+Math.random()*200,.1).map(function(data, i) {
                   return {
                       key: 'Stream' + i,
                       values: data
                   };
               });
           }

           /* Inspired by Lee Byron's test data generator. */
           function stream_layers(n, m, o) {
               if (arguments.length < 3) o = 0;
               function bump(a) {
                   var x = 1 / (.1 + Math.random()),
                       y = 2 * Math.random() - .5,
                       z = 10 / (.1 + Math.random());
                   for (var i = 0; i < m; i++) {
                       var w = (i / m - y) * z;
                       a[i] += x * Math.exp(-w * w);
                   }
               }
               return d3.range(n).map(function() {
                   var a = [], i;
                   for (i = 0; i < m; i++) a[i] = o + o * Math.random();
                   for (i = 0; i < 5; i++) bump(a);
                   return a.map(stream_index);
               });
           }

           /* Another layer generator using gamma distributions. */
           function stream_waves(n, m) {
               return d3.range(n).map(function(i) {
                   return d3.range(m).map(function(j) {
                       var x = 20 * j / m - i / 3;
                       return 2 * x * Math.exp(-.5 * x);
                   }).map(stream_index);
               });
           }

           function stream_index(d, i) {
               return {x: i, y: Math.max(0, d)};
           }
  });

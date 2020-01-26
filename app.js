//module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//routes
weatherApp.config(function ($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'pages/inputPage.html',
            controller: 'input.controller'

        })

        .when('/forecast', {
            templateUrl: 'pages/infoPage.html',
            controller: 'info.controller'
        })
        
        .when('/forecast/:para', {
            templateUrl: 'pages/infoPage.html',
            controller: 'info.controller'
        })
});

//services
weatherApp.service('cityService', function () {

    this.city = "ramat yishai";
});


//controllers
weatherApp.controller('input.controller', ['$scope', 'cityService', function ($scope, cityService) {

    $scope.city = cityService.city;
    $scope.$watch('city', function(){
        cityService.city=$scope.city;
    })
}]);
weatherApp.controller('info.controller', ['$scope','$resource', '$routeParams', 'cityService', function ($scope, $resource, $routeParams, cityService) {

    $scope.shitman = function(deti) {
        return new Date(deti*1000);
    }

    $scope.city = cityService.city;
    $scope.para = $routeParams.para || 100;
    // debugger;
    $scope.weatherAPI= $resource('http://api.openweathermap.org/data/2.5/forecast', {callback: "JSON_CALLBACK"},{get: {method:"JSONP"}});    

    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.para, appid: 'a63568e4ccc3654009d135fb02b98a62', units: "metric"});
    // $scope.list= $scope.weatherResult.list;
    console.log($scope.weatherResult);
    // var table =[[]];
    // var i=0;
    // do {
    //     for (let index = 0; index < 7; index++) {
    //     table[index].push($scope.list[i]);
    //     i++;
    //     }
    // }
    // while(i<$scope.list.length);

// console.log(table);  
    async function init($scope) {}
// init($scope);

}]);
//new york

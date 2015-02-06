'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
    'ngRoute',
    'phonecatAnimations',
    'phonecatControllers',
    'phonecatFilters',
    'phonecatServices'
]);

phonecatApp.config(['$routeProvider',  '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/test1', {
                templateUrl: 'partials/test1.html',
                controller: 'Test1Controller'
            }).
            when('/test2', {
                templateUrl: 'partials/test2.html',
                controller: 'Test2Controller'
            }).
            when('/test3', {
                templateUrl: 'partials/test3.html',
                controller: 'Test3Controller'
            }).
            when('/phones', {
                templateUrl: 'partials/phones.html',
                controller: 'PhonesController'
            }).
            when('/phones/:phoneId', {
                templateUrl: 'partials/phone-detail.html',
                controller: 'PhoneDetailCtrl'
            }).
            otherwise({
                redirectTo: '/test1'
            });
        $locationProvider.html5Mode(true);
    }]);

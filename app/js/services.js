'use strict';

/* Services */
/*The batchLog service depends on the built-in $interval and $log services.
 The routeTemplateMonitor service depends on the built-in $route service and our custom batchLog service.
 Both services use the array notation to declare their dependencies.
 The order of identifiers in the array is the same as the order of argument names in the factory function.
 */
var batchModule = angular.module('batchModule', []);

/**
 * The `batchLog` service allows for messages to be queued in memory and flushed
 * to the console.log every 50 seconds.
 *
 * @param {*} message Message to be logged.
 */
batchModule.factory('batchLog', ['$interval', '$log', function ($interval, $log) {
    var messageQueue = [];

    function log() {
        if (messageQueue.length) {
            $log.log('batchLog messages: ', messageQueue);
            messageQueue = [];
        }
    }

    // start periodic checking
    $interval(log, 3000);

    return function (message) {
        messageQueue.push(message);
    }
}]);

/**
 * `routeTemplateMonitor` monitors each `$route` change and logs the current
 * template via the `batchLog` service.
 */
batchModule.factory('routeTemplateMonitor', ['$route', 'batchLog', '$rootScope',
    function ($route, batchLog, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function () {
            batchLog($route.current ? $route.current.template : null);
        });
    }]);


var phonecatServices = angular.module('phonecatServices', ['ngResource', 'ngRoute']);

phonecatServices.factory('Phone', ['$resource',
    function ($resource) {
        return $resource('phones/:phoneId.json', {}, {
            query: {method: 'GET', params: {phoneId: 'phones'}, isArray: true}
        });
    }]);


phonecatServices.factory('Test2', function ($resource) {
    return $resource('/api/test2', {}, {
        query: { method: 'GET', isArray: false} //, responseType:"json" }
    });
});
phonecatServices.factory('Phone_db', function ($resource) {
    return $resource('/api/getphones', {}, {
        query: { method: 'GET', isArray: false} //, responseType:"json" }
    });
});

/* very preliminary example, sort of leading/misleading,
 the actual http restful service loading shd be delayed until controller calling.
 i.e. the http response callback should not be  done here , shd be  done later,

 phonecatServices.factory('Phone_db', ['$http', '$location',

 function ($http, $location) {
 var _query = function () {
 var phones = [];
 var url = 'https://' + $location.host() + ':' + $location.port() + '/api/getphones';
 //call backend express to get phones data
 console.log(url);
 $http.get(url).success(function (data) {
 phones = data;
 });
 // this.query=function(){return phones };
 return phones;
 };
 var _get=function(obj){ return {}; };
 var _test= function(){
 var posts={};
 var url = 'https://' + $location.host() + ':' + $location.port() + '/api/posts';
 //call backend express to get phones data
 console.log(url);
 $http.get(url).success(function (data) {
 posts = data.posts;
 });
 // this.query=function(){return phones };
 return posts;
 };
 return {query:_query, get:_get, test:_test};
 }]);
 */

phonecatServices.service('Test1', function () {
    this.add = function (a, b) {
        return a + b
    };

    this.subtract = function (a, b) {
        return a - b
    };

    this.multiply = function (a, b) {
        return a * b
    };

    this.divide = function (a, b) {
        return a / b
    };
});


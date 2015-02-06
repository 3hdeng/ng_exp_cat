'use strict';

/* Controllers */
//===
var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('Test3Controller', ['$scope', 'notify', function ($scope, notify) {
        $scope.callNotify = function (msg) {
            notify(msg);
        };
    }]).
    factory('notify', ['$window', function (win) {
        var msgs = [];
        return function (msg) {
            msgs.push(msg);
            if (msgs.length == 3) {
                win.alert(msgs.join("\n"));
                msgs = [];
            }
        };
    }]);

phonecatControllers.controller('Test1Controller', ['$scope', 'Test1',
    function ($scope, Test1) {
        $scope.name = 'Test1Controller call Test1 service.add(1,2 ) == ' + Test1.add(1,2);
    }]);


phonecatControllers.controller('Test2Controller', ['$scope', 'Test2',
    function ($scope, Test2) {
        $scope.test_phones =['motorola', 'ericsson', 'lg310', 'samsung201'];
        Test2.query(function(data){$scope.phones=data.phones;});
    }]);


phonecatControllers.controller('PhonesController', ['$scope', 'Phone_db', 'Test1',
    function ($scope, Phone_db, Test1) {
        Phone_db.query(function(data){$scope.phones=data.phones;});
        $scope.orderProp = 'age';
    }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone_db',
    function ($scope, $routeParams, Phone_db) {
        $scope.phone = Phone_db.get({phoneId: $routeParams.phoneId}, function (phone) {
            $scope.mainImageUrl = phone.images[0];
        });

        $scope.setImage = function (imageUrl) {
            $scope.mainImageUrl = imageUrl;
        }
    }]);

'use strict';

angular.module('users').controller('ViewUserController', ['$scope', '$location', '$stateParams', 'Authentication', 'UsersProfiles',

    function ($scope, $location, $stateParams, Authentication, UsersProfiles) {
        // Controller Logic
        // ...
        // Find existing Employee
        $scope.authentication = Authentication;
        $scope.findOne = function () {
            $scope.user = UsersProfiles.get({
                userId: $stateParams.userId
            });
        };


        // Remove existing User
        $scope.remove = function () {
            /*if (user) {
                user.$remove();

                for (var i in $scope.users) {
                    if ($scope.users[i] === user) {
                        $scope.users.splice(i, 1);
                    }
                }
            } else {*/
            /*
            $scope.user.$remove(function () {
                $location.path('users/profiles');
            });*/
            var user = UsersProfiles.remove({
                userId: $stateParams.userId
            });
            //}
        };

    }]);
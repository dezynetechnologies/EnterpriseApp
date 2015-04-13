'use strict';

angular.module('users').controller('EditUsersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Users', 'UsersProfiles',
    function ($scope, $stateParams, $location, Authentication, Users, UsersProfiles) {
        $scope.authentication = Authentication;
        $scope.update = function () {
            var user = $scope.user;

            user.$update(function () {
                $location.path('users/profiles' + user._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        // Find existing Employee
        $scope.findOne = function () {
            $scope.user = UsersProfiles.get({
                userId: $stateParams.userId
            });
        };

    }
]);
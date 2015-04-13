'use strict';

angular.module('users').controller('ListUsersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Users', 'UsersProfiles',
    function ($scope, $stateParams, $location, Authentication, Users, UsersProfiles) {
        //$scope.authentication = Authentication;
        // Find a list of Users
        $scope.find = function () {
            $scope.users = UsersProfiles.query();
        };
    }
]);
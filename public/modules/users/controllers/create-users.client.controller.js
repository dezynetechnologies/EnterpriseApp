'use strict';


angular.module('users').controller('CreateUsersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Users', 'UsersProfiles',
    function ($scope, $stateParams, $location, Authentication, Users, UsersProfiles) {
        //$scope.authentication = Authentication;
        // Create new User
        $scope.create = function () {
            // Create new Employee object
            var userProfile = new UsersProfiles({
                username: this.username,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password
            });
            // Redirect after save
            userProfile.$save(function (response) {
                console.log(response);
                $location.path('users/profiles/' + response._id);
                // Clear form fields
                $scope.username = '';
                $scope.firstName = '';
                $scope.lastName = '';
                $scope.email = '';
                $scope.password = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);
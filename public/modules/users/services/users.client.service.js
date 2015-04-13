'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
    function ($resource) {
        return $resource('users', {}, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

angular.module('users').factory('UsersProfiles', ['$resource',
    function ($resource) {
        return $resource('users/profiles/:userId', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            remove: {
                method: 'DELETE'
            }
        });
    }
]);
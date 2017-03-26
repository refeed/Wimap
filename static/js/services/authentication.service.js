(function() {
    'use strict';

    angular
        .module('wimapp')
        .service('authentication', authentication);

    authentication.$inject = ['$http', '$rootScope'];

    /* @ngInject */
    function authentication($http, $rootScope) {
        this.register = register;
        this.login = login;
        this.logout = logout;
        this.getCurrentUser = getCurrentUser;

        function getCurrentUser() {
            return $http.get('/auth_api/userinfo')
                .then(function (response) {
                    return response.data;
                });
        }

        function register(email, password, confirm_password, username, full_name) {
            return $http.post('/api/v1/users/', {
                email: email,
                password: password,
                username: username,
                full_name: full_name
            });
        }

        function login(email, password) {
            return $http.post('/auth_api/login/', {
                email: email,
                password: password
            });
        }

        function logout() {
            return $http.get('/auth_api/logout')
                .then(function () {
                    $rootScope.$broadcast('user:logout');
                });
        }
    }
})();

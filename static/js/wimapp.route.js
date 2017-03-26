(function() {
    'use strict';

    angular
        .module('wimapp')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/');
    }

    function getStates() {
        return [
            {
                state: 'Index',
                config: {
                    url: '/',
                    templateUrl: 'static/html/mainmap.html',
                    title: 'Index'
                }
            },
            {
                state: 'Register',
                config: {
                    url: '/register',
                    templateUrl: 'static/html/register.html',
                    controller: 'RegisterController',
                    controllerAs: 'vm',
                    title: 'Register'
                }
            },
            {
                state: 'Login',
                config: {
                    url: '/login',
                    templateUrl: 'static/html/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    title: 'Login'
                }
            }
        ];
    }
})();

(function() {
    'use strict';

    angular
        .module('wimapp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['authentication', '$mdToast', '$location', '$window'];

    /* @ngInject */
    function LoginController(authentication, $mdToast, $location, $window) {
        var vm = this;
        vm.userdata = {};
        vm.loginUser = loginUser;

        function loginSuccess() {
            $mdToast.show(
                $mdToast.simple()
                .textContent('Login success.')
                .position('top right')
                .hideDelay(3000)
            );

            $location.path('/');
            $window.location.reload();
        }

        function loginFail() {
            $mdToast.show(
                $mdToast.simple()
                .textContent('Login error.')
                .position('top right')
                .hideDelay(3000)
            );
        }

        function loginUser() {
            authentication.login(vm.userdata.username, vm.userdata.password)
                .then(loginSuccess, loginFail);
        }
    }
})();

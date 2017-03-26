(function() {
    'use strict';

    angular
        .module('wimapp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['authentication', '$mdToast', '$location'];

    /* @ngInject */
    function RegisterController(authentication, $mdToast, $location) {
        var vm = this;
        vm.user = {};

        vm.registerClick = registerClick;

        function registerSuccess() {
            $mdToast.show(
                $mdToast.simple()
                .textContent('Registration succeed, redirecting to login page.')
                .position('top right')
                .hideDelay(3000)
            );

            $location.path('/login');
        }

        function registerFail() {
            $mdToast.show(
                $mdToast.simple()
                .textContent('Registration error.')
                .position('top right')
                .hideDelay(3000)
            );
        }

        function registerClick() {
            authentication.register(
                vm.user.email,
                vm.user.password,
                vm.user.confirmPasword,
                vm.user.username,
                vm.user.fullName).then(
                registerSuccess,
                registerFail
            );
        }

    }
})();

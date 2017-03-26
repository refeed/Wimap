(function() {
    'use strict';

    angular
        .module('wimapp')
        .controller('MainController', MainController);

    MainController.$inject = ['$mdSidenav'];

    function MainController($mdSidenav) {
        var vm = this;
        vm.toggleSidenav = toggleSidenav;

        ////////////////

        function toggleSidenav() {
            $mdSidenav('left').toggle();
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('wimapp')
        .controller('ToolbarController', ToolbarController);

    ToolbarController.$inject = ['authentication', '$location', '$window', '$scope'];

    function ToolbarController(authentication, $location, $window, $scope) {
        var tb = this;
        tb.loginState = false;
        tb.userButton = '';
        tb.clickUserButton = clickUserButton;
        tb.logoutClicked = logoutClicked;

        activate();
        $scope.$on('user:logout', function () {
            activate();
        });

        ////////////////
        function activate() {
            authentication.getCurrentUser()
                .then(loggedInState, notLoggedIn);
        }

        function clickUserButton($mdMenu, ev) {
            if (!tb.loginState) {
                $location.path('/login');
            } else {
                $mdMenu.open(ev);
            }
        }

        function logoutClicked() {
            authentication.logout();
            $window.location.reload();
        }

        function loggedInState(data) {
            tb.loginState = true;
            tb.userButton = data.full_name;
        }

        function notLoggedIn() {
            tb.userButton = 'Login';
        }

    }
})();
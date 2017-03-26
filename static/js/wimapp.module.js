(function () {
    'use strict';

    angular
        .module('wimapp', [
            'ngMaterial', 'ui.router', 'ngMdIcons', 'ngMap'
        ])

        .run(['$http', function ($http) {
            $http.defaults.xsrfHeaderName = 'X-CSRFToken';
            $http.defaults.xsrfCookieName = 'csrftoken';
        }])

        .config(IconTheming);

    function IconTheming($mdIconProvider, $mdThemingProvider) {
        $mdIconProvider.icon(
            'menu',
            './static/node_modules/material-design-icons/navigation/svg/production/ic_menu_24px.svg',
            24
        );

        $mdIconProvider.icon(
            'user',
            './static/node_modules/material-design-icons/social/svg/production/ic_person_24px.svg',
            24
        );

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red');
    }
})();

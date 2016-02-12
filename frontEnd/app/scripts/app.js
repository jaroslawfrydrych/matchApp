'use strict';

/**
 * @ngdoc overview
 * @name frontEndApp
 * @description
 * # frontEndApp
 *
 * Main module of the application.
 */
angular
    .module('frontEndApp', [
        'ngAnimate',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'angular-jwt',
        'angular-loading-bar'
    ])
    .config(function ($routeProvider, $httpProvider, jwtInterceptorProvider) {

        jwtInterceptorProvider.tokenGetter = ['$rootScope', 'jwtHelper', '$http', 'token', function ($rootScope, jwtHelper, $http, token) {
            var idToken = token.getToken();

            return idToken;

        }];
        $httpProvider.interceptors.push('jwtInterceptor');

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
            })
            .when('/logowanie', {
                templateUrl: 'views/auth/login.html',
                controller: 'LoginCtrl'
            })
            .when('/rejestracja', {
                templateUrl: 'views/auth/register.html',
                controller: 'RegisterCtrl'
            })
            .when('/uzytkownicy/moj-profil', {
                templateUrl: 'views/user/profile.html',
                controller: 'UserMyProfileCtrl',
                resolve: {
                    userData: function (userMeLoader) {
                        return userMeLoader();
                    }
                }
            })
            .when('/uzytkownicy/moj-profil/edytuj', {
                templateUrl: 'views/user/edit.html',
                controller: 'UserEditProfileCtrl',
                resolve: {
                    userData: function (userMeLoader) {
                        return userMeLoader();
                    }
                }
            })
            .when('/uzytkownicy/:userId', {
                templateUrl: 'views/user/profile.html',
                controller: 'UserProfileCtrl',
                resolve: {
                    userData: function (userLoader) {
                        return userLoader();
                    }
                }
            })
            .when('/wiadomosci', {
                templateUrl: 'views/messages/all.html',
                controller: 'MessagesCtrl',
                resolve: {
                    messages: function (messagesLoader) {
                        return messagesLoader();
                    }
                }
            })
            .when('/wiadomosci/:messageId', {
                templateUrl: 'views/messages/one.html',
                controller: 'MessageCtrl',
                resolve: {
                    messageData: function (messageLoader) {
                        return messageLoader();
                    }
                }
            })
            .when('/kontakt', {
                templateUrl: 'views/contact.html',
                controller: 'ContactCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function ($rootScope) {
        $rootScope.apiRoot = 'http://match.local/';
        //$rootScope.apiRoot = 'api/';
    })
;

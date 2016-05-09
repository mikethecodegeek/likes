'use strict';

var app = angular.module('angularApp', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        
        .state('home', {
            url: '/',
            templateUrl: '/html/home.html',
            controller: 'homeCtrl'
        })
        .state('newpost', {
            url: '/',
            templateUrl: '/html/newPost.html',
            controller: 'newPostCtrl'
        })
        .state('login', {
            url: '/login/',
            templateUrl: '/html/login.html',
            controller: 'loginCtrl'
        })
        .state('register', {
            url: '/newuser/',
            templateUrl: '/html/register.html',
            controller: 'registerCtrl'
        })
        .state('editprofile', {
            url: '/profile/edit',
            templateUrl: '/html/editprofile.html',
            controller: 'editCtrl'
        })
        


    $urlRouterProvider.otherwise('/');

})

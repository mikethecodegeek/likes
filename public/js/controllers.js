'use strict';
var app = angular.module('angularApp');

app.controller('homeCtrl', function(userService, $scope, $state) {

    $scope.loggedin = false;

    userService.getPosts()
        .then(stuff => {
            $scope.posts = stuff.data;
            console.log($scope.apiData);
            // $scope.loggedin = true;
            //  console.log($scope.loggedin)
        });

    userService.getProfile()
        .then(stuff => {
            $scope.apiData = stuff;
            $scope.loggedin = true;
            //  console.log($scope.loggedin)
        });
    $scope.logout = function () {
        userService.logout()
            .then(stuff => {
                $scope.loggedin = false;
                $state.go('home');
            });
    }

    $scope.likethis = function(postId) {
        console.log('postId:', postId);
        console.log('userId:', $scope.apiData.data._id)
        userService.likePost($scope.apiData.data._id, postId)
            .then(stuff => {
                //$scope.loggedin = false;
                //$state.go('home');
                console.log(stuff)
            });
    }

    $scope.unlikethis = function(postId) {
        console.log('postId:', postId);
        console.log('userId:', $scope.apiData.data._id)
        userService.unlikePost($scope.apiData.data._id, postId)
            .then(stuff => {
                //$scope.loggedin = false;
                //$state.go('home');
                console.log(stuff)
            });
    }
});


app.controller('newPostCtrl', function(userService, $scope, $state) {
    var newpost ={};
    userService.getProfile()
        .then(stuff => {
            $scope.apiData = stuff;
            var newPost = {
                id : stuff.data._id,
                username: stuff.data.username,
          }
            newpost = newPost;

        });

    $scope.postThis = function() {
        newpost.message = $scope.newMessage;
        userService.newPost(newpost);
    }
});

app.controller('loginCtrl', function(userService, $scope, $state) {
    $scope.login = function() {
        var thisuser = {
            username: $scope.username,
            password: $scope.password
        };
        userService.login(thisuser)
            .then( (stuff) => {
                //   console.log(stuff);
                $state.go('home')
            });
    }


});

app.controller('registerCtrl', function(userService, $scope, $state) {
    $scope.register = function() {
        var thisuser = {
            name: $scope.newName,
            email: $scope.newEmail,
            username: $scope.newUsername,
            password: $scope.newPassword
        };
        userService.register(thisuser)
            .then(
                $state.go('home')

        )
    }
   

});

app.controller('editCtrl', function(userService, $scope, $state) {
    userService.getProfile()
        .then(stuff => {
            $scope.apiData = stuff;
            $scope.editPost = stuff.data.post;
        });

    $scope.editUser = function() {
        var thisuser = {
            post: $scope.editPost,
        };
        userService.editById($scope.apiData.data._id, thisuser)
            .then(stuff => {
                $scope.apiData = stuff;
                $state.go('home')
                //   console.log($scope.apiData)
            });
    }

});


    

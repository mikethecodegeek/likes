'use strict';

var app = angular.module('angularApp');

app.service('userService',function($http) {
    this.getAll = () => {
        return $http.get('./api/users');
    };
    this.getPosts = () => {
        return $http.get('./api/posts');
    };
    this.newPost = (post) => {
        console.log(post)
        return $http.post('./api/posts/newpost', {username: post.username, post: post.message});
    };
    this.getProfile = () => {
        return $http.get('./api/users/profile');
    };
    this.likePost = (user,post) => {
        //console.log('user:',user)
       // console.log('post:', post)
        return $http.post(`./api/users/${user}/addlike/${post}`)
    }
    this.register = newPost => {
       // console.log(newPost)
        return $http.post('./api/users/register', {name: newPost.name,
        username: newPost.username, email: newPost.email, password: newPost.password});
    };
    this.deleteById = id => {
        return $http.delete(`./api/users/${id}`);
    };
    this.viewProfile = id => {
        console.log(id.id);
        return $http.get(`./api/users/${id.id}`);
    };
    this.editById = (id, newPost) => {
        console.log(id);
        return $http.put(`./api/users/${id}`, {
            username: newPost.username, post: newPost.post});
    }

    this.login = (user) => {
   //     console.log('User:', user)
        return $http.post('./api/users/login/', {username: user.username, password: user.password});
    };
    this.logout = () => {
        //console.log('User:', user)
        return $http.post('./api/users/logout/');
    };

   


});

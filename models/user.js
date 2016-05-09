/**
 * Created by Admin on 5/6/16.
 */
'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

var userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    messages: [],
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

var Post = require('./posts');

userSchema.statics.register = function(userObj, cb) {
    this.create(userObj, cb);
};

userSchema.statics.like = function(user1Id, postId, cb) {
   // if(user1Id === user2Id) {
   //     return cb({error: "You can't be your own friend!"})
  //  }
    console.log(postId)
    User.findById(user1Id, (err1, user1) => {
       // console.log('user1:', user1)
        Post.findById(postId, (err2, thispost) => {
        //    console.log('postId:', thispost)
            if(err1 || err2) return cb(err1 || err2);

            user1.liked.push(thispost._id);
            user1.save((cb));
            thispost.like();

        });
    });
};
userSchema.statics.unlike = function(user1Id, postId, cb) {
    // if(user1Id === user2Id) {
    //     return cb({error: "You can't be your own friend!"})
    //  }
    console.log(postId)
    User.findById(user1Id, (err1, user1) => {
        // console.log('user1:', user1)
        Post.findById(postId, (err2, thispost) => {
            //    console.log('postId:', thispost)
            if(err1 || err2) return cb(err1 || err2);

             user1.liked.splice(user1.liked.indexOf(thispost._id),1);
   //         user1.liked.push(thispost._id);
              user1.save((cb));
              thispost.unlike();

        });
    });
};

userSchema.statics.authenticate = function(userObj, cb){
    console.log('USEROBJ: ', userObj);
    this.findOne({username: userObj.username}, (err, user) => {
        if (err || !user){
            return cb(err || {error: 'User not found'})
        }
        if (user.password !== userObj.password) {
            return cb({error: 'Login failed. Please check your username and password'})
        }
        else {
            var token = user.makeToken();
        }
        cb(null, token);
    })
};

userSchema.statics.isLoggedIn = function(req, res, next) {
    console.log('REQUEST COOKIES: ',req.cookies);
    var userToken = req.cookies.accessToken;
    jwt.verify(userToken, JWT_SECRET, (err, payload) => {
        if (err) return res.status(401).send({error: 'No way dude'});
        User.findById(payload._id, (err, user) => {
            if (err){
                res.send(err);
            }
            req.user = user;
            next();
        }).select('-password');
    })

}

userSchema.methods.makeToken = function() {
    var token = jwt.sign({
        _id: this._id
    }, JWT_SECRET)
    return token;
}

var User = mongoose.model('User', userSchema);

module.exports = User;

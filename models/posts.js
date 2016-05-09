var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    post: {type: String},
    likes: {type: Number, default: 0}
});


postSchema.statics.newPost = function(userObj, cb) {
    console.log(userObj)
    this.create(userObj, cb);
};
postSchema.methods.like = function(cb) {
    this.likes++;
    this.save(cb);
};

postSchema.methods.unlike = function(cb) {
    this.likes--;
    this.save(cb);
};

var Post = mongoose.model('Post', postSchema);

module.exports = Post;

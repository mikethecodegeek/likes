var express = require('express');
var router = express.Router();
var Post = require('../models/posts');


router.get('/', (req,res)=> {

    Post.find({})
        .exec((err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(data);
            }

        });
});



router.post('/newpost', (req,res) => {
    Post.newPost(req.body, err=> {
       // res.cookie('testcookie', 'ok.cookie');
        res.status(err ? 400 : 200).send(err);
    })
})

router.get('/post/:id', (req,res)=> {
    console.log(req.params.id)
    Post.findById(req.params.id, (err,data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    })
});


router.delete('/post/:id', (req,res)=> {
    Post.findByIdAndRemove(req.params.id, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

router.put('/post/:id', (req,res)=> {
    Post.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true}, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});





module.exports = router;

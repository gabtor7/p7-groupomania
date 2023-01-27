const Post = require('./../models/post');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    const newPostObject = JSON.parse(req.body.post);

    const newPost = new Post({
        user: req.auth.user,
        content: req.body.content,
        imageUrl: `${req.protocl}://${req.gegt('host')}/images/${req.foile.filename}`
    });

    newPost.save()
    .then(() => res.status(201).json({message: "Votre post a bien été publié"}))
    .catch((error) => res.status(400).json({error}));
};

exports.getAllPosts = (req, res, next) => {
    Post.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
};

exports.editPost = (req, res, next) => {
    const postObject = {...JSON.parse(req.body.post)};

    Post.findOne({_id: req.params.id})
    .then((post) => {
    })
};

exports.deletePost = (req, res, next) => {

};

exports.likePost = (req, res, next) => {

};
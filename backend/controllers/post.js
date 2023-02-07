const Post = require('./../models/post');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    console.log(req.body);
    const newPost = new Post({
        user: req.auth.userId,
        content: req.body.content,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        imageUrl: `image.jpg`
    });

    newPost.save()
    .then(() => res.status(201).json({message: "Votre post a bien été publié"}))
    .catch((error) => res.status(400).json({error}));
};

exports.getAllPosts = (req, res, next) => {
    Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}));
};

exports.editPost = (req, res, next) => {
    const postObject = {...JSON.parse(req.body.post)};

    Post.findOne({_id: req.params.id})
    .then((post) => {
        if(post.user != req.auth.userId){
            return res.status(401).json({error: "Action non autorisée"});
        } else {
            udpateQuery = {_id: req.params.id};
            updatePost = {...postObject, _id: req.params.id};
            Post.updateOne(udpateQuery, updatePost)
            .then(() => res.json(201).json({message: "Post modifié avec succès"}))
            .catch((error) => res.status(400).json({error}));
        }
    })
    .catch((error) => res.status(400).json({error}));
};

exports.deletePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
    .then((post) => {
        if(post.user != req.auth.userId){
            return res.status(401).json({error: "Not authorized"});
        } else {
            const filename = post.imageUrl.split('/images/')[1];
            if(filename){
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({_id: req.params.id})
                    .then(() => res.status(201).json({message: "Le post a été supprimé"}))
                    .catch((error) => res.status(400).json({error}))
                });
            }
        }
    })
    .catch((error) => res.status(500).json({error}));
};

exports.likePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
    .then(post => {
        userAlreadyLiked = post.hasLiked.includes(req.body.user);
        if(!userAlreadyLiked){
            Post.updateOne(
                {_id: req.params.id},
                {
                    $inc: {likes: 1},
                    $push: {hasLiked: req.body.user}
                }
            )
            .then(() => res.status(201).json({message: "Le post a été liké"}))
            .catch((error) => res.status(400).json({error}));
        } else {
            Post.updateOne(
                {_id: req.params.id},
                {
                    $inc: {likes: -1},
                    $pull: {userLiked: req.body.user}
                }
            )
            .then(() => res.status(201).json({message: "Suppression du like sur le post"}))
            .catch((error) => res.status(400).json({error}));
        }
    })
    .catch((error) => res.status(404).json({error}));
};
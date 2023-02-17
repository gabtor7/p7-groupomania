const Post = require('./../models/post');

const fs = require('fs');

exports.createPost = (req, res, next) => {
    console.log(req.file);
    const newPost = new Post({
        user: req.auth.userId,
        content: req.body.content,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ''
        // imageUrl: 'image.jpg'
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

exports.getOnePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
    .then(post => {
        if(!post){
            return res.status(404).json({error: "Sauce not found"});
        }
        res.status(200).json(post)
    })
    .catch(err => res.status(400).json({err}))
}

exports.editPost = (req, res, next) => {
    const postObject = {
        content: req.body.content
    };
    if(req.file){
        postObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }

    Post.findOne({_id: req.params.id})
    .then((post) => {
        if(post.user != req.auth.userId && !req.auth.admin){
            return res.status(401).json({error: "Action non autorisée"});
        } else {
            updateQuery = { _id: req.params.id };
            updatePost = {...postObject, _id: req.params.id};
            Post.updateOne(updateQuery, updatePost)
            .then(() => {
                return res.status(201).json({message: "Post modifié avec succès"})
            })
            .catch((error) => {
                return res.status(400).json({error})
            });
        }
    })
    .catch((error) => res.status(400).json({error}));
};

exports.deletePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
    .then((post) => {
        if(post.user != req.auth.userId && !req.auth.admin){
            return res.status(401).json({error: "Not authorized"});
        } else {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({_id: req.params.id})
                .then(() => res.status(201).json({message: "Le post a été supprimé"}))
                .catch((error) => res.status(400).json({error}))
            }); 
        }
    })
    .catch((error) => res.status(500).json({error}));
};

exports.likePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
    .then(post => {
        let userAlreadyLiked = post.hasLiked.includes(req.auth.userId);
        if(!userAlreadyLiked){
            Post.updateOne(
                {_id: req.params.id},
                {
                    $inc: {likes: 1},
                    $push: {hasLiked: req.auth.userId}
                }
            )
            .then(() => res.status(201).json({message: "Le post a été liké"}))
            .catch((error) => res.status(400).json({error}));
        } else {
            Post.updateOne(
                {_id: req.params.id},
                {
                    $inc: {likes: -1},
                    $pull: {hasLiked: req.auth.userId}
                }
            )
            .then(() => res.status(201).json({message: "Suppression du like sur le post"}))
            .catch((error) => {res.status(400).json({error})});
        }
    })
    .catch((error) => res.status(404).json({error}));
};
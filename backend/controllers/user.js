// toutes les fonctionnalités pour un user donné, dans ce fichier
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();
const User = require('../models/user');
const fs = require('fs');

exports.getAllUsers = (req, res) => {
    User.find()
    .then((users) => res.status(201).json(users))
    .catch((error) => res.status(400).json({error}));
};

exports.getOneUser = (req, res, next) => {
    User.findOne({_id: req.params.id})
    .then((user) => {
        if(!user){
            return res.status(404).json({error: "User not found"})
        }
        res.status(200).json(user);
    })
    .catch(error => res.status(400).json({error}));
}

exports.edit = (req, res, next) => {
    const userObject = req.file ? {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    User.findOne({_id: req.params.id})
    .then((user) => {
        if(user._id != req.auth._id){
            return res.status(401).json({error: "Non autorisé"});
        } else {
            updateQuery = {_id: req.params.id};
            updateUser = {...userObject, _id: req.params.id};
            User.updateOne(updateQuery, updateUser)
            .then(() => res.status(201).json({message: "Utilisateur a été modifié"}))
            .catch((error) => res.status(400).json({error}));
        }
    })
    .catch((error) => res.status(400).json({error}));
};

exports.delete = (req, res, next) => {
    User.findOne({ _id: req.params.id })
    .then((user) => {
        if(user._id != req.params.id){
            return res.status(401).json({error: "Action non autorisée"});
        } else {
            const filename = user.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                User.deleteOne({_id:  req.params.id})
                .then(() => res.status(201).json({message: "Utilisateur supprimé avec succès"}))
                .catch(error => res.status(400).json({error}));
            });
        }
    })
    .catch((error) => res.status(500).json({error}));
};
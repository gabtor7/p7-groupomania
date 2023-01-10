/*
* Modele d'utilisateur, données
* email et mdp pour le login
* nom de profil
* bio
* rôle (admin ou user)
* liste de postID posté par l'utilisateur
*/
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    bio: {type: String},
    role: {type: String},
    posts: {type: [String]}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
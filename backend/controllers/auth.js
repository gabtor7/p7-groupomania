require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash,
            admin: false,
            posts: []
        });
        user.save()
        .then(() => res.status(201).json({ message: "Utilisateur enregistré !" }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => {
        return res.status(500).json({ error })
    });
};

exports.login = (req, res, next) => {
    if(!req.body.email){
        return res.status(400);
    }
    User.findOne({ email: req.body.email })
    .then(user => {
        if(!user){
            return res.status(401).json({ message: "Aucun utilisateur n'est associé à cette adresse email"});
        }
        bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
            if(!valid){
                return res.status(401).json({ message: "Mot de passe erroné"});
            }
            res.status(201).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id},
                    process.env.TOKEN_KEY,
                    {expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => {
        res.status(500).json({ error })});
}
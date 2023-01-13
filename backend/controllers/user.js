// toutes les fonctionnalités pour un user donné, dans ce fichier
require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.edit = (req, res, next) => {
    const user = req.file ? {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body}
}

exports.delete = (req, res, next) => {

}
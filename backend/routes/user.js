const express = require ('express');
const router = express.Router();

const userController = require('./controllers/user');

// Modification d'un (profil) utilisateur
router.post('/user/:id', userController.edit);

// Suppression d'un utilisateur
router.delete('/user/:id', userController.delete);

module.exports = router;

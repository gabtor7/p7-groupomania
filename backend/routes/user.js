const express = require ('express');
const router = express.Router();

const userController = require('./controllers/user');

// Modification d'un (profil) utilisateur
router.post('/:id', auth, userController.edit);

// Suppression d'un utilisateur
router.delete('/:id', auth, userController.delete);

module.exports = router;

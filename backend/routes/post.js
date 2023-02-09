const express = require ('express');
const router = express.Router();

const auth = require('./../middlewares/auth');
const postCtrl = require('./../controllers/post');
const multer = require('../middlewares/multer');

// créer
router.post('/', auth, multer, postCtrl.createPost);

// récupérer
router.get('/', auth, postCtrl.getAllPosts);

// modifier
router.put('/:id', auth, multer, postCtrl.editPost);

// supprimer
router.delete('/:id', auth, postCtrl.deletePost);

// liker
router.put('/:id/like', auth, postCtrl.likePost);

module.exports = router;
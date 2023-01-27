const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const postSchema = mongoose.Schema({
    user: {type: String, required: true},
    content: {type: String, required: true},
    imageUrl: {type: String, required: false},
    likes: {type: Number, default: 0, required: false},
    hasLiked: {type: [String], required: false}
});

postSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Post', postSchema);
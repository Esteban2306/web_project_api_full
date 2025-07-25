const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\/(www\.)?[\w-]+\.[a-z]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i.test(v);
            },
            message: 'Avatar URL must be valid'
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('card', cardSchema);
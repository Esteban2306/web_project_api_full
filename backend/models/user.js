const mongoose = require('mongoose');
const bycript = require('bcryptjs');
const validator = require('validator');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        default: 'Jacques Cousteau'
    },
    about: {
        type: String,
        minlength: 2,
        maxlength: 30,
        default: 'Explorer'
    },
    avatar: {
        type: String,
        default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
        validate: {
            validator: function (v) {
                return validator.isURL(v)
            },
            message: 'Avatar URL must be valid'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Email must be valid'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

userSchema.statics.findUserByCredentials = function (email, password) {
    return this.findOne({ email })
        .then((user) => {
            if (!user) {
                return Promise.reject(new Error('Incorrect password or email'));
            }


            const matched = bycript.compare(password, user.password)
            if (!matched) {
                return Promise.reject(new Error('Incorrect password or email'));
            }

            return user;
        })
        .catch((err) => {
            throw err;
        });
}

module.exports = mongoose.model('user', userSchema);
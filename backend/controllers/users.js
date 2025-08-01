const userSchema = require('../models/user');
const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const NotFoundError = require('../middleware/Not-found-err');
const BadRequest = require('../middleware/bad-reguest');
const Forbiden = require('../middleware/forbiden');
const jwtSecret = process.env.JWT_SECRET || 'some-secret-key';

const getAllUSers = async (req, res, next) => {
    try {
        const data = await userSchema.find()
        res.json(data);
    } catch (err) {
        next(err)
    }
};

const getCurrentUser = async (req, res, next) => {
    try {
        const user = await userSchema.findById(req.user._id);
        if (!user) {
            throw new NotFoundError('No se encontró ningún usuario');
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const data = await userSchema.findById(req.params.id)
        if (data) {
            return res.json(data)
        } else {
            throw new NotFoundError('No se encontró ningún usuario con ese id');;
        }
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    const { name, about, avatar, email, password } = req.body;
    if (avatar && !validator.isURL(avatar)) {
        throw new BadRequest('URL de avatar invalida');;
    }
    try {
        const hashPassword = await bycript.hash(password, 10);
        const data = await userSchema.create({ name, about, avatar, email, password: hashPassword });
        res.json(data);
        return;
    } catch (err) {
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    if (req.user._id !== req.params.id) {
        throw new Forbiden('No tienes permiso para editar este perfil');
    }
    try {
        const data = await userSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true });
        res.json(data);
        return;
    } catch (err) {
        next(err);
    }
}

const updateAvatar = async (req, res, next) => {
    const { avatar } = req.body;
    if (avatar && !validator.isURL(avatar)) {
        throw new BadRequest('URL de avatar invalida');
    }
    try {
        const data = await userSchema.findByIdAndUpdate(
            req.params.id,
            { avatar: req.body.avatar },
            { new: true, runValidators: true });
        res.json(data);
        return;
    } catch (err) {
        next(err);
    }
}

const loginUser = (req, res) => {
    const { email, password } = req.body;
    return userSchema.findUserByCredentials(email, password)
        .then((user) => {
            res.send({
                token: jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '7d' })
            })
        })
        .catch((err) => {
            res.status(401).json({ message: err.message });
        });
}

module.exports = {
    getAllUSers,
    getUserById,
    createUser,
    updateUser,
    updateAvatar,
    loginUser,
    getCurrentUser
}
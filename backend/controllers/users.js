const userSchema = require('../models/user');
const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUSers = async (req, res) => {
    try {
        const data = await userSchema.find()
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Error al leer el archivo de usuarios' });
    }
};

const getUserById = async (req, res) => {
    try {
        const data = await userSchema.findById(req.params.id)
        if (data) {
            return res.json(data)
        } else {
            return res.status(404).json({ message: 'ID de usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al leer el archivo de usuarios' });
    }
};

const createUser = async (req, res) => {

    const { name, about, avatar, email, password } = req.body;
    try {
        const hashPassword = await bycript.hash(password, 10);
        const data = await userSchema.create({ name, about, avatar, email, password: hashPassword });
        res.json(data);
        return;
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
}

const updateUser = async (req, res) => {
    try {
        const data = await userSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true });
        res.json(data);
        return;
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
}

const updateAvatar = async (req, res) => {
    try {
        const data = await userSchema.findByIdAndUpdate(
            req.params.id,
            { avatar: req.body.avatar },
            { new: true, runValidators: true });
        res.json(data);
        return;
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el avatar' });
    }
}

const loginUser = (req, res) => {
    const { email, password } = req.body;
    return userSchema.findUserByCredentials(email, password)
        .then((user) => {
            res.send({
                token: jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' })
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
    loginUser
}
const userSchema = require('../models/user');

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

    const { name, about, avatar } = req.body;
    try {
        const data = await userSchema.create({ name, about, avatar });
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

module.exports = {
    getAllUSers,
    getUserById,
    createUser,
    updateUser,
    updateAvatar
}
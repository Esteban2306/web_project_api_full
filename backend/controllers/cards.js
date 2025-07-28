const path = require('node:path');
const cardSchema = require('../models/card');

const getAllCards = async (req, res) => {
    try {
        const card = await cardSchema.find()
        res.json(card);
        return;
    } catch (err) {
        res.status(500).json({ message: 'Error al leer el archivo de tarjetas' });
    }
}

const createCards = async (req, res) => {
    try {
        const newCard = {
            name: req.body.name,
            link: req.body.link,
            owner: req.user._id,
            createdAt: new Date()
        }
        const card = new cardSchema(newCard);
        await card.save();
        res.json(card);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear la tarjeta' });
    }
}

const deleteCards = async (req, res) => {
    try {
        const card = await cardSchema.findById(req.params.id);
        if (!card) {
            return res.status(404).json({ message: 'ID de tarjeta no encontrado' });
        }
        if (card.owner.toString() !== req.user._id) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta tarjeta' });
        }
        await card.deleteOne()
        res.json({ message: 'Tarjeta eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar la tarjeta' });
    }
}

const giveLike = async (req, res) => {
    try {
        const data = await cardSchema.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likes: req.user._id } },
            { new: true }
        );
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Error al dar like a la tarjeta' });
    }
}

const removeLike = async (req, res) => {
    try {
        const data = await cardSchema.findByIdAndUpdate(
            req.params.id,
            { $pull: { likes: req.user._id } },
            { new: true }
        );
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Error al quitar like a la tarjeta' });
    }
}

module.exports = {
    getAllCards,
    createCards,
    deleteCards,
    giveLike,
    removeLike
}
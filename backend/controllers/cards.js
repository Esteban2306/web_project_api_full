const path = require('node:path');
const fs = require('node:fs/promises');
const cardSchema = require('../models/card');
const filePath = path.join(__dirname, '../data/cards.json');

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
        const data = await fs.readFile(filePath, 'utf8');
        const cards = JSON.parse(data);
        const card = cards.find(c => c.id === req.params.id);
        if (card) {
            cards.splice(cards.indexOf(card), 1);
            await fs.writeFile(filePath, JSON.stringify(cards));
            res.json(card);
        } else {
            res.status(404).json({ message: 'ID de tarjeta no encontrado' });
        }
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
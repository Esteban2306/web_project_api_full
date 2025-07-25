const express = require('express');
const router = express.Router();
const { getAllCards, createCards, deleteCards, giveLike, removeLike } = require('../controllers/cards');

router.get('/', getAllCards);

router.post('/', createCards);

router.delete('/:id', deleteCards);

router.put('/:id/like', giveLike);

router.delete('/:id/like', removeLike);

module.exports = router;

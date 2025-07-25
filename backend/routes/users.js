const express = require('express');
const router = express.Router();

const { getAllUSers, getUserById, createUser, updateAvatar, updateUser } = require('../controllers/users');

router.get('/', getAllUSers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.patch('/:id', updateUser);

router.patch('/:id/avatar', updateAvatar);

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { getAllUSers, getUserById, updateAvatar, updateUser, getCurrentUser } = require('../controllers/users');

router.get('/', getAllUSers);

router.get('/me', getCurrentUser)

router.get('/:id', getUserById);

router.patch('/:id', updateUser);

router.patch('/:id/avatar', updateAvatar);

module.exports = router;
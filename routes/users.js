const express = require('express');
const router = express.Router();

const userHandler = require('./handler/users')

/* GET users listing. */
router.get('/', userHandler.getUsers);

/* GET user. */
router.get('/:id', userHandler.getUser);

/* POST users create/register. */
router.post('/register', userHandler.register);

/* POST users login. */
router.post('/login', userHandler.login);

/* PUT users update. */
router.put('/:id', userHandler.update);

/* POST users logout. */
router.post('/logout', userHandler.logout);



module.exports = router;

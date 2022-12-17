const express = require('express');
const router = express.Router();

const userHandler = require('./handler/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST users create/register. */
router.post('/register', userHandler.register);

/* POST users login. */
router.post('/login', userHandler.login);

/* PUT users update. */
router.put('/:id', userHandler.update);


module.exports = router;

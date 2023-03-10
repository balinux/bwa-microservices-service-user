const express = require('express');
const router = express.Router();

const refrehTokenHandler = require('./handler/refresh-tokens')

/* POST create refresh token. */
router.post('/',refrehTokenHandler.create);

/* GET refresh token. */
router.get('/',refrehTokenHandler.getToken);

module.exports = router;

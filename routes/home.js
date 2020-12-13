const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {ensureUser} = require('../auth_config/auth')

router.get('/', ensureUser, (req, res)=>{
    res.send('<a href="/logout" >Log Out</a>');
});

module.exports = router;
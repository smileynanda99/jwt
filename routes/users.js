const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {forwardUser} = require('../auth_config/auth')

router.get('/login', forwardUser, (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const  accessToken = await jwt.sign({username, password},process.env.JWT_ACCESS_KEY);
    localStorage.setItem('loginToken', accessToken);
    res.redirect('/');
     
});

router.get('/logout', (req, res) => {
    localStorage.removeItem('loginToken');
    res.redirect('/login');
});



module.exports = router;
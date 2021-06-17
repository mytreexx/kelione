const express = require('express');
const router = express.Router();
const { User, sequelize } = require('../models');

//register
router.post('/register', async (req, res) => {
    const { firstName, lastName, username, password, confirmPassword } = req.body;
    const registeredUser = await User.findOne({ where: { username } });

    if (registeredUser) {
        res.status(401).send('Username already exists')
    } else if (password && password.length < 6) {
        res.status(401).send('Password should be at least 6 characters long')
    } else if (password !== confirmPassword) {
        res.status(401).send('Passwords should match')
    } else {
        try {
            await sequelize.sync();
            await User.create({
                first_name: firstName,
                last_name: lastName,
                username,
                password,
                is_admin: false
            });
            res.send();
        } catch (e) {
            console.error(e)
            res.send(e)
        }
    }
})

//login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const loggingInUser = await User.findOne({ where: { username } });

    if (!loggingInUser) {
        res.status(404).send('User not found!')
    } else if (loggingInUser.password !== password) {
        res.status(401).send('Wrong password!')
    } else {
        res.send(loggingInUser.username);
    }
})

module.exports = router;

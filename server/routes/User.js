const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        const listOfUsers = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json({ listOfUsers: listOfUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { username, password, role, description } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        await User.create({
            username: username,
            password: hash,
            role: role, 
            description: description
        });
        res.status(201).json("Success");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

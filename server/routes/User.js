const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateToken } = require('../middlewares/AuthMiddleware')

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

router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
});

router.post('/register', async (req, res) => {
    const { username, password, role, description } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            password: hashedPassword,
            role,
            description
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid password" });

        const accessToken = jwt.sign(
            { id: user.id, username: user.username, role: user.role }, // Include username in the payload
            'randomstring'
        );
        res.json({ token: accessToken, username: user.username, id: user.id, role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password, role, description } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, 10);
        if (role) user.role = role;
        if (description) user.description = description;

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.destroy();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

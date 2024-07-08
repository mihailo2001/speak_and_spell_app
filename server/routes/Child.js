const express = require('express');
const router = express.Router();
const { Child, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const children = await Child.findAll({ include: [{
            model: User,
            attributes: { exclude: ['password'] }
        }] });
        res.json(children);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/byParent/:parentId', async (req, res) => {
    const { parentId } = req.params;
    try {
        const children = await Child.findAll({ where: { userId: parentId } });
        res.json({ children });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const child = await Child.findByPk(id, { include: [{
            model: User,
            attributes: { exclude: ['password'] }
        }] });
        res.json(child);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { name, birthdate, userId } = req.body;
    try {
        await Child.create({ 
            name, 
            birthdate, 
            userId 
        });
        res.status(201).json("Child added");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, userId } = req.body;
    try {
        const child = await Child.findByPk(id);
        if (!child) return res.status(404).json({ message: "Child not found" });

        if (name) child.name = name;
        if (age) child.age = age;
        if (userId) child.userId = userId;

        await child.save();
        res.json(child);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const child = await Child.findByPk(id);
        await child.destroy();
        res.json({ message: "Child deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
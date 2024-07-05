const express = require('express');
const router = express.Router();
const { Payment, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const payment = await Payment.findAll({ include: [{
            model: User,
            attributes: { exclude: ['password'] }
        }] });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await Payment.findByPk(id, { include: [{
            model: User,
            attributes: { exclude: ['password'] }
        }] });
        if (!payment) return res.status(404).json({ message: "Payment not found" });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/byUser/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const listOfPayments = await Payment.findAll({ where: { userId: userId, status: "unpaid" } });
        res.json(listOfPayments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { amount, date, status, userId } = req.body;
    try {
        await Payment.create({ 
            amount, 
            date, 
            status, 
            userId
        });
        res.status(201).json("Payment added");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { amount, date, status, userId } = req.body;
    try {
        const payment = await Payment.findByPk(id);
        if (!payment) return res.status(404).json({ message: "Payment not found" });

        if (amount) payment.amount = amount;
        if (date) payment.month = month;
        if (status) payment.status = status;
        if (userId) payment.userId = userId;

        await payment.save();
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await Payment.findByPk(id);
        await payment.destroy();
        res.json({ message: "Payment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
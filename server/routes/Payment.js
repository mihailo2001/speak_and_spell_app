const express = require('express');
const router = express.Router();
const { Payment, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const payment = await Payment.findAll({ 
            include: [{
                model: User,
                attributes: { exclude: ['password'] }
            }],
            order: [
                ['status', 'DESC'], 
                ['date', 'DESC']
            ]
        });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/all/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const payments = await Payment.findAll({
            where: {
                userId: userId
            },
            order: [
                ['status', 'DESC'], 
                ['date', 'DESC']   
            ]
        });
        res.json(payments);
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

router.put('/pay/:paymentId', async (req, res) => {
    const { paymentId } = req.params;
    try {
        const payment = await Payment.findByPk(paymentId);

        payment.status = 'paid';
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
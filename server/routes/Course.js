const express = require('express');
const router = express.Router();
const { Course } = require('../models');

router.get('/', async (req, res) => {
    try {
        const listOfCourses = await Course.findAll();
        res.json({ listOfCourses: listOfCourses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { title, description, teacherId, weekday, time, cost } = req.body;
    try {
        await Course.create({
            title: title,
            description: description,
            teacherId: teacherId, 
            weekday: weekday,
            time: time,
            cost: cost
        });
        res.status(201).json("Success");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

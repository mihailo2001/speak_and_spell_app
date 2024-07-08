const express = require('express');
const router = express.Router();
const { Course, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const listOfCourses = await Course.findAll();
        res.json({ listOfCourses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/teacher-data/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const courses = await Course.findAll({ where: { userId: id } });
        console.log(courses);
        res.json({ courses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findByPk(id, { include: [{
            model: User,
            attributes: { exclude: ['password'] }
        }] });
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json(course);
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
            userId: teacherId, 
            weekday: weekday,
            time: time,
            cost: cost,
        });
        res.status(201).json("Success");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, weekday, time, cost, userId } = req.body;
    try {
        const course = await Course.findByPk(id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        if (title) course.title = title;
        if (description) course.description = description;
        if (weekday) course.weekday = weekday;
        if (time) course.time = time;
        if (cost) course.cost = cost;
        if (userId) course.userId = userId;

        await course.save();
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findByPk(id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        await course.destroy();
        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { Enrollment, Child, Course } = require('../models');

router.get('/', async (req, res) => {
    try {
        const enrollments = await Enrollment.findAll({ include: [Child, Course] });
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const enrollment = await Enrollment.findByPk(id, { include: [Child, Course] });
        if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });
        console.log(enrollment)
        res.json(enrollment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/byTeacher/:teacherId', async (req, res) => {
    const { teacherId } = req.params;
    try {
        const listOfEnrollments = await Enrollment.findAll({
            include: [
                { 
                    model: Child 
                },
                { 
                    model: Course,
                    where: { userId: teacherId }
                }
            ],
            where: {status: 'pending'}
        });
        res.json({listOfEnrollments});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/byTeacherAcc/:teacherId', async (req, res) => {
    const { teacherId } = req.params;
    try {
        const listOfEnrollments = await Enrollment.findAll({
            include: [
                { 
                    model: Child 
                },
                { 
                    model: Course,
                    where: { userId: teacherId }
                }
            ],
            where: {status: 'accepted'}
        });
        res.json({listOfEnrollments});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/byChild/:childId', async (req, res) => {
    const { childId } = req.params;
    try {
        const listOfEnrolls = await Enrollment.findAll({
            where: { childId: childId },
            include: [{ model: Course }]
        });
        res.json(listOfEnrolls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/byCourse/:courseId', async (req, res) => {
    const { courseId } = req.params;
    try {
        const listOfEnrolls = await Enrollment.findAll({ where: { courseId: courseId } });
        res.json(listOfEnrolls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { status, childId, courseId } = req.body;
    try {
        const child = await Child.findByPk(childId);
        if (!child) {
            return res.status(404).json({ message: "Child not found" });
        }

        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        await Enrollment.create({ status, childId, courseId });
        res.status(201).json("Enrollment added");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/accept/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const enrollment = await Enrollment.findByPk(id);
        enrollment.status = 'accepted';

        await enrollment.save();
        res.json(enrollment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const enrollment = await Enrollment.findByPk(id);
        if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

        await enrollment.destroy();
        res.json({ message: "Enrollment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

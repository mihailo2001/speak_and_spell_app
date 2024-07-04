const express = require('express');
const router = express.Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {
    try {
        const listOfPosts = await Post.findAll();
        res.json({ listOfPosts: listOfPosts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { title, content, userId } = req.body;
    try {
        await Post.create({
            title: title,
            content: content,
            userId: userId
        });
        res.status(201).json("Success");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

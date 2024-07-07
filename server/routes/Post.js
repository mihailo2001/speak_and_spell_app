const express = require('express');
const router = express.Router();
const { Post, User, File } = require('../models');

router.get('/', async (req, res) => {
    try {
        const listOfPosts = await Post.findAll({
            include: [{
                model: User,
                attributes: { exclude: ['password'] }
            }]
        });
        res.json({ listOfPosts: listOfPosts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/5posts', async (req, res) => {
    try {
        const listOfPosts = await Post.findAll({
            include: [{
                model: User,
                attributes: { exclude: ['password'] }
            }],
            order: [['createdAt', 'DESC']],
            limit: 5
        });
        res.json({ listOfPosts: listOfPosts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:postId/files', async (req, res) => {
    const { postId } = req.params;
    try {
        const files = await File.findAll({ where: { postId } });
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByPk(id, {
            include: [{
                model: User,
                attributes: { exclude: ['password'] }
            },
            {
                model: File
            }]
        });
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
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
        res.status(201).json("Post added");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, userId } = req.body;
    try {
        const post = await Post.findByPk(id);

        if (title) post.title = title;
        if (content) post.content = content;
        if (userId) post.userId = userId;

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        await post.destroy();
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

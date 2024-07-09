const express = require('express');
const router = express.Router();
const { File } = require('../models');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        const originalName = path.basename(file.originalname, path.extname(file.originalname));
        const extension = path.extname(file.originalname);
        cb(null, `${originalName}${extension}`)
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get('/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const files = await File.findAll({ where: { postId } });
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/:postId', upload.array('files', 10), async (req, res) => {
    const { postId } = req.params;
    const files = req.files;
  
    try {
      const filePromises = files.map(file => {
        return File.create({
          filename: file.originalname,
          filepath: file.path,
          postId
        });
      });
  
      await Promise.all(filePromises);
  
      res.status(201).json("Files added");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const file = await File.findByPk(id);
        if (!file) return res.status(404).json({ message: "File not found" });

        await file.destroy();
        res.json({ message: "File deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

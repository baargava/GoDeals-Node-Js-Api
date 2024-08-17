const express = require('express');
const Categories = require('../Models/Category');

const categoryService = express.Router();


categoryService.get('/getall', async (req, res) => {
    try {
        const categories = await Categories.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

categoryService.get('/getcategory/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const newData = await Categories.findById(id);;
        return res.json(newData);
    } catch (error) {
        console.log(`error from post`, error.message);
        res.status(500).json({ message: error.message });
    }
});

categoryService.post('/addcategory', async (req, res) => {
    const { name, description } = req.body;
    try {
        const newData = new Categories({ name, description });
        await newData.save();
        return res.json(await Categories.find());
    } catch (error) {
        console.log(`error from post`, error.message);
        res.status(500).json({ message: error.message });
    }
});
categoryService.put('/updatecategory/:id', async (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;
    try {
        const newData = await Categories.findByIdAndUpdate(id, {
            name: name, description: description
        });
        // newData.save()
        return res.json(await Categories.find());
    } catch (error) {
        console.log(`error from post`, error.message);
        res.status(500).json({ message: error.message });
    }
});
categoryService.delete('/deletecategory/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const newData = await Categories.findByIdAndDelete(id);
        return res.json(await Categories.find());
    } catch (error) {
        console.log(`error from post`, error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = categoryService;

const express = require('express');
const Product = require('../Models/Product');

const productService = express.Router();

productService.get('/getallproducts', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
productService.get('/getproducts/:id', async (req, res) => {
    const { id } = req.params
    try {
        const products = await Product.findById(id);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
productService.put('/updateproducts/:id', async (req, res) => {              // put used for update all data
    const { id } = req.params
    const { title, image, price } = req.body
    try {
        const newData = await Product.findByIdAndUpdate(id, {
            title: title,
            image: image,
            price: price
        });
        await newData.save()
        return res.json(newData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
productService.patch('/updateproductprice/:id', async (req, res) => {              // patch used for update single or 2 fields
    const { id } = req.params
    const { price } = req.body
    try {
        const newData = await Product.findByIdAndUpdate(id, {
            price: price
        });
        newData.save()
        return res.json(await Product.find());
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
productService.post('/postProduct', async (req, res) => {
    const { title, image, price } = req.body

    try {
        const newData = new Product({ title, image, price })
        await newData.save();
        return res.json(await Product.find());
    } catch (error) {
        console.log(`error from post`, error.message);
        res.status(500).json({ message: error.message });

    }
})
productService.delete('/deleteproduct/:id', async (req, res) => {
    const { id } = req.params

    try {
        const newData = await Product.findByIdAndDelete(id)
        // await newData.save();
        return res.json(await Product.find());
    } catch (error) {
        console.log(`error from post`, error.message);
        res.status(500).json({ message: error.message });

    }
})

module.exports = productService;

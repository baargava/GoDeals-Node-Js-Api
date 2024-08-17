const express = require('express');
const UserSchema = require('../Models/User');
const Auth = require('../Models/User')

const userService = express.Router();


userService.get('/getuserinfo', async (req, res) => {
    try {
        const userData = await UserSchema.find()
        return res.json(userData)
    } catch (error) {
        console.log(error.message, 'error');
        res.status(500).json({ message: error.message });
    }
})
userService.get('/getuser/:id', async (req, res) => {
    const { id } = req.params
    try {
        const userData = await UserSchema.findById(id)
        return res.json(userData)
    } catch (error) {
        console.log(error.message, 'error');
        res.status(500).json({ message: error.message });
    }
})
userService.put('/getuser/:id', async (req, res) => {
    const { id } = req.params
    const { name, image, email, password, category, isSeller } = req.body
    try {
        const userData = await UserSchema.findByIdAndUpdate(id, { name: name, image: image, email: email, password: password, category: category, isSeller: isSeller })
        await userData.save()
        return res.json(await UserSchema.find())
    } catch (error) {
        console.log(error.message, 'error');
        res.status(500).json({ message: error.message });
    }
})
userService.post('/login', async (req, res) => {
    try {
        const userData = await UserSchema.findByCredentials(req.body.email, req.body.password)
        const token = await userData.generateAuthToken()
        res.send({ userData, token })
    } catch (error) {
        console.log(error.message, 'error');
    }
})
userService.post('/addusers', async (req, res) => {
    const newData = new UserSchema(req.body)
    try {
        await newData.save();
        const token = await newData.generateAuthToken()
        res.status(201).send({ newData, token })
    } catch (error) {
        console.log(error.message, 'error');
        res.status(500).json({ message: error.message });
    }
});

userService.delete('/deleteuser/:id', async (req, res) => {
    const { id } = req.params
    try {
        const userData = await UserSchema.findByIdAndDelete(id)
        // await userData.save()
        return res.json(await UserSchema.find())
    } catch (error) {
        console.log(error.message, 'error');
        res.status(500).json({ message: error.message });
    }
})




userService.post('/logout', Auth, async (req, res) => {
    try {
        const token = req.token;
        await req.user.logout(token);
        res.send({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = userService;

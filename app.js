const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { productService, productRoutes } = require('./Routes/ProductService')
const categoryService = require('./Routes/CategoryService')
const userService = require('./Routes/UserService')
// const bodyParser = require('body-parser')
require('./DB/mongoose')
const port = process.env.PORT || 2000
console.log(port, 'port');



//middleware   body parser
app.use(express.json()); // it is a middleware , used to show json data in app.... body parser
// // Use body-parser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/products', productService)
app.use('/category', categoryService)
app.use(userService)

app.get('/', (req, res) => {
    const endpoints = {
        products: productRoutes,
        categories: "/category",
        users: "/users"
    };
    res.json({
        message: "Welcome to our API. Here are the available endpoints:",
        endpoints
    });
});

app.listen(port, () => console.log('server running on port'))   // server port,

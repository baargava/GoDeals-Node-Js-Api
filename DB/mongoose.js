const mongoose = require("mongoose");
const uri = "mongodb+srv://baargavaNode:qNSfjIO7CZ7VtKu5@rgb.ihlzmqw.mongodb.net/?retryWrites=true&w=majority&appName=rgb";


mongoose.connect(uri,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(() => console.log("db connected")).catch((err) => console.log("err", err))
const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

let JWT_SECRET = 'ecommercewebapi'

const UserSchema = new mongoose.Schema({

    name: String,
    image: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }

    },
    isSeller: { type: Boolean, default: false },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password musn\’t contain password')
            }
        }
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}


UserSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Unable to log in email');
    }

    const isMatch = await bcrypt.compare(password.toString(), user.password).toString();
    console.log(isMatch, password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login pasword');
    }
    return user;
};


//Hash plain password before saving     bcrypting password to avoid leaking
UserSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


UserSchema.methods.logout = async function (token) {
    const user = this;
    user.tokens = user.tokens.filter((t) => t.token !== token);
    await user.save();
};
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await UserSchema.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate.' });
    }
};
module.exports = auth
module.exports = mongoose.model('Users', UserSchema)
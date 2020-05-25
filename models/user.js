const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('../middleware/env');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config().jwtPrivateKey);
    return token;
}

const User = mongoose.model('Users', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string()
            .min(5)
            .required()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/)
            .error(() => {
                return {
                  message: "'Password' must have 5 characters, contain 1 uppercase, 1 lowercase and 1 digit!",
                };
              })
    };
    
    return Joi.validate(user, schema);
}

exports.validateUser = validateUser;
exports.User = User;
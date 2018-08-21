const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

// Authentication for the password
userSchema.statics.authenticate = (params, callback) => {
    if (!params) {
        return callback(new Error('missing required params'));
    }
    const { email, password } = params;
    User.findOne({ email: email }).exec((err, user) => {
        if (err) {
            return callback(err);
        }
        if (!user) {
            return callback(new Error('no user found'));
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return callback(err);
            }
            if (!result) {
                return callback();
            }
            return callback(null, result);
        });
    });
};

// Pre save addition for the database
userSchema.pre('save', async function(next) {
    let user = this;
    const password = user.password;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

async function hashPassword(user) {
    const { password } = user;
} 

const User = module.exports = mongoose.model('user', userSchema);
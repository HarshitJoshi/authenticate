'use strict';

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
  firstname: {
    type: String,
    required: false,
    trim: true
  },
  lastname: {
    type: String,
    required: false,
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
userSchema.statics.authenticate = async function(params) {
  if (!params) {
    throw new Error('missing required params');
  }
  const { username, password } = params;
  try {
    let user = await User.findOne({ "username": username });
    if (!user) {
      throw new Error(`no user found with the corresponding username: ${username}`);
    }

    const hashed_password = user.password;

    let verified = await bcrypt.compare(password, hashed_password);
    if (!verified) {
      throw new Error('invalid password');
    }
    return {
      user,
      verify: verified
    };
  } catch (e) {
    console.log(e);
  }
};

// Pre save addition for the database
userSchema.pre('save', async function(next) {
  try {
    const user = this;
    const passwordHash = await hashPassword(user);
    user.password = passwordHash;
    return next();
  } catch (e) {
    return next(e);
  }
});

// hashPassword
async function hashPassword(user) {
  const { password } = user;
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  });
  return hashedPassword;
}

const User = module.exports = mongoose.model('user', userSchema);

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
  const { email, password } = params;
  let user = await User.findOne({ email: email });
  if (!user) {
    throw new Error(`no user found with the corresponding email: ${email}`);
  }
  const encrypted_password = user.password;

  let verified = await bcrypt.compare(password, encrypted_password);
  if (!verified) {
    throw new Error('invalid password');
  }
  return { 
    verify: verified
  };
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
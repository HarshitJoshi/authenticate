'use strict';

const mongoose = require('mongoose');

// Token schema
const tokenSchema = new Mongoose.schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
    type: String,
    required: true
  },
  creationTime: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200
  }
)};

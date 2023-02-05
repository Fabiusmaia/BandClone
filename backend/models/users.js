const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hash: { type: String },
  salt: { type: String },
});

usersSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

usersSchema.methods.validPassword = function (password) {
  console.log(typeof password);
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

module.exports = mongoose.model("Users", usersSchema);

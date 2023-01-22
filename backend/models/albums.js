const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AlbumSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  tracks: [
    {
      name: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    },
  ],
});
module.exports = mongoose.model("Albums", AlbumSchema);

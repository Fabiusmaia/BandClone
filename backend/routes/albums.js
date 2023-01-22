const express = require("express");
const router = express.Router();
const Albums = require("../models/albums");
const { uploadAlbum, verifyToken } = require("../controllers/userControllers");
module.exports = router;

router.post("/", verifyToken, uploadAlbum);

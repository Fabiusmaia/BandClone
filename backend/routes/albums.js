const express = require("express");
const router = express.Router();
const Albums = require("../models/albums");
const {
  uploadAlbum,
  verifyToken,
  getSingleAlbum,
} = require("../controllers/userControllers");
module.exports = router;

router.post("/", verifyToken, uploadAlbum);
router.get("/:id", verifyToken, getSingleAlbum);

const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const {
  createUser,
  getUsers,
  getSingleUser,
  deleteUser,
  userLogin,
  verifyToken,
  protectRequest,
} = require("../controllers/userControllers");
module.exports = router;

router.post("/", createUser);
router.get("/:id", verifyToken, getSingleUser);
router.get("/", verifyToken, getUsers);
router.delete("/:id", deleteUser);
router.post("/login", userLogin);
router.post("");

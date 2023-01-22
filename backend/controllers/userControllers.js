const Users = require("../models/users.js");
const jwt = require("jsonwebtoken");
const Albums = require("../models/albums");

const getUsers = async (req, res) => {
  Users.find({}).then((data, err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(data);
    }
  });
};
const createUser = (req, res) => {
  const { name, email, password } = req.body;
  Users.findOne({ $or: [{ email: email }, { name: name }] }, (err, user) => {
    if (!user) {
      let newUser = new Users();
      newUser.name = name;
      newUser.email = email;
      newUser.password = password;
      newUser.setPassword(password);
      console.log(req.body);
      newUser.save((err, Users) => {
        if (err) {
          return res.status(500).json({
            message: "Error adding user.:" + err,
          });
        } else {
          return res.status(200).json({
            message: "User added successfully.",
          });
        }
      });
    } else {
      res.status(500).json({
        message: "User already exists.",
      });
    }
  });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findById(id);
  res.json(user);
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findOneAndDelete(id);
  res.status(200).json(user);
};

const userLogin = (req, res) => {
  Users.findOne({ email: req.body.email }, function (err, user) {
    console.log(req.body);
    if (!user) {
      return res.status(400).json({
        message: "User not found.",
      });
    } else {
      if (user.validPassword(req.body.password)) {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
          expiresIn: 500,
        });
        return res.status(201).json({
          message: "User Logged In",
          auth: true,
          token,
          userId: user._id,
          expiresIn: Date.now() / 1000 + 500,
        });
      } else {
        return res.status(400).json({
          message: "Wrong Password",
        });
      }
    }
  });
};

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    console.log(token);
    if (err) return res.status(401).json({ message: "401 unauthorized. " });
    req.userId = decoded.userId;
    next();
  });
};

const uploadAlbum = (req, res) => {
  const { userId, name, cover, tracks } = req.body;
  let newAlbum = new Albums();
  newAlbum.name = name;
  newAlbum.userId = userId;
  (newAlbum.cover = cover), (newAlbum.tracks = tracks);
  newAlbum.save((err, album) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      res.status(200).json({ message: "Album added successfully!" });
    }
  });
};

module.exports = {
  createUser,
  getSingleUser,
  deleteUser,
  getUsers,
  userLogin,
  verifyToken,
  uploadAlbum,
};

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users.js");
const albumRoutes = require("./routes/albums.js");

app.use(cors());
require("dotenv").config();
mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => {
    app.listen(process.env.PORT);
    console.log("listening on port " + process.env.PORT);
  })
  .catch((error) => {
    console.log(error);
  });
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});
app.use("/api/users", userRoutes);
app.use("/api/albums", albumRoutes);

// import packets
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const blogsRoute = require("./routes/blog.routes");
const userRoute = require("./routes/user.routes");
// mongo en local
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Connected to database..");
  })
  .catch((err) => {
    console.log("ERROR", err.message);
  });
//mongo à distance(Atlas)
// mongoose
//   .connect(
//     "mongodb+srv://safwen:01161590@cluster0.6gs6t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//   )
//   .then(() => {
//     console.log("Connected to database..");
//   })
//   .catch((err) => {
//     console.log("ERROR", err.message);
//   });
const app = express();
app.use(bodyParser.json());
app.use("/blog", blogsRoute);
app.use("/user", userRoute);
app.listen(3500, () => {
  console.log("app is running on port 3500..");
});

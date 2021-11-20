const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    let { email, password, name } = req.body;
    let hash = await bcrypt.hash(password, 10);
    let existUser = await User.findOne({ email: email });
    if (existUser) {
      res.json({ success: false, message: "Utilisateur existant" });
    } else {
      let newUser = new User({
        name: name,
        email: email,
        password: hash
      });
      let result = await newUser.save();
      res.json({
        success: true,
        message: result
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      res.json({
        success: false,
        message: "Adresse ou mot de passe incorecct!"
      });
    } else {
      let verif = await bcrypt.compare(password, user.password);
      console.log("USER", user._id.toString());
      if (verif) {
        let token = jwt.sign(
          {
            data: user._id.toString()
          },
          "TOKEN_SECRET",
          { expiresIn: "1h" }
        );
        res.json({
          success: true,
          result: {
            userId: user._id,
            token: token
          }
        });
      } else {
        res.json({
          success: false,
          message: "Adresse ou mot de passe incorecct!"
        });
      }
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
module.exports = {
  registerUser,
  loginUser
};

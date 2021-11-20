const jwt = require("jsonwebtoken");

const verifToken = (req, res,next) => {
  let token = req.headers["x-access-token"];
  console.log("TOKEN",token) ; 
  if (!token) {
    res.json({
      success: false,
      message: "veuillez vous connecter!"
    });
  } else {
    let verif = jwt.verify(token,"TOKEN_SECRET");
    if (verif) {
      next();
    } else {
      res.json({
        success: false,
        message: "Token Invalide!"
      });
    }
  }
};

module.exports = verifToken ; 
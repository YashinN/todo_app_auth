const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

// middleware to protect routes and verify auth token
const authToken = async (req, res, next) => {
  // get auth parameter.
  const { authorization } = req.headers;

  //  if not auth found sends error.
  if (!authorization) {
    return res.status(403).json({ error: "no auth token" });
  }

  // gets token value.
  const token = authorization.split(" ")[1];

  try {
    // verifies token and get user id from token.
    const { _id } = jwt.verify(token, process.env.SECRET);
    // finds user with id in db and stores in req.
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: "not authenticated." });
  }
};

module.exports = { authToken };

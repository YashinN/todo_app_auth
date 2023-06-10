const express = require("express");

// controller functions.
const { signupUser, loginUser } = require("../controllers/usersController");

// middleware
const { checkIsGmail } = require("../middleware/checkEmail");

// express router.
const router = express.Router();

// user routes.
router.post("/signup", checkIsGmail, signupUser);
router.post("/login", loginUser);

module.exports = router;

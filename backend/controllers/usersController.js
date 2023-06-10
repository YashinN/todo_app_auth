const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/usersModel");

// function to create auth token
const createToken = (_id) => {
  // returns auth token with user id in payload.
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// function to store emmpty fields.
const getEmptyFields = (body) => {
  let emptyFields = [];
  // loops through object and checks if empty values are found.
  for (const key in body) {
    if (body[key].length === 0) {
      // pushes empty value key to list
      emptyFields.push(key);
    }
  }
  // returns empty fields.
  return emptyFields;
};

// function to add new user to db
const signupUser = async (req, res) => {
  // stores user email and password.
  const { email, password } = req.body;
  // stores empty email and password.
  let emptyFields = getEmptyFields(req.body);

  try {
    // checks if email or password is empty sends error with empty fields.
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please fill in all fields", emptyFields });
    }

    // code removed and implemented as middleware.
    // // checks if email is a gmail address.
    // const isGmail = email.endsWith("@gmail.com");

    // // if email not gmail address sends error.
    // if (!isGmail) {
    //   // returns error and empty field as email
    //   return res
    //     .status(403)
    //     .json({ error: "Gmail address is required", emptyFields: ["email"] });
    // }

    // finds user by email
    const userExists = await User.findOne({ email });

    // if email matched or found send error.
    if (userExists) {
      return res
        .status(400)
        .json({ error: "Email already in use", emptyFields: ["email"] });
    }

    // hashes password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creates user in db
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // generates user auth token
    const token = createToken(user._id);
    // sends user email and auth token.
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// function to login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let emptyFields = getEmptyFields(req.body);

  try {
    // checks for empty email or password
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please fill in all fields", emptyFields });
    }

    // finds user by email
    const user = await User.findOne({ email });

    // if user not found sends error.
    if (!user) {
      return res
        .status(400)
        .json({ error: "Incorrect Email", emptyFields: ["email"] });
    }

    // checks if password is matched. if not sends error.
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      emptyFields = ["password"];
      return res
        .status(400)
        .json({ error: "Incorrect Password", emptyFields: ["password"] });
    }

    // creates auth token
    const token = createToken(user._id);

    // send auth token and user email
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

module.exports = {
  signupUser,
  loginUser,
};

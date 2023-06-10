// middleware to check if user signs up with gmail email

const checkIsGmail = (req, res, next) => {
  const { email } = req.body;

  //   moves on if email is empty
  if (email.length === 0) {
    next();
  }
  // checks if email is a gmail address.
  const isGmail = email.endsWith("@gmail.com");

  // if email not gmail address sends error.
  if (!isGmail) {
    // returns error and empty field as email
    return res
      .status(403)
      .json({ error: "Gmail address is required", emptyFields: ["email"] });
  }

  next();
};

module.exports = { checkIsGmail };

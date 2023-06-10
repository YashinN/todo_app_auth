// middleware to check if content type is json only.
const checkContentType = async (req, res, next) => {
  // checks if request is json.
  const type = req.is(`json`);

  // if not json sends error.
  if (!type && type !== null) {
    return res.status(400).json({
      error: "Ai you are sending unsupported content , JSON REQUIRED!!",
    });
  }

  next();
};

module.exports = { checkContentType };

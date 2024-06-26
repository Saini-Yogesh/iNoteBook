const jwt = require("jsonwebtoken");
const JWT_SECRET = "yogeshIsDevlaper";

const fetchUser = (req, res, next) => {
  //get the user form jwt tokon and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ erro: "Please Authenticate Using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch {
    res.status(401).send({ erro: "Please Authenticate Using a valid token" });
  }
};

module.exports = fetchUser;

const jwt = require("jsonwebtoken");

const authorizedToUseRoutes = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null)
    return res.status(403).json({
      info: "this route is protected, makes sure you have the right auth, and that header is set correct ",
    });
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
    if (err) {
      res
        .status(403)
        .json({
          info: "no accesrights to this route, make sure header is set correct",
        });
    }
    req.user = user;
    next();
  });
};

module.exports = { authorizedToUseRoutes };

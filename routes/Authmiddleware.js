// auth middleware for routes

module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("auth fail?");
    res
      .status(401)
      .json({ message: "You are not authorized to view this resource  " });
  }
};

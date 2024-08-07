// auth middleware for routes

module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("testing values");
    console.log(req.body);
    next();
  } else {
    console.log("auth fail?");
    res
      .status(401)
      .json({ message: "You are not authorized to view this resource  " });
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.user.isadmin === true) {
    next();
  } else {
    console.log("user is not an admin");
    res
      .status(401)
      .json({ message: "You are not authorized to view this resource  " });
  }
};

const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); //to generate signed token
const expressJwt = require("express-jwt"); //auth check

const { errorHandler } = require("../helpers/dbErrorHandler");

// console.log(User)
exports.signup = (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    console.log(user, "SUCCESSSS");
    res.json(user);
  });
};

exports.sayHi = async (req, res) => {
  console.log("helo");

  // User.deleteMany({}).then((user)=> {
  //     res.json({
  //         message: "deleted"
  //     })
  // })
  await User.find({}).then((users) => {
    console.log(users);
    res.json(users);
  });
};

exports.signin = async (req, res) => {
  //find the user based on email
  const { email, password } = req.body;

  console.log(email);
  await User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist",
      });
    }

    //if user is found, make sure the email and password matches
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email or password does not match",
      });
    }
    //generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persist the toket as 't' in cookies with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });

    //return response with user and token to frontend client

    const { _id, name, email, role } = user;

    return res.json({ token, user: { _id, name, email, role } });
  });

  //   User.find({}).then((users) => {
  //     console.log(users);
  //     res.json(users);
  //   });
};

exports.signout = (req, res) => {
  console.log("SIGNOUT");
  res.clearCookie("t");
  res.json({ message: "signout success" });
};

//PROTECTED ROUTES
//anytime the user wants to go to a route he needs to have a token
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

//check if the user id of the signed in user is equal to the param userId
exports.isAuth = (req, res, next) => {
  console.log(typeof req.profile._id);
  console.log(typeof req.auth._id);

  //use the toString method because the req.profile.id returns an object or use a double equals
  let user =
    req.profile &&
    req.auth &&
    req.profile._id.toString() === req.auth._id.toString();
  if (!user) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

//the isAdmin will check if the user signing in is an admin or not
//this will prevent users to access certain routes if they are not admin
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: " Admin resource! Access denied",
    });
  }
  next();
};

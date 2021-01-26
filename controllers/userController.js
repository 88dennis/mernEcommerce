const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); //to generate signed token
const expressjwt = require("express-jwt"); //auth check

const { errorHandler } = require("../helpers/dbErrorHandler");

// console.log(User)

exports.signup = (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  console.log(user, "ASDASDsd");

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    console.log(user);
    user.salt = undefined;
    user.hashed_password = undefined;
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
  
  console.log(email)
  await User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "User with that email does not exist",
      });
    }

    //if user is found, make sure the email and password matches
    // create authenticate method in user model
    if(!user.authenticate(password)) {
        return res.status(401).json({
            error: 'Email or password does not match'
        })
    }
    //generate a signed token with user id and secret
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    //persist the toket as 't' in cookies with expiry date
    res.cookie('t', token, {expire: new Date() + 9999});

    //return response with user and token to frontend client

    const {_id, name, email, role} = user;

    return res.json({token, user: {_id, name, email, role}});
  });

//   User.find({}).then((users) => {
//     console.log(users);
//     res.json(users);
//   });
};

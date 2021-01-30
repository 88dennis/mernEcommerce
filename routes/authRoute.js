const express = require("express");
const router = express.Router();
//destructure and require from authController
const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/authController");

const { sayHi } = require("../controllers/authController");
const { userSignupValidator } = require("../validator");

console.log(userSignupValidator);

router.get("/", sayHi);

router.post("/signup", userSignupValidator, signup);

// router.post('/signup', signup);

router.post("/signin", signin);
router.get("/signout", signout);

router.get("/hello", requireSignin, (req, res) => {
  res.send("hello");
});

module.exports = router;

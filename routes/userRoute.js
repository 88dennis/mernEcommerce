const express = require('express');
const router = express.Router();
//destructure and require from userController
const { signup } = require("../controllers/userController");
const { signin } = require("../controllers/userController");

const { sayHi } = require("../controllers/userController");
const { userSignupValidator } = require('../validator')

console.log(userSignupValidator);

router.get('/', sayHi);

router.post("/signup", userSignupValidator, signup);



// router.post('/signup', signup);

router.post('/signin', signin);


 
module.exports = router;
const express = require("express");
const router = express.Router();

const { create } = require("../controllers/categoryController");
const { requireSignin, isAuth, isAdmin } = require("../controllers/authController");
const { userById } = require("../controllers/userController");

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

//everytime there's a "userId" in the URL the userById method will run see the userController.js
router.param('userId', userById);

module.exports = router;
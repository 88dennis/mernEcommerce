const express = require("express");
const router = express.Router();

const { create, categoryById, read, update, remove, list } = require("../controllers/categoryController");
const { requireSignin, isAuth, isAdmin } = require("../controllers/authController");
const { userById } = require("../controllers/userController");

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/category/:categoryId", read);
router.put("/category/update/:categoryId/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/category/delete/:categoryId/:userId", requireSignin, isAuth, isAdmin, remove);
router.get("/categories", list);





//everytime there's a "userId" in the URL the userById method will run see the userController.js
router.param('userId', userById);
router.param('categoryId', categoryById);


module.exports = router;
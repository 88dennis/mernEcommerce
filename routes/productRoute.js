const express = require("express");
const router = express.Router();

//findById method will let you look for userId 
const { create, productById, read, remove } = require("../controllers/productsController");
const { userById } = require("../controllers/userController");
const { requireSignin, isAuth, isAdmin } = require("../controllers/authController");

router.get('/product/:productId', read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete('/product/delete/:productId/:userId', requireSignin, isAuth, isAdmin, remove );

//everytime there's a "userId" in the URL the userById method will run see the userController.js
router.param('userId', userById);
//everytime there's a "productId" in the URL the productById method will run see the productController.js
router.param('productId', productById);



module.exports = router;

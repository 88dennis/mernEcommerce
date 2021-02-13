const express = require("express");
const router = express.Router();

//findById method will let you look for userId 
const { create, productById, read, remove, update, list, listRelated, listProductsCategories, listBySearch, photo} = require("../controllers/productsController");
const { userById } = require("../controllers/userController");
const { requireSignin, isAuth, isAdmin } = require("../controllers/authController");

router.get('/product/:productId', read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete('/product/delete/:productId/:userId', requireSignin, isAuth, isAdmin, remove );
router.put('/product/update/:productId/:userId', requireSignin, isAuth, isAdmin, update );


router.get('/products', list);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listProductsCategories);

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

// route - make sure its post
router.post("/products/by/search", listBySearch);
router.get("/products/photo/:productId", photo);



//everytime there's a "userId" in the URL the userById method will run see the userController.js
router.param('userId', userById);
//everytime there's a "productId" in the URL the productById method will run see the productController.js
router.param('productId', productById);



module.exports = router;

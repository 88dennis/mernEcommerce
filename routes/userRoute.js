const express = require("express");
const router = express.Router();

//findById method will let you look for userId 
const { userById, read, update } = require("../controllers/userController");

const {
    requireSignin,
    isAuth,
    isAdmin
  } = require("../controllers/authController");

//you will include isAdmin to a route that is only accessible for admins
router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res)=>{
    res.json({
        user: req.profile
    })
});


router.get('/user/:userId', requireSignin, isAuth, read);

router.put('/user/:userId', requireSignin, isAuth, update);

//everytime there's a "userId" in the URL the userById method will run see the userController.js
router.param('userId', userById);


module.exports = router;

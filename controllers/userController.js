const User = require("../models/userModel");

exports.userById = (req, res, next, id) => {
    // User.findById(id).exec((err, user)=> {
    //     if(err || !user) {
    //         return res.status(400).json({
    //             error: 'User not found'
    //         })
    //     }

    //     req.profile = user;
    //     next();
    // })

    User.findById(id).then(user => {
        if(!user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        req.profile = user;
        next();
    }).catch(err=>{
        if(err) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        next();

    })


}
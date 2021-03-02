const User = require("../models/userModel");


exports.userById = async (req, res, next, id) => {
    await User.findById(id).exec((err, user)=> {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        };
        //create a field in the req.
        //give the value of the user to the req
        req.profile = user;
        next();
    });

    // User.findById(id).then(user => {
    //     if(!user) {
    //         return res.status(400).json({
    //             error: 'User not found'
    //         })
    //     }
    //     req.profile = user;
    //     next();
    // }).catch(err=>{
    //     if(err) {
    //         return res.status(400).json({
    //             error: 'User not found'
    //         })
    //     }
    //     next();

    // })


};


exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.update = async (req, res) => {

    // console.log(req.profile)
    await User.findOneAndUpdate({_id:req.profile._id}, {$set: req.body}, {new: true}, (err, user)=> {
        if(err){
            return res.status(400).json({
                error: 'You are not authorized to perform this action'
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });

};
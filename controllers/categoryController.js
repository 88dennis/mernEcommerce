
const Category = require("../models/categoryModel");
const { errorHandler } = require("../helpers/dbErrorHandler");


console.log(Category)
exports.create = (req, res, next) => {

    console.log(req.body);

    const newCategory = new Category(req.body);

    newCategory.save((err, data)=>{
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({data});
    })
  
}
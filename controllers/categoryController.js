
const Category = require("../models/categoryModel");
const { errorHandler } = require("../helpers/dbErrorHandler");


console.log(Category)

//middleware
exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category )=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        if(!category) {
            return res.status(400).json({
                error:  "Category does not exist"
            });
        }
        //add/ create request object
        req.category = category;
        next();
    })
}


exports.create =  async (req, res) => {
    console.log(req.body);
     const newCategory = new Category(req.body);
     await newCategory.save((err, data)=>{
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)

            })
        }
        console.log(data)
        res.json({data});
    })
  
}

exports.read = (req, res) =>{
    return res.status(200).json(req.category);
}


exports.update = async (req, res) =>{
    const category = req.category;
    category.name = req.body.name;  
    await category.save((err, data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    })

}


exports.remove = async (req, res) =>{

    const category = req.category;
    await category.remove((err, data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Category Deleted"
        });

    })
}


exports.list = async (req, res) =>{

await Category.find().exec((err, data)=> {
    if(err){
        return res.status(400).json({
            error: errorHandler(err)
        }); 
    }
    res.json(data)
})
}
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/productModel");
const { errorHandler } = require("../helpers/dbErrorHandler");


//because of the "router.param('productId', productById);" in the productRoutes, the code below will run and create the req.product
exports.productById = async (req, res, next, id) => {
    await Product.findById(id).exec((err, product)=> {
        if(err || !product) {
            return res.status(400).json({
                error: 'Product not found'
            })
        }
        //create a req.product object to pass the req to the exports.read method
        req.product = product;
        next();
    })
}

exports.read = (req, res)=>{
    req.product.photo = undefined;
    console.log(req.product)
    return res.json(req.product);
}


exports.create = (req, res) => {
  console.log("products");
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    //check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    //   (shipping === null)
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    let product = new Product(fields);
    
    //the "photo" comes from the client side so the name here should be the same
    if (files.photo) {
      //Console.log the files.photo to check its size so we can do some product validation
      //1kb = 1000
      //1mb = 1000000
      // console.log(files.photo);
      if (files.photo > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1MB size",
        });
      }

      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res)=>{
    let product = req.product;
    product.remove((err, deletedProduct) =>{
        if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }

          res.json({
              deletedProduct,
              "message": 'Product Deleted Successfully'
          })
    })
}


exports.update = (req, res) => {
    console.log("products");
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not be uploaded",
        });
      }

  
      //check for all fields
      const { name, description, price, category, quantity, shipping } = fields;
  
      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !quantity ||
        !shipping
      //   (shipping === null)
      ) {
        return res.status(400).json({
          error: "All fields are required",
        });
      }


      //instead of creating a new product we will use the req.product
    //   let product = new Product(fields);
    let product = req.product;

    //use lodash
    //the existing "product" will be replaced by the new "fields"
    product = _.extend(product, fields);

      //the "photo" comes from the client side so the name here should be the same
      if (files.photo) {
        //Console.log the files.photo to check its size so we can do some product validation
        //1kb = 1000
        //1mb = 1000000
        // console.log(files.photo);
        if (files.photo > 1000000) {
          return res.status(400).json({
            error: "Image should be less than 1MB size",
          });
        }
  
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }
  
      product.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(result);
      });
    });
  };
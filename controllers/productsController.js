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


  // sell and arrival
  // show products based on frequently sold or most popular and new arrivals
  //by sell - /products?sortBy=sold&order=desc&limit=4
  //by arrival - /products?sortBy=createdAt&order=desc&limit=4
  //if no params are sent then all products are returned

  exports.list = async (req, res)=>{
    console.log(req.query, "QUERY!!!!!!");
  //QUERY PARAMETERS CAN BE IN ANY ARRANGEMENT ON THE URL

    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    await Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products)=>{
      if(err){
        return res.status(400).json({
          error: 'Products not found'
        });
      }

      console.log(products);

      res.send(products);
    })



  }
  

//it will find the product based on the product category
//products with the same category will be returned
exports.listRelated = async (req, res)=>{
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  //$ne not including the product you have now
  await Product.find({_id: {$ne: req.product}, category: req.product.category})
  .limit(limit)
  .populate('category', '_id name')
  .exec((err, products)=>{
    if(err){
      return res.status(400).json({
        error: 'Products not found'
      });
    }
    console.log(products);
    res.send(products);
  })
}

exports.listProductsCategories = async (req, res)=> {
  //the distinct gives you an array of values of the field you choose in this case the field in the product category
  await Product.distinct('category', {}, (err, productsCategories)=> {
    if(err){
      return res.status(400).json({
        error: 'Categories not found'
      });
    }
    console.log(productsCategories);
    res.send(productsCategories);
  })

}


exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
          if (key === "price") {
              // gte -  greater than price [0-10]
              // lte - less than
              findArgs[key] = {
                  $gte: req.body.filters[key][0],
                  $lte: req.body.filters[key][1]
              };
          } else {
              findArgs[key] = req.body.filters[key];
          }
      }
  }

  Product.find(findArgs)
      .select("-photo")
      .populate("category")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, data) => {
          if (err) {
              return res.status(400).json({
                  error: "Products not found"
              });
          }
          res.json({
              size: data.length,
              data
          });
      });
};

//display the photo
exports.photo = (req, res, next) =>{
  if(req.product.photo.data){
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};


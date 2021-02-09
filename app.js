const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
//import the routes folder and its files here
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const categoryRoutes = require('./routes/categoryRoute');
const productRoutes = require('./routes/productRoute');


const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//app
const app = express();
const expressValidator = require('express-validator');



// const dotenv = require('dotenv');
// dotenv.config()

//db connection
//Using MongoATLAS
// mongoose.connect( 
//     process.env.MONGO_URI, 
//     {
//         useNewUrlParser: true, 
//         useUnifiedTopology: true 
//     }
//     )
//   .then(() => console.log('DB Connected'))
   
//   mongoose.connection.on('error', err => {
//     console.log(`DB connection error: ${err.message}`)
//   });   


//Using Mongodb Local
mongoose.connect(
    process.env.DATABASE, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
)
.then(() => console.log('DB Connected'))

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
//routes middleware
//prepend /api as convention
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);





const port = process.env.PORT || 8000;

app.listen(port, function(){
    console.log("app listening to http://localhost:"+port + " follow link cmd + click");
    console.log(`Server is running on http://localhost:${port} follow link cmd + click`);
});
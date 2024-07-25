import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";
import jwt from "jsonwebtoken";
import {Users} from "./models/User.js";
import {Dishes} from "./models/Dishes.js";
import multer from "multer";
import path from "path";

const app = express();
dotenv.config({ path: "./config.env" });

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173/';

// app.use(
//   cors({
//     origin: allowedOrigin,
//     methods: ['POST', 'GET', 'PUT', 'DELETE'],
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/reservation", reservationRouter);

app.get("/", (req, res, next)=>{return res.status(200).json({
  success: true,
  message: "HELLO WORLD AGAIN"
})})


dbConnection();

  
//image Storage Engine

const storage=multer.diskStorage({
  destination:'./upload/images',
  filename:(req,file,cb)=>{
return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload=multer({storage:storage})

////Creating Upload Endpoints for images
app.use('/images',express.static('upload/images'));
app.post('/upload',upload.single('product'),(req,res)=>{
  res.json({
      success:1,
      image_url:`http://localhost:${process.env.PORT}/images/${req.file.filename}`
  })
  })


//creating endpoint for registering the user
app.post('/signup',async(req,res)=>{

  let check=await Users.findOne({email:req.body.email});
  if(check){
      return res.status(400).json({success:false,errors:"existing user found with same email address"})
  }
  let cart={};
  for(let i=0;i<300;i++){
      cart[i]=0;
  }
  const user=new Users({
      name:req.body.username,
      email:req.body.email,
      password:req.body.password,
      cartData:cart,
  })
  await user.save();

  const data={
      user:{
          id:user.id
      }
  }
  const token=jwt.sign(data,'secret_ecom');
  res.json({success:true,token})
})

//creating endpoint for user login

app.post('/login',async(req,res)=>{
  let user=await Users.findOne({email:req.body.email});
  if(user){
      const passCompare = req.body.password===user.password;
      if(passCompare){
          const data={
              user:{
                  id:user.id
              }
          }
          const token=jwt.sign(data,'secret_ecom');
          res.json({success:true,token});
      }
      else{
          res.json({
            success:false,errors:"Wrong password"
          });
      }
  }
  else{
      res.json({success:false,errors:"wrong email id"});
  }
})


///Creating Products endpoints.......
app.post('/addproduct',async(req,res)=>{
  let dishes=await Dishes.find({});
  let id;
  if(dishes.length>0){
      let last_dish_array =dishes.slice(-1);
      let last_dish = last_dish_array[0];
      id=last_dish.id+1;
  }
  else{
      id=1;
  }
 const {name,price,category,image}=req.body;
 const dish=new Dishes({id:id,name,price,category,image});
 console.log(dish);
 await dish.save();
 console.log("saved successfully");
 res.json({
  success:true,
  name:req.body.name,
 })
})
///Creating API for removing products from database

app.post('/removeproduct',async(req,res)=>{
  await Dishes.findOneAndDelete({id:req.body.id});
  console.log("removed successfully");
  res.json({
      success:true,
      name:req.body.name,
  })
})

////Creating API for getting all products

app.get('/allproducts',async(req,res)=>{
  let dishes=await Dishes.find({});
  console.log("All Product Fetched");
  res.send(dishes);
})

//creating middleware to fetch user
const fetchUser= async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try{
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        }catch(error){
            res.status(401).send({errors:"please authenticate using a valid token"})
        }
    }
}



app.use(errorMiddleware);

export default app;

// JSON Web Tokens (JWTs) are a standardized way to securely send data between two parties. They contain information (claims) encoded in the JSON format. These claims help share specific details between the parties involved. At its core, a JWT is a mechanism for verifying the authenticity of some JSON data.
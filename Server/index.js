const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const url = "mongodb://localhost:27017/social"
const app = express();
dotenv.config()
// const url = process.env.MONGO_URL

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

mongoose.connect(url,(err)=>{
    if(err) console.error(`unable to connect beacaus of this error: ${err}`);
    else
    console.log("mongoDB connected")
})
  
  //middleware
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("common"));

  //routes
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/posts", postRoute);
  
app.listen("8800",()=>{
    console.log("Backend server is running in port 8800")
})
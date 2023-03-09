const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const url = "mongodb://localhost:27017/social"
const app = express();
dotenv.config()
// const url = process.env.MONGO_URL

const multer  = require('multer')
const path = require("path");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

mongoose.connect(url,(err)=>{
    if(err) console.error(`unable to connect beacaus of this error: ${err}`);
    else
    console.log("mongoDB connected")
})
  
app.use("/images", express.static(path.join(__dirname, "public/images")));

  //middleware
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("common"));

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      // cb(null, file.originalname);
      cb(null, req.body.name);
    },
  });

  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

  //routes
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/posts", postRoute);
  
app.listen("8800",()=>{
    console.log("Backend server is running in port 8800")
})
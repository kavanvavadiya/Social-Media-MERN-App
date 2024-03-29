const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
    try {
    //   generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      //create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
  
      //save user and respond
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
        console.log(err)
      res.status(500).json(err)
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      if(!user) res.status(404).json("user not found");
      else if(!validPassword) res.status(404).json("wrong password");
      else res.status(200).json(user);
      // !user && res.status(404).json("user not found");
  
      // !validPassword && res.status(400).json("wrong password")
  
      
    } catch (err) {
      res.status(500).json(err)
    }
});
  

module.exports = router;
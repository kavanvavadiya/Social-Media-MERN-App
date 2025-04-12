const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");
const Conversation = require("../models/Conversation");

//Register
router.post("/register", async (req, res) => {
  try {
          // Check if email already exists
      const existingEmail = await User.findOne({ email: req.body.email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email is already registered." });
      }

      // Check if username is already taken
      const existingUsername = await User.findOne({ username: req.body.username });
      if (existingUsername) {
        return res.status(400).json({ message: "Username is already taken." });
      }

      // Generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create new user
      const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
      });

      const savedUser = await newUser.save();

      // Fetch all existing users (excluding the newly registered user)
      const existingUsers = await User.find({ _id: { $ne: savedUser._id } });

      // Automatically create a conversation with each existing user
      for (let user of existingUsers) {
        const existingConversation = await Conversation.findOne({
          members: { $all: [savedUser._id.toString(), user._id.toString()] },
        });
        if (!existingConversation) {
          console.log(existingConversation)
          const newConversation = new Conversation({
            members: [savedUser._id.toString(), user._id.toString()],
          });
          console.log(newConversation)
          await newConversation.save();
        }
      }
  
      res.status(201).json({ message: "User registered successfully", user: savedUser });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });


//LOGIN
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      let validPassword = false
      if (user){
        validPassword = await bcrypt.compare(req.body.password, user.password)
      }
      if(!user) res.status(404).json("User not found!!!");
      else if(!validPassword) res.status(404).json("Wrong Password");
      else res.status(200).json(user);
      // !user && res.status(404).json("user not found");
  
      // !validPassword && res.status(400).json("wrong password")
  
      
    } catch (err) {
      res.status(500).json(err)
    }
});
  

module.exports = router;
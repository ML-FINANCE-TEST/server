// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const genAuthToken = require("../utils/genAuthToken");
// const Joi = require("joi");
// const User = require("../models/user");
// const OTPModel = require("../models/otp");
// const { sendOTP } = require("../utils/sendMail");

// router.post("/register", async (req, res) => {
//   const schema = Joi.object({
//     password: Joi.string().min(6).max(200).required(),
//     email: Joi.string().min(6).max(30).required(),
//     username: Joi.string().min(3).max(30).required(),
//   });

//   const { error } = schema.validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   console.log(error);
//   let user = await User.findOne({ email: req.body.email.toLowerCase() }); // Convert email to lowercase before querying

//   if (user) return res.status(400).send("User already exists.");

//   user = new User({
//     username: req.body.username,
//     password: req.body.password,
//     email: req.body.email.toLowerCase(),
//   });

//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);
//   await user.save();

//   const token = genAuthToken(user);
//   res.send({ message: "User registered successfully", token });
// });

// router.post("/login", async (req, res) => {
//   const schema = Joi.object({
//     email: Joi.string().min(3).max(200).required().email(),
//     password: Joi.string().min(6).max(200).required(),
//   });
//   const { error } = schema.validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   console.log(error, "err");
//   let user = await User.findOne({ email: req.body.email.toLowerCase() });
//   if (!user) return res.status(400).send("Invalid email or password");

//   const isValid = await bcrypt.compare(req.body.password, user.password);
//   if (!isValid) return res.status(400).send("Invalid email or password");

//   // Remove password field from user object
//   const { password, ...userWithoutPassword } = user.toObject();

//   // Send token and user information (without password) in response
//   const token = genAuthToken(user);
//   return res.status(200).send({ token, user: userWithoutPassword });
// });

// router.post("/forgot-password", async (req, res) => {
//     const { email } = req.body;
    
//     // Generate OTP
//     const otp = Math.random().toString().slice(2, 8); // Generate a 6-digit OTP
    
//     // Save OTP to database
//     await OTPModel.create({ email, otp });
  
//     // Send OTP to email (you'll need to implement this part using a mail service)
  
//     console.log(otp, otp)
//     await sendOTP(email.toLowerCase(), otp);
//     res.send("OTP has been sent to your email.");
//   });

// router.post("/verify-otp", async (req, res) => {
//   const { email, otp } = req.body;

//   // Find OTP in database
//   const otpData = await OTPModel.findOne({ email, otp });
//   if (!otpData) {
//     return res.status(400).send("Invalid OTP");
//   }

//   // Delete OTP from database
//   await OTPModel.deleteOne({ email, otp });

//   res.send("OTP verified successfully.");
// });

// router.post("/reset-password", async (req, res) => {
//   const { email, oldPassword, newPassword } = req.body;

//   // Verify old password
//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(400).send("User not found.");
//   }

//   const isValid = await bcrypt.compare(oldPassword, user.password);
//   if (!isValid) {
//     return res.status(400).send("Invalid old password.");
//   }

//   // Update password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(newPassword, salt);
//   user.password = hashedPassword;
//   await user.save();

//   res.send("Password reset successfully.");
// });

// module.exports = router;

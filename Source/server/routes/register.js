const express = require("express");
const routeRegistration = express.Router();
const userModel = require("../model/userModel");

routeRegistration.post("register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!fullName || !email || !password) {
      res.status(400).send("Please fill out all required fields");
    } else {
      const isAlreadyExist = await userModel.findOne({ email });
      if (isAlreadyExist) {
        res.status(400).send("User already exists");
      } else {
        const newUser = new userModel({ firstName, lastName, email, password });
        return res.status(200).send("User registered successfully");
      }
    }
  } catch (error) {
    console.log(error, "Error");
  }
});

module.exports = routeRegistration;

const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const {generateToken} = require("../middlewares/auth");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    let token =  generateToken(user._id);     
    res.json({user, token});
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const getAllUsers = asyncHandler(
    async (req, res) => {
        try {
          const users = await User.find();
          res.json(users);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });

const getUserById = asyncHandler(
    async (req, res) => {
        try {
          const user = await User.findById(req.params.id);
          res.json(user);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });

const createUser = asyncHandler(async (req, res) => {
  const { firstName,
    lastName,
    email,
    password,
    gender,
    enabled } = req.body;

  if (!firstName || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    gender,
    enabled
  });
  if (user) {
    res.status(201).json(
        {user,       
        token: generateToken(user._id)}
    );
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(
    async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedUser) return res.status(404).json({ error: 'User not found' });
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Delete a user
  const deleteUser = asyncHandler(
    async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    });

module.exports = { getAllUsers, createUser, updateUser, deleteUser, getUserById, authUser };

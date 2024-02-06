const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const {getAllUsers, createUser, updateUser, deleteUser, getUserById} = require("../controllers/user.controller");
// const { protect } = require("../middleware/authMiddleware");

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);
router.route('/').post(createUser);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);
// router.post("/login", authUser);

  module.exports = router;
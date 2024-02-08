const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const {getAllUsers, createUser, updateUser, deleteUser, getUserById, authUser} = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth");
router.use(verifyToken)
router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);
router.route('/').post(createUser);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);

module.exports = router;
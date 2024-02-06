const express = require('express');
const router = express.Router();
const Role = require('../models/role.model');

// Create a new role
router.post('/', async (req, res) => {
  const newRole = new Role(req.body);
  try {
    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single role by ID
router.get('/:id', async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a role
router.put('/:id', async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedRole) return res.status(404).json({ error: 'Role not found' });
    res.json(updatedRole);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a role
router.delete('/:id', async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) return res.status(404).json({ error: 'Role not found' });
    res.json({ message: 'Role deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  });

  module.exports = router;
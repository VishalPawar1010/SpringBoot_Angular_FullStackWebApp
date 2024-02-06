const express = require('express')
const connectDB = require('./db/db');
const dotenv = require("dotenv");
const cors = require('cors');
const Role = require('./models/role.model');
const User = require('./models/user.model');
const roleRoute = require('./routes/roleRoute');

dotenv.config();
connectDB();
const app = express()
app.use(cors());
app.use(express.json());

const nodeUrl = `${process.env.PORT}`;
const roleUrl= nodeUrl + "/nodeApi";



let json={
  test: "Hello this is valid nodeJS"
};


app.post('/createRole', async (req, res) => {
  const newRole = new Role(req.body);
  try {
    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get('/listRoles', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/createUser', async (req, res) => {
  const newRole = new User(req.body);
  try {
    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get('/listUsers', async (req, res) => {
  try {
    const roles = await User.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/users/:id', async (req, res) => {
  try {
    const updatedRole = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedRole) return res.status(404).json({ error: 'User not found' });
    res.json(updatedRole);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/node', (req, res) => {
  res.send(json)
})

app.listen(nodeUrl, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
const express = require('express')
const connectDB = require('./db/db');
const dotenv = require("dotenv");
const cors = require('cors');
const Role = require('./models/role.model');
const roleRoute = require('./routes/roleRoute');

dotenv.config();
connectDB();
const app = express()
app.use(cors());
app.use(express.json());

// app.use("/role", roleRoute);


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

app.get('/node', (req, res) => {
  res.send(json)
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
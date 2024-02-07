const express = require('express')
const connectDB = require('./db/db');
const dotenv = require("dotenv");
const cors = require('cors');
const Role = require('./models/role.model');
const User = require('./models/user.model');
const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');
const { notFound, errorHandler } = require("./middlewares/error");


dotenv.config();
connectDB();
const app = express()
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000 ;


// Routes
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);


let json={
  test: "Hello this is valid nodeJS"
};

// role apis

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


app.get('/api/node', (req, res) => {
  res.send(json)
});

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
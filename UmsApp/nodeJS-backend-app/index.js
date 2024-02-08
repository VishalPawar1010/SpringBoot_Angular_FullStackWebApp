const express = require('express')
const connectDB = require('./db/db');
const dotenv = require("dotenv");
const cors = require('cors');
const User = require('./models/user.model');
const userRoutes = require('./routes/user.routes');
const { notFound, errorHandler } = require("./middlewares/error");
const {authUser, logoutUser} = require("./controllers/user.controller");
const {expireToken} = require('./middlewares/auth')

// startup required services
dotenv.config();
connectDB();
const app = express()
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000 ;

// Routes
app.use("/api/users",userRoutes);

let json={test: "Hello this is valid nodeJS"};
app.get('/api/node', (req, res) => {res.send(json)});
app.post("/api/login", authUser);
app.post('/api/logout', expireToken);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
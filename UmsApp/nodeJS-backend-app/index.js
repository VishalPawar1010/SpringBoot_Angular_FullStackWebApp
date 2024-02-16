const express = require('express')
const bodyParser = require('body-parser');
const connectDB = require('./db/db');
const dotenv = require("dotenv");
const cors = require('cors');
const {passport, o2router} = require('./middlewares/oAuth2');
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes');
const { notFound, errorHandler } = require("./middlewares/error");
const {authUser} = require("./controllers/user.controller");
const {expireToken} = require('./middlewares/auth')
const session = require('express-session');

// startup required services to set context
dotenv.config();
connectDB();
const app = express()
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(session({
  secret: 'something',
  resave: false,
  saveUninitialized: false
}));
const PORT = process.env.PORT || 3000 ;

// Routes
app.use("",o2router);
app.use("/api/users",userRoutes);


let json={test: "Hello this is valid nodeJS"};
app.get('/api/node', (req, res) => {res.send(json)});
app.post("/api/login", authUser);
app.post('/api/logout', expireToken);

// ====================================================================================
// oAuth - sertup
app.get('/', (req, res)=>{
  res.sendFile('home.html', {root: __dirname+'/public'})
})
app.get('/login', (req, res)=>{
  res.sendFile('login.html', {root: __dirname+'/public'})
})
app.get('/auth/email', (req, res)=>{
  res.sendFile('login_form.html',  {root: __dirname+'/public'})
})
app.post('/auth/email', authUser);
app.get('/profile',(req,res)=>{
  res.send(`THIS IS UR PROFILE MAAANNNN ${req}`)
})
// ====================================================================================

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
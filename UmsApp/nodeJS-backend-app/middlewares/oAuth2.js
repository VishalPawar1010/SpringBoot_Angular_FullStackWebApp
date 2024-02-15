const passport = require('passport');
const express = require('express');
const o2router = express.Router();
const User = require("../models/user.model");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const {generateToken} = require('./auth');
const dotenv = require("dotenv");

dotenv.config();

passport.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true // Pass req object to callback for user-specific logic
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
        // Logic to handle Google profile data, create/find user, and generate JWT
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
            // Create a new user
            user = await new User({
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                password: "12345",
                googleId: profile.id,
            }).save();
        }
        const token = generateToken(user._id); 
        done(null, { user, token });
    } catch (error) {
        console.log(error);
        done(error);
    }
  }));
  passport.serializeUser(function(user, cb) {
    console.log('I should have jack ')
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    console.log('I wont have jack shit')
    cb(null, obj);
  });

//   first time sign up
o2router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
//   login after once sigh up
o2router.get('/auth/google/callback',
  passport.authenticate('google'),
      (req, res) => {
        res.cookie('token', req.user.token);     
        res.redirect('/login'); // Adjust redirect URL
      }
  );

module.exports = {passport, o2router};

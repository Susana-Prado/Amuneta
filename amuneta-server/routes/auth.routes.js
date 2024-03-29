const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User.model');

const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

router.post('/signup', (req, res, next) => {
  const { name, email, password } = req.body;

  if (password.lenght < 3) {
    return res
      .status(400)
      .json({
        message: 'Please make your password at least 3 characters long',
      });
  }

  if (!name || !email) {
    return res
      .status(400)
      .json({ message: 'Please fill all the fields in the form' });
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ message: 'User already exists. Please change your email' });
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.create({
      name,
      email,
      password: hashPass,
    })
      .then((newUser) => {
        req.login(newUser, (error) => {
          if (error) {
            return res.status(500).json(error);
          }
          return res.status(200).json(newUser);
        });
      })
      .catch((error) => res.status(500).json(error));
  });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (error, theUser, failureDetails) => {
      if(error){
        return res.status(500).json(error);
      }
  
      if(!theUser){
        return res.status(401).json(failureDetails);
      }
  
      req.login(theUser, (error) => {
        if(error){
          return res.status(500).json(error);
        }
  
        return res.status(200).json(theUser);
      })
  
    })(req, res, next)
  })
  
  router.post('/logout', (req, res, next) => {
    req.logout();
    return res.status(200).json({ message: 'Log out success!'});
  })

  router.get('/profile', (req, res, next) => {
    User.findById({ _id: req.user.id })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json(error))
  })
  
  router.put('/edit', (req, res, next) => {
    User.findOneAndUpdate({ _id: req.user.id }, { ...req.body}, { new: true })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json(error))
  })
  
  router.get('/loggedin', (req, res, next) => {
    if(req.isAuthenticated()){
      return res.status(200).json(req.user);
    } else {
      return res.status(403).json({ message: 'Forbbiden' });
    }
  })
  

module.exports = router;
